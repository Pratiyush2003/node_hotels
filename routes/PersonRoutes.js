const express = require('express');
const Person = require('../models/Person.js')
const router = express.Router();

router.post("/", async (req, res) => {
    try {
      const newPersonData = req.body;
      const newPerson = new Person(newPersonData);
  
      const savedPerson = await newPerson.save();
      console.log("saved person data");
      res.status(200).json(savedPerson);
    } catch (error) {
      console.log("Error saving person data :", error);
      res.status(500).json({ error: "somthing went wrong" });
    }
});



router.get("/", async (req, res) => {
    try {
      const alldata = await Person.find();
      res.status(200).json(alldata);
      console.log('data fetched')
    } catch (error) {
      console.log("Error fetching data from database :", error);
    }
  });



router.get("/:worktype", async (req, res) => {
    try {
      const worktype = req.params.worktype;
      if (worktype == "chef" || worktype == "manager" || worktype == "waiter") {
        const response = await Person.find({ work: worktype });
        console.log("response fetched");
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: "invalid work type" });
      }
    } catch (error) {
      console.log("Error saving person data :", error);
      res.status(500).json({ error: "somthing went wrong" });
    }
  });

router.put("/:id", async (req, res) => {
        try {
            const personId = req.params.id;
            const updatePersonData = req.body;
            const response = await Person.findByIdAndUpdate(personId, updatePersonData, {
              new : true,
              runvalidators : true
            });
            if(!response){
              return res.status(404).json({error : "Person not found"});
            }
            console.log("person data updated");
            res.status(200).json(response);
        } catch (error) {
          console.log("Error saving person data :", error);
          res.status(500).json({ error: "somthing went wrong" });
        }
});

router.delete("/:id", async (req, res) => {
  try {
    const personid = req.params.id;
    const response = await Person.findByIdAndDelete(personid);
    if(!response){
      return res.status(500).json({error : "Data not found"})
    };
    res.status(200).json({message : "person deleted successfully"})
    res.status(200).json
  } catch (error) {
    console.log(error);
    res.status(500).json("error deleting ")
  }
      
})

  module.exports = router;
  