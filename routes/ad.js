const express = require("express");
const router = express.Router();
// const { Router } = require("express");
const app=express();

const {adsignup,adsignuppost,allupazilla,adlogin,adloginpost,adDashboard,
    trainedFarmer,trainedFarmerFilter,initialTrial,initialTrialFilter,
    finalTrial,finalTrialFilter,trialProgress,trialProgressFilter,
    cropExpansion,cropExpansionFilter,breedExpansion,breedExpansionFilter,
    technologyExpansion,technologyExpansionFilter,
    abadiJomi,abadiJomiFilter} = require('../controllers/ad.controller');
router.get('/',allupazilla);
router.get('/login',adlogin);
router.post('/logins',adloginpost);
router.get('/dashboard',adDashboard);

router.get('/signup',adsignup);
router.post('/signups',adsignuppost);

router.get('/trainedFarmer',trainedFarmer);
router.post('/trainedFarmerFilter',trainedFarmerFilter);

router.get('/initialTrial',initialTrial);
router.post('/initialTrialFilter',initialTrialFilter);

router.get('/finalTrial',finalTrial);
router.post('/finalTrialFilter',finalTrialFilter);

router.get('/trialProgress',trialProgress);
router.post('/trialProgressFilter',trialProgressFilter);

router.get('/cropExpansion',cropExpansion);
router.post('/cropExpansionFilter',cropExpansionFilter);

router.get('/breedExpansion',breedExpansion);
router.post('/breedExpansionFilter',breedExpansionFilter);

router.get('/technologyExpansion',technologyExpansion);
router.post('/technologyExpansionFilter',technologyExpansionFilter);

router.get('/abadiJomi',abadiJomi);
router.post('/abadiJomiFilter',abadiJomiFilter);


module.exports = router;