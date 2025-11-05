import { Box,Typography} from '@mui/material'
import SearchBar from '../../components/SearchBar/SearchBar'
import MediaCard from '../../components/LocalCard/Card'
import ColorCheckboxes from '../../components/Checkbox'
import { ShoppingCart } from 'phosphor-react'
import {StoreType} from '../../domain/store'
import { storeService } from '../../services/LocalesService'
import {  useState } from 'react'
import { useOnInit } from '../../customHooks/useOnInit'

const Home = () => {
  const [searchValue, setSearchValue] = useState('')
  const [stores, setStores] = useState<StoreType[]>([])


  const buscarStores = async (textoBusquedaNuevo: string) => {
    setSearchValue(textoBusquedaNuevo)
    const nuevosStores = await storeService.getStores(textoBusquedaNuevo)
    setStores(nuevosStores)
  }

  useOnInit(() => {
    buscarStores('')
  })

  return (
    <Box sx={{ 
      width: '100vw',  
      flexGrow: 1, 
      minHeight: '100vh', 
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',  
        overflow: 'hidden', 
        paddingLeft: 40, 
        paddingRight: 40, 
        marginTop: 30, 
        marginBottom: 30 
      }}>
        <Typography style={{ fontSize: 18, fontWeight: 'bolder' }}>
          Delivery
        </Typography>
        <ShoppingCart size={32} />
      </div>
      
      <div style={{ marginTop: 10 }}>
        <SearchBar onSearch={buscarStores} searchValue={searchValue} />
      </div>
      
      <Box sx={{ 
        width: '100%',
        padding: 3,
        marginTop: '10px', 
      }}>
        <ColorCheckboxes />
        <Box display={'flex'} width={'100%'}>
          <MediaCard stores={stores} />
        </Box>
      </Box>
    </Box>
  )
}

export default Home