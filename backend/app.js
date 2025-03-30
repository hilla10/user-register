import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import router from './routes/index.js';
const app = express();
import path from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use('/tmp/uploads', express.static(path.join(__dirname, 'tmp/uploads')));

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`the server is running on port ${port}`);
});

// leacturer@gmail.com  67745172
// teststudent@gmail.com	11111111
// testStudent1@mail.com 12345678
