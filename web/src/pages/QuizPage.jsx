import React, {useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function QuizPage(){
  const nav = useNavigate()
  const { state } = useLocation()
  const level = state?.level || 'A1'
  const [questions, setQuestions] = useState([])
  const [shuffled, setShuffled] = useState([])
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(600)

  useEffect(()=>{ axios.get('/api/questions?level='+level).then(r=>{ setQuestions(r.data) }) }, [level])

  useEffect(()=>{ if(questions.length){ const s = [...questions].sort(()=>Math.random()-0.5).slice(0,30); setShuffled(s); } }, [questions])

  useEffect(()=>{ const timer = setInterval(()=> setTimeLeft(t=> t>0? t-1: 0), 1000); if(timeLeft===0) finish(); return ()=> clearInterval(timer) }, [timeLeft])

  function choose(qid, opt){ setAnswers(a=> ({...a, [qid]: opt})) }
  function finish(){ nav('/review', { state: { shuffled, answers } }) }

  if(!shuffled.length) return <div>Loading...</div>

  const q = shuffled[index]

  return (
    <div className="quiz-page">
      <div className="top">Timer: {Math.floor(timeLeft/60)}:{String(timeLeft%60).padStart(2,'0')}</div>
      <div className="question">{index+1}. {q.q}</div>
      <div className="options">{q.opts.map((o,i)=>(
        <button key={i} onClick={()=>choose(q.id,i)} className={answers[q.id]===i? 'sel':''}>{o}</button>
      ))}</div>

      <div className="nav">
        <button onClick={()=>setIndex(i=> Math.max(0,i-1))}>Prev</button>
        <button onClick={()=> setIndex(i=> Math.min(shuffled.length-1,i+1))}>Next</button>
        <button onClick={finish}>Finish</button>
      </div>
    </div>
  )
}
