const express = require('express');
const mongoose = require('mongoose');
const app = express();
const mongoURI = 'mongodb://localhost:27017/flaovorsexpress';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Database connected');

        const fetched_data = await mongoose.connection.db.collection("food_items");
        const data = await fetched_data.find({}).toArray();

        const foodCategory = await mongoose.connection.db.collection("food_category");
        const catData = await foodCategory.find({}).toArray();

        global.food_items = data;
        global.foodCategory = catData;

    } catch (error) {
        console.error('Error connecting to database:', error);
    }
};

module.exports = mongoDB;


module.exports = mongoDB;