import { Box, Container, IconButton, Button, Fab } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Typography from '@mui/material/Typography'
import ClearIcon from '@mui/icons-material/Clear'
import AddIcon from '@mui/icons-material/Add'
import '../css/profile.css'
import CheckboxCard from '../components/CheckBoxContainer'
import { useState } from 'react'
import RemoveIcon from '@mui/icons-material/Remove'
import RestaurantCard from '../components/RestaurantCard'

const SearchCriteria = () => {
    const [counter, setCounter] = useState(0)

    const add = () => {
        setCounter(counter + 1)
    }

    const rest = () => {
        setCounter(counter - 1)
    }

    return(
        <>
        <Container sx={{display: 'flex', width: '100vw', height: '100%', flexDirection: 'column', padding: '2em', gap: '1em' }}>
            {/* ESTO SE PODRIA PONER EN OTRO COMPONENTE PARA QUE LO PODAMOS COMPARTIR TODOS */}
            <Box component="section" sx={{display: 'flex', width: '100%', position: 'relative'}}>
                <IconButton size='small' href='/profile' sx={{ color: 'black'}}>
                    <ArrowBackIcon className='icon-profile'/>
                </IconButton>
                <Typography variant="h6" sx={{ display: 'flex', width: '100%', justifyContent: 'center', fontWeight: 600 }}>Selecciona tu criterio</Typography>
            </Box>

            <CheckboxCard
                title = 'Vegano'
                description = 'Solo platos veganos'
                defaultChecked = {true}
            />
            <CheckboxCard
                title = 'Esquisitos'
                description = 'Solo platos de autor'
                defaultChecked = {false}
            />
            <CheckboxCard
                title = 'Conservadores'
                description = 'Solo platos con ingredientes preferidos'
                defaultChecked = {true}
            />

            <CheckboxCard
                title = 'Fieles'
                description = 'Solo los restaurantes preferidos'
                defaultChecked = {true}
            >
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
                <Box sx ={{ display: 'flex', justifyContent: 'end', paddingRight: '0.6em', paddingBottom: '1em'}}>
                    <Button size='small' variant="contained" sx={{background: '#E82933', padding: '0.2em', minWidth: 0, boxShadow: 'none' }}><AddIcon fontSize='small'/></Button>
                </Box>
            </CheckboxCard> 

            <CheckboxCard
                title = 'Marketing'
                description = 'Filtrar platos por palabras buscadas'
                defaultChecked = {false}
            >
                <Box sx ={{ display: 'flex', justifyContent: 'end', paddingRight: '0.6em', paddingBottom: '1em'}}>
                    <Button size='small' variant="contained" sx={{background: '#E82933', padding: '0.2em', minWidth: 0, boxShadow: 'none'}}><AddIcon fontSize='small'/></Button>
                </Box>
            </CheckboxCard>

            <CheckboxCard
                title = 'Impacientes'
                description = 'Dentro de una distancia máxima'
                defaultChecked = {false}
            >
                <Container sx={{display: 'flex', width: '100%', justifyContent: 'space-between', padding: 0}}>
                    <Typography variant="body2" color='gray'>Distancia (km)</Typography>
                    
                    <Box sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '0.5em'}}>
                        <Fab size='small' aria-label="remove" sx={{color: 'ligth-gray', width: '2.2em', boxShadow: 'none', fontSize: '16px'}} onClick={rest} disabled={counter === 0}>
                            <RemoveIcon />
                        </Fab>
                        <Typography>{counter}</Typography>
                        <Fab size='small' aria-label="add" sx={{color: 'ligth-gray', width: '2.2em', boxShadow: 'none', fontSize: '16px'}} onClick={add}>
                            <AddIcon />
                        </Fab>
                        {/* <Button size='small' aria-label="remove" sx={{color: 'ligth-gray', boxShadow: 'none', padding: 0}} onClick={rest} disabled={counter === 0}>
                            <RemoveCircleIcon sx={{color: 'gray'}} />
                        </Button>
                        <Typography>{counter}</Typography>
                        
                        <Button aria-label="add" sx={{color: 'ligth-gray', boxShadow: 'none', padding: 0}} onClick={add}>
                            <AddCircleIcon sx={{color: 'gray'}}/>
                        </Button> */}
                    </Box>
                    
                </Container>

            </CheckboxCard>
            <Button variant="contained" sx={{background: '#E82933', padding: '0.8em', width: '100%', borderRadius: '6px', textTransform: 'none', fontWeight: 300}}>Guardar</Button>
        </Container>
        </>
    )
}

export default SearchCriteria