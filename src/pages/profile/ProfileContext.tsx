import { Outlet } from 'react-router-dom'
import { ContextType } from '../../customHooks/useUserProfile'
import { useState } from 'react'
import { UserProfile } from '../../domain/userProfile'
import { useOnInit } from '../../customHooks/useOnInit'
import { userService } from '../../services/UserService'

//  Para compartir estado entre componentes, una opcion CONTEXT
const ProfileContext = () => {
    const [profile, setProfile] = useState<UserProfile>(new UserProfile())
    
    const id = Number(localStorage.getItem('id'))

    const getProfile = async () => {
        try {
            const userProfile = await userService.getProfile(id)
            setProfile(userProfile)

            console.log('Perfil obtenido con exito', userProfile)
        } catch (error) {
            console.info('Unexpected error', error)
        }
    }

    useOnInit(() => getProfile())
        
  return <Outlet context={ {profile, setProfile} satisfies ContextType}/>
}

export default ProfileContext