const express = require('express');
const validaciones = express.Router();
const db = require('../config/database');
const jwt = require('jsonwebtoken');

validaciones.post("/registro", async (req,res,next) =>
{
    const {nombre, apellidos, telefono, correo, contrasena, direccion} = req.body;

    if(nombre && apellidos && telefono && correo && direccion)
    {
        let query = "INSERT INTO empleados(nombre, apellidos, telefono, correo, contrasena, direccion)";
        query += `VALUES ('${nombre}', '${apellidos}', '${telefono}', '${correo}', '${contrasena}', '${direccion}');`;
        const rows = await db.query(query);

        if(rows.affectedRows == 1)
        {
            return res.status(201).json({code: 201, message: "Empleado registrado correctamente"});
        }

        return res.status(500).json({code: 500, message: "El empleado no ha sido registrado"});
    }

    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

validaciones.post("/inicio-sesion", async (req, res, next) =>
{
    const {correo, contrasena} = req.body;

    if(correo && contrasena)
    {
        const query = `SELECT * FROM empleados WHERE correo = '${correo}' AND contrasena = '${contrasena}';`;
        const rows = await db.query(query);

        if(rows.length == 1)
        {
            const token = jwt.sign(
            {
                idEmpleado: rows[0].idEmpleado,
                correo: rows[0].correo
            }, "debugkey");

            return res.status(200).json({code: 200, message: token});
        }else
        {
            return res.status(200).json({code: 401, message: "Usuario y/o Contraseña incorrectos"});
        }
    }
    
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

validaciones.get("/", async (req, res, next) =>
{
    const query = await db.query("SELECT * FROM empleados;");
    return res.status(200).json({code: 200, message: query});
});

module.exports = validaciones;