import { Box, IconButton, Typography } from '@mui/material'
import { ReactNode } from 'react'

const PreferencesBox = ({title, link, icon}:{title: string, link: string, icon: ReactNode}) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }} >
        <Typography variant="body1" sx={{fontWeight: 600}} >{title}</Typography>
            <IconButton size='small' href={link} sx={{ color: 'black', padding: '0'}}> 
                {icon}
            </IconButton>
        </Box>
    )
}

export default PreferencesBox