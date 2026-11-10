-- Tables for the dialect test. Run in alasql and in SQLite before the cases.
-- A row inserted with a column list leaves the other columns NULL in SQLite and undefined in alasql.

-- Expressions over a few rows: numbers with NULL, text with NULL, groups with NULL
CREATE TABLE t (id INTEGER, n INTEGER, s TEXT, g INTEGER);
INSERT INTO t VALUES (1, 5, 'b', 1), (2, -3, 'a', 1), (3, NULL, '10', 2), (4, 2, NULL, 2), (5, 0, 'c', NULL);

-- No rows
CREATE TABLE e (id INTEGER, n INTEGER, s TEXT);

-- Join keys with NULL
CREATE TABLE ja (id INTEGER, g INTEGER);
INSERT INTO ja VALUES (1, 1), (2, 2), (3, NULL), (4, NULL);
CREATE TABLE jb (id INTEGER, g INTEGER);
INSERT INTO jb VALUES (1, 1), (2, 1), (3, 2), (4, NULL);

-- Subqueries: inner tables with their own column names, so unqualified outer references resolve
CREATE TABLE u (uid INTEGER, ug INTEGER, un INTEGER);
INSERT INTO u VALUES (1, 1, 4), (2, 1, 6), (3, 2, -3), (4, NULL, 2), (5, 3, 5);
CREATE TABLE w (wid INTEGER, wg INTEGER, wn INTEGER);
INSERT INTO w VALUES (1, 1, 6), (2, 2, 2), (3, 2, -3), (4, NULL, 0);
CREATE TABLE z (zid INTEGER, zg INTEGER, zn INTEGER);
INSERT INTO z VALUES (1, 1, 2), (2, 2, 6), (3, NULL, 4);

-- Set operations: overlapping values with duplicates and NULL
CREATE TABLE p (v INTEGER);
INSERT INTO p VALUES (1), (2), (2), (3), (NULL);
CREATE TABLE q (v INTEGER);
INSERT INTO q VALUES (2), (3), (3), (4), (NULL);
CREATE TABLE r (v INTEGER);
INSERT INTO r VALUES (3), (4), (5);

-- ORDER BY: numbers, text in mixed case, dates as text, mixed types, NULL and undefined
CREATE TABLE o (id INTEGER, num INTEGER, txt TEXT, d DATE, mix);
INSERT INTO o VALUES (1, 10, 'b', '2024-03-01', 10), (2, -2, 'B', '2023-12-31', '9'), (3, 0, 'a', '2024-01-15', 'a');
INSERT INTO o VALUES (4, NULL, NULL, NULL, NULL), (5, 3, '10', '2024-01-02', 2.5), (6, 3, 'A', '2022-06-30', 'B');
INSERT INTO o (id) VALUES (7);
CREATE TABLE o2 (id INTEGER, num INTEGER, txt TEXT, d DATE, mix);
INSERT INTO o2 VALUES (8, 7, 'c', '2025-01-01', 'c'), (9, -2, 'b', '2023-12-31', 1);

-- GROUP BY: a key with NULL, values of each kind, and a second table with the same column names
CREATE TABLE gb (id INTEGER, k INTEGER, num INTEGER, txt TEXT, d DATE);
INSERT INTO gb VALUES (1, 1, 5, 'b', '2024-03-01'), (2, 1, -3, 'a', '2023-12-31'), (3, 2, NULL, 'c', '2024-01-15');
INSERT INTO gb VALUES (4, 2, 2, NULL, NULL), (5, NULL, 0, 'a', '2024-01-02'), (6, 3, 4, '10', '2022-06-30');
INSERT INTO gb (id, k) VALUES (7, 3);
CREATE TABLE gb2 (id INTEGER, k INTEGER, num INTEGER);
INSERT INTO gb2 VALUES (1, 10, 1), (2, 20, 2), (3, 10, 3), (4, 20, 4), (5, 10, 5), (6, NULL, 6), (7, 10, 7);

-- NULL into INT, FLOAT and NUMBER columns (#2590). The other tables use INTEGER, which keeps NULL.
CREATE TABLE ni (id INTEGER, a INT, b FLOAT, c NUMBER);
INSERT INTO ni VALUES (1, NULL, NULL, NULL), (2, 1, 1.5, 2);
