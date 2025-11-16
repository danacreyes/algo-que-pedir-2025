import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import { StoreType } from '../../domain/store'
import { Box, Chip } from '@mui/material'
import PlaceIcon from '@mui/icons-material/Place'


interface MediaCardProps {
  stores: StoreType[];
}

export default function MediaCard({ stores }: MediaCardProps) {
  const Navigate = useNavigate()

  const handleCardClick = (storeId: number) => {
    Navigate(`/store-profile/${storeId}`)
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      {stores.length > 0 ? (
        stores.map((store) => (
          <Card 
            key={store.id}
            sx={{ 
              width: 150, 
              height: 200,
              minWidth: 150, 
              minHeight: 200, 
              cursor: 'pointer', 
              '&:hover': { boxShadow: 3 }, 
              margin: 2, 
              padding: 2, 
              display: 'flex', 
              flexDirection: 'column', 
              overflow: 'hidden'
            }}
            onClick={() => handleCardClick(store.id)} 
          >
            <Box sx={{ position: 'relative' }}> 
              <CardMedia
                sx={{ 
                  height: 100,  
                  width: '100%',  
                  objectFit: 'cover', 
                  position: 'relative' 
                }}
                image={store.storeURL}
                title={`Imagen de ${store.name}`}
              />
            </Box>
            <CardContent sx={{ flexGrow: 1, p: 1 }}>
              <Typography noWrap component="div" sx={{ maxWidth: '100px' }}>
                {store.name}
              </Typography>
              <Typography noWrap sx={{ color: 'text.secondary', maxWidth: '100px', fontSize: '0.8rem' }}>
                {store.storeAddress} {store.storeAltitude}
              </Typography>
              {/* si store.usuarioCercano es true, renderiza el componente a la derecha */}
              {store.usuarioCercano && (
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mt: 0.5,
                    color: 'error.main',
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }}
                >
                  <PlaceIcon sx={{ fontSize: '1rem', mr: 0.5 }} />
                  <Typography variant="caption" sx={{ color: 'error.main', fontWeight: 'bold' }}>
                    Local cercano
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography sx={{ padding: 2 }}>
          No hay locales disponibles
        </Typography>
      )}
    </Box>
  )
}