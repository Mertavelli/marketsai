

export default function Button({ children, onClick, className }) {
    return (
        <button
            onClick={onClick}
            className={`bg-accent text-white py-1.5 px-4 text-center rounded-md cursor-pointer hover:bg-accent/90 ${className}`}
        >
            {children}
        </button>
    )
}