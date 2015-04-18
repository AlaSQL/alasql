CREATE TABLE pet (
    id INTEGER PRIMARY KEY,
    name TEXT,
    breed TEXT,
    age INTEGER,
    dead INTEGER
);

ASSERT 1;

CREATE TABLE person_pet (
    person_id INTEGER,
    pet_id INTEGER
);

ASSERT 1;