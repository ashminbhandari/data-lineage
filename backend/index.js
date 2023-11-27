const express = require('express');
const LineageDB = require('./lineagedb');

const app = express();
const port = 3001;
const db = new LineageDB('./db/se641-lineage.db');

// routes
app.get('/', (req, res) => {
    res.send('data lineage root page');
    //TODO
});

//get all events from between sdate and the current date
app.get('/api/lineage/:sdate', async (req, res, next) => {
    const start_date = req.params.sdate;
    const query = "SELECT * FROM LineageEvent WHERE timestamp >= ? AND timestamp <= CURRENT_TIMESTAMP";

    try {
        const events = await db.query(query, [start_date]);
        res.status(200).json(events);
    }
    catch (error) {
        next(error);
    }
});

//get events related to a specific vehicle
app.get('/api/lineage/vehicle/:vin', async (req, res, next) => {
    const vehicle_vin = req.params.vin;
    const query = ( `SELECT le.*
                    FROM LineageEvent le
                    JOIN DataEntity de
                    ON le.beforeEntityID = de.entityID OR le.afterEntityID = de.entityID
                    WHERE de.vehicleVIN = ?`);

    try {
        const events = await db.query(query, [vehicle_vin]);
        res.status(200).json(events);
    } catch (error) {
        next(error);
    }
});

// add a new lineage event
app.put('/api/lineage/event', async (req, res, next) => {
    const { timestamp, source, target, event, beforeEntity, afterEntity } = req.body;

    if (!timestamp || !source || !target || !event || !beforeEntity || !afterEntity) {
        return res.status(400).send('Missing required fields.');
    }

    try {
        await db.insert('LineageEvent', { timestamp, source, target, event, beforeEntity, afterEntity });
        res.status(200).send('Event added successfully');
    }
    catch (error) {
        next(error);
    }
});

// endpoint for external/3rd party systems (producers) to add new data
app.put('/api/lineage/create', async (req, res, next) => {
    const event = 'create';
    const target = 'DataEntity';
    const { timestamp, producer, data } = req.body;

    if (!timestamp || !producer || !data) {
        return res.status(400).send('Missing required fields.');
    }

    try {
        await db.insert('DataEntity', { timestamp, producer, data, target: 'DataEntity', event: 'create' });
        //TODO: also add a 'create' record in LineageEvent
        res.status(200).send('Event received successfully');
    }
    catch (error) {
        next(error);
    }
});

app.use(express.json());

// endpoints/middleware with 4 params are treated as error handlers
// generic catch-all error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message });
});

const server = app.listen(port, (req, res) => {
    console.log('DataLineage app server is running');
});
