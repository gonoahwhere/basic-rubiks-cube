import { useFrame } from '@react-three/fiber'
import { useMemo, useRef, useEffect } from 'react'
import JEASINGS from 'jeasings'

/* ===== NODE MODULES ===== */
import { RoundedBoxGeometry } from 'three/examples/jsm/Addons.js'

/* ===== FILES ===== */
import KeyControls from './Keys'
import IndividualCube from '../utils/IndividualCube'

/* ===== FUNCTION ===== */
function Cube({ rotationCommand, cubeControls }) {
    const ref = useRef()

    // CUBE SIZE, COLOURS + OFFSET
    const N = 3
    const offset = (N - 1) / 2
    const colours = {
        'RIGHT': '#FFA061',
        'LEFT': '#FF0000',
        'UP': '#FFFFFF',
        'DOWN': '#FFFF00',
        'FRONT': '#00BB00',
        'BACK': '#0000BB',
    }

    // ROUNDS THE INDIVIDUAL CUBES TO GIVE CLEAN EDGES
    const roundedBoxGeometry = useMemo(() => new RoundedBoxGeometry(1, 1, 1, 3, 0.1), []);

    // LISTENS FOR ROTATION FROM BUTTON PANELS
    useEffect(() => {
        if (rotationCommand && ref.current) {
            return
        }
    }, [rotationCommand])

    // ALLOWS FOR SMOOTH ANIMATIONS ON EACH FRAME
    useFrame(() => {
        JEASINGS.update();
    })

    // GENERATES THE 3X3 CUBE
    return (
        <>
            <group ref={ref} position={[0, 0, 0]} scale={[1.5, 1.5, 1.5]}>
                {/* LOOPS OVER LEFT TO RIGHT */}
                {[...Array(N).keys()].map((x) =>
                    // LOOPS OVER BOTTOM TO TOP
                    [...Array(N).keys()].map((y) =>
                        // LOOPS OVER BACK TO FRONT
                        [...Array(N).keys()].map((z) => (
                            <IndividualCube
                                // EACH INDIVIDUAL CUBE GETS A UNIQUE ID
                                key={x + y * N + z * N * N}
                                // POSITIONS CUBE IN THE CENTRE / ORIGIN
                                position={[x - offset, y - offset, z - offset]}
                                // USE ROUNDED EDGES
                                geometry={roundedBoxGeometry}
                                // SETS COLOURS ON THE FACES
                                colours={colours}
                            />
                        ))
                    )
                )}
            </group>
            <KeyControls cubeGroup={ref} rotationCommand={rotationCommand} registerControls={controls => { cubeControls.current = controls }}/>
        </>
    )
}

export default Cube