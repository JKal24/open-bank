import express from 'express';
const app = express();
import cors from 'cors';
import routes from './routes.js';
import ErrorHandler from './controllers/error.js';
import { addItemToDB } from './services/db/bank.js';
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(ErrorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`running on ${PORT}`);
});
const testFn = () => {
    const item = {
        item_id: "0",
        access_token: "0",
        user_id: "0",
        institution_id: "0",
        institution_name: "0"
    };
    addItemToDB(item);
};
testFn();
//# sourceMappingURL=app.js.map