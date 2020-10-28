module.exports = (sequelize, Sequelize) => {
    const breedExpansion = sequelize.define("breedExpansion", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      name: {
        type: Sequelize.STRING
      },
      bname: {
        type: Sequelize.STRING
      },
      areaShotero: {
        type: Sequelize.STRING
      },
      productionShotero: {
        type: Sequelize.STRING
      },
      areaAtharo: {
        type: Sequelize.STRING
      },
      productionAtharo: {
        type: Sequelize.STRING
      },
      areaUnish: {
        type: Sequelize.STRING
      },
      productionUnish: {
        type: Sequelize.STRING
      },
      areaBish: {
        type: Sequelize.STRING
      },
      productionBish: {
        type: Sequelize.STRING
      },
      areaEkush: {
        type: Sequelize.STRING
      },
      productionEkush: {
        type: Sequelize.STRING
      },
      areaBaish: {
        type: Sequelize.STRING
      },
      productionBaish: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.STRING
      },
      upazilla_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return breedExpansion;
  };