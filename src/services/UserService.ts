import { UserType, type UserJSONLoginRequest, type UserJSONRegisterRequest, type UserJSONResponse } from '../domain/user'
import { UserProfile, type UserProfileJSONResponse } from '../domain/userProfile'
import axios from 'axios'
import { REST_SERVER_URL } from './configuration'
import { Store, StoreDomJSON } from '../domain/storeDom'
import { StoreRate, StoreRateJSON } from '../domain/storeRate'
import { OrderJSON } from '../domain/order'

class UserService {
  // USER CLIENTE
  async login(emailSent: string, passwordSent: string) {
    // Hace el POST al backend
    const userCliente: UserJSONLoginRequest = {
      email: emailSent,
      password: passwordSent
    }
    const response = await axios.post<UserJSONResponse>( REST_SERVER_URL + '/userLogin', userCliente)
    
    // Guardar datos en sessionStorage son solo para cuando esta el navegador se borra al cerrar la pestaña supuestamente....
    // eslint-disable-next-line no-undef
    localStorage.setItem('userName', response.data.name)
    // eslint-disable-next-line no-undef
    localStorage.setItem('email', response.data.email)
    // eslint-disable-next-line no-undef
    localStorage.setItem('id', response.data.id.toString())

    console.log(response.data)
    
    return UserType.fromJSON(response.data)
  }

  async createUser(user: UserType) {
    const userLocal: UserJSONRegisterRequest = {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      passwordRetry: ''
    }

    await axios.post<UserJSONResponse>(
      REST_SERVER_URL + '/userRegister', 
      userLocal
    )
  }

  async getProfile(id: number) {
    const response = await axios.get<UserProfileJSONResponse>(
      REST_SERVER_URL + `/perfil/${id}`
    )
    return UserProfile.fromJSON(response.data)
  }

  async updateProfile(profile: UserProfile) {
    const response = await axios.put<UserProfileJSONResponse>(REST_SERVER_URL + '/actualizar-perfil/' + profile.id, profile.toJSON())
    return UserProfile.fromJSON(response.data)
  }

  async getUnratedStores() {
    const userSessionID = Number(sessionStorage.getItem('id'))
    const unratedStoresCardJson = await axios.get<StoreDomJSON[]>(REST_SERVER_URL + `/locales-puntuables/${userSessionID}`)
    return unratedStoresCardJson.data.map(it => Store.fromJSON(it))
  }

  async rateStore(storeRate: StoreRate, storeId: number) {

    const storeRateJSON: StoreRateJSON = {
      rate: storeRate.rate,
      experienceDesc: storeRate.experienceDesc
    }
    const userSessionID = Number(localStorage.getItem('id'))

    return axios.post(REST_SERVER_URL + `/puntuar-local?localId=${storeId}&userId=${userSessionID}`, storeRateJSON)
  }

  async confirmOrder(id: number) {
    const userId = Number(localStorage.getItem('id'))
    return axios.post<OrderJSON>(REST_SERVER_URL + `/confirm-order/${id}?userId=${userId}`)
  }

  async cancelOrder(id: number) {
    const userId = Number(localStorage.getItem('id'))
    return axios.post<OrderJSON>(REST_SERVER_URL + `/cancel-order/${id}?userId=${userId}`)
  }

  isAuth() {
    const email = localStorage.getItem('userName')
    if (email != null || email != undefined) {
      return true
    }
    return false
  }

  logout() {
    // eslint-disable-next-line no-undef
    localStorage.clear()
  }
}

export const userService = new UserService()