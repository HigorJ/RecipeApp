import { Connection } from '../database/connection';

const table = 'Ingredients';
const db = Connection();

export default Ingredients = {
    getIngredient(id) {
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

    addIngredient(ingredient, recipe) {
        try {
            return new Promise((resolve, reject) => db.transaction(
                tx => {
                    tx.executeSql(`insert into ${table}(ingredient, recipe) values("${ingredient}", ${recipe})`, [], (_, { insertedId, rows}) => {
                        resolve(insertedId);
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

    updateIngedient(id, ingredient) {
        try {
            return new Promise((resolve, reject) => db.transaction(
                tx => {
                    tx.executeSql(`UPDATE ${table} SET ingredient = "${ingredient}" WHERE ingredient_id = ${id};`, [], (_, { rows }) => {
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

    removeIngredient(id) {
        try {
            return new Promise((resolve, reject) => db.transaction(
                tx => {
                    tx.executeSql(`delete from ${table} where recipe = ${id}`, [], (_, { rows }) => {
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