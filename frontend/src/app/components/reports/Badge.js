import { BsStars } from "react-icons/bs";

export default function Badge({ children, icon = true }) {
    return (
        <div className="badge-report text-accent flex items-center gap-2">
            {icon && <BsStars />}
            <p>{children}</p>
        </div>
    )
}