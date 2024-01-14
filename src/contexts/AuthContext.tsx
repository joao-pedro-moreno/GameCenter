import { ReactNode, createContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'

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
  setRememberAccount: (isChecked: boolean) => void
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false)
  const [authenticatedUserEmail, setAuthenticatedUserEmail] = useState('')
  const [rememberAccount, setRememberAccount] = useState(false)

  const navigate = useNavigate()

  function registerUser({ email, password }: AuthUserProps) {
    const credentials = createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user

        localStorage.setItem(
          'GameCenter-UserInfo',
          JSON.stringify({
            email: user.email,
            expires: null,
          }),
        )

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

        if (rememberAccount) {
          const today = new Date()
          const logoutDay = new Date()

          logoutDay.setDate(today.getDate() + 7)

          localStorage.setItem(
            'GameCenter-UserInfo',
            JSON.stringify({
              email: user.email,
              expires: logoutDay,
            }),
          )
        } else {
          localStorage.setItem(
            'GameCenter-UserInfo',
            JSON.stringify({
              email: user.email,
              expires: null,
            }),
          )
        }

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
    localStorage.removeItem('GameCenter-UserInfo')
    auth.signOut()
    navigate('/')
  }

  function verifyUserAuthentication() {
    const userLocalStorageInfos = localStorage.getItem('GameCenter-UserInfo')

    if (userLocalStorageInfos) {
      const expirationDate = new Date(JSON.parse(userLocalStorageInfos).expires)
      const today = new Date()

      if (expirationDate.getDate() === today.getDate()) {
        localStorage.removeItem('GameCenter-UserInfo')
        setIsUserAuthenticated(false)
        setAuthenticatedUserEmail('')
        return false
      } else {
        setIsUserAuthenticated(true)
        setAuthenticatedUserEmail(JSON.parse(userLocalStorageInfos).email)
        return true
      }
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
        setRememberAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
