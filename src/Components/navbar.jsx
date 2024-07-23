import React, { useContext, useEffect } from 'react'
import { items } from '../assets/list_item';


export default function navbar(props) {


  const handleArraySizeAndSpeed = (e) => {
    props.handleArraySizeAndSpeed(e.target.value)
  }

  const generateRandomNumber = () => {
    props.generateArray();
    // alert(`Array: ${value.array}`);
  };

  const selectAlgorithm = (e)=>{
    // console.log(`${value.algorithm}`);
    props.setAlgorithm(e.target.value);
    // alert(`${value.algorithm}`);
  };

  // Starts the sorting
  const handleSorting=()=>{
    props.sorting();
  };



  return (
    <div className='max-w-full bg-purple-900'>
      <nav className='text-white grid grid-flow-col gap-x-1 p-4'>
        {/* Array Size */}
        <div className='flex flex-col p-4 font-medium'>
          <p htmlFor="arrSize" className='m-1 text-lg font-semibold'>
            {`Array Size: ${props.arraySize}`}
          </p>
          <input
            type="range"
            min={5}
            max={100}
            step={5}
            name="arrSize"
            id="arrSize"
            onChange={handleArraySizeAndSpeed}
            className='w-auto h-2 cursor-pointer appearance-none bg-gray-700 rounded-lg [&::-webkit-slider-thumb]:w-[3px]'
          />
        </div>

        {/* Generate Random Array */}
        <div className='grid grid-flow-col place-content-center mb-2 font-medium text-white'>
          <p className='block m-2 text-lg font-semibold'>Generate random numbers:</p>
          <button onClick={generateRandomNumber}  className=' cursor-pointer text-lg text-white bg-gray-700 rounded-lg p-2 hover:bg-gray-600'>
            Generate
          </button>
        </div>

        {/* Select Sorting Algorithm */}
        <div className='grid grid-flow-col place-content-center mb-2 text-white'>
          <p htmlFor="algorithm" className='block m-2 text-lg font-semibold'>Select Sorting Algorithm:</p>
          <select 
            name="select" 
            id="algorithm"   
            defaultValue={props.algorithm}
            onChange={selectAlgorithm}
            className='ml-2 cursor-pointer capitalize bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
             {items.map(({id,title})=>(
              <option key={id} value={title} className='p-4 m-2 font-medium cursor-pointer text-lg capitalize'>
                  {title}
              </option>
             ))
             } 
              {/* <option value="Quick Sort" className='p-4 m-2 font-medium cursor-pointer text-lg capitalize'>
                  Quick Sort
              </option>
              <option value="Insertion Sort" className='p-4 m-2 font-medium cursor-pointer text-lg capitalize'>
                  Insertion Sort
              </option>
              <option value="Selection Sort" className='p-4 m-2 font-medium cursor-pointer text-lg capitalize'>
                  Selection Sort
              </option> */}
          </select>
       
        </div>

        {/* button to perform sorting */}
        <div className='grid place-content-center'>
          <button
            onClick={handleSorting}
            className='w-20 font-semibold cursor-pointer text-lg text-white bg-gray-700 rounded-lg p-3 hover:bg-gray-600'>
            Sort!
          </button>
        </div>
      </nav>
    </div>
  )
}
