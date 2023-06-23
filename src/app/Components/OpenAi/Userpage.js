'use client';
import * as dotenv from 'dotenv';
import { useRef, useState } from "react";
import axios from "axios";
import './Userpage.css';
dotenv.config({path:__dirname + '/.env'})


export default function Userpage() {
  const [animalName, setAnimalName] = useState('');
  const [loader, setLoader] = useState(false)
  const [count, setCount] = useState(0);
  const [error, setError] = useState('');
  const animalInput = useRef(null);

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    let animalInputValue = animalInput.current.value;
    setError('')

    setCount(count + 1);
    if (count === 10) 
    {
      setError('Only 10 requests are allowed');
    }

    setLoader(true)
  
    axios.post('http://localhost:8080/chatGPT', {
      prompt: animalInputValue
    }).then(response => {
      setLoader(false)
      console.log(response);
      setAnimalName(response.data)
    }).catch(error => {
      setLoader(false)
      console.log(error);
      setError(error.message)
    })

    animalInput.current.value = '';
  }

  return (
    <div className='h-screen flex flex-col justify-center items-center bg-gradient-to-r from-gray-950 via-green-400 to-cyan-500'>
      <h3 className='text-3xl font-bold'>This is an Ai App</h3>
      <h3 className='text-2xl font-bold'>Give the name to your pet</h3>

      <form className='flex flex-col' onSubmit={handleSubmit}>
        <input className='border border-green-500 text-sm rounded-lg
                            w-full p-2.5 dark:bg-white
                            dark:text-black border-2 border-green-700' type='text' placeholder='Enter an animal' ref={animalInput}  required/>
        
       {
        loader ? <div className="loadingio-spinner-reload-uhmqs57kee"><div className="ldio-hhw65c61qvi">
        <div><div></div><div></div><div></div></div>
        </div></div> : <button className='block rounded-md text-white bg-cyan-500 my-4 hover:bg-cyan-700 py-2'>Send</button>
       } 
        <p className='text-red-500 text-center font-bold'>{error}</p>
      </form>
      <p>{animalName}</p>
    </div>
  )
}


