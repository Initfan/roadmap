import React from 'react'

const UserInput = ({ userInput, onChange }) => {

    return (
        <section id='user-input'>
            <div className="input-group">
                <p>
                    <label htmlFor="">Initial Invesment</label>
                    <input
                        type="number"
                        value={userInput.initialInvestment}
                        onChange={e => onChange('initialInvestment', e.target.value)}
                        required
                    />
                </p>
                <p>
                    <label htmlFor="">Annual Invesment</label>
                    <input
                        type="number"
                        value={userInput.annualInvesment}
                        onChange={e => onChange('annualInvesment', e.target.value)}
                        required
                    />
                </p>
            </div>
            <div className="input-group">
                <p>
                    <label htmlFor="">Expected Return</label>
                    <input
                        type="number"
                        value={userInput.expectedReturn}
                        onChange={e => onChange('expectedReturn', e.target.value)}
                        required
                    />
                </p>
                <p>
                    <label htmlFor="">Duration</label>
                    <input
                        type="number"
                        value={userInput.duration}
                        onChange={e => onChange('duration', e.target.value)}
                        required
                    />
                </p>
            </div>
        </section>
    )
}

export default UserInput