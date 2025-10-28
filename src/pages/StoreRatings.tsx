import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'
import { useState } from 'react'
import { StoreType } from '../domain/store'

const StoreRatings = () => {
    const [stores, setStores] = useState<StoreType[]>([])
    // const [errorMessage, setErrorMessage] = useState('') // para errores 

    const getUnratedStores = async () => {
        try {
            // Aca es userService? Es el que usamos para loguearnos con Local...
            // const unratedStores = userService.getUnratedStores()
            setStores(stores)
        } catch (error) {
            console.info('An error has occurred',error)
        }
    }

    const showUnratedStores = () => {
        return stores
        .map(store => 
            <Card sx={{ display: 'flex' }}>
                <CardMedia
                    component="img"
                    sx={{ width: 100 }}
                    image={store.storeURL}
                    alt="Store profile image"
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5">
                            {store.name}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            component="div"
                            sx={{ color: 'text.secondary' }}
                        >
                            {/* Estas las tendria que agregar a la clase de dominio de nuestro front y al back tambien no?
                                O las hardcodeo
                             */}
                            {/* {store.rating} · {store.avgDeliveryTime} · {store.avgPrice > 100 ? '$$' : '$'} */}
                        </Typography>
                    </CardContent>
                </Box>
            </Card>
        )
    }

    return (
        <>
            <div className='main-container'>
                <section className='section-title-and-tabs'>
                    <Typography 
                    variant='h5' sx={{margin: '2rem 0'}}>
                        Restaurantes a calificar
                    </Typography>
                    {stores.length != 0 ? 
                        showUnratedStores() : 
                        <Typography variant='subtitle1' sx={{margin: '2rem 0', color: 'text.secondary'}}>
                            No hay locales para puntuar
                            <br />
                            /*
                                TODO:
                                Cuando maxi arme la pagina del pedido, agregale en su endpoint todo lo de que se va a 
                                poder puntuar el local. Medio hardcodeado pero como no tenemos envio, creo que lo mas practico
                                va ser que cuando se confirme el carrito, ya se pueda puntuar y cancelar.
                                Si se cancela igual se puede puntuar.
                            
                            
                            
                            
                             */
                        </Typography>}
                </section>
            </div>
        </>
    )
}

export default StoreRatings