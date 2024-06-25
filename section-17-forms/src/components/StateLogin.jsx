import { useEffect, useState } from "react";
import Input from "./Input";
import { hasMinLength, isEmail, isNotEmpty } from '../util/validation'
import { useInput } from "../hooks/useInput";

export default function Login() {
    const {
        value: emailValue,
        handleInputBlur: handleEmailBlur,
        handleInputChange: handleEmailChange,
        hasError: emailHasError
    } = useInput('', (value) => isNotEmpty(value) && isEmail(value))

    const {
        value: passwordValue,
        handleInputChange: handlePasswordChange,
        handleInputBlur: handlePasswordBlur,
        hasError: passwordHasError
    } = useInput('', (value) => hasMinLength(value, 6))

    const handleSubmit = (e) => {
        if (emailHasError || passwordHasError)
            return;

        console.log(emailValue, passwordValue);
    }

    return (
        <form>
            <h2>Login</h2>

            <div className="control-row">
                <Input
                    label='Email'
                    id='email'
                    type='email'
                    value={emailValue}
                    onBlur={handleEmailBlur}
                    onChange={handleEmailChange}
                    error={emailHasError && 'Please enter a valid email.'}
                />

                <Input
                    label='Password'
                    id='password'
                    type='password'
                    onBlur={handlePasswordBlur}
                    value={passwordValue}
                    onChange={handlePasswordChange}
                    error={passwordHasError && 'Please enter a valid password.'}
                />
            </div>

            {/* <div className="control-row">
                <div className="control no-margin">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"

                    />
                    <div className="control-error">{emailIsValid && <p>Please enter a valid email address.</p>}</div>
                </div>

                <div className="control no-margin">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={enteredValues.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                    />
                </div>
            </div> */}

            <p className="form-actions">
                <button className="button button-flat">Reset</button>
                <button type="button" className="button" onClick={handleSubmit}>Login</button>
            </p>
        </form>
    );
}
