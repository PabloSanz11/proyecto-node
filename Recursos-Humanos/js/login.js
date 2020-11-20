window.onload = init;

function init()
{
    document.querySelector('.btn-entrar').addEventListener('click', login);
}

function login()
{
    var correo = document.getElementById('input-correo').value;
    var contrasena = document.getElementById('input-contrasena').value;
    
    console.log(correo, contrasena);

    axios({
        method: 'post',
        url: 'http://localhost:3000/validaciones/inicio-sesion',
        data:{
            correo: correo,
            contrasena: contrasena
        }
    }).then(function(res)
    {
        if(res.data.code == 200)
        {
            window.location.href = "pagina-principal.html";
        }else
        {
            document.getElementById('input-estado').value = res.data.message;
        }
    }).catch(function(err){
        console.log(err);
    })
}