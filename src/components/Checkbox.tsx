import { red } from '@mui/material/colors'
import Checkbox from '@mui/material/Checkbox'
import { Box, Typography } from '@mui/material'

const label = { inputProps: { 'aria-label': 'Checkbox' } }

interface ColorCheckboxesProps {
  isChecked: boolean
  onCheckboxChange: (checked: boolean) => void
}

export default function ColorCheckboxes({ isChecked, onCheckboxChange }: ColorCheckboxesProps) {
  const label = { inputProps: { 'aria-label': 'Buscar locales cercanos' } }

  return (
    <Box display={'flex'} sx={{alignItems: 'center'}} marginLeft={1}>
      <Checkbox
        {...label}
        checked={isChecked}
        onChange={(e) => onCheckboxChange(e.target.checked)}
        sx={{
          color: red[800],
          '&.Mui-checked': {
            color: '#de0d0d',
          },
        }}        
      />
      <Typography>
        Buscar locales cercanos
      </Typography>
    </Box>
  )
}