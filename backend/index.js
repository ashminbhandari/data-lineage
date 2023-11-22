const express = require('express');
const { default: LineageDB } = require('./lineagedb');

const app = express();
const port = 3001;
const db = new LineageDB();

// routes
app.get('/', (req, res) => {
    res.send('data lineage root page');
});

//get all events from between sdate and the current date
app.get('/api/lineage/:sdate', (req, res, next) => {
    let start_date = req.params.sdate;
    //TODO
});

//get events related to a specific job 
app.get('/api/lineage/job/:name', (req, res, next) => {
    let job_name = req.params.name;
    //TODO
});

// add a new event
app.put('/api/lineage/event', (req, res, next) => {
    //TODO
    /* 
        confirm what values are required:
            - timestamp
            - producer
            - consumer
            - event type
            - input data
            - output data
            - job id
            - specific job instance/run id?
    */
});


// endpoints/middleware with 4 params are treated as error handlers
// generic catch-all error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', { error: err });
});

const server = app.listen(port, (req, res) => {
    console.log('DataLineage app server is running');
});
