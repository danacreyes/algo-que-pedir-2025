import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { Order } from '../domain/order'
import { useNavigate } from 'react-router-dom'


function PedidoRow({ order }: {order: Order}) {
  const navigate = useNavigate()
  const deleteOrder = async () => {
    try {
      // O local service? Tiene mas sentido que un local borre sus pedidos.
      // pedidoService.deleteOrder(order)
      // Toast de exito
    } catch (error) {
      console.info('An error ocurred', error)
    }

  }
  
  const navigateToOrder = () => {
    navigate(`/order/${order.id}`)
  }
  return (
    <div onClick={navigateToOrder} style={{ width: 'fit-content', cursor: 'pointer'}}>
      <Card sx={{ maxWidth: 245 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={order.local.storeURL}
          title="Store image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {order.local.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Precio final: {order.precioTotal().toFixed(2)}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Horario de entrega: {order.horarioEntrega}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Cantidad de productos: {order.platos.length}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={deleteOrder}>DELETE</Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default PedidoRow