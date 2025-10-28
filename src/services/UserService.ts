import { UserType, type UserJSONLoginRequest, type UserJSONRegisterRequest, type UserJSONResponse } from '../domain/user'
import axios from 'axios'
import { REST_SERVER_URL } from './configuration'

class UserService {
  // USER LOCAL
  async getUser(emailSent: string, passwordSent: string) {
    // Hace el POST al backend
    const userLocal: UserJSONLoginRequest = {
      email: emailSent,
      password: passwordSent
    }
    const response = await axios.post<UserJSONResponse>( REST_SERVER_URL + '/login', userLocal)
    
    // eslint-disable-next-line no-console

    // Guardar datos en sessionStorage son solo para cuando esta el navegador se borra al cerrar la pestaña supuestamente....
    sessionStorage.setItem('userName', response.data.name)
    sessionStorage.setItem('email', response.data.email)
    //! no se en que usarlo igual, pero ahi estan
    
    return UserType.fromJSON(response.data)
  }

  async createUser(user: UserType) {
    const userLocal: UserJSONRegisterRequest = {
      name: user.name,
      email: user.email,
      password: user.password,
    }

    await axios.post<UserJSONResponse>(
      REST_SERVER_URL + '/register', 
      userLocal
    )
  }

  // USER CLIENTE
  async getClient(emailSent: string, passwordSent: string) {
    // Hace el POST al backend
    const userCliente: UserJSONLoginRequest = {
      email: emailSent,
      password: passwordSent
    }
    const response = await axios.post<UserJSONResponse>( REST_SERVER_URL + '/userLogin', userCliente)
    
    // eslint-disable-next-line no-console

    // Guardar datos en sessionStorage son solo para cuando esta el navegador se borra al cerrar la pestaña supuestamente....
    sessionStorage.setItem('userName', response.data.name)
    sessionStorage.setItem('email', response.data.email)

    console.log(response.data)
    
    return UserType.fromJSON(response.data)
  }
}

export const userService = new UserService()