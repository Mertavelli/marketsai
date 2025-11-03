'use client'
import React, { useState, useEffect, useRef } from "react";
import { IoSend } from "react-icons/io5";
import { SatelliteDish } from "lucide-react";
import { DotPulse } from 'ldrs/react'
import 'ldrs/react/DotPulse.css'
import { Tailspin } from 'ldrs/react'
import 'ldrs/react/Tailspin.css'
import { toast } from "sonner"
import NewsModal from "./NewsModal";
import { useGetNewsOfReport } from "../hooks/api";
import { useParams } from "next/navigation";
import { useTypingEffect } from "../hooks/useTypingEffect";

function formatMessageContent(content) {
    const boldRegex = /\*\*(.*?)\*\*/g;
    const codeRegex = /`(.*?)`/g;

    let formatted = content.replace(boldRegex, '<span class="font-semibold">$1</span>');
    formatted = formatted.replace(codeRegex, '<span class="font-semibold">$1</span>');

    return formatted;
}

function unslugify(slug) {
    return slug
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

export default function Chat({
    onMetricsChange,
    sendChat,
    responseData,
    isPending,
    createMarketAnalysis,
    isPendingAnalysis,
    analysisData,
    error,
    errorAnalysis,
    chooseDealIsOpen,
    setChooseDealIsOpen,
    createDealIsOpen,
    setCreateDealIsOpen
}) {
    const { title } = useParams();
    const formattedTitle = unslugify(title);

    const [showInfoPrompt, setShowInfoPrompt] = useState(false);
    const [newsIsOpen, setNewsIsOpen] = useState(false);
    const infoPromptShownRef = useRef(false);

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [metrics, setMetrics] = useState(null);
    const { mutate: fetchNews, data: news, isLoadingNews } = useGetNewsOfReport();
    const messagesEndRef = useRef(null);
    const messagesRef = useRef(messages);
    const [newsFetched, setNewsFetched] = useState(false);

    useEffect(() => {
        messagesRef.current = messages;
    }, [messages]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        const handler = (e) => {
            if (e.target?.id === "showMoreInfoBtn") {
                setNewsIsOpen(true);
                if (!newsFetched && !isLoadingNews) {
                    fetchNews({ messages: messagesRef.current });
                    setNewsFetched(true);
                }
            }
            if (e.target?.id === "startAnalysisBtn") {
                handleMarketAnalysis();
            }
        };

        document.addEventListener("click", handler);
        return () => document.removeEventListener("click", handler);
    }, [newsFetched, isLoadingNews]);

    useEffect(() => {
        if (isPendingAnalysis && !infoPromptShownRef.current) {
            const timer = setTimeout(() => {
                setShowInfoPrompt(true);
                infoPromptShownRef.current = true;
                setMessages((prev) => [
                    ...prev,
                    {
                        role: "system",
                        content: `🔍 Während dein Investment-Memo erstellt wird:  
                        Möchtest du dir in der Zwischenzeit zusätzliche Insights zum Unternehmen ansehen?
                        <br/>  
                        <button class="inline-block mt-3 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-all cursor-pointer" id="showMoreInfoBtn">Weitere Informationen anzeigen</button>`
                    }
                ]);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isPendingAnalysis]);

    useEffect(() => {
        if (error) {
            setMessages((prev) => [
                ...prev,
                { role: "system", content: `⚠️ Chat Error: ${"Ein unerwarteter Fehler ist aufgetreten."}` }
            ]);
        }
    }, [error]);

    useEffect(() => {
        if (errorAnalysis) {
            setMessages((prev) => [
                ...prev,
                { role: "system", content: `⚠️ Analyse-Fehler: ${"Die Marktanalyse konnte nicht durchgeführt werden."}` }
            ]);
        }
    }, [errorAnalysis]);

    useEffect(() => {
        if (responseData) {
            const newMessages = [...messages, { role: "system", content: responseData.message }];
            if (responseData.message?.includes("Button")) {
                newMessages.push({
                    role: "system",
                    content: `
                        Starte die Analyse wenn du bereit bist. <br/>
                        <button class="inline-block mt-3 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-all cursor-pointer" id="startAnalysisBtn">Start</button>`
                });

            }
            setMessages(newMessages);

            if (responseData.market_analysis) {
                setMetrics(responseData.market_analysis);
            }
        }
    }, [responseData]);

    useEffect(() => {
        if (metrics && onMetricsChange) {
            onMetricsChange(metrics);
        }
    }, [metrics]);

    const handleSubmit = () => {
        if (!input) return;
        const newMessages = [...messages, { role: "user", content: input }];
        setMessages(newMessages);
        sendChat({ messages: newMessages });
        setInput("");
    };

    const handleMarketAnalysis = () => {
        const currentMessages = messagesRef.current;
        if (!isPendingAnalysis && currentMessages.length > 0) {
            createMarketAnalysis({ messages: currentMessages });
            toast("Analysis started. This may take up to 2 minutes. Please don’t leave the page.");
        } else {
            toast.error("Keine gültigen Nachrichten vorhanden.");
        }
    };


    return (
        <div className="bg-white w-full h-full max-h-full rounded-xl p-5 pt-10 flex flex-col items-center justify-between overflow-hidden border border-border">
            <header className="flex-shrink-0 flex items-center justify-between border-b border-border pb-4 w-full">
                <div className="flex items-center gap-2">
                    <SatelliteDish size={32} className="text-accent" />
                    <div>
                        <h4 className="text-black font-medium text-lg">{formattedTitle} Agent</h4>
                        <p className="text-xs text-green-500 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                            Online
                        </p>
                    </div>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto w-full flex flex-col items-start gap-5 px-1 mb-5 relative" style={{ maxHeight: "calc(100vh - 250px)" }}>
                <div className="mt-auto" />
                {messages.map((message, i) => (
                    <div
                        key={i}
                        className={`p-5 w-3/4 rounded-t-xl z-10 ${message.role === "system"
                            ? message.content.includes("⚠️")
                                ? "bg-red-100 text-red-800 self-start rounded-br-xl"
                                : "bg-secondary self-start rounded-br-xl"
                            : "bg-accent text-white self-end rounded-bl-xl"
                            }`}
                    >
                        <p
                            ref={messagesEndRef}
                            dangerouslySetInnerHTML={{ __html: formatMessageContent(message.content) }}
                        />
                    </div>
                ))}
                {messages.length < 1 && (
                    <p className="absolute inset-0 flex items-center justify-center z-0">
                        Ask me anything :)
                    </p>
                )}

                {isPending &&
                    <DotPulse size="35" speed="1.3" color="#0049FF" />
                }
            </div>

            <div className="flex-shrink-0 flex justify-between items-center w-full p-7 rounded-xl border border-border">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleSubmit();
                        }
                    }}
                    placeholder="Ask any question"
                    className="w-full h-full placeholder:text-tertiary focus:outline-none focus:ring-0"
                />
                <div className="flex gap-5">
                    <button onClick={handleSubmit} className="text-accent cursor-pointer">
                        <IoSend size={30} />
                    </button>
                </div>
            </div>

            {newsIsOpen && (
                <NewsModal newsIsOpen={newsIsOpen} setNewsIsOpen={setNewsIsOpen} news={news} />
            )}
        </div>
    );
}
