import { Box, IconButton, Typography } from '@mui/material'
import { ReactNode } from 'react'
import './restaurant-card.css'

const RestaurantCard = ({src, alt, name, detail, icon}:{src: string, alt: string, name: string, detail: string, icon: ReactNode}) => {
    return(
        <Box className='main-box-restaurant'>  
            <Box className='box-item-restaurant'>
                <Box
                    component='img'
                    src = {src}
                    alt = {alt}
                    className='img-restaurant'
                />
                <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }} color='gray'>{name}</Typography>
                    <Typography variant="body2" color='gray'>{detail}</Typography>
                </Box>
            </Box>
            
            <IconButton size="small" className='icon-custom'>
                {icon}
            </IconButton>
        </Box>
    )
}

export default RestaurantCard