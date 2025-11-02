import { Box,Typography} from '@mui/material'
import SearchBar from '../components/SearchBar'
import MediaCard from '../components/Card'
import ColorCheckboxes from '../components/Checkbox'
import { ShoppingCart } from 'phosphor-react'

const Home = () => {
  return (
    <Box sx={{ 
      width: '100vw',  
      flexGrow: 1, 
      minHeight: '100vh', 
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between',  overflow: 'hidden', paddingLeft: 40, paddingRight: 40, marginTop: 30, marginBottom: 30}}>
        <Typography style={{fontSize: 18 , fontWeight: 'bolder'}}>Delivery</Typography>
        <ShoppingCart size={32} />
      </div>
      <div style={{marginTop:10}}>
      <SearchBar />
      </div>
      <Box sx={{ 
        width: '100%',
        padding: 3,
        marginTop: '10px', 
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
