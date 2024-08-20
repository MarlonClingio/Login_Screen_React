import React from 'react';
import styles from "./Register.module.css";

import {useEffect, useState} from "react";
import { useAuthentication } from '../../hooks/useAuthentication';

const Register = () => {

  const [displayName, setDisplayname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const {createUser, error: authError, loading} = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    const user = {displayName,email,password}

    if(password !== confirmPassword) {
      setError("As senhas precisam ser IGUAIS!")
      return
    }

    const res = await createUser(user)

    setDisplayname('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  useEffect(() => {
    if(authError) {
      setError(authError)
    }
  }, [authError])

  return (
    <div className={styles.register}>
        <h1>Cadastre-se para postar!</h1>
        <p>Crie seu usuário e compartilhe suas histórias:</p>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Nome:</span>
            <input 
            type="text" 
            name='displayName' 
            placeholder='Digite seu Nome' 
            required 
            value={displayName} 
            onChange={(e) => setDisplayname(e.target.value)}
            />
          </label>
          <label>
            <span>E-mail:</span>
            <input 
            type="email" 
            name='Email' 
            placeholder='E-mail do Usuário' 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <span>Senha:</span>
            <input 
            type="password" 
            name='password' 
            placeholder='Digite sua Senha' 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label>
            <span>Confirme sua Senha:</span>
            <input 
            type="password" 
            name='confirmPassword' 
            placeholder='Confirme sua Senha' 
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
          {!loading && <button className='btn'>Cadastrar</button>}
          {loading && <button className='btn' disabled >Aguarde...</button>}
          {error && <p className="error">{error}</p>}
        </form>
    </div>
  )
}

export default Register