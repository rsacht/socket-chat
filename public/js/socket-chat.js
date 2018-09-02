var socket = io();

//Configurando uma variável para o nome do usuário
var params = new URLSearchParams(window.location.search);
//Se não vier o nome do usuário ou da sala na URL dispara um erro
if(!params.has('nome') || !params.has('sala')){
    //Redireciona para:
    window.location = 'index.html';
    throw new Error('O nome e sala são necessários');
}

var usuario = {
    nome: params.get('nome'),
    sala: params.get('sala')
};

socket.on('connect', function() {
    console.log('Conectado ao servidor');

    //Quando a pessoa se conecta pelo frontend
    //Vamos mandar uma mensagem para o servidor informando 
    //Quem é a pessoa que está entrando no chat
    socket.emit('entrarChat', usuario, function(resp){
        console.log('Usuários conectados', resp);
        renderizarUsuarios(resp);
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdemos a conexão com o servidor');

});


// emit: Envia informação
// socket.emit('criarMensagem', {
//     nome: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// on: Escuta informação
socket.on('criarMensagem', function(mensagem) {

    console.log('Servidor:', mensagem);

});

//Escuta mundanças de usuários
//Quando um usuário entra ou sai do chat
socket.on('listaPessoas', function(pessoas) {

    renderizarUsuarios(pessoas);

});

//Mensagens privadas
//Cliente escutando mensagens privadas
socket.on('mensagemPrivada', function(mensagem){
    console.log('Mensagem Privada: ', mensagem);
})
