import { StoreJSON, StoreType } from '../domain/store'
import { REST_SERVER_URL } from './configuration'
import axios from 'axios'


class StoreService {
  async getStores(searchTerm?: string, userId: string = '') {
    const storeInstance = new StoreType()
    storeInstance.setSearchValue(searchTerm?.trim() || '')
    
    console.log('Enviando búsqueda:', storeInstance.searchName)
    console.log('User ID:', userId)

    const result = await axios.post(`${REST_SERVER_URL}/store-profiles`, {
      searchName: storeInstance.searchName,
      userId: userId 
    })
    
    return result.data.map((storeJSON: StoreJSON) => StoreType.fromJson(storeJSON))
  }
}

export const storeService = new StoreService()
