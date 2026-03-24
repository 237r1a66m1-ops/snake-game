import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from 'lucide-react';
import { TRACKS } from '../constants';

interface MusicPlayerProps {
  currentTrackIndex: number;
  setCurrentTrackIndex: (index: number) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export function MusicPlayer({ currentTrackIndex, setCurrentTrackIndex, isPlaying, setIsPlaying }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleNext = () => {
    setCurrentTrackIndex((currentTrackIndex + 1) % TRACKS.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((currentTrackIndex - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setProgress((current / duration) * 100 || 0);
    }
  };

  const handleTrackEnded = () => {
    handleNext();
  };

  return (
    <div className="bg-gray-900/80 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-6 shadow-[0_0_20px_rgba(6,182,212,0.2)] w-full max-w-md flex flex-col items-center">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTrackEnded}
      />
      
      <div className="w-full flex items-center justify-between mb-6">
        <div className="flex flex-col">
          <h2 className="text-cyan-400 font-bold text-xl tracking-wider uppercase drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
            {currentTrack.title}
          </h2>
          <p className="text-fuchsia-400 text-sm tracking-widest uppercase">
            {currentTrack.artist}
          </p>
        </div>
        <div className="w-12 h-12 rounded-full bg-gray-800 border-2 border-fuchsia-500 flex items-center justify-center shadow-[0_0_15px_rgba(217,70,239,0.5)] animate-pulse">
          <div className="w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,1)]" />
        </div>
      </div>

      <div className="w-full h-1 bg-gray-800 rounded-full mb-6 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center justify-center gap-6 mb-6">
        <button 
          onClick={handlePrev}
          className="p-3 rounded-full bg-gray-800 text-cyan-400 hover:bg-gray-700 hover:text-cyan-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all"
        >
          <SkipBack size={24} />
        </button>
        <button 
          onClick={togglePlay}
          className="p-4 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white hover:shadow-[0_0_25px_rgba(217,70,239,0.6)] transition-all transform hover:scale-105"
        >
          {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
        </button>
        <button 
          onClick={handleNext}
          className="p-3 rounded-full bg-gray-800 text-fuchsia-400 hover:bg-gray-700 hover:text-fuchsia-300 hover:shadow-[0_0_15px_rgba(217,70,239,0.5)] transition-all"
        >
          <SkipForward size={24} />
        </button>
      </div>

      <div className="w-full flex items-center gap-3 px-4">
        <button onClick={() => setIsMuted(!isMuted)} className="text-gray-400 hover:text-cyan-400 transition-colors">
          {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          value={isMuted ? 0 : volume}
          onChange={(e) => {
            setVolume(parseFloat(e.target.value));
            setIsMuted(false);
          }}
          className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
        />
      </div>
    </div>
  );
}
