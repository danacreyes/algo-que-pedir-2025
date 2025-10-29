import { useNavigate } from 'react-router-dom'

export const useNavigation = () => {

  const navigate = useNavigate()
    
  const goTo = (url: string) => {
    navigate(url)
  }
  
  return { goTo }
}