import React, { memo } from 'react'
import { RenderUI } from '../../renderData'

import styles from './styles.css'

/* eslint-disable max-len */
const repoStaticData = {
  react : {
    image : 'https://icons-for-free.com/iconfiles/png/512/design+development+facebook+framework+mobile+react+icon-1320165723839064798.png'
  },
  angular : {
    image : 'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/21_Angular_logo_logos-512.png'
  },
  vue : {
    image : 'https://vuejs.org/images/logo.png'
  }
}
/* eslint-enable */

function drawTile({ name, description }) {
  const { image } = repoStaticData[name.toLowerCase()]

  return (
    <div className={`col-12 padded-l ${styles.tileCont}`}>
      <div className='grid-middle'>
        <div className={`${styles.repoImg} grid-middle grid-center`}>
          <img src={image} alt='repo' />
        </div>
        <div className='col-7 padded-l'>
          <div className={`col-12 ${styles.repoDetails} grid-middle`}>
            <h2 className='col-12 t-capitalize'>{name}</h2>
            <p className='col-12  padded-top-s'>{description}</p>
          </div>
          <div className='grid col-12'>
            <div className='col-12 padded-top-s'>
              <div className='grid'>
                <div className='col-3'>
                  10000 Stars
                </div>
                <div className='col-3'>
                  20 Issues
                </div>
                <div className='col-3'>
                  50 Forks
                </div>
                <div className='col-3'>
                  12 PR&apos;s
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function RepoTile({ data, pushRef }) {
  const { response } = data

  return (
    <div
      className='grid col-12'
      role='button' 
      onClick={() => response && pushRef(`/repo/${response.name}`)}
    >
      <RenderUI keyData={data}>
        {response && drawTile({ ...response })}
      </RenderUI>
    </div>
  )
}

export default memo(RepoTile)

