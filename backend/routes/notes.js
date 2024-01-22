const express= require('express');
const router = express.Router();
const Note = require('../models/Note')
const Bank_Account = require('../models/Bank_Account')
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');

// ROUTE-1 :- 
// FETCH ALL NOTES OF A PARTICULAR(LOGGED-IN) USER , method :- GET , LOGIN REQUIRED

router.get('/fetchallnotes', fetchuser , async(req,res)=>{

    try{
    // in notes database -> every note is associated with a particular user(owner)
    // find all notes asscoiated with given user all send as response
    console.log("id in fetch all notes function in notes.js "+ req.user.id)
    const all_notes = await Note.find({user : req.user.id});
    
    res.json(all_notes);

}catch(error){
 
    res.status(500).send("SOME ERROR OCCURED (try-catch) in notes.js route-1" + error);
}

    
})

//************************************************************************************************/
//ROUTE-2 :-
//ADD NEW NOTE
//method-POST , LOGIN REQUIRED


router.post('/addnewnote', [
    // validating title,description using express-validator
    body('title', 'TITLE MUST BE MIN OF LENGTH 3').isLength({ min: 3 }),
    body('description', 'DESCRIPTION MUST BE MIN OF LENGTH 5').isLength({ min: 5 }),
],fetchuser, async (req, res) => {

  // check if any errors in validation
    const errors = validationResult(req); // USE req NOT req.body HERE
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
   
    try{

        // de-structuring  title,description,tag from req.body
    const {title,description,tag}= req.body;

    // creating new note and saving in database
    const note = new Note({
        title,
        description,
        tag,
        user:req.user.id
    })

    const savedNote = await note.save();

    res.json(savedNote);

}catch(error){
    res.status(500).send("SOME ERROR OCCURED (try-catch) in notes router-2" + error);
}

})


//***************************************************************************************************** */

//ROUTE-3:-
// UPDATE EXISTING NOTE , method:-PUT
// LOGIN REQUIRED

router.put('/updatenote/:id', [
    // validating title,description using express-validator
    body('title', 'TITLE MUST BE MIN OF LENGTH 3').isLength({ min: 3 }),
    body('description', 'DESCRIPTION MUST BE MIN OF LENGTH 5').isLength({ min: 5 }),
],fetchuser, async (req, res) => {

      // check if any errors in validation
      const errors = validationResult(req); // USE req NOT req.body HERE
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }

      try{

        // destructuring and obtaining title,description,tag from req.body
        const {title,description,tag}= req.body;
 
        // intialize a new empty note
        const newNote ={};

        // if we entered a new title in req.body
        if(title){
            newNote.title=title;
        }
        // if we entered a new description in req.body
        if(description){
            newNote.description=description;
        }
        // if we entered a new tag in req.body
        if(tag){
            newNote.tag=tag;
        }
      
        // find the note with given note id 
        let note = await Note.findById(req.params.id)

        // if note is not found
        if(!note){
            return res.status(404).json({ error: "Sorry note  which need to be updated is not found" })
        }
        console.log(note)

        // if note doesnot belong to logged-in user
        // users cannot update others notes !!!!!!!!!!!
        if(note.user.toString() !== req.user.id ){
            return res.status(401).json({ error: "Changing others notes !!! .. NOT ALLOWED !!!!" })
        }

        // if note belongs to his own -> find note and update with newNote
        note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
        console.log(note)

        res.json({note})


      }catch(error){
        res.status(500).send("SOME ERROR OCCURED (try-catch) in notes router-3");
        console.log(error.message);
    }

});


//******************************************************************************************************/
// ROUTE-4:-
// METHOD USED- DELETE
//LOGIN REQUIRED

router.delete('/deletenote/:id', fetchuser, async (req, res) => {

      try{
 
        // find note with diven noteid
        let note = await Note.findById(req.params.id)

        // if note with given id is not found
        if(!note){
            return res.status(404).json({ error: "Sorry note  which need to be deleted is not found" })
        }

        // if note doesnot belong to logged-in user
        // users cannot delete others notes !!!!!!!!!!!
        if(note.user.toString() !== req.user.id ){
            return res.status(401).json({ error: "Deleting others notes !!! .. NOT ALLOWED !!!!" })
        }

        // find note with given id and delete
        note = await Note.findByIdAndDelete(req.params.id)
        console.log("DELETED SUCCCESSFULLY ")
        res.json({note})


      }catch(error){
        res.status(500).send("SOME ERROR OCCURED (try-catch) in notes router-4");
        console.log(error.message);
    }

});


//************************************************************************************************/

// ROUTE-5 :- 
// FETCH ALL NOTES OF A PARTICULAR(LOGGED-IN) USER , method :- GET , LOGIN REQUIRED

router.get('/allnotes_in_db', async(req,res)=>{

    try{
        const all_notes = await Note.find();  
        console.log(all_notes);
        res.json(all_notes);
}catch(error){
    res.status(500).send("SOME ERROR OCCURED (try-catch) in notes.js route-5" + error);
}

    
})



















//*******************************************BANK ACCOUNT********************************************************/

// ROUTE-1 :- 
// FETCH ALL ACCOUNTS OF A PARTICULAR(LOGGED-IN) USER , method :- GET , LOGIN REQUIRED

router.get('/fetchallaccounts', fetchuser , async(req,res)=>{

    try{
 
    console.log("id in fetch all notes function in notes.js "+ req.user.id)
    const all_accounts = await Bank_Account.find({user : req.user.id});
    
    res.json(all_accounts);

}catch(error){
 
    res.status(500).send("SOME ERROR OCCURED (try-catch) in notes.js route-1" + error);
}

    
})

//ROUTE-2 :-
//ADD NEW NOTE
//method-POST , LOGIN REQUIRED


router.post('/addnewaccount', [
    // validating title,description using express-validator
    body('title', 'TITLE MUST BE MIN OF LENGTH 3').isLength({ min: 3 }),
    body('description', 'DESCRIPTION MUST BE MIN OF LENGTH 5').isLength({ min: 5 }),
],fetchuser, async (req, res) => {

  // check if any errors in validation
    const errors = validationResult(req); // USE req NOT req.body HERE
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
   
    try{

        // de-structuring  title,description,tag from req.body
    const {title,description,tag}= req.body;

    // creating new note and saving in database
    const account = new Bank_Account({
        title,
        description,
        tag,
        user:req.user.id
    })

    const savedAccount = await account.save();

    res.json(savedAccount);

}catch(error){
    res.status(500).send("SOME ERROR OCCURED (try-catch) in notes router-2" + error);
}

})




module.exports=router;