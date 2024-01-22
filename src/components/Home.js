import React from 'react'
import Notes from './Notes';
import AddNote from './AddNote';


export default function Home() {

  return (
    <div>
      <div className="container my-4">
         <AddNote/>
        <Notes/>
      </div>
               
    </div>
  )
}
