var params = new URLSearchParams(window.location.search);

//Referências de JQuery
var divUsuarios = $('#divUsuarios');

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