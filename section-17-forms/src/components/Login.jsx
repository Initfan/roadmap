import { useRef, useState } from "react";

export default function Login() {
  const [emailIsInvalid, setEmailIsInvalid] = useState()

  const email = useRef()
  const password = useRef()

  const handleSubmit = (event) => {
    event.preventDefault()

    const eneteredEmail = email.current.value

    const emailIsInvalid = eneteredEmail.includes('@')

    if (!emailIsInvalid)
      return setEmailIsInvalid(true)

    setEmailIsInvalid(false)

    console.log('Sending HTTP request...');
  }



  return (
    <form>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            ref={email}
          />
          <div className="control-error">{emailIsInvalid && <p>Please enter a valid email address.</p>}</div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            ref={password}
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button type="button" className="button" onClick={handleSubmit}>Login</button>
      </p>
    </form>
  );
}
