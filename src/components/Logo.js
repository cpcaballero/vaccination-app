import React from 'react'

const Logo = () => {
  console.log(process.env.PUBLIC_URL)
  return (
      
      <img src={process.env.PUBLIC_URL + "mylogo.png"} alt="test" />
    
  )
}

export default Logo