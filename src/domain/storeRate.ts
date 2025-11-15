import { ValidationMessage } from './user'

export class StoreRate {
  MAX_CHARACTERS: number = 250

  errors: ValidationMessage[] = []
  id: number
  rate: number
  experienceDesc: string

  constructor(
    id: number,
    rate: number,
    experienceDesc: string

  ) {
    this.id = id
    this.rate = rate
    this.experienceDesc = experienceDesc
  }
  
  checkTextMaxLength (maxLength: number = this.MAX_CHARACTERS): boolean { return this.experienceDesc.length > maxLength }

  addError(field: string, message: string) {
    this.errors.push(new ValidationMessage(field, message))
  }
  
  validate(){
    this.errors = []
    if(this.checkTextMaxLength()){
      this.addError('experience-description', 'El texto es demasiado largo')
    }
  }
}

export type storeRateJSON = {
  id: string,
  rate: number,
  experienceDesc: string
}