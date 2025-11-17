import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function App(){
  const [levels] = useState(['A1','A2','B1','ALL'])
  const [level, setLevel] = useState('A1')
  const [dark, setDark] = useState(false)

  useEffect(()=>{ document.documentElement.classList.toggle('dark', dark) }, [dark])

  return (
    <div className={`page ${dark? 'dark':'light'}`}>
      <header>
        <h1>German MCQ Practice</h1>
        <div className="controls">
          <select value={level} onChange={e=>setLevel(e.target.value)}>
            {levels.map(l=> <option key={l} value={l}>{l}</option>)}
          </select>
          <button onClick={()=>setDark(d=>!d)}>{dark? 'Light' : 'Dark'}</button>
          <Link to="/quiz" state={{level}}>Start Quiz</Link>
        </div>
      </header>

      <main>
        <section>
          <h2>Features</h2>
          <ul>
            <li>Timed quizzes (configurable)</li>
            <li>Save scores (local + remote)</li>
            <li>Explanations</li>
            <li>CSV/JSON import for custom questions</li>
          </ul>
        </section>
      </main>
    </div>
  )
}
