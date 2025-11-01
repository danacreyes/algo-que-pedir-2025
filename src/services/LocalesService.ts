import { StoreJSON, StoreType } from '../domain/store'
import { REST_SERVER_URL } from './configuration'
import { getAxiosData } from './common'
import axios from 'axios'

class StoreService{
    async getStores(){
        const result = await axios.get(`${REST_SERVER_URL}/store-profiles`)
        return result.data.map((storeJSON: StoreJSON) => StoreType.fromJson(storeJSON))
    }
}

export const storeService = new StoreService()