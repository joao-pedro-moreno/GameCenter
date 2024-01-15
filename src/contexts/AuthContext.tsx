import { ReactNode, createContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'

import { auth, db } from '../services/firebase'
import { useNavigate } from 'react-router-dom'
import {
  addDoc,
  collection,
  getDocs,
  limit,
  query,
  where,
} from '@firebase/firestore'

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

        setIsUserAuthenticated(true)
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

          const sessionToken = generateRandomSessionToken()

          logoutDay.setDate(today.getDate() + 7)

          addDoc(collection(db, 'authenticationSessionTokens'), {
            email: user.email,
            sessionToken,
          }).then(() => {
            localStorage.setItem(
              'GameCenter-UserInfo',
              JSON.stringify({
                email: user.email,
                expires: logoutDay,
              }),
            )

            localStorage.setItem('GameCenter-sessionToken', sessionToken)

            setIsUserAuthenticated(true)
            setAuthenticatedUserEmail(user.email!)
          })
        } else {
          localStorage.setItem(
            'GameCenter-UserInfo',
            JSON.stringify({
              email: user.email,
              expires: null,
            }),
          )

          setIsUserAuthenticated(true)
          setAuthenticatedUserEmail(user.email!)
        }

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
    localStorage.removeItem('GameCenter-sessionToken')
    auth.signOut()
    navigate('/')
  }

  function disconnectUser() {
    setIsUserAuthenticated(false)
    setAuthenticatedUserEmail('')
    localStorage.removeItem('GameCenter-UserInfo')
    localStorage.removeItem('GameCenter-sessionToken')
  }

  async function verifyUserAuthentication() {
    if (!isUserAuthenticated) {
      const userLocalStorageInfos = localStorage.getItem('GameCenter-UserInfo')

      if (userLocalStorageInfos) {
        const userAuthObject = JSON.parse(userLocalStorageInfos)

        if (userAuthObject.expires) {
          const sessionToken = localStorage.getItem('GameCenter-sessionToken')

          if (sessionToken) {
            const dbCollection = collection(db, 'authenticationSessionTokens')

            const sessionTokenQuery = query(
              dbCollection,
              where('email', '==', userAuthObject.email),
              limit(1),
            )

            const queryResponse = await getDocs(sessionTokenQuery)

            const activeSessionToken = queryResponse.docs[0].data().sessionToken

            if (activeSessionToken === sessionToken) {
              const expirationDate = new Date(userAuthObject.expires)
              const today = new Date()

              if (expirationDate.getDate() > today.getDate()) {
                setIsUserAuthenticated(true)
                setAuthenticatedUserEmail(userAuthObject.email)
                return true
              } else {
                disconnectUser()
                return false
              }
            }
          } else {
            disconnectUser()
            return false
          }
        } else {
          disconnectUser()
          return false
        }
      } else {
        disconnectUser()
        return false
      }
    } else {
      return true
    }
  }

  function generateRandomSessionToken() {
    const chars =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'

    const tokenChars = []

    for (let i = 0; i < 32; i++) {
      const randomChar = chars.charAt(Math.floor(Math.random() * chars.length))

      tokenChars.push(randomChar)
    }

    const sessionToken = tokenChars.join('')

    return sessionToken
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
