var params = new URLSearchParams(window.location.search);
var nome = params.get('nome');
var sala = params.get('sala');

//Referências de JQuery
var divUsuarios = $('#divUsuarios');
var formEnviar = $('#formEnviar');
var txtMensagem = $('#txtMensagem');
var divChatbox = $('#divChatbox');

//Funções para renderizar usuários
function renderizarUsuarios(pessoas){//Array esperado [{},{},{}]
    console.log(pessoas);
    var html = '';

    html += '<li>';
    html += '    <a href="javascript:void(0)" class="active"> Chat de <span> '+ params.get('sala') +'</span></a>'
    html += '</li>';

    //Varrendo os usuários
    for(var i=0; i < pessoas.length; i++){
        html += '<li>';
        html += '    <a data-id="'+ pessoas[i].id +'" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>'+ pessoas[i].nome +' <small class="text-success">online</small></span></a>';
        html += '</li>';   
    }

    divUsuarios.html(html);

}

function renderizarMensagens(mensagem, eu){
    var html = '';
    var dataHora = new Date();
    var hora = dataHora.getHours()+ ':' + dataHora.getMinutes();

    var adminClass = 'info';
    if(mensagem.nome === 'Administrador'){
        adminClass = 'danger';
    }

    if(eu){
        html += '<li class="reverse">';
        html += '    <div class="chat-content">';
        html += '        <h5>'+ mensagem.nome +'</h5>';
        html += '        <div class="box bg-light-inverse">'+ mensagem.mensagem +'.</div>';
        html += '    </div>';
        html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '    <div class="chat-time">'+ hora +'</div>';
        html += ' </li>';
    }else{
        html += '<li class="animated fadeIn">';
        if (mensagem.nome !== 'Administrador'){
            html += '    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        }   
        html += '   <div class="chat-content">';
        html += '        <h5>'+ mensagem.nome +'</h5>';
        html += '        <div class="box bg-light-'+ adminClass +'">'+ mensagem.mensagem +'</div>';
        html += '    </div>';
        html += '    <div class="chat-time">'+ hora +'</div>';
        html += '</li>';
    }

    divChatbox.append(html);
}
//Verifica o tamanho da tela e rola automaticamente para baixo
//Assim sempre veremos a ultima mensagem
function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}
//Listeners
//Quando tiver uma âncora em divUsuario se dispara a função
divUsuarios.on('click','a',function(){
    //this faz referencia a um elemento que está dentro do 'a', neste caso o data('id)
    // <a data-id>
    var id =$(this).data('id');
    if(id){
        console.log(id);
    }
});

formEnviar.on('submit', function(e){
    e.preventDefault();

    if(txtMensagem.val().trim().length === 0){
        return;
    }

    socket.emit('criarMensagem', {
        nome: nome,
        mensagem: txtMensagem.val()
    }, function(mensagem) {
        txtMensagem.val('').focus();
        renderizarMensagens(mensagem, true)//eu = true
        scrollBottom();
    });
});