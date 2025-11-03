import { HiMagnifyingGlass } from "react-icons/hi2";

export default function Searchbar({ value, onChange, placeholder }) {
    return (
        <div className="w-full bg-secondary rounded-md p-2 flex items-center gap-2 focus-within:outline focus-within:outline-accent" tabIndex={0}>
            <HiMagnifyingGlass size={20} />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="bg-secondary w-full focus:outline-none focus:ring-0"
                placeholder={placeholder}
            />
        </div>
    )
}
