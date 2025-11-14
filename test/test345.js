// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

// Source: http://geekswithblogs.net/DevJef/archive/2011/09/28/quick-performance-test-in-sql-server.aspx

describe('Test 345 Speed test', function () {
	test.skip('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test345;USE test345');
		done();
	});

	test.skip('2. TEST', function (done) {
		var res = alasql(function () {
			/*
      DECLARE @Loops INT; 
      SET @Loops = 1;
      DECLARE @CPU INT; 
    */
		});
		done();
	});

	test.skip('3. TEST', function (done) {
		var res = alasql(function () {
			/*
      DECLARE @Loops INT; 
      SET @Loops = 1;
      DECLARE @CPU INT; 
      --SET @CPU = @@CPU_BUSY;

      DECLARE @StartDate DATETIME; SET @StartDate = GETDATE();
       
      WHILE @Loops <= 1000  
      BEGIN
          IF COALESCE('123', '456') = '456' 
                  PRINT 1; 
          SET @Loops = @Loops + 1   
      END;
       
      PRINT 'COALESCE, both non-NULL';
      --PRINT 'Total CPU time: ' + CONVERT(varchar, @@CPU_BUSY - @CPU)  ;
      PRINT 'Total milliseconds: ' + CONVERT(varchar, DATEDIFF(ms, @StartDate, GETDATE())) ;
      PRINT ''  ;
      GO;
       
      -- 
       
      DECLARE @Loops INT; SET @Loops = 1; 
      --DECLARE @CPU INT; SET @CPU = @@CPU_BUSY;
      DECLARE @StartDate DATETIME ;SET @StartDate = GETDATE() ;
       
      WHILE @Loops <= 1000 
      BEGIN  
          IF ISNULL('123', '456') = '456'
                  PRINT 1   ;
          SET @Loops = @Loops + 1;
      END;
       
      PRINT 'ISNULL, both non-NULL'  ;
      --PRINT 'Total CPU time: ' + CONVERT(varchar, @@CPU_BUSY - @CPU) ;
      PRINT 'Total milliseconds: ' + CONVERT(varchar, DATEDIFF(ms, @StartDate, GETDATE()))   ;
      PRINT '';
      GO


    */
		});
		done();
	});

	test.skip('99. DROP DATABASE', function (done) {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test345');
		done();
	});
});
