import { useEffect } from 'react'
import { GameList } from '../../components/GameList'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export function RatedPage() {
  const { isUserAuthenticated } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    if (!isUserAuthenticated) {
      navigate('/')
    }
  }, [isUserAuthenticated])

  return (
    <div className="container">
      <GameList variant="rated" />
    </div>
  )
}
