const sqlite = require('sqlite3').verbose();

// Note: for the first arguement, use ':memory' for an in-memory database, 
// or give the relative location to the db file (e.g. './db/se641-lineage.db')
//
// Note: for SQLite, default opening mode is both OPEN_READWRITE | OPEN_CREATE

class LineageDB {
    constructor(db_type = ':memory', db_mode = 'OPEN_READWRITE | OPEN_CREATE') {
        this.db_type = db_type;
        this.mode = db_mode;

        this.db = new sqlite.Database(db_type, sqlite[db_mode], (err) => {
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
    query(query_str, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(query_str, params, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    insert(table, data) {
        const keys = Object.keys(data);
        const values = Object.values(data);

        const placeholders = keys.map(() => '?').join(',');
        const query = `INSERT INTO ${table} (${keys.join(',')}) VALUES (${placeholders})`;

        return this.query(query, values);
    }

    update(table, data, condition) {
        const updates = Object.keys(data).map(key => `${key} = ?`);
        const values = Object.values(data);

        const query = `UPDATE ${table} SET ${updates.join(', ')} WHERE ${condition}`;

        return this.query(query, values);
    }

    delete(table, condition) {
        const query = `DELETE FROM ${table} WHERE ${condition}`;
        return this.query(query);
    }
};

module.exports = LineageDB;