import { UserType, type UserJSONLoginRequest, type UserJSONRegisterRequest, type UserJSONResponse } from '../domain/user'
import axios from 'axios'
import { REST_SERVER_URL } from './configuration'
import { IngredientJSON, IngredientType } from '../domain/ingredient'
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
    localStorage.setItem('userName', response.data.name)
    localStorage.setItem('email', response.data.email)
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

  async getIngredientsByCriteria(id: number, criteria: string) {
    const response = await axios.get<IngredientJSON[]>(
      REST_SERVER_URL + `/criterio-ingrediente/${criteria}?id=${id}`
    )
    const ingredients = response.data.map(IngredientType.fromJson)
    return ingredients
  }

  async getAvailableIngredients(id: Number) {
    const response = await axios.get<IngredientJSON[]>(
      REST_SERVER_URL + `/ingredientes-disponibles?id=${id}`
    )
    const availableIngredients = response.data.map(IngredientType.fromJson)
    return availableIngredients
  }

  async update(id: Number, criteria: string, ingredients: IngredientType[]) {
    const ingredientJSONs = ingredients.map(ingredient => ingredient.toJSON())
    const ingredientesActualizados = await axios.put<IngredientJSON[]>(REST_SERVER_URL + `/actualizar-ingredientes/${criteria}?id=${id}`, ingredientJSONs)
    return ingredientesActualizados.data.map(IngredientType.fromJson)
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
    localStorage.clear()
  }
}

export const userService = new UserService()