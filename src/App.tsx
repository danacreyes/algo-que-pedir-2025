import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './routes/routes'
import { ThemeConfig } from './config/theme.config'

function App(){
  return(
    <ThemeConfig>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ThemeConfig>
  )
}

export default App
       


