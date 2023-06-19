# Setup

Set the enviroment variable `DATABASE_URL` to point to the database or configure it in `mikro-orm.config.ts`

Create the tables, the DDLs are included in [ddl](ddl)

# Reproduction

Run the tests once with `v5.7.12` and once with `v6.0.0-dev.87`

# Run the test

There's a naming strategy that converts everything to lowercase.

When using `v5.7.12` the output is

```
[query] select "t0".* from "speaker" as "t0" where "t0"."id" = 1 and "t0"."cabinettype" = 'Tower' limit 1 [took 3 ms, 1 result]

[query] select "c0".*, "s1"."id" as "speakerid" from "cabinet" as "c0" left join "speaker" as "s1" on "c0"."id" = "s1"."cabinetid" where "c0"."id" in (1) order by "c0"."id" asc [took 2 ms, 1 result]
```

When using `v6.0.0-dev.87` the output is
```
[query] select "t0".* from "speaker" as "t0" where "t0"."id" = 1 and "t0"."cabinettype" = 'Tower' limit 1 [took 2 ms, 1 result]

[query] select "c0".*, "s1"."id" as "speakerid" from "cabinet" as "c0" left join "speaker" as "s1" on "c0"."id" = "s1"."cabinetid" and "s1"."cabinetType" = 'speaker' where "c0"."id" in (1) order by "c0"."id" asc [took 3 ms]
                                                                                                    Error here, this should be all lowercase ^^^^^^^^^^^
```

From the queries it appears that the discriminator column is ignoring the naming strategy. Also from v5 to v6 the discriminator column is being added to the second query.

# Notes

The entities definitions may have some oversights but these are also present on the full repo from which this simplified repro was made.
