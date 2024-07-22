import React, { useState, useEffect } from 'react'
// component
import Navbar from './navbar';
import Bar from './Bar'
// context
import { DataContext } from '../Context/context';
// algorithm
import mergeSort from '../algorithm/MergeSort/MergeSort';

export default function main() {
    // states
  const [arraySize,setArraySize]=useState(50);
  const [array,setArray]=useState([]);
//   const [arrSteps, setArrSteps]= useState([]);
  const [algorithm,setAlgorithm]= useState("Merge Sort");

    // return an array of n number; n=arrsize
    const generateRandomArray = () => {
        let randomArray = [];
        for (let i = 0; i < arraySize; i++) {
            randomArray.push(Math.floor(Math.random() * 100) + 10);
        }
        return randomArray;
    };

    // generating steps 
    const generateStep = () => {
        const arr = [...array];
        const steps = [array.slice()];
        sort(arr,steps);
        animateSteps(steps)
        // setArrSteps(step);
    };

    const animateSteps = (steps) => {
        steps.forEach((step, index) => {
            setTimeout(() => {
                setArray(step);
                // Update colors if clrSteps is used
            }, index * 100); // Adjust the delay as needed
        });
    };


    const sort = (array,steps) => {
        console.log(`${algorithm}`);
        // console.log(`${arrSteps}`);
        
        switch (algorithm) {
            case "Merge Sort":
                mergeSort(array,steps);
                break;
            default:
                console.error("working on it");
        };
    };


    // Initialize by generating random array
    const initialize = () => {
        const newArray = generateRandomArray();
        setArray(newArray);
        // setArrSteps([newArray])
        console.log(array);
    };


    const handleSorting = () => {
        generateStep();
    }

    // returns the bar width according to the arraysize
    // formula: width = 750/arraySize
    const getBarWidth = () => {
        return Math.floor(800 /arraySize);
    };

    const bar = array.map((number, index) => {
        return (
            <Bar
                key={index}
                length={number}
                width={getBarWidth()}

            />
        );
    });

    // when the document loads, initialize with new Array
    useEffect(() => {
        initialize();
    }, [arraySize]);




    return (
        <DataContext.Provider value={{ arraySize, setArraySize, array, setArray, algorithm, setAlgorithm }}>
            <div className='flex flex-col justify-center'>
                <h1 className='text-center text-5xl bg-purple-900 p-4 text-white font-bold'>
                    Sorting Visualizer
                </h1>
                <div>
                    <Navbar
                        generateArray={initialize}
                        sorting={handleSorting}
                    />
                </div>
                <div className='mx-3 text-white flex flex-row justify-center'>
                    {bar}
                </div>

            </div>
        </DataContext.Provider>
    );
}
