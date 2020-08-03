import { Connection } from '../database/connection';

const table = 'Steps';
const db = Connection();

export default Steps = {
    getStep(id) {
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

    addStep(step, recipe) {
        try {
            return new Promise((resolve, reject) => db.transaction(
                tx => {
                    tx.executeSql(`insert into ${table}(step, recipe) values("${step}", ${recipe})`, [], (_, { insertedId, rows}) => {
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

    updateStep(id, step) {
        try {
            return new Promise((resolve, reject) => db.transaction(
                tx => {
                    tx.executeSql(`UPDATE ${table} SET step = "${step}" WHERE step_id = ${id};`, [], (_, { rows }) => {
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

    removeStep(id) {
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