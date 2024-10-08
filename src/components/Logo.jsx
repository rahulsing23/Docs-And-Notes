import React from 'react'
import LogoIcon from '../assets/icons/sticky-notes.png';
const Logo = () => {
  return (
    <div className='flex justify-between items-center gap-2 p-2'>
      <img src={LogoIcon} alt="Logo" width={40} height={40}/>
       <h1 className='font-bold text-xl text-[#48D1CC]'>
        <span className='bg-green-100 p-1 text-green-400 rounded-sm' 
        style={{ transform: 'rotate(-10deg)', display: 'inline-block' }}
        >Keep</span> {'  '} 
        <span className='bg-orange-100 p-1 text-orange-400 rounded-sm'
        style={{ transform: 'rotate(10deg)', display: 'inline-block', marginTop: '-10px' }}>Notes</span> </h1>
    </div>
  )
}

export default Logo
