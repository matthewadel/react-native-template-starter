import RNAxios from 'axios'
import axiosCancel from 'axios-cancel';
import { NetworkStatusStore } from 'context/NetworkStatusContext';
import { useContext, useState } from 'react';
import { useToast } from "react-native-toast-notifications";
import { useLanguage } from 'lang/useLanguage';
import { showMessage } from 'react-native-flash-message';
import { store } from 'store';

let axios: any = RNAxios
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
  onError?: Function,
  onFinally?: Function
}

const rootUrl = `https://upcoming.ozbot.com/api/${store.getState().App.lang === 'ar' ? 'ar/' : ''}`
const handle_API_Request = ({
  url: receivedUrl,
  method,
  body = null,
  incomingHeaders = null,
  noCancellation = false,
  onError,
  onResponse,
  onErrorWithMessage,
  onFinally
}: IAPI_Request) => {

  let url = `${rootUrl}${receivedUrl.url}`

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

  headers.Accept = 'application/json'

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

  return request
    .then((res: any) => {
      console.log(url)
      console.log(res)
      !!onResponse && onResponse(res)
    })
    .catch((res: any) => {
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
    .finally(() => !!onFinally && onFinally())
}

export const useAjaxRequest = (inputloading?: boolean) => {


  const [loading, setloading] = useState(inputloading || false)
  const { state } = useContext(NetworkStatusStore)
  const toast = useToast();
  const { t } = useLanguage()
  const API_Request = (props: IAPI_Request) => {

    if (state.isInternetReachable == 1) {
      setloading(true)
      return handle_API_Request(props)
        .finally(() => setloading(false))
    }
    else {
      if (props.method?.toLowerCase() != 'get')
        toast.show(t('UI.CheckConnection'), {
          type: "warning",
        });

      return new Promise(function (_, reject) {
        reject(!!props.onError && props.onError())
        !!props.onErrorWithMessage && props.onErrorWithMessage()
        !!props.onFinally && props.onFinally()
      });
    }
  }

  const cancelRequest = (requestId: number) => {
    return axios.cancel(`${requestId}`);
  }

  return { API_Request, cancelRequest, loading }
}