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

  async getStore(id: number) {
    console.log(id)
    // const response = await axios.get(`${REST_SERVER_URL} + '/store-profile/' ${id}`)
    // console.log(`${REST_SERVER_URL}/store-profile-react/${id}`)
    const response = await axios.get(`${REST_SERVER_URL}/store-profile-react/${id}`)
    // console.log(response)
    // console.log('tdfsaaaaaaa')
    console.log(response.data)
    return response.data
  }

  async getReviewsByStore(id: number) {
    const response = await axios.get(`${REST_SERVER_URL}/store-reviews/${id}`)
    return response.data
  }
}

export const storeService = new StoreService()