
CREATE TABLE System (
    SystemID INTEGER PRIMARY KEY,
    Name TEXT NOT NULL,
    Description TEXT,
    SystemType TEXT
);

CREATE TABLE DataEntity (
    EntityID INTEGER PRIMARY KEY,
    Name TEXT NOT NULL,
    Description TEXT,
    EntityType TEXT,
    SystemID INTEGER,
    FOREIGN KEY (SystemID) REFERENCES System (SystemID)
);

CREATE TABLE Source (
    SourceID INTEGER PRIMARY KEY,
    SourceName TEXT NOT NULL,
    SourceType TEXT NOT NULL,
    ConnectionDetails TEXT,
    Description TEXT
);

CREATE TABLE Target (
    TargetID INTEGER PRIMARY KEY,
    TargetName TEXT NOT NULL,
    TargetType TEXT NOT NULL,
    ConnectionDetails TEXT,
    Description TEXT
);

CREATE TABLE Transformation (
    TransformationID INTEGER PRIMARY KEY,
    Name TEXT NOT NULL,
    Description TEXT,
    TransformationLogic TEXT,
    SourceID INTEGER,
    TargetID INTEGER,
    FOREIGN KEY (SourceID) REFERENCES Source (SourceID),
    FOREIGN KEY (TargetID) REFERENCES Target (TargetID)
);

CREATE TABLE FieldMapping (
    MappingID INTEGER PRIMARY KEY,
    SourceField TEXT NOT NULL,
    TargetField TEXT NOT NULL,
    TransformationID INTEGER,
    DataType TEXT,
    TransformationLogic TEXT,
    FOREIGN KEY (TransformationID) REFERENCES Transformation (TransformationID)
);

CREATE TABLE Process (
    ProcessID INTEGER PRIMARY KEY,
    Name TEXT NOT NULL,
    Description TEXT,
    StartTime DATETIME,
    EndTime DATETIME,
    Status TEXT,
    ResponsiblePerson TEXT
);

CREATE TABLE Metadata (
    MetadataID INTEGER PRIMARY KEY,
    FieldName TEXT NOT NULL,
    DataType TEXT,
    Length INTEGER,
    Format TEXT,
    SourceID INTEGER,
    Description TEXT,
    FOREIGN KEY (SourceID) REFERENCES Source (SourceID)
);

CREATE TABLE AuditLog (
    LogID INTEGER PRIMARY KEY,
    ActionType TEXT NOT NULL,
    Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    UserID INTEGER,
    Details TEXT,
    AffectedEntityID INTEGER
);

CREATE TABLE User (
    UserID INTEGER PRIMARY KEY,
    Username TEXT NOT NULL,
    Role TEXT,
    ContactDetails TEXT,
    AuthenticationInformation TEXT
);