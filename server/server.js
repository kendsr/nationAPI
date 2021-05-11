const dotenv = require('dotenv').config();
if (dotenv.error) {
    console.log(dotenv.parsed)
    throw dotenv.error;
}
const express = require('express');
const apiRouter = require('./routes');
const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use('/api', apiRouter);


app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});