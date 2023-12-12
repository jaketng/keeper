

const express = require("express");
const mongoose = require("mongoose");
const app = express();

uri = 'mongodb+srv://jakepb02:Andover101@testcluster.d03ektu.mongodb.net/?retryWrites=true&w=majority';

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.log(error);
    }
}

connect();

app.get("/api", (req, res) => {
    res.json({ "users": ["user1", "user2"] })
})

app.listen(5001, () => { console.log("Server started on port 5001") })