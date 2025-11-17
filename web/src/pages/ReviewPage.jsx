import React from 'react'
import { useLocation } from 'react-router-dom'

export default function ReviewPage(){
  const { state } = useLocation()
  const { shuffled=[], answers={} } = state || {}
  const correct = shuffled.reduce((acc,q)=> acc + (answers[q.id]===q.a?1:0),0)

  return (
    <div>
      <h2>Review</h2>
      <p>Score: {correct} / {shuffled.length}</p>
      <div>{shuffled.map((q,idx)=>(
        <div key={idx} className={answers[q.id]===q.a? 'ok':'bad'}>
          <div>{idx+1}. {q.q}</div>
          <div>Your: {answers[q.id]!=null? q.opts[answers[q.id]]: 'No answer'}</div>
          <div>Correct: {q.opts[q.a]}</div>
          <div className="explain">{q.explain}</div>
        </div>
      ))}</div>
    </div>
  )
}
