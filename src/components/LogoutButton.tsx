import { useNavigate } from 'react-router-dom'
import { useAuth } from '../routes/auth/AuthContext'
import { Button } from '@mui/material'

function LogoutButton() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <Button variant="contained" className='btn-secondary' onClick={handleLogout}>Cerrar Sesión</Button>
  )
}

export default LogoutButton