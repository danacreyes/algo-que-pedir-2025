import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './routes/routes'
import { ThemeConfig } from './config/theme.config'
import { AuthProvider } from './routes/auth/AuthContext'


function App(){
  return(
    <ThemeConfig>
      <AuthProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </AuthProvider>
    </ThemeConfig>
  )
}

export default App
