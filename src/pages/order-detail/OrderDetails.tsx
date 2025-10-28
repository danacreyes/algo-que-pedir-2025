import { Box, Typography, Tab, Button, Container} from '@mui/material'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import '../../index.css'
import './order-details.css'
import React, { useState } from 'react'
// import PedidoRow from '../components/PedidoRow'
import { Order } from '../../domain/order'
import { orderService } from '../../services/orderService'
import { useOnInit } from '../../customHooks/useOnInit'
import RestaurantCard from '../../components/RestaurantCard'

/*
Imprimir IDs de pedidos
Mandar ID de usuario al sessionStorage
Fijarse otra manera de cargar los pedidos sin useEffect
Pregunta por el warning en el hook

  
*/
sessionStorage.setItem('email', 'sofiamiller@gmail.com')

function OrderDetails () {
  const [orders, setOrders] = useState<Order[]>([])
  const [state, setState] = useState('PENDIENTE')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (newValue: string) => {
    setState(newValue)
  }
  
  const getOrders = async () => {
    setErrorMessage('')
    try {
        const newOrders = await orderService.getFilteredUserOrders(state)
        setOrders(newOrders)
    } catch (error) {
      console.info('Unexpected error' + errorMessage, error)
        // if (!toastLock) {
        //     // toasts.push('Error cargando los pedidos', {type: 'error'})
        //     showError('Error cargando los pedidos', error)
        //     toastLock = true
        //     setTimeout(releaseToast, 5000)
        // }
    }
  }

  const showOrders = () => {
    return orders.map(order => 
      <Container sx={{padding: '0.5em'}}>
        <RestaurantCard 
          key={order.id} 
          src={order.local.storeURL} 
          alt='Imagen de local' 
          name={order.local.name} 
          detail={'Total: $' + order.precioTotal().toFixed(2)}
          detail2 = {order.fechaCreacionString + ' · ' + order.platos.length + ' productos'}
          icon={ <Button size="small" color="error" sx={{padding: 0}}> X </Button>}
        />
      </Container>
      )
  }

  useOnInit(getOrders, state)

  return (
    <>
    <div className='main-container'>
      <section className='section-title-and-tabs'>
        <Typography 
          variant='h5' sx={{margin: '1rem 0'}}>
            Pedidos
        </Typography>
        <Box sx={{ width: '100%', typography: 'body1'}}>
          <TabContext value={state}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              {/* Implicitly takes arguments */}
              <TabList onChange={(_, value) => handleChange(value)} aria-label='Tab-list'>
                <Tab label='Pendientes' value='PENDIENTE'/>
                <Tab label='Completados' value='ENTREGADO'/>
                <Tab label='Cancelados' value='CANCELADO'/>
              </TabList>
            </Box>
            <TabPanel value={state} sx={{padding: 0, marginTop: '0.5em'}}>
              {orders.length != 0 ?
              showOrders() :
              <Typography 
                variant='subtitle1' sx={{margin: '2rem 0', color: 'text.secondary'}}>
                  No hay pedidos para mostrar
              </Typography>
              }
            </TabPanel>
          </TabContext>
        </Box>
      </section>
    </div>
    </>
  )
}

export default OrderDetails