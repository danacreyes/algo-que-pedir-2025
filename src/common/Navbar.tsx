import { AppBar, Box, Button, Container, Toolbar } from '@mui/material'
import { House, Receipt, Star, User } from 'phosphor-react'
// import React from 'react'

export const NavBar = () => {
        
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" color="transparent"> 
                <Toolbar>
                    <Container maxWidth="xl">
                        <Box 
                            sx={{ 
                                display: 'flex', 
                                flexDirection: 'row', 
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%'
                            }}
                        >
                            <Button 
                                color="inherit"
                                startIcon={<House weight="fill" size={20} />} 
                            >
                                inicio
                            </Button>
                            <Button color='inherit'
                            startIcon={<Receipt size={20} weight="fill" />}
                            >Pedidos</Button>
                            <Button color='inherit'
                            startIcon={<Star size={20} weight="regular" />}
                            >Calificar</Button>
                            <Button color='inherit'
                            startIcon={<User size={20} weight="regular" />}
                            >Perfil</Button>
                        </Box>
                    </Container>
                </Toolbar>
            </AppBar>
        </Box>
    )
}