

export default function Header({ prefix, title }) {
    return (
        <div className="border-b border-border pb-1 w-full">
            <h1 className="heading-slides">{prefix && <span className="heading-slides text-accent">{prefix}: </span>}{title}</h1>
        </div>

    )
}