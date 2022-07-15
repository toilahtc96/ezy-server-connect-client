import axios from 'axios'
import _ from 'lodash'
import { message } from 'ant-design-vue'

axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.defaults.headers.common.Accept = 'application/json'
axios.defaults.headers.common['Turn-Off-Error-Message'] = false
axios.interceptors.request.use(
  (request) => {
    request.transformResponse = [(data) => data]

    const accessTokenStr = localStorage.getItem('ghtk-token-storage') || '{}'
    const accessTokenObj = JSON.parse(accessTokenStr)
    const accessToken =
      Object.keys(accessTokenObj).length > 0
        ? accessTokenObj.accessToken?.accessToken
        : null

    if (!request.headers) {
      return request
    }
    if (accessToken) {
      request.headers.Authorization = `Bearer ${accessToken}`
      request.headers['Token-Type'] = 'OAuth2'
    }
    return request
  },
  (error) => {
    Promise.reject(error)
  }
)

const messageErrorDefault =
  'Có lỗi xảy ra khi thực hiện yêu cầu, bạn hãy liên hệ với IT để được hỗ trợ!'
axios.interceptors.response.use(
  (response) => {
    if (response.config.headers?.['Turn-Off-Error-Message'] === true) {
      return response
    }
    // Hiển thị thông báo lỗi
    if (response.status === 200 && response.data.success === false) {
      const errorMessage = _.isNil(response.data.message)
        ? messageErrorDefault
        : response.data.message
      message.error(errorMessage, 2)
    } else if (response.status === 400) {
      message.error(messageErrorDefault, 2)
    }
    return response
  },
  async (error) => {
    const response = error.response
    try {
      response.data = JSON.parse(response.data)
    } catch (e) {
      console.log('httpClient JSON error ')
    }
    if (response.status === 401) {
      message.error('Bạn không có quyền thực hiện hành động này!', 2)
    } else {
      message.error(messageErrorDefault, 2)
    }
    return response
  }
)

export default axios
