import { ValidationMessage } from './user'

export class StoreRate {
  MAX_CHARACTERS: number = 250

  errors: ValidationMessage[] = []
  id: number
  rate: number
  text: string

  constructor(
    id: number,
    rate: number,
    text: string

  ) {
    this.id = id
    this.rate = rate
    this.text = text
  }
  
  checkTextMaxLength (maxLength: number = this.MAX_CHARACTERS): boolean { return this.text.length > maxLength }

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
  text: string
}