window.onload = init;

var headers = {};
var url = "http://localhost:3000";
var datosBD = 7;
var resultadosBusqueda = [];

function init()
{
    if(localStorage.getItem("token"))
    {
        headers = { headers: {'Authorization': "bearer " + localStorage.getItem("token")}}
        document.querySelector('.btn-primary').addEventListener('click', busqueda);
        cargarDatos();
        cerrarDiv();
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

function actualizar()
{
    id = document.getElementById('estado-bd-upd').value;
    campos = validarActualizar(id);

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
            displayInputs(res.data.message);
            campos= [];
            init();
        }else
        {
            document.getElementById('estado-bd-upds').value = res.data.message;
        }

    }).catch(function(err){
        document.getElementById('estado-bd-upds').value = err;
    })
}

function eliminar()
{
    id = document.getElementById('estado-bd-del').value;
    valores = resultadosBusqueda[0];

    axios.delete(url + '/empleados/'+ id, headers)
    .then(function(res)
    {
        if(res.data.code === 200)
        {
            init();
            if(valores > 1)
            {
                busqueda();
            }else
            {
                document.getElementById('busquedas').style.display = "none";
                document.getElementById('gestion').style.display = "block";
            }
        }else
        {
            alert(res.data.message);
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
            if(res.data.code == 1)
            {
                resultadosBusqueda[0] = res.data.message.length;
                mostrarDiv();
                generarHtml(res.data.message, contenedorBusquedas);
            }else
            {
                alert("Empleado no encontrado");
            }
        }).catch(function(err){
            console.log(err);
        })
    }else
    {
        alert("Proporcione el nombre de algún empleado");
    }

}
