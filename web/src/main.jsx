import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './pages/App'
import QuizPage from './pages/QuizPage'
import ReviewPage from './pages/ReviewPage'
import Login from './pages/Login'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>} />
      <Route path="/quiz" element={<QuizPage/>} />
      <Route path="/review" element={<ReviewPage/>} />
      <Route path="/login" element={<Login/>} />
    </Routes>
  </BrowserRouter>
)
