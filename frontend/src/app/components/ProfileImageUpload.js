"use client";

import { FiUpload } from "react-icons/fi";
import { useRef } from "react";
import { toast } from "sonner";
import ProfileAvatar from "./ProfileAvatar";
import { useUploadFile } from "../hooks/user";

export default function ProfileImageUpload({ user }) {
    const fileInputRef = useRef(null);

    const { mutate: uploadFile, isPending } = useUploadFile({
        resourceType: "image",
        uploadPreset: "pb_upload",
        cloudName: "dlq2ovqw8",
        mongoField: "logo"
    });

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Optionale Prüfung: Bildtyp
        if (!file.type.startsWith("image/")) {
            toast.error("Bitte lade ein gültiges Bild hoch.");
            return;
        }

        uploadFile({ file, userId: user._id });
    };

    return (
        <div className="relative">
            <ProfileAvatar
                name={user?.firstName || ""}
                src={user?.logo || undefined}
                className="w-20 h-20 text-[2rem]"
            />

            {/* Hidden File Input */}
            <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
            />

            {/* Upload Button */}
            <button
                type="button"
                onClick={triggerFileInput}
                className="absolute bottom-0 right-0 bg-secondary p-1.5 rounded-full hover:bg-secondary/90 cursor-pointer transition-all"
                disabled={isPending}
            >
                <FiUpload size={20} />
            </button>
        </div>
    );
}
