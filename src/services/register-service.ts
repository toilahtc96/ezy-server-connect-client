import { AxiosResponse } from 'axios'
import { httpClient } from '../core'
import { RegisterRequestData } from '../type/RegisterRequestData'

class RegisterService {
  async register(registerData: RegisterRequestData) {
    const { data }: AxiosResponse = await httpClient.post(
      '/api/v1/authentication/register',
      { registerData }
    )
    return data
  }
}

export const registerService = new RegisterService()
