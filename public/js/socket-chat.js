var socket = io();

//Configurando uma variável para o nome do usuário
var params = new URLSearchParams(window.location.search);
//Se não vier o nome do usuário na URL dispara um erro
if(!params.has('nome')){
    window.location = 'index.html';
    throw new Error('O nome é necessário');
}

var usuario = {
    nome: params.get('nome')
};

socket.on('connect', function() {
    console.log('Conectado ao servidor');

    //Quando a pessoa se conecta pelo frontend
    //Vamos mandar uma mensagem para o servidor informando 
    //Quem é a pessoa que está entrando no chat
    socket.emit('entrarChat', usuario, function(resp){
        console.log('Usuários conectados', resp);
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdemos a conexão com o servidor');

});


// Enviar información
socket.emit('enviarMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
});

// Escuchar información
socket.on('criarMensagem', function(mensagem) {

    console.log('Servidor:', mensagem);

});