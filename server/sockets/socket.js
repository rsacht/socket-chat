const { io } = require('../server');
const {Usuarios} = require('../classes/usuarios');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    //Configurando o listener para receber a mensagem do frontend
    client.on('entrarChat', (data, callback) =>{
        //Se não vem o nome
        if(!data.nome){
            return callback({
                error:true,
                mensagem: 'O nome é necessário'
            });
        }

        let pessoas = usuarios.adicionarPessoa(client.id,data.nome);
        callback(pessoas);
    })
});