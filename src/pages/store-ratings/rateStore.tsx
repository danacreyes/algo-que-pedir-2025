import { Typography } from '@mui/material'
import { Navigator } from '../../routes/Navigator'
import './store-ratings.css'

function RateStore() {
  // const { id } = useParams()
  const navigation = Navigator()
  const { name } = navigation.getStateData()

  return (
    // Esto es raro...no esta ni importado y lo toma igual. De donde?
    <body className='main-container'>
      <section className='go-back-and-title-section'>
        <button onClick={() => navigation.goTo('/store-ratings')} className='go-back-btn'>
          X
        </button>
        <Typography 
          variant='h5' sx={{margin: '1rem 0'}}
          className='section-title'>
            Calificar
        </Typography>
      </section>

      <section className='main-body-and-form'>
        <Typography 
          variant='h5' sx={{ fontSize: '1.9em'}}>
            ¿Cómo fue tu experiencia con {name}?
        </Typography>
        <Typography 
          variant='subtitle1' sx={{ marginTop: '0.5em'}}>
            Tu opinión ayuda a otros a elegir el mejor lugar
        </Typography>
      </section>
    </body>
  )
}

export default RateStore