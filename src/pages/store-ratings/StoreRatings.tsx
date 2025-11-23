import { Button, Card, Container, Divider, Typography } from '@mui/material'
import { useState } from 'react'
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard'
import { Navigator } from '../../routes/Navigator'
import { userService } from '../../services/UserService'
import { useOnInit } from '../../customHooks/useOnInit'
import './store-ratings.css'
import { Store } from '../../domain/storeDom'

const StoreRatings = () => {
    const [unratedStores, setUnratedStores] = useState<Store[]>([])

    const navigation = Navigator()
    
    const getUnratedStores = async () => {
        try {
            const unratedStores: Store[] = await userService.getUnratedStores()
            setUnratedStores(unratedStores)
        } catch (error) {
            console.info('An error has occurred',error)
        }
    }

    useOnInit(getUnratedStores)

    const showUnratedStores = () => {
        return unratedStores
        .map(store => 
            <Container sx={{padding: '0.5em'}} key={store.id}>
                <RestaurantCard 
                src={store.storeURL} 
                alt='Imagen de local' 
                name={store.name} 
                detail = {`${store.gradePointAvg} · ${store.deliveryTimeAvg} · ${store.isExpensive ? '$$' : '$'}`}
                icon={<Button sx={{textAlign: 'center'}} variant="contained" color="success">CALIFICAR</Button>}
                buttonOnClickFunction={() => navigation.goTo(`/rate-store/${store.id}`, { name : store.name })}
                />
            </Container>
        )
    }

    return (
        <>
            <div className='main-container' style={{padding: '0.5em'}}>
                {/* <section className='section-title-and-tabs'> */}
                    <Typography 
                    variant='h5' sx={{margin: '1.5rem 0'}}>
                        Restaurantes a calificar
                    </Typography>
                    <Divider />
                    {unratedStores.length != 0 ? 
                        showUnratedStores() : 
                        <Card variant='outlined' className='no-unrated-stores-card'>
                            <Typography variant='subtitle1' sx={{margin: '2rem 0' }}>
                                Todavia no hay locales para puntuar
                            </Typography>
                            <Typography sx={{margin: '2rem 0', color: 'text.secondary'}}>
                                Realiza pedidos para poder otorgar calificaciones
                            </Typography>
                        </Card>}
                {/* </section> */}
            </div>
        </>
    )
}

export default StoreRatings