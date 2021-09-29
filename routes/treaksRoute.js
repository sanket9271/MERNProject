const express=require('express');
const router=express.Router();
const Treak=require('../models/treak');

router.get("/getalltreaks",async(req,res)=>{

    try {
        const treaks= await Treak.find();
        return res.json({treaks});
    } catch (error) {
        return res.status(400).json({message: 'error'});
    }
});

router.post("/gettreakbyid",async(req,res)=>{


    const treakid=req.body.treakid;
    try {
        const treak= await Treak.findOne({_id : treakid});
        return res.send(treak);
    } catch (error) {
        return res.status(400).json({message: 'error'});
    }
});

router.post("/addtreak", async(req, res) => {
    const { treak , 
       description ,phonenumber ,difficulty ,image1 ,image2 ,image3} = req.body
  
       const newtreak = new Room({
            name : treak,
            description , phonenumber , difficulty , imageurls:[image1 , image2 ,image3]
       })
       try {
            await newtreak.save()
            res.send('New Treak Added Successfully')
       } catch (error) {
            return res.status(400).json({ error });
       }
  });

module.exports=router; 