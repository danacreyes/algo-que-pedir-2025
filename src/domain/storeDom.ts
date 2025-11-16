import { Pago } from './order'
import { StoreRate } from './storeRate'

export type StoreCardJSON = {
  id: number,
  name: string,
  imageURL: string,
  gradePointAvg: number,
  deliveryTimeAvg: string,
  isExpensive: boolean,
  numberOfOrders: number,
}
//! este lo hice momentaniamente despeus cambiarlo
export type StoreDetailJSON = {
  id: number,
  name: string,
  imageURL: string,
  gradePointAvg: number,
  deliveryTimeAvg: string,
  isExpensive: boolean,
  numberOfOrders: number,
  mediosDePago: Pago[]
}

export type StoreReviewsJSON = {
  rate: number,
  experienceDesc: string
}

export enum PaymentType {
  EFECTIVO,
  QR,
  TRANSFERENCIA_BANCARIA,
}

export type OrderCheckoutJSON = {
  id: number,
  name: string,
  imageURL: string,
  gradePointAvg: number,
  km?: number, // no se que es esto
  freeDelivery?: boolean,
  deliveryFee: number,
  typeOfPayment: PaymentType[]
}

export class Store {
    id: number
    name: string
    imageURL: string
    reviews: StoreRate[]
    freeDelivery: boolean
    deliveryFee: number
    paymentTypes: PaymentType[]
    // ubicacion: number // ahre

    constructor(
        id: number,
        name: string,
        imageURL: string,
        reviews: StoreRate[],
        freeDelivery: boolean,
        deliveryFee: number,
        paymentTypes: PaymentType[],
        // ubicacion: number
    ) {
        this.id = id
        this.name = name
        this.imageURL = imageURL
        this.reviews = reviews
        this.freeDelivery = freeDelivery
        this.deliveryFee = deliveryFee
        this.paymentTypes = paymentTypes
        // this.ubicacion = ubicacion
    }

    get gradePointAvg(): string {
        return this.reviews.reduce((acc, rev) => acc + rev.rate, 0).toFixed(2)
    }

    get numberOfReviews(): string {
        return `${this.reviews.length}+`
    }

    get isExpensive(): boolean {
        return this.deliveryFee >= 5
    }

    // get kmsToUser(userPoint: number) {
    //     return userPoint - ownPoint
    // }
}