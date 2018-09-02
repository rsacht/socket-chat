var params = new URLSearchParams(window.location.search);

//Funções para renderizar usuários
function renderizarUsuarios(pessoas){//Array esperado [{},{},{}]
    console.log(pessoas);
    var html = '';

    html += '<li>';
    html += '    <a href="javascript:void(0)" class="active"> Chat de <span> '+ params.get('sala') +'</span></a>'
    html += '</li>';
}