import { Connection } from './connection';

var database = null;

export default function DatabaseInit() {
    database = Connection();
    database.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () => null);

    initDB();
}

function initDB() {
    var sql = [
        `CREATE TABLE if NOT EXISTS Recipes(
            recipe_id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            photo TEXT,
            createdAt timestamp DEFAULT CURRENT_TIMESTAMP
        );`,
    
        `CREATE TABLE IF NOT EXISTS Ingredients(
            ingredient_id INTEGER PRIMARY KEY AUTOINCREMENT,
            ingredient TEXT NOT NULL,
            recipe INTEGER NOT NULL,
            FOREIGN KEY (recipe) REFERENCES Recipes(recipe_id) ON DELETE CASCADE
        );`, 
          
        `CREATE TABLE IF NOT EXISTS Steps(
            step_id INTEGER PRIMARY KEY AUTOINCREMENT,
            step TEXT NOT NULL,
            recipe INTEGER NOT NULL,
            FOREIGN KEY (recipe) REFERENCES Recipes(recipe_id) ON DELETE CASCADE
        );`,
          
        `CREATE TABLE IF NOT EXISTS Observations(
            obs_id INTEGER PRIMARY KEY AUTOINCREMENT,
            observation TEXT NOT NULL,
            recipe INTEGER NOT NULL,
            FOREIGN KEY (recipe) REFERENCES Recipes(recipe_id) ON DELETE CASCADE
        );`,
    ];

    database.transaction(
        tx => {
            for(i = 0; i < sql.length; i++) {
                tx.executeSql(sql[i]);
            }
        }, (error) => {
            console.log(error);
        }, () => {
            return
        } 
    )
}