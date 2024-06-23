import { useState, useRef } from 'react'

export default function Player() {
  const playerName = useRef();
  const [eneterdPlayerName, setEneterdPlayerName] = useState(null);

  const handleClick = () => {
    setEneterdPlayerName(playerName.current.value)
    playerName.current.value = ''
  }

  return (
    <section id="player">
      <h2>Welcome {eneterdPlayerName ?? 'unknown entity'}</h2>
      <p>
        <input ref={playerName} type="text" defaultValue={eneterdPlayerName} />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
