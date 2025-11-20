import { Box, Container, IconButton, Button, Card, Grid, Checkbox, Input } from '@mui/material'
import Typography from '@mui/material/Typography'
import ClearIcon from '@mui/icons-material/Clear'
import AddIcon from '@mui/icons-material/Add'
import { useRef, useState } from 'react'
import RemoveCircleIcon from '@mui/icons-material/Remove'
import AddCircleIcon from '@mui/icons-material/Add'
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard'

import '../Profile/profile.css'
import './search-criteria.css'
import { useNavigate } from 'react-router-dom'
import HeaderBack from '../../components/HeaderBack/HeaderBack'
import { useUserProfile } from '../../customHooks/useUserProfile'
import { useOnInit } from '../../customHooks/useOnInit'
import { Combinado, Conservador, Consumista, CriterioCliente, Exquisito, Fieles, Impaciente, Vegano } from '../../domain/criterioCliente'
import { userService } from '../../services/UserService'
import CheckIcon from '@mui/icons-material/Check'
import { red } from '@mui/material/colors'
import FraseConsumista from '../../components/FraseConsumista/FraseConsumista'
import { UserProfile } from '../../domain/userProfile'

const SearchCriteria = () => {
    const { profile, setProfile, profileOG, checkChanges } = useUserProfile()

    const isInitializedRef = useRef(false)

    let initialCriterios: CriterioCliente[] = []

    const [criterios, setCriterios] = useState<CriterioCliente[]>(initialCriterios)
    const [showInput, setShowInput] = useState(false)
    const [inputFrases, setInputFrases] = useState('')
    const [frasesFavoritas, setFrasesFavoritas ] = useState<string[]>([])
    const [counter, setCounter] = useState(0)

    if (!isInitializedRef.current && profile.criteria && profile.criteria.type === 'combinado') {
        const profileCriteria = profile.criteria as Combinado
        
        // Asumimos que si profile.id existe, los datos ya fueron cargados desde la API.
        // O si el array de criterios cargados es diferente al array vacío inicial.
        if (profile.id !== undefined && profileCriteria.criterios.length > 0) {
            setCriterios(profileCriteria.criterios)
            isInitializedRef.current = true // Detenemos futuras inicializaciones
            console.log('criterios de perfil',(profile.criteria as Combinado)?.criterios)
            
            // Si es consumista, cargo sus frases
            if (profileCriteria.criterios.some(c => c.type == 'consumista')) {
                const consumista = profileCriteria.criterios.find(criterio => criterio.type == 'consumista')
                setFrasesFavoritas((consumista as Consumista)?.frasesFavoritas || [])
            }

            // Seteamos su distancia maxima
            setCounter(profile.maxDistance || 0)
        }


    }
    
    const isCriterioActive = (type: string) => criterios.some(c => c.type === type)
    
    const navigator = useNavigate()
    
    const add = () => setCounter(counter + 1)
    
    const rest = () => setCounter(counter - 1)


    const handleOpenInput = () => {
        setShowInput(true) 
    }
    
    // useOnInit(() =>{
    //     initialCriterios = (profile.criteria as Combinado)?.criterios
    //     setCriterios(initialCriterios)
    //     console.log('setCruterios', initialCriterios)
    //     
    //     console.log('perfil', profile)
    // })
    // NO FUNCIONA PORQUE -> array de dependencias vacío ([]), se ejecuta una sola vez cuando el componente se monta
    
    const toggleCriterio = (type: string, newCriteria: CriterioCliente) => (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setCriterios([ ...criterios, newCriteria ])
            profile.agregarCriterios(criterios)
        } else {
            setCriterios(criterios.filter(c => c.type !== type))
        }
    }

    const handleSave = async () => {
        const nuevo = profile.agregarCriterios(criterios) 
        
        // Si es impaciente, cargo su distancia maxima
        if ((nuevo.criteria as Combinado).criterios?.some(c => c.type == 'impaciente')) {
          // Esto es una locura
          setProfile(prev =>
            UserProfile.fromJSON({
              ...prev.toJSON(),
              maxDistance: counter
            })
          )
        }
            
        console.log('nuevo perfil', nuevo)
        console.log('perfil viejo', profileOG)
    }

    const handleGuardarFrases = () => {
        const frasesNuevas = inputFrases.split(',')
        .map(f => f.trim()) // elimino espacios
        .filter(f => f.length > 0) // elimino strings vacíos

        const listaDeFrases = [...frasesFavoritas,...frasesNuevas]
        // console.log(listaDeFrases)
        updateFrases(listaDeFrases)
        setInputFrases('')
        setShowInput(false)
    }

    const handleEliminarFrases = (frase: string) => {
        const updatedList = frasesFavoritas.filter(i => i !== frase)
        // console.log(updatedList)
        updateFrases(updatedList)
    }

    const handleCerrarInput = () => {
        setInputFrases('') // Limpiar el input al cancelar
        setShowInput(false) 
    }

    const updateFrases = (listaDeFrases : string[]) => {
      listaDeFrases = [...new Set(listaDeFrases)]
      const crit = criterios.filter(c => c.type !== 'consumista')
      setCriterios([ ...crit, new Consumista(listaDeFrases) ])
      setFrasesFavoritas(listaDeFrases)
    } 

    return(
        <>
        
        <Container className='main-container-search' sx={{ pb: 9 }}>
            <HeaderBack title="Criterios de búsqueda" backTo="/profile" onClickCustom={checkChanges} />

            <Card className='main-container-check' variant='outlined'>
                <Grid container spacing={2} className='grid-section'>
                    <Grid size={10}>
                        <Typography variant="body2">Vegano</Typography>
                        <Typography variant="body2" color='gray'>Solo platos veganos</Typography>
                    </Grid>
                    <Grid size={2}>
                        <Checkbox checked={isCriterioActive('vegano')} onChange={toggleCriterio('vegano', Vegano)} sx={{ display: 'flex', justifyContent: 'end', color: 'gray', '&.Mui-checked': { color: ' hsl(1, 77%, 45%)'},}} />
                    </Grid>
                </Grid>
            </Card>

            <Card className='main-container-check' variant='outlined'>
                <Grid container spacing={2} className='grid-section'>
                    <Grid size={10}>
                        <Typography variant="body2">Exquisitos</Typography>
                        <Typography variant="body2" color='gray'>Solo platos de autor</Typography>
                    </Grid>
                    <Grid size={2}>
                        <Checkbox checked={isCriterioActive('exquisito')} onChange={toggleCriterio('exquisito', Exquisito)} sx={{ display: 'flex', justifyContent: 'end', color: 'gray', '&.Mui-checked': { color: ' hsl(1, 77%, 45%)'},}} />
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
                        <Checkbox checked={isCriterioActive('conservador')} onChange={toggleCriterio('conservador', Conservador)} sx={{ display: 'flex', justifyContent: 'end', color: 'gray', '&.Mui-checked': { color: ' hsl(1, 77%, 45%)'},}} />
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
                        <Checkbox checked={isCriterioActive('fieles')} onChange={toggleCriterio('fieles', new Fieles([]))} sx={{ display: 'flex', justifyContent: 'end', color: 'gray', '&.Mui-checked': { color: ' hsl(1, 77%, 45%)'},}} />
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
                        <Checkbox checked={isCriterioActive('consumista')} onChange={toggleCriterio('consumista', new Consumista(frasesFavoritas))} sx={{ display: 'flex', justifyContent: 'end', color: 'gray', '&.Mui-checked': { color: ' hsl(1, 77%, 45%)'},}} />
                    </Grid>
                    {frasesFavoritas.map(
                            (frase) => 
                                <FraseConsumista frase={frase} eliminarFrase={handleEliminarFrases} key={`${frase}`}/>
                        )}
                </Grid>
                    { showInput && (
                        <Grid container spacing={2} className='grid-section input-frases-wrapper' >
                            <Grid size={10} className='input-frases-field'> 
                                <Box>
                                    <Typography variant="body2" className="input-frases-field label">Separar las frases con una ,</Typography>
                                    <Input 
                                        type="text" 
                                        value={inputFrases} 
                                        onChange={(event) => setInputFrases(event.target.value)} 
                                        fullWidth
                                        placeholder="Escribe tus palabras clave aquí..."
                                        className="input-frases-field" 
                                    /> 
                                </Box>
                            </Grid>
                            
                            <Grid size={2} className='input-frases-controls'>
                                {/* Botón de Guardar/Añadir */}
                                <Button 
                                    onClick={handleGuardarFrases} 
                                    size="small" 
                                    className='icon-button-control'
                                >
                                    <CheckIcon/>
                                </Button>
                                {/* Botón de Cancelar/Cerrar */}
                                <IconButton 
                                    onClick={handleCerrarInput}
                                    size="small"
                                    className='icon-button-control'
                                >
                                    <ClearIcon /> 
                                </IconButton>
                            </Grid>
                        </Grid>
                    )}
                <Box className='box-button'>
                    <Button size='small' variant="contained" className='btn-add' onClick={handleOpenInput}><AddIcon fontSize='small'/></Button>
                </Box>
            </Card>

            <Card className='main-container-check' variant='outlined'>
                <Grid container spacing={2} className='grid-section'>
                    <Grid size={10}>
                        <Typography variant="body2">Impacientes</Typography>
                        <Typography variant="body2" color='gray'>Dentro de una distancia máxima</Typography>
                    </Grid>
                    <Grid size={2}>
                        <Checkbox checked={isCriterioActive('impaciente')} onChange={toggleCriterio('impaciente', Impaciente)} sx={{ display: 'flex', justifyContent: 'end', color: 'gray', '&.Mui-checked': { color: ' hsl(1, 77%, 45%)'},}} />
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

            <Button variant="contained" className='btn-primary' onClick={handleSave}>Guardar</Button>
        </Container>
        </>
    )
}

export default SearchCriteria