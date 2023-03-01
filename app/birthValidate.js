export default function validaIdade(campo) {
    //recebe a data de nascimento do input
    const nascimento = campo.value
    const anoNascimento = nascimento.split("", 4).join('') //pega o ano de nascimento
    
    //recebe a data atual
    const dataAtual = new Date()
    const anoAtual = dataAtual.getFullYear()

    //calcula a maioridade
    if (anoAtual - anoNascimento >= 18) {
        return false // retorna falso pois será o valor usado no validityState
    } else {
        campo.setCustomValidity('O usuário não é maior de idade') // retorna um valor true para o validityState chamar a funcão forEach dos tipos de erro e aparecer a mensagem customizada
    }

}

