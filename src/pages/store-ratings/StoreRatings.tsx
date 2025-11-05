import { Container, Typography } from '@mui/material'
import { useState } from 'react'
import { StoreCardJSON } from '../../domain/store'
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard'
import { Navigator } from '../../routes/Navigator'
import { userService } from '../../services/UserService'
import { useOnInit } from '../../customHooks/useOnInit'
import './store-ratings.css'

const StoreRatings = () => {
    const [unratedStores, setUnratedStores] = useState<StoreCardJSON[]>([])

    const navigation = Navigator()
    
    const getUnratedStores = async () => {
        try {
            const unratedStores: StoreCardJSON[] = await userService.getUnratedStores()
            setUnratedStores(unratedStores)
        } catch (error) {
            console.info('An error has occurred',error)
        }
    }

    useOnInit(() => getUnratedStores())

    const showUnratedStores = () => {
        return unratedStores
        .map(store => 
            <Container sx={{padding: '0.5em'}} key={store.id}>
                <RestaurantCard 
                src={store.imageURL} 
                alt='Imagen de local' 
                name={store.name} 
                detail = {`${store.gradePointAvg} · ${store.deliveryTimeAvg} · ${store.isExpensive ? '$$' : '$'}`}
                icon='CALIFICAR'
                buttonOnClickFunction={() => navigation.goTo(`/rate-store/${store.id}`, { name : store.name })}
                />
            </Container>
        )
    }

    return (
        <>
            <div className='main-container' style={{padding: '0.5em'}}>
                <section className='section-title-and-tabs'>
                    <Typography 
                    variant='h5' sx={{margin: '2rem 0'}}>
                        Restaurantes a calificar
                    </Typography>
                    {unratedStores.length != 0 ? 
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