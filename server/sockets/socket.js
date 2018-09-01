const { io } = require('../server');
const {Usuarios} = require('../classes/usuarios');
const {criarMensagem} = require('../utilidades/utilidades');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    //Configurando o listener para receber a mensagem do frontend
    client.on('entrarChat', (data, callback) =>{
        //Se não vem o nome
        if(!data.nome || !data.sala){
            return callback({
                error:true,
                mensagem: 'O nome/sala é necessário'
            });
        }

        //Conecta um usuário a uma sala
        client.join(data.sala);

        //Identificar em que sala está se conectando
        usuarios.adicionarPessoa(client.id,data.nome, data.sala);

        //Este evendo dispara sempre que uma pessoa entra ou sai do chat
        //Para todas as pessoas da lista getPessoas
        client.broadcast.emit('listaPessoas', usuarios.getPessoasPorSala(data.sala));
        //Retorna os usuários da sala
        callback(usuarios.getPessoasPorSala(data.sala));
    });

    client.on('criarMensagem', (data) =>{
        let pessoa = usuarios.getPessoa(client.id);
        let mensagem = criarMensagem(pessoa.nome, data.mensagem);
        //Cria a mensagem somente para as pessoas que estão na mesma sala
        client.broadcast.to(pessoa.sala).emit('criarMensagem', mensagem);
    });

    //O servidor será notificado quando o cliente sair do chat
    //Efetuando a limpeza do navegador
    client.on('disconnect', () =>{
        let pessoaExcluida = usuarios.excluirPessoa(client.id);

        client.broadcast.to(pessoaExcluida.sala).emit('criarMensagem',criarMensagem('Administrador', `${pessoaExcluida.nome} saiu`));
    
        //Este evendo dispara sempre que uma pessoa entra ou sai do chat
        //Para todas as pessoas da lista getPessoas que estão na sala
        client.broadcast.to(pessoaExcluida.sala).emit('listaPessoas', usuarios.getPessoasPorSala(pessoaExcluida.sala));
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