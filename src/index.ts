import express from 'express';
import dotenv from 'dotenv';
import user_router from './routes/user';
import person_router from './routes/person';

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(express.json()); // parse incoming request with JSON payload
app.use(express.urlencoded({extended: true})); // parse incoming request with URL-encoded payload

app.use('/api', user_router);
app.use('/api', person_router);

function onStart(){
    console.log(`Server running on port ${port}`);
}

app.listen(port, onStart);

export default app;