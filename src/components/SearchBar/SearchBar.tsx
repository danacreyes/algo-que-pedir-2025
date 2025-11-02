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
import './SearchBar.css'

export default function SearchBar() {
  const handleSearchClick = () => {
    const input = document.querySelector('input[name="search"]') as HTMLInputElement
    const searchValue = input?.value.trim()

    if (searchValue) {
      console.info('Buscando:', searchValue)
      // lógica de búsqueda
    }
  }

  return (
    <Paper sx={{ position: 'fixed', top: 40, left: 40, right: 40 }} elevation={3}>
      <Box sx={{ maxWidth: '100%', minWidth: '100%', borderRadius: 20 }}>
        <AppBar position="static">
          <Toolbar>
            <div className="search-container">
              <IconButton className="search-icon-wrapper" onClick={handleSearchClick}>
                <SearchIcon />
              </IconButton>
              <InputBase
                className="styled-input-base"
                name="search"
                placeholder="Buscá tu local para pedir…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </Paper>
  )
}