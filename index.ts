import express, { Express } from 'express';
import dotenv from 'dotenv';
import { router as eventsRouter } from './src/routes/Event';
import cors from 'cors';
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(
	cors({
		origin: '*',
	})
);

app.use('/events', eventsRouter);

app.listen(port, () => {
	console.log(`Server is running at port ${port}`);
});
