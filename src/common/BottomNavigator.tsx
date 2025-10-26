import * as React from 'react'
import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import { Paper } from '@mui/material'
import { House, Receipt, Star, User } from 'phosphor-react'
import { Link } from 'react-router-dom'

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0)

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <Box sx={{ maxWidth: '100%', minWidth: '100%'}}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                setValue(newValue)
                }}
            >
                <BottomNavigationAction label="Inicio" icon={<House />} component={Link} to='/' />
                <BottomNavigationAction label="Pedidos" icon={<Receipt />} component={Link} to='/order-details' />
                <BottomNavigationAction label="Calificar" icon={<Star />} component={Link} to='/store-ratings' />
                <BottomNavigationAction label="Perfil" icon={<User />} />
            </BottomNavigation>
        </Box>
    </Paper>
  )
}