import { db } from "../firebase/config"

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut
} from "firebase/auth";

import { useEffect, useState } from "react";

export const useAuthentication = () => {

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)

  //Cleanup //deal with memory leak
  const [cancelled, setCancelled] = useState(false)

  const auth = getAuth()

  // Register
  function checkIfisCancelled() {
    if (cancelled) {
      return
    }
  }

  const createUser = async (data) => {
    checkIfisCancelled()
    setLoading(true)
    setError(null)

    try {
      const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password)

      await updateProfile(user, { displayName: data.displayName })

      setLoading(false)
      return user

    } catch (error) {

      let systemErrorMessage

      if (error.message.includes("invalid-password")) {
        systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres."
      } else if (error.message.includes("email-already-exists")) {
        systemErrorMessage = "E-mail já cadastrado!"
      } else {
        systemErrorMessage = "Ocorreu um Erro, por favor tente mais tarde."
      }

      setLoading(false)
      setError(systemErrorMessage)
    }
  };

  // Logout - Sign Out
  const logout = () => {
    checkIfisCancelled()
    signOut(auth)
  };

  //Login - Sign in 
  const login = async(data) => {
    checkIfisCancelled()
    setLoading(true)
    setError(false)

    try {

      await signInWithEmailAndPassword(auth, data.email, data.password)
      setLoading(false)

    } catch (error) {

      let systemErrorMessage;

      if (error.message.includes("user-not-found")) {
        systemErrorMessage = "Usuário não encontrado."
      } else if (error.message.includes("invalid-password")) {
        systemErrorMessage = "Senha Incorreta!"
      } else {
        systemErrorMessage = "Ocorreu um Erro, por favor tente mais tarde."
      }

      setError(systemErrorMessage)
      setLoading(false)
    }
  }

  useEffect(() => {
    return () => setCancelled(true)
  }, [])

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    login,
  }

}