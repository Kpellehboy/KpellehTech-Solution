const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const port = 5500


const app = express();

app.use(express.static(__dirname))

app.use(express.urlencoded({ extended: true }))

mongoose.connect("mongodb://127.0.0.1:27017/contact-form")
const db = mongoose.connection
db.once('open', () => {
    console.log("Mongoose connection sucessful")
})

const userSchema = new mongoose.Schema({
    Name: String,
    Email: String,
    Number: String,
    Message: String,
})

const Users = mongoose.model("data", userSchema)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,"contact.html"))
})


app.post('/post', async (req, res) => {
    try {
        const { name, email, number, message } = req.body;
        const user = new Users({ Name: name, Email: email, Number: number, Message: message });
        await user.save();
        console.log(user);
        res.send("The form has been successful!");
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while saving the form data.");
    }
});

app.listen(port, () => {
    console.log("Server Started!")
})