/* ===== IMPORTS ===== */
import { useRef, useEffect, useCallback } from 'react'
import { useThree } from '@react-three/fiber'
import JEASINGS from 'jeasings'

/* ===== FILES =====*/
import { rotateLayer } from '../utils/Movement'
import { useKeys } from '../utils/KeyStrokes'
import { useSound } from '../SoundContext'

/* ===== MOVES FOR SCRAMBLING ===== */
const MOVES = [
    { face: 'RIGHT', dir: -1 }, { face: 'RIGHT', dir: 1  },
    { face: 'LEFT', dir: 1  }, { face: 'LEFT', dir: -1 },
    { face: 'UP', dir: -1 }, { face: 'UP', dir: 1  },
    { face: 'DOWN', dir: 1  }, { face: 'DOWN', dir: -1 },
    { face: 'FRONT', dir: -1 }, { face: 'FRONT', dir: 1  },
    { face: 'BACK', dir: 1  }, { face: 'BACK', dir: -1 },
]

const randomItem = arr => arr[Math.floor(Math.random() * arr.length)]
const sleep = ms => new Promise(r => setTimeout(r, ms))

/* ===== BUTTON CONTROLS ===== */
function KeyControls({ cubeGroup, rotationCommand, showAlert, openSettings, registerControls }) {
    const { play } = useSound()
    const rotationGroup = useRef()
    const { camera } = useThree()
    const moveHistory = useRef([])

    // HANDLES REMEMBERING MOVES 
    const rememberMove = useCallback((face, dir) => {
        if (JEASINGS.getLength()) return
        play("rotate")
        rotateLayer(cubeGroup.current, rotationGroup.current, camera, face, dir)
        moveHistory.current.push({ face, dir })
    }, [cubeGroup, rotationGroup, camera, play])

    // SCRAMBLE THE CUBE
    const scramble = useCallback(async (moves = 25) => {
        const DELAY = 300

        for (let i = 0; i < moves; i++) {
            const move = randomItem(MOVES)
            play("rotate")
            rememberMove(move.face, move.dir)
            await sleep(DELAY)
        }
    }, [rememberMove, play])

    // AUTOMATICALLY SOLVES THE CUBE
    const solve = useCallback(async () => {
        const DELAY = 300
        const reversed = [...moveHistory.current].reverse()

        for (const move of reversed) {
            play("rotate")
            rememberMove(move.face, -move.dir)
            await sleep(DELAY)
        }

        moveHistory.current = []
    }, [rememberMove, play])

    // CONTROLS FOR BOTH KEYS AND BUTTONS
    useEffect(() => {
        if (!registerControls) return
        registerControls({ scramble, solve })
    }, [registerControls, scramble, solve])

    // HANDLES KEY PRESSES
    useEffect(() => {
        if (rotationCommand && cubeGroup.current) {
            rememberMove(rotationCommand.face, rotationCommand.direction)
        }
    }, [rotationCommand, rememberMove, cubeGroup])

    useKeys((e) => {
        // PREVENTS CUBE ROTATIONS BEING TRIGGERED IF TYPING INSIDE INPUT BOXES
        const target = e.target
        if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target.isContentEditable) return

        // R / SHIFT + R
        if (e.code === "KeyR") {
            const dir = e.shiftKey ? 1 : -1;
            play("rotate")
            rememberMove('RIGHT', dir);
        }

        // L / SHIFT + L
        if (e.code === "KeyL") {
            const dir = e.shiftKey ? -1 : 1;
            play("rotate")
            rememberMove('LEFT', dir);
        }

        // U / SHIFT + U
        if (e.code === "KeyU") {
            const dir = e.shiftKey ? 1 : -1;
            play("rotate")
            rememberMove('UP', dir);
        }

        // D / SHIFT + D
        if (e.code === "KeyD") {
            const dir = e.shiftKey ? -1 : 1;
            play("rotate")
            rememberMove('DOWN', dir);
        }

        // F / SHIFT + F
        if (e.code === "KeyF") {
            const dir = e.shiftKey ? 1 : -1;
            play("rotate")
            rememberMove('FRONT', dir);
        }

        // B / SHIFT + B
        if (e.code === "KeyB") {
            const dir = e.shiftKey ? -1 : 1;
            play("rotate")
            rememberMove('BACK', dir);
        }

        // S / SHIFT + S
        if (e.code === "KeyS") {
            if (e.shiftKey) {
                solve()
            } else {
                scramble(25)
            }
        }

        // O / SHIFT + O
        if (e.code === "KeyO") {
            play("weee")
            openSettings()
        }
    })

    return (
        <>
            <group ref={rotationGroup} />
        </>
    )
}

export default KeyControls