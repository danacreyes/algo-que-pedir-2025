import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { MapPin } from 'phosphor-react'
import { Navigate, useNavigate } from 'react-router-dom'

export default function MediaCard() {
  const Navigate = useNavigate()

  const handleCardClick = () =>{
    Navigate('/store-profile')
  }

  return (
    <Card sx={{ maxWidth: 150, maxHeight: 200,
        cursor: 'pointer', 
        '&:hover': {
          boxShadow: 3, 
        },
        margin: 2,
      }}
      onClick={handleCardClick} 
    >
      <MapPin size={32} color="#de0d0d" weight="fill"  />
      <CardMedia
        sx={{ height: 50 , width: 50}}
        image="src\assets\comida-rapida-casera.webp"
        title="local image"
      />
      <CardContent>
        <Typography noWrap gutterBottom component="div">
          La cocina de mamá
        </Typography>
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          Calle principal 123
        </Typography>
      </CardContent>
    </Card>
  )
}