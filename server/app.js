import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { PORT } from './env.js';

import routes from './src/routes/index.js';

import {
    notFoundErrorController,
    errorController,
} from './src/controllers/errorControllers/index.js';

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use(notFoundErrorController);

app.use(errorController);

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
