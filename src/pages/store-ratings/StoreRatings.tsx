import { Container, Typography } from '@mui/material'
import { useState } from 'react'
import { StoreCardJSON } from '../../domain/store'
import RestaurantCard from '../../components/RestaurantCard'
import { useNavigation } from '../../routes/navigationHandler'

const mockCard: StoreCardJSON = {
    id: 1,
    name: 'Pizzeria Fina',
    imageURL: 'https://assets.surlatable.com/m/15a89c2d9c6c1345/72_dpi_webp-REC-283110_Pizza.jpg',
    gradePointAvg: 4.1,
    deliveryTimeAvg: '30 - 45 min',
    isExpensive: true
}
const mockCard2: StoreCardJSON = {
    id: 2,
    name: 'Pizzeria Cruda',
    imageURL: 'https://assets.surlatable.com/m/15a89c2d9c6c1345/72_dpi_webp-REC-283110_Pizza.jpg',
    gradePointAvg: 3.1,
    deliveryTimeAvg: '15 - 25 min',
    isExpensive: false
}
const mockCard3: StoreCardJSON = {
    id: 3,
    name: 'Pizzeria Fina',
    imageURL: 'https://assets.surlatable.com/m/15a89c2d9c6c1345/72_dpi_webp-REC-283110_Pizza.jpg',
    gradePointAvg: 5.0,
    deliveryTimeAvg: '20 - 30 min',
    isExpensive: false
}

const StoreRatings = () => {
    // Podrian no ser StoreTypes no? Directamente mandar al back la puntuacion
    const [unratedStores, setUnratedStores] = useState<StoreCardJSON[]>([mockCard, mockCard2, mockCard3])
    // const [errorMessage, setErrorMessage] = useState('') // para errores 

    const navigation = useNavigation()
    
    const getUnratedStores = async () => {
        try {
            // const unratedStores = userService.getUnratedStores()
            setUnratedStores(unratedStores)
        } catch (error) {
            console.info('An error has occurred',error)
        }
    }

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
                buttonOnClickFunction={() => navigation.goTo(`/puntuar-local/${store.id}`)}
                />
            </Container>
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