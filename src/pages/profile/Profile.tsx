import Typography from '@mui/material/Typography'
import { Avatar, FormControl, Box, Container, Button, IconButton } from '@mui/material'
import * as React from 'react'
import PreferencesBox from '../../components/PreferencesBox/PreferencesBox'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

import '../search-criteria/search-criteria.css'
import './profile.css'

import LogoutButton from '../../components/LogoutButton'
import { useState } from 'react'
import { UserProfile } from '../../domain/userProfile'
import { userService } from '../../services/UserService'
import { useOnInit } from '../../customHooks/useOnInit'
import ValidationField from '../../components/ValidationField/ValidationField'
import { ValidationMessage } from '../../domain/validationMessage'

sessionStorage.setItem('id', '1')
sessionStorage.setItem('email', 'sofiamiller@gmail.com')

const Profile = () => {
    const [profileOriginal, setProfileOriginal] = useState<UserProfile>(new UserProfile())
    const [profileEditable, setProfileEditable] = useState<UserProfile>(new UserProfile())
    const [errors, setErrors] = useState<Array<ValidationMessage>>([])
    
    const id = Number(sessionStorage.getItem('id'))

    const getProfile = async () => {
        try {
            const profile = await userService.getProfile(id)
            setProfileOriginal(profile) // se usa para mostrar
            setProfileEditable(profile) // se usa para editar
        } catch (error) {
            console.info('Unexpected error', error)
        }
    }

    useOnInit(() => getProfile())

    // eslint-disable-next-line no-undef
    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        // profileEditable.validate()

        // if (profileEditable.errors.length > 0) {
        //     setErrors(profileEditable.errors)
        //     return errors
        // }

        try {
            const updatedProfile = await userService.updateProfile(profileEditable)
            setProfileOriginal(updatedProfile)
            setProfileEditable(updatedProfile)

            console.log('Perfil actualizado con exito')
        } catch (error) {
            console.error('Error al actualizar el perfil', error)
        } finally {
            setErrors([])
        }
    }

    const updateInput = (field: keyof UserProfile, value: unknown) => {
        const updated = new UserProfile(
            profileEditable.id,
            field === 'name' ? String(value) : profileEditable.name,
            field === 'email' ? String(value) : profileEditable.email,
            field === 'lastName' ? String(value) : profileEditable.lastName,
            field === 'address' ? String(value) : profileEditable.address,
            field === 'location' ? String(value) : profileEditable.location,
            field === 'latitude' ? Number(value) : profileEditable.latitude,
            field === 'longitude' ? Number(value) : profileEditable.longitude
        )
        setProfileEditable(updated)
    }

    return(
        <Container className='container-profile' sx={{ pb: 9 }}>
            
            <Typography variant="h6" className='title-main-container'>Perfil</Typography>

            {/* AVATAR */}
            <Container className='section-profile'>
                <Box className='avatar-img'>
                    <Avatar
                        alt='Olivia Bennett'
                        src='/src/assets/avatar-profile.jpg'
                        sx={{ width: 100, height: 100 }}
                    />
                </Box>
                <Box>
                    <Typography variant="h5" className='primary-title-profile'>{`${profileOriginal?.name} ${profileOriginal?.lastName}`}</Typography>
                    <Typography variant="body2" color='gray' align='center'>{profileOriginal?.email}</Typography>
                </Box>
            </Container>

            {/* PERSONAL INFORMATION */}
            <form onSubmit={onSubmit} className='group-section'> 
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Informacion personal</Typography>

                <Box>
                    <FormControl className='form-field'>
                        <div className='input-wrapper'>
                            <label htmlFor="user-name" className='label-profile'>Nombre</label>
                            <input
                                type="text"
                                id="user-name"
                                name="user-name"
                                value={profileEditable?.name}
                                className='input-profile'
                                onChange={(event) => updateInput('name', event.target.value)}
                            />
                            <ValidationField field='name' errors={errors} />
                        </div>

                        <div className='input-wrapper'>
                            <label htmlFor="user-lastName" className='label-profile'>Apellido</label>
                            <input
                                type="text"
                                id="user-lastName"
                                name="user-lastName"
                                value={profileEditable?.lastName}
                                className='input-profile'
                                onChange={(event) => updateInput('lastName', event.target.value)}
                            />
                            <ValidationField field='lastName' errors={errors} />
                        </div>

                        <div className='input-wrapper'>
                            <label htmlFor="user-address" className='label-profile'>Dirección</label>
                            <input
                                type="text"
                                id="user-address"
                                name="user-address"
                                value={profileEditable?.address}
                                className='input-profile'
                                onChange={(event) => updateInput('address', event.target.value)}
                            />
                            <ValidationField field='address' errors={errors} />
                        </div>

                        <div className='input-wrapper'>
                            <label htmlFor="user-location" className='label-profile'>Ubicación</label>
                            <input
                                type="text"
                                id="user-location"
                                name="user-location"
                                value={profileEditable?.location}
                                className='input-profile'
                                onChange={(event) => updateInput('location', event.target.value)}
                            />
                            <ValidationField field='location' errors={errors} />
                        </div>

                        <div className='input-wrapper-div'>
                            <div className='input-wrapper-direction'>
                                <label htmlFor="user-latitude" className='label-profile'>Latitud</label>
                                <input
                                    type="text"
                                    id="user-latitude"
                                    name="user-latitude"
                                    value={profileEditable?.latitude}
                                    className='input-profile'
                                    onChange={(event) => updateInput('latitude', event.target.value)}
                                />
                                <ValidationField field='latitude' errors={errors} />
                            </div>
                            <div className='input-wrapper-direction'>
                                <label htmlFor="user-longitude" className='label-profile'>Longitud</label>
                                <input
                                    type="text"
                                    id="user-longitude"
                                    name="user-longitude"
                                    value={profileEditable?.longitude}
                                    className='input-profile'
                                    onChange={(event) => updateInput('longitude', event.target.value)}
                                />
                                <ValidationField field='longitude' errors={errors} />
                            </div>
                        </div>
                    </FormControl>
                </Box>

            {/* PREFERENCES (podria hacer los Box otro componente) */}
            <Container className='group-section'>
                <Typography variant="h6" sx={{fontWeight: 700}}>Preferencias</Typography>

                <Box className='form-field-preferences' >
                    <Box className='main-box-preferences' >
                        <Typography variant="body1" sx={{fontWeight: 600}} >Criterios de Busqueda</Typography>
                        <IconButton size='small' href='/search-criteria' className='icon-style'> 
                            <KeyboardArrowRightIcon/>
                        </IconButton>                            
                    </Box>
                    
                    <PreferencesBox
                        title ='Ingredientes a evitar'
                        link ='/ingredient-criteria/avoid'
                        icon = {<KeyboardArrowRightIcon/>}
                    />
                    
                    <PreferencesBox
                        title ='Ingredientes preferidos'
                        link ='/ingredient-criteria/prefers'
                        icon = {<KeyboardArrowRightIcon/>}
                    />
                </Box>

            </Container>
            <Button type='submit' variant="contained" className='btn-primary'>Guardar</Button>
            <LogoutButton/>
            </form>

        </Container>
    )
}

export default Profile