import { Box,Typography} from '@mui/material'
import SearchBar from '../../components/SearchBar/SearchBar'
import MediaCard from '../../components/LocalCard/Card'
import ColorCheckboxes from '../../components/Checkbox'
import {StoreType} from '../../domain/store'
import { storeService } from '../../services/LocalesService'
import {  useState } from 'react'
import { useOnInit } from '../../customHooks/useOnInit'

const Home = () => {
  const [searchValue, setSearchValue] = useState('')
  const [allStores, setAllStores] = useState<StoreType[]>([]) 
  const [isChecked, setIsChecked] = useState(false)

 
  let stores: StoreType[]
  if (isChecked === true) {
    stores = allStores.filter((store: StoreType) => {
    return store.usuarioCercano === true
  })
  } else {
  stores = allStores
  }

  const buscarStores = async (textoBusquedaNuevo: string) => {
    setSearchValue(textoBusquedaNuevo)
    const userId = localStorage.getItem('id')!! 
    const nuevosStores = await storeService.getStores(textoBusquedaNuevo, userId)
    setAllStores(nuevosStores)
  }

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked)
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
      </div>
      
      <div style={{ marginTop: 10 }}>
        <SearchBar onSearch={buscarStores} searchValue={searchValue} />
      </div>
      
      <Box sx={{ 
        width: '100%',
        padding: 3,
        marginTop: '10px', 
      }}>
        <ColorCheckboxes 
          isChecked={isChecked}
          onCheckboxChange={handleCheckboxChange}
        />
        
        {isChecked && (
          <Typography variant="body2" sx={{ mt: 1, ml: 1, color: 'text.secondary' }}>
            Mostrando {stores.length} locales cercanos
          </Typography>
        )}
        
        <Box display={'flex'} width={'100%'}>
          <MediaCard stores={stores} />
        </Box>
      </Box>
    </Box>
  )
}

export default Home