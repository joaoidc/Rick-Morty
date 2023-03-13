import React from 'react';
import { useSpring, animated } from 'react-spring';

function CharacterDetails() {
  const [character, setCharacter] = useState(null);
  const [characterId, setCharacterId] = useState(1);
  const [error, setError] = useState(null);
  const [maxId, setMaxId] = useState(null);
  const props = useSpring({
    from: { transform: 'rotate(0deg)' },
    to: async (next) => {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/${characterId}`);
      const data = await response.json();
      setCharacter(data);
      next({ transform: 'rotate(360deg)' });
    },
  });

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value);
    if (isNaN(value) || value > maxId) {
      setCharacterId(0);
    } else {
      setCharacterId(value);
    }
  };

  const handleResetClick = () => {
    setCharacterId(0);
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

    fetchMaxId();
  }, []);

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
          <button onClick={handleResetClick} role="button" class="button-name">Apagar</button>
        </div>
        <animated.div className='card shadow' style={props}>
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
        </animated.div>
      </div>
    </div>
  );
}

export default CharacterDetails;