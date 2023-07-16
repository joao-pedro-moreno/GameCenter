import { ReactNode, createContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import Cookies from 'js-cookie'

import { auth } from '../services/firebase'
import { useNavigate } from 'react-router-dom'

interface AuthContextProviderProps {
  children: ReactNode
}

interface AuthUserProps {
  email: string
  password: string
}

interface AuthContextType {
  isUserAuthenticated: boolean
  authenticatedUserEmail: string

  loginUser: ({ email, password }: AuthUserProps) => string | Promise<any>
  registerUser: ({ email, password }: AuthUserProps) => string | Promise<any>
  userLogOut: () => void
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false)
  const [authenticatedUserEmail, setAuthenticatedUserEmail] = useState('')

  const navigate = useNavigate()

  function registerUser({ email, password }: AuthUserProps) {
    const credentials = createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user

        Cookies.set('GameCenter-UserInfo', user.email!, { expires: 7 })
        setAuthenticatedUserEmail(user.email!)

        return 'success'
      })
      .catch((error) => {
        throw new Error(error.code)
      })

    return credentials
  }

  function loginUser({ email, password }: AuthUserProps) {
    const credentials = signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user

        Cookies.set('GameCenter-UserInfo', user.email!, { expires: 7 })
        setAuthenticatedUserEmail(user.email!)

        return 'success'
      })
      .catch((error) => {
        throw new Error(error.code)
      })

    return credentials
  }

  function userLogOut() {
    setIsUserAuthenticated(false)
    setAuthenticatedUserEmail('')
    Cookies.remove('GameCenter-UserInfo')
    auth.signOut()
    navigate('/')
  }

  function verifyUserAuthentication() {
    const userCookiesInfo = Cookies.get('GameCenter-UserInfo')

    if (userCookiesInfo) {
      setIsUserAuthenticated(true)
      setAuthenticatedUserEmail(userCookiesInfo)
      return true
    }

    setIsUserAuthenticated(false)
    setAuthenticatedUserEmail('')
    return false
  }

  useEffect(() => {
    verifyUserAuthentication()
  }, [authenticatedUserEmail])

  return (
    <AuthContext.Provider
      value={{
        isUserAuthenticated,
        authenticatedUserEmail,
        loginUser,
        registerUser,
        userLogOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
