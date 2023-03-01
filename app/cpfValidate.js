export default function validaCpf(campo) {
    const cpf = campo.value.replace(/\.|-/g, "") //retira quaisquer pontos ou hífens do cpf

    if (repetedNumbers(cpf) || firstnumber(cpf) || secondNumber(cpf) ) {
        campo.setCustomValidity('O CPF é invalido')  // retorna um valor true para o validityState chamar a funcão forEach dos tipos de erro e aparecer a mensagem customizada
    } else {
        return false // se for um CEP válido retorna 'false' para não chamar a funcão validityState 
    }
}


function repetedNumbers(cpf) { //checa números repetidos
    const numbers = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ]

    return numbers.includes(cpf)
}


function firstnumber (cpf) { //checa o primeiro número do CPF
    let soma = 0;
    let multiplicador = 10;

    for (let tamanho = 0; tamanho < 9; tamanho++) {
        soma += cpf[tamanho] * [multiplicador];
        multiplicador--;
    }

    soma = (soma * 10) % 11;

    if (soma == 10 || soma == 11) {
        soma = 0
    } 

    return soma != cpf[9]
}


function secondNumber (cpf) { //checa o segundo número do CPF
    let soma = 0;
    let multiplicador = 11;

    for (let tamanho = 0; tamanho < 10; tamanho++) {
        soma += cpf[tamanho] * [multiplicador];
        multiplicador--;
    }

    soma = (soma * 10) % 11;

    if (soma == 10 || soma == 11) {
        soma = 0
    } 

    return soma != cpf[10]
}
