import { Box, Typography, Tab, Container} from '@mui/material'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import '../../index.css'
import './order-details.css'
import { useState } from 'react'
import { Order } from '../../domain/order'
import { orderService } from '../../services/orderService'
import { useOnInit } from '../../customHooks/useOnInit'
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard'
import { useNavigate } from 'react-router-dom'

function OrderDetails () {
  const [orders, setOrders] = useState<Order[]>([])
  const [state, setState] = useState('PENDIENTE')
  const navigate = useNavigate()

  const handleStateChange = (newState: string) => {
    setState(newState)
    getOrders(newState) 
  }

  const getOrders = async (newState: string) => {
    try {
        const newOrders = await orderService.getFilteredUserOrders(newState)
        setOrders(newOrders)
    } catch (error) {
      console.info('Unexpected error', error)
    }
  }

  const showOrders = () => {
    return orders.map(order => 
      <Container sx={{padding: '0.5em'}} key={order.id}>
        <RestaurantCard 
          src={order.local.storeURL} 
          alt='Imagen de local' 
          name={order.local.name} 
          detail={'Total: $' + order.precioTotal().toFixed(2)}
          detail2 = {order.fechaCreacionString + ' · ' + order.platos.length + ' productos'}
          icon='X'
          cardOnClickFunction={() => navigate('/order-checkout', {state: {id: order.local?.id, isNew: false, orderId: order.id}})}
        />
      </Container>
      )
  }

  useOnInit(() => handleStateChange(state))

  return (
    <>
    <div className='main-container' style={{padding: '0.5em'}}>
      <section className='section-title-and-tabs'>
        <Typography 
          variant='h5' sx={{margin: '1rem 0'}}>
            Pedidos
        </Typography>
        <Box sx={{ width: '100%', typography: 'body1'}}>
          <TabContext value={state}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={(_, value) => handleStateChange(value)} aria-label='Tab-list'>
                <Tab label='Pendientes' value='PENDIENTE'/>
                <Tab label='Completados' value='CONFIRMADO'/>
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