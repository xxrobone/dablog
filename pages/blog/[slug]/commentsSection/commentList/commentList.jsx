import React from 'react'

// styles
import styles from 'commmentList.module.scss'

const commentList = ({children}) => {
  return (
      <ul>
          {
              props.map((props) => {
                  <li key=''>
                      {children}
                  </li>
              })
          }
     </ul>
  )
}

export default commentList