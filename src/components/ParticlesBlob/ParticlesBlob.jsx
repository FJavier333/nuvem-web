/* eslint-disable */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import React, { useMemo, useRef } from "react";
import "./ParticlesBlob.css";

/**
 * Esfera de partículas con deformación orgánica + interacción por cursor.
 * - Fondo transparente (para sección blanca)
 * - Partículas oscuras
 * - Hover: “empuja” y deforma
 * - Mouse out: vuelve suave a la forma original
 */

function ParticlesCore({
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
  const { base, pos, seeds, geom } = useMemo(() => {
    const baseArr = new Float32Array(count * 3);
    const posArr = new Float32Array(count * 3);
    const seedArr = new Float32Array(count);

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
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(posArr, 3));
    return { base: baseArr, pos: posArr, seeds: seedArr, geom: g };
  }, [count, radius]);

  // Proyección mouse -> world
  const tmpVec = useMemo(() => new THREE.Vector3(), []);
  const cursorWorld = useRef(new THREE.Vector3(0, 0, 0));
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const planeZ = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []); // z = 0
  const hit = useMemo(() => new THREE.Vector3(), []);


  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // ✅ Mouse -> rayo -> intersección con plano z=0 (centro del blob)
    raycaster.setFromCamera(mouseNDC.current, camera);
    raycaster.ray.intersectPlane(planeZ, hit);

    // suaviza para que se vea orgánico
    cursorWorld.current.lerp(hit, 0.35);

    const cx = cursorWorld.current.x;
    const cy = cursorWorld.current.y;
    const cz = cursorWorld.current.z;


    // ✅ NUEVO: morph continuo (respira: sube/baja la deformación)
    const breathe = 0.5 + 0.5 * Math.sin(t * 0.7);         // 0..1
    const morph = idleMorph * (0.65 + breathe * 0.85);     // sube/baja suave

    for (let i = 0; i < count; i++) {
      const ix = i * 3;

      const bx = base[ix + 0];
      const by = base[ix + 1];
      const bz = base[ix + 2];

      const seed = seeds[i];

      // Noise orgánico (sin libs)
      const n1 = Math.sin(t * 0.9 + seed + bx * 1.2) * Math.cos(t * 0.6 + seed + by * 1.1);
      const n2 = Math.cos(t * 0.7 + seed + by * 1.3) * Math.sin(t * 0.5 + seed + bz * 1.2);
      const n3 = Math.sin(t * 0.8 + seed + bz * 1.25) * Math.cos(t * 0.55 + seed + bx * 1.05);

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

export default function ParticlesBlob({
  className = "",
  variant = "light",
}) {
  const palette = useMemo(() => {
    if (variant === "dark") {
      return { color: "#9bbcff", opacity: 0.85 };
    }
    return { color: "#171a1f", opacity: 0.62 };
  }, [variant]);

  return (
    <div className={`pblob ${className}`} aria-hidden="true">
      <Canvas
        className="pblob__canvas"
        camera={{ position: [0, 0, 3.15], fov: 45, near: 0.1, far: 100 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.55} />
        <ParticlesCore color={palette.color} />
      </Canvas>
    </div>
  );
}