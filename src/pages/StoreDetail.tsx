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
} from '@mui/material'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

const dishesMock = [
    {
        title: 'Pizza Margherita',
        desc: 'Classic pizza with tomato sauce, mozzarella, and basil',
        price: '$12.99',
        img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.1.0&ixid'
        + '=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1169',
        tag: 'Popular',
    },
    {
        title: 'Pizza Pepperoni',
        desc: 'Pizza with tomato sauce, mozzarella, and pepperoni',
        price: '$13.99',
        img: 'https://images.unsplash.com/photo-1605478371310-a9f1e96b4ff4?ixlib=rb-4.1.0&ixid'
        + '=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170',
        tag: 'Popular',
    },
    {
        title: 'Spaghetti Carbonara',
        desc: 'Spaghetti with creamy sauce, bacon, and parmesan cheese',
        price: '$14.99',
        img: 'https://assets.tmecosys.com/image/upload/t_web_rdp_recipe_584x480_1_5x/img/'
        + 'recipe/ras/Assets/0346a29a89ef229b1a0ff9697184f944/Derivates/cb5051204f4a4525c8b013c16418ae2904e737b7.jpg',
    },
    {
        title: 'Fettuccine Alfredo',
        desc: 'Fettuccine with creamy Alfredo sauce',
        price: '$13.99',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaArXmklsNFvNeS_d9EOwWr0IVKhcyURdvFA&s',
    }
]

const StoreDetail = () => {

    const [value, setValue] = React.useState('1')

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }

    return (
        <Box sx={{ pb: 9 }}>

        //! aca arriba tengo que agregar el boton para volver a home, donde estan todos los locales
        //! me falta poner que cuando toques un plato te salta el popup que muestre el detalle y te deje agregar la cantidad

            <Box
            component='img'
            src='https://images.unsplash.com/photo-1534650075489-3baecec1e8b1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170'
            alt='Restaurant'
            sx={{ width: '100%' }}
            />

            <Container sx={{ mt: 2 }}>  {/* margin top */}
                <Typography variant='h6' fontWeight='bold'>Restaurante Italiano</Typography>
                <Typography color='text.secondary' variant='body2'>4.5 (1200+ reviews) · 546 pedidos</Typography>

                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 2 }}>
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

                    <TabPanel value='1' sx={{ px: 0 }}>
                        {dishesMock.map((dish, i) => (
                        <Card
                            key={i}
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
                                {dish.price}
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
                    <TabPanel value='2'>
                        <Typography variant='body2' color='text.secondary'>Reseñas de clientes...</Typography>
                    </TabPanel>
                </TabContext>
            </Container>

            <Divider sx={{ mt: 4, borderColor: 'transparent' }} />

            <Box
                sx={{
                    position: 'fixed',
                    bottom: 56,
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
                sx={{ borderRadius: 2, py: 1.2, textTransform: 'none', fontWeight: 'bold' }}
                >
                Ver pedido (2)
                </Button>
            </Box>

        </Box>
    )
}

export default StoreDetail