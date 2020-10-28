module.exports = (sequelize, Sequelize) => {
    const abadiJomi = sequelize.define("abadiJomi", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      ayoton: {
        type: Sequelize.INTEGER
      },
      purush: {
        type: Sequelize.INTEGER
      },
      mohila: {
        type: Sequelize.INTEGER
      },
      total: {
        type: Sequelize.INTEGER
      },
      poribar: {
        type: Sequelize.INTEGER
      },
      block: {
        type: Sequelize.INTEGER
      },
      abadjoggo: {
        type: Sequelize.INTEGER
      },
      abadi: {
        type: Sequelize.INTEGER
      },
      ek: {
        type: Sequelize.INTEGER
      },
      dui: {
        type: Sequelize.INTEGER
      },
      tin: {
        type: Sequelize.INTEGER
      },
      mot: {
        type: Sequelize.INTEGER
      },
      nibirota: {
        type: Sequelize.INTEGER
      },
      potito: {
        type: Sequelize.INTEGER
      },
      cholti: {
        type: Sequelize.INTEGER
      },
      year: {
        type: Sequelize.STRING
      },
      upazilla_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return abadiJomi;
  };