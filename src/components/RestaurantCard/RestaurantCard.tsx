import { Box, IconButton, Typography } from '@mui/material'
import { ReactNode } from 'react'
import './restaurant-card.css'

const RestaurantCard = ({src, alt, name, detail, detail2, icon, cardOnClickFunction, buttonOnClickFunction}:{src: string, alt: string, name: string, detail: string, detail2?: string, icon: ReactNode, cardOnClickFunction?: () => void, buttonOnClickFunction?: () => void}) => {
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
                    <Typography variant="body2" color='gray'>{detail2}</Typography>
                </Box>
            </Box>
            
            <IconButton size="small" className='icon-custom'>
                {icon}
            </IconButton>
        </Box>
    )
}

export default RestaurantCard