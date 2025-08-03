
import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import ChatBot from './chatbot';
import ErrorBoundary from '../Components/ErrorBoundary';
import './index.css';

function ChittiRoboModel({ onClick }) {
  const gltf = useGLTF('/Chitti.glb');
  
  const handleClick = (event) => {
    event.stopPropagation();
    console.log('Robot clicked!'); // Debug log
    onClick();
  };
  
  return (
    <primitive 
      object={gltf.scene} 
      scale={2} 
      onClick={handleClick}
      onPointerDown={handleClick}
      style={{ cursor: 'pointer' }}
    />
  );
}

// Preload the 3D model to avoid loading errors
useGLTF.preload('/Chitti.glb');

export default function ChittiRobo({ showFloatingButton = true }) {
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);

  const handleRobotClick = () => {
    console.log('handleRobotClick called!'); // Debug log
    console.log('Current isChatBotOpen:', isChatBotOpen); // Debug log
    setIsChatBotOpen(true);
  };

  const handleCloseChatBot = () => {
    setIsChatBotOpen(false);
  };

  const handleToggleChatBot = () => {
    setIsChatBotOpen(!isChatBotOpen);
  };

  return (
    <>
      <ErrorBoundary>
        <div className="chitti-robo-container" onClick={handleRobotClick}>
          <Canvas 
            camera={{ position: [0, 1, 5], fov: 50 }}
            onError={(error) => console.error('Canvas error:', error)}
          >
            <ambientLight intensity={0.7} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Suspense fallback={null}>
              <ChittiRoboModel onClick={handleRobotClick} />
            </Suspense>
            <OrbitControls enableZoom={true} enablePan={false} />
          </Canvas>
          
          {/* Animated text elements */}
          <div className="animated-text-container">
            <div className="animated-text text-1">AI Assistant Chitti</div>
            
            <div className="animated-text text-3">Ask anything</div>
            
          </div>
        </div>
      </ErrorBoundary>
      
      {/* ChatBot Component - only show floating button if prop is true */}
      {console.log('Rendering ChatBot with isOpen:', isChatBotOpen)}
      <ChatBot 
        isOpen={isChatBotOpen} 
        onClose={handleCloseChatBot}
        onToggle={handleToggleChatBot}
        showFloatingButton={showFloatingButton}
      />
    </>
  );
}
