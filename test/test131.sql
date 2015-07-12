--	Test 131 - CAST and CONVERT
select cast(1234 as int);
assert @[{"CAST(1234 AS INT)":1234}];
/* comment */
select cast(12.34 as int);
assert @[{"CAST(12.34 AS INT)":12}];

select cast("1234" as int);
assert @[{"CAST('1234' AS INT)":1234}];
select cast('1234' as int);
assert @[{"CAST('1234' AS INT)":1234}];
select cast("12.34" as int);
assert @[{"CAST('12.34' AS INT)":12}];

select cast("1234" as number);
assert @[{"CAST('1234' AS NUMBER)":1234}];
select cast("12.34" as number);
assert @[{"CAST('12.34' AS NUMBER)":12.34}];

select cast(1234 as string);
assert @[{"CAST(1234 AS STRING)":"1234"}];
select cast(12.34 as string);
assert @[{"CAST(12.34 AS STRING)":"12.34"}];

select convert(int,12.34);
assert @[{"CAST(12.34 AS INT)":12}];
-- assert [{"CONVERT(INT,12.34)":12}];