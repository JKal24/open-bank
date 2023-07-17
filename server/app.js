require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const path = require('path');
const db = require('./data/database')

app.use(cors());
app.use(express.json());

app.use(routes);

if (process.env.MODE === "production") {
    app.use(express.static(path.join(__dirname, '../client/build')));
} 
else 
{
    app.use(express.static(path.join(__dirname, '../client/public')));
}

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '../client' , 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`running on ${PORT}`);
});

process.on('exit', cleanUp.bind(null))
process.on('SIGINT', cleanUp.bind(null))
process.on('SIGUSR1', cleanUp.bind(null))
process.on('SIGUSR2', cleanUp.bind(null))

function cleanUp(options, exitCode) {
    if (exitCode || exitCode === 0) console.log(exitCode);
    process.exit();
}