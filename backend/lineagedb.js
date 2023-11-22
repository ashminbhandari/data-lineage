const sqlite = require('sqlite3').verbose();

// Note: for the first arguement, use ':memory' for an in-memory database, 
// or give the relative location to the db file (e.g. './db/se641-lineage.db')
//
// Note: for SQLite, default opening mode is both OPEN_READWRITE | OPEN_CREATE

class LineageDB {
    constructor(db_type = ':memory', db_mode = 'OPEN_READWRITE | OPEN_CREATE') {
        this.db_type = db_type;
        this.mode = db_mode;

        this.db = new sqlite.Database(':memory', (err) => {
            if (err) {
                return console.error(err.message);
            }

            console.log('Connected to the in-memory SQlite database.');
        });
    }

    //close db connection
    close() {
        this.db.close((err) => {
            if (err) {
                return console.error(err.message);
            }

            console.log('Database connection successfully closed.');
        });
    }

    //run a query against the db
    query() {

    }
};

export default LineageDB;