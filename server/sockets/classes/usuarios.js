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

    getPessoa(id){
        //filter retorna um novo array
        let pessoa = this.pessoas.filter( pessoa =>{
            //Retorna a pessoa se existe um id com o mesmo valor
            return pessoa.id === id
        })[0];//Colocamos o primeiro registro para que seja apenas 1 registro
        return pessoa;
        //Se não encontra nenhuma pessoa com o id retorna undefined ou null
    }

    getPessoas(){
        return this.pessoas;
    }
}

module.exports = {
    Usuarios
}