import { StoreJSON, StoreType } from '../domain/store'
import { Store, StoreDomJSON } from '../domain/storeDom'
import { StoreRate, StoreRateJSON } from '../domain/storeRate'
import { REST_SERVER_URL } from './configuration'
import axios from 'axios'


class StoreService {
  async getStores(searchTerm?: string, userId: string = '') {
    const storeInstance = new StoreType()
    storeInstance.setSearchValue(searchTerm?.trim() || '')

    const result = await axios.post(`${REST_SERVER_URL}/store-profiles`, {
      searchName: storeInstance.searchName,
      userId: userId 
    })
    
    return result.data.map((storeJSON: StoreJSON) => StoreType.fromJson(storeJSON))
  }

  async getStore(id: number | null) {
    const response = await axios.get<StoreDomJSON>(`${REST_SERVER_URL}/store-profile-react/${id}`)
    const store = Store.fromJSON(response.data)
    return store
  }

  async getReviewsByStore(id: number) {
    const response = await axios.get<StoreRateJSON[]>(`${REST_SERVER_URL}/store-reviews/${id}`)
    const reviews = response.data.map(it => StoreRate.fromJSON(it))
    return reviews
  }

  async getStoresDom() {
    const response = await axios.get(`${REST_SERVER_URL}/stores`)
    return response.data.map(Store.fromJSON)
  }
}

export const storeService = new StoreService()
