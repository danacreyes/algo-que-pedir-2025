import * as React from 'react'
import {
    Box,
    Container,
    Typography,
    Button,
    IconButton,
    Divider,
    MenuItem,
    Select,
    FormControl,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate } from 'react-router-dom'
import HeaderBack from '../components/HeaderBack/HeaderBack'

type OrderItemType = {
    id: number
    name: string
    quantity: number
    unitPrice: number
    total: number
}

const ordersMock: OrderItemType[] =[
    {
        id: 1,
        name: 'Tacos al Pastor',
        quantity: 1,
        unitPrice: 12.99,
        total: 12.99
    },
    {
        id: 2,
        name: 'Quesadillas de Pollo',
        quantity: 2,
        unitPrice: 7.99,
        total: 15.98
    },
    {
        id: 3,
        name: 'Guacamole con Totopos',
        quantity: 1,
        unitPrice: 8.50,
        total: 8.50
    }
]

const OrderCheckout = () => {
    const [items, setItems] = React.useState<OrderItemType[]>(ordersMock)
    const [paymentMethod, setPaymentMethod] = React.useState('Efectivo')
    const navigate = useNavigate()

    const removeItem = (id: number) => {
        setItems(items.filter(item => item.id !== id))
    }

    // estas variables sueltas se recaulculan en cada render
    const subtotal = items.reduce((sum, item) => sum + item.total, 0)
    const serviceFee = 2.62 //? esto no se que onda
    const deliveryFee = 0.00
    const total = subtotal + serviceFee + deliveryFee

    const handleClearCart = () => {
        setItems([])
    }

    const handleConfirmOrder = () => {
        console.log('Pedido confirmado')
    }

    //! Arreglar esto asi es horrible, este tamaño es por lo que ocupa el BottomNavigation

    return (
        <Box sx={{ pb: 28, width: '100vw' }}>
            {/* ==================== Header ==================== */}
            <HeaderBack title='Tu pedido' backTo='/store-detail'/>

            <Container sx={{ mt: 2 }}>
                {/* ==================== Restaurant Info ==================== */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant='h6' fontWeight='bold' sx={{ mb: 1.5 }}>
                        Restaurante
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2  }}>
                        <Box
                            component='img'
                            src='https://i0.wp.com/foodandpleasure.com/wp-content/uploads/2024/07/restaurantegriegobosques2.jpg?fit=1500%2C1000&ssl=1'
                            alt='El Sabor Auténtico'
                            sx={{ 
                                width: '3.5em', 
                                height: '3.5em', 
                                borderRadius: '8px',
                                objectFit: 'cover',
                                border: '1px solid gray'
                            }}
                        />
                        <Box>
                            <Typography fontWeight='bold'>El Sabor Auténtico</Typography>
                            <Typography variant='body2' color='text.secondary'>
                                4.8 · 5 km · Envío gratis
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* ==================== Items ==================== */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant='h6' fontWeight='bold' sx={{ mb: 2 }}>
                        Artículos
                    </Typography>
                    {items.map((item) => (
                        <Box 
                            key={item.id} 
                            sx={{ 
                                display: 'flex', 
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                mb: 2.5
                            }}
                        >
                            <Box sx={{ flex: 1 }}>
                                <Box sx={{ display: 'flex', mb: 0.5 }}>
                                    <Typography fontWeight='bold'>{item.name}</Typography>
                                </Box>
                                <Typography variant='body2' color='text.secondary'>
                                    Cantidad: {item.quantity}
                                </Typography>
                                <Typography variant='body2' color='text.secondary'>
                                    Precio unitario: ${item.unitPrice.toFixed(2)}
                                </Typography>
                            </Box>

                            <Box sx={{display: 'flex', flexDirection: 'column', width: '3em', alignItems:'center'}}>
                                <Typography fontWeight='bold' sx={{alignSelf:'end'}}>${item.total.toFixed(2)}</Typography>
                                <IconButton 
                                    onClick={() => removeItem(item.id)}
                                    size='small'
                                    sx={{ 
                                        mt: '0.8em',
                                        color: 'text.secondary',
                                        '&:hover': {
                                            bgcolor: '#f5f5f5',
                                        }
                                    }}
                                    >
                                    <CloseIcon/>
                                </IconButton>
                            </Box>
                        </Box>
                    ))}
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* ==================== Summary ==================== */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant='h6' fontWeight='bold' sx={{ mb: 2 }}>
                        Resumen
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant='body2' color='text.secondary'>Subtotal</Typography>
                        <Typography variant='body2' color='text.secondary'>${subtotal.toFixed(2)}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant='body2' color='text.secondary'>Recargo por tipo de pago</Typography>
                        <Typography variant='body2' color='text.secondary'>${serviceFee.toFixed(2)}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant='body2' color='text.secondary'>Tarifa de entrega</Typography>
                        <Typography variant='body2' color='text.secondary'>${deliveryFee.toFixed(2)}</Typography>
                    </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* ==================== Total ==================== */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant='h6' fontWeight='bold'>Total</Typography>
                    <Typography variant='h6' fontWeight='bold'>${total.toFixed(2)}</Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* ==================== Payment Method ==================== */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant='body2' fontWeight='bold' sx={{ mb: 1.5 }}>
                        Forma de pago
                    </Typography>
                    <FormControl fullWidth>
                        <Select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            sx={{
                                bgcolor: 'white',
                                borderRadius: '8px',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#e0e0e0',
                                },
                                '&:focus': {
                                    outline: 'none'
                                },
                            }}
                        >
                            <MenuItem value='Efectivo'>Efectivo</MenuItem>
                            <MenuItem value='Tarjeta de crédito'>Tarjeta de crédito</MenuItem>
                            <MenuItem value='Tarjeta de débito'>Tarjeta de débito</MenuItem>
                            <MenuItem value='Transferencia'>Transferencia</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Container>

            {/* Fixed Bottom Buttons */}
            <Box
                sx={{
                    position: 'fixed',
                    bottom: 56,
                    left: 0,
                    width: '100%',
                    p: 2,
                    bgcolor: 'background.paper',
                    boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
                }}
            >
                <Button
                    fullWidth
                    variant='contained'
                    color='error'
                    onClick={handleConfirmOrder}
                    disabled={items.length === 0}
                    sx={{ 
                        borderRadius: '8px', 
                        py: 1.5,
                        textTransform: 'none',
                        fontWeight: 'bold',
                        mb: 1.5
                    }}
                >
                    Confirmar pedido
                </Button>
                <Button
                    fullWidth
                    variant='outlined'
                    color='error'
                    onClick={handleClearCart}
                    disabled={items.length === 0}
                    sx={{ 
                        borderRadius: '8px', 
                        py: 1.5,
                        textTransform: 'none',
                        fontWeight: 'bold',
                        borderWidth: 2,
                        '&:hover': {
                            borderWidth: 2,
                        }
                    }}
                >
                    Limpiar carrito de compras
                </Button>
            </Box>
        </Box>
    )
}

export default OrderCheckout