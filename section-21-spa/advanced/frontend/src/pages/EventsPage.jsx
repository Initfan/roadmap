import { Suspense } from 'react';
import EventsList from '../components/EventsList';
import { Await, defer, json, useLoaderData } from 'react-router-dom';

function EventsPage() {
    const { events } = useLoaderData()

    return (
        <Suspense fallback={<p>Loading...</p>}>
            <Await resolve={events}>
                {(events) => <EventsList events={events} />}
            </Await>
        </Suspense>
    )
}

const loadEvents = async () => {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok)
        throw json({ message: 'Could not fetch events.' }, {
            status: 500,
        })

    const data = await response.json();
    return data.events;
}

export const loader = () => {
    return defer({
        events: loadEvents()
    })

}

export default EventsPage;