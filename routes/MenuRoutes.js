const express = require('express');
const MenuItems = require('../models/Menu.js');
const MenuRouter = express.Router();


MenuRouter.post("/", async (req, res) => {
    try {
      const data = req.body;
      const dataSchema = new MenuItems(data);
      const saveData = await dataSchema.save();
      console.log("your data has been stored");
      res.status(200).json(saveData);
    } catch (error) {
      console.log(error);
      res.status(500).json("error in saving data " + error);
    }
});

MenuRouter.put("/:id", async (req, res) => {
    try {
      const menuid = req.params.id;
      const response = req.body;
      const updatedata = await MenuItems.findByIdAndUpdate(menuid, response, {
        new : true,
        runValidators : true
      });
      if(!updatedata){
        res.status(404).json({message : "data not found"});
      }
      console.log("perrson data updated");
      res.status(200).json(updatedata)
    } catch (error) {
      console.log(error);
      res.send(500).json(error);
    }
})
  
MenuRouter.delete("/:id", async (req ,res) => {
    try {
      const menuid = req.params.id;
      const deleteMenuItems = await MenuItems.findByIdAndDelete(menuid);
      if(!deleteMenuItems){
        res.status(404).json({message : "data not found"});
      };
      res.status(200).json({message : "deleted successfull"})
    } catch (error) {
      console.log(error);
      res.send(500).json(error);
    }
})
MenuRouter.get("/", async (req, res) => {
    try {
      const data = await MenuItems.find();
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.send(500).json(error);
    }
});

//comment added for menu item

module.exports = MenuRouter;
  