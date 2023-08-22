import express from 'express';
const app = express();
import cors from 'cors';
import routes from './routes.js';
import ErrorHandler from './controllers/error.js';
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(ErrorHandler);
import { getBank } from './services/bank.js';
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`running on ${PORT}`);
});
const bankGetting = async () => {
    const bank = await getBank("1");
    // console.log(bank);
};
bankGetting();
//# sourceMappingURL=app.js.map