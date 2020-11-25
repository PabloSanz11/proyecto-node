window.onload = init;

var headers = {};
var url = "http://localhost:3000";

function init()
{
    if(localStorage.getItem("token"))
    {
        headers = { headers: {'Authorization': "bearer " + localStorage.getItem("token")}}
        document.querySelector('.btn-primary').addEventListener('click', busqueda);
        
        cargarDatos();
    }else
    {
        window.location.href = "login.html";
    }
}

function cargarDatos()
{
    axios.get(url + '/empleados', headers)
    .then(function(res)
    {
        mostrarDatos(res.data.message);
    }).catch(function(err){
        console.log(err);
    })
}

function agregar()
{
    var nombre = document.getElementById('nombre-add').value;
    var apellidos = document.getElementById('apellidos-add').value;
    var telefono = document.getElementById('telefono-add').value;
    var correo = document.getElementById('correo-add').value;
    var contrasena = document.getElementById('contrasena-add').value;
    var direccion = document.getElementById('direccion-add').value;

    if(validar(nombre,apellidos,telefono,correo,contrasena,direccion))
    {
        axios({
            method: 'post',
            url: url +'/empleados',
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem("token")
            },
            data:{
                nombre: nombre,
                apellidos: apellidos,
                telefono: telefono,
                correo: correo,
                contrasena: contrasena,
                direccion: direccion
            }
        }).then(function(res)
        {
            if(res.data.code == 201)
            {
                init();
            }else
            {
                document.getElementById('estado-add').value = res.data.message;
            }
        }).catch(function(err){
            console.log(err);
        })
    }
}

function actualizar(id)
{
    var inputs = document.querySelectorAll('.empleado-input');
    var indice = 0;
    var datos = 7; //Cantidad de datos
    var total = 0;
    var campos = [];

    for (let index = 0; index < inputs.length; index++) 
    {
        if(id == inputs[index].value)
        {
            indice = index;
            total = indice + datos;
            for (let i = indice; i < total; i++) 
            {
                campos.push(document.querySelectorAll('.empleado-input')[i].value);
            }
        }
    }
    
    axios({
        method: 'put',
        url: url +'/empleados/'+campos[0],
        headers:{
            Authorization: 'Bearer ' + localStorage.getItem("token")
        },
        data:{
            nombre: campos[1],
            apellidos: campos[2],
            telefono: campos[3],
            correo: campos[4],
            contrasena: campos[5],
            direccion: campos[6]
        }
    }).then(function(res)
    {
        if(res.data.code === 200)
        {
            document.getElementById('estado-bd-upd').value = res.data.message;
            campos= [];
        }else
        {
            document.getElementById('estado-bd-upd').value = res.data.message;
        }

    }).catch(function(err){
        document.getElementById('estado-bd-upd').value = err;
    })
}

function eliminar()
{
    id = document.getElementById('estado-bd-del').value;
    axios.delete(url + '/empleados/'+ id, headers)
    .then(function(res)
    {
        if(res.data.code === 200)
        {
            init();
        }else
        {
            console.log(res.data.message);
        }
    }).catch(function(err){
        console.log(err);
    })
}

function busqueda()
{
    var nombre = document.getElementById('empleado-nombre').value;
    var contenedorBusquedas = document.getElementById('rows-busqueda');
    var primerNombre = nombre.split(' ');

    if(nombre.length > 0)
    {
        axios.get(url + '/empleados/'+ primerNombre[0], headers)
        .then(function(res)
        {
            console.log(res.data.message);
            generarHtml(res.data.message, contenedorBusquedas);
        }).catch(function(err){
            console.log(err);
        })
    }

}

function validar(nombre, apellidos, telefono, correo, contrasena, direccion)
{
    if(nombre.length > 0 && apellidos.length > 0 && telefono.length > 0 && correo.length > 0 && contrasena.length > 3 && direccion.length > 0)
    {
        return true;
    }else
    {
        document.getElementById('estado-add').value = "Campos incompletos";
        document.getElementById('estado-add').style.color = "magenta";
        return false;
    }
}

function mostrarDatos(empleados)
{
    var contenedorEmpleados = document.getElementById('rowss');
    contenedorEmpleados.innerHTML = "";
    entradas(contenedorEmpleados)
    generarHtml(empleados,contenedorEmpleados)
}

function mostrar(id)
{
    if(document.getElementById('delete'))
    {
        document.getElementById('estado-bd-del').value = id;
        document.getElementById('delete').addEventListener('click', eliminar);
    }
}

function entradas(div)
{
    div.innerHTML +=
    `<div class='empleado-prin'>
        <div class='cards'>
            <img src='https://m.media-amazon.com/images/S/aplus-media/vc/4bca2806-3c03-4f11-ac48-c78227cea8f1._SL300__.jpg' alt='' class='cards-img'>
            <hr>
            <input type='text' disabled class='empleado-input-add' id='estado-add' value='Agregar Empleado'>
            <input type='text' class='empleado-input-add' id='nombre-add' placeholder='nombre (s)'>
            <input type='text' class='empleado-input-add' id='apellidos-add' placeholder='apellido (s)'>
            <input type='text' class='empleado-input-add' id='telefono-add' placeholder='telefono'>
            <input type='mail' class='empleado-input-add' id='correo-add' placeholder='correo@dominio.com'>
            <input type='password' class='empleado-input-add' id='contrasena-add' placeholder='contraseña'>
            <input type='text' class='empleado-input-add' id='direccion-add' placeholder='dirección'>
            <hr>
            <input type='image' class='savebtn' src='https://th.bing.com/th/id/OIP.bvzUsPuYZRk6u9pIGyvYZQHaHa?pid=Api&rs=1'>
        </div>
    </div>`;
}

function generarHtml(datos, div)
{
    for(let i = 0; i < datos.length; i++)
    {
        div.innerHTML +=
        `<div class='empleado-prin'>
            <div class='cards'>
                <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' alt='' class='cards-img'>
                <hr>
                <input type='text' disabled class='empleado-input' name='idEmpleado' value="${datos[i].idEmpleado}">
                <input type='text' class='empleado-input' name='nombre' value="${datos[i].nombre}">
                <input type='text' class='empleado-input' name='apellidos' value="${datos[i].apellidos}">
                <input type='text' class='empleado-input' name='telefono' value="${datos[i].telefono}">
                <input type='mail' class='empleado-input' name='correo' value="${datos[i].correo}">
                <input type='password' class='empleado-input' name='contrasena' value="${datos[i].contrasena}">
                <input type='text' class='empleado-input' name='direccion' value="${datos[i].direccion}">
                <hr>
                <input type='image' data-toggle='modal' data-target='#actuModal' class='editbtn' src='https://th.bing.com/th/id/OIP.lRJfLfst1TmsMtg3pXJ1AAHaHa?pid=Api&rs=1' id="${datos[i].idEmpleado}">
                <input type='image' data-toggle='modal' data-target='#deleteModal' class='delbtn' src='https://th.bing.com/th/id/OIP.90bvTUGcCJqR0qsvzA85HQHaHx?pid=Api&rs=1' id="${datos[i].idEmpleado}">
        </div>
        </div>`;
    }

    $('.editbtn').focus(function()
    {
        var id = this.id;
        actualizar(id);
    });
            
    $('.delbtn').focus(function()
    {
        var id = this.id;
        mostrar(id);
    });

    $('.savebtn').focus(function()
    {
        agregar();
    });
}

function cerrarSesion()
{
    localStorage.removeItem("token");
}