import { random } from "lodash";
import { useEffect, useRef, useState } from "react";

export function useTextGlitch(text: string): string {
    const textRef = useRef(text);
    textRef.current = text;

    const [glitched, setGlitched] = useState(text);

    useEffect(() => {
        const interval = setInterval(() => {
            setGlitched(
                textRef.current
                    .split("")
                    .map((char, index) => {
                        if (Math.random() < 0.95) {
                            return char;
                        }

                        return char === " " ? " " : "?";
                    })
                    .join("")
            );
        }, random(200, 1000));

        return () => clearInterval(interval);
    }, [glitched]);

    return glitched;
}
