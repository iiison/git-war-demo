import React from 'react'
import { RenderUI } from '../../renderData'

import styles from './styles.css'

/* eslint-disable max-len */
function drawTile() {
  return (
    <div className={`col-12 padded-l ${styles.tileCont}`}>
      <div className={`${styles.repoImg} grid-middle grid-center`}>
        <img src='https://icons-for-free.com/iconfiles/png/512/design+development+facebook+framework+mobile+react+icon-1320165723839064798.png' alt='repo' />
      </div>
    </div>
  )
}
/* eslint-enable */

export default function RepoTile({ data }) {
  const { response } = data

  return (
    <div className='grid col-12'>
      <RenderUI keyData={data}>
        {drawTile({ response })}
      </RenderUI>
    </div>
  )
}
