/* ===== IMPORTS ===== */
import { useRef, useState } from 'react'
import { Canvas, useThree, useFrame, extend } from '@react-three/fiber'
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';

/* ===== STYLES ===== */
import './styles/buttons.css'
import './styles/alerts.css'

/* ===== FILES ===== */
import Cube from './components/Cube'
import { ControlPanel } from './components/ControlPanel'
import { SoundProvider } from './SoundContext'

/* ===== MOVEMENT ===== */
extend({ TrackballControls });

function Controls() {
  const { camera, gl } = useThree();
  const controls = useRef();
  useFrame(() => controls.current.update());
  return <trackballControls ref={controls} args={[camera, gl.domElement]} rotateSpeed={3} />;
}

/* ===== DISPLAY ===== */
function App() {
  // TRACKS ROTATION
  const [rotationCommand, setRotationCommand] = useState(null)
  const cubeControls = useRef(null)

  const handleRotate = (face, direction) => {
    setRotationCommand({ face, direction, timestamp: Date.now() })
  }

  return (
    <SoundProvider>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw' }}>
        <div style={{ textAlign: 'center', padding: '1rem' }}>
          <h1 className="page-title">RUBIKS CUBE</h1>
          <h3 className="page-subtitle">MADE BY A SILLY LITTLE CREATOR</h3>
        </div>
        
        <ControlPanel onRotate={handleRotate} onScramble={n => cubeControls.current?.scramble(n)} onSolve={() => cubeControls.current?.solve()} />
        <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Canvas style={{ width: '100%', height: '100%' }} camera={{ position: [7, 7, 7], fov: 60, near: 0.01, far: 100 }}>
            <ambientLight intensity={0.8} />
            <pointLight intensity={1} position={[10, 10, 10]} />
            <Cube rotationCommand={rotationCommand} cubeControls={cubeControls} />
            <Controls />
          </Canvas>
        </div>
      </div>
    </SoundProvider>
  );
}

export default App;