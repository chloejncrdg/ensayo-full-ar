import { useLoader } from '@react-three/fiber';
import { Suspense } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


const Tool = ({ modelPath, scale, position }) => {

    const gltf = useLoader(GLTFLoader, modelPath);
  return (
    <Suspense fallback={null}>
        <primitive object={gltf.scene} scale={scale} position={position} />
    </Suspense>
  )
}

export default Tool
