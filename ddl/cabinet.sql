-- Table Definition ----------------------------------------------

CREATE TABLE cabinet (
    id SERIAL PRIMARY KEY,
    type character varying(255) NOT NULL
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX cabinet_pkey ON cabinet(id int4_ops);
