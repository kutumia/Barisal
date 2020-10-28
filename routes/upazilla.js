const express = require("express");
const router = express.Router();
// const { Router } = require("express");
const app=express();

const {upazillasignup,upazillasignuppost,logout,allupazilla,upazillalogin,upazillaloginpost,upazillaDashboard,
    trainedFarmer,trainedFarmerYear,trainedFarmerForm,trainedFarmerFormPost,initialTrial,initialTrialYear,initialTrialForm,initialTrialFormPost,
    finalTrial,finalTrialYear,finalTrialForm,finalTrialFormPost,trialProgress,trialProgressYear,trialProgressForm,trialProgressFormPost,
    cropExpansion,cropExpansionYear,cropExpansionForm,cropExpansionFormPost,breedExpansion,breedExpansionYear,breedExpansionForm,breedExpansionFormPost,
    technologyExpansion,technologyExpansionYear,technologyExpansionForm,technologyExpansionFormPost,
    trainedFarmerEdit,trainedFarmerDelete,initialTrialEdit,initialTrialDelete,finalTrialEdit,finalTrialDelete,
    trialProgressEdit,trialProgressDelete,cropExpansionEdit,cropExpansionDelete,breedExpansionEdit,breedExpansionDelete,technologyExpansionEdit,technologyExpansionDelete,
    abadiJomi,abadiJomiYear,abadiJomiForm,abadiJomiFormPost,abadiJomiEdit,abadiJomiDelete} = require('../controllers/upazilla.controller');
router.get('/',allupazilla);
router.get('/login',upazillalogin);
router.post('/logins',upazillaloginpost);
router.get('/dashboard',upazillaDashboard);

router.get('/signup',upazillasignup);
router.post('/signups',upazillasignuppost);

router.get('/logout',logout);

router.get('/trainedFarmer',trainedFarmer);
router.post('/trainedFarmerYear',trainedFarmerYear);
router.get('/trainedFarmerForm',trainedFarmerForm);
router.post('/trainedFarmerFormPost',trainedFarmerFormPost);
router.get('/trainedFarmerEdit/:id',trainedFarmerEdit);
router.post('/trainedFarmerDelete/:id',trainedFarmerDelete);

router.get('/initialTrial',initialTrial);
router.post('/initialTrialYear',initialTrialYear);
router.get('/initialTrialForm',initialTrialForm);
router.post('/initialTrialFormPost',initialTrialFormPost);
router.get('/initialTrialEdit/:id',initialTrialEdit);
router.post('/initialTrialDelete/:id',initialTrialDelete);

router.get('/finalTrial',finalTrial);
router.post('/finalTrialYear',finalTrialYear);
router.get('/finalTrialForm',finalTrialForm);
router.post('/finalTrialFormPost',finalTrialFormPost);
router.get('/finalTrialEdit/:id',finalTrialEdit);
router.post('/finalTrialDelete/:id',finalTrialDelete);

router.get('/trialProgress',trialProgress);
router.post('/trialProgressYear',trialProgressYear);
router.get('/trialProgressForm',trialProgressForm);
router.post('/trialProgressFormPost',trialProgressFormPost);
router.get('/trialProgressEdit/:id',trialProgressEdit);
router.post('/trialProgressDelete/:id',trialProgressDelete);

router.get('/cropExpansion',cropExpansion);
router.post('/cropExpansionYear',cropExpansionYear);
router.get('/cropExpansionForm',cropExpansionForm);
router.post('/cropExpansionFormPost',cropExpansionFormPost);
router.get('/cropExpansionEdit/:id',cropExpansionEdit);
router.post('/cropExpansionDelete/:id',cropExpansionDelete);

router.get('/breedExpansion',breedExpansion);
router.post('/breedExpansionYear',breedExpansionYear);
router.get('/breedExpansionForm',breedExpansionForm);
router.post('/breedExpansionFormPost',breedExpansionFormPost);
router.get('/breedExpansionEdit/:id',breedExpansionEdit);
router.post('/breedExpansionDelete/:id',breedExpansionDelete);

router.get('/technologyExpansion',technologyExpansion);
router.post('/technologyExpansionYear',technologyExpansionYear);
router.get('/technologyExpansionForm',technologyExpansionForm);
router.post('/technologyExpansionFormPost',technologyExpansionFormPost);
router.get('/technologyExpansionEdit/:id',technologyExpansionEdit);
router.post('/technologyExpansionDelete/:id',technologyExpansionDelete);

router.get('/abadiJomi',abadiJomi);
router.post('/abadiJomiYear',abadiJomiYear);
router.get('/abadiJomiForm',abadiJomiForm);
router.post('/abadiJomiFormPost',abadiJomiFormPost);
router.get('/abadiJomiEdit/:id',abadiJomiEdit);
router.post('/abadiJomiDelete/:id',abadiJomiDelete);


module.exports = router;