const criarMensagem = (nome, mensagem) => {

    return{
        nome,
        mensagem,
        data: new Date().getTime()
    }
}

module.exports = {
    criarMensagem
}