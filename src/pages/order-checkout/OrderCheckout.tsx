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
import CloseIcon from '@mui/icons-material/Close'
import HeaderBack from '../../components/HeaderBack/HeaderBack'
import './order-checkout.css'
import { useCart } from '../../contexts/CartContext'
import { StoreDetailJSON } from '../../domain/store'
import { storeService } from '../../services/LocalesService'
import { useLocation } from 'react-router-dom'
import { useOnInit } from '../../customHooks/useOnInit'

type OrderItemType = {
    id: number
    name: string
    quantity: number
    unitPrice: number
    total: number
}

const ordersMock: OrderItemType[] = [
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
    // const [items, setItems] = React.useState<OrderItemType[]>(ordersMock)
    const [paymentMethod, setPaymentMethod] = React.useState('Efectivo')

    // const removeItem = (id: number) => {
    //     setItems(items.filter(item => item.id !== id))
    // }

    const { items, removeItem, clearCart, getTotalPrice } = useCart()

    // estas variables sueltas se recalculan en cada render
    const subtotal = getTotalPrice()
    const serviceFee = 2.62 //? esto no se que onda
    const deliveryFee = 0.00
    const total = subtotal + serviceFee + deliveryFee

    // const handleClearCart = () => {
    //     setItems([])
    // }

    const handleClearCart = () => {
        clearCart()
    }

    const handleConfirmOrder = () => {
        console.log('Pedido confirmado')
    }

        const [store, setStore] = React.useState<StoreDetailJSON>()
        const location = useLocation()
        // console.log(location)
        // const id = location.state
        const { id } = location.state as { id: number } // esto se tiene que hacer asi si no rompe porque....

        const { isNew } = location.state as { isNew: boolean }
    
        const getStoreData = async () => {
            const backStoreResponse = await storeService.getStore(id as number)
            setStore(backStoreResponse)
        }
    
        useOnInit(() => {
            getStoreData()
        })

    //! falta terminar los endpoiunts aca
    //! Arreglar esto asi es horrible, este tamaño es por lo que ocupa el BottomNavigation

    return (
        <Box className="order-checkout-container">
            <HeaderBack title={'Tu pedido'} backTo={{ path: `/store-detail/${id}` }} />

            <Container className="order-content-container">
                {/* ==================== Restaurant Info ==================== */}
                <Box className="restaurant-section">
                    <Typography variant='h6' className="section-title-order-checkout">
                        Restaurante
                    </Typography>
                    <Box className="restaurant-info-box">
                        <Box
                            component='img'
                            src='https://i0.wp.com/foodandpleasure.com/wp-content/uploads/2024/07/restaurantegriegobosques2.jpg?fit=1500%2C1000&ssl=1'
                            alt='El Sabor Auténtico'
                            className="restaurant-logo"
                        />
                        <Box>
                            <Typography className="restaurant-name">
                                El Sabor Auténtico
                            </Typography>
                            <Typography variant='body2' className="restaurant-details">
                                4.8 · 5 km · Envío gratis
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Divider className="section-divider" />

                {/* ==================== Items ==================== */}
                <Box className="items-section">
                    <Typography variant='h6' className="section-title-order-checkout">
                        Artículos
                    </Typography>
                    {items.map((item) => (
                        <Box key={item.id} className="item-row">
                            <Box className="item-info">
                                <Box className="item-name-container">
                                    <Typography className="item-name">
                                        {item.title}
                                    </Typography>
                                </Box>
                                <Typography variant='body2' className="item-quantity">
                                    Cantidad: {item.quantity}
                                </Typography>
                                <Typography variant='body2' className="item-unit-price">
                                    Precio unitario: ${item.unitPrice.toFixed(2)}
                                </Typography>
                            </Box>

                            <Box className="item-price-actions">
                                <Typography className="item-total">
                                    ${item.totalPrice.toFixed(2)}
                                </Typography>
                                <IconButton
                                    onClick={() => removeItem(item.id)}
                                    size='small'
                                    className="remove-item-button"
                                >
                                    <CloseIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    ))}
                </Box>

                <Divider className="section-divider" />

                {/* ==================== Summary ==================== */}
                <Box className="summary-section">
                    <Typography variant='h6' className="section-title-order-checkout">
                        Resumen
                    </Typography>
                    <Box className="summary-row">
                        <Typography variant='body2' className="summary-label">
                            Subtotal
                        </Typography>
                        <Typography variant='body2' className="summary-value">
                            ${subtotal.toFixed(2)}
                        </Typography>
                    </Box>
                    <Box className="summary-row">
                        <Typography variant='body2' className="summary-label">
                            Recargo por tipo de pago
                        </Typography>
                        <Typography variant='body2' className="summary-value">
                            ${serviceFee.toFixed(2)}
                        </Typography>
                    </Box>
                    <Box className="summary-row">
                        <Typography variant='body2' className="summary-label">
                            Tarifa de entrega
                        </Typography>
                        <Typography variant='body2' className="summary-value">
                            ${deliveryFee.toFixed(2)}
                        </Typography>
                    </Box>
                </Box>

                <Divider className="section-divider" />

                {/* ==================== Total ==================== */}
                <Box className="total-section">
                    <Typography variant='h6' className="total-label">
                        Total
                    </Typography>
                    <Typography variant='h6' className="total-value">
                        ${total.toFixed(2)}
                    </Typography>
                </Box>

                <Divider className="section-divider" />

                {/* ==================== Payment Method ==================== */}
                <Box className="payment-section">
                    <Typography variant='body2' className="payment-label">
                        Forma de pago
                    </Typography>
                    <FormControl fullWidth>
                        <Select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="payment-select"
                        >
                            <MenuItem value='Efectivo'>Efectivo</MenuItem>
                            <MenuItem value='Tarjeta de crédito'>Tarjeta de crédito</MenuItem>
                            <MenuItem value='Tarjeta de débito'>Tarjeta de débito</MenuItem>
                            <MenuItem value='Transferencia'>Transferencia</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Container>

            {/* ==================== Fixed Bottom Buttons ==================== */}
            {isNew && <Box className="bottom-buttons-container">
                <Button
                    fullWidth
                    variant='contained'
                    color='error'
                    onClick={handleConfirmOrder}
                    disabled={items.length === 0}
                    className="confirm-order-button"
                >
                    Reservar pedido
                </Button>
                <Button
                    fullWidth
                    variant='outlined'
                    color='error'
                    onClick={handleClearCart}
                    disabled={items.length === 0}
                    className="clear-cart-button"
                >
                    Limpiar carrito de compras
                </Button>
            </Box>} 
        </Box>
    )
}

export default OrderCheckout