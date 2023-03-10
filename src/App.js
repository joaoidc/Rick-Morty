import './App.css';

import { useState, useEffect } from 'react';

function CharacterDetails() {
  const [character, setCharacter] = useState(null);
  const [characterId, setCharacterId] = useState(1);
  const [error, setError] = useState(null);
  const [maxId, setMaxId] = useState(null);

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value);
    if (isNaN(value) || value > maxId) {
      setCharacterId(0);
    } else {
      setCharacterId(value);
    }
  };

  useEffect(() => {
    async function fetchMaxId() {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/`);
        const data = await response.json();
        setMaxId(data.info.count);
      } catch (error) {
        setError(error);
      }
    }

    async function fetchCharacter() {
      if (characterId === 0) {
        return;
      }

      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`);
        const data = await response.json();
        setCharacter(data);
      } catch (error) {
        setError(error);
      }
    }

    fetchMaxId();
    fetchCharacter();
  }, [characterId]);

  if (error) {
    return <div>Oops, something went wrong: {error.message}</div>;
  }

  if (!character) {
    return (
      <div>
        {characterId !== 0 ? (
          <div>Loading...</div>
        ) : (
          <div>Please enter a valid character ID</div>
        )}
      </div>
    );
  }

  return (
    <div className='centro'>
      <div className='centraliza'>
        <div className='input'>
          <label htmlFor="character-id">Escreva um ID: </label>
          <input id="character-id" value={characterId} onChange={handleInputChange} />
        </div>
        <div className='card shadow'>
          <img className='imagem' src={character.image} alt={character.name} />
          <div className='textos'>
            <h1>{character.name}</h1>
            <div className='atributos'>
              <p>Status: {character.status}</p>
              <p>Espécie: {character.species}</p>
              <p>Gênero: {character.gender}</p>
              <p>Origem: {character.origin.name}</p>
              <p>Localização: {character.location.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetails;