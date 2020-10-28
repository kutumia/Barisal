const db=require('../models');
const pd = db.pd;
const dd = db.dd;
const ad = db.ad;
const upazilla = db.upazilla;
const trainedFarmer = db.trainedFarmer;
const initialTrial = db.initialTrial;
const trialProgress = db.trialProgress;
const finalTrial = db.finalTrial;
const breedExpansion = db.breedExpansion;
const technologyExpansion = db.technologyExpansion;
const cropExpansion = db.cropExpansion;
const abadiJomi = db.abadiJomi;

const jwt= require('jsonwebtoken');
const bcrypt= require('bcryptjs'); 

const { request, response } = require('express');
const express = require('express');

module.exports.upazillatable=async(req,res)=>{
    res.json({ message: "hello upazilla" });
};

module.exports.allupazilla=async(req,res)=>{
    res.json({ message: "hello upazilla" });
};


module.exports.adlogin=async(req,res)=>{
    res.render('ad/login', { title: 'Year Round Fruit Production Central Management Software',msg:'' });
    res.send("log");
};

module.exports.adloginpost=async(req,res)=>{
    try {
        const uname = req.body.uname;
        const password = req.body.password;
        ad.findAll({ where: {uname: uname} })
        .then(data => {
            if(data.length > 0){
                bcrypt.compare(password,data[0].password,function(err, result) {
                    if(result== true){
                        req.session.type = "ad";
                        req.session.user_id = data[0].id;
                        const id=req.session.user_id;
                        // res.locals.type = req.session.type;
                        // res.locals.user_id = req.session.user_id;
                        console.log("session=", req.session.type,res.locals);
                        // const token=jwt.sign({id},process.env.JWT_SECRET,token{
                        //     expiresIn:process.env.JWT_EXPIRES_IN
                        // });
                        // console.log("the token is :"+)
                        res.redirect('/ad/dashboard');
                    }
                    else{
                        return res.status(200).render('ad/login', { title: 'Year Round Fruit Production Central Management Software',msg:'Please provide a username and password' });
                    }
                });
            }else{
                return res.status(200).render('ad/login', { title: 'Year Round Fruit Production Central Management Software',msg:'Please provide a username and password' });
            }
        })
        .catch(err => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while retrieving tutorials."
              });
            });
        // upazilla.findAll({ where: {uname: uname} })
        // .then(data => {
        //     if(data.length > 0){
        //         bcrypt.compareSync(password , upazilla.password, function(err, result) {
        //             if(result== true){
        //                 res.redirect('/upazilla/dashboard');
        //             }
        //             else{
        //                 res.redirect('/upazilla/dashboard');
        //             }
        //         });
        //     }else{
        //         return res.status(200).render('upazilla/login', { title: 'Horticulture Wing Central Management Software',msg:'Please provide a username and password' });
        //     }
        // })
        // .catch(err => {
        //   res.status(500).send({
        //     message:
        //       err.message || "Some error occurred while retrieving tutorials."
        //   });
        // });

        
    }
    catch(error){
        console.log(error);
    } 
};

module.exports.adDashboard = async(req,res) => {
    console.log("addashboard",res.locals.type);
    res.render('ad/dashboard', { title: 'Year Round Fruit Production Central Management Software',msg:'Welcome' });
};
//logIn controller end

//signUp controller
module.exports.adsignup=async(req,res)=>{
    res.render('ad/signup', { title: 'Year Round Fruit Production Central Management Software',msg:'' });
    res.send("log");
};
module.exports.adsignuppost=async(req,res)=>{
    try {
        const{uname,password,confirmPassword}=req.body;

        const data = await ad.findAll({ where: {uname: uname} })
        if(data.length > 0){
            res.render('ad/signup',{title: 'Year Round Fruit Production Central Management Software',msg:'ERROR: The ad is already enrolled!'})
        }
        else if(password !== confirmPassword){
            return res.render('ad/signup',{title: 'Year Round Fruit Production Central Management Software',msg:'ERROR: Passwords do not match!'})
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log(hashedPassword);
            try{
                const createad = await ad.create({
                    uname: uname,
                    password:hashedPassword,
                    pd_id:1
                    })
                res.render('ad/signup',{title: 'Year Round Fruit Production Central Management Software',msg:'ad Registered Successfully!'})
            }
            catch (err) {
                console.log(err);
            }
            
        }
    }
    catch(error){
        console.log(error);
    } 
};
//signUp controller end

