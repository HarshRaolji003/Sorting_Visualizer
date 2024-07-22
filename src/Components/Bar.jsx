import React from 'react'
import Colors from '../colors/Colors'

export default function Bar(props) {
  const barstyle = {
		height: `${props.length * 0.65}vh`,
		backgroundColor: Colors[props.color],
		width: `${props.width}px`,
	};

  return (
    <>
        <div 
          className={`mr-1  border-2 bg-cyan-500`}
          // style={{ height: `${barstyle.height}` }}
          style={barstyle}
        >
          {props.width >= 25 ? props.length : ""}
          
        </div>
    </>
  )
}
