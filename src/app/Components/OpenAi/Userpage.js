'use client';
import * as dotenv from 'dotenv';
import React, { useEffect } from 'react';
import { useRef, useState } from "react";
import axios from "axios";
import './Userpage.css';
dotenv.config({ path: __dirname + '/.env' })


export default function Userpage() {
  const [text, setText] = useState('');
  const [loader, setLoader] = useState(false)
  const [count, setCount] = useState(0);
  const [error, setError] = useState('');
  const animalInput = useRef(null);


  let jsxCode;

  const generateJSX = (string) => {
    const parts = string.split("__");
    const jsxElements = parts.map((part, index) => {
      if (index === parts.length - 1) {
        return <span key={index}>{part}</span>;
      } else {
        return (
          <React.Fragment key={index}>
            <span>{part}</span>
            <input type="text" required/>
          </React.Fragment>
        );
      }
    });

    return <p>{jsxElements}</p>;
  };



  const handleSubmit = async (e) => {

    e.preventDefault();
    let animalInputValue = animalInput.current.value;
    setError('')

    setCount(count + 1);
    if (count === 10) {
      return setError('Only 10 requests are allowed');
    }

    setLoader(true)

    axios.post('http://localhost:8080/chatGPT', {
      prompt: animalInputValue
    }).then(response => {
      setLoader(false)
      console.log(response);
      setText(response.data);

    }).catch(error => {
      setLoader(false)
      console.log(error);
      setError(error.message)
    })

    animalInput.current.value = '';

  }

  jsxCode = generateJSX(text);


  useEffect(() => {

  }, [jsxCode])

  return (
    <div className='h-screen flex flex-col justify-center items-center bg-gradient-to-r from-gray-950 via-green-400 to-cyan-500'>
      <h3 className='text-3xl font-bold'>This is an Ai App</h3>
      <h3 className='text-xl font-bold text-center'>Give the list of your words and AI <br/>will create a sentence with these words where you should use them</h3>

      <form className='flex flex-col' onSubmit={handleSubmit}>
        <input className='border border-green-500 text-sm rounded-lg
                            w-full p-2.5 dark:bg-white
                            dark:text-black border-2 border-green-700' type='text' placeholder='Enter an animal' ref={animalInput} required />

        {
          loader ? <div className="loadingio-spinner-reload-uhmqs57kee"><div className="ldio-hhw65c61qvi">
            <div><div></div><div></div><div></div></div>
          </div></div> : <button className='block rounded-md text-white bg-cyan-500 my-4 hover:bg-cyan-700 py-2'>Send</button>
        }
        <p className='text-red-500 text-center font-bold'>{error}</p>
      </form>
      <div className=''>
        {jsxCode}
      </div>
    </div>
  )
}


