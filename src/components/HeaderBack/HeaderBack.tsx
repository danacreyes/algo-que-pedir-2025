import { Box, Typography, IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router-dom'
import './header-back.css'

type BackToRoute = string | {
    path: string;
    state?: unknown;
    isNew?: boolean
}

type HeaderProps = {
    title: string
    backTo: BackToRoute
}


const HeaderBack = ({ title, backTo }: HeaderProps) => {
    const navigate = useNavigate()

    return (
        <Box className="header-container">
            <Box className="header-content">
                <IconButton
                    onClick={() => {
                        if (typeof backTo === 'string') {
                        navigate(backTo)
                        } else {
                        navigate(backTo.path, { state: backTo.state })
                        }
                    }}
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