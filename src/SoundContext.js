/* ===== IMPORTS ===== */
import { createContext, useContext } from 'react'

/* ===== FILES ===== */
import { useSounds } from './utils/Sounds'

/* ===== EXPORT FUNCTION ===== */
const SoundContext = createContext(null)

export function SoundProvider({ children }) {
    const sounds = useSounds()

    return (
        // ALLOWS ALL COMPONENTS TO ACCESS THE SOUNDS
        <SoundContext.Provider value={sounds}>{
            children}
        </SoundContext.Provider>
    )
}

export function useSound() {
    return useContext(SoundContext)
}