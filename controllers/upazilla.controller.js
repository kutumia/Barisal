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


module.exports.upazillalogin=async(req,res)=>{
    res.render('upazilla/login', { title: 'Year Round Fruit Production Central Management Software',msg:'' });
    res.send("log");
};

module.exports.upazillaloginpost=async(req,res)=>{
    try {
        const uname = req.body.uname;
        const password = req.body.password;
        upazilla.findAll({ where: {uname: uname} })
        .then(data => {
            if(data.length > 0){
                bcrypt.compare(password,data[0].password,function(err, result) {
                    if(result== true){
                        req.session.type = "upazilla";
                        req.session.user_id = data[0].id;
                        const id=req.session.user_id;
                        // res.locals.type = req.session.type;
                        // res.locals.user_id = req.session.user_id;
                        console.log("session=", req.session.type,res.locals);
                        // const token=jwt.sign({id},process.env.JWT_SECRET,token{
                        //     expiresIn:process.env.JWT_EXPIRES_IN
                        // });
                        // console.log("the token is :"+)
                        res.redirect('/upazilla/dashboard');
                    }
                    else{
                        return res.status(200).render('upazilla/login', { title: 'Year Round Fruit Production Central Management Software',msg:'Please provide a username and password' });
                    }
                });
            }else{
                return res.status(200).render('upazilla/login', { title: 'Year Round Fruit Production Central Management Software',msg:'Please provide a username and password' });
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

module.exports.logout=async(req,res)=>{
    res.cookie('jwt','',{maxAge:1});
    res.redirect('/');
    res.send("log");
};

module.exports.upazillaDashboard = async(req,res) => {
    console.log("upazilladashboard",res.locals.type);
    res.render('upazilla/dashboard', { title: 'Year Round Fruit Production Central Management Software',msg:'Welcome' });
};
//logIn controller end

//signUp controller
module.exports.upazillasignup=async(req,res)=>{
    await dd.findAll()
    .then(data => {
        console.log("inside");
        res.render('upazilla/signup', { title: 'Year Round Fruit Production Central Management Software',msg:'',records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/signup', { title: 'Year Round Fruit Production Central Management Software',msg:'',records: err });
    })
};
module.exports.upazillasignuppost=async(req,res)=>{
    try {
        const{dds,uname,password,confirmPassword}=req.body;
        const ddata=await dd.findAll();
        const data = await upazilla.findAll({ where: {uname: uname} });
        
        if(data.length > 0){
            res.render('upazilla/signup',{title: 'Year Round Fruit Production Central Management Software',msg:'ERROR: The upazilla is already enrolled!',records: ddata})
        }
        else if(password !== confirmPassword){
           res.render('upazilla/signup',{title: 'Year Round Fruit Production Central Management Software',msg:'ERROR: Passwords do not match!',records: ddata})
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log(hashedPassword);
            try{
                const createupazilla = await upazilla.create({
                    uname: uname,
                    password:hashedPassword,
                    dd_id:dds,
                    pd_id:1
                    })
                res.render('upazilla/signup',{title: 'Year Round Fruit Production Central Management Software',msg:'upazilla Registered Successfully!',records: ddata})
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
        res.render('upazilla/trainedFarmer/trainedFarmer', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/trainedFarmer/trainedFarmer', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',success:'', records: err });
    })
     
    //  records:result

};

module.exports.trainedFarmerYear=async(req,res)=>{
    await trainedFarmer.findAll({
        where: {year: req.body.year,upazilla_id: req.session.user_id}
    })
    .then(data => {
        res.render('upazilla/trainedFarmer/trainedFarmerTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('upazilla/trainedFarmer/trainedFarmerYear', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',success:'', records: err });
    })

};

module.exports.trainedFarmerForm=async(req,res)=>{
    res.render('upazilla/trainedFarmer/trainedFarmerForm', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.trainedFarmerFormPost=async(req,res)=>{
    var name= req.body.name;
    var fname= req.body.fname;
    var vname= req.body.vname;
    var nid= req.body.nid;
    var mnum= req.body.mnum;
    var ptype= req.body.ptype;
    var pname= req.body.pname;
    var date= req.body.date;
    var block= req.body.block;
    var saooname= req.body.saooname;
    var pnum= req.body.pnum;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await trainedFarmer.create({
        name: name,
        fname:fname,
        vname:vname,
        nid:nid,
        mnum:mnum,
        ptype:ptype,
        pname:pname,
        date:date,
        block:block,
        saooname:saooname,
        pnum:pnum,
        year:year,
        upazilla_id:user_id
    });
    await initialTrial.create({
        name: name,
        fname:fname,
        vname:vname,
        nid:nid,
        mnum:mnum,
        ptype:ptype,
        pname:pname,
        block:block,
        saooname:saooname,
        pnum:pnum,
        year:year,
        upazilla_id:user_id
    });
    await finalTrial.create({
        name: name,
        fname:fname,
        vname:vname,
        nid:nid,
        mnum:mnum,
        ptype:ptype,
        pname:pname,
        year:year,
        upazilla_id:user_id
    })
    
        
        .then(data => {
            res.redirect('/upazilla/trainedFarmer');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
module.exports.trainedFarmerEdit=async(req,res)=>{
    var id=req.params.id;
    console.log('id',id);
    res.render('upazilla/trainedFarmer/trainedFarmerForm', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.trainedFarmerDelete=async(req,res)=>{
    var name= req.body.name;
    var fname= req.body.fname;
    var vname= req.body.vname;
    var nid= req.body.nid;
    var mnum= req.body.mnum;
    var ptype= req.body.ptype;
    var pname= req.body.pname;
    var date= req.body.date;
    var block= req.body.block;
    var saooname= req.body.saooname;
    var pnum= req.body.pnum;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await trainedFarmer.create({
        name: name,
        fname:fname,
        vname:vname,
        nid:nid,
        mnum:mnum,
        ptype:ptype,
        pname:pname,
        date:date,
        block:block,
        saooname:saooname,
        pnum:pnum,
        year:year,
        upazilla_id:user_id
    });
    await initialTrial.create({
        name: name,
        fname:fname,
        vname:vname,
        nid:nid,
        mnum:mnum,
        ptype:ptype,
        pname:pname,
        block:block,
        saooname:saooname,
        pnum:pnum,
        year:year,
        upazilla_id:user_id
    });
    await finalTrial.create({
        name: name,
        fname:fname,
        vname:vname,
        nid:nid,
        mnum:mnum,
        ptype:ptype,
        pname:pname,
        year:year,
        upazilla_id:user_id
    })
    
        
        .then(data => {
            res.redirect('/upazilla/trainedFarmer');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
//trainedFarmer controller end

//initialTrial controller
module.exports.initialTrial=async(req,res)=>{
    await initialTrial.findAll({
        where: {upazilla: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('upazilla/initialTrial/initialTrial', { title: 'প্রদর্শনীর প্রাথমিক প্রতিবেদন',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/initialTrial/initialTrial', { title: 'প্রদর্শনীর প্রাথমিক প্রতিবেদন',success:'', records: err });
    })
     
    //  records:result

};

module.exports.initialTrialYear=async(req,res)=>{
    await initialTrial.findAll({
        where: {year: req.body.year,upazilla_id: req.session.user_id}
    })
    .then(data => {
        res.render('upazilla/initialTrial/initialTrialTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('upazilla/initialTrial/initialTrialYear', { title: 'প্রদর্শনীর প্রাথমিক প্রতিবেদন',success:'', records: err });
    })

};

module.exports.initialTrialForm=async(req,res)=>{
    res.render('upazilla/initialTrial/initialTrialForm', { title: 'প্রদর্শনীর প্রাথমিক প্রতিবেদন',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.initialTrialFormPost=async(req,res)=>{
    var cdistribution= req.body.cdistribution;
    var pdistribution= req.body.pdistribution;
    var breedname= req.body.breedname;
    var source= req.body.source;
    var trialsize= req.body.trialsize;
    var trialdate= req.body.trialdate;

    await initialTrial.create({
        cdistribution: cdistribution,
        pdistribution:pdistribution,
        breedname:breedname,
        source:source,
        trialsize:trialsize,
        trialdate:trialdate,
    });
    await finalTrial.create({
        cdistribution: cdistribution,
        pdistribution:pdistribution,
        breedname:breedname,
        source:source,
        trialsize:trialsize,
        trialdate:trialdate,
    })
    
        
        .then(data => {
            res.redirect('/upazilla/initialTrial');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
module.exports.initialTrialEdit=async(req,res)=>{
    res.render('upazilla/initialTrial/initialTrialForm', { title: 'প্রদর্শনীর প্রাথমিক প্রতিবেদন',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.initialTrialDelete=async(req,res)=>{
    var cdistribution= req.body.cdistribution;
    var pdistribution= req.body.pdistribution;
    var breedname= req.body.breedname;
    var source= req.body.source;
    var trialsize= req.body.trialsize;
    var trialdate= req.body.trialdate;

    await initialTrial.create({
        cdistribution: cdistribution,
        pdistribution:pdistribution,
        breedname:breedname,
        source:source,
        trialsize:trialsize,
        trialdate:trialdate,
    });
    await finalTrial.create({
        cdistribution: cdistribution,
        pdistribution:pdistribution,
        breedname:breedname,
        source:source,
        trialsize:trialsize,
        trialdate:trialdate,
    })
    
        
        .then(data => {
            res.redirect('/upazilla/initialTrial');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
//initialTrial controller end

//finalTrial controller
module.exports.finalTrial=async(req,res)=>{
    await finalTrial.findAll({
        where: {upazilla: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('upazilla/finalTrial/finalTrial', { title: 'প্রদর্শনীর চূড়ান্ত প্রতিবেদন',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/finalTrial/finalTrial', { title: 'প্রদর্শনীর চূড়ান্ত প্রতিবেদন',success:'', records: err });
    })
     
    //  records:result

};

module.exports.finalTrialYear=async(req,res)=>{
    await finalTrial.findAll({
        where: {year: req.body.year,upazilla_id: req.session.user_id}
    })
    .then(data => {
        res.render('upazilla/finalTrial/finalTrialTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('upazilla/finalTrial/finalTrialYear', { title: 'প্রদর্শনীর চূড়ান্ত প্রতিবেদন',success:'', records: err });
    })

};

module.exports.finalTrialForm=async(req,res)=>{
    res.render('upazilla/finalTrial/finalTrialForm', { title: 'প্রদর্শনীর চূড়ান্ত প্রতিবেদন',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.finalTrialFormPost=async(req,res)=>{
    var cdate= req.body.cdate;
    var production= req.body.production;
    var folon= req.body.folon;
    var bij= req.body.bij;
    var comment= req.body.comment;

    await finalTrial.create({
        cdate: cdate,
        production:production,
        folon:folon,
        bij:bij,
        comment:comment,
    })
    
        
        .then(data => {
            res.redirect('/upazilla/finalTrial');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
module.exports.finalTrialEdit=async(req,res)=>{
    res.render('upazilla/finalTrial/finalTrialForm', { title: 'প্রদর্শনীর চূড়ান্ত প্রতিবেদন',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.finalTrialDelete=async(req,res)=>{
    var cdate= req.body.cdate;
    var production= req.body.production;
    var folon= req.body.folon;
    var bij= req.body.bij;
    var comment= req.body.comment;

    await finalTrial.create({
        cdate: cdate,
        production:production,
        folon:folon,
        bij:bij,
        comment:comment,
    })
    
        
        .then(data => {
            res.redirect('/upazilla/finalTrial');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
//finalTrial controller end

//trialProgress controller
module.exports.trialProgress=async(req,res)=>{
    await trialProgress.findAll({
        where: {upazilla: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('upazilla/trialProgress/trialProgress', { title: 'প্রদর্শনীর অগ্রগতির প্রতিবেদন',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/trialProgress/trialProgress', { title: 'প্রদর্শনীর অগ্রগতির প্রতিবেদন',success:'', records: err });
    })
     
    //  records:result

};

module.exports.trialProgressYear=async(req,res)=>{
    await trialProgress.findAll({
        where: {year: req.body.year,upazilla_id: req.session.user_id}
    })
    .then(data => {
        res.render('upazilla/trialProgress/trialProgressTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('upazilla/trialProgress/trialProgressYear', { title: 'প্রদর্শনীর অগ্রগতির প্রতিবেদন',success:'', records: err });
    })

};

module.exports.trialProgressForm=async(req,res)=>{
    res.render('upazilla/trialProgress/trialProgressForm', { title: 'প্রদর্শনীর অগ্রগতির প্রতিবেদন',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.trialProgressFormPost=async(req,res)=>{
    var name= req.body.name;
    var boraddo= req.body.boraddo;
    var done= req.body.done;
    var breed= req.body.breed;
    var source= req.body.source;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await trialProgress.create({
        name: name,
        boraddo:boraddo,
        done:done,
        breed:breed,
        source:source,
        year:year,
        upazilla_id:user_id,
    })
    
        
        .then(data => {
            res.redirect('/upazilla/trialProgress');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
module.exports.trialProgressEdit=async(req,res)=>{
    res.render('upazilla/trialProgress/trialProgressForm', { title: 'প্রদর্শনীর অগ্রগতির প্রতিবেদন',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.trialProgressDelete=async(req,res)=>{
    var name= req.body.name;
    var boraddo= req.body.boraddo;
    var done= req.body.done;
    var breed= req.body.breed;
    var source= req.body.source;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await trialProgress.create({
        name: name,
        boraddo:boraddo,
        done:done,
        breed:breed,
        source:source,
        year:year,
        upazilla_id:user_id,
    })
    
        
        .then(data => {
            res.redirect('/upazilla/trialProgress');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
//trialProgress controller end

//cropExpansion controller
module.exports.cropExpansion=async(req,res)=>{
    await cropExpansion.findAll({
        where: {upazilla: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('upazilla/cropExpansion/cropExpansion', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/cropExpansion/cropExpansion', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',success:'', records: err });
    })
     
    //  records:result

};

module.exports.cropExpansionYear=async(req,res)=>{
    await cropExpansion.findAll({
        where: {year: req.body.year,upazilla_id: req.session.user_id}
    })
    .then(data => {
        res.render('upazilla/cropExpansion/cropExpansionTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('upazilla/cropExpansion/cropExpansionYear', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',success:'', records: err });
    })

};

module.exports.cropExpansionForm=async(req,res)=>{
    res.render('upazilla/cropExpansion/cropExpansionForm', { title: 'প্রকল্প এলাকার ফসল আবাদ অগ্রগতি',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.cropExpansionFormPost=async(req,res)=>{ 
    var name= req.body.name;
    var areaShotero= req.body.areaShotero;
    var productionShotero= req.body.productionShotero;
    var areaAtharo= req.body.areaAtharo;
    var productionAtharo= req.body.productionAtharo;
    var areaUnish= req.body.areaUnish;
    var productionUnish= req.body.productionUnish;
    var areaBish= req.body.areaBish;
    var productionBish= req.body.productionBish;
    var areaEkush= req.body.areaEkush;
    var productionEkush= req.body.productionEkush;
    var areaBaish= req.body.areaBaish;
    var productionBaish= req.body.productionBaish;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await cropExpansion.create({
        name: name,
        areaShotero:areaShotero,
        productionShotero:productionShotero,
        areaAtharo:areaAtharo,
        productionAtharo:productionAtharo,
        areaUnish:areaUnish,
        productionUnish:productionUnish,
        areaBish:areaBish,
        productionBish:productionBish,
        areaEkush:areaEkush,
        productionEkush:productionEkush,
        areaBaish:areaBaish,
        productionBaish:productionBaish,
        year:year,
        upazilla_id:user_id
    })
    
        
        .then(data => {
            res.redirect('/upazilla/cropExpansion');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
module.exports.cropExpansionEdit=async(req,res)=>{
    res.render('upazilla/cropExpansion/cropExpansionForm', { title: 'প্রকল্প এলাকার ফসল আবাদ অগ্রগতি',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.cropExpansionDelete=async(req,res)=>{ 
    var name= req.body.name;
    var areaShotero= req.body.areaShotero;
    var productionShotero= req.body.productionShotero;
    var areaAtharo= req.body.areaAtharo;
    var productionAtharo= req.body.productionAtharo;
    var areaUnish= req.body.areaUnish;
    var productionUnish= req.body.productionUnish;
    var areaBish= req.body.areaBish;
    var productionBish= req.body.productionBish;
    var areaEkush= req.body.areaEkush;
    var productionEkush= req.body.productionEkush;
    var areaBaish= req.body.areaBaish;
    var productionBaish= req.body.productionBaish;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await cropExpansion.create({
        name: name,
        areaShotero:areaShotero,
        productionShotero:productionShotero,
        areaAtharo:areaAtharo,
        productionAtharo:productionAtharo,
        areaUnish:areaUnish,
        productionUnish:productionUnish,
        areaBish:areaBish,
        productionBish:productionBish,
        areaEkush:areaEkush,
        productionEkush:productionEkush,
        areaBaish:areaBaish,
        productionBaish:productionBaish,
        year:year,
        upazilla_id:user_id
    })
    
        
        .then(data => {
            res.redirect('/upazilla/cropExpansion');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
//cropExpansion controller end

//breedExpansion controller
module.exports.breedExpansion=async(req,res)=>{
    await breedExpansion.findAll({
        where: {upazilla: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('upazilla/breedExpansion/breedExpansion', { title: 'প্রকল্প এলাকার ফসলের জাত সম্প্রসারণ',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/breedExpansion/breedExpansion', { title: 'প্রকল্প এলাকার ফসলের জাত সম্প্রসারণ',success:'', records: err });
    })
     
    //  records:result

};

module.exports.breedExpansionYear=async(req,res)=>{
    await breedExpansion.findAll({
        where: {year: req.body.year,upazilla_id: req.session.user_id}
    })
    .then(data => {
        res.render('upazilla/breedExpansion/breedExpansionTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('upazilla/breedExpansion/breedExpansionYear', { title: 'প্রকল্প এলাকার ফসলের জাত সম্প্রসারণ',success:'', records: err });
    })

};

module.exports.breedExpansionForm=async(req,res)=>{
    res.render('upazilla/breedExpansion/breedExpansionForm', { title: 'প্রকল্প এলাকার ফসলের জাত সম্প্রসারণ',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.breedExpansionFormPost=async(req,res)=>{
    var name= req.body.name;
    var bname= req.body.bname;
    var areaShotero= req.body.areaShotero;
    var productionShotero= req.body.productionShotero;
    var areaAtharo= req.body.areaAtharo;
    var productionAtharo= req.body.productionAtharo;
    var areaUnish= req.body.areaUnish;
    var productionUnish= req.body.productionUnish;
    var areaBish= req.body.areaBish;
    var productionBish= req.body.productionBish;
    var areaEkush= req.body.areaEkush;
    var productionEkush= req.body.productionEkush;
    var areaBaish= req.body.areaBaish;
    var productionBaish= req.body.productionBaish;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await breedExpansion.create({
        name: name,
        bname: bname,
        areaShotero:areaShotero,
        productionShotero:productionShotero,
        areaAtharo:areaAtharo,
        productionAtharo:productionAtharo,
        areaUnish:areaUnish,
        productionUnish:productionUnish,
        areaBish:areaBish,
        productionBish:productionBish,
        areaEkush:areaEkush,
        productionEkush:productionEkush,
        areaBaish:areaBaish,
        productionBaish:productionBaish,
        year:year,
        upazilla_id:user_id
    })
    
        
        .then(data => {
            res.redirect('/upazilla/breedExpansion');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
module.exports.breedExpansionEdit=async(req,res)=>{
    res.render('upazilla/breedExpansion/breedExpansionForm', { title: 'প্রকল্প এলাকার ফসলের জাত সম্প্রসারণ',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.breedExpansionDelete=async(req,res)=>{
    var name= req.body.name;
    var bname= req.body.bname;
    var areaShotero= req.body.areaShotero;
    var productionShotero= req.body.productionShotero;
    var areaAtharo= req.body.areaAtharo;
    var productionAtharo= req.body.productionAtharo;
    var areaUnish= req.body.areaUnish;
    var productionUnish= req.body.productionUnish;
    var areaBish= req.body.areaBish;
    var productionBish= req.body.productionBish;
    var areaEkush= req.body.areaEkush;
    var productionEkush= req.body.productionEkush;
    var areaBaish= req.body.areaBaish;
    var productionBaish= req.body.productionBaish;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await breedExpansion.create({
        name: name,
        bname: bname,
        areaShotero:areaShotero,
        productionShotero:productionShotero,
        areaAtharo:areaAtharo,
        productionAtharo:productionAtharo,
        areaUnish:areaUnish,
        productionUnish:productionUnish,
        areaBish:areaBish,
        productionBish:productionBish,
        areaEkush:areaEkush,
        productionEkush:productionEkush,
        areaBaish:areaBaish,
        productionBaish:productionBaish,
        year:year,
        upazilla_id:user_id
    })
    
        
        .then(data => {
            res.redirect('/upazilla/breedExpansion');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
//breedExpansion controller end

//technologyExpansion controller
module.exports.technologyExpansion=async(req,res)=>{
    await technologyExpansion.findAll({
        where: {upazilla: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('upazilla/technologyExpansion/technologyExpansion', { title: 'প্রকল্প এলাকার প্রযুক্তি সম্প্রসারণ',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/technologyExpansion/technologyExpansion', { title: 'প্রকল্প এলাকার প্রযুক্তি সম্প্রসারণ',success:'', records: err });
    })
     
    //  records:result

};

module.exports.technologyExpansionYear=async(req,res)=>{
    await technologyExpansion.findAll({
        where: {year: req.body.year,upazilla_id: req.session.user_id}
    })
    .then(data => {
        res.render('upazilla/technologyExpansion/technologyExpansionTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('upazilla/technologyExpansion/technologyExpansionYear', { title: 'প্রকল্প এলাকার প্রযুক্তি সম্প্রসারণ',success:'', records: err });
    })

};

module.exports.technologyExpansionForm=async(req,res)=>{
    res.render('upazilla/technologyExpansion/technologyExpansionForm', { title: 'প্রকল্প এলাকার প্রযুক্তি সম্প্রসারণ',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.technologyExpansionFormPost=async(req,res)=>{
    var name= req.body.name;
    var areaShotero= req.body.areaShotero;
    var productionShotero= req.body.productionShotero;
    var areaAtharo= req.body.areaAtharo;
    var productionAtharo= req.body.productionAtharo;
    var areaUnish= req.body.areaUnish;
    var productionUnish= req.body.productionUnish;
    var areaBish= req.body.areaBish;
    var productionBish= req.body.productionBish;
    var areaEkush= req.body.areaEkush;
    var productionEkush= req.body.productionEkush;
    var areaBaish= req.body.areaBaish;
    var productionBaish= req.body.productionBaish;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await technologyExpansion.create({
        name: name,
        areaShotero:areaShotero,
        productionShotero:productionShotero,
        areaAtharo:areaAtharo,
        productionAtharo:productionAtharo,
        areaUnish:areaUnish,
        productionUnish:productionUnish,
        areaBish:areaBish,
        productionBish:productionBish,
        areaEkush:areaEkush,
        productionEkush:productionEkush,
        areaBaish:areaBaish,
        productionBaish:productionBaish,
        year:year,
        upazilla_id:user_id
    })
    
    
        
        .then(data => {
            res.redirect('/upazilla/technologyExpansion');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
module.exports.technologyExpansionEdit=async(req,res)=>{
    res.render('upazilla/technologyExpansion/technologyExpansionForm', { title: 'প্রকল্প এলাকার প্রযুক্তি সম্প্রসারণ',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.technologyExpansionDelete=async(req,res)=>{
    var name= req.body.name;
    var areaShotero= req.body.areaShotero;
    var productionShotero= req.body.productionShotero;
    var areaAtharo= req.body.areaAtharo;
    var productionAtharo= req.body.productionAtharo;
    var areaUnish= req.body.areaUnish;
    var productionUnish= req.body.productionUnish;
    var areaBish= req.body.areaBish;
    var productionBish= req.body.productionBish;
    var areaEkush= req.body.areaEkush;
    var productionEkush= req.body.productionEkush;
    var areaBaish= req.body.areaBaish;
    var productionBaish= req.body.productionBaish;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await technologyExpansion.create({
        name: name,
        areaShotero:areaShotero,
        productionShotero:productionShotero,
        areaAtharo:areaAtharo,
        productionAtharo:productionAtharo,
        areaUnish:areaUnish,
        productionUnish:productionUnish,
        areaBish:areaBish,
        productionBish:productionBish,
        areaEkush:areaEkush,
        productionEkush:productionEkush,
        areaBaish:areaBaish,
        productionBaish:productionBaish,
        year:year,
        upazilla_id:user_id
    })
    
    
        
        .then(data => {
            res.redirect('/upazilla/technologyExpansion');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
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
        
        res.render('upazilla/abadiJomi/abadiJomi', { title: 'আবাদী জমি ও ফসল উৎপাদন',success:'', seventeen: seventeen,eighteen: eighteen,nineteen: nineteen,twenty: twenty,twentyOne: twentyOne,twentyTwo: twentyTwo });
        // var men=seventeen.purush;
        // console.log("seventeen,",req.typeof(men));
    }
    catch(err){
        res.render('upazilla/abadiJomi/abadiJomi', { title: 'আবাদী জমি ও ফসল উৎপাদন',success:'', records: err });
    }
   

     
    //  records:result

};

module.exports.abadiJomiYear=async(req,res)=>{
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
        res.render('upazilla/abadiJomi', {seventeen: seventeen,eighteen: eighteen,seventeen: seventeen,nineteen: nineteen,twenty: twenty,twentyOne: twentyOne,twentyTwo: twentyTwo} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('upazilla/abadiJomi/abadiJomiYear', { title: 'আবাদী জমি ও ফসল উৎপাদন',success:'', records: err });
    })

};

module.exports.abadiJomiForm=async(req,res)=>{
    res.render('upazilla/abadiJomi/abadiJomiForm', { title: 'আবাদী জমি ও ফসল উৎপাদন',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.abadiJomiFormPost=async(req,res)=>{
    var ayoton= parseInt(req.body.ayoton);
    var purush= parseInt(req.body.purush);
    var mohila= parseInt(req.body.mohila);
    var total= purush+mohila;
    var poribar= parseInt(req.body.poribar);
    var block= parseInt(req.body.block);
    var abadjoggo= parseInt(req.body.abadjoggo);
    var abadi= parseInt(req.body.abadi);
    var ek= parseInt(req.body.ek);
    var dui= parseInt(req.body.dui);
    var tin= parseInt(req.body.tin);
    var mot= ek+dui+tin;
    var nibirota=((ek+dui*2+tin*3)*100)/abadi ;
    var potito=abadjoggo- abadi;
    var cholti= parseInt(req.body.cholti);
    var year =req.body.year;
    var user_id =req.body.user_id;

    await abadiJomi.create({
        ayoton: ayoton,
        purush:purush,
        mohila:mohila,
        total:total,
        poribar:poribar,
        block:block,
        abadjoggo:abadjoggo,
        abadi:abadi,
        ek:ek,
        dui:dui,
        tin:tin,
        mot:mot,
        nibirota:nibirota,
        potito:potito,
        cholti:cholti,
        year:year,
        upazilla_id:user_id
    })
    
    
        
        .then(data => {
            res.redirect('/upazilla/abadiJomi');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
module.exports.abadiJomiEdit=async(req,res)=>{
    res.render('upazilla/abadiJomi/abadiJomiForm', { title: 'আবাদী জমি ও ফসল উৎপাদন',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.abadiJomiDelete=async(req,res)=>{
    var name= req.body.name;
    var areaShotero= req.body.areaShotero;
    var productionShotero= req.body.productionShotero;
    var areaAtharo= req.body.areaAtharo;
    var productionAtharo= req.body.productionAtharo;
    var areaUnish= req.body.areaUnish;
    var productionUnish= req.body.productionUnish;
    var areaBish= req.body.areaBish;
    var productionBish= req.body.productionBish;
    var areaEkush= req.body.areaEkush;
    var productionEkush= req.body.productionEkush;
    var areaBaish= req.body.areaBaish;
    var productionBaish= req.body.productionBaish;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await abadiJomi.create({
        name: name,
        areaShotero:areaShotero,
        productionShotero:productionShotero,
        areaAtharo:areaAtharo,
        productionAtharo:productionAtharo,
        areaUnish:areaUnish,
        productionUnish:productionUnish,
        areaBish:areaBish,
        productionBish:productionBish,
        areaEkush:areaEkush,
        productionEkush:productionEkush,
        areaBaish:areaBaish,
        productionBaish:productionBaish,
        year:year,
        upazilla_id:user_id
    })
    
    
        
        .then(data => {
            res.redirect('/upazilla/abadiJomi');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
//abadiJomi controller end
