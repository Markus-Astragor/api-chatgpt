'use client';
import { useRef, useState } from "react";

export default function Userpage()
{
  const [animalName, setAnimalName] = useState('');
  const animalInput = useRef(null);

  return(
    <div className='h-1/3 flex flex-col justify-center items-center bg-gradient-to-r from-cyan-500 to-green-500'>
        <h3 className='text-3xl font-bold'>This is an Ai App</h3>
        <h3 className='text-2xl font-bold'>Give the name to your pet</h3>

        <form className='flex flex-col'>
          <input className='border border-green-500 text-sm rounded-lg
                            w-full p-2.5 dark:bg-white
                            dark:text-black border-2 border-green-700' type='text' placeholder='Enter an animal' ref={animalInput}/>
          <button className='block rounded-md text-white bg-cyan-500 my-4 hover:bg-cyan-700 py-2'>Send</button>
        </form>
        <p>{animalName}</p>
    </div>
  )
}
