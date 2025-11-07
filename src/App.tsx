import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './routes/routes'
import { ThemeConfig } from './config/theme.config'
import { AuthProvider } from './routes/auth/AuthContext'
import { CartProvider } from './contexts/CartContext'


function App(){
  return(
    <ThemeConfig>
      <CartProvider>
        <AuthProvider>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </AuthProvider>
      </CartProvider>
    </ThemeConfig>
  )
}

export default App
