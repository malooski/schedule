import { useEffect, useMemo, useRef, useState } from "react";

/* eslint-disable react-hooks/exhaustive-deps */

export default function useIntervalFlip<T>(fn1: () => T, fn2: () => T, ms: number, deps: any[]): T {
    const fn1Ref = useRef(fn1);
    fn1Ref.current = fn1;
    const fn2Ref = useRef(fn2);
    fn2Ref.current = fn2;

    const v1 = useMemo(() => fn1Ref.current(), [deps]);
    const v2 = useMemo(() => fn2Ref.current(), [deps]);

    const [flipped, setFlipped] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setFlipped(f => !f);
        }, ms);

        return () => clearInterval(interval);
    }, [ms]);

    return flipped ? v1 : v2;
}
