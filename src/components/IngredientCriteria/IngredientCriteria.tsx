import { Box, Button, Container, IconButton, Modal, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useParams } from 'react-router-dom'
import '../../pages/Profile/profile.css'
import './ingredient-criteria.css'
import React, { useState } from 'react'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const IngredientCriteria = () => {
    const { criteria } = useParams()

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const title = criteria == 'avoid' ? 'Ingrediente a evitar' : 'Ingrediente preferidos'
    return(
        <Container className='main-container-search'>
            <Box component="section" className='box-section-criteria'>
                <IconButton size='small' href='/profile' sx={{ color: 'black'}}>
                    <ArrowBackIcon className='icon-profile'/>
                </IconButton>
                <Typography variant="h6" className='title-main-container'>{title}</Typography>
            </Box>
            
            <Button variant="contained" className='btn-primary' onClick={handleOpen}>Añadir ingrediente</Button>

            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{style}}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Text in a modal
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography>
                    </Box>
                </Modal>
            </div>
        </Container>
    )
}

export default IngredientCriteria