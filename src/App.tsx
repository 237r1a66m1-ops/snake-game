import React, { useState } from 'react';
import { MusicPlayer } from './components/MusicPlayer';
import { SnakeGame } from './components/SnakeGame';

export default function App() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-cyan-500/30 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-cyan-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-fuchsia-600/20 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Title & Info */}
        <div className="lg:col-span-3 flex flex-col gap-6 order-2 lg:order-1">
          <div className="hidden lg:block">
            <h1 className="text-5xl font-black leading-tight mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_10px_rgba(6,182,212,0.4)]">
                NEON
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-500 drop-shadow-[0_0_10px_rgba(217,70,239,0.4)]">
                BEATS
              </span>
            </h1>
            <p className="text-gray-400 font-mono text-sm leading-relaxed">
              Experience the ultimate synthesis of retro gaming and AI-generated synthwave. 
              Keep the snake alive while the beats drop.
            </p>
          </div>
        </div>

        {/* Center Column: Game */}
        <div className="lg:col-span-6 flex justify-center order-1 lg:order-2">
          <SnakeGame />
        </div>

        {/* Right Column: Music Player */}
        <div className="lg:col-span-3 flex justify-center lg:justify-end order-3">
          <MusicPlayer 
            currentTrackIndex={currentTrackIndex}
            setCurrentTrackIndex={setCurrentTrackIndex}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        </div>

      </div>
    </div>
  );
}
