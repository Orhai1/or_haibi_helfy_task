import express from 'express'
import cors from 'cors'
import tasksRoutes from './routes/tasksRoutes.js'
import {notFound, errorHandler} from './middleware/errors.js'

const app = express();
const PORT= 4000;

app.use(cors());
app.use(express.json());

app.use('/api/tasks', tasksRoutes)

app.use(notFound);
app.use(errorHandler);


app.listen(PORT, () => console.log("listening"));