
const mongoose = require('mongoose');
const app = require('./app')
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;

async function main() {
    try {
        await mongoose.connect(process.env.db_url).then(() => {
            console.log("Database Connection successfully established");
        });
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`)
        })
    } catch (err) {
        console.log('Failed to connect')
    }
}
main()
