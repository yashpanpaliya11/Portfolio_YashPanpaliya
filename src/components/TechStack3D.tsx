import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { Physics, RigidBody, BallCollider } from '@react-three/rapier';
import { EffectComposer, N8AO } from '@react-three/postprocessing';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const createTextTexture = (text: string) => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    ctx.fillStyle = '#111111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#00ff88';
    ctx.font = 'bold 84px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Simple wrap text logic for canvas if it's too long
    const words = text.split(' ');
    let line = '';
    const lines = [];
    const maxWidth = 460;

    for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && i > 0) {
            lines.push(line.trim());
            line = words[i] + ' ';
        } else {
            line = testLine;
        }
    }
    lines.push(line.trim());

    const lineHeight = 96;
    const yOffset = (canvas.height - (lines.length * lineHeight)) / 2 + (lineHeight / 2);
    lines.forEach((l, i) => {
        ctx.fillText(l, canvas.width / 2, yOffset + i * lineHeight);
    });
  }
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 16;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.repeat.set(2, 1);
  return texture;
};

// Using any to prevent complex type issues with older/newer @react-three/rapier versions
function TechBall(props: { position: [number, number, number], size: number, text: string }) {
  const rigidBodyRef = useRef<any>(null);
  const texture = useMemo(() => createTextTexture(props.text), [props.text]);
  const size = props.size;

  useFrame((_state) => {
    if (rigidBodyRef.current) {
      const pos = rigidBodyRef.current.translation();
      const dist = Math.sqrt(pos.x ** 2 + pos.y ** 2 + pos.z ** 2);
      // Gentle centripetal force
      const forceMultiplier = 0.5;
      const force = {
        x: -pos.x * forceMultiplier,
        y: -pos.y * forceMultiplier,
        z: -pos.z * forceMultiplier,
      };
      rigidBodyRef.current.applyImpulse(force, true);
    }
  });

  return (
    <RigidBody
      ref={rigidBodyRef}
      colliders={false}
      position={props.position}
      restitution={0.9}
      friction={0.1}
      linearDamping={1.5}
      angularDamping={1.5}
    >
      <BallCollider args={[size]} />
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[size, 64, 64]} />
        <meshPhysicalMaterial
          map={texture}
          color="#ffffff"
          metalness={0.6}
          roughness={0.2}
          clearcoat={0.8}
        />
      </mesh>
    </RigidBody>
  );
}

function PointerMesh() {
  const ref = useRef<any>(null);
  // Pointer interacts with the balls
  useFrame(({ pointer, viewport }) => {
    if (ref.current) {
      ref.current.setNextKinematicTranslation({
        x: (pointer.x * viewport.width) / 2,
        y: (pointer.y * viewport.height) / 2,
        z: 0
      });
    }
  });
  return (
    <RigidBody type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[2.5]} />
    </RigidBody>
  );
}

function Cloud() {
  const techs = [
    'React', 'TypeScript', 'Tailwind CSS', 'HTML / CSS',
    'Firebase / Firestore', 'Python', 'REST APIs',
    'n8n', 'Gemini API', 'Hugging Face', 'RAG Pipelines', 'LLMs',
    'Vercel', 'Netlify', 'GitHub', 'Docker'
  ];

  return (
    <group>
      {techs.map((text, i) => {
        // distribute them randomly in a sphere
        const phi = Math.acos(1 - 2 * (i + 0.5) / techs.length);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;
        const r = 3 + Math.random() * 3;
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);
        return <TechBall key={text} position={[x, y, z]} size={1.8} text={text} />;
      })}
    </group>
  );
}

export default function TechStack3D() {
  const container = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 60%",
      }
    });

    tl.to(overlayRef.current, {
      scaleY: 0,
      transformOrigin: "top",
      duration: 1,
      ease: "power2.inOut",
    })
    .fromTo('.tech-eyebrow',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    )
    .fromTo('.tech-title',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    )
    .fromTo('.canvas-container',
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: "power2.out" },
      "-=0.4"
    );
  }, { scope: container });

  return (
    <section id="tech-stack" ref={container} className="relative border-b border-[#ffffff14] flex flex-col p-8 md:p-12 lg:p-16 bg-[#0a0a0a] overflow-hidden min-h-[600px]">
      {/* Curtain Overlay */}
      <div ref={overlayRef} className="absolute inset-0 bg-[#0a0a0a] z-50 pointer-events-none"></div>

      <div className="w-full relative z-20 flex-shrink-0">
        <div className="tech-eyebrow font-mono text-[10px] tracking-wider text-accent uppercase mb-4">
          04 // ARSENAL
        </div>
        <h2 className="tech-title text-5xl md:text-7xl font-sans tracking-tighter mb-4 text-white">
          MY TECH STACK
        </h2>
      </div>
      
      <div className="canvas-container absolute inset-0 z-10 pt-32">
        <Canvas shadows camera={{ position: [0, 0, 20], fov: 45 }} gl={{ alpha: true }}>
          <ambientLight intensity={1.5} />
          <directionalLight 
            position={[10, 15, 10]} 
            intensity={2} 
            color="#ffffff" 
            castShadow 
            shadow-mapSize-width={1024} 
            shadow-mapSize-height={1024} 
          />
          <pointLight position={[-10, 10, 10]} intensity={1.5} color="#ffffff" />
          <pointLight position={[10, -10, -10]} intensity={1} color="#ffffff" />
          
          <Physics gravity={[0, 0, 0]}>
            <PointerMesh />
            <Cloud />
          </Physics>
          
          <Environment preset="city" />
          <EffectComposer multisampling={4}>
            <N8AO distanceFalloff={0.2} aoRadius={1} intensity={1} color="#000000" />
          </EffectComposer>
        </Canvas>
      </div>
    </section>
  );
}
