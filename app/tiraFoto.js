const abreCamera = document.querySelector('[data-video-botao]')
const campoCamera = document.querySelector('[data-camera]')
const video = document.querySelector('[data-video]')

const botaoTirarFoto = document.querySelector("[data-tirar-foto]")
const canvas = document.querySelector("[data-video-canvas]")
const mensagem = document.querySelector("[data-mensagem]")
let imagemURL = "";

const btnEnviarFoto = document.querySelector('[data-enviar]')

abreCamera.addEventListener('click', async function () {  //abre a camera
    const startVideo = await navigator.mediaDevices.getUserMedia({video: true, audio:false})

    abreCamera.style.display = 'none';
    campoCamera.style.display = 'block';

    video.srcObject = startVideo
})

botaoTirarFoto.addEventListener('click', () => {  // tira a foto
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    imagemURL = canvas.toDataURL('image/jpeg');

    campoCamera.style.display = "none";
    mensagem.style.display = "block";
})


// pegar uma imagem dos arquivos do computador com input type='file'
const btn = document.querySelector('[data-btn]')
const input = document.querySelector('[data-file]')
const imagemUsuario = document.querySelector('[data-imagem-usuario]')

btn.addEventListener('click', () => {
    const reader = new FileReader()
    reader.readAsDataURL(input.files[0])
    reader.onload = function () {

        campoCamera.style.display = 'none'; // remove a camera do display
        canvas.style.display = 'none';      // remove o espaçamento de onde ficaria a foto
        imagemUsuario.style.width = '100%'  // mostra a imagem
        mensagem.style.display = "block";

        imagemUsuario.src = reader.result // mostra a foto enviada em base 64
    }
})

btnEnviarFoto.addEventListener('click', () => {
    const recebeDados = localStorage.getItem('dados') // pega o localStorage
    const converteDado = JSON.parse(recebeDados)      // converte o localStorage

    converteDado.imagem = imagemURL // adiciona a imagem ao objeto JSON

    localStorage.setItem('dados', JSON.stringify(converteDado)) // manda a lista atualizada ao localStorage

    window.location.href = './abrir-conta-form-3.html'
})
