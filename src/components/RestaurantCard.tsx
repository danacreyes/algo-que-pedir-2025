import { Box, IconButton, Typography } from '@mui/material'
import { ReactNode } from 'react'

const FavoriteRestaurantItem = ({src, alt, name, detail, detail2, icon, onClickFunction}:{src: string, alt: string, name: string, detail: string, detail2?: string, icon: ReactNode, onClickFunction?: () => void}) => {
    return(
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingY: 1 }}>  
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, gap: '10px' }} onClick={onClickFunction}>
                <Box
                    component='img'
                    src = {src}
                    alt = {alt}
                    sx={{ width: 50, height: 50, borderRadius: '12px', objectFit: 'cover' }} // Tamaño fijo y bordes redondeados
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }} color='gray'>{name}</Typography>
                    <Typography variant="body2" color='gray'>{detail}</Typography>
                    <Typography variant="body2" color='gray'>{detail2}</Typography>
                </Box>
            </Box>
            
            <IconButton size="small" sx={{ color: 'gray', paddingRight: '0.5em' }}>
                {icon}
            </IconButton>
        </Box>
    )
}

export default FavoriteRestaurantItem