import { IngredientJSON, IngredientType } from './ingredient'
import { ValidationMessage } from './validationMessage'

// export interface Criterios {
//   Vegano: boolean
//   Exquisito: boolean
//   Conservador: boolean
//   Impaciente: number // Distancia
//   Fieles: Set<number> // Id del local
//   Consumista: string[] // Lista de palabras
//   Generalista: boolean
// }
// EN userProfile.ts - Agregar estas interfaces
export interface CriterioClienteJSON{
  type: string
}

export interface VeganoJSON extends CriterioClienteJSON{
  type: 'vegano'
}

export interface ExquisitoJSON extends CriterioClienteJSON {
  type: 'exquisito'
}

export interface ConservadorJSON extends CriterioClienteJSON {
  type: 'conservador'
}

export interface FielesJSON extends CriterioClienteJSON {
  type: 'fieles'
  localesFavoritos: { id: number }[] 
}

export interface ConsumistaJSON extends CriterioClienteJSON {
  type: 'consumista'
  frasesFavoritas: string[]
}

export interface ImpacienteJSON extends CriterioClienteJSON {
  type: 'impaciente'
}

export interface GeneralistaJSON extends CriterioClienteJSON {
  type: 'generalista'
}

export interface CombinadoJSON extends CriterioClienteJSON {
  type: 'combinado'
  criterios: ClienteCriteria[]
}

export type ClienteCriteria = 
  | VeganoJSON 
  | ExquisitoJSON 
  | ConservadorJSON 
  | FielesJSON 
  | ConsumistaJSON 
  | ImpacienteJSON 
  | GeneralistaJSON 
  | CombinadoJSON

export interface UserProfileJSONResponse {
  id?: number,
  name: string,
  email: string,
  lastName: string,
  address: string,
  location: string,
  latitude: number,
  longitude: number,
  ingredientsToAvoid: IngredientJSON[],
  preferredIngredients: IngredientJSON[],
  maxDistance: number,
  criteria: ClienteCriteria[]   
}

export class UserProfile {
  errors: ValidationMessage[] = []

  constructor(
    public id?: number,
    public name: string = ''.trim(),
    public email: string = ''.trim(),
    public lastName: string = ''.trim(),
    public address: string = ''.trim(),
    public location: string = ''.trim(),
    public latitude: number = 0,
    public longitude: number = 0,
    public ingredientsToAvoid: IngredientType[] = [],
    public preferredIngredients: IngredientType[] = [],
    public maxDistance: number = 5.0,
    public criteria: ClienteCriteria[] = []
  ) {}

  static fromJSON(userJSON: UserProfileJSONResponse): UserProfile {
    const profile = Object.assign(new UserProfile(), userJSON, {})

    profile.ingredientsToAvoid = userJSON.ingredientsToAvoid.map(IngredientType.fromJson)
    profile.preferredIngredients = userJSON.preferredIngredients.map(IngredientType.fromJson)

    return profile
  }

  toJSON(): UserProfileJSONResponse {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      lastName: this.lastName,
      address: this.address,
      location: this.location,
      latitude: this.latitude,
      longitude: this.longitude,
      ingredientsToAvoid: this.ingredientsToAvoid.map(i => i.toJSON()),
      preferredIngredients: this.preferredIngredients.map(i => i.toJSON()),
      maxDistance: this.maxDistance,
      criteria: this.criteria 
    }
  }

  addError(field: string, message: string) {
    this.errors.push(new ValidationMessage(field, message))
  }

  validate() {
    this.errors = []
    if (!this.name) this.addError('name', 'Debe ingresar un nombre')
    if (!this.email) this.addError('email', 'Debe ingresar un email')
    if (!this.lastName) this.addError('lastName', 'Debe ingresar un apellido')
    if (!this.address) this.addError('address', 'Debe ingresar una dirección')
    if (!this.location) this.addError('location', 'Debe ingresar una ubicación')
    if (isNaN(this.latitude)) this.addError('latitude', 'La latitud debe ser un número')
    if (isNaN(this.longitude)) this.addError('longitude', 'La longitud debe ser un número')
  }
}
