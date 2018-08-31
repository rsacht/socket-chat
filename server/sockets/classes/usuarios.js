class Usuarios {
    constructor(){
        this.pessoas = [];
    }

    adicionarPessoa(id, nome){
        let pessoa = {id, nome};

        //Adiciona a pessoa ao array de pessoas do construtor
        this.pessoas.push(pessoa);
        //Retorna todas as pessoas que estão no chat
        return this.pessoas;
    }
}

module.exports = {
    Usuarios
}