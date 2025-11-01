import * as React from 'react'
import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import { Paper } from '@mui/material'
import { House, Receipt, Star, User } from 'phosphor-react'
import { Link } from 'react-router-dom'
import '../BottomNavigator/bottom-navigator.css'

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0)

  return (
    <Paper className='main-container-nav'>
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
                <BottomNavigationAction label="Perfil" icon={<User />} component={Link} to='/profile' />
            </BottomNavigation>
        </Box>
    </Paper>
  )
}