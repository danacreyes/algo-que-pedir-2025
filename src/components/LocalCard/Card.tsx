import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import { storeService } from '../../services/LocalesService'
import { StoreType } from '../../domain/store'
import { Box } from '@mui/material'

//esto lo copie de fernando
const useOnInit = (initialCallBack: () => void) => {
    useEffect(() => {
      initialCallBack()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])}

export default function MediaCard() {
  const Navigate = useNavigate()

  const handleCardClick = (storeId: number) =>{
    Navigate('/store-profile/${storeId}')
  }

  const [stores, setStores] = useState<StoreType[]>([])
  const [errors, setErrors] = useState('')


  const getStores = async () => {
    const stores = await storeService.getStores()
    setStores(stores)
  }

   useOnInit(getStores)

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {stores.map((store) => (
        <Card 
          key={store.id}
          sx={{ width: 150, weight: 200, minWidth: 150, minHeight: 200, cursor: 'pointer', 
            '&:hover': {boxShadow: 3 }, margin: 2, padding: 2, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
          //quizas aca deberia pasar el id como param para traer el local por id
          onClick={() => handleCardClick(store.id)} 
        >
          <div style={{position: 'relative'}}> 
          
          <CardMedia
            sx={{ height: 100,  width: '100%',  objectFit: 'cover', position: 'relative' }}
            image={store.storeURL}
            title={`Imagen de ${store.name}`}
          >
          </CardMedia>
          </div>
          <CardContent>
            <Typography noWrap component="div" sx={{maxWidth: '100px'}}>
              {store.name}
            </Typography>
            <Typography noWrap sx={{ color: 'text.secondary', maxWidth: '100px' }}>
              {store.storeAddress}{' '}{store.storeAltitude}
            </Typography>
            
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
