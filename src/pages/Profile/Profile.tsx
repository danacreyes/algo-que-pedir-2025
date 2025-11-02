import Typography from '@mui/material/Typography'
import { Avatar, FormControl, TextField, Grid, Box, Container, Button, IconButton } from '@mui/material'
import PreferencesBox from '../../components/PreferencesBox/PreferencesBox'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

import '../SearchCriteria/search-criteria.css'
import './profile.css'

import LogoutButton from '../../components/LogoutButton'

const Profile = () => {
    return(
        <>
        <Container className='container-profile' sx={{ pb: 9 }}>
            
            <Typography variant="h6" className='title-main-container'>Perfil</Typography>

            {/* AVATAR */}
            <Container className='section-profile'>
                <Box className='avatar-img'>
                    <Avatar
                        alt='Olivia Bennett'
                        src='/src/assets/avatar-profile.jpg'
                        sx={{ width: 100, height: 100 }}
                    />
                </Box>
                <Box>
                    <Typography variant="h5" className='primary-title-profile'>Olivia Bennett</Typography>
                    <Typography variant="body2" color='gray' align='center'>olivia.bennett@email.com</Typography>
                </Box>
            </Container>

            {/* PERSONAL INFORMATION */}
            <form className='group-section'> 
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Informacion personal</Typography>

                <Box>
                    <FormControl className='form-field'>
                        <TextField id="user-name" label="Nombre" variant="outlined" size="small"/>
                        <TextField id="user-username" label="Apellido" variant="outlined" size="small"/>
                        <TextField id="user-address" label="Direccion" variant="outlined" size="small"/>
                        <TextField id="user-location" label="Ubicacion" variant="outlined" size="small"/>
                        <Grid container spacing={2} columns={16}>
                            <Grid size={8}>
                                <TextField id="user-latitude" label="Latitud" variant="outlined" size="small" sx={{width: '100%'}}/>
                            </Grid>
                            <Grid size={8}>
                                <TextField id="user-longitude" label="Longitud" variant="outlined" size="small" sx={{width: '100%'}}/>
                            </Grid>
                        </Grid>
                    </FormControl>
                </Box>
            </form>

            {/* PREFERENCES (podria hacer los Box otro componente) */}
            <Container className='group-section'>
                <Typography variant="h6" sx={{fontWeight: 700}}>Preferencias</Typography>

                <Box>
                    <Box className='main-box-preferences' >
                        <Typography variant="body1" sx={{fontWeight: 600}} >Criterios de Busqueda</Typography>
                        <IconButton size='small' href='/search-criteria' className='icon-style'> 
                            <KeyboardArrowRightIcon/>
                        </IconButton>                            
                    </Box>
                    
                    <PreferencesBox
                        title ='Ingredientes a evitar'
                        link ='/ingredient-criteria/avoid'
                        icon = {<KeyboardArrowRightIcon/>}
                    />
                    
                    <PreferencesBox
                        title ='Ingredientes preferidos'
                        link ='/ingredient-criteria/prefers'
                        icon = {<KeyboardArrowRightIcon/>}
                    />
                </Box>

            </Container>
            <Button variant="contained" className='btn-primary'>Guardar</Button>
            <LogoutButton/>

        </Container>
        </>
    )
}

export default Profile