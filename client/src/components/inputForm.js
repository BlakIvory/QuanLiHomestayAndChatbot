import React from 'react'

const InputForm = ({label, value, setValue,type, typeinput, required}) => {
  return (
    <div>
      <label htmlFor='phone'>{label}</label>
      <input 
      type={typeinput}
      className='outline-none bg-[#e8f0fe] p-2  rounded-md w-full '
      value={value}
      onChange={ (e) => setValue(prev => ({...prev,[type]: e.target.value}))}
      />
   
    </div>
  )
}

export default InputForm
