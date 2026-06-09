"use client";

import { Billboard, ContactShadows, Environment, Float, Html, Line, PerspectiveCamera } from "@react-three/drei";
import { Canvas, ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import { AnimatePresence, motion } from "framer-motion";
import { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type { Skill } from "@/lib/portfolio-data";
import { skills } from "@/lib/portfolio-data";
import { nebulaFragmentShader, nebulaVertexShader, orbFragmentShader, orbVertexShader } from "./shaders";

type SkillSolarSystemProps = {
  selectedSkill: Skill;
  onSelect: (skill: Skill) => void;
  reducedMotion: boolean;
};

function NebulaPlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { pointer } = useThree();

  useFrame((_, delta) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value += delta;
    materialRef.current.uniforms.uMouse.value.set(pointer.x, pointer.y);
  });

  return (
    <mesh position={[0, 0, -5]} scale={[13, 8, 1]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        vertexShader={nebulaVertexShader}
        fragmentShader={nebulaFragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0, 0) },
        }}
      />
    </mesh>
  );
}

function ParticleField({ reducedMotion }: { reducedMotion: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(
    () =>
      Array.from({ length: 460 }, (_, index) => ({
        radius: 3 + Math.random() * 5.6,
        angle: Math.random() * Math.PI * 2,
        y: (Math.random() - 0.5) * 5,
        speed: 0.02 + Math.random() * 0.05,
        scale: 0.01 + Math.random() * 0.026,
        phase: index * 0.17,
      })),
    [],
  );

  useFrame(({ clock }) => {
    const elapsed = clock.elapsedTime;
    particles.forEach((particle, index) => {
      const angle = particle.angle + (reducedMotion ? 0 : elapsed * particle.speed);
      dummy.position.set(
        Math.cos(angle) * particle.radius,
        particle.y + Math.sin(elapsed * 0.35 + particle.phase) * 0.08,
        Math.sin(angle) * particle.radius - 1.2,
      );
      dummy.scale.setScalar(particle.scale);
      dummy.updateMatrix();
      meshRef.current?.setMatrixAt(index, dummy.matrix);
    });
    if (meshRef.current) meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, particles.length]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#d9fffb" transparent opacity={0.68} />
    </instancedMesh>
  );
}

function EnergyOrb({ reducedMotion }: { reducedMotion: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((_, delta) => {
    if (!reducedMotion && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.22;
      meshRef.current.rotation.x += delta * 0.08;
    }
    if (materialRef.current) materialRef.current.uniforms.uTime.value += delta;
  });

  return (
    <Float speed={reducedMotion ? 0 : 1.35} rotationIntensity={0.16} floatIntensity={0.35}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.62, 96, 96]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={orbVertexShader}
          fragmentShader={orbFragmentShader}
          uniforms={{
            uTime: { value: 0 },
            uColorA: { value: new THREE.Color("#fbbf24") },
            uColorB: { value: new THREE.Color("#ef4444") },
            uColorC: { value: new THREE.Color("#67e8f9") },
          }}
        />
      </mesh>
      <mesh scale={0.82}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color="#fbbf24" transparent opacity={0.08} blending={THREE.AdditiveBlending} />
      </mesh>
      <pointLight color="#fbbf24" intensity={12} distance={6} />
      <pointLight color="#22d3ee" intensity={4} distance={5} position={[-2.5, 1.8, 2.4]} />
    </Float>
  );
}

function OrbitPath({ radius, color, tilt }: { radius: number; color: string; tilt: number }) {
  const points = useMemo(() => {
    return Array.from({ length: 160 }, (_, index) => {
      const angle = (index / 159) * Math.PI * 2;
      return new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.22, Math.sin(angle) * radius * 0.22);
    });
  }, [radius]);

  return (
    <group rotation={[tilt, 0, 0.32]}>
      <Line points={points} color={color} transparent opacity={0.34} lineWidth={1} />
    </group>
  );
}

function SkillCard({
  skill,
  index,
  selected,
  onSelect,
  reducedMotion,
}: {
  skill: Skill;
  index: number;
  selected: boolean;
  onSelect: (skill: Skill) => void;
  reducedMotion: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    const elapsed = clock.elapsedTime;
    const angle = index * 0.78 + (reducedMotion ? 0 : elapsed * skill.speed);
    const yLift = Math.sin(elapsed * 0.9 + index) * 0.12;

    if (!groupRef.current) return;
    groupRef.current.position.set(
      Math.cos(angle) * skill.orbit,
      Math.sin(angle * 1.2) * 0.34 + yLift * 0.55,
      Math.sin(angle) * skill.orbit * 0.34,
    );
    groupRef.current.scale.lerp(new THREE.Vector3(hovered || selected ? 1.04 : 1, hovered || selected ? 1.04 : 1, 1), 0.12);
  });

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onSelect(skill);
  };

  return (
    <group
      ref={groupRef}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "";
      }}
      onClick={handleClick}
    >
      <Billboard follow lockX={false} lockY={false} lockZ={false}>
        <Html transform distanceFactor={2.65} occlude={false}>
          <button
            type="button"
            className="skill-glass-card"
            style={{ "--skill-accent": skill.accent } as React.CSSProperties}
            onClick={() => onSelect(skill)}
          >
            <span className="skill-glass-card__icon">{skill.icon}</span>
            <strong>{skill.name}</strong>
            <small>{skill.short}</small>
          </button>
        </Html>
      </Billboard>
    </group>
  );
}

function CameraRig({ selectedSkill, reducedMotion }: { selectedSkill: Skill; reducedMotion: boolean }) {
  const { camera, pointer } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const elapsed = state.clock.elapsedTime;
    const focus = skills.findIndex((skill) => skill.id === selectedSkill.id);
    const orbitOffset = focus >= 0 ? focus * 0.18 : 0;
    const desired = new THREE.Vector3(
      pointer.x * 0.55 + Math.sin(elapsed * 0.08 + orbitOffset) * 0.18,
      pointer.y * 0.28 + 0.15,
      selectedSkill ? 6.1 : 6.8,
    );
    camera.position.lerp(desired, reducedMotion ? 1 : 1 - Math.pow(0.001, delta));
    target.set(pointer.x * 0.2, pointer.y * 0.08, 0);
    camera.lookAt(target);
  });

  return null;
}

function Scene({ selectedSkill, onSelect, reducedMotion }: SkillSolarSystemProps) {
  const systemRef = useRef<THREE.Group>(null);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const velocity = useRef(0);

  useFrame(({ pointer }, delta) => {
    if (!systemRef.current) return;
    if (!dragging.current) {
      systemRef.current.rotation.y += velocity.current;
      velocity.current *= 0.94;
      if (!reducedMotion) {
        systemRef.current.rotation.y += delta * 0.08 + pointer.x * 0.001;
        systemRef.current.rotation.x = THREE.MathUtils.lerp(systemRef.current.rotation.x, pointer.y * 0.12, 0.08);
      }
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.15, 6.8]} fov={36} />
      <CameraRig selectedSkill={selectedSkill} reducedMotion={reducedMotion} />
      <ambientLight intensity={0.72} />
      <directionalLight position={[4, 5, 4]} intensity={1.5} color="#ffffff" />
      <NebulaPlane />
      <ParticleField reducedMotion={reducedMotion} />
      <group
        ref={systemRef}
        scale={0.82}
        onPointerDown={(event) => {
          dragging.current = true;
          lastX.current = event.clientX;
        }}
        onPointerMove={(event) => {
          if (!dragging.current || !systemRef.current) return;
          const deltaX = event.clientX - lastX.current;
          velocity.current = deltaX * 0.0018;
          systemRef.current.rotation.y += velocity.current;
          lastX.current = event.clientX;
        }}
        onPointerUp={() => {
          dragging.current = false;
        }}
        onPointerLeave={() => {
          dragging.current = false;
        }}
      >
        <EnergyOrb reducedMotion={reducedMotion} />
        {skills.map((skill, index) => (
          <OrbitPath key={`${skill.id}-orbit`} radius={skill.orbit} color={skill.accent} tilt={0.72 + index * 0.025} />
        ))}
        {skills.map((skill, index) => (
          <SkillCard
            key={skill.id}
            skill={skill}
            index={index}
            selected={selectedSkill.id === skill.id}
            onSelect={onSelect}
            reducedMotion={reducedMotion}
          />
        ))}
      </group>
      <ContactShadows position={[0, -1.85, 0]} opacity={0.18} scale={8} blur={2.8} far={4} />
      <Environment preset="city" />
    </>
  );
}

export function SkillSolarSystem({ selectedSkill, onSelect, reducedMotion }: SkillSolarSystemProps) {
  return (
    <div className="relative h-[620px] min-h-[520px] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-black/20 shadow-2xl shadow-black/40 md:h-[760px]">
      <Canvas
        shadows
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.7]}
        performance={{ min: 0.55 }}
      >
        <Suspense fallback={null}>
          <Scene selectedSkill={selectedSkill} onSelect={onSelect} reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
      <div className="pointer-events-none absolute bottom-6 right-6 hidden items-center gap-3 text-sm text-white/45 md:flex">
        <span className="grid h-8 w-5 place-items-center rounded-full border border-white/25">↔</span>
        Drag to rotate
      </div>
      <AnimatePresence mode="wait">
        <motion.aside
          key={selectedSkill.id}
          className="glass-panel absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 p-4 md:left-auto md:right-6 md:w-80"
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 210, damping: 22 }}
        >
          <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/70">Focused skill</p>
          <h3 className="mt-2 text-2xl text-white">{selectedSkill.name}</h3>
          <p className="mt-2 text-sm leading-6 text-white/62">{selectedSkill.detail}</p>
        </motion.aside>
      </AnimatePresence>
    </div>
  );
}
