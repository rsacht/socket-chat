const { io } = require('../server');


io.on('connection', (client) => {

    //Configurando o listener para receber a mensagem do frontend
    client.on('entrarChat', (usuario) =>{
        console.log(usuario);
    })
});