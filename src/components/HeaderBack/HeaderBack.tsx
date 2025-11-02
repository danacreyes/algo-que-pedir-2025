import * as React from 'react'
import { Box, Typography, IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router-dom'
import './header-back.css'

type HeaderProps = {
    title: string
    backTo: string
}

const HeaderBack = ({ title, backTo }: HeaderProps) => {
    const navigate = useNavigate()

    return (
        <Box className="header-container">
            <Box className="header-content">
                <IconButton
                    onClick={() => navigate(backTo)}
                    className="header-back-button"
                >
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant='h6' fontWeight='bold'>
                    {title}
                </Typography>
            </Box>
        </Box>
    )
}

export default HeaderBack