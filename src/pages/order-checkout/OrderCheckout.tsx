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
// import { StoreDetailJSON } from '../../domain/store'
import { storeService } from '../../services/LocalesService'
import { useLocation } from 'react-router-dom'
import { useOnInit } from '../../customHooks/useOnInit'
import { orderService } from '../../services/orderService'
import { Order, OrderForBack } from '../../domain/order'
import { StoreDetailJSON } from '../../domain/storeDom'
import { Estado, Pago } from '../../domain/order'
import { useToast } from '../../components/Toast/useToast'
import { Toast } from '../../components/Toast/ToastContainer'
import { useNavigate } from 'react-router-dom'


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
    const [paymentMethod, setPaymentMethod] = React.useState<Pago>(Pago.EFECTIVO)
    const { toast, showToast } = useToast()
    const navigate = useNavigate()

    const paymentLabels: Record<Pago, string> = {
    [Pago.EFECTIVO]: 'Efectivo',
    [Pago.TRANSFERENCIA_BANCARIA]: 'Transferencia Bancaria',
    [Pago.QR]: 'Código QR'
}
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

    const handleConfirmOrder = async () => {
        try {
            // console.log(items)
            const itemsIDs = items.map( it => it.id )
            // console.log(itemsIDs)
            
            const orderData: OrderForBack = {
                // lo mejor es pasar las ids de 
                // usuario
                // local
                // platos
                // medio de pago
                // y que el back se encargue de buscarlos
                userID: Number(localStorage.getItem('id')),
                localID: id,
                platosIDs: itemsIDs,
                medioDePago: paymentMethod, 
                estado: Estado.PREPARADO, 
            }

            console.log('Enviando pedido:', orderData)
            await orderService.createOrder(orderData)
            showToast('Pedido confirmado', 'success')
            
            setTimeout(() => {
                clearCart()
                navigate('/home') // O a donde quieras redirigir
            }, 1500)
            
        } catch (error) {
            console.error('Error al crear pedido:', error)
            showToast('Error al crear el pedido. Por favor intenta nuevamente.', 'error')
        }

    }

    //! medios de pagos estan hardcodeados
    //! guardar en el use context el nombre y las otras cosas para que no se rompa cuando cambias de local

    //! nico fijate que esto esta mal tenes que ponerlo en lo mismo o usar operador ternario en todos los lugares en donde uses alguna propiedad 
    //! de store, mira la linea 133 por ejemplo, ademas pones platos de un local salis, y vas a otro local y pones ver pedido te pone el otro restaurante y no el que pusiste los platos
    const [store, setStore] = React.useState<StoreDetailJSON>()
    const [order, setOrder] = React.useState<Order>()

    const location = useLocation()
    // console.log(location)
    // const id = location.state
    const { id } = location.state as { id: number } // esto se tiene que hacer asi si no rompe porque....

    const { isNew } = location.state as { isNew: boolean }
    const { orderId } = location.state as { orderId: number }

    const getStoreData = async () => {
        const backStoreResponse = await storeService.getStore(id as number)
        setStore(backStoreResponse)
    }

    const getOrderData = async () => {
        const backStoreResponse = await orderService.getOrderByID(orderId)
        setOrder(backStoreResponse)   
    }

    useOnInit(() => {
        isNew ? getStoreData() : getOrderData()
    })

    //! falta terminar los endpoiunts aca
    //! Arreglar esto asi es horrible, este tamaño es por lo que ocupa el BottomNavigation

    return (
        <Box className="order-checkout-container">
            <HeaderBack title={'Tu pedido'} backTo={isNew ? { path: `/store-detail/${id}` } : { path: '/order-details/'}} />

            <Container className="order-content-container">
                {/* ==================== Restaurant Info ==================== */}
                {isNew? (
                <Box className="restaurant-section">
                    <Typography variant='h6' className="section-title-order-checkout">
                        Restaurante
                    </Typography>
                    <Box className="restaurant-info-box">
                        <Box
                            component='img'
                            src={store?.imageURL}
                            alt='El Sabor Auténtico'
                            className="restaurant-logo"
                        />
                        <Box>
                            <Typography className="restaurant-name">
                                {store?.name}
                            </Typography>
                            <Typography variant='body2' className="restaurant-details">
                                {store?.gradePointAvg} · 5 km · Envío gratis (hardcoded!)
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                ) : (
                <Box>
                    <Typography variant='h6' className="section-title-order-checkout">
                        Restaurante
                    </Typography>
                    <Box className="restaurant-info-box">
                        <Box
                            component='img'
                            src={order?.local.storeURL}
                            alt='El Sabor Auténtico'
                            className="restaurant-logo"
                        />
                        <Box>
                            <Typography className="restaurant-name">
                                {order?.local.name}
                            </Typography>
                            <Typography variant='body2' className="restaurant-details">
                                {} · 5 km · Envío gratis (hardcoded!)
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                    )}

                <Divider className="section-divider" />

                {/* ==================== Items ==================== */}
                <Box className="items-section">
                    <Typography variant='h6' className="section-title-order-checkout">
                        Artículos
                    </Typography>
                    {isNew ? (items.map((item) => (
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
                    ))) : (order?.platos.map((item) => (
                        <Box key={item.id} className="item-row">
                            <Box className="item-info">
                                <Box className="item-name-container">
                                    <Typography className="item-name">
                                        {item.nombre}
                                    </Typography>
                                </Box>
                                <Typography variant='body2' className="item-quantity">
                                    Cantidad: {order.platos.filter((plato) => plato.nombre == item.nombre).length}
                                </Typography>
                                <Typography variant='body2' className="item-unit-price">
                                    Precio unitario: ${}
                                </Typography>
                            </Box>

                            <Box className="item-price-actions">
                                <Typography className="item-total">
                                    ${}
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
                    )))}
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
                    {store?.mediosDePago?.length && (
                        <FormControl fullWidth>
                            <Select
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value as Pago)}
                                className="payment-select"
                                >
                                {store?.mediosDePago?.map((pago) => (
                                    <MenuItem key={pago} value={pago}>
                                        {paymentLabels[pago]}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        )}
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

            {/* ==================== Toast ==================== */}
            <div id="toast-container">
                <Toast toast={toast} />
            </div>

        </Box>
    )
}

export default OrderCheckout