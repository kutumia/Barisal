module.exports = (sequelize, Sequelize) => {
    const finalTrial = sequelize.define("finalTrial", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      name: {
        type: Sequelize.STRING
      },
      fname: {
        type: Sequelize.STRING
      },
      vname: {
        type: Sequelize.STRING
      },
      nid: {
        type: Sequelize.STRING
      },
      mnum: {
        type: Sequelize.STRING
      },
      cdistribution: {
        type: Sequelize.STRING
      },
      pdistribution: {
        type: Sequelize.STRING
      },
      ptype: {
        type: Sequelize.STRING
      },
      pname: {
        type: Sequelize.STRING
      },
      breedname: {
        type: Sequelize.STRING
      },
      source: {
        type: Sequelize.STRING
      },
      trialsize: {
        type: Sequelize.STRING
      },
      trialdate: {
        type: Sequelize.STRING
      },
      cdate: {
        type: Sequelize.STRING
      },
      production: {
        type: Sequelize.STRING
      },
      folon: {
        type: Sequelize.STRING
      },
      bij: {
        type: Sequelize.STRING
      },
      comment: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.STRING
      },
      upazilla_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return finalTrial;
  };