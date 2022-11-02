import { useMemo } from "react";

export function useRandInt(min: number, max: number): number {
    return useMemo(() => Math.floor(Math.random() * (max - min + 1)) + min, [min, max]);
}
