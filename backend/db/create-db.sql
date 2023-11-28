CREATE TABLE Vehicle (
    vin TEXT PRIMARY KEY,
    make TEXT,
    model TEXT,
    year INT
);

CREATE TABLE DataEntity (
    entityID INTEGER PRIMARY KEY AUTOINCREMENT,
    createdTimestamp DATE NOT NULL,
    vehicleVIN TEXT,
    name TEXT NOT NULL,
    description TEXT,
    entityType TEXT,
    FOREIGN KEY (vehicleVIN) REFERENCES Vehicle (vin)
);

CREATE TABLE Source (
    sourceID INTEGER PRIMARY KEY AUTOINCREMENT,
    sourceName TEXT NOT NULL,
    sourceType TEXT NOT NULL,
    description TEXT
);

CREATE TABLE Target (
    targetID INTEGER PRIMARY KEY AUTOINCREMENT,
    targetName TEXT NOT NULL,
    targetType TEXT NOT NULL,
    description TEXT
);

CREATE TABLE LineageEvent (
    eventID INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp DATE NOT NULL,
    action TEXT NOT NULL,
    description TEXT,
    beforeEntityID INT,
    afterEntityID INT,
    sourceID INTEGER,
    targetID INTEGER,
    FOREIGN KEY (beforeEntityID) REFERENCES DataEntity (entityID),
    FOREIGN KEY (afterEntityID) REFERENCES DataEntity (entityID),
    FOREIGN KEY (sourceID) REFERENCES Source (sourceID),
    FOREIGN KEY (targetID) REFERENCES Target (targetID)
);

CREATE TABLE LineageEventRaw (
    source_name TEXT NOT NULL,
    target_name TEXT NOT NULL,
    timestamp DATE NOT NULL
)

insert into tablex select * from tabley
