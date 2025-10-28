import { Box, Typography, Tab} from '@mui/material'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import '../index.css'
import '../css/order-details.css'
import React, { useState } from 'react'
import PedidoRow from '../components/PedidoRow'
import { Order } from '../domain/order'
import { orderService } from '../services/orderService'
import { useOnInit } from '../customHooks/useOnInit'

/*
  Agregue local al objeto de dominio 'Order'
  En el service en vez de '&local=' le puse '&key=' para reutilizar el endpoint
  Se agrego la dependencia 'sessionStorage' en el linter
  El back del repositorio de pedidos filtra por el mail del local del pedido, agregue un nuevo endpoint que filtre por mail de user
  Por que cuando clickeo la primera vez no los trae pero la segunda si?
  'Each child in a list should have a unique 'key' prop'
  Que son los 'event' que se pasa aveces a las funciones? Casi nunca se usan
  Pregunta por el warning en el hook





  */
sessionStorage.setItem('email', 'sofiamiller@gmail.com')

function OrderDetails () {
  const [orders, setOrders] = useState<Order[]>([])
  const [state, setState] = useState('PENDIENTE')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
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

  useOnInit(getOrders, state)

  return (
    <>
    <div className='main-container'>
      <section className='section-title-and-tabs'>
        <Typography 
          variant='h5' sx={{margin: '2rem 0'}}>
            Pedidos
        </Typography>
        <Box sx={{ width: '100%', typography: 'body1'}}>
          <TabContext value={state}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label='Tab-list'>
                <Tab label='Pendientes' value='PENDIENTE'/>
                <Tab label='Completados' value='ENTREGADO'/>
                <Tab label='Cancelados' value='CANCELADO'/>
              </TabList>
            </Box>
            <TabPanel value={state} sx={{padding: 0, marginTop: '0.5em'}}>
              {orders.length != 0 ?
              orders.map(order => 
                    <PedidoRow key={order.id} order={order} />) :
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