import { Route, Routes } from 'react-router-dom'
import { DefaultLayout } from './layouts/DefaultLayout'
import { HomePage } from './pages/Home'
import { LoginPage } from './pages/auth/Login'
import { AuthLayout } from './layouts/AuthLayout'
import { RegisterPage } from './pages/auth/Register'
import { GamePage } from './pages/Game'
import { FavoritePage } from './pages/Favorites'
import { RatedPage } from './pages/Rates'
import { useAuth } from './hooks/useAuth'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/game/:id" element={<GamePage />} />
        <Route path="/user/favorites" element={<FavoritePage />} />
        <Route path="/user/rates" element={<RatedPage />} />
      </Route>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  )
}
