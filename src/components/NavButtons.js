import React from 'react'

export default function NavButtons({ previous, next }) {
  return (

    <div className='allButtons'>

      <button className='prevButton' onClick={previous}>Previous Jump</button>
      <button className='nextButton' onClick={next}>Next Jump</button>

    </div>
  )
}