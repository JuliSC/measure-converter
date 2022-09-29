const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

async function getConvertedGrade(grade: string, system: string) {
  const con = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  await con.connect(async (err: Error) => {
    if (err) throw err;

    const fromCol = system === "DK" ? "cDenmark" : "cUSA";
    const toCol = system === "DK" ? "cUSA" : "cDenmark";

    const queryStr = `SELECT ${toCol} as 'grade' FROM grades WHERE ${fromCol} = '${grade}'`;

    await con.query(queryStr, (err: Error, result: {grade: string}[]) => {
      if (err) throw err;
      return result[0].grade;
    });
  });

  await con.close();
}

export default {getConvertedGrade};
