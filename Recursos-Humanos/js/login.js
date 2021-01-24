window.onload = init;

const app = Vue.createApp({
    data() {
        return {
            token: localStorage.getItem("token"),
            email: '',
            password: '',
            response: ''
        };
    },
    methods: {
        getData() {
            if (this.email != '' && this.password != '') {
                axios({
                    method: 'post',
                    url: 'https://proyecto-final-node-jpsg.herokuapp.com/validaciones/inicio-sesion',
                    data: {
                        correo: this.email,
                        contrasena: this.password
                    }
                }).then(function(res) {
                    if (res.data.code === 200) {
                        localStorage.setItem("token", res.data.message);
                        window.location.href = "pagina-principal.html";
                    } else {
                        this.response = res.data.message;
                        alert(this.response);
                    }
                }).catch(function(err) {
                    console.log(err);
                })
            }
        }
    }
});

app.mount('#information-user');


function init() {
    if (localStorage.getItem("token")) {
        window.location.href = "pagina-principal.html";
    }
}