import express from 'express';
const app = express();
import * as dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import routes from './routes.js';
import ErrorHandler from './controllers/error.js';
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(ErrorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`running on ${PORT}`);
});
//# sourceMappingURL=app.js.map