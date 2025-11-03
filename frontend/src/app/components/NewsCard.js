import { ArrowRight } from "lucide-react"

export default function NewsCard({ source, title, snippet, url, onAdd }) {
    return (

        <div className="w-full bg-secondary border border-border rounded-md py-4 px-8 flex flex-col justify-between h-[17rem]">
            <div className="flex flex-col gap-2">
                <span className="text-sm text-muted font-medium uppercase tracking-widest text-accent font-secondary">{source}</span>
                <h4 className="text-xl font-semibold text-black">{title}</h4>
                <p className="text-sm leading-relaxed">{snippet.slice(0, 250)}...</p>
            </div>

            <div className="flex items-center justify-between mt-6">
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent font-medium text-sm hover:underline flex items-center gap-1 cursor-pointer"
                >
                    <div className="flex gap-2 items-center cursor-pointer">
                        <p>Read more</p>
                        <ArrowRight size={16} />
                    </div>
                </a>


                <button
                    onClick={onAdd}
                    className="text-sm bg-accent text-white px-3 py-1.5 rounded-lg hover:bg-accent/90 transition-all cursor-pointer"
                >
                    Add to Deal
                </button>
            </div>
        </div>

    )
}
