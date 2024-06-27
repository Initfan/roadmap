import React from 'react'
import EventsNavigation from '../components/EventsNavigation'
import { Outlet } from 'react-router-dom'

const EventRoot = () => {
    return (
        <div>
            <EventsNavigation />
            <Outlet />
        </div>
    )
}

export default EventRoot