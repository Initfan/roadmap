import React, { useRef, useState } from 'react'

const Player = ({ initialName, symbol, isActive, onChangeName }) => {
    const [name, setName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);
    const inputName = useRef()

    const handleEditClick = () => {
        setIsEditing(prev => !prev)
        if (isEditing) {
            setName(inputName.current.value)
            onChangeName(symbol, inputName.current.value)
        }
    }

    return (
        <li className={isActive ? 'active' : ''}>
            <span className="player">
                {!isEditing
                    ? <span className="player-name">{name}</span>
                    : <input type='text' defaultValue={name} ref={inputName} required />
                }
                <span className='player-symbol'>{symbol}</span>
            </span>
            <button onClick={handleEditClick}>
                {isEditing ? 'Save' : 'Edit'}
            </button>
        </li>
    )
}

export default Player