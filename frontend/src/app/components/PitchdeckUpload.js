"use client";

import { useRef, useState, useEffect } from "react";
import { useUploadFile } from "../hooks/user";
import { useAuthStore } from "../stores/useAuthStore";
import { toast } from "sonner";
import { Ring2 } from "ldrs/react";
import "ldrs/react/Ring2.css";
import UploadSuccessModal from "./UploadSuccessModal";

export default function PitchdeckUpload({
    label = "Pitchdeck (PDF)",
    required = true,
    existingUrl = "",
    onUploadUrl,
    error = ""
}) {
    const fileInputRef = useRef(null);
    const user = useAuthStore((state) => state.user);
    const [fileName, setFileName] = useState("");
    const [showModal, setShowModal] = useState(false);

    const { mutateAsync: uploadFile, isPending } = useUploadFile({
        resourceType: "auto",
        uploadPreset: "pitchdeck_upload",
        cloudName: "dlq2ovqw8",
        mongoField: "pitchdeck"
    });

    useEffect(() => {
        if (existingUrl && !fileName) {
            const parts = existingUrl.split("/");
            const name = parts[parts.length - 1];
            setFileName(decodeURIComponent(name));
        }
    }, [existingUrl, fileName]);

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (file && file.type === "application/pdf") {
            setFileName(file.name);
            try {
                const url = await uploadFile({ file, userId: user?._id });
                onUploadUrl?.(url);
                toast.success("Pitchdeck uploaded.");
                setShowModal(true); // ← Zeige Modal nach Erfolg
            } catch (err) {
                toast.error("Fehler beim PDF-Upload.");
            }
        } else {
            toast.error("Bitte lade eine PDF-Datei hoch.");
        }
    };

    return (
        <div className="flex flex-col gap-2 text-black w-full">
            <div className="flex justify-between items-center">
                <label>
                    {label}
                    {required && <span className="text-red-500 text-sm ml-1">*</span>}
                </label>
            </div>

            <div className="relative w-full">
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`w-full border rounded-md p-3 cursor-pointer hover:bg-gray-50 ${error ? "border-red-500" : "border-border"
                        }`}
                >
                    {fileName || "Click to upload a PDF file"}
                </div>

                {isPending && (
                    <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-md z-10">
                        <Ring2
                            size="30"
                            stroke="3"
                            strokeLength="0.25"
                            bgOpacity="0.1"
                            speed="0.8"
                            color="black"
                        />
                    </div>
                )}
            </div>

            <input
                type="file"
                accept="application/pdf"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />

            {error && <p className="text-sm text-red-500">{error}</p>}

            {/* Modal einblenden */}
            {showModal && <UploadSuccessModal onClose={() => setShowModal(false)} />}
        </div>
    );
}
