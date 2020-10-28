module.exports = (sequelize, Sequelize) => {
    const trainedFarmer = sequelize.define("trainedFarmer", {
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
      ptype: {
        type: Sequelize.STRING
      },
      pname: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING
      },
      block: {
        type: Sequelize.STRING
      },
      saooname: {
        type: Sequelize.STRING
      },
      pnum: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.STRING
      },
      upazilla_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return trainedFarmer;
  };