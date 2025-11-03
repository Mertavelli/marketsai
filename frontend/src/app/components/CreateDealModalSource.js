import React, { useEffect, useState, useRef } from "react"
import Input from "./Input"
import { useAuthStore } from "../stores/useAuthStore"
import { useCreateDeal } from "../hooks/api";
import { toast } from "sonner"
import { useRouter } from "next/navigation";
import { useCreateReport, useGenerateText, useCreateSource } from "../hooks/api";
import TextareaAutosize from "react-textarea-autosize";
import { BsStars } from "react-icons/bs";
import { Tailspin } from 'ldrs/react'
import 'ldrs/react/Tailspin.css'
import { useQueryClient } from "@tanstack/react-query";

export default function CreateDealModalSource({ sourceObject, createDealIsOpenSource, setCreateDealIsOpenSource, analysisData, isEditor = false }) {
    const { mutate: createSource } = useCreateSource();
    const queryClient = useQueryClient();
    const [isTyping, setIsTyping] = useState(false);
    const typingIntervalRef = useRef(null);
    const lastGeneratedTitleRef = useRef("");
    const router = useRouter()
    const { user } = useAuthStore();
    const {
        mutate: createDeal,
        isPending,
        error,
        data: responseData
    } = useCreateDeal();

    const {
        mutate: createReport,
        isPending: isPendingReport,
        error: errorReport,
        data: responseDataReport
    } = useCreateReport();

    const {
        mutate: generateText,
        isPending: isGenerating,
        data: generatedText,
        error: generationError,
    } = useGenerateText();

    const [descriptionEdited, setDescriptionEdited] = useState(false);
    const [dealName, setDealName] = useState("")
    const [dealDescription, setDealDescription] = useState("")
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (
            descriptionEdited ||
            isGenerating ||
            dealName.length < 6 ||
            dealName === lastGeneratedTitleRef.current
        ) {
            return;
        }

        const timeout = setTimeout(() => {
            generateText(`Gib eine kurze, professionelle Dealbeschreibung basierend auf dem Titel "${dealName}".`);
            lastGeneratedTitleRef.current = dealName;
        }, 500); // 700ms debounce

        return () => clearTimeout(timeout);
    }, [dealName]);

    useEffect(() => {
        if (!descriptionEdited && Array.isArray(generatedText)) {
            const lastSystemMessage = [...generatedText].reverse().find(msg => msg.role === "system");

            if (lastSystemMessage?.content) {
                const text = lastSystemMessage.content;
                let index = 0;

                setIsTyping(true);
                let currentText = "";

                // setInterval als reine Referenz
                typingIntervalRef.current = setInterval(() => {
                    currentText += text.charAt(index);
                    setDealDescription(currentText);
                    index++;

                    if (index >= text.length) {
                        clearInterval(typingIntervalRef.current);
                        typingIntervalRef.current = null;
                        setIsTyping(false);
                    }
                }, 10);

                // sofort initialisieren (damit erster Buchstabe sicher gesetzt wird)
                setDealDescription(text.charAt(0));
            }
        }
    }, [generatedText]);

    const handleNewDeal = (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!dealName) {
            newErrors.dealName = "Please enter a deal name.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        createDeal(
            {
                title: dealName,
                description: dealDescription,
                created_by: user.id
            },
            {
                onSuccess: (responseData) => {
                    if (isEditor) {
                        createSource({
                            dealId: responseData._id,
                            ...sourceObject
                        });
                    }
                    toast.success("Deal created successfully");
                    queryClient.invalidateQueries(["deals", user?.id]); // neu laden
                    setCreateDealIsOpenSource(false);
                },
                onError: () => {
                    toast.error("Deal konnte nicht erstellt werden");
                }
            }
        );

    };

    return (
        <div className="fixed inset-0 bg-black/30 z-40 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-6 w-full max-w-md z-50 flex flex-col gap-4">
                <h2 className="heading text-center">Create New Deal</h2>
                <p className="text-center text-black text-sm">
                    {isEditor ? "The new report will be added to the selected deal." : "Organize reports and work with your team in a deal."}
                </p>

                <form onSubmit={handleNewDeal} className="flex flex-col gap-4">
                    <Input
                        type="text"
                        placeholder="Enter a deal name"
                        label="Deal Name"
                        value={dealName}
                        setValue={setDealName}
                        error={errors.DealName}
                    />

                    <div className="flex flex-col gap-2 text-black">
                        <div className="flex items-center gap-1">
                            <BsStars className="text-accent" />
                            <label>Description</label>
                        </div>

                        <TextareaAutosize
                            className="text-black border border-border rounded-md p-3"
                            placeholder="Enter a deal description"
                            value={dealDescription}
                            onChange={(e) => {
                                // Wenn der User tippt während der Text geschrieben wird → abbrechen
                                if (isTyping && typingIntervalRef.current) {
                                    clearInterval(typingIntervalRef.current);
                                    typingIntervalRef.current = null;
                                }

                                setDealDescription(e.target.value);
                                setDescriptionEdited(true);
                                setIsTyping(false);
                            }}
                        />

                    </div>


                    <button
                        type="submit"
                        className="bg-accent text-white py-3 text-center rounded-md cursor-pointer hover:bg-accent/90 flex items-center gap-2 justify-center"
                    >
                        {isPending && (
                            <Tailspin
                                size="20"
                                stroke="3"
                                speed="0.9"
                                color="white"
                            />
                        )}
                        {"Create and save report"}
                    </button>
                </form>

                <button
                    onClick={() => setCreateDealIsOpenSource(false)}
                    className="text-center cursor-pointer text-sm"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
