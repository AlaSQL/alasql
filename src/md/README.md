# MD (Markdonw) plug-in

This is an example of simple AlaSQL plugin.

```sql
    REQUIRE MD;
    SELECT * INTO MD('RESULTS.md',{headers:true}) FROM one;
```