import React from 'react';
import { useSnapshot } from 'valtio';
import { platformState, platformActions } from '../../../states/auth';
import '../platform.module.sass';

const CharacterList: React.FC = () => {
  const platform = useSnapshot(platformState);

  const handleCharacterSelect = (characterId: string) => {
    platformActions.selectCharacter(characterId);
  };

  if (platform.isLoading && platform.characters.length === 0) {
    return (
      <div className="character-list">
        <div className="character-list__loading">加载角色中...</div>
      </div>
    );
  }

  return (
    <div className="character-list">
      <h2 className="character-list__title">选择角色</h2>

      <div className="character-list__grid">
        {platform.characters.map(character => (
          <div
            key={character.id}
            className={`character-card ${character.id === platform.selectedCharacter?.id ? 'character-card--active' : ''}`}
            onClick={() => handleCharacterSelect(character.id)}
          >
            <div className="character-card__image">
              <img src={character.imageUrl} alt={character.name} />
            </div>
            <div className="character-card__content">
              <h3 className="character-card__name">{character.name}</h3>
              <p className="character-card__description">{character.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterList;
