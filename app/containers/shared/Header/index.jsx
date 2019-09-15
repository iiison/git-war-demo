import React from 'react'
import styles from './styles.css'

export default function Header({ children }) {
  return (
    <h1 className={`col-12 margin-tb-l bolder ${styles.mainHeader}`}>{children}</h1>
  )
}

