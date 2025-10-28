import { Card, Grid, Checkbox } from '@mui/material'
import Typography from '@mui/material/Typography'
import { ReactNode } from 'react'

// React Node
// is a flexible type that includes primitive values like strings and numbers, 
// as well as complex types like JSX elements, arrays, or other React nodes. 

const CheckboxCard = ({ title, description, defaultChecked, children }: {title: string, description: string, defaultChecked: boolean, children?: ReactNode }) => {
    const label = { inputProps: { 'aria-label': `${title} Checkbox`} }

    return(
        <Card sx={{ padding: '1em', borderRadius: '10px', border: '1px solid ligth-gray'}} variant='outlined'>
            <Grid container spacing={2}>
                <Grid size={10}>
                    <Typography variant="body2" sx={{ display: 'flex', width: '100%' }}>{title}</Typography>
                    <Typography variant="body2" color='gray'>{description}</Typography>
                </Grid>

                <Grid size={2}>
                    <Checkbox defaultChecked={defaultChecked} sx={{ display: 'flex', justifyContent: 'end', color: 'gray', '&.Mui-checked': { color: ' hsl(1, 77%, 45%)'},}} {...label} />
                </Grid>
            </Grid>
            {children}
        </Card>
    )
}

export default CheckboxCard