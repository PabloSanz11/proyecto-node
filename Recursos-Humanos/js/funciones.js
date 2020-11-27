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
        enviarEdit(id);
    });
            
    $('.delbtn').focus(function()
    {
        var id = this.id;
        enviarDelete(id);
    });

    $('.savebtn').focus(function()
    {
        agregar();
    });
}

function validar(nombre, apellidos, telefono, correo, contrasena, direccion)
{
    if(nombre.length > 0 && apellidos.length > 0 && telefono.length > 0 && correo.length > 0 && correo.includes("@") &&contrasena.length > 4 && direccion.length > 0)
    {
        return true;
    }else
    {
        document.getElementById('estado-add').value = "Campos incompletos";
        document.getElementById('estado-add').style.color = "magenta";
        return false;
    }
}

function mostrarDivs(empleados)
{
    var contenedorEmpleados = document.getElementById('rowss');
    contenedorEmpleados.innerHTML = "";
    cajaEntrada(contenedorEmpleados)
    generarHtml(empleados,contenedorEmpleados)
}

function enviarDelete(id)
{
    if(document.getElementById('delete'))
    {
        document.getElementById('estado-bd-del').value = id;
        document.getElementById('delete').addEventListener('click', eliminar);
    }
}

function enviarEdit(id)
{
    if(document.getElementById('update'))
    {
        document.getElementById('estado-bd-upd').value = id;
        displayInput();
        document.getElementById('estado-bd-upds').value = "Resultado de Operación";
        document.getElementById('update').addEventListener('click', actualizar);
    }
}

function cajaEntrada(div)
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

function cerrarBusquedas()
{
    if(document.getElementById('minimizar'))
    {
        document.getElementById('minimizar').addEventListener('click', function()
        {
            var contenedorBusquedas = document.getElementById('rows-busqueda');
            contenedorBusquedas.innerHTML = "";
            document.getElementById('busquedas').style.display = "none";
            document.getElementById('gestion').style.display = "block";
        });
    }
}

function mostrarBusquedas()
{
    var contenedorBusquedas = document.getElementById('rows-busqueda');
    contenedorBusquedas.innerHTML = "";
    document.getElementById('busquedas').style.display = "block";
    document.getElementById('gestion').style.display = "none";
}

function cajaEntrada(div)
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

function validarActualizar(id)
{
    var inputs = document.querySelectorAll('.empleado-input');
    var divGestion = $("#gestion").is(":visible");
    var indice = 0;
    var limite = 0;
    var campos = [];
    var contador = 0; 

    for (let index = 0; index < inputs.length; index++) 
    {
        if(id == inputs[index].value)
        {
            indice = index;
            limite = indice + datosBD;

            for (let i = indice; i < limite; i++) 
            {
                if(contador < datosBD)
                {
                    campos[contador] = document.querySelectorAll('.empleado-input')[i].value;
                }

                contador++;
            }

            contador = 0;
            if(!divGestion)
            {
                break;
            }
        }
    }

    return campos;
}

function displayInput()
{
    document.getElementById('update').style.display = "block";
    document.getElementById('cancelar').innerHTML = "Cancelar";
}

function mostrarResultado(contenido)
{
    document.getElementById('estado-bd-upds').value = contenido;
    document.getElementById('update').style.display = "none";
    document.getElementById('cancelar').innerHTML = "Cerrar";
}

function cerrarSesion()
{
    localStorage.removeItem("token");
}
