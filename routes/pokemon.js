const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');
// const pk = require('../pokedex.json').pokemon; Importar la base de datos y extraer el elmento especifico
// '' para indicar cuando es texto como tal
////Busqueda por IDs /:id([0-9]{1,3})  2do get
////Procesar solo aquellas que lleven un texto en la variable [1] 3er get
//<--------- POST--------------->
pokemon.post("/", async (req, res, next) =>
{
    const {pok_name, pok_height, pok_weight, pok_base_experience} = req.body; //Lo que viene de req body en esas variables

    if(pok_name && pok_height && pok_weight && pok_base_experience)
    {
        let query = "INSERT INTO pokemon (pok_name, pok_height, pok_weight, pok_base_experience)";
        query += ` VALUES('${pok_name}', ${pok_height}, ${pok_weight}, ${pok_base_experience})`;
        
        const rows = await db.query(query);
        
        if(rows.affectedRows == 1)
        {
            return res.status(201).json({code: 201, message: "Pokemon Insertado correctamente"});
        }

        return res.status(500).json({code: 500, message: "El pokemon no ha sido agregado"});
    }

    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

pokemon.delete("/:id([0-9]{1,3})", async (req, res, next) =>
{
    const query = `DELETE FROM POKEMON WHERE pok_id =${req.params.id}`;

    const rows = await db.query(query);

    if(rows.affectedRows == 1)
    {
        return res.status(200).json({code: 200, message: "Pokemon Eliminado Correctamente"});
    }

    return res.status(404).send({code: 404, message: "El pokemon no ha sido encontrado"});
});

pokemon.put("/:id([0-9]{1,3})", async (req, res, next) =>
{
    const {pok_name, pok_height, pok_weight, pok_base_experience} = req.body;

    if(pok_name && pok_height && pok_weight && pok_base_experience)
    {
        let query = `UPDATE pokemon SET pok_name='${pok_name}',pok_height= ${pok_height},`;
        query += `pok_weight= ${pok_weight},pok_base_experience=${pok_base_experience} WHERE pok_id = ${req.params.id}`;
        
        const rows = await db.query(query);
        
        if(rows.affectedRows == 1)
        {
            return res.status(200).json({code: 200, message: "Pokemon Actualizado correctamente"});
        }

        return res.status(500).json({code: 500, message: "Pokemon NO Actualizado"});
    }

    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

pokemon.patch("/:id([0-9]{1,3})", async (req, res, next) =>
{
    if(req.body.pok_name)
    {
        let query = `UPDATE pokemon SET pok_name='${req.body.pok_name}' WHERE pok_id = ${req.params.id}`;
        const rows = await db.query(query);
            
        if(rows.affectedRows == 1)
        {
            return res.status(200).json({code: 200, message: "Dato Actualizado"});
        }
    
        return res.status(500).json({code: 500, message: "Dato no Actualizado"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

pokemon.get("/", async (req, res, next) =>
{
    const pkmn =  await db.query("SELECT * FROM pokemon"); //Es el query
    return res.status(200).json({code: 200, message: pkmn}); //Solo cuando ya viene en formato json 
});

pokemon.get('/:id([0-9]{1,3})', async (req, res, next) =>
{
    const id = req.params.id;
    
    if(id >= 1 && id <= 722)
    {
       const pkmn =  await db.query("SELECT * FROM pokemon WHERE pok_id ="+ id); //Es el query
       return res.status(200).json({code: 200, message: pkmn});
    }  
    
    return res.status(404).send({code: 404, message: "El pokemon no ha sido encontrado"});
    //(id >= 0 || id <= 150) ? res.status(200).send(pk[req.params.id-1]) : res.status(404).send("El pokemon no ha sido encontrado");

});

pokemon.get('/:name([A-Za-z]+)', async (req, res, next) =>
{
    const name = req.params.name;
    const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_name = '" + name + "'"); //Es el query

    try 
    {
        if(pkmn.length > 0)
        {
            return res.status(200).json({code: 1, message: pkmn});
        }

        return res.status(404).send({code: 404, message: "El pokemon no ha sido encontrado"});
    } catch (error) {
        console.log(error);
    }
    
    //Es un ciclo donde se pasa un valor, p accede a todos los atributos de la bd [2]
    /*
    const pkmn = json(pkmns).filter((p) =>
    {
        //Condicion ? si es verdadero : si es falso; [3]
        return (p.name.toUpperCase() == name.toUpperCase()) && p;
    });

    //pkmn es un arreglo con sus posiciones
    if(pkmn.length > 0) 
    {
        return res.status(200).json(pkmn);
    } 

    return res.status(404).send("Pokemon no encontrado");
    */
});

module.exports = pokemon; //Exportar cosas y solo una