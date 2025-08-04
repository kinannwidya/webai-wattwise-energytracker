import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem('token') // contoh
  return isLoggedIn ? children : <Navigate to="/signin" />
}
