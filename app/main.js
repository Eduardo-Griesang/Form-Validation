import validaCpf from "./cpfValidate.js";
import validaIdade from "./birthValidate.js";

const formularioCampos = document.querySelectorAll('[required]')

const form = document.querySelector('[data-formulario]') // seleciona o formulario
const dados = []

form.addEventListener('submit', e => {
    e.preventDefault()

    const nome = e.target.elements['nome'].value   // pega cada um dos dados inseridos após o submit do formulário
    const email = e.target.elements['email'].value
    const rg = e.target.elements['rg'].value
    const cpf = e.target.elements['cpf'].value
    const aniversario = e.target.elements['aniversario'].value

    const dado = {  // inseri cada um dos dados recebidos em um objeto
        'nome' : nome,
        'email' : email,
        'rg' : rg,
        'cpf' : cpf,
        'aniversario' : aniversario
    }

    dados.push(dado) // inseri o objeto para a array vazia

    localStorage.setItem('dados', JSON.stringify(dados)) //passa a array como JSON para o localStorage

    window.location.href = './abrir-conta-form-2.html'
})


formularioCampos.forEach((campo) => {  
    campo.addEventListener('blur', () => verificaCampo(campo)) //pega o campo selecionado

    campo.addEventListener('invalid', e => { // tira o padrão de invalido para permitir mensagens customizadas
        e.preventDefault()
    })
})


const tiposDeError = [          // tipos de erro possiveis
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
]

const mensagens = {             // mensagens de erro para cada campo do formulário
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}

function verificaCampo(campo) {
    let mensagem = '';
    campo.setCustomValidity('');

    if (campo.name == 'cpf' && campo.value.length >= 11) { //verifica o cpf
        validaCpf(campo)
    }
    if (campo.name == 'aniversario'){ // verifica a maioridade
        validaIdade(campo)
    }

    tiposDeError.forEach((erro) => { //busca o erro caso tenha ocorrido
        if(campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro]
        }
    })

    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro') 
    mensagemErro.innerHTML = mensagem // imprime o erro na tela
}


