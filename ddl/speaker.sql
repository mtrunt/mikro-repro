-- Table Definition ----------------------------------------------

CREATE TABLE speaker (
    id SERIAL PRIMARY KEY,
    name character varying(255) NOT NULL,
    cabinettype character varying(255) NOT NULL,
    cabinetid integer NOT NULL,
    feettype character varying(255),
    mounttype character varying(255)
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX speaker_pkey ON speaker(id int4_ops);
CREATE INDEX speaker_cabinettype_index ON speaker(cabinettype text_ops);
