import { Box } from '@mui/material'
import SearchBar from '../components/SearchBar'
import MediaCard from '../components/Card'
import ColorCheckboxes from '../components/Checkbox'

const Home = () => {
  return (
    <Box className='mainContainerNew' sx={{ 
      width: '100vw',  
      flexGrow: 1, 
      minHeight: '100vh', 
    }}>
      <SearchBar />
      <Box sx={{ 
        width: '100%',
        padding: 3,
        marginTop: '80px', 
      }}>
        <ColorCheckboxes />
        <Box display={'flex'} width={'100%'}>
          <MediaCard />
        </Box>
      </Box>
    </Box>
  )
}

export default Home
