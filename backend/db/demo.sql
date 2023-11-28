CREATE TABLE dim_calgary_employees
  (
     employee_id INT NOT NULL PRIMARY KEY,
     first_name  TEXT,
     last_name   TEXT,
     address     TEXT,
     city        TEXT,
     state       TEXT,
     country     TEXT,
     postalcode  TEXT
  )

INSERT INTO dim_calgary_employees
SELECT employeeid,
       firstname,
       lastname,
       address,
       city,
       state,
       country,
       postalcode
FROM   employees
WHERE  state = 'calgary' 

CREATE TABLE dim_employee_customers (
    employee_id int not null primary key,
    customer_id int not null primary key,
    firstname text,
    lastname text
)

INSERT INTO dim_employee_customers
SELECT employeeid,
       customerid,
       a.firstname,
       b.lastname
FROM   employees a
       LEFT JOIN customers b
              ON ( a.firstname = b.firstname
                   AND a.lastname = b.lastname
                   AND a.address = b.address
                   AND a.state = b.state
                   AND a.city = b.city
                   AND a.email = b.email
                   AND a.phone = b.phone )
WHERE  b.customerid IS NOT NULL 