import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
    return (
        <div>
            <h1>My Home Page</h1>
            <p>To to <Link to="/products">the list of products</Link></p>
        </div>
    )
}

export default HomePage