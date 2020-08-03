import * as SQLite from 'expo-sqlite';

export const Connection = () => {
    return SQLite.openDatabase('recipes.db');
}