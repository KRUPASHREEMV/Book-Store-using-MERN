

import express from "express";
import mongoose from "mongoose";
import cors from "cors"; // <-- Import CORS
import { PORT, mongoDBURL } from "./config.js";
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Use the CORS middleware
app.use(cors()); // <-- Add this line

// Root route
app.get('/', (request, response) => {
    console.log(request);
    return response.status(200).send('Welcome to MERN Stack');
});

app.use('/books', booksRoute);

// Connect to MongoDB and start server
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });


