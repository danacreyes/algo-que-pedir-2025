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
import { useNavigate } from 'react-router-dom'
import HeaderBack from '../components/HeaderBack/HeaderBack'

type dishType = {
    id: number,
    title: string,
    desc: string,
    price: number,
    img: string,
    tag?: string,
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
    }
]

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    bgcolor: 'background.paper',
    border: '1px solid ligthgrey',
    boxShadow: 24,
    p: 2,
    borderRadius: '20px',
    // overflow: 'hidden',
}

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

    //! arreglar el movimiento raro que hace el header
    //! ver donde guardar el pedido, el profe dijo que tiene que estar en el front
    //! test end to end

    //! pasar todo a un css
    //! Arreglar esto asi es horrible, este tamaño es por lo que ocupa el BottomNavigation
    //! tambien todo lo que se comparta entre las dos paginas pasalo a componentes

    //! que te traiga las cosas de el back y que cuando estes en inicio y toques un local te lleve a ese local
    //! falta que se guarde el pedido y se muestre cuando pongas ver pedido, te lleva a la pagina (Checkout del pedido)
    //! falta poner que en el modal cuando toques agregar al pedido se agregue
    //! la app no debe permitir a un usuario agregar dos veces el mismo plato. Puede solamente editar la cantidad.

    //! arreglar el error que tira de la key, importante a la hora de borrar las cosas, porque si no se rompe todo

    return (
        <Box sx={{ pb: 10, width: '100vw' }}>
            {/* ==================== Header ==================== */}
            <HeaderBack title='Tu pedido' backTo='/'/>

            {/* ==================== Restaurant Info ==================== */}
            <Box
            component='img'
            src='https://images.unsplash.com/photo-1534650075489-3baecec1e8b1?ixlib=rb-4.1.0&ixid=
            M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170'
            alt='Restaurant'
            sx={{ width: '100%' }}
            />
            <Container sx={{ mt: 2 }}>  {/* margin top */}
                <Typography variant='h5' fontWeight='bold'>Restaurante Italiano</Typography>  {/*//! esto tiene que venir de el back */}
                <Typography color='text.secondary' variant='body2'>4.5 (1200+ reviews) · 546 pedidos</Typography>

            {/* ==================== Tabs ==================== */}
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 2}}>
                        <TabList onChange={handleChange} aria-label='menu tabs'
                            sx={{
                                '& .MuiTab-root': { // esto selecciona a esta clase este estilo, dentro de el componente
                                    textTransform: 'none', // no te pone mayusculas automaticas
                                    fontWeight: 'bold',
                                    fontSize: '0.9em',
                                    minWidth: 0,
                                    color: '#b36672ff', // color de tabs todas las tabs
                                        '&:focus': {
                                            outline: 'none'
                                        },
                                },
                                '& .Mui-selected': {
                                    color: '#000',
                                },
                            }}
                        >
                            <Tab label='Menú' value='1' />
                            <Tab label='Reseñas' value='2' />
                        </TabList>
                    </Box>

                    {/* ==================== Items ==================== */}
                    <TabPanel value='1' sx={{ px: 0 }}>
                        {dishes.map((dish) => (
                        <Card
                            key={dish.id}
                            onClick={() => handleOpen(dish.id)}
                            variant='outlined'
                            sx={{
                                display: 'flex',
                                // mb: 2,
                                borderRadius: '6px',
                                overflow: 'hidden',
                            }}
                        >
                            <CardContent sx={{ flex: 1 }}> 
                            {dish.tag && (<Typography variant='caption' color='error' fontWeight='bold'>{dish.tag}</Typography>)}  {/* si tiene tag le pone esto, es un if */}
                            <Typography fontWeight='bold'>{dish.title}</Typography>
                            <Typography color='text.secondary' variant='body2'>{dish.desc}</Typography>
                            <Typography
                                fontWeight='bold'
                                sx={{
                                    mt: 1, // margin-top
                                    bgcolor: '#f8f4f4',
                                    display: 'inline-block',
                                    px: 1.9, // padding horizontal
                                    py: 0.4,
                                    borderRadius: '6px',
                                    fontSize: '0.9rem',
                                    color: '#2e2e2e',
                                }}
                            >
                                ${dish.price}
                            </Typography>
                            </CardContent>
                            <CardMedia
                            component='img'
                            image={dish.img}
                            alt={dish.title}
                            sx={{ width: '35%' }}
                            />
                        </Card>
                        ))}
                    </TabPanel>
                    {/* ==================== Reviews ==================== */}
                    <TabPanel value='2'>
                        <Typography variant='body2' color='text.secondary'>Reseñas de clientes...</Typography> {/*//! esto tiene que venir de el back */}
                    </TabPanel>
                </TabContext>
            </Container>

            <Divider sx={{ mt: 4, borderColor: 'transparent' }} />

            {/* ==================== See Order ==================== */}
            <Box
                sx={{
                    position: 'fixed',
                    bottom: 56,  //! esto asi es horrible, este tamaño es por lo que ocupa el BottomNavigation
                    left: 0,
                    width: '100%',
                    p: 1,
                    bgcolor: 'background.paper',
                    boxShadow: 3,
                }}
            >
                <Button
                fullWidth
                variant='contained'
                color='error'
                onClick={() => navigate('/order-chekout')}
                sx={{ borderRadius: 2, py: 1.2, textTransform: 'none', fontWeight: 'bold' }}
                >
                Ver pedido (2)
                </Button>
            </Box>

            {/* ==================== Modal ==================== */}
            <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <CardMedia
                    component='img'
                    image={selectedDish?.img}
                    alt={selectedDish?.title}
                    sx={{ width: '100%', height: '250px' , borderRadius: '8px' }}
                    />
                    <Box sx={{ pt: 3 }}>
                        {/* ==================== Dish description ==================== */}
                        <Typography id="modal-modal-title" variant="h6" component="h2" fontWeight="bold">
                            {selectedDish?.title}
                        </Typography>
                        <Typography id="modal-modal-description" variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
                            {selectedDish?.desc}
                        </Typography>

                        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3, mb: 2}}>
                            <Typography variant="body2" color="text.secondary">
                                Precio unitario
                            </Typography>
                            <Typography fontWeight="bold">
                                ${selectedDish?.price}
                            </Typography>
                        </Box>

                        {/* ==================== Quantity counter ==================== */}
                        <Box sx={{
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            mb: 2,
                            bgcolor: 'lightgray',
                            borderRadius: '8px', 
                        }}>
                            <Button
                            variant="contained"
                            color="error"
                            onClick={() => restModalcounter()}
                            disabled={modalCounter <= 1}
                            sx={{ 
                                width: '20%',
                                borderRadius: '8px', 
                                fontWeight: 'bold',
                                fontSize: '1.2rem'
                            }}
                            >-</Button>
                            <Typography sx={{ fontWeight: 'bold', fontSize: '1.1rem', textAlign: 'center' }}>
                                {modalCounter}
                            </Typography>
                            <Button
                            variant="contained"
                            color="error"
                            onClick={() => countModalcounter()}
                            sx={{ 
                                width: '20%',
                                borderRadius: '8px', 
                                fontWeight: 'bold',
                                fontSize: '1.2rem'
                            }}
                            >+</Button>
                        </Box>

                        <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            mb: 2
                        }}>
                            <Typography variant="body2" color="text.secondary">
                                Precio total
                            </Typography>
                            <Typography fontWeight="bold">
                                ${calculateTotalPrice()}
                            </Typography>
                        </Box>

                        {/* ==================== Action buttons ==================== */}
                        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                            <Button 
                                fullWidth
                                variant="outlined"
                                color="error"
                                onClick={handleClose}
                                sx={{ 
                                    borderRadius: '8px', 
                                    py: 1.2,
                                    textTransform: 'none',
                                    fontWeight: 'bold',
                                    borderWidth: 2
                                }}
                            >Cancelar</Button>
                            <Button 
                                fullWidth
                                variant="contained"
                                color="error"
                                sx={{ 
                                    borderRadius: '8px', 
                                    py: 1.2,
                                    textTransform: 'none',
                                    fontWeight: 'bold'
                                }}
                            >Agregar al Pedido</Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
            </div>

        </Box>
    )
}

export default StoreDetail