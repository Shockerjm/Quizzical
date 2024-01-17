import './App.css'
import { useState } from 'react'
import Start from './components/Start.jsx'
import Question from './components/Question.jsx'

function App() {
  const [ hide, setHide ] = useState(true)

  function toggleHide() {
    setHide(false)
  }
  return (
    <>
      <Start 
        hide={hide}
        toggleHide={toggleHide}
      />
      <Question 
        hide={hide}   
      />
    </>
  )
}

export default App
