import * as SQLite from 'expo-sqlite';

// 引数の文字列はDB名
const db = SQLite.openDatabase('db');

export function createTable() {
  db.transaction((tx) => {
    tx.executeSql(
      // 実行するSQL文
      `CREATE TABLE TEST_TABLE (id integer primary key not null, name text);`,
      // SQL文の引数
      // 必要ない時は空のまま
      [],
      // 成功時のコールバック関数
      () => console.log('create table success'),
      // 失敗時のコールバック関数
      () => {
        console.log('create table faile');
        return false;
      }
    );
  });
}

export function insert(id, name) {
  db.transaction((tx) => {
    tx.executeSql(
      // 実行したいSQL文
      // ?のところに引数で設定した値が順番に入る
      `INSERT INTO TEST_TABLE VALUES (?, ?);`,
      // SQL文の引数
      [id, name],
      // 成功時のコールバック関数
      () => {
        console.log('insert success');
      },
      () => {
        // 失敗時のコールバック関数
        console.log('insert faile');
        return false;
      }
    );
  });
}

export function select() {
  db.transaction((tx) => {
    tx.executeSql(
      // 実行したいSQL文
      `SELECT * FROM TEST_TABLE;`,
      // SQL文の引数
      [],
      // 成功時のコールバック関数
      (_, { rows }) => {
        console.log('select success');
        console.log('select result:' + JSON.stringify(rows._array));
      },
      () => {
        // 失敗時のコールバック関数
        console.log('select faile');
        return false;
      }
    );
  });
}
