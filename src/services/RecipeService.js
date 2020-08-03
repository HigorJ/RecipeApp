import { Connection } from '../database/connection';

const table = 'Recipes';
const db = Connection();

export default Recipes = {
    getAll() {
        try {
            return new Promise((resolve, reject) => db.transaction(
                tx => {
                    tx.executeSql(`select * from ${table}`, [], (_, { rows }) => {
                        resolve(rows);
                    }), (sqlError) => {
                        console.log(sqlError);
                    }
                }, (txError) => {
                    console.log(txError);
                }
            )); 
        } catch (error) {
            console.log(error);
        }
        
    },

    getRecipe(id) {
        try {
            return new Promise((resolve, reject) => db.transaction(
                tx => {
                    tx.executeSql(`select * from ${table} where recipe = ${id}`, [], (_, { rows }) => {
                        resolve(rows);
                    }), (sqlError) => {
                        console.log(sqlError);
                    }
                }, (txError) => {
                    console.log(txError);
                }
            ));
        } catch (error) {
            console.log(error);
        }
        
    },

    addRecipe(title, description, photo) {
        try {
            return new Promise((resolve, reject) => db.transaction(
                tx => {
                    tx.executeSql(`insert into ${table}(title, description, photo) values("${title}", "${description}", "${photo}")`, [], (_, { insertId, rows  }) => {
                        resolve(insertId);
                    }), (sqlError) => {
                        console.log(sqlError);
                    }
                }, (txError) => {
                    console.log(txError);
                }
            ));
        } catch (error) {
            console.log(error);
        }
        
    }, 

    updateRecipe(id, title, description) {
        try {
            return new Promise((resolve, reject) => db.transaction(
                tx => {
                    tx.executeSql(`UPDATE ${table} SET title = "${title}", description = "${description}" WHERE recipe_id = ${id};`, [], (_, { rows }) => {
                        resolve(rows);
                    }), (sqlError) => {
                        console.log(sqlError);
                    }
                }, (txError) => {
                    console.log(txError);
                }
            ));
        } catch (error) {
            console.log(error);
        }
    },

    removeRecipe(id) {
        try {
            return new Promise((resolve, reject) => db.transaction(
                tx => {
                    tx.executeSql(`delete from ${table} where recipe_id = ${id}`, [], (_, { rows }) => {
                        resolve(rows);
                    }), (sqlError) => {
                        console.log(sqlError);
                    }
                }, (txError) => {
                    console.log(txError);
                }
            ));
        } catch (error) {
            console.log(error);
        }
    },
}