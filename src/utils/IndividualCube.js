/* ===== FILES =====*/
import { FACES, INSIDE_COLOUR } from './Faces'

/* ===== EXPORT FUNCTION =====*/
function IndividualCube({ position, geometry, colours }) {
    return (
        <mesh position={position} geometry={geometry}>
            {/* APPLIES THE CORRECT COLOUR TO EACH FACE, INSIDE IS DARK GREY */}
            {[...Array(6)].map((_, i) => {
                const [axis, dir, face] = FACES[i]
                const colour = position[axis] === dir ? colours[face] : INSIDE_COLOUR

                return (
                    <meshStandardMaterial key={i} attach={`material-${i}`} color={colour} />
                )
            })}
        </mesh>
    )
}

export default IndividualCube