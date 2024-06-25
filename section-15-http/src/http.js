export const fetchAvailablePlaces = async () => {
    const res = await fetch('http://localhost:3000/places')
    const data = await res.json()
    if (!res.ok) {
        throw new Error('Failed to fetch places')
    }

    return data.places
}

export const fetchUserPlaces = async () => {
    const res = await fetch('http://localhost:3000/user-places')
    const data = await res.json()
    if (!res.ok) {
        throw new Error('Failed to fetch places')
    }

    return data.places
}


export async function updateUserPlaces(places) {
    const res = await fetch('http://localhost:3000/user-places', {
        method: 'PUT',
        body: JSON.stringify({ places }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = await res.json();

    if (!res.ok)
        throw new Error('Failed to udpate user data.')

    return data.message
}