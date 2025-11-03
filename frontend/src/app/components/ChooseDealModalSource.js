import ProfileAvatar from "./ProfileAvatar"
import { IoChevronForwardOutline } from "react-icons/io5";
import { useGetDealsOfUser, useCreateReport, useCreateSource } from "../hooks/api";
import { useAuthStore } from "../stores/useAuthStore";
import { toast } from "sonner"
import { useParams } from "next/navigation";

export default function ChooseDealModalSource({ sourceObject, chooseDealIsOpenSource, setChooseDealIsOpenSource, createDealIsOpenSource, setCreateDealIsOpenSource, metrics }) {
    const { title } = useParams()
    const { user } = useAuthStore();
    const { data: deals, isLoading, error } = useGetDealsOfUser(user?.id);
    const { mutate: createSource } = useCreateSource();

    if (isLoading) return null;
    if (error) return <p>Fehler: {error.message}</p>;


    const handleNewDeal = () => {
        setChooseDealIsOpenSource(false)
        setCreateDealIsOpenSource(true)
    }

    const handleAddToDeal = (deal) => {
        createSource({
            dealId: deal._id,
            ...sourceObject
        });
        setChooseDealIsOpenSource(false)
        toast.success("Report created and saved successfully");
    }

    return (
        <div className="fixed inset-0 bg-black/30 z-40 flex items-center justify-center">

            <div className="bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-6 w-full max-w-md z-50 flex flex-col gap-4">
                <h2 className="heading text-center">Where would you like to save it?</h2>
                <p className="text-center text-black text-sm">A new report will be added to the selected deal.</p>

                <div className="border-y border-border flex flex-col py-2">
                    {/* Projekt hinzufügen Button */}
                    <button
                        onClick={handleNewDeal}
                        className="flex justify-between items-center cursor-pointer hover:bg-secondary transition-all p-4 rounded-md"
                    >
                        <div className="flex gap-3 items-center">
                            <div className="rounded-full w-10 h-10 flex items-center justify-center bg-accent text-white font-semibold text-lg">
                                +
                            </div>
                            <div className="flex flex-col">
                                <p className="text-black text-left">Add a new deal</p>
                                <p className="text-sm text-gray-500">e.g. for a new company or industry</p>
                            </div>
                        </div>
                    </button>

                    {/* Scrollbarer Bereich für Projekte */}
                    <div className="flex flex-col overflow-y-auto max-h-[9.5rem]">
                        {deals?.map((deal, i) => (
                            <button
                                key={i}
                                onClick={() => handleAddToDeal(deal)}
                                className="flex justify-between items-center cursor-pointer hover:bg-secondary transition-all p-4 rounded-md"
                            >
                                <div className="flex gap-3 items-center">
                                    <ProfileAvatar name={deal.created_by.firstName} className={"w-10 h-10"} />
                                    <div className="flex flex-col">
                                        <p className="text-black text-left">{deal.title}</p>
                                        <p className="text-sm text-left">{deal.created_by.email}</p>
                                    </div>
                                </div>
                                <IoChevronForwardOutline />
                            </button>
                        ))}
                    </div>
                </div>


                <button onClick={() => setChooseDealIsOpenSource(false)} className="text-center cursor-pointer text-sm">Cancel</button>
            </div>

        </div>
    )
}