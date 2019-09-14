/* global env:true */
import envURLS                from '$CONFIGS/envURLS'
import errorTypeDetailMap     from '$CONFIGS/errorTypeDetailMap'
import { isFunction }         from '$UTILS'

import httpStatusParser       from './httpStatusParser'

const defaultHeaders = () => ({
  'Content-Type' : 'application/json;charset=UTF-8'
})

/**
 * Conversts `payload` Object(in reqObj) passed to get into query string
 *
 * @param {Object} query  the `payload` property of reqObj of get
 *
 * @return {String}        parsed query string
 */
function makeQueryString(query) {
  const esc = encodeURIComponent

  return Object.keys(query)
    .map((value) => `${esc(value)}=${esc(query[value])}`)
    .join('&')
}

/**
 * Select Server URL as per environment
 *
 * @param  {String} envName Environment Name, optional.
 *
 * @return {String}         URL
 */
function selectEnvURL(envName, type = 'http') {
  const typeNameMap = {
    ws : {
      prod  : 'prodWS',
      alpha : 'alphaWS'
    },
    http : {
      prod  : 'prod',
      alpha : 'alpha'
    }
  }

  if (envName) {
    return envURLS[envName]
  }

  if (env.isProd) {
    return envURLS[typeNameMap[type].prod]
  }

  return envURLS[typeNameMap[type].alpha]
}

/**
 * Get Request wrapper
 * @param  {String} reqObj  Request Data, should have:
 *                          - path {String} API path
 *                          - query
 * @param  {String} envName If making request to different environment
 * @return {Promise}        Promise of get request
 */
/* eslint-disable */
export async function get(reqObj, envName) {
  let response, url

  if (!reqObj.path) {
    return false
  }

  url = selectEnvURL()

  if (envName) {
    url = envURLS[envName]
  }

  url += reqObj.path

  url += reqObj.payload ? `?${makeQueryString(reqObj.payload)}` : ''

  try {
    response = await fetch(url, {
      method  : 'GET',
      headers : {
        ...defaultHeaders(),
        ...reqObj.headers,
        // Authorization : getCookie('access_token')
      }
    })
  } catch (exception) {
    throw errorTypeDetailMap.generic
  }

  if (reqObj.isForFile) {
    return response
  }

  const responseHeaders = {}

  if (reqObj.getResponseHeaders) {
    for (const [key, value] of response.headers.entries()) {
      if (reqObj.getResponseHeaders.includes(key)) {
        responseHeaders[key] = value
      }
    }
  }

  const body = await httpStatusParser(response, reqObj.dispatch, reqObj.shouldRedirectToLogin)

  if (body.errors) {
    throw Error(body.errors)
  } else {
    return reqObj.getResponseHeaders 
      ? {
        response : body,
        responseHeaders
      } : body
  }
}

/**
 * Post Request wrapper
 * @param  {Object} reqObj  request data, should have
 *                          - path {String}  URL to hit
 *                          - payload {Object} Post payload
 * @param  {String} envName if making request to different environment
 * @return {Promise}        Post Promise
 */
export async function post(reqObj, envName) {
  let response,
    url = selectEnvURL(envName)

  if (reqObj !== Object(reqObj)) {
    return false
  }

  reqObj.payload = reqObj.payload || {}
  reqObj.headers = reqObj.headers || {}

  const headers = {
    ...defaultHeaders(),
    ...reqObj.headers,
    // Authorization : getCookie('access_token')
  }

  url += reqObj.path

  try {
    response = await fetch(url, {
      headers,
      method : 'POST',
      body   : JSON.stringify(reqObj.payload)
    })
  } catch (exception) {
    throw errorTypeDetailMap.generic
  }

  const body = await httpStatusParser(response, reqObj.dispatch)

  if (body.errors) {
    throw Error(body.errors)
  } else {
    return body
  }
}

/*
 * Make URL for WebSocket Communication 
 * 
 * @param {String} path    path to be added to the base URL
 * @param {String} envName Env name for the custom URL[OPTIONAL]
 *
 * @returns {String}       URL to be used for the connection
 */
function makeWsURL(path, envName) {
  const url = selectEnvURL(envName, 'ws')

  return url + path
}

/*
 * This function make Socket Calls
 *
 * @param {String}   Object.path      path to be added to the base URL
 * @param {Function} Object.onError   error handler function
 * @param {Function} Object.onMessage `onmessage` callback
 * @param {Function} Object.onClose   `onclose` callback
 * @param {String}   Object.envName   Env name for the custom URL[OPTIONAL]
 *
 * @returns {Object}                  connection reference and send function implementation
 */
export function makeSocketConnection({ path, onError, onMessage, onClose, envName }) {
  let connection
  const wsURL = makeWsURL(path, envName)

  try {
    connection = new WebSocket(wsURL)

    connection.onerror = onError
    connection.onclose = onClose
    connection.onmessage = (event) => {
      const response = JSON.parse(event.data)

      if (response.error) {
        onError(response.error)
      } else if (onMessage && isFunction(onMessage)) {
        onMessage({ response })
      }
    }
  } catch (error) {
    throw error.message
  }

  function WSSend({ payload }) {
    const stringifiedPayload = JSON.stringify(payload)

    if (connection.readyState === 1) {
      return connection.send(stringifiedPayload)
    }

    connection.onopen = () => connection.send(stringifiedPayload)
  }


  return {
    connection,
    send : WSSend
  }
}

