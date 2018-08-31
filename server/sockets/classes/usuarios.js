//Classe responsável por todos os usuários conectados
class Usuarios {
    constructor(){
        //inicializa sempre com um array vazio
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
        //O id é buscado no array pessoas
        let pessoa = this.pessoas.filter( pessoa =>{
            //Retorna a pessoa se existe um id com o mesmo valor
            return pessoa.id === id
        })[0];//Colocamos o primeiro registro que conincida com o id
        return pessoa;
        //Se não encontra nenhuma pessoa com o id retorna undefined ou null
    }

    getPessoas(){
        return this.pessoas;
    }

    excluirPessoa(id){
        //Referencia à pessoa que será apagada
        let pessoaExcluida = this.getPessoa(id);

        //Apagando a pessoa do array
        //Armazena o array em pessoas
        this.pessoas =
        //Filter retorna um novo array
        this.pessoas.filter(pessoa =>
        //Retorna um array com os ids diferentes do id passado
        //pelo parâmetro, efetuando assim a eliminação
        pessoa.id != id);
        
        //Retorna a pessoa apagada
        return pessoaExcluida;
    }

}

module.exports = {
    Usuarios
}