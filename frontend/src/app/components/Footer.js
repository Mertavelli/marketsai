import Link from "next/link"

export default function Footer() {
    return (
        <div className="border-t border-border p-5 flex items-center justify-between">
            <div className="flex gap-2 items-end">
                <Link href={"/"}>
                    <img src="/logo.png" className="w-15" />
                </Link>
                <p className="text-xs">© 2025</p>
            </div>

            <div className="flex items-center gap-5 text-xs">
                <Link href={"/"} className="hover:underline">FAQ</Link>
                <Link href={"/"} className="hover:underline">Terms of Use</Link>
                <Link href={"/"} className="hover:underline">Privacy Policy</Link>
                <Link href={"/"} className="hover:underline">Markets AI</Link>
            </div>
        </div>
    )
}