import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { MapPin } from 'phosphor-react'
import { useNavigate } from 'react-router-dom'
import { storeService } from '../services/LocalesService'
import { StoreType } from '../domain/store'

//esto lo copie de fernando
const useOnInit = (initialCallBack: () => void) => {
    useEffect(() => {
      initialCallBack()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])}

export default function MediaCard() {
  const Navigate = useNavigate()

  const handleCardClick = (storeId: number) =>{
    Navigate(`/store-profile/${storeId}`)
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
          sx={{ 
            width: 150, 
            height: 200,
            minWidth: 150, 
            minHeight: 200, 
            cursor: 'pointer', 
            '&:hover': {
              boxShadow: 3, 
            },
            margin: 2,
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden' 
          }}
          //quizas aca deberia pasar el id como param para traer el local por id
          onClick={() => handleCardClick(store.id)} 
        >
          <MapPin size={32} color="#de0d0d" weight="fill"   />
          <CardMedia
            sx={{ height: 100,  width: '100%',  objectFit: 'cover'  }}
            image={store.storeURL}
            title={`Imagen de ${store.name}`}
          />
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
