import express from 'express';
import dotenv from 'dotenv';

/* Inicializando dotenv */
dotenv.config();

const port = process.env.PORT || 3000;

/* Inicializando express */
const app = express();

app.get('/', (req, res) => {
    res.send("Backend");
})

app.listen(port, () => {
    console.log(`Backend running on port ${port}`);
});
