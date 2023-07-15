import {createPool} from "mysql2/promise";

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    database: 'christmas_list',
    namedPlaceholders: true,
    decimalNumbers: true,
});