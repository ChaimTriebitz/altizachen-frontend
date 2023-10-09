import { showWarningMsg } from './msgEvent';

export async function fetchData({ url, method = 'GET', body, headers, abortController, type = 'json' }) {
   const default_headers = {
      tok: localStorage.tok,
      'Content-Type': "application/json",
      Accept: "application/json",
   };
   const ab = abortController || new AbortController()
   const signal = ab.signal
   headers = { ...default_headers, ...headers }
   const options = {
      headers,
      method,
      redirect: 'follow',
      signal,
   }
   if (method !== 'GET' && method !== 'DELETE') options.body = JSON.stringify(body)

   try {
      const response = await fetch(url, options);
      if (response.status === 401) {
         window.location.href = '/v2/login?red_to=' + encodeURIComponent(window.location.pathname + window.location.search)
      }
      if (!response.ok) {
         showWarningMsg('Failed')
         throw new Error(response.message)
      }
      if (type === 'file') return response.blob()
      return response.json()
   } catch (error) {
      throw new Error(error)
   }
}

