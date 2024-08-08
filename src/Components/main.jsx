import React, { useState, useEffect } from 'react'
// component
import Navbar from './navbar';
import Bar from './Bar'
// context
// import { DataContext } from '../Context/context';
// algorithm
import mergeSort from '../algorithm/MergeSort/MergeSort';
import QuickSort from '../algorithm/QuickSort/QuickSort';

export default function main() {
    // states
    const [arraySize, setArraySize] = useState(50);
    const [array, setArray] = useState([]);
    const [colorSteps, setColorSteps] = useState([]);
    const [arrSteps, setArrSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [delay, setDelay] = useState(50);
    const [algorithm, setAlgorithm] = useState("Merge Sort");
    const [timeouts, setTimeouts] = useState([]);
    const [startGeneratingSteps, setStartGeneratingSteps] = useState(false);

    // return an array of n number; n=arrsize
    const generateRandomArray = () => {
        let randomArray = [];
        for (let i = 0; i < arraySize; i++) {
            randomArray.push(Math.floor(Math.random() * 100) + 10);
        }
        return randomArray;
    };

    const clearKey = () => {
        let blankkey = new Array(arraySize).fill(0);
        setColorSteps([blankkey]);
    };

    // generating steps 
    const generateStep = () => {
        // console.log('generating steps:');
        const arr = [...array];
        const steps = [array.slice()];
        const clrsteps = [...colorSteps];
        sort(arr, steps, clrsteps);
        setArrSteps(steps);
        setColorSteps(clrsteps);
        setStartGeneratingSteps(false);
    };

    // algorithm selection
    const sort = (array, steps, colorsteps) => {
        // console.log(`Algorithm: ${algorithm}`);
        // console.log(`Array Steps: ${steps}`);
        // console.log(`color Steps: ${colorSteps}`);

        switch (algorithm) {
            case "Merge Sort":
                mergeSort(array, steps, colorsteps);
                break;
            case "Quick Sort":
                QuickSort(array, steps, colorsteps);
                // alert("working on it ....");
                break;
            case "Insertion Sort":
                alert("working on it ....");
                break;
            case "Selection Sort":
                alert("working on it ....");
                break;
            default:
                console.error("working on it");
        }
    };



    //  sorting algorithm delay speed using formula 
    const getDelay = (arraySize) => {
        return Math.floor(1000 / arraySize)
    }

    // Initialize by generating random array
    const initialize = () => {
        const newArray = generateRandomArray();
        setArray(newArray);
        setArrSteps([newArray]);
        setCurrentStep(0);
        setDelay(getDelay(arraySize));
        clearKey();
        clearTimeouts();
        setStartGeneratingSteps(true);
    };

    const changeAlgo = () => {
        const arrayCopy = array.slice();
        setArrSteps([arrayCopy]);
        setCurrentStep(0);
        setDelay(getDelay(arraySize));
        clearKey();
        clearTimeouts();
        setStartGeneratingSteps(true);
    }

    const handleArraySizeandSpeed = (newArraySize) => {
        const newDely = getDelay(newArraySize);
        setArraySize(newArraySize);
        setDelay(newDely);
    }

    // clear timeouts
    const clearTimeouts = () => {
        timeouts.forEach((timeout) => clearTimeout(timeout));
        setTimeouts([]);
        // console.log("Timeouts cleared....");
    }


    // animating steps
    const sorting = (steps) => {
        let timeoutsArray = [];
        let currStep = currentStep;
        // If already at sorted state, just return back
        if (currentStep == arrSteps.length - 1) {
            return false;
        }
        for (let i = 0; i < arrSteps.length; i++) {
            let timeout = setTimeout(() => {
                setArray([...arrSteps[i]]);
                setCurrentStep(currStep++);
            }, delay * (i + 1));
            timeoutsArray.push(timeout);
        }
        // console.log(`setting tiemeoutout`);
        setTimeouts(timeoutsArray);
    };

    // returns the bar width according to the arraysize
    const getBarWidth = () => {
        return Math.floor(800 / arraySize);
    };

    const bar = array.map((number, index) => {
        return (
            <Bar
                key={index}
                index={index}
                length={number}
                width={getBarWidth()}
                color={colorSteps[currentStep][index]}

            />
        );
    });

    // when the document loads, initialize with new Array
    useEffect(() => {
        initialize();
    }, [arraySize]);

    // when the array is done initializing, generate steps
    useEffect(() => {
        if (startGeneratingSteps) {
            generateStep();
        }
    }, [startGeneratingSteps]);

    // when the algorithm changes, start generating steps again
    useEffect(() => {
        changeAlgo();
    }, [algorithm]);



    return (
        <>
            <div className='flex flex-col justify-center'>
                <h1 className='text-center text-5xl bg-purple-900 p-4 text-white font-bold'>
                    Sorting Visualizer
                </h1>
                <div>
                    <Navbar
                        currentStep={currentStep}
                        generateArray={initialize}
                        handleArraySizeAndSpeed={handleArraySizeandSpeed}
                        sorting={sorting}
                        arraySize={arraySize}
                        algorithm={algorithm}
                        setAlgorithm={setAlgorithm}
                        setStartGeneratingSteps={setStartGeneratingSteps}
                    />
                </div>
                <div className='mx-3 text-white flex flex-row justify-center'>
                    {bar}
                </div>

            </div>
        </>
    );
}