//trainedFarmer controller
module.exports.trainedFarmer=async(req,res)=>{
    await trainedFarmer.findAll({
        where: {upazilla: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('ad/trainedFarmer/trainedFarmer', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('ad/trainedFarmer/trainedFarmer', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',success:'', records: err });
    })
     
    //  records:result

};

module.exports.trainedFarmerFilter=async(req,res)=>{
    await trainedFarmer.findAll({
        where: {year: req.body.year,upazilla_id: req.session.user_id}
    })
    .then(data => {
        res.render('ad/trainedFarmer/trainedFarmerTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('ad/trainedFarmer/trainedFarmerYear', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',success:'', records: err });
    })

};
//trainedFarmer controller end

//initialTrial controller
module.exports.initialTrial=async(req,res)=>{
    await initialTrial.findAll({
        where: {upazilla: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('ad/initialTrial/initialTrial', { title: 'প্রদর্শনীর প্রাথমিক প্রতিবেদন',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('ad/initialTrial/initialTrial', { title: 'প্রদর্শনীর প্রাথমিক প্রতিবেদন',success:'', records: err });
    })
     
    //  records:result

};

module.exports.initialTrialFilter=async(req,res)=>{
    await initialTrial.findAll({
        where: {year: req.body.year,upazilla_id: req.session.user_id}
    })
    .then(data => {
        res.render('ad/initialTrial/initialTrialTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('ad/initialTrial/initialTrialYear', { title: 'প্রদর্শনীর প্রাথমিক প্রতিবেদন',success:'', records: err });
    })

};
//initialTrial controller end

//finalTrial controller
module.exports.finalTrial=async(req,res)=>{
    await finalTrial.findAll({
        where: {upazilla: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('ad/finalTrial/finalTrial', { title: 'প্রদর্শনীর চূড়ান্ত প্রতিবেদন',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('ad/finalTrial/finalTrial', { title: 'প্রদর্শনীর চূড়ান্ত প্রতিবেদন',success:'', records: err });
    })
     
    //  records:result

};

module.exports.finalTrialFilter=async(req,res)=>{
    await finalTrial.findAll({
        where: {year: req.body.year,upazilla_id: req.session.user_id}
    })
    .then(data => {
        res.render('ad/finalTrial/finalTrialTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('ad/finalTrial/finalTrialYear', { title: 'প্রদর্শনীর চূড়ান্ত প্রতিবেদন',success:'', records: err });
    })

};
//finalTrial controller end

//trialProgress controller
module.exports.trialProgress=async(req,res)=>{
    await trialProgress.findAll({
        where: {upazilla: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('ad/trialProgress/trialProgress', { title: 'প্রদর্শনীর অগ্রগতির প্রতিবেদন',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('ad/trialProgress/trialProgress', { title: 'প্রদর্শনীর অগ্রগতির প্রতিবেদন',success:'', records: err });
    })
     
    //  records:result

};

module.exports.trialProgressFilter=async(req,res)=>{
    await trialProgress.findAll({
        where: {year: req.body.year,upazilla_id: req.session.user_id}
    })
    .then(data => {
        res.render('ad/trialProgress/trialProgressTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('ad/trialProgress/trialProgressYear', { title: 'প্রদর্শনীর অগ্রগতির প্রতিবেদন',success:'', records: err });
    })

};
//trialProgress controller end

//cropExpansion controller
module.exports.cropExpansion=async(req,res)=>{
    await cropExpansion.findAll({
        where: {upazilla: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('ad/cropExpansion/cropExpansion', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('ad/cropExpansion/cropExpansion', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',success:'', records: err });
    })
     
    //  records:result

};

module.exports.cropExpansionFilter=async(req,res)=>{
    await cropExpansion.findAll({
        where: {year: req.body.year,upazilla_id: req.session.user_id}
    })
    .then(data => {
        res.render('ad/cropExpansion/cropExpansionTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('ad/cropExpansion/cropExpansionYear', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',success:'', records: err });
    })

};
//cropExpansion controller end

//breedExpansion controller
module.exports.breedExpansion=async(req,res)=>{
    await breedExpansion.findAll({
        where: {upazilla: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('ad/breedExpansion/breedExpansion', { title: 'প্রকল্প এলাকার ফসলের জাত সম্প্রসারণ',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('ad/breedExpansion/breedExpansion', { title: 'প্রকল্প এলাকার ফসলের জাত সম্প্রসারণ',success:'', records: err });
    })
     
    //  records:result

};

module.exports.breedExpansionFilter=async(req,res)=>{
    await breedExpansion.findAll({
        where: {year: req.body.year,upazilla_id: req.session.user_id}
    })
    .then(data => {
        res.render('ad/breedExpansion/breedExpansionTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('ad/breedExpansion/breedExpansionYear', { title: 'প্রকল্প এলাকার ফসলের জাত সম্প্রসারণ',success:'', records: err });
    })

};
//breedExpansion controller end

//technologyExpansion controller
module.exports.technologyExpansion=async(req,res)=>{
    await technologyExpansion.findAll({
        where: {upazilla: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('ad/technologyExpansion/technologyExpansion', { title: 'প্রকল্প এলাকার প্রযুক্তি সম্প্রসারণ',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('ad/technologyExpansion/technologyExpansion', { title: 'প্রকল্প এলাকার প্রযুক্তি সম্প্রসারণ',success:'', records: err });
    })
     
    //  records:result

};

module.exports.technologyExpansionFilter=async(req,res)=>{
    await technologyExpansion.findAll({
        where: {year: req.body.year,upazilla_id: req.session.user_id}
    })
    .then(data => {
        res.render('ad/technologyExpansion/technologyExpansionTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('ad/technologyExpansion/technologyExpansionYear', { title: 'প্রকল্প এলাকার প্রযুক্তি সম্প্রসারণ',success:'', records: err });
    })

};
//technologyExpansion controller end

//abadiJomi controller
module.exports.abadiJomi=async(req,res)=>{
    try{
        var seventeen=await abadiJomi.findOne({where: {year:"2017",upazilla_id: req.session.user_id}});
        var eighteen=await abadiJomi.findOne({where: {year:"2018",upazilla_id: req.session.user_id}});
        var nineteen=await abadiJomi.findOne({where: {year:"2019",upazilla_id: req.session.user_id}});
        var twenty=await abadiJomi.findOne({where: {year:"2020",upazilla_id: req.session.user_id}});
        var twentyOne=await abadiJomi.findOne({where: {year:"2021",upazilla_id: req.session.user_id}});
        var twentyTwo=await abadiJomi.findOne({where: {year:"2022" ,upazilla_id: req.session.user_id}});
        
        res.render('ad/abadiJomi/abadiJomi', { title: 'আবাদী জমি ও ফসল উৎপাদন',success:'', seventeen: seventeen,eighteen: eighteen,nineteen: nineteen,twenty: twenty,twentyOne: twentyOne,twentyTwo: twentyTwo });
        // var men=seventeen.purush;
        // console.log("seventeen,",req.typeof(men));
    }
    catch(err){
        res.render('ad/abadiJomi/abadiJomi', { title: 'আবাদী জমি ও ফসল উৎপাদন',success:'', records: err });
    }
   

     
    //  records:result

};

module.exports.abadiJomiFilter=async(req,res)=>{
    var seventeen=await abadiJomi.findAll({
        where: {year:2017,upazilla_id: req.session.user_id}
    });
    var eighteen=await abadiJomi.findAll({
        where: {year:2018,upazilla_id: req.session.user_id}
    });
    var nineteen=await abadiJomi.findAll({
        where: {year:2019,upazilla_id: req.session.user_id}
    });
    var twenty=await abadiJomi.findAll({
        where: {year:2020,upazilla_id: req.session.user_id}
    });
    var twentyOne=await abadiJomi.findAll({
        where: {year:2021,upazilla_id: req.session.user_id}
    });
    var twentyTwo=await abadiJomi.findAll({
        where: {year:2022,upazilla_id: req.session.user_id}
    })
    .then(data => {
        res.render('ad/abadiJomi', {seventeen: seventeen,eighteen: eighteen,seventeen: seventeen,nineteen: nineteen,twenty: twenty,twentyOne: twentyOne,twentyTwo: twentyTwo} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('ad/abadiJomi/abadiJomiYear', { title: 'আবাদী জমি ও ফসল উৎপাদন',success:'', records: err });
    })

};
//abadiJomi controller end
