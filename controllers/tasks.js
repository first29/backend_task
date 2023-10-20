import { connect } from "../database.js";
import jwt from 'jsonwebtoken';

export const actualizar_fase = async (req, res) => {
  const connection = await connect();
  const {hora,id,tipo} = req.body;
  console.log(hora,id,tipo);
  const datos=[hora,id,tipo];
  const result = await connection.execute("call actualizar_fase(?,?,?)", [
    hora,
    id,
    tipo,
  ]);
  res.sendStatus(200);
};

export const getTasks = async (req, res) => {
  const connection = await connect();
  const [rows] = await connection.execute("SELECT * FROM tareas_del_proyecto");
  res.json(rows);
};

export const saveTask = async (req, res) => {
  try {
    const connection = await connect();
    const [results] = await connection.execute(
      "CALL crear_tarea(?,?,?,?,?,?,?);",
      [req.body.nombre_tarea, req.body.prioridad, req.body.IdResponsable, req.body.Longitud, req.body.Latitud, req.body.Radio, req.body.IdProyecto]
    );
    //res.json(results[0][0]);
    const newUser = {
      id: results[0][0].id_tarea,
      ...req.body,
    };
    res.json(newUser);
  } catch (error) {
    console.error(error);
  }
};

export const getTask = async (req, res) => {
  const connection = await connect();
  const rows = await connection.execute("call tareas_por_cuenta(?)", [
    req.params.id,
  ]);
  res.json(rows[0][0]);
};

export const deleteTask = async (req, res) => {
  const connection = await connect();
  const result = await connection.execute("call borrar_tarea(?)", [
    req.params.id,
  ]);
  console.log(result[0][0]);
  res.sendStatus(204);
};

export const updateTask = async (req, res) => {
  const connection = await connect();
  await connection.query("UPDATE tasks SET ? WHERE IdTarea = ?", [
    req.body,
    req.params.id,
  ]);
  res.sendStatus(204);
};

export const getTasksCount = async (req, res) => {
  const connection = await connect();
  const [rows] = await connection.execute("SELECT COUNT(*) FROM tasks");
  res.json(rows[0]["COUNT(*)"]);
};

export const login = async (req, res) => {
  const { correo, contraseña } = req.body;
  console.log("parametros: " + correo + " " + contraseña);
  const connection = await connect();
  let contraseñaValida = false;
  try {
    const query = `SELECT * FROM cuenta WHERE Usuario=?`;
    const [results] = await connection.query(query, [correo]);
    console.log(results);
    if (results.length === 0) {
      res.status(401).json({ error: 'Credenciales invalidas' });
    }
    const usuario = results[0];
    console.log(usuario);
    if (contraseña == usuario.Contrasena) contraseñaValida = true;
    if (!contraseñaValida) {
      res.status(401).json({ error: 'Credenciales invalidas' });
    }
    const token = jwt.sign({ id: usuario.IdCuenta }, 'secreto', { expiresIn: '1h' });
    console.log("ingreso usuario " + usuario.IdCuenta + " con token: " + token);
    return res.json({ token });
  } catch (error) {
    console.error("Error en la autentificacion", error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};