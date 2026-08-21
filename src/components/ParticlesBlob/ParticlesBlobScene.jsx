/* eslint-disable */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import React, { useEffect, useMemo, useRef } from "react";

/**
 * Esfera de partículas con deformación orgánica + interacción por cursor.
 * - Fondo transparente (para sección blanca)
 * - Partículas oscuras
 * - Hover: “empuja” y deforma
 * - Mouse out: vuelve suave a la forma original
 */

function ParticlesCore({
  active = true,
  count = 5000,
  radius = 0.9,
  color = "#171a1f",
  size = 0.012,
  idleMorph = 0.20,
  hoverForce = 0.95,     // 🔥 antes 0.45
  returnSpeed = 0.12,    // 🔥 antes 0.08 (más respuesta)
  spin = 0.22,
}) {
  const pointsRef = useRef(null);
  const { camera, pointer } = useThree();

  const mouseNDC = useRef(new THREE.Vector2(0, 0)); // mouse en NDC (-1..1)
  const hovered = useRef(false);

  // Base positions (esfera) + posiciones actuales
  const { base, pos, phaseTrig, geom } = useMemo(() => {
    const baseArr = new Float32Array(count * 3);
    const posArr = new Float32Array(count * 3);
    const seedArr = new Float32Array(count);
    const phaseTrigArr = new Float64Array(count * 12);

    // Distribución casi uniforme sobre esfera (Fibonacci sphere)
    const offset = 2 / count;
    const increment = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < count; i++) {
      const y = i * offset - 1 + offset / 2;
      const r = Math.sqrt(1 - y * y);
      const phi = i * increment;

      const x = Math.cos(phi) * r;
      const z = Math.sin(phi) * r;

      // Grosor leve (capa) para que parezca “nube” de partículas
      const shell = radius * (0.84 + Math.random() * 0.20);

      const ix = i * 3;
      baseArr[ix + 0] = x * shell;
      baseArr[ix + 1] = y * shell;
      baseArr[ix + 2] = z * shell;

      posArr[ix + 0] = baseArr[ix + 0];
      posArr[ix + 1] = baseArr[ix + 1];
      posArr[ix + 2] = baseArr[ix + 2];

      seedArr[i] = Math.random() * 1000;

      const storedBx = baseArr[ix + 0];
      const storedBy = baseArr[ix + 1];
      const storedBz = baseArr[ix + 2];
      const storedSeed = seedArr[i];
      const phaseIndex = i * 12;

      const n1SinPhase = storedSeed + storedBx * 1.2;
      const n1CosPhase = storedSeed + storedBy * 1.1;
      const n2CosPhase = storedSeed + storedBy * 1.3;
      const n2SinPhase = storedSeed + storedBz * 1.2;
      const n3SinPhase = storedSeed + storedBz * 1.25;
      const n3CosPhase = storedSeed + storedBx * 1.05;

      phaseTrigArr[phaseIndex + 0] = Math.sin(n1SinPhase);
      phaseTrigArr[phaseIndex + 1] = Math.cos(n1SinPhase);
      phaseTrigArr[phaseIndex + 2] = Math.sin(n1CosPhase);
      phaseTrigArr[phaseIndex + 3] = Math.cos(n1CosPhase);
      phaseTrigArr[phaseIndex + 4] = Math.sin(n2CosPhase);
      phaseTrigArr[phaseIndex + 5] = Math.cos(n2CosPhase);
      phaseTrigArr[phaseIndex + 6] = Math.sin(n2SinPhase);
      phaseTrigArr[phaseIndex + 7] = Math.cos(n2SinPhase);
      phaseTrigArr[phaseIndex + 8] = Math.sin(n3SinPhase);
      phaseTrigArr[phaseIndex + 9] = Math.cos(n3SinPhase);
      phaseTrigArr[phaseIndex + 10] = Math.sin(n3CosPhase);
      phaseTrigArr[phaseIndex + 11] = Math.cos(n3CosPhase);
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(posArr, 3));
    return { base: baseArr, pos: posArr, phaseTrig: phaseTrigArr, geom: g };
  }, [count, radius]);

  // Proyección mouse -> world
  const tmpVec = useMemo(() => new THREE.Vector3(), []);
  const cursorWorld = useRef(new THREE.Vector3(0, 0, 0));
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const planeZ = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []); // z = 0
  const hit = useMemo(() => new THREE.Vector3(), []);


  useFrame(({ clock }) => {
    if (!active) return;

    const t = clock.getElapsedTime();

    // ✅ Mouse -> rayo -> intersección con plano z=0 (centro del blob)
    if (hovered.current) {
      raycaster.setFromCamera(mouseNDC.current, camera);
      raycaster.ray.intersectPlane(planeZ, hit);
    }

    // suaviza para que se vea orgánico
    cursorWorld.current.lerp(hit, 0.35);

    const cx = cursorWorld.current.x;
    const cy = cursorWorld.current.y;
    const cz = cursorWorld.current.z;


    const sinT09 = Math.sin(t * 0.9);
    const cosT09 = Math.cos(t * 0.9);
    const sinT06 = Math.sin(t * 0.6);
    const cosT06 = Math.cos(t * 0.6);
    const sinT07 = Math.sin(t * 0.7);
    const cosT07 = Math.cos(t * 0.7);
    const sinT05 = Math.sin(t * 0.5);
    const cosT05 = Math.cos(t * 0.5);
    const sinT08 = Math.sin(t * 0.8);
    const cosT08 = Math.cos(t * 0.8);
    const sinT055 = Math.sin(t * 0.55);
    const cosT055 = Math.cos(t * 0.55);

    // ✅ NUEVO: morph continuo (respira: sube/baja la deformación)
    const breathe = 0.5 + 0.5 * sinT07;                    // 0..1
    const morph = idleMorph * (0.65 + breathe * 0.85);     // sube/baja suave

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const phaseIndex = i * 12;

      const bx = base[ix + 0];
      const by = base[ix + 1];
      const bz = base[ix + 2];

      // Noise orgánico (sin libs)
      const n1Sin =
        sinT09 * phaseTrig[phaseIndex + 1] +
        cosT09 * phaseTrig[phaseIndex + 0];
      const n1Cos =
        cosT06 * phaseTrig[phaseIndex + 3] -
        sinT06 * phaseTrig[phaseIndex + 2];
      const n2Cos =
        cosT07 * phaseTrig[phaseIndex + 5] -
        sinT07 * phaseTrig[phaseIndex + 4];
      const n2Sin =
        sinT05 * phaseTrig[phaseIndex + 7] +
        cosT05 * phaseTrig[phaseIndex + 6];
      const n3Sin =
        sinT08 * phaseTrig[phaseIndex + 9] +
        cosT08 * phaseTrig[phaseIndex + 8];
      const n3Cos =
        cosT055 * phaseTrig[phaseIndex + 11] -
        sinT055 * phaseTrig[phaseIndex + 10];

      const n1 = n1Sin * n1Cos;
      const n2 = n2Cos * n2Sin;
      const n3 = n3Sin * n3Cos;

      // ✅ CAMBIO MÍNIMO: antes era idleMorph fijo, ahora morph variable
      const ox = bx + n1 * morph;
      const oy = by + n2 * morph;
      const oz = bz + n3 * morph;

      let tx = ox;
      let ty = oy;
      let tz = oz;

      if (hovered.current) {
        const dx = ox - cx;
        const dy = oy - cy;
        const dz = oz - cz;

        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) + 0.0001;

        const influence = Math.max(0, 1 - dist / 1.25);
        const push = hoverForce * influence;

        tx = ox + (dx / dist) * push;
        ty = oy + (dy / dist) * push;
        tz = oz + (dz / dist) * push;
      }

      pos[ix + 0] += (tx - pos[ix + 0]) * returnSpeed;
      pos[ix + 1] += (ty - pos[ix + 1]) * returnSpeed;
      pos[ix + 2] += (tz - pos[ix + 2]) * returnSpeed;
    }

    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.rotation.y = t * spin;
      pointsRef.current.rotation.x = t * (spin * 0.45);
    }
  });

  return (
    <group
      onPointerMove={(e) => {
        e.stopPropagation();
        hovered.current = true;

        if (e.pointer) {
          mouseNDC.current.x = e.pointer.x;
          mouseNDC.current.y = e.pointer.y;
          return;
        }

        const rect = e.target.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        mouseNDC.current.set(x, y);
      }}
      onPointerLeave={(e) => {
        e.stopPropagation();
        hovered.current = false;
      }}
    >

      <points ref={pointsRef} geometry={geom}>
        <pointsMaterial
          color={color}
          size={size}
          sizeAttenuation
          transparent
          opacity={0.55}
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </points>
    </group>
  );
}

function FrameController({ active }) {
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    if (active) invalidate();
  }, [active, invalidate]);

  useFrame(() => {
    if (active) invalidate();
  });

  return null;
}

export default function ParticlesBlobScene({
  active,
  variant = "light",
}) {
  const palette = useMemo(() => {
    if (variant === "dark") {
      return { color: "#9bbcff", opacity: 0.85 };
    }
    return { color: "#171a1f", opacity: 0.62 };
  }, [variant]);

  return (
    <Canvas
      className="pblob__canvas"
      camera={{ position: [0, 0, 3.15], fov: 45, near: 0.1, far: 100 }}
      dpr={[1, 2]}
      frameloop="demand"
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
    >
      <FrameController active={active} />
      <ambientLight intensity={0.55} />
      <ParticlesCore active={active} color={palette.color} />
    </Canvas>
  );
}
