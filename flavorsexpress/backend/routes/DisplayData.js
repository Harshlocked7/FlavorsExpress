const express = require('express')
const router = express.Router()


router.post('/foodData', async (req, res) => {
    try {
        if (!global.food_items) {
            await mongoDB(); // Ensure data is fetched before accessing it
        }
        res.send([global.food_items, global.foodCategory]);
    } catch (error) {
        console.error(error.message);
        res.send("Server error");
    }
});
module.exports = router;