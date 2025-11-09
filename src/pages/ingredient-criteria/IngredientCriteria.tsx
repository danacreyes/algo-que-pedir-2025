import { Box, Button, Card, Container, IconButton, Modal, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useOnInit } from '../../customHooks/useOnInit'

import { IngredientType } from '../../domain/ingredient'
import React from 'react'
import ClearIcon from '@mui/icons-material/Clear'

import '../../pages/Profile/profile.css'
import './ingredient-criteria.css'
import { userService } from '../../services/UserService'
import HeaderBack from '../../components/HeaderBack/HeaderBack'


sessionStorage.setItem('id', '1')
sessionStorage.setItem('email', 'sofiamiller@gmail.com')

const IngredientCriteria = () => {
    const { criteria } = useParams()
    const title = criteria == 'avoid' ? 'Ingrediente a evitar' : 'Ingrediente preferidos'
    const id = Number(sessionStorage.getItem('id'))

    const [open, setOpen] = React.useState(false)

    const handleOpen = () => {
        setOpen(true)
        getAvailableIngredients()
    }

    const handleClose = () => setOpen(false)
    
    const [ingredients, setIngredients] = useState<IngredientType[]>([]) 
    const [availableIngredients, setAvailableIngredients] = useState<IngredientType[]>([])

    const [selectedIngredients, setSelectedIngredients] = useState<IngredientType[]>([])
    const [savedIngredients, setSavedIngredients] = useState<IngredientType[]>([])

    const navigator = useNavigate()

    const getIngredients = async () => {
        try {
            const ingredients = await userService.getIngredientsByCriteria(id, criteria as string)
            setIngredients([...ingredients])
        } catch (error) {
        console.info('Unexpected error', error)
        }
    }

    const getAvailableIngredients = async () => {
        try {
            const available = await userService.getAvailableIngredients(id)
            setAvailableIngredients([...available])
            console.log('disponibles',available)            
        } catch (error) {
        console.info('Unexpected error', error)
        } 
    }

    const update = async () => {
        try {
            const selectedIngs = await userService.update(id, criteria as string, selectedIngredients)
            console.log('agregados',selectedIngs)
            setIngredients(prev => [...prev, ...selectedIngs])
            setOpen(false)
            setSelectedIngredients([])
        } catch (error) {
        console.info('Unexpected error', error)
        }
    }

    useOnInit(() => getIngredients())

    const handleSelect = (ingredient: IngredientType) => {
        setSelectedIngredients(prevIngs =>
            !prevIngs.every(prevIng => prevIng.id != ingredient.id)
            ? prevIngs.filter(prevIng => prevIng.id !== ingredient.id)  // si ya estaba, lo saco
            : [...prevIngs, ingredient]               // si no estaba, lo agrego
        )
    }

    const handleRemove = (id: number) => {
        setSavedIngredients(prev => prev.filter(i => i.id !== id))
    }

    return(
        <>
        <HeaderBack title={title} backTo="/profile" />

        <Container className='main-container-search' sx={{ pb: 9 }}>
            <Box component="section" className='box-section-criteria'>
                {/* <Box component="section" className='title-box'>
                    <IconButton size='small' onClick={() => navigator(-1)}>
                        <ArrowBackIcon className='icon-profile'/>
                    </IconButton>
                    <Typography variant="h6" className='title-main-container'>{title}</Typography>
                </Box> */}

                <Box className='box-ingredients' >
                    <Typography component="div" variant="body1" sx={{fontWeight: 600}}>
                        {ingredients.length > 0 ? (
                            ingredients.map(ing => (
                                <div key={ing.id} className='ingredient-item'>
                                    <Typography component="div" variant='body2'>{ing.name}</Typography>
                                    <IconButton size='small' className='icon-style' onClick={() => handleRemove(ing.id as number)}> 
                                        <ClearIcon/>
                                    </IconButton>  
                                </div>
                        ))) : (
                            <Typography component="div" variant="body2" className='no-ingredients'>No seleccionaste ingrediente</Typography>
                        )}
                    </Typography>    
                </Box>

            </Box>
            
            <Button variant="contained" className='btn-primary btn-add-ingredient' onClick={handleOpen}>Añadir ingrediente</Button>
                
            {/* MODAL PARA AGREGAR LOS INGREDIENTES */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='modal'>
                    <Card className='card-modal'>
                        <Typography id="modal-modal-title" variant="h6" component="h2">Seleccione</Typography>
                        {availableIngredients.length != 0 ? (
                            availableIngredients.map( ingredient =>
                            <Box key={ingredient.id} className='modal-items'>
                                <label className='label-item'>
                                    <input type="checkbox" 
                                    checked={selectedIngredients.includes(ingredient)}
                                    onChange={() => handleSelect(ingredient)}
                                    />
                                    {ingredient.name}
                                </label>
                            </Box>
                        )) : <Typography variant='subtitle1'> No hay ingredientes para mostrar </Typography>}
                        <div className='btn-group'>
                            <Button type='submit' variant="contained" className='btn-secondary' onClick={handleClose}>Descartar</Button>
                            <Button type="button" variant="contained" className='btn-primary' onClick={update}>Guardar</Button>
                        </div>
                    </Card>
                </Box>
            </Modal>
        </Container>
        </>
    )
}

export default IngredientCriteria