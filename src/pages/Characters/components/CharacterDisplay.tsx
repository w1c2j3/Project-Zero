import React, { useEffect, useState, useRef } from 'react';
import { useSnapshot } from 'valtio';
import { platformState } from '../../../states/auth';
import '../platform.module.sass';

const CharacterDisplay: React.FC = () => {
  const platform = useSnapshot(platformState);
  const { selectedCharacter } = platform;

  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (selectedCharacter) {
      setIsVisible(false);

      // Add small delay for animation
      setTimeout(() => {
        setIsVisible(true);

        // Play video
        if (videoRef.current) {
          videoRef.current.play().catch(err => {
            console.error('Video play error:', err);
          });
        }
      }, 300);
    }
  }, [selectedCharacter]);

  if (!selectedCharacter) {
    return (
      <div className="character-display character-display--empty">
        <div className="character-display__message">
          请选择一个角色以查看详情
        </div>
      </div>
    );
  }

  return (
    <div className={`character-display ${isVisible ? 'character-display--visible' : ''}`}>
      <div className="character-display__video-container">
        <video
          ref={videoRef}
          src={selectedCharacter.videoUrl}
          className="character-display__video"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      <div className="character-display__details">
        <h2 className="character-display__name">{selectedCharacter.name}</h2>
        <p className="character-display__description">{selectedCharacter.description}</p>
      </div>
    </div>
  );
};

export default CharacterDisplay;