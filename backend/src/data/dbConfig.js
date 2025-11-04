import { Sequelize } from 'sequelize';

const isTest = process.env.NODE_ENV === 'test';
console.log("isTest:", isTest);

const sequelize = isTest
    ? new Sequelize({
        dialect: "sqlite",
        storage: ':memory',
        logging: false
    })
    : new Sequelize({
        dialect: 'sqlite',
        storage: process.env.DB_FILE,
        logging: false
    });

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connection has been established.");
    } catch (error) {
        console.log("Unable to connect to the database:", error);
    }
})();

const sync = (async () => {
    await sequelize.sync({ alter: true });
    console.log("All models were synchronized.");
})

export { sequelize, sync };