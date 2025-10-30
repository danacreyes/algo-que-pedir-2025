import { Box, Button, Card, Container, IconButton, Modal, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { IngredientType } from '../../domain/ingredient'
import { ingredientService } from '../../services/IngredientService'
import React from 'react'
import ClearIcon from '@mui/icons-material/Clear'

import '../../pages/Profile/profile.css'
import './ingredient-criteria.css'

const IngredientCriteria = () => {
    const { criteria } = useParams()
    const title = criteria == 'avoid' ? 'Ingrediente a evitar' : 'Ingrediente preferidos'

    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    
    const [ingredients, setIngredients] = useState<IngredientType[]>([])
    const [selectedIngredients, setSelectedIngredients] = useState<number[]>([])
    const [savedIngredients, setSavedIngredients] = useState<IngredientType[]>([])

    const getIngredients = async () => {
        try {
            const newOrders = await ingredientService.getAllIngredients()
            setIngredients(newOrders)
        } catch (error) {
        console.info('Unexpected error', error)
        }
    }

    const showIngredients = () => {
        const available = ingredients.filter(i => !savedIngredients.some(si => si.id === i.id))
        return available.map( ingredient =>
            <Box key={ingredient.id} className='modal-items'>
                <label className='label-item'>
                    <input type="checkbox" 
                    checked={selectedIngredients.includes(ingredient.id as number)}
                    onChange={() => handleSelect(ingredient.id as number)}
                    />
                    {ingredient.name}
                </label>
            </Box>
        )
    }

    useEffect(() => {
        getIngredients()
    }, [])

    const handleSelect = (id: number) => {
        setSelectedIngredients(prev =>
            prev.includes(id)
            ? prev.filter(i => i !== id)  // si ya estaba, lo saco
            : [...prev, id]               // si no estaba, lo agrego
        )
    }

    const saveModal = () => {
        const selectedIngs = ingredients.filter(i => selectedIngredients.includes(i.id as number))
        setSavedIngredients(prev => [...prev, ...selectedIngs])
        setOpen(false)
        setSelectedIngredients([])
    }

    const handleRemove = (id: number) => {
        setSavedIngredients(prev => prev.filter(i => i.id !== id))
    }

    return(
        <Container className='main-container-search'>
            <Box component="section" className='box-section-criteria'>
                <Box component="section" className='title-box'>
                    <IconButton size='small' href='/profile'>
                        <ArrowBackIcon className='icon-profile'/>
                    </IconButton>
                    <Typography variant="h6" className='title-main-container'>{title}</Typography>
                </Box>

                <Box className='box-ingredients' >
                    <Typography component="div" variant="body1" sx={{fontWeight: 600}}>
                        {savedIngredients.length > 0 ? (
                            savedIngredients.map(ing => (
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
                        {ingredients.length != 0 ?
                            showIngredients() : <Typography variant='subtitle1'> No hay ingredientes para mostrar </Typography>
                        }
                        <div className='btn-group'>
                            <Button type='submit' variant="contained" className='btn-secondary' onClick={handleClose}>Descartar</Button>
                            <Button type="button" variant="contained" className='btn-primary' onClick={saveModal}>Guardar</Button>
                        </div>
                    </Card>
                </Box>
            </Modal>
        </Container>
    )
}

export default IngredientCriteria