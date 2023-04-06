import React from 'react'

const Room = ({room, token}) => {
  return (
    <div className='bg-gray-300 h-20 mt-10 flex flex-col justify-center align-center'>
        <p className='ml-10'>Room: {room}</p>
        {token && (
          <p className='ml-10'>Token: {token}</p>
        )}
    </div>
  )
}

export default Room