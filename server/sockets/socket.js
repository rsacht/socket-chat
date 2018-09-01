const { io } = require('../server');
const {Usuarios} = require('../classes/usuarios');
const {criarMensagem} = require('../utilidades/utilidades');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    //Configurando o listener para receber a mensagem do frontend
    client.on('entrarChat', (data, callback) =>{
        console.log(data);
        //Se não vem o nome
        if(!data.nome){
            return callback({
                error:true,
                mensagem: 'O nome é necessário'
            });
        }

        let pessoas = usuarios.adicionarPessoa(client.id,data.nome);

        //Este evendo dispara sempre que uma pessoa entra ou sai do chat
        //Para todas as pessoas da lista getPessoas
        client.broadcast.emit('listaPessoas', usuarios.getPessoas());
        callback(pessoas);
    });

    client.on('criarMensagem', (data) =>{
        let pessoa = usuarios.getPessoa(client.id);
        let mensagem = criarMensagem(pessoa.nome, data.mensagem);
        client.broadcast.emit('criarMensagem', mensagem);
    });

    //O servidor será notificado quando o cliente sair do chat
    //Efetuando a limpeza do navegador
    client.on('disconnect', () =>{
        let pessoaExcluida = usuarios.excluirPessoa(client.id);

        client.broadcast.emit('criarMensagem',criarMensagem('Administrador', `${pessoaExcluida.nome} saiu`));
    
        //Este evendo dispara sempre que uma pessoa entra ou sai do chat
        //Para todas as pessoas da lista getPessoas
        client.broadcast.emit('listaPessoas', usuarios.getPessoas());
    });

    //Mensagens privadas
    //Enviando mensagens privadas
    client.on('mensagemPrivada', data =>{
        let pessoa = usuarios.getPessoa(client.id);
        //Mandando mensagem para um determinado ID to(data.para)
        //Pode ser o id da sala também
        client.broadcast.to(data.para).emit('mensagemPrivada', criarMensagem(pessoa.nome, data.mensagem));
    });

});