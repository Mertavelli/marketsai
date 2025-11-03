

export default function LoadingDots() {
    return (
        <div className='flex space-x-1 justify-center items-center bg-white h-min dark:invert'>
            <span className='sr-only'>Loading...</span>
            <div className='h-1.5 w-1.5 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
            <div className='h-1.5 w-1.5 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
            <div className='h-1.5 w-1.5 bg-black rounded-full animate-bounce'></div>
        </div>
    )
}