import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Edges } from "@react-three/drei";

function Core() {
  const group = useRef();
  const ring = useRef();

  useFrame((state, delta) => {
    // Pointer-reactive rotation (state.pointer is -1..1)
    const { x, y } = state.pointer;
    group.current.rotation.y += (x * 0.6 - group.current.rotation.y) * 0.04 + delta * 0.15;
    group.current.rotation.x += (-y * 0.4 - group.current.rotation.x) * 0.04;
    ring.current.rotation.z += delta * 0.25;
    ring.current.rotation.x += delta * 0.1;
  });

  return (
    <group ref={group}>
      <Float speed={1.6} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh>
          <icosahedronGeometry args={[1.25, 1]} />
          <MeshDistortMaterial color="#8B5CF6" distort={0.28} speed={1.6} roughness={0.15} metalness={0.7} />
          <Edges color="#06B6D4" threshold={15} />
        </mesh>
      </Float>
      <mesh ref={ring}>
        <torusGeometry args={[2.1, 0.015, 16, 140]} />
        <meshBasicMaterial color="#3B82F6" />
      </mesh>
      <Float speed={2.2} floatIntensity={1.4}>
        <mesh position={[2.3, 1.1, 0]}>
          <octahedronGeometry args={[0.28]} />
          <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={0.6} />
        </mesh>
      </Float>
      <Float speed={1.8} floatIntensity={1.2}>
        <mesh position={[-2.2, -1, 0.4]}>
          <boxGeometry args={[0.35, 0.35, 0.35]} />
          <meshStandardMaterial color="#3B82F6" emissive="#3B82F6" emissiveIntensity={0.5} />
        </mesh>
      </Float>
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 4, 4]} intensity={60} color="#8B5CF6" />
      <pointLight position={[-4, -3, 3]} intensity={50} color="#06B6D4" />
      <Core />
    </Canvas>
  );
}
