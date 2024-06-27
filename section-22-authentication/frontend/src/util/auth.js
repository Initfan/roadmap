import { redirect } from 'react-router-dom'

export const getTokenDuration = () => {
    const storedExpirationDate = localStorage.getItem('expiration');
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
}

export const getAuthToken = () => {
    const token = localStorage.getItem('token');
    return token;
}

export const tokenLoader = () => getAuthToken();

export const checkAuthLoader = () => {
    const token = getAuthToken()

    const tokenDuration = getTokenDuration();

    if (!token)
        return null;

    if (tokenDuration < 0)
        return 'EXPIRED';

    if (!token)
        return redirect('/auth')
}