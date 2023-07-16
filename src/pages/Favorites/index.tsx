import { useNavigate } from 'react-router-dom'
import { GameList } from '../../components/GameList'
import { useAuth } from '../../hooks/useAuth'
import { useEffect } from 'react'

export function FavoritePage() {
  const { isUserAuthenticated } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    if (!isUserAuthenticated) {
      navigate('/')
    }
  }, [isUserAuthenticated])

  return (
    <div className="container">
      <GameList variant="favorites" />
    </div>
  )
}
