import * as React from 'react'
import {
    Box,
    Container,
    Typography,
    Tab,
    Button,
    Card,
    CardMedia,
    CardContent,
    Divider,
    Modal,
} from '@mui/material'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { useLocation, useNavigate } from 'react-router-dom'
import HeaderBack from '../../components/HeaderBack/HeaderBack'
import './store-detail.css'
import { useCart } from '../../contexts/CartContext'
import { useOnInit } from '../../customHooks/useOnInit'
import { storeService } from '../../services/LocalesService'
import { StoreDetailJSON, StoreType } from '../../domain/store'

type dishType = {
    id: number
    title: string
    desc: string
    price: number
    img: string
    tag?: string
}

// si lo pones aca tenes que ver como cambiar el tag
const dishesMock: dishType[] = [
    {
        id: 1,
        title: 'Pizza Margherita',
        desc: 'Classic pizza with tomato sauce, mozzarella, and basil',
        price: 12.99,
        img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.1.0&ixid'
        + '=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1169',
        tag: 'Popular',
    },
    {
        id: 2,
        title: 'Pizza Pepperoni',
        desc: 'Pizza with tomato sauce, mozzarella, and pepperoni',
        price: 13.99,
        img: 'https://images.unsplash.com/photo-1605478371310-a9f1e96b4ff4?ixlib=rb-4.1.0&ixid'
        + '=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170',
        tag: 'Popular',
    },
    {
        id: 3,
        title: 'Spaghetti Carbonara',
        desc: 'Spaghetti with creamy sauce, bacon, and parmesan cheese',
        price: 14.99,
        img: 'https://assets.tmecosys.com/image/upload/t_web_rdp_recipe_584x480_1_5x/img/'
        + 'recipe/ras/Assets/0346a29a89ef229b1a0ff9697184f944/Derivates/cb5051204f4a4525c8b013c16418ae2904e737b7.jpg',
    },
    {
        id: 4,
        title: 'Fettuccine Alfredo',
        desc: 'Fettuccine with creamy Alfredo sauce',
        price: 13.99,
        img: 'https://www.modernhoney.com/wp-content/uploads/2018/08/Fettuccine-Alfredo-Recipe-1-500x500.jpg',
    },
    {
        id: 5,
        title: 'Lasagne alla Portofino',
        desc: 'Lasagne with creamy besciamella and pesto genovese',
        price: 16.99,
        img: 'https://images.squarespace-cdn.com/content/v1/62422bb659ddd37045237686/0006ed59-9ec5-4858-b544-efb56b56d49b/8fe074b8-c1a4-4654-b6a4-3db060e8284c_4030x3024.jpeg',
    },
]

    //! arreglar el movimiento raro que hace el header
    //! Arreglar esto asi es horrible, este tamaño es por lo que ocupa el BottomNavigation, esto es con lo que dijo el profe
    //! cambiar todo a porcentajes lo que sea vw y vh(este no tanto, igual ni lo uso)

    // tambien todo lo que se comparta entre las dos paginas pasalo a componentes --listo
    // usar contex o local storage, o un service --listo

    // ver donde guardar el pedido, el profe dijo que tiene que estar en el front --listo
    // falta que se guarde el pedido y se muestre cuando pongas ver pedido, te lleva a la pagina (Checkout del pedido) --listo
    // falta poner que en el modal cuando toques agregar al pedido se agregue --listo
    // la app no debe permitir a un usuario agregar dos veces el mismo plato. Puede solamente editar la cantidad. --listo (a mi manera)

    //! que te traiga las cosas de el back y que cuando estes en inicio y toques un local te lleve a ese local
    //! con parrams de router de me devuleva el store id que hizo fernanda
    //! traer las cosas en dos partes, si entra a menu traer los platos, si entra a reseñas traer las reseñas, y armar otro DTO para que me traiga las cosas tipo reseñas, reviws, pedidos, eso se hace apenas carga la pagina
    //! hacer un count de el repo de pedidos y ver cuantos hay con el id de el local
    //! como usas el local storage lo que tiene que hacer cuando pones completar el plato es, peris, va a el back, el back valida si siguen existiendo todos los platos que estan en el pedido y luego que tire un error de el back que ya no esta ese plato (luego que lo saque o te ponga que lo saques o nose algo de eso)

    //! test end to end un test por end point

const StoreDetail = () => {
    const [value, setValue] = React.useState('1')
    const [open, setOpen] = React.useState(false)
    const [selectedDish, setSelectedDish] = React.useState<dishType | null>(null)
    const [modalCounter, setmodalCounter] = React.useState(1)
    const [dishes, setDishes] = React.useState<dishType[]>(dishesMock)
    const navigate = useNavigate()
    
    // React.useEffect(() => {
    //     traerPlatosDelBakc().then(data => setDishes(data)) //algo asi ???
    // }, [])

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
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
        return selectedDish.price * modalCounter
    }

    const { items, addItem, totalItems } = useCart()

    const handleAddToCart = () => {
        addItem({
            id: selectedDish!.id,
            title: selectedDish!.title,
            desc: selectedDish!.desc,
            img: selectedDish!.img,
            tag: selectedDish!.tag,
            quantity: modalCounter,
            unitPrice: selectedDish!.price,
            totalPrice: selectedDish!.price * modalCounter,
        })
        setmodalCounter(1)
        console.log(items)
        setOpen(false)
    }

    const [store, setStore] = React.useState<StoreDetailJSON>()
    const location = useLocation()
    // console.log(location)
    // const id = location.state
    const { id } = location.state as { id: number } // esto se tiene que hacer asi si no rompe porque....

    const getStoreData = async () => {
        const backStoreResponse = await storeService.getStore(id as number)
        setStore(backStoreResponse)
    }

    useOnInit(() => {
        getStoreData()
    })

    return (
        <Box className="store-detail-container">
        {/* ==================== Header ==================== */}
            <HeaderBack title={store?.name as string} backTo='/' />

            {/* ==================== Restaurant Info ==================== */}
            <Box
                component='img'
                src={store?.imageURL as string}
                alt='Restaurant'
                className="restaurant-image"
            />

            <Container className="restaurant-info-container">
                <Typography variant='h5' className="restaurant-title">
                    {store?.name}
                </Typography>
                <Typography variant='body2' className="restaurant-info-stats">
                    {store?.gradePointAvg} ({store?.numberOfReviews}+ reviews) · {store?.numberOfOrders} pedidos
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
                                <Card
                                key={dish.id}
                                onClick={() => handleOpen(dish.id)}
                                variant='outlined'
                                className="dish-card"
                                >
                                    <CardContent className="dish-card-content">
                                        {dish.tag && (
                                            <Typography variant='caption' color='error' className="dish-tag">
                                                {dish.tag}
                                            </Typography>
                                        )} {/* si tiene tag le pone esto, es un if */}
                                        <Typography className="dish-title">{dish.title}</Typography>
                                        <Typography variant='body2' className="dish-description">
                                            {dish.desc}
                                        </Typography>
                                        <Typography className="dish-price">
                                            ${dish.price.toFixed(2)}
                                        </Typography>
                                    </CardContent>
                                    <CardMedia
                                        component='img'
                                        image={dish.img}
                                        alt={dish.title}
                                        className="dish-image"
                                        />
                                </Card>
                            ))}
                        </TabPanel>

                        {/* ==================== Reviews ==================== */}
                        <TabPanel value='2'>
                            <Typography variant='body2' className="restaurant-stats"> {/*//! esto tiene que venir de el back */}
                                Reseñas de clientes...
                            </Typography>
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
                    onClick={() => navigate('/order-chekout', {state: {id: store?.id}})}
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
                        image={selectedDish?.img}
                        alt={selectedDish?.title}
                        className="modal-image"
                        />
                    <Box className="modal-content">
                        {/* ==================== Dish description ==================== */}
                        <Typography id="modal-modal-title" variant="h6" component="h2" className="modal-title">
                            {selectedDish?.title}
                        </Typography>
                        <Typography id="modal-modal-description" variant="body2" className="modal-description">
                            {selectedDish?.desc}
                        </Typography>

                        <Box className="price-info-container">
                            <Typography variant="body2" className="price-label">
                                Precio unitario
                            </Typography>
                            <Typography className="price-value">
                                ${selectedDish?.price.toFixed(2)}
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

            {/* <Box className="see-order-container">
                <Button
                    fullWidth
                    variant='contained'
                    color='error'
                    onClick={() => navigate('/order-chekout')}
                    className="see-order-button"
                    disabled={totalItems() < 1}
                >
                    Ver pedido ({totalItems()})
                </Button>
            </Box> */}

        </Box>
    )
}

export default StoreDetail