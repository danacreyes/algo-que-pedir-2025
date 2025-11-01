import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { Order } from '../domain/order'


function PedidoRow({ order }: {order: Order}) {
  return (
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
        <Button size="small">DELETE</Button>
      </CardActions>
    </Card>
  )
}

export default PedidoRow