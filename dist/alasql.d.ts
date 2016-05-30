// Type definitions for alasql.js v.0.1.8
// Project: https://github.com/agershun/alasql
// Definitions by: Andrey Gershun <https://github.com/agershun>
// Definitions: https://github.com/borisyankov/DefinitelyTyped


interface AlaSQLCallback {
    (data?: any, err?: Error): void;
}

interface AlaSQLOptions {
    errorlog: boolean;
    valueof: boolean;
    dropifnotexists: boolean; // drop database in any case
    datetimeformat: string; // how to handle DATE and DATETIME types
    casesensitive: boolean; // table and column names are case sensitive and converted to lower-case
    logtarget: string; // target for log. Values: 'console', 'output', 'id' of html tag
    logprompt: boolean; // print SQL at log
    modifier: any; // values: RECORDSET, VALUE, ROW, COLUMN, MATRIX, TEXTSTRING, INDEX
    columnlookup: number; // how many rows to lookup to define columns
    autovertex: boolean; // create vertex if not found
    usedbo: boolean; // use dbo as current database (for partial T-SQL comaptibility)
    autocommit: boolean; // the AUTOCOMMIT ON | OFF
    cache: boolean; // use cache
    nocount: boolean; // for SET NOCOUNT OFF
    nan: boolean; // check for NaN and convert it to undefined
    angularjs: boolean;
    tsql: boolean;
    mysql: boolean;
    postgres: boolean;
    oracle: boolean;
    sqlite: boolean;
    orientdb: boolean;
}

// compiled Statement
interface AlaSQLStatement {
    (params?: any, cb?: AlaSQLCallback, scope?: any): any;
}

// abstract Syntax Tree
interface AlaSQLAST {
    compile(databaseid: string): AlaSQLStatement;
}

// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/es6-promise/es6-promise.d.ts
interface Thenable<T> {
    then<U>(onFulfilled?: (value: T) => U | Thenable<U>, onRejected?: (error: any) => U | Thenable<U>): Thenable<U>;
    then<U>(onFulfilled?: (value: T) => U | Thenable<U>, onRejected?: (error: any) => void): Thenable<U>;
    catch<U>(onRejected?: (error: any) => U | Thenable<U>): Thenable<U>;
}

interface AlaSQL {
    options: AlaSQLOptions;
    error: Error;
    (sql: any, params?: any, cb?: AlaSQLCallback, scope?: any): any;
    parse(sql): AlaSQLAST;
    promise(sql: any, params?: any): Thenable<any>;
}

declare var alasql: AlaSQL;

