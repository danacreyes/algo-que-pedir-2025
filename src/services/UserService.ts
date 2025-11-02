import { UserType, type UserJSONLoginRequest, type UserJSONRegisterRequest, type UserJSONResponse } from '../domain/user'
import axios from 'axios'
import { REST_SERVER_URL } from './configuration'
import { IngredientJSON, IngredientType } from '../domain/ingredient'

class UserService {
  // USER CLIENTE
  async getUser(emailSent: string, passwordSent: string) {
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
    sessionStorage.setItem('id', response.data.id.toString())

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
}

export const userService = new UserService()