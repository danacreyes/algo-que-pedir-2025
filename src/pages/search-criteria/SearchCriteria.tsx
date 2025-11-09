import { Box, Container, IconButton, Button, Card, Grid, Checkbox } from '@mui/material'
import Typography from '@mui/material/Typography'
import ClearIcon from '@mui/icons-material/Clear'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'
import RemoveCircleIcon from '@mui/icons-material/Remove'
import AddCircleIcon from '@mui/icons-material/Add'
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard'

import '../Profile/profile.css'
import './search-criteria.css'
import { useNavigate } from 'react-router-dom'
import HeaderBack from '../../components/HeaderBack/HeaderBack'

const SearchCriteria = () => {
    const label = useState
    const [counter, setCounter] = useState(0)

    const navigator = useNavigate()

    const add = () => setCounter(counter + 1)
    
    const rest = () => setCounter(counter - 1)
    
    return(
        <>
        <HeaderBack title="Criterios de búsqueda" backTo="/profile" />
        
        <Container className='main-container-search' sx={{ pb: 9 }}>

            <Card className='main-container-check' variant='outlined'>
                <Grid container spacing={2} className='grid-section'>
                    <Grid size={10}>
                        <Typography variant="body2">Vegano</Typography>
                        <Typography variant="body2" color='gray'>Solo platos veganos</Typography>
                    </Grid>
                    <Grid size={2}>
                        <Checkbox defaultChecked sx={{ display: 'flex', justifyContent: 'end', color: 'gray', '&.Mui-checked': { color: ' hsl(1, 77%, 45%)'},}} {...label} />
                    </Grid>
                </Grid>
            </Card>

            <Card className='main-container-check' variant='outlined'>
                <Grid container spacing={2} className='grid-section'>
                    <Grid size={10}>
                        <Typography variant="body2">Esquisitos</Typography>
                        <Typography variant="body2" color='gray'>Solo platos de autor</Typography>
                    </Grid>
                    <Grid size={2}>
                        <Checkbox sx={{ display: 'flex', justifyContent: 'end', color: 'gray', '&.Mui-checked': { color: ' hsl(1, 77%, 45%)'},}} {...label} />
                    </Grid>
                </Grid>
            </Card>
            
            <Card className='main-container-check' variant='outlined'>
                <Grid container spacing={2} className='grid-section'>
                    <Grid size={10}>
                        <Typography variant="body2">Conservadores</Typography>
                        <Typography variant="body2" color='gray'>Solo platos con ingredientes preferidos</Typography>
                    </Grid>
                    <Grid size={2}>
                        <Checkbox defaultChecked sx={{ display: 'flex', justifyContent: 'end', color: 'gray', '&.Mui-checked': { color: ' hsl(1, 77%, 45%)'},}} {...label} />
                    </Grid>
                </Grid>
            </Card>

            <Card className='main-container-check' variant='outlined'>
                <Grid container spacing={3} className='grid-section'>
                    <Grid size={10}>
                        <Typography variant="body2">Fieles</Typography>
                        <Typography variant="body2" color='gray'>Solo los restaurantes preferidos</Typography>
                    </Grid>
                    <Grid size={2}>
                        <Checkbox sx={{ display: 'flex', justifyContent: 'end', color: 'gray', '&.Mui-checked': { color: ' hsl(1, 77%, 45%)'},}} {...label} />
                    </Grid>
                </Grid>
                <div className='restaurant-section'>
                    <RestaurantCard
                        src ='https://images.unsplash.com/photo-1534650075489-3baecec1e8b1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170'
                        alt ='Restaurant'
                        name ='La pizzeria'
                        detail ='4.2 • 25-35 min • $'
                        icon ={<ClearIcon />}
                    />
                    <RestaurantCard
                        src='https://images.unsplash.com/photo-1605478371310-a9f1e96b4ff4?ixlib=rb-4.1.0&ixid'
                        alt='Restaurant'
                        name='El Gran Sabor'
                        detail='4.5 • 30-40 min • $$'
                        icon={<ClearIcon />}
                    />
                </div>
                <Box className='box-button'>
                    <Button size='small' variant="contained" className='btn-add'><AddIcon fontSize='small'/></Button>
                </Box>
            </Card>

            <Card className='main-container-check' variant='outlined'>
                <Grid container spacing={2} className='grid-section'>
                    <Grid size={10}>
                        <Typography variant="body2">Marketing</Typography>
                        <Typography variant="body2" color='gray'>Filtrar platos por palabras buscadas</Typography>
                    </Grid>
                    <Grid size={2}>
                        {/* <Checkbox/> */}
                        <Checkbox sx={{ display: 'flex', justifyContent: 'end', color: 'gray', '&.Mui-checked': { color: ' hsl(1, 77%, 45%)'},}} {...label} />
                    </Grid>
                </Grid>
                <Box className='box-button'>
                    <Button size='small' variant="contained" className='btn-add'><AddIcon fontSize='small'/></Button>
                </Box>
            </Card>

            <Card className='main-container-check' variant='outlined'>
                <Grid container spacing={2} className='grid-section'>
                    <Grid size={10}>
                        <Typography variant="body2">Impacientes</Typography>
                        <Typography variant="body2" color='gray'>Dentro de una distancia máxima</Typography>
                    </Grid>
                    <Grid size={2}>
                        <Checkbox sx={{ display: 'flex', justifyContent: 'end', color: 'gray', '&.Mui-checked': { color: ' hsl(1, 77%, 45%)'},}} {...label} />
                    </Grid>
                </Grid>
                <Container className='container-counter'>
                    <Typography variant="body2" color='gray'>Distancia (km)</Typography>
                    
                    <Box className='box-counter'>
                        <IconButton size='small' aria-label="remove" sx={{ backgroundColor: '#f7f4f4', width: 30, height: 30 }} onClick={rest} disabled={counter === 0}>
                            <RemoveCircleIcon fontSize='small' sx={{color: 'gray'}} />
                        </IconButton>
                        <Typography>{counter}</Typography>
                        
                        <IconButton aria-label="add" sx={{ backgroundColor: '#f7f4f4', width: 30, height: 30 }} onClick={add}>
                            <AddCircleIcon fontSize='small' sx={{color: 'gray'}}/>
                        </IconButton>
                    </Box>
                    
                </Container>
            </Card>               

            <Button variant="contained" className='btn-primary'>Guardar</Button>
        </Container>
        </>
    )
}

export default SearchCriteria