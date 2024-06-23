import React, { useState, useEffect } from 'react'

const ProgressBar = ({ timer }) => {
    const [remainingTimer, setRemainingTimer] = useState(timer);

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTimer(prev => prev - 10)
        }, 10);

        return () => {
            clearInterval(interval)
        }
    }, []);

    return <progress value={remainingTimer} max={timer} />
}

export default ProgressBar