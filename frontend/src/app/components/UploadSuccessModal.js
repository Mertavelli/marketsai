"use client";

export default function UploadSuccessModal({ onClose, onAnalyze }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md text-center">
                <h2 className="text-xl font-semibold mb-4">Pitchdeck uploaded successfully</h2>
                <p className="text-gray-700 mb-6">
                    Your pitchdeck has been uploaded and is ready for analysis. You can now save it and generate insights — or close this window.
                </p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onClose}
                        className="border border-border px-4 py-2 rounded hover:bg-gray-100 transition cursor-pointer"
                    >
                        Close
                    </button>
                    <button
                        onClick={onAnalyze}
                        className="bg-accent text-white px-4 py-2 rounded hover:bg-accent/90 transition cursor-pointer"
                    >
                        Save & Analyze
                    </button>
                </div>
            </div>
        </div>
    );
}
