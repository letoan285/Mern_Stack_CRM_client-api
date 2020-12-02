const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const userRouter = require('./src/routers/user.router');
const ticketRouter = require('./src/routers/ticket.router');
const handleError = require('./src/utils/errorHandler');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 3001;
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Mongodb connection
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});
if(process.env.NODE_ENV !== 'production'){
    const mDb = mongoose.connection;
    app.use(morgan('dev'));
    mDb.on('open', () => {
        console.log('MongoDB is Connected');
    });
    mDb.on('error', (error) => {
        console.log(error);
    });
}

app.use('/v1/api/users', userRouter);
app.use('/v1/api/tickets', ticketRouter);

app.use((req, res, next) => {
    const error = new Error('Resources not found ');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    handleError(error, res);
})

app.get('/', (req, res) => {
    res.json({message: 'success'});
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});