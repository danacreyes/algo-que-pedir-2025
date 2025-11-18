import * as React from 'react'
import {
    Box,
    Container,
    Typography,
    Tab,
    Button,
    CardMedia,
    Modal,
} from '@mui/material'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import HeaderBack from '../../components/HeaderBack/HeaderBack'
import './store-detail.css'
import { useCart } from '../../contexts/CartContext'
import { useOnInit } from '../../customHooks/useOnInit'
import { storeService } from '../../services/LocalesService'
import { Store, StoreReviewsJSON } from '../../domain/storeDom'
import { MenuItemJSONReduced } from '../../domain/menuItem'
import { menuItemsService } from '../../services/MenuItemService'
import { Toast } from '../../components/Toast/ToastContainer'
import { useToast } from '../../components/Toast/useToast'
import RateCard from '../../components/RateCard/RateCard'
import DishCard from '../../components/DishCard/DishCard'

const dishesReducedMock: MenuItemJSONReduced[] = [
    {
        id: 1,
        nombre: 'Pizza Margherita',
        descripcion: 'Classic pizza with tomato sauce, mozzarella, and basil',
        precio: 12.99,
        imagen: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.1.0&ixid'
        + '=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1169',
        tag: 'Popular',
        local: 'sa'
    },
]

    //! arreglar el movimiento raro que hace el header
    // Arreglar esto asi es horrible, este tamaño es por lo que ocupa el BottomNavigation, esto es con lo que dijo el profe --listo
    //! cambiar todo a porcentajes lo que sea vw y vh(este no tanto, igual ni lo uso)

    // tambien todo lo que se comparta entre las dos paginas pasalo a componentes --listo
    // usar contex o local storage, o un service --listo

    // ver donde guardar el pedido, el profe dijo que tiene que estar en el front --listo
    // falta que se guarde el pedido y se muestre cuando pongas ver pedido, te lleva a la pagina (Checkout del pedido) --listo
    // falta poner que en el modal cuando toques agregar al pedido se agregue --listo
    // la app no debe permitir a un usuario agregar dos veces el mismo plato. Puede solamente editar la cantidad. --listo (a mi manera)

    // falta que traiga las reviews y los pedidos --listo
    //! preguntar como se si es popular
    // te deja agregar platos de muchos locales no solo uno! --listo

    // que te traiga las cosas de el back y que cuando estes en inicio y toques un local te lleve a ese local --listo
    // con parrams de router de me devuleva el store id que hizo fernanda --listo
    //! traer las cosas en dos partes, si entra a menu traer los platos, si entra a reseñas traer las reseñas, y armar otro DTO para que me traiga las cosas tipo reseñas, reviws, pedidos, eso se hace apenas carga la pagina
    // hacer un count de el repo de pedidos y ver cuantos hay con el id de el local --listo
    //! como usas el local storage lo que tiene que hacer cuando pones completar el plato es, peris, va a el back, el back valida si siguen existiendo todos los platos que estan en el pedido y luego que tire un error de el back que ya no esta ese plato (luego que lo saque o te ponga que lo saques o nose algo de eso)

    //! traer las cosas 

    //! test end to end un test por end point

const StoreDetail = () => {
    const { toast, showToast } = useToast()
    const { id } = useParams()
    const [value, setValue] = React.useState('1')
    const [open, setOpen] = React.useState(false)
    // const [selectedDish, setSelectedDish] = React.useState<dishType | null>(null)
    const [selectedDish, setSelectedDish] = React.useState<MenuItemJSONReduced | null>(null)
    const [modalCounter, setmodalCounter] = React.useState(1)
    // const [dishes, setDishes] = React.useState<dishType[]>(dishesMock)
    const [dishes, setDishes] = React.useState<MenuItemJSONReduced[]>(dishesReducedMock)
    const [reviews, setReviews] = React.useState<StoreReviewsJSON[]>([])
    const navigate = useNavigate()
    
    const [hasMore, setHasMore] = React.useState<Boolean>(false)
    const [page, setPage] = React.useState<number>(1)
    const pageSize = 3

    let reviewsInMemory = false

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {

        if (newValue == '2' && reviews.length == 0) {
            setPage(1)
            getStoreReviews(1, true, reviewsInMemory)
        }

        setValue(newValue)
    }

    const handleOpen = (dishID: number) => {
        const dish = dishes.find(it => it.id === dishID)
        setSelectedDish(dish ?? null)
        setmodalCounter(1)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        setmodalCounter(1)
    }

    const countModalcounter = () => {
        setmodalCounter(modalCounter + 1)
    }

    const restModalcounter = () => {
        if (modalCounter > 1) {
            setmodalCounter(modalCounter - 1)
        }
    }

    const calculateTotalPrice = () => {
        if (!selectedDish) return 0
        return selectedDish.precio * modalCounter
    }

    const { items, addItem, totalItems } = useCart()

    const handleAddToCart = () => {
        try {
            addItem({
                id: selectedDish!.id,
                title: selectedDish!.nombre,
                desc: selectedDish!.descripcion,
                img: selectedDish!.imagen,
                tag: selectedDish!.tag,
                quantity: modalCounter,
                unitPrice: selectedDish!.precio,
                totalPrice: selectedDish!.precio * modalCounter,
                localId: Number(id),
                localName: selectedDish!.local,
            })
            
            setmodalCounter(1)
            setOpen(false)
            // showToast('Plato agregado al pedido', 'success')
        } catch (error) {
            showToast((error as Error).message, 'error')
        }
    }

    const [store, setStore] = React.useState<Store>()
    const location = useLocation()
    // console.log(location)
    // const { id } = location.state as { id: number } // esto se tiene que hacer asi si no rompe porque....

    // const id = location.state

    const getStoreData = async () => {
        try {
            const backStoreResponse = await storeService.getStore(Number(id))
            setStore(backStoreResponse)
        } catch (error) {
            console.info('An error has occurred: ', error)
        }
    }

    const getStoreItems = async () => {
        try {
            const backItemsResponse = await menuItemsService.getItemsByStore(Number(id))
            setDishes(backItemsResponse)
        } catch (error) {
            console.info('An error has occurred: ', error)
        }
    }

    const getStoreReviews = async (newPage: number, init = false, reviewsInMemory: boolean) => {
        try {
            if (reviewsInMemory) {
                return
            }
            const { reviewsCut, hasMore } = await storeService.getReviewsByStore(Number(id), { page: newPage, limit: pageSize})
            setHasMore(hasMore)
            setReviews((oldReviews) => (init ? [] : oldReviews).concat(reviewsCut))
            reviewsInMemory = true
        } catch (error) {
            console.info('An error has occurred: ', error)
        }
    }

    const getMoreStoreReviews = async () => {
        if (!hasMore) return

        const newPage = page + 1
        await getStoreReviews(newPage, false, reviewsInMemory)
        setPage(newPage)
    }

    useOnInit(() => {
        getStoreData()
        getStoreItems()
    })

    return (
        <Box className="store-detail-container">
        {/* ==================== Header ==================== */}
            <HeaderBack title={store?.name as string} backTo='/' />

            {/* ==================== Restaurant Info ==================== */}
            <Box className='restaurant-image-container'>
                <Box
                    component='img'
                    src={store?.storeURL as string}
                    alt='Restaurant'
                    className="restaurant-image"
                />
            </Box>

            <Container className="restaurant-info-container">
                <Typography variant='h5' className="restaurant-title">
                    {store?.name}
                </Typography>
                <Typography variant='body2' className="restaurant-info-stats">
                    {store?.gradePointAvg} ({store?.numberOfReviews} reviews) · {store?.numberOfOrders} pedidos
                </Typography>

                {/* ==================== Tabs ==================== */}
                <TabContext value={value}>
                    <Box className="tabs-container">
                        <TabList 
                            onChange={handleChange} 
                            aria-label='menu tabs'
                        >
                            <Tab label='Menú' value='1' />
                            <Tab label='Reseñas' value='2' />
                        </TabList>
                    </Box>

                    <Box className="tab-context-content">
                        {/* ==================== Items ==================== */}
                        <TabPanel value='1' className="tab-panel">
                            {dishes.map((dish) => (
                                <DishCard dish={dish} key={dish.id} onOpen={() => handleOpen(dish.id)}/>
                            ))}
                        </TabPanel>

                        {/* ==================== Reviews ==================== */}
                        <TabPanel value='2' className='tab-panel reviews'>
                            {reviews.map((review) => (
                                <RateCard key={review.experienceDesc} calificacion={Number(review.rate)} comentario={review.experienceDesc}/>
                            ))}
                            {hasMore && <button className='pagination-button' onClick={getMoreStoreReviews}>Cargar mas</button>}
                        </TabPanel>
                    </Box>
                </TabContext>
            </Container>

            {/* <Divider className="transparent-divider" /> */}

            {/* ==================== See Order ==================== */}
            <Box className="see-order-container">
                <Button
                    fullWidth
                    variant='contained'
                    color='error'
                    onClick={() => navigate('/order-checkout', {state: {id: store?.id, isNew: true}})}
                    className="see-order-button"
                    disabled={totalItems() < 1}
                >
                    Ver pedido ({totalItems()})
                </Button>
            </Box>

            {/* ==================== Modal ==================== */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="modal-box">
                    <CardMedia
                        component='img'
                        image={selectedDish?.imagen}
                        alt={selectedDish?.nombre}
                        className="modal-image"
                        />
                    <Box className="modal-content">
                        {/* ==================== Dish description ==================== */}
                        <Typography id="modal-modal-title" variant="h6" component="h2" className="modal-title">
                            {selectedDish?.nombre}
                        </Typography>
                        <Typography id="modal-modal-description" variant="body2" className="modal-description">
                            {selectedDish?.descripcion}
                        </Typography>

                        <Box className="price-info-container">
                            <Typography variant="body2" className="price-label">
                                Precio unitario
                            </Typography>
                            <Typography className="price-value">
                                ${selectedDish?.precio.toFixed(2)}
                            </Typography>
                        </Box>

                        {/* ==================== Quantity counter ==================== */}
                        <Box className="quantity-counter-container">
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => restModalcounter()}
                                disabled={modalCounter <= 1}
                                className="quantity-button"
                            >
                                -
                            </Button>
                            <Typography className="quantity-display">
                                {modalCounter}
                            </Typography>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => countModalcounter()}
                                className="quantity-button"
                            >
                                +
                            </Button>
                        </Box>

                        <Box className="total-price-container">
                            <Typography variant="body2" className="price-label">
                                Precio total
                            </Typography>
                            <Typography className="price-value">
                                ${calculateTotalPrice().toFixed(2)}
                            </Typography>
                        </Box>

                        {/* ==================== Action buttons ==================== */}
                        <Box className="action-buttons-container">
                            <Button
                                fullWidth
                                variant="outlined"
                                color="error"
                                onClick={handleClose}
                                className="cancel-button"
                            >
                                Cancelar
                            </Button>
                            <Button
                                fullWidth
                                variant="contained"
                                color="error"
                                className="add-button"
                                onClick={handleAddToCart}
                            >
                                Agregar al Pedido
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>

            {/* ==================== Toast ==================== */}
            <div id="toast-container">
                <Toast toast={toast} />
            </div>

        </Box>
    )
}

export default StoreDetail