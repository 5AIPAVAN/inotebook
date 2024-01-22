
import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import NoteState from './contexts/notes/noteState';
import AllBlogs from './components/AllBlogs';
import AddBankAccount from './components/AddBankAccount';


function App() {
  return (
<>
{/* MUST WRAP ALL THESE COMPONENTS IN <NoteState></NoteState> TO USE ALL VARIABLES AND FUNCTIONS FROM ContextAPI */}
<NoteState>

<Router>
<Navbar/>

<Routes>
          
    <Route exact path="/" element={<Home/>}/> 
    <Route exact path="/about"  element={<About/>}/>
    <Route exact path="/login" element={<Login/>}/> 
    <Route exact path="/signup" element={<Signup/>}/> 
    <Route exact path="/allblogs" element={<AllBlogs/>}/> 
    <Route exact path="/Add_bank_account" element={<AddBankAccount/>}/> 

</Routes>

</Router>

</NoteState>
</>
  );
}

export default App;
