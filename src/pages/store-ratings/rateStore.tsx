import { Button, Rating, Typography } from '@mui/material'
import { Navigator } from '../../routes/Navigator'
import './rate-store.css'
import { useState } from 'react'

const MAX_CHARACTERS: number = 250 

function RateStore() {
  // const { id } = useParams()
  const navigation = Navigator()
  const { name } = navigation.getStateData()
  const [rate, setRate] = useState<number>(3)
  const [experienceDesc, setExperienceDesc] = useState<string>('')
  const [charactersLeft, setCharactersLeft] = useState<number>(MAX_CHARACTERS)
  const [counterState, setCounterState] = useState<string>('safe')

  const submitStoreRate = async () => {
    
  }

  return (
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
        <Rating
          name="simple-controlled"
          value={rate}
          onChange={(_, newRate) => {
            // Podia ser null, asi que si es null conservamos el anterior
            setRate(newRate === null ? rate : newRate as number)
          }}
          sx={{
            margin: '0',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1em',
            left: '0.4em'
          }}
        />
        <section>
          <textarea 
            className='experience-description-textarea'
            name="experience-description"
            value={experienceDesc}
            onChange={(e) => {
              setExperienceDesc(e.target.value)
              setCharactersLeft(MAX_CHARACTERS - e.target.value.length)
              if (MAX_CHARACTERS - e.target.value.length <= 0) {
                setCounterState('exceeded')
              } else if (MAX_CHARACTERS - e.target.value.length <= 40) {
                setCounterState('warning')
              } else {
                setCounterState('safe')
              }
              console.info(e.target.value)
            }}
            placeholder='Describi tu experiencia'
            style={{ 
              marginTop: '1em',
              padding: '0.5em',
              height: '15em', 
              minWidth: '25em', 
              maxWidth: '23em', 
              resize: 'none', 
              borderRadius: '0.5em',
              background: 'none',
              border: '0.01em solid black'
          }}></textarea>
          <div className={`characters-counter ${counterState}`}>{charactersLeft}</div>
        </section>

        <Button variant="contained" className='btn-primary spaced-top' onClick={submitStoreRate}>Guardar</Button>
      </article>
    </div>
  )
}

export default RateStore