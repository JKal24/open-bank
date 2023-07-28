import express from 'express';
const app = express();

import cors from 'cors';
import routes from './routes.js'

app.use(cors());
app.use(express.json());

app.use(routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`running on ${PORT}`);
});