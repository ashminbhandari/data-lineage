import express, { query } from 'express';
import LineageDB from './lineagedb.js';
import cors from 'cors';
import {spawnSync} from 'child_process';
import bodyParser from 'body-parser';
import {regex_extract_tbl_names} from './util/util.js';
const app = express();
app.use(cors());

const port = 3001;
const db = new LineageDB('./db/se641-lineage.db');

const get_flat_lineage_from_query = (sqlQuery) => {
    const pythonProcess = spawnSync('python3', ["lineage_extract.py", sqlQuery]);
    const lineage = pythonProcess.stdout?.toString()?.trim();
    const lineage_json = JSON.parse(lineage);
    const source = regex_extract_tbl_names(lineage_json.source);
    const target = regex_extract_tbl_names(lineage_json.target);
    console.log(source)
    console.log(target)
    const flat_lineage = [];
    for (let i = 0; i < source.length; i++) {ee
        for (let j = 0; j < target.length; j++) {
            flat_lineage.push([source[i], target[j]])
        }
    }
    return flat_lineage;
}

app.post('/api/lineage/executeQuery', bodyParser.json(), async (req, res, next) => {
    let lineageResult = [];
    let queryResult = [];

    try {
        const flat_lineage = get_flat_lineage_from_query(req.body.sqlQuery);
        const date_now = new Date().toISOString();

        // Execute db.insert operations sequentially 
        for (let i = 0; i < flat_lineage.length; i++) {
            let source = flat_lineage[i][0];
            let target = flat_lineage[i][1];

            try {
                const result = await db.db.run(`INSERT INTO LineageEventRaw VALUES(?, ?, ?)`, [source, target, date_now]);
                lineageResult.push({ success: true, source, target });
            } catch (error) {
                lineageResult.push({ success: false, error: error.message });
            }
        }

        // Continue with other asynchronous operations (if any)
        queryResult = await db.query(req.body.sqlQuery);

        res.status(200).json({
            lineage_result: lineageResult,
            query_result: queryResult,
        });
    } catch (error) {
        res.status(500).json({'lineage_result': lineageResult, 'query_result': queryResult, 'err': error.message});
    }
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
