import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const nav = useNavigate()
  const [user,setUser]=useState('')
  const [pass,setPass]=useState('')

  async function submit(e){ e.preventDefault(); try{ const r = await axios.post('/api/auth/login',{username:user,password:pass}); localStorage.setItem('token', r.data.token); nav('/'); }catch(err){ alert('login failed') } }

  return (
    <form onSubmit={submit}>
      <input value={user} onChange={e=>setUser(e.target.value)} placeholder="username"/>
      <input value={pass} onChange={e=>setPass(e.target.value)} placeholder="password" type="password"/>
      <button>Login</button>
    </form>
  )
}
