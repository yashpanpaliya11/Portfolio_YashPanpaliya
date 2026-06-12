import { useRef, useMemo, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Loader } from '@react-three/drei';
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
function TechBall(props: { position: [number, number, number], size: number, text: string, onClick: () => void, isSelected?: boolean }) {
  const rigidBodyRef = useRef<any>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
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

    if (meshRef.current) {
      const targetScale = (hovered || props.isSelected) ? 1.15 : 1;
      const currentScale = meshRef.current.scale.x;
      const nextScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.1);
      meshRef.current.scale.setScalar(nextScale);
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
      <mesh 
        ref={meshRef}
        castShadow 
        receiveShadow
        onClick={(e) => {
          e.stopPropagation();
          props.onClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.classList.add('cursor-hover');
        }}
        onPointerOut={(e) => {
          setHovered(false);
          document.body.classList.remove('cursor-hover');
        }}
      >
        <sphereGeometry args={[size, 64, 64]} />
        <meshPhysicalMaterial
          map={texture}
          color={props.isSelected ? "#88ff88" : hovered ? "#d0ffd0" : "#ffffff"}
          emissive={props.isSelected ? "#00ff88" : hovered ? "#00ff88" : "#000000"}
          emissiveIntensity={props.isSelected ? 0.6 : hovered ? 0.3 : 0}
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

function Cloud({ onTechClick, selectedTech }: { onTechClick: (tech: string) => void, selectedTech: string | null }) {
  const techs = [
    'React', 'TypeScript', 'Tailwind CSS', 'HTML / CSS',
    'Firebase / Firestore', 'Python', 'REST APIs',
    'n8n', 'Gemini API', 'Hugging Face', 'RAG Pipelines', 'LLMs',
    'Vercel', 'Netlify', '💻 GitHub', 'Docker', '💼 LinkedIn'
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
        return <TechBall key={text} position={[x, y, z]} size={1.8} text={text} onClick={() => onTechClick(text)} isSelected={selectedTech === text} />;
      })}
    </group>
  );
}

const techDescriptions: Record<string, string> = {
  'React': "Built dynamic, responsive SPAs and complex UI components.",
  'TypeScript': "Enforced type safety and scalable architecture across projects.",
  'Tailwind CSS': "Crafted pixel-perfect, mobile-first designs with utility classes.",
  'HTML / CSS': "The structural foundation of web applications and custom layouts.",
  'Firebase / Firestore': "Implemented real-time databases and secure authentication.",
  'Python': "Developed backend logic, web scraping scripts, and automation tasks.",
  'REST APIs': "Designed and consumed scalable, RESTful backend services.",
  'n8n': "Automated complex workflows and API integrations without manual coding.",
  'Gemini API': "Integrated AI capabilities for text generation and content intelligence.",
  'Hugging Face': "Leveraged open-source machine learning models for natural language tasks.",
  'RAG Pipelines': "Built Retrieval-Augmented Generation systems to ground AI with custom data.",
  'LLMs': "Orchestrated Large Language Models for advanced reasoning and chat interfaces.",
  'Vercel': "Deployed frontend applications with automated CI/CD and edge functions.",
  'Netlify': "Managed continuous deployments and serverless functions for static sites.",
  '💻 GitHub': "Managed version control and collaborative code repositories.",
  'Docker': "Containerized applications for consistent development and deployment environments.",
  '💼 LinkedIn': "Professional network and career highlights."
};

export default function TechStack3D() {
  const container = useRef<HTMLDivElement>(null);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  useGSAP(() => {
    // Just keeping the container structure
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 60%",
      }
    });

    tl.fromTo('.canvas-container',
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: "power2.out" }
    );
  }, { scope: container });

  const handleTechClick = (tech: string) => {
    setSelectedTech(tech);
  };

  return (
    <section id="tech-stack" ref={container} className="relative border-b border-[#ffffff14] flex flex-col p-8 md:p-12 lg:p-16 bg-[#000000] overflow-hidden min-h-[600px] lg:min-h-[800px]">
      <div className="w-full relative z-20 flex-shrink-0">
        <div className="font-mono text-[10px] tracking-wider text-accent uppercase mb-4">
          04 // ARSENAL
        </div>
        <h2 className="text-5xl md:text-7xl font-sans tracking-tighter mb-4 text-white">
          MY TECH STACK
        </h2>
      </div>
      
      <div className="canvas-container absolute inset-0 z-10 pt-32">
        <Canvas shadows camera={{ position: [0, 0, 20], fov: 45 }} gl={{ alpha: true }}>
          <Suspense fallback={null}>
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
              <Cloud onTechClick={handleTechClick} selectedTech={selectedTech} />
            </Physics>
            
            <Environment preset="city" />
            <EffectComposer multisampling={4}>
              <N8AO distanceFalloff={0.2} aoRadius={1} intensity={1} color="#000000" />
            </EffectComposer>
          </Suspense>
        </Canvas>
        <Loader 
          containerStyles={{ background: 'transparent' }} 
          innerStyles={{ background: '#111', width: '200px', height: '10px', borderRadius: '5px' }} 
          barStyles={{ background: '#00ff88', height: '10px', borderRadius: '5px' }} 
          dataStyles={{ color: '#00ff88', fontFamily: 'monospace', fontSize: '14px', marginTop: '10px' }} 
        />
      </div>

      {selectedTech && (
        <div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 bg-[#000000]/90 backdrop-blur-md border border-accent/30 p-6 rounded-sm min-w-[300px] max-w-[90vw] md:max-w-[400px] shadow-[0_0_30px_rgba(0,255,136,0.1)] flex flex-col gap-3"
          style={{ animation: 'lbFadeIn 0.3s ease-out' }}
        >
          <div className="flex justify-between items-center border-b border-accent/20 pb-2">
            <h3 className="font-mono text-accent text-lg font-bold">{selectedTech}</h3>
            <button 
              onClick={() => setSelectedTech(null)} 
              className="text-white/50 hover:text-white transition-colors p-1"
            >
              ✕
            </button>
          </div>
          <p className="text-text-secondary text-sm leading-relaxed">
            {techDescriptions[selectedTech] || "Experienced with this technology in various projects."}
          </p>
        </div>
      )}
    </section>
  );
}
