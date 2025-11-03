import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import Carousel from "./Carousel";
import NewsCard from "./NewsCard";
import ChooseDealModalSource from "./ChooseDealModalSource";
import CreateDealModalSource from "./CreateDealModalSource";
import { Tailspin } from 'ldrs/react'
import 'ldrs/react/Tailspin.css'

export default function NewsModal({ newsIsOpen, setNewsIsOpen, news }) {
    const [chooseDealIsOpenSource, setChooseDealIsOpenSource] = useState(false)
    const [createDealIsOpenSource, setCreateDealIsOpenSource] = useState(false)
    const [sourceObject, setSourceObject] = useState({})

    const handleSelectPaper = (item) => {
        setSourceObject(item)
        setChooseDealIsOpenSource(true)
    }

    return (
        <div className="fixed inset-0 bg-black/30 z-40 flex items-center justify-center">

            <div className="bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-6 w-full max-w-2xl z-50 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h1 className="heading">Additional Insights</h1>
                    <button onClick={() => setNewsIsOpen(false)} className="cursor-pointer">
                        <IoClose size={25} />
                    </button>

                </div>

                {chooseDealIsOpenSource && (
                    <ChooseDealModalSource
                        sourceObject={sourceObject}
                        chooseDealIsOpenSource={chooseDealIsOpenSource}
                        setChooseDealIsOpenSource={setChooseDealIsOpenSource}
                        createDealIsOpenSource={createDealIsOpenSource}
                        setCreateDealIsOpenSource={setCreateDealIsOpenSource} />
                )}

                {createDealIsOpenSource && (
                    <CreateDealModalSource
                        sourceObject={sourceObject}
                        chooseDealIsOpenSource={chooseDealIsOpenSource}
                        setChooseDealIsOpenSource={setChooseDealIsOpenSource}
                        createDealIsOpenSource={createDealIsOpenSource}
                        setCreateDealIsOpenSource={setCreateDealIsOpenSource}
                        isEditor={true} />
                )}


                {news?.length > 0 && (
                    <Carousel>
                        {news.map((item, i) => (
                            <NewsCard
                                key={i}
                                source={item.source}
                                title={item.title}
                                snippet={item.snippet}
                                url={item.url}
                                onAdd={() => handleSelectPaper(item)}
                            />
                        ))}
                    </Carousel>
                )}

                {!news && (
                    <div className="w-full bg-secondary border border-border rounded-md py-4 px-8 h-[17rem] flex items-center justify-center">
                        <Tailspin
                            size="50"
                            stroke="4"
                            speed="0.9"
                            color="#0049FF"
                        />
                    </div>

                )}



            </div>

        </div>
    )
}