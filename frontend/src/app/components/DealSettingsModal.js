import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { useGetDealMembers, useAddDealMember, useGetDealById, useRemoveDealMember } from "@/app/hooks/api"; // ggf. Pfad anpassen
import { useAuthStore } from "@/app/stores/useAuthStore";
import { useParams } from "next/navigation";
import ProfileAvatar from "./ProfileAvatar";
import { MdOutlinePersonRemoveAlt1 } from "react-icons/md";

export default function DealSettingsModal({ settingsIsOpen, setSettingsIsOpen }) {
    const { user } = useAuthStore();
    const { dealId } = useParams();
    const { data: members, isLoading, error } = useGetDealMembers({
        userId: user.id,
        dealId
    });

    const { mutate: addMember, isLoading: isAdding } = useAddDealMember();
    const { mutate: removeMember } = useRemoveDealMember();
    const [email, setEmail] = useState("")
    const [errors, setErrors] = useState({});

    const handleAddMember = (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!email) {
            newErrors.email = "Please enter a email.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        addMember({
            userId: user.id,
            dealId,
            email
        });

    }

    const handleRemoveMember = (memberId) => {
        removeMember({
            dealId,
            userId: user.id,
            memberId
        });
    };


    return (
        <div className="fixed inset-0 bg-black/30 z-40 flex items-center justify-center">

            <div className="bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-6 w-full max-w-md z-50 flex flex-col gap-4">
                <h2 className="heading text-center">Deal Settings</h2>
                <h2 className="sub-heading">Members</h2>

                <div className="flex items-end gap-2 justify-between">
                    <Input
                        type={"email"}
                        placeholder={"Enter a email"}
                        label={"Email"}
                        required={true}
                        className="w-full"
                        value={email}
                        setValue={setEmail}
                    />

                    <Button onClick={handleAddMember} className={"w-min h-min py-3"}>Add</Button>
                </div>

                {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                )}

                {members?.map((member, i) => (
                    <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <ProfileAvatar name={member.user.firstName} className={"w-10 h-10"} />
                            <div className="flex flex-col">
                                <h2 className="text-black font-medium">
                                    {member.user.firstName + " " + member.user.lastName}
                                </h2>
                                <div className="flex items-center gap-2 text-sm">
                                    <p>{member.user.email}</p>
                                    <p>•</p>
                                    <p className="capitalize">{member.role}</p>
                                </div>
                            </div>
                        </div>

                        {member.role !== "admin" && member.user._id !== user.id && (
                            <button onClick={() => handleRemoveMember(member.user._id)} className="cursor-pointer text-accent">
                                <MdOutlinePersonRemoveAlt1 size={25} />
                            </button>
                        )}
                    </div>
                ))}

                <button onClick={() => setSettingsIsOpen(false)} className="text-center cursor-pointer text-sm">Cancel</button>
            </div>
        </div>
    )
}