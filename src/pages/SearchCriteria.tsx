import { Box, Container, Card, Grid, Checkbox, IconButton, Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Typography from '@mui/material/Typography'
import ClearIcon from '@mui/icons-material/Clear'
import AddIcon from '@mui/icons-material/Add'
import '../css/profile.css'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

const SearchCriteria = () => {
    return(
        <>
        <Container sx={{display: 'flex', width: '100vw', height: '100%', flexDirection: 'column', padding: '2em', gap: '1em' }}>
            <Box component="section" sx={{display: 'flex', width: '100%', position: 'relative'}}>
                <IconButton size='small' href='/profile' sx={{ color: 'black'}}>
                    <ArrowBackIcon className='icon-profile'/>
                </IconButton>
                <Typography variant="h6" sx={{ display: 'flex', width: '100%', justifyContent: 'center', fontWeight: 600 }}>Selecciona tu criterio</Typography>
            </Box>
            <Card sx={{ padding: '1em', borderRadius: '10px'}}>
                <Grid container spacing={2}>
                    <Grid size={10}>
                        <Typography variant="body2" sx={{ display: 'flex', width: '100%' }}>Veganos</Typography>
                        <Typography variant="body2" color='gray'>Solo platos veganos</Typography>
                    </Grid>

                    <Grid size={2}>
                        <Checkbox defaultChecked sx={{ display: 'flex', justifyContent: 'end', color: 'gray', '&.Mui-checked': { color: ' hsl(1, 77%, 45%)'},}} {...label} />
                    </Grid>
                </Grid>
            </Card>
            <Card sx={{ padding: '1em', borderRadius: '10px'}}>
                <Grid container spacing={2}>
                    <Grid size={10}>
                        <Typography variant="body2" sx={{ display: 'flex', width: '100%' }}>Esquisitos</Typography>
                        <Typography variant="body2" color='gray'>Solo platos de autor</Typography>
                    </Grid>

                    <Grid size={2}>
                        <Checkbox sx={{ display: 'flex', justifyContent: 'end', color: 'gray', '&.Mui-checked': { color: ' hsl(1, 77%, 45%)'},}} {...label} />
                    </Grid>
                </Grid>
            </Card>
            <Card sx={{ padding: '1em', borderRadius: '10px'}}>
                <Grid container spacing={2}>
                    <Grid size={10}>
                        <Typography variant="body2" sx={{ display: 'flex', width: '100%' }}>Conservadores</Typography>
                        <Typography variant="body2" color='gray'>Solo platos con ingredientes preferidos</Typography>
                    </Grid>

                    <Grid size={2}>
                        <Checkbox defaultChecked sx={{ display: 'flex', justifyContent: 'end', color: 'gray', '&.Mui-checked': { color: ' hsl(1, 77%, 45%)'},}} {...label} />
                    </Grid>
                </Grid>
            </Card>
            <Card sx={{ padding: '1em', borderRadius: '10px'}}>
                <Grid container spacing={2} sx={{ gap: '1em' }}> 
                    <Grid size={10}>
                        <Typography variant="body2" sx={{ display: 'flex', width: '100%' }}>Fieles</Typography>
                        <Typography variant="body2" color='gray'>Solo los restaurantes preferidos</Typography>
                    </Grid>
                    <Grid size={2} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Checkbox sx={{ color: 'gray', '&.Mui-checked': { color: ' hsl(1, 77%, 45%)'},}} {...label} />
                    </Grid>
                </Grid>
                
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingY: 1 }}>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, gap: '10px' }}>
                        <Box
                            component='img'
                            src='https://images.unsplash.com/photo-1534650075489-3baecec1e8b1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170'
                            alt='Restaurant'
                            sx={{ width: 50, height: 50, borderRadius: '12px', objectFit: 'cover' }} // Tamaño fijo y bordes redondeados
                        />
                        <Box>
                            <Typography variant="body2" sx={{ fontWeight: 600 }} color='gray'>La pizzeria</Typography>
                            <Typography variant="body2" color='gray'>4.2 • 25-35 min • $</Typography>
                        </Box>
                    </Box>
                    
                    <IconButton size="small" sx={{ color: 'gray', paddingRight: '0.5em' }}>
                        <ClearIcon />
                    </IconButton>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingY: 1 }}>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, gap: '10px' }}>
                        <Box
                            component='img'
                            src='https://images.unsplash.com/photo-1605478371310-a9f1e96b4ff4?ixlib=rb-4.1.0&ixid'
                            alt='Restaurant'
                            sx={{ width: 50, height: 50, borderRadius: '12px', objectFit: 'cover' }} // Tamaño fijo y bordes redondeados
                        />
                        <Box>
                            <Typography variant="body2" sx={{ fontWeight: 600 }} color='gray'>El Gran Sabor</Typography>
                            <Typography variant="body2" color='gray'>4.5 • 30-40 min • $$</Typography>
                        </Box>
                    </Box>
                    
                    <IconButton size="small" sx={{ color: 'gray', paddingRight: '0.5em' }}>
                        <ClearIcon />
                    </IconButton>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'end', paddingRight: '0.6em', paddingBottom: '1em'}}>
                    <Button size='small' variant="contained" sx={{background: '#E82933', padding: '0.2em', minWidth: 0}}><AddIcon fontSize='small'/></Button>
                </Box>
            </Card>
            <Card sx={{ padding: '1em', borderRadius: '10px'}}>
                <Grid container spacing={2} sx={{ marginBottom: '1em' }}> 
                    <Grid size={10}>
                        <Typography variant="body2" sx={{ display: 'flex', width: '100%' }}>Marketing</Typography>
                        <Typography variant="body2" color='gray'>Filtrar platos por palabras buscadas</Typography>
                    </Grid>
                    <Grid size={2} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Checkbox sx={{ color: 'gray', '&.Mui-checked': { color: ' hsl(1, 77%, 45%)'},}} {...label} />
                    </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'end', paddingRight: '0.6em', paddingBottom: '1em'}}>
                    <Button size='small' variant="contained" sx={{background: '#E82933', padding: '0.2em', minWidth: 0}}><AddIcon fontSize='small'/></Button>
                </Box>
            </Card>
             <Card sx={{ padding: '1em', borderRadius: '10px'}}>
                <Grid container spacing={2} sx={{ marginBottom: '1em' }}> 
                    <Grid size={10}>
                        <Typography variant="body2" sx={{ display: 'flex', width: '100%' }}>Impacientes</Typography>
                        <Typography variant="body2" color='gray'>Dentro de una distancia máxima</Typography>
                    </Grid>
                    <Grid size={2} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Checkbox sx={{ color: 'gray', '&.Mui-checked': { color: ' hsl(1, 77%, 45%)'},}} {...label} />
                    </Grid>
                </Grid>
            </Card>
            <Button variant="contained" sx={{background: '#E82933', padding: '0.8em', width: '100%', borderRadius: '6px', textTransform: 'none', fontWeight: 300}}>Guardar</Button>
        </Container>
        </>
    )
}

export default SearchCriteria