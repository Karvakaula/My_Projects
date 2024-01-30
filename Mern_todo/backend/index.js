const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/Todoroutes'); // Update the path based on your project structure
const cors = require('cors'); // Import cors module

const app = express();
const port = 3001;
const mongodb ='mongodb+srv://Leevi:Kuusipuu6@democluster.peyyb6w.mongodb.net/Todosdb'
app.use(cors());
// Connect to MongoDB
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err.message);
    });

// Middleware
const logger =(request, response, next) => {
    const date= new Date()
    const ldate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
    const log = `${ldate} : ${request.method} ${request.url} \n reguestbody: ${request.body}`
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    console.log(today);
    const content = log
    console.log(content)
    next()
}   
app.use(logger)
app.use(bodyParser.json());
app.use('/api', todoRoutes); // Mount the todo routes under the '/api' path

