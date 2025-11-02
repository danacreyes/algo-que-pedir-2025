import { Box, IconButton, Typography } from '@mui/material'
import { ReactNode } from 'react'
import './preference-box.css'

const PreferencesBox = ({title, icon, link}:{title: string, icon: ReactNode, link: string}) => {
    return (
        <Box className='main-box-preferences' >
            <Typography variant="body1" sx={{fontWeight: 600}} >{title}</Typography>
            <IconButton size='small' href={link} className='icon-style'> 
                {icon}
            </IconButton>
        </Box>
    )
}

export default PreferencesBox