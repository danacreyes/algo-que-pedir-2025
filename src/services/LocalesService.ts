import { StoreJSON, StoreType } from '../domain/store'
import { REST_SERVER_URL } from './configuration'
import axios from 'axios'

class StoreService {
  async getStores(searchTerm?: string) {
    const storeInstance = new StoreType()
    storeInstance.setSearchValue(searchTerm?.trim() || '')
    
    console.log('Enviando búsqueda:', storeInstance.searchName)

    try {
      const result = await axios.post(`${REST_SERVER_URL}/store-profiles`, {
        searchName: storeInstance.searchName
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      return result.data.map((storeJSON: StoreJSON) => StoreType.fromJson(storeJSON))
    } catch (error) {
      console.error('Error en la petición:', error)
      throw new Error('Error fetching stores')
    }
  }
}

export const storeService = new StoreService()