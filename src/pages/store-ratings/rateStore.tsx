import { Typography } from '@mui/material'
import { Navigator } from '../../routes/Navigator'
import './store-ratings.css'
import RadioGroupRating from '../../components/RadioGroup/RadioGroupRating'

function RateStore() {
  // const { id } = useParams()
  const navigation = Navigator()
  const { name } = navigation.getStateData()

  return (
    // Esto es raro...no esta ni importado y lo toma igual. De donde?
    <div className='main-container'>
      <article className='go-back-and-title-section'>
        <button onClick={() => navigation.goTo('/store-ratings')} className='go-back-btn'>
          X
        </button>
        <Typography 
          variant='h5' sx={{margin: '1rem 0'}}
          className='section-title'>
            Calificar
        </Typography>
      </article>

      <article className='main-body-and-form'>
        <Typography 
          variant='h5' sx={{ fontSize: '1.9em'}}>
            ¿Cómo fue tu experiencia con {name}?
        </Typography>
        <Typography 
          variant='subtitle1' sx={{ margin: '1em 0em'}}>
            Tu opinión ayuda a otros a elegir el mejor lugar
        </Typography>
        <RadioGroupRating />
        <textarea 
          className='experience-description-textarea'
          name="experience-description"
          placeholder='Describi tu experiencia'
          style={{ marginTop: '2em', height: '15em', minWidth: '28em', maxWidth: '25em', resize: 'none', borderRadius: '0.5em'}}></textarea>
      </article>
    </div>
  )
}

export default RateStore