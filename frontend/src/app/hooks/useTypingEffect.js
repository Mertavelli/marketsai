import { useState, useEffect, useRef } from "react";

export function useTypingEffect(text, delay = 15, onComplete) {
    const [typedText, setTypedText] = useState("");
    const indexRef = useRef(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (!text) return;

        indexRef.current = 0;
        setTypedText("");
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setTypedText((prev) => prev + text.charAt(indexRef.current));
            indexRef.current += 1;

            if (indexRef.current >= text.length) {
                clearInterval(intervalRef.current);
                if (onComplete) onComplete();
            }
        }, delay);

        return () => clearInterval(intervalRef.current);
    }, [text]);

    return typedText;
}
