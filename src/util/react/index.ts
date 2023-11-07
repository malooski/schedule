import { useEffect, useMemo, useRef, useState } from "react";

export function useRandInt(min: number, max: number): number {
    return useMemo(() => Math.floor(Math.random() * (max - min + 1)) + min, [min, max]);
}

export function useInterval(func: () => void, ms: number) {
    const funcRef = useRef(func);
    funcRef.current = func;

    useEffect(() => {
        const interval = setInterval(() => funcRef.current(), ms);
        return () => clearInterval(interval);
    }, [ms]);
}

export function useIntervalState<T>(func: () => T, ms: number) {
    const [value, setValue] = useState<T>(func());
    const funcRef = useRef(func);
    funcRef.current = func;

    useEffect(() => {
        const interval = setInterval(() => {
            setValue(funcRef.current());
        }, ms);
        return () => clearInterval(interval);
    }, [ms]);

    return value;
}
