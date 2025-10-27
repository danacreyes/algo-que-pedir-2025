import * as React from 'react'
import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import Paper from '@mui/material/Paper'
import { IconButton } from '@mui/material'
import { BorderColor } from '@mui/icons-material'

//contenedor del input y la lupa
const Search = styled('div')(() => ({
  position: 'relative',
  borderRadius: 20,
  backgroundColor: '#ffff',
  '&:hover': {
    backgroundColor: '#ffff',
  },
  width: '100%',
  borderStyle: 'none',
}))

//esto es la lupa
const SearchIconWrapper = styled(IconButton)(() => ({
  position: 'absolute',
  right: 0,
  top: 0,
  bottom: 0,
  width: '50px', 
  borderRadius: '10 10 10 10',
  zIndex: 1,
  '&:hover': {
    backgroundColor: '#eae8e8ff',
    BorderColor: 'none',
    style: 'none',
  },
  '&:focus': {
    outline: 'none', // estos son para quitar un borde negro que se le hacia alrededor de la lupa
  },
  '&:focus-visible': {
    outline: 'none', 
  },
}))

//input del texto a buscar
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingright: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
  },
  borderStyle: 'none',
}))

export default function SearchBar() {
  const handleSearchClick = () => {
    const input = document.querySelector('input[name="search"]') as HTMLInputElement
    const searchValue = input?.value.trim()
    
    if (searchValue) {
      console.info('Buscando:', searchValue)
      // aca va a ir la logica de busqueda
  
    }
  }

  return (
    <Paper sx={{ position: 'fixed', top: 40, left: 40, right: 40 }} elevation={3}>
      <Box sx={{ maxWidth: '100%', minWidth: '100%', borderRadius:20,  }}>
        <AppBar position="static">
          <Toolbar >
            <Search >
              <SearchIconWrapper  onClick = {handleSearchClick}>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase 
                name='search'
                placeholder="Buscá tu local para pedir…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
    </Paper>
  )
}