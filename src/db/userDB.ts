import SQLite from "react-native-sqlite-storage";

SQLite.enablePromise(true);

const DB_NAME = "app.db";

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

async function getDb() {
  if (!dbPromise) {
    dbPromise = SQLite.openDatabase({ name: DB_NAME, location: "default" });
  }
  return dbPromise;
}

export async function initUserTable() {
  const db = await getDb();
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS user_profile (
      id INTEGER PRIMARY KEY NOT NULL,
      username TEXT NOT NULL,
      email TEXT,
      firstName TEXT,
      lastName TEXT,
      role TEXT,
      age INTEGER,
      password TEXT,
      updatedAt INTEGER NOT NULL
    );
  `);
}

export type DbUser = {
  id: number;
  username: string;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  role?: string | null;
  age?: number | null;
  password?: string | null;
};

export async function saveUserProfile(user: DbUser) {
  const db = await getDb();
  const now = Date.now();

  await db.executeSql(
    `
    INSERT OR REPLACE INTO user_profile
      (id, username, email, firstName, lastName, role, age, password, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
    `,
    [
      user.id,
      user.username,
      user.email ?? null,
      user.firstName ?? null,
      user.lastName ?? null,
      user.role ?? null,
      user.age ?? null,
      user.password ?? null,
      now,
    ]
  );
}

export async function getUserProfile(id: number) {
  const db = await getDb();
  const [result] = await db.executeSql(
    `SELECT * FROM user_profile WHERE id = ? LIMIT 1;`,
    [id]
  );

  if (result.rows.length === 0) return null;
  return result.rows.item(0);
}
