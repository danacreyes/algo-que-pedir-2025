import { Box, IconButton, Typography } from '@mui/material'
import { ReactNode } from 'react'

const RestaurantCard = ({src, alt, name, detail, icon}:{src: string, alt: string, name: string, detail: string, icon: ReactNode}) => {
    return(
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingY: 1 }}>  
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, gap: '10px' }}>
                <Box
                    component='img'
                    src = {src}
                    alt = {alt}
                    sx={{ width: 50, height: 50, borderRadius: '12px', objectFit: 'cover' }}
                />
                <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }} color='gray'>{name}</Typography>
                    <Typography variant="body2" color='gray'>{detail}</Typography>
                </Box>
            </Box>
            
            <IconButton size="small" sx={{ color: 'gray', paddingRight: '0.5em' }}>
                {icon}
            </IconButton>
        </Box>
    )
}

export default RestaurantCard