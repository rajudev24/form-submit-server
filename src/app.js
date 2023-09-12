const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const app = express()
app.use(cors())

// Parse Data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Create Schema 
const FormSubmitSchema = new Schema({
    name: { type: String, required: true },
    sector: { type: String, required: true },
    termsAgreed: { type: Boolean, required: true },
});
// Create Model
const FormSubmit = mongoose.model('FormSubmit', FormSubmitSchema);
app.get('/', async (req, res) => {
    const result = await FormSubmit.find({})
    res.send({
        status: 200,
        message: "Form Submitted Data Retived Successfully",
        data: result
    })
})
app.post('/submit', async (req, res) => {
    const data = req.body
    const form = new FormSubmit({
        name: data.name,
        sector: data.sector,
        termsAgreed: data.termsAgreed
    })
    await form.save()
    res.send({
        status: 200,
        message: "Form Submitted Successfully",
        data: form
    })

})
app.patch('/update/:id', async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    try {
        const updatedDocument = await FormSubmit.findByIdAndUpdate(
            id,
            updatedData,
            { new: true }
        );
        if (!updatedDocument) {
            return res.status(404).json({ error: 'The data not found' });
        }
        res.json({ message: 'Data updated successfully', updatedDocument });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating data' });
    }
});

module.exports = app;