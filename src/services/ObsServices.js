import { Connection } from '../database/connection';

const table = 'Observations';
const db = Connection();

export default Observations = {
    getObservation(id) {
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

    addObservation(observation, recipe) {
        try {
            return new Promise((resolve, reject) => db.transaction(
                tx => {
                    tx.executeSql(`insert into ${table}(observation, recipe) values("${observation}", ${recipe})`, [], (_, { insertedId, rows}) => {
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

    updateObservation(id, observation) {
        try {
            return new Promise((resolve, reject) => db.transaction(
                tx => {
                    tx.executeSql(`UPDATE ${table} SET observation = "${observation}" WHERE obs_id = ${id};`, [], (_, { rows }) => {
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

    removeObservation(id) {
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