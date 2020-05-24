import React from 'react'

//this function is responsible for holding our next and previous buttons.
//our function is invoked with two functions passed in from props.
export default function NavButtons({ previous, next }) {
  return (

    <div className='allButtons'>

      <button className='prevButton' onClick={previous}>Previous Jump</button>
      <button className='nextButton' onClick={next}>Next Jump</button>

    </div> //our buttons on click are calling the functions passed in from props.
  )
}