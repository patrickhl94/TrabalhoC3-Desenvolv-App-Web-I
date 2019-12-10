const express = require('express')
const path = require('path')

//INICIANDO A FUNÇÃO DO EXPRESS ATRIBUINDO A UMA CONSTANTE
const app = express()
//DEFININDO O PROTOCOLO HTTP
const http = require('http').createServer(app)
//DEFININDO O PROTOCOLO WSS (WEBSOCKETS) 
const io = require('socket.io')(http)

app.use('/', (rec, res) => {
    res.sendFile(path.resolve(__dirname, 'view/index.html'))
})

//ROTA PARA ENVIAR OS DADOS DOS GRAFICOS VIA WEBSOCKETS
io.on('connection', socket => {
    setInterval(() => io.emit('loadDate', uploadDados()), 2000)
})

function uploadDados() {

    let date = {
        numAlunos: 40,
        dadosSatisfacao: [0, 0, 0, 0, 0],
        dadosMedia: [0, 0, 0, 0],
        dadosPercentAprov: [0, 0]
    }

    for (let i = 0; i < date.numAlunos; i++) {

        let notaStisfacao = (Math.random() * 4).toFixed(0)
        let mediaAlunos = (Math.random() * 9).toFixed(1)

        //MEDIA DA TURMA
        if (mediaAlunos >= 0 && mediaAlunos < 3.6) {
            date.dadosMedia[0] += 1

        } else {

            if (mediaAlunos > 3.5 && mediaAlunos < 7) {
                date.dadosMedia[1] += 1
            } else {

                if (mediaAlunos > 6.9 && mediaAlunos < 8.6) {
                    date.dadosMedia[2] += 1
                } else {
                    date.dadosMedia[3] += 1
                }
            }
        }

        //APROVADOS E REPROVADOS
        if (mediaAlunos >= 7) {
            date.dadosPercentAprov[0] += 1
        } else {
            date.dadosPercentAprov[1] += 1
        }

        //NÍVEL DE SATISFAÇÃO DO PROFESSOR
        switch (notaStisfacao) {
            case '0':
                date.dadosSatisfacao[0] += 1
                break;
            case '1':
                date.dadosSatisfacao[1] += 1
                break;
            case '2':
                date.dadosSatisfacao[2] += 1
                break;
            case '3':
                date.dadosSatisfacao[3] += 1
                break;
            case '4':
                date.dadosSatisfacao[4] += 1
                break;
        }
    }
    return date
}
http.listen(3333)