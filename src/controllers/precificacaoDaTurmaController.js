const criarPrecificacoesDasMatriculas =
    (request, response) => {
        setTimeout(() => {
            return response.status(200).json([
                {
                    pessoaFisicaId: 251461,
                    precificacaoDaTurmaId: 123456
                }
            ]);
    
            return response.status(400).json(['Mensagem de erro padrão do SIG']);
        }, 2000);
        
    };

module.exports =
{
    criarPrecificacoesDasMatriculas
}
