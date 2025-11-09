import { ValidationMessage } from './validationMessage'

export interface UserProfileJSONResponse {
  id?: number;
  name: string;
  email: string;
  lastName: string;
  address: string;
  location: string;
  latitude: number;
  longitude: number;
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
    public longitude: number = 0
  ) {

  }

  static fromJSON(userJSON: UserProfileJSONResponse): UserProfile {
    return Object.assign(new UserProfile(), userJSON, {})
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
      longitude: this.longitude
    }
  }

  addError(field: string, message: string) {
    this.errors.push(new ValidationMessage(field, message))
  }

  validate(){
    this.errors = []
    if(!this.name){
      this.addError('name', 'Debe ingresar un nombre')
    }
    if(!this.email){
      this.addError('email', 'Debe ingresar un email')
    }
    if (!this.lastName){
      this.addError('lastName', 'Debe ingresar un apellido')
    }
    if (!this.address){
      this.addError('address', 'Debe ingresar una dirección')
    }
    if (!this.location){
      this.addError('location', 'Debe ingresar una ubicación')
    }
    if (isNaN(this.latitude)){
      this.addError('latitude', 'La latitud debe ser un número')
    }
    if (isNaN(this.longitude)){
      this.addError('longitude', 'La longitud debe ser un número')
    }
}
}