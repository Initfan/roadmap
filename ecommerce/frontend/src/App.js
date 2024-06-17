import React from 'react'
import Header from './components/Header'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import Footer from './components/Footer'

const App = () => {
  return (
    <Container>
      <Header />
      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
      <ToastContainer />
    </Container>
  )
}

export default App