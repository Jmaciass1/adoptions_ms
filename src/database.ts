import { createPool, Pool } from "mysql2/promise";

// export async function connect(): Promise<Pool> {
//   const connection = await createPool({
//     host: "bhkby9gvjxw9geejt4z7-mysql.services.clever-cloud.com", // Cambiado el host
//     user: "ucx8hiowekb01akm", // Cambiado el usuario
//     password: "CAMCbwSV43Jm5m5hoxgG", // Cambiado la contraseña
//     database: "bhkby9gvjxw9geejt4z7", // Cambiado el nombre de la base de datos
//     connectionLimit: 10,
//   });
//   return connection;
// }

export async function connect(): Promise<Pool> {
  const connection = await createPool({
    host: "us-cluster-east-01.k8s.cleardb.net", // Cambiado el host
    user: "b57cddc6ae26f2", // Cambiado el usuario
    password: "4503f81f", // Cambiado la contraseña
    database: "heroku_d0676d50c5109f2", // Cambiado el nombre de la base de datos
    connectionLimit: 100,
  });
  return connection;
}

// export async function connect(): Promise<Pool> {
//   const connection = await createPool({
//     host: "localhost", // Cambiado el host
//     user: "root", // Cambiado el usuario
//     password: "root", // Cambiado la contraseña
//     database: "adoptions", // Cambiado el nombre de la base de datos
//     connectionLimit: 10000,
//   });
//   return connection;
// }