import { UserType, type UserJSONLoginRequest, type UserJSONRegisterRequest, type UserJSONResponse } from '../domain/user'
import { UserProfile, type UserProfileJSONResponse } from '../domain/userProfile'
import axios from 'axios'
import { REST_SERVER_URL } from './configuration'
import { IngredientJSON, IngredientType } from '../domain/ingredient'
import { StoreCardJSON } from '../domain/store'

class UserService {
  // USER CLIENTE
  async login(emailSent: string, passwordSent: string) {
    // Hace el POST al backend
    const userCliente: UserJSONLoginRequest = {
      email: emailSent,
      password: passwordSent
    }
    const response = await axios.post<UserJSONResponse>( REST_SERVER_URL + '/userLogin', userCliente)
    
    // eslint-disable-next-line no-console

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

  async getIngredientsByCriteria(id: number, criteria: string) {
    const response = await axios.get<IngredientJSON[]>(
      REST_SERVER_URL + `/criterio-ingrediente/${criteria}?id=${id}`
    )
    const ingredients = response.data.map(IngredientType.fromJson)
    return ingredients
  }

  // async getAvailableIngredients(id: Number) {
  //   const response = await axios.get<IngredientJSON[]>(
  //     REST_SERVER_URL + `/ingredientes-disponibles?id=${id}`
  //   )
  //   const availableIngredients = response.data.map(IngredientType.fromJson)
  //   return availableIngredients
  // }

  // async update(id: Number, criteria: string, ingredients: IngredientType[]) {
  //   const ingredientJSONs = ingredients.map(ingredient => ingredient.toJSON())
  //   const ingredientesActualizados = await axios.put<IngredientJSON[]>(REST_SERVER_URL + `/actualizar-ingredientes/${criteria}?id=${id}`, ingredientJSONs)
  //   return ingredientesActualizados.data.map(IngredientType.fromJson)
  // }

  async getUnratedStores() {
    const sessionID = Number(sessionStorage.getItem('id'))
    const unratedStoresCardJson = await axios.get<StoreCardJSON[]>(REST_SERVER_URL + `/locales-puntuables/${sessionID}`)
    return unratedStoresCardJson.data
  }
  
  isAuth() {
    // eslint-disable-next-line no-undef
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