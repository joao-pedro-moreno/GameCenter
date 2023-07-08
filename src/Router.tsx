import { Route, Routes } from 'react-router-dom'
import { DefaultLayout } from './layouts/DefaultLayout'
import { HomePage } from './pages/Home'
import { LoginPage } from './pages/Login'
import { ConnectLayout } from './layouts/ConnectLayout'
import { RegisterPage } from './pages/Register'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<HomePage />} />
        {/* <Route />
        <Route /> */}
      </Route>
      <Route path="/connect" element={<ConnectLayout />}>
        <Route path="/connect/login" element={<LoginPage />} />
        <Route path="/connect/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  )
}
