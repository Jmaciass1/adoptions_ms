import { Request, Response } from "express";

// DB
import { connect } from "../database";
// Interfaces
import { Adoption } from "../interface/Adoption";
import { RowDataPacket } from "mysql2/promise";
import { ResultSetHeader } from "mysql2/promise";
import { ServerError } from "../errors/server.error";
import { STATUS_CODES } from "../utils/constants";

export async function getAdoptions(
  req: Request,
  res: Response
): Promise<Response | void> {
  const conn = await connect();
  const Adoptions = await conn.query("SELECT * FROM adoptions");
  return res.json(Adoptions[0]);
}

export async function createAdoption(req: Request, res: Response) {
  const newAdoption: Adoption = req.body;
  console.log(newAdoption);

  const conn = await connect();
  await conn.query("INSERT INTO adoptions SET ?", [newAdoption]);
  res.json({
    message: "New Adoption Created",
  });
}

export async function getAdoption(req: Request, res: Response) {
  const id = req.params.adoptionId;
  const conn = await connect();
  const Adoptions = await conn.query<RowDataPacket[]>(
    "SELECT * FROM adoptions WHERE id_adoption = ?",
    [id]
  );

  if (Adoptions[0].length <= 0) {
    return res.status(STATUS_CODES.NOT_FOUND).json({
      message: "Adoption not found",
    });
  }

  return res.status(STATUS_CODES.OK).json(Adoptions[0][0]);
}

export async function deleteAdoption(req: Request, res: Response) {
  const id = req.params.adoptionId;
  const conn = await connect();

  // Ejecutar la consulta DELETE y manejar los resultados
  const [result] = await conn.query<ResultSetHeader>(
    "DELETE FROM adoptions WHERE id_adoption = ?",
    [id]
  );

  // Verificar si se afectó alguna fila
  if (result.affectedRows <= 0) {
    return res.status(STATUS_CODES.NOT_FOUND).json({
      message: "Adoption not found",
    });
  }

  return res.status(STATUS_CODES.OK).json({ message: "Adoption deleted" });
}

export async function updateAdoption(req: Request, res: Response) {
  const id = req.params.adoptionId;
  const updateAdoption: Adoption = req.body;
  const conn = await connect();
  const [result] = await conn.query<ResultSetHeader>(
    "UPDATE adoptions set ? WHERE id_adoption = ?",
    [updateAdoption, id]
  );

  // Verificar si se afectó alguna fila
  if (result.affectedRows <= 0) {
    return res.status(STATUS_CODES.NOT_FOUND).json({
      message: "Adoption not found",
    });
  }

  const [rows] = await conn.query<RowDataPacket[]>(
    "SELECT * FROM adoptions WHERE id_adoption = ?",
    [id]
  );

  const updatedAdoption = rows[0];
  console.log(updateAdoption);
  
  return res
    .status(STATUS_CODES.OK)
    .json({ message: "Adoption updated", updatedAdoption });
}

export async function resolveAdoption(req: Request, res: Response) {
  const id = req.params.adoptionId;
  const { successfully } = req.body;
  const conn = await connect();
  const [result] = await conn.query<ResultSetHeader>(
    "UPDATE adoptions SET successfully = ? WHERE id_adoption = ?",
    [successfully, id]
  );

  // Verificar si se afectó alguna fila
  if (result.affectedRows <= 0) {
    return res.status(STATUS_CODES.NOT_FOUND).json({
      message: "Adoption not found",
    });
  }

  const [rows] = await conn.query<RowDataPacket[]>(
    "SELECT * FROM adoptions WHERE id_adoption = ?",
    [id]
  );

  const updatedAdoption = rows[0];

  return res
    .status(STATUS_CODES.OK)
    .json({ message: "Adoption resolved", updatedAdoption });
}
