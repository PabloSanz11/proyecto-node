window.onload = init;

function init()
{
    if(!localStorage.getItem("token"))
    {
        document.querySelector('.btn-entrar').addEventListener('click', login);
    }else
    {
        window.location.href = "pagina-principal.html";
    }
}

function login()
{
    var correo = document.getElementById('input-correo').value;
    var contrasena = document.getElementById('input-contrasena').value;

    axios({
        method: 'post',
        url: 'http://localhost:3000/validaciones/inicio-sesion',
        data:{
            correo: correo,
            contrasena: contrasena
        }
    }).then(function(res)
    {
        if(res.data.code === 200)
        {
            localStorage.setItem("token", res.data.message);
            window.location.href = "pagina-principal.html";
        }else
        {
            document.getElementById('input-estado').value = res.data.message;
        }
    }).catch(function(err){
        console.log(err);
    })
}