window.onload = init;

var headers = {};
var url = "http://localhost:3000";

function init()
{
    if(localStorage.getItem("token"))
    {
        headers = { headers: {'Authorization': "bearer " + localStorage.getItem("token")}}
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

function actualizar(id,length)
{
    var inputs = document.querySelectorAll('.empleado-input');
    var indice = 0;
    var datos = inputs.length / length;
    var total = 0;
    var campos = {};

    for (let index = 0; index < inputs.length; index++) 
    {
        if(id == inputs[index].value)
        {
            indice = index;
            total = indice + datos;
            for (let i = indice; i < total; i++) 
            {
                campos[i] = (document.querySelectorAll('.empleado-input')[i].value);
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
            console.log(res.data.message);
        }else
        {
            document.getElementById('estado-add').value = res.data.message;
        }
    }).catch(function(err){
        console.log(err);
    })

}

function eliminar(id)
{
    axios.delete(url + '/empleados/'+ id, headers)
    .then(function(res)
    {
        if(res.data.code === 200)
        {
            init();
        }else
        {
            console.log(res.data.message);
            //document.getElementById('input-estado').value = res.data.message;
        }
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

function mostrarDatos(empleados)
{
    var contenedorEmpleados = document.getElementById('rowss');
    contenedorEmpleados.innerHTML = "";
    entradas(contenedorEmpleados)
    let length = empleados.length;

    for(let index = 0; index < length; index++)
    {
        contenedorEmpleados.innerHTML +=`<div class='empleado-prin'>
        <div class='cards'>
            <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' alt='' class='cards-img'>
            <hr>
            <input type='text' disabled class='empleado-input' name='idEmpleado' value="${empleados[index].idEmpleado}">
            <input type='text' class='empleado-input' name='nombre' value="${empleados[index].nombre}">
            <input type='text' class='empleado-input' name='apellidos' value="${empleados[index].apellidos}">
            <input type='text' class='empleado-input' name='telefono' value="${empleados[index].telefono}">
            <input type='mail' class='empleado-input' name='correo' value="${empleados[index].correo}">
            <input type='password' class='empleado-input' name='contrasena' value="${empleados[index].contrasena}">
            <input type='text' class='empleado-input' name='direccion' value="${empleados[index].direccion}">
            <hr>
            <input type='image' class='editbtn' src='https://th.bing.com/th/id/OIP.lRJfLfst1TmsMtg3pXJ1AAHaHa?pid=Api&rs=1' id="${empleados[index].idEmpleado}">
            <input type='image' class='delbtn' src='https://th.bing.com/th/id/OIP.90bvTUGcCJqR0qsvzA85HQHaHx?pid=Api&rs=1' id="${empleados[index].idEmpleado}">
        </div>
        </div>`;
    }
            
    $('.editbtn').focus(function()
    {
        var id = this.id;
        actualizar(id,length);
    });
            
    $('.delbtn').focus(function()
    {
        var id = this.id;
        eliminar(id);
    });

    $('.savebtn').focus(function()
    {
        agregar();
    });
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

function cerrarSesion()
{
    localStorage.removeItem("token");
}