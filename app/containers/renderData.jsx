import React from 'react'

import { selectPresentableData } from '$UTILS'

/**
 * Render the template according to the render flag
 * @param  {String} renderFlag        renderFlag tells how the template will be rendered
 * @param  {String} errors            Error in the page, mostly API or logic error
 * @param  {String} exceptionMessage  Custom exception message. Default is 'No Products To Show'.
 * @return {DOM}                      Tab content
 */
export default function renderData({ renderFlag, errors, exceptionMessage = 'No Data'}){
  const loadingComponent = <div className='t-center padded-l bold light-color items-cont exception'>Loading...</div>
  const errorsComponent = <div className='t-center padded-l bold light-color items-cont exception'>{errors}</div>

  if (renderFlag === 'loading') {
    return loadingComponent
  } else if (renderFlag === 'errors') {
    return errorsComponent
  } else if (renderFlag === 'noData') {
    return <div className='t-center padded-l bold light-color items-cont exception'>{exceptionMessage}</div>
  } else if (renderFlag === 'hasData') {
    return null
  }

  return loadingComponent
}

export function RenderUI({ keyData, children }) {
  const { error } = keyData
  const renderFlag = selectPresentableData(keyData)
  const result = renderData({ renderFlag, error })

  if (result) {
    return result
  }

  return children
}

