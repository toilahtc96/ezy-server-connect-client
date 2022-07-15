import { AxiosResponse } from 'axios'
import { httpClient } from '../core'

class PingService {
  async ping() {
    const { data }: AxiosResponse = await httpClient.get('/api/v1/ping')
    return data
  }
}

export const pingService = new PingService()
