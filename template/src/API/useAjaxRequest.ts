import axios from 'axios'
import axiosCancel from 'axios-cancel';
import { useState } from 'react';
import { showMessage } from 'react-native-flash-message';
import { store } from 'store';

axiosCancel(axios, {
  debug: false
});

interface IAPI_Request {
  url: { url: string, requestId?: number, },
  onErrorWithMessage?: Function,
  onResponse?: Function,
  method?: string,
  body?: any,
  incomingHeaders?: any,
  noCancellation?: any,
  onError?: Function
}

export const useAjaxRequest = (inputloading?: boolean) => {

  const rootUrl = `https://upcoming.ozbot.com/api/${store.getState().App.lang === 'ar' ? 'ar/' : ''}`

  const [loading, setloading] = useState(inputloading || false)
  const [data, setData] = useState<any>()

  const API_Request = ({
    url: receivedUrl,
    method,
    body = null,
    incomingHeaders = null,
    noCancellation = false,
    onError,
    onResponse,
    onErrorWithMessage
  }: IAPI_Request) => {

    let url = `${rootUrl}${receivedUrl.url}`
    setloading(true)

    let headers = incomingHeaders ?
      incomingHeaders
      :
      store.getState().User.User ?
        {
          token: store.getState().User.User.token,
          user_id: store.getState().User.User.user_id,
        }
        :
        {}

    let request = null
    if (method?.toLowerCase() == 'get')
      request = axios.get(url, {
        headers,
        requestId: noCancellation ? null : `${receivedUrl.requestId}`
      }
      )
    else if (method?.toLowerCase() == 'delete')
      request = axios.delete(url, {
        headers,
        requestId: noCancellation ? null : `${receivedUrl.requestId}`
      }, body)
    else
      request = axios.post(url, body, {
        headers,
        requestId: noCancellation ? null : `${receivedUrl.requestId}`
      })

    request
      .then((res: any) => {
        console.log(url)
        console.log(res)
        setData(res)
        !!onResponse && onResponse(res)
      })
      .catch(res => {
        console.log(url)
        console.log(res.response)
        if (body)
          console.log(body)

        if (onErrorWithMessage)
          onErrorWithMessage()

        if (onError)
          onError(res.response)
        else
          showMessage({
            message: res.response.data.msg || res.response.data.message,
            type: 'danger'
          })
      })
      .finally(() => setloading(false))
  }

  const cancelRequest = (requestId: number) => {
    return axios.cancel(`${requestId}`);
  }

  return { API_Request, cancelRequest, loading, data }
}