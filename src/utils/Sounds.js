/* ===== IMPORTS ===== */
import { useRef, useCallback } from 'react'

/* ===== SOUND FILES =====*/
import rotateSound from '../audio/rotate.mp3'
import errorSound from '../audio/ohno.mp3'

/* ===== EXPORT FUNCTION ===== */
export function useSounds() {
    const sounds = useRef({
        rotate: new Audio(rotateSound),
        ohno: new Audio(errorSound)
    })

    const play = useCallback((name) => {
        const sound = sounds.current[name]
        if(!sound) return
        sound.currentTime = 0
        sound.play()
    }, [])

    return { play }
}