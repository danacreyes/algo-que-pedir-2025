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
import { PaymentType, Store } from '../../domain/storeDom'
import { Estado, Pago } from '../../domain/order'
import { useToast } from '../../components/Toast/useToast'
import { Toast } from '../../components/Toast/ToastContainer'
import { useNavigate } from 'react-router-dom'

const OrderCheckout = () => {
    // const [items, setItems] = React.useState<OrderItemType[]>(ordersMock)
    const [paymentMethod, setPaymentMethod] = React.useState<Pago>(Pago.EFECTIVO)
    const { toast, showToast } = useToast()
    const navigate = useNavigate()

    const paymentLabels: Record<PaymentType, string> = {
    [Pago.EFECTIVO]: 'Efectivo',
    [Pago.TRANSFERENCIA_BANCARIA]: 'Transferencia Bancaria',
    [Pago.QR]: 'Código QR'
}
    // const removeItem = (id: number) => {
    //     setItems(items.filter(item => item.id !== id))
    // }

    const { items, removeItem, clearCart, getTotalPrice, currentLocalId } = useCart()

    // estas variables sueltas se recalculan en cada render
    const subtotal = getTotalPrice()
    const serviceFee = 2.62 //? esto no se que onda
    const deliveryFee = 0.00
    const storeCharges = 0.00
    const total = subtotal + serviceFee + deliveryFee + storeCharges

    // const handleClearCart = () => {
    //     setItems([])
    // }

    const handleClearCart = () => {
        clearCart()
    }

    const handleConfirmOrder = async () => {
        try {
            const itemsIDs = items.map( it => it.id )
            
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
                estado: Estado.PENDIENTE, 
            }

            await orderService.createOrder(orderData)
            showToast('Pedido confirmado', 'success')
            
            setTimeout(() => {
                clearCart()
                navigate('/home')
            }, 1500)
            
        } catch (error) {
            console.error('Error al crear pedido:', error)
            showToast('Error al crear el pedido. Por favor intenta nuevamente.', 'error')
        }

    }

    const [store, setStore] = React.useState<Store>()
    const [order, setOrder] = React.useState<Order>()

    const location = useLocation()

    const { id } = location.state as { id: number }
    const { isNew } = location.state as { isNew: boolean }
    const { orderId } = location.state as { orderId: number }
    

    const effectiveLocalId = isNew ? (currentLocalId || id) : null
    // console.log(effectiveLocalId)

    const getStoreData = async () => {
        const backStoreResponse = await storeService.getStore(effectiveLocalId)
        setStore(backStoreResponse)
    }

    const getOrderandStoreData = async () => {
        const backOrderResponse = await orderService.getOrderByID(orderId)
        setOrder(backOrderResponse)   
        const backStoreResponse = await storeService.getStore(id)
        setStore(backStoreResponse)
    }

    useOnInit(() => {
        // console.info(id)
        // console.info(isNew)
        // console.info(orderId)
        isNew ? getStoreData() : getOrderandStoreData()
    })

    //! falta terminar los endpoiunts aca

    return (
        <Box className="order-checkout-container">
            {/* Asi anda tambien */}
            {/* <HeaderBack title={'Tu pedido'} backTo={isNew ? { path: `/store-detail/${id}` } : { path: '/order-details/'}} />  */}
            <HeaderBack title={'Tu pedido'} backTo={isNew ? { path: `/store-detail/${effectiveLocalId}` } : { path: '/order-details/'}} /> //! arreglar lo de ir para atras

            <Container className="order-content-container">
                {/* ==================== Restaurant Info ==================== */}
                <Box className="restaurant-section">
                    <Typography variant='h6' className="section-title-order-checkout">
                        Restaurante
                    </Typography>
                    <Box className="restaurant-info-box">
                        <Box
                            component='img'
                            src={store?.storeURL}
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
                    ))) : (order?.platosSinRepetir().map((plato) => (
                        <Box key={plato.id} className="item-row">
                            <Box className="item-info">
                                <Box className="item-name-container">
                                    <Typography className="item-name">
                                        {plato.nombre}
                                    </Typography>
                                </Box>
                                <Typography variant='body2' className="item-quantity">
                                    Cantidad: {order.aparicionesDe(plato.nombre)}
                                </Typography>
                                <Typography variant='body2' className="item-unit-price">
                                    Precio unitario: ${plato.precio.toFixed(2)}
                                </Typography>
                            </Box>

                            <Box className="item-price-actions">
                                <Typography className="item-total">
                                    ${(plato.precio * order.aparicionesDe(plato.nombre)).toFixed(2)}
                                </Typography>
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
                            ${isNew ? subtotal.toFixed(2) : order?.precioSubtotal}
                        </Typography>
                    </Box>
                    <Box className="summary-row">
                        <Typography variant='body2' className="summary-label">
                            Recargo por tipo de pago
                        </Typography>
                        <Typography variant='body2' className="summary-value">
                            ${isNew ? serviceFee : order?.aCobrarPorPedido().toFixed(2)}
                        </Typography>
                    </Box>
                    <Box className="summary-row">
                        <Typography variant='body2' className="summary-label">
                            Tarifa de entrega
                        </Typography>
                        <Typography variant='body2' className="summary-value">
                            ${store?.deliveryFee}
                        </Typography>
                    </Box>
                    <Box className="summary-row">
                        <Typography variant='body2' className="summary-label">
                            Costos de Local
                        </Typography>
                        <Typography variant='body2' className="summary-value">
                            ${isNew ? storeCharges : order?.deliveryComission.toFixed(2)}
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
                        ${isNew ? total.toFixed(2) : order?.precioTotal().toFixed(2)}
                    </Typography>
                </Box>

                <Divider className="section-divider" />

                {/* ==================== Payment Method ==================== */}
                <Box className="payment-section">
                    <Typography variant='body2' className="payment-label">
                        Forma de pago
                    </Typography>
                    {store?.paymentTypes?.length && (
                        <FormControl fullWidth disabled={!isNew}>
                            <Select
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value as Pago)}
                                className="payment-select"
                                >
                                {store?.paymentTypes?.map((pago) => (
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