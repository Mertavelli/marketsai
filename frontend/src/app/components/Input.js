import Link from "next/link"

export default function Input({
    type,
    placeholder,
    label,
    value,
    setValue,
    forgot = false,
    required = true,
    error = "" // <- neue Prop
}) {
    return (
        <div className="flex flex-col gap-2 text-black w-full">
            <div className="flex justify-between">
                <label>
                    {label}
                    {required && <span className="text-red-500 text-sm ml-1">*</span>}
                </label>
                {forgot && <Link href={"/"} className="text-accent">Forgot?</Link>}
            </div>

            <input
                onChange={(e) => setValue(e.target.value)}
                value={value}
                type={type}
                placeholder={placeholder}
                className={`w-full border rounded-md p-3 ${error ? "border-red-500" : "border-border"
                    }`}
            />

            {error && (
                <p className="text-sm text-red-500">{error}</p>
            )}
        </div>
    )
}
