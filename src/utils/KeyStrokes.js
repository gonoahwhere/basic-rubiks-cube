/* ===== IMPORTS ===== */
import { useEffect } from 'react'

/* ===== EXPORT FUNCTION ===== */
export function useKeys(callback) {
    useEffect(() => {
        const keyDown = (e) => {
            // IGNORES KEY BEING HELD DOWN
            if (e.repeat) return
            callback(e)
        }

        window.addEventListener("keydown", keyDown)
        return () => window.removeEventListener("keydown", keyDown)
    }, [callback])
}