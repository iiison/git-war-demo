import React from 'react'

import styles from './styles.css'

/**
 * Main Container contains all main classes that is needed to make a container
 *
 * @param {Components} object.children                props.children
 * @param {String}     object.additionalClasses       additionalClasses other than defualt classes
 * @param {Boolean}    object.shouldUseDefaultClasses whether to use default classes
 *
 * @returns {DOM}                                     Items component
 */
export default function MainContainer({
  children,
  additionalClasses = '',
  shouldUseDefaultClasses = true
}) {
  const defaultClasses = `${styles.mainContainer} col-12 grid-center`
  const classes = shouldUseDefaultClasses ? `${defaultClasses} ${additionalClasses}` : additionalClasses

  return (
    <div className={classes}>
      <div className='col-11 grid'>
        {children}
      </div>
    </div>
  )
}

