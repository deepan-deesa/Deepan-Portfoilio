// @ts-nocheck
/* eslint-disable react/no-unknown-property */
'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

// replace with your own imports, see the usage snippet for details
import cardGLB from './card.glb';
import lanyard from './lanyard.png';

import * as THREE from 'three';
import './Lanyard.css';

import { PERSONAL_DETAILS } from '../types';

extend({ MeshLineGeometry, MeshLineMaterial });

// 1x1 transparent pixel — lets useTexture be called unconditionally when a
// front/back image isn't supplied.
const BLANK_PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

// The card model's front face is UV-mapped to the LEFT half of the texture
// atlas and the back face to the RIGHT half (measured from card.glb). Each
// custom image is composited into its own half so the two faces render
// independently, aspect-preserving (no stretching).
const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 };
const BACK_UV_RECT = { x: 0.5, y: 0, w: 0.5, h: 0.757 };

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  frontImage = null,
  backImage = null,
  imageFit = 'cover',
  lanyardImage = null,
  lanyardWidth = 1,
  playEntrance = false
}) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const [generatedFront, setGeneratedFront] = useState<string | null>(null);
  const [generatedBack, setGeneratedBack] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (frontImage || backImage) return;

    // Load avatar image
    const avatarImg = new Image();
    avatarImg.crossOrigin = 'anonymous';
    avatarImg.src = PERSONAL_DETAILS.avatar;
    avatarImg.onload = () => {
      // Create Front Canvas
      const canvasF = document.createElement('canvas');
      canvasF.width = 600;
      canvasF.height = 900;
      const ctxF = canvasF.getContext('2d');
      if (ctxF) {
        // Gradient background
        const grad = ctxF.createLinearGradient(0, 0, 0, 900);
        grad.addColorStop(0, '#0f0f15');
        grad.addColorStop(0.5, '#08080c');
        grad.addColorStop(1, '#150820');
        ctxF.fillStyle = grad;
        ctxF.fillRect(0, 0, 600, 900);

        // Cyber grids
        ctxF.strokeStyle = 'rgba(255, 255, 255, 0.02)';
        ctxF.lineWidth = 1;
        for (let i = 0; i < 600; i += 40) {
          ctxF.beginPath();
          ctxF.moveTo(i, 0);
          ctxF.lineTo(i, 900);
          ctxF.stroke();
        }
        for (let i = 0; i < 900; i += 40) {
          ctxF.beginPath();
          ctxF.moveTo(0, i);
          ctxF.lineTo(600, i);
          ctxF.stroke();
        }

        // Glowing border
        ctxF.strokeStyle = 'rgba(6, 182, 212, 0.35)';
        ctxF.lineWidth = 12;
        ctxF.strokeRect(6, 6, 588, 888);

        // Lanyard Slot
        ctxF.fillStyle = '#000000';
        ctxF.beginPath();
        if (ctxF.roundRect) {
          ctxF.roundRect(250, 30, 100, 20, 10);
        } else {
          ctxF.rect(250, 30, 100, 20);
        }
        ctxF.fill();

        // Header info
        ctxF.fillStyle = '#94a3b8';
        ctxF.font = 'bold 20px monospace';
        ctxF.textAlign = 'center';
        ctxF.fillText('SNS COLLEGE OF ENGINEERING', 300, 100);
        ctxF.fillStyle = '#64748b';
        ctxF.font = 'bold 15px monospace';
        ctxF.fillText('CSE DEPARTMENT • STUDENT ID', 300, 130);

        // Header line
        ctxF.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctxF.lineWidth = 2;
        ctxF.beginPath();
        ctxF.moveTo(50, 160);
        ctxF.lineTo(550, 160);
        ctxF.stroke();

        // Rounded Avatar frame
        ctxF.save();
        ctxF.beginPath();
        if (ctxF.roundRect) {
          ctxF.roundRect(200, 200, 200, 200, 30);
        } else {
          ctxF.arc(300, 300, 100, 0, Math.PI * 2);
        }
        ctxF.clip();
        ctxF.drawImage(avatarImg, 200, 200, 200, 200);
        ctxF.restore();

        // Avatar outer glow/border
        ctxF.strokeStyle = 'rgba(6, 182, 212, 0.7)';
        ctxF.lineWidth = 6;
        ctxF.beginPath();
        if (ctxF.roundRect) {
          ctxF.roundRect(200, 200, 200, 200, 30);
        } else {
          ctxF.arc(300, 300, 100, 0, Math.PI * 2);
        }
        ctxF.stroke();

        // Name & Role
        ctxF.fillStyle = '#ffffff';
        ctxF.font = '900 42px sans-serif';
        ctxF.fillText(PERSONAL_DETAILS.name.toUpperCase(), 300, 460);

        ctxF.fillStyle = '#22d3ee';
        ctxF.font = 'bold 20px monospace';
        ctxF.fillText(PERSONAL_DETAILS.role.toUpperCase(), 300, 500);

        // Details list panel
        ctxF.fillStyle = 'rgba(255, 255, 255, 0.03)';
        ctxF.fillRect(80, 550, 440, 180);
        ctxF.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctxF.strokeRect(80, 550, 440, 180);

        ctxF.fillStyle = '#94a3b8';
        ctxF.font = 'bold 18px monospace';
        ctxF.textAlign = 'left';
        ctxF.fillText('DEGREE:', 110, 600);
        ctxF.fillText('YEAR/SEM:', 110, 650);
        ctxF.fillText('STATUS:', 110, 700);

        ctxF.fillStyle = '#ffffff';
        ctxF.font = 'bold 18px monospace';
        ctxF.fillText('B.E. CSE', 260, 600);
        ctxF.fillText('3rd Yr / Sem 5', 260, 650);
        ctxF.fillText('ONLINE', 260, 700);

        // Barcode
        ctxF.fillStyle = '#a855f7';
        ctxF.font = 'bold 14px monospace';
        ctxF.textAlign = 'center';
        ctxF.fillText('UID_DEEPAN_CSE_SNS', 300, 790);

        ctxF.fillStyle = 'rgba(255, 255, 255, 0.4)';
        const bCodeX = 170;
        const bCodeY = 820;
        const widths = [6, 14, 4, 8, 4, 14, 8, 4, 18, 4, 8];
        let cX = bCodeX;
        for (let w of widths) {
          ctxF.fillRect(cX, bCodeY, w, 32);
          cX += w + 6;
        }

        setGeneratedFront(canvasF.toDataURL());
      }

      // Create Back Canvas
      const canvasB = document.createElement('canvas');
      canvasB.width = 600;
      canvasB.height = 900;
      const ctxB = canvasB.getContext('2d');
      if (ctxB) {
        // Gradient background back
        const gradB = ctxB.createLinearGradient(0, 0, 0, 900);
        gradB.addColorStop(0, '#150820');
        gradB.addColorStop(0.5, '#08080c');
        gradB.addColorStop(1, '#0f0f15');
        ctxB.fillStyle = gradB;
        ctxB.fillRect(0, 0, 600, 900);

        // Cyber grids back
        ctxB.strokeStyle = 'rgba(255, 255, 255, 0.02)';
        ctxB.lineWidth = 1;
        for (let i = 0; i < 600; i += 40) {
          ctxB.beginPath();
          ctxB.moveTo(i, 0);
          ctxB.lineTo(i, 900);
          ctxB.stroke();
        }
        for (let i = 0; i < 900; i += 40) {
          ctxB.beginPath();
          ctxB.moveTo(0, i);
          ctxB.lineTo(600, i);
          ctxB.stroke();
        }

        // Glowing border back
        ctxB.strokeStyle = 'rgba(168, 85, 247, 0.35)';
        ctxB.lineWidth = 12;
        ctxB.strokeRect(6, 6, 588, 888);

        // Lanyard Slot
        ctxB.fillStyle = '#000000';
        ctxB.beginPath();
        if (ctxB.roundRect) {
          ctxB.roundRect(250, 30, 100, 20, 10);
        } else {
          ctxB.rect(250, 30, 100, 20);
        }
        ctxB.fill();

        // Header info B
        ctxB.fillStyle = '#94a3b8';
        ctxB.font = 'bold 20px monospace';
        ctxB.textAlign = 'center';
        ctxB.fillText('GITHUB CONTROLLER', 300, 110);

        // Header line
        ctxB.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctxB.lineWidth = 2;
        ctxB.beginPath();
        ctxB.moveTo(50, 160);
        ctxB.lineTo(550, 160);
        ctxB.stroke();

        // GitHub big text / icon placeholder
        ctxB.fillStyle = '#ffffff';
        ctxB.font = 'bold 36px sans-serif';
        ctxB.fillText('CONNECT WITH ME', 300, 340);

        ctxB.fillStyle = '#ffffff';
        ctxB.font = 'bold 20px monospace';
        ctxB.fillText('github.com/deepan-deesa', 300, 420);

        // Custom tech pill highlights on back
        const pills = ['REACT', 'THREE.JS', 'DJANGO', 'POSTGRESQL'];
        let startY = 480;
        ctxB.font = 'bold 16px monospace';
        for (let pill of pills) {
          ctxB.fillStyle = 'rgba(168, 85, 247, 0.1)';
          ctxB.fillRect(200, startY, 200, 40);
          ctxB.strokeStyle = 'rgba(168, 85, 247, 0.3)';
          ctxB.strokeRect(200, startY, 200, 40);
          ctxB.fillStyle = '#ffffff';
          ctxB.fillText(pill, 300, startY + 26);
          startY += 60;
        }

        ctxB.fillStyle = '#64748b';
        ctxB.font = '14px monospace';
        ctxB.fillText('DESIGNED BY ANTIGRAVITY AI', 300, 830);

        setGeneratedBack(canvasB.toDataURL());
      }
    };
  }, [frontImage, backImage]);

  return (
    <div
      className={`lanyard-wrapper ${playEntrance ? 'lanyard-wrapper--enter' : ''}`}
      aria-label="Interactive portfolio ID lanyard"
    >
      <Canvas
        camera={{ position: position, fov: fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band
            isMobile={isMobile}
            frontImage={frontImage || generatedFront}
            backImage={backImage || generatedBack}
            imageFit={imageFit}
            lanyardImage={lanyardImage}
            lanyardWidth={lanyardWidth}
          />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}
function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
  frontImage = null,
  backImage = null,
  imageFit = 'cover',
  lanyardImage = null,
  lanyardWidth = 1
}) {
  const band = useRef(),
    fixed = useRef(),
    j1 = useRef(),
    j2 = useRef(),
    j3 = useRef(),
    card = useRef();
  const vec = new THREE.Vector3(),
    ang = new THREE.Vector3(),
    rot = new THREE.Vector3(),
    dir = new THREE.Vector3();
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };
  const { nodes, materials } = useGLTF(cardGLB);
  const texture = useTexture(lanyardImage || lanyard);
  // useTexture must be called unconditionally; use a blank pixel when an image
  // isn't supplied for a given face, then skip compositing it below.
  const frontTex = useTexture(frontImage || BLANK_PIXEL);
  const backTex = useTexture(backImage || BLANK_PIXEL);

  // Composite the front/back images into the card's texture atlas (front = left
  // half, back = right half). Each image is drawn aspect-preserving (no stretch).
  const cardMap = useMemo(() => {
    const baseMap = materials.base.map;
    if (!frontImage && !backImage) return baseMap;

    const baseImg = baseMap.image;
    const W = baseImg.width;
    const H = baseImg.height;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return baseMap;
    // Keep the original baked atlas for the card edges and any untouched face.
    ctx.drawImage(baseImg, 0, 0, W, H);

    const drawFitted = (img, rect) => {
      const rx = rect.x * W;
      const ry = rect.y * H;
      const rw = rect.w * W;
      const rh = rect.h * H;
      const pick = imageFit === 'contain' ? Math.min : Math.max;
      const scale = pick(rw / img.width, rh / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      const dx = rx + (rw - dw) / 2;
      const dy = ry + (rh - dh) / 2;
      ctx.save();
      ctx.beginPath();
      ctx.rect(rx, ry, rw, rh);
      ctx.clip();
      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.restore();
    };

    if (frontImage && frontTex.image) drawFitted(frontTex.image, FRONT_UV_RECT);
    if (backImage && backTex.image) drawFitted(backTex.image, BACK_UV_RECT);

    const composite = new THREE.CanvasTexture(canvas);
    composite.colorSpace = THREE.SRGBColorSpace;
    composite.flipY = baseMap.flipY;
    composite.anisotropy = 16;
    composite.needsUpdate = true;
    return composite;
  }, [frontImage, backImage, imageFit, frontTex, backTex, materials.base.map]);
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.5, 0]
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    if (fixed.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={e => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={e => (
              e.target.setPointerCapture(e.pointerId),
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))
            )}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={cardMap}
                map-anisotropy={16}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={lanyardWidth}
        />
      </mesh>
    </>
  );
}
