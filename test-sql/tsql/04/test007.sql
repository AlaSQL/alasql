-- Create the WaitStats table
USE Performance;
IF OBJECT_ID('dbo.WaitStats', 'U') IS NOT NULL DROP TABLE dbo.WaitStats;

CREATE TABLE dbo.WaitStats
(
  dt                  DATETIME     NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  wait_type           NVARCHAR(60) NOT NULL,
  waiting_tasks_count BIGINT       NOT NULL,
  wait_time_ms        BIGINT       NOT NULL,
  max_wait_time_ms    BIGINT       NOT NULL,
  signal_wait_time_ms BIGINT       NOT NULL
);

CREATE UNIQUE CLUSTERED INDEX idx_dt_type ON dbo.WaitStats(dt, wait_type);
CREATE INDEX idx_type_dt ON dbo.WaitStats(wait_type, dt);

-- Load waitstats data on regular intervals
INSERT INTO Performance.dbo.WaitStats
    (wait_type, waiting_tasks_count, wait_time_ms,
     max_wait_time_ms, signal_wait_time_ms)
  SELECT
    wait_type, waiting_tasks_count, wait_time_ms,
    max_wait_time_ms, signal_wait_time_ms
  FROM sys.dm_os_wait_stats
  WHERE wait_type NOT IN (N'MISCELLANEOUS');

-- Creation script for IntervalWaits function
IF OBJECT_ID('dbo.IntervalWaits', 'IF') IS NOT NULL
  DROP FUNCTION dbo.IntervalWaits;
GO
