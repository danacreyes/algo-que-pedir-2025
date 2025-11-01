import Typography from '@mui/material/Typography'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Avatar, FormControl, TextField, Grid, Box, Container, IconButton } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import AddIcon from '@mui/icons-material/Add'
import '../css/profile.css'
import { useAuth } from '../routes/auth/AuthContext'
import LogoutButton from '../components/LogoutButton'

const Profile = () => {
    const { logout } = useAuth()
    return(
        <>
        <Container className='container-profile'>
            <Box component="section" sx={{display: 'flex', width: '100%', position: 'relative'}}>
                <ArrowBackIcon className='icon-profile'/>
                <Typography variant="h6" sx={{ display: 'flex', width: '100%', justifyContent: 'center', fontWeight: 600 }}>Perfil</Typography>
            </Box>
            <Container sx={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Avatar
                        alt='Olivia Bennett'
                        src='/src/assets/avatar-profile.jpg'
                        sx={{ width: 100, height: 100 }}
                    />
                </Box>
                <Box>
                    <Typography variant="h5" sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>Olivia Bennett</Typography>
                    <Typography variant="body2" color='gray' align='center'>olivia.bennett@email.com</Typography>
                </Box>
            </Container>
            <Container sx={{ display: 'flex', flexDirection: 'column', rowGap: '1em', padding: '0' }}> 
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Informacion personal</Typography>
                <FormControl className='form-field'>
                    <TextField id="user-name" label="Nombre" variant="outlined" size="small"/>
                    <TextField id="user-username" label="Apellido" variant="outlined" size="small"/>
                    <TextField id="user-address" label="Direccion" variant="outlined" size="small"/>
                    <TextField id="user-location" label="Ubicacion" variant="outlined" size="small"/>
                    <Grid container spacing={2} columns={16}>
                        <Grid size={8}>
                            <TextField id="user-latitude" label="Latitud" variant="outlined" size="small"/>
                        </Grid>
                        <Grid size={8}>
                            <TextField id="user-longitude" label="Longitud" variant="outlined" size="small"/>
                        </Grid>
                    </Grid>
                </FormControl>
            </Container>
            <Container sx={{ display: 'flex', flexDirection: 'column', rowGap: '1em', padding: '0' }}>
                <Typography variant="h6" sx={{fontWeight: 700}}>Preferencias</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }} >
                    <Typography variant="body1" sx={{fontWeight: 600}} >Criterios de busqueda</Typography>
                    <IconButton size='small' href='/search-criteria' sx={{ color: 'black', padding: '0'}}> 
                        <ArrowForwardIosIcon fontSize='small'/>
                    </IconButton>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body1" sx={{fontWeight: 600}}>Ingredientes preferidos</Typography>
                    <AddIcon/>
                </Box>
                 <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body1" sx={{fontWeight: 600}}>Ingredientes a evitar</Typography>
                    <AddIcon/>
                </Box>
            </Container>
            
            <LogoutButton/>
        </Container>
        </>
        
    )
}

export default Profile