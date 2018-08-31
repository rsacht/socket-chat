var socket = io();

socket.on('connect', function() {
    console.log('Conectado ao servidor');

    //Quando a pessoa se conecta pelo frontend
    //Vamos mandar uma mensagem para o servidor informando 
    //Quem é a pessoa que está entrando no chat
    socket.emit('entrarChat', {usuario: 'Rodrigo'});
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
socket.on('enviarMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});