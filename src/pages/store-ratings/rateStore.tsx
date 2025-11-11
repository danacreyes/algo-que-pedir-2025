import { Button, Rating, Typography } from '@mui/material'
import { Navigator } from '../../routes/Navigator'
import './rate-store.css'
import { useState } from 'react'
import { storeRateJSON } from '../../domain/store'
import { useParams } from 'react-router-dom'
import { userService } from '../../services/UserService'
import { REST_CLIENT_URL, REST_SERVER_URL } from '../../services/configuration'

const MAX_CHARACTERS: number = 250 

function RateStore() {
  const { id } = useParams()
  const navigation = Navigator()
  const { name } = navigation.getStateData()
  const [rate, setRate] = useState<number>(1)
  const [experienceDesc, setExperienceDesc] = useState<string>('')
  const [charactersLeft, setCharactersLeft] = useState<number>(MAX_CHARACTERS)
  const [counterState, setCounterState] = useState<string>('safe')

  const generateAndSubmitFormData = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const form = ev.currentTarget as HTMLFormElement
    const formData = new FormData(form)

    const storeRate = Number(formData.get('simple-controlled') ?? rate)
    const storeExperienceDesc = String(formData.get('experience-description') ?? experienceDesc)

    const newRate: storeRateJSON = {
      id: id as string,
      rate: storeRate,
      text: storeExperienceDesc
    }

    await submitStoreRate(newRate)
  }

  const submitStoreRate = async (rateJSON: storeRateJSON) => {
    try {
      checkTextMaxLength(rateJSON.text)
      await userService.rateStore(rateJSON)
      console.info('calificado con exito!')
      console.info(rateJSON.text)
      console.info(rateJSON.rate)
      navigation.goTo('/store-ratings')
    } catch {
      console.info('Algo fallo. No se pudo')
    }
  }

  const checkTextMaxLength = (text: string, maxLength: number = MAX_CHARACTERS) => {
    if (text.length > maxLength) {
      console.info('El texto es muy largo')
      throw Error()
    }
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
        <form
          onSubmit={generateAndSubmitFormData}
          id='store-rate-form'
        >
          <fieldset
            style={{
              all: 'unset',
            }}
          >
            <Rating
              name='simple-controlled'
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
          </fieldset>
        
          <fieldset
            style={{
              all: 'unset',
            }}
          >
            <section className='experience-description-section'>
              <textarea 
                className='experience-description-textarea'
                name='experience-description'
                value={experienceDesc}
                onChange={(e) => {
                  setExperienceDesc(e.target.value)
                  setCharactersLeft(MAX_CHARACTERS - e.target.value.length)
                  if (MAX_CHARACTERS - e.target.value.length < 0) {
                    setCounterState('exceeded')
                  } else if (MAX_CHARACTERS - e.target.value.length <= 40) {
                    setCounterState('warning')
                  } else {
                    setCounterState('safe')
                  }
                }}
                placeholder='Describi tu experiencia'
                style={{ 
                  marginTop: '1em',
                  padding: '0.5em',
                  height: '15em', 
                  minWidth: '25em',  
                  resize: 'none', 
                  borderRadius: '0.5em',
                  background: 'none',
                  border: '0.01em solid black'
              }}></textarea>
              <div className={`characters-counter ${counterState}`}>{charactersLeft}</div>
            </section>
          </fieldset>
          
          <Button variant='contained' type='submit' className='btn-primary spaced-top'>Guardar</Button>
        </form>

      </article>
    </div>
  )
}

export default RateStore