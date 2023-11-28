
----------------Source table----------------
INSERT INTO Source (sourceName, sourceType, Description)
VALUES (
        'Dealership',
        'Techstream ADVi',
        '{dealership_id:12345}'
    );

INSERT INTO Source (sourceName, sourceType, Description)
VALUES ('Carfax', 'External Partner', '{}');

INSERT INTO Source (sourceName, sourceType, Description)
VALUES (
        'Independent Vendor',
        'iOS',
        '{vendor_id:11111, vendor_name: "snap_on", device_model:00001}'
    );

INSERT INTO Source (sourceName, sourceType, Description)
VALUES ('qa', 'Adjacent System', "Quality BU's system");

INSERT INTO Source (sourceName, sourceType, Description)
VALUES ('legal', 'Adjacent System', "Legal BU's system");

INSERT INTO Source (sourceName, sourceType, Description)
VALUES ('marketing', 'Adjacent System', "Marketing BU's system");

INSERT INTO Source (sourceName, sourceType, Description)
VALUES ('etl-data-lake', 'ETL', "part of ETL pipeline, moves raw API data over into data lake storage");

INSERT INTO Source (sourceName, sourceType, Description)
VALUES ('data-lake', 'data-storage', "data lake unstructured data storage");


----------------Target table----------------
INSERT INTO Target (targetName, targetType, Description)
VALUES ('vendor-api', 'Producer/Raw', "API for vendors to send data");

INSERT INTO Target (targetName, targetType, Description)
VALUES ('qa', 'Adjacent System', "Quality BU's system");

INSERT INTO Target (targetName, targetType, Description)
VALUES ('legal', 'Adjacent System', "Legal BU's system");

INSERT INTO Target (targetName, targetType, Description)
VALUES ('marketing', 'Adjacent System', "Marketing BU's system");

INSERT INTO Target (targetName, targetType, Description)
VALUES ('etl-data-lake', 'ETL', "part of ETL pipeline, moves raw API data over into data lake storage");

INSERT INTO Target (targetName, targetType, Description)
VALUES ('data-lake', 'data-storage', "data lake unstructured data storage");