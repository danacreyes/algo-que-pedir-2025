import React, { JSX, useState } from 'react'
import { Paper, Box, AppBar, Toolbar, InputBase } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

interface SearchBarProps {
  onSearch: (searchValue: string) => void;
  searchValue: string;
}

export default function SearchBar({ onSearch, searchValue }: SearchBarProps): JSX.Element {
  const [localSearchValue, setLocalSearchValue] = useState(searchValue)
  const [oldSearchValue, setOldSearchValue] = useState('')

  const handleSearchClick = (): void => {
    if (oldSearchValue.trim().toLowerCase() != localSearchValue.trim().toLocaleLowerCase()){
      
      onSearch(localSearchValue)
      console.info('buscando', localSearchValue)
      setOldSearchValue(localSearchValue)
    }    
  }

  const handleKeyPress = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter') {
      handleSearchClick()
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value
    setLocalSearchValue(value)
  }

  return (
    <Paper sx={{ 
      marginTop: 2, 
      marginRight: 5, 
      marginBottom: 2, 
      marginLeft: 5, 
      top: 40, 
      left: 40, 
      right: 40 
    }} 
    elevation={3}
    >
      <Box sx={{ 
        maxWidth: '100%', 
        minWidth: '100%', 
        borderRadius: 20 
      }}>
        <AppBar position="static">
          <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                backgroundColor: 'white', 
                borderRadius: 1,
                padding: '0 10px',
                width: '100%',
                maxWidth: '600px'
              }}
            >
              <SearchIcon 
                sx={{ color: 'action.active', mr: 1, cursor: 'pointer' }} 
                onClick={handleSearchClick}
              />
              <InputBase
                name='search'
                placeholder="Buscá tu local para pedir…"
                inputProps={{ 'aria-label': 'search' }}
                value={localSearchValue}
                onChange={handleInputChange}
                onKeyUp={handleKeyPress}
                sx={{ width: '100%' }}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </Paper>
  )
}