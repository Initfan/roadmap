import AuthForm from '../components/AuthForm';
import { json, redirect } from 'react-router-dom'

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export const action = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const node = searchParams.get('node') || 'login';

  if (node !== 'login' && node !== 'signup')
    throw json({ message: 'Unsupported node.' }, { status: 422 })

  const data = await request.formData()
  const authData = {
    email: data.get('email'),
    password: data.get('password'),
  }

  const res = await fetch(`http://localhost:8080/${node}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData)
  });

  if (res.status === 422 || res.status === 401)
    return res;

  if (!res.ok)
    throw json({ message: 'Could not authenticate user.' }, { status: 500 })

  const resData = await res.json();
  const token = resData.token;

  localStorage.setItem('token', token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem('expiration', expiration.toISOString())

  return redirect('/')
}