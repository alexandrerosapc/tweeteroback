import express from "express";

const server = express()

server.use(express.json())

const PORT = 5000

const usuarios = []

const tweets = []

server.post("/sing-up", (req, res) => {
    const dadosUsuario = req.body

    const buscarUsuarioExistente = usuarios.find(item => item.username === dadosUsuario.username)

    if (buscarUsuarioExistente) return res.status(409).send("Usuário já existente")

    usuarios.push(dadosUsuario)

    console.log(usuarios)

    res.status(201).send("Usuário criado com sucesso")
})

server.post("/tweets", (req, res) => {
    const dadosTweet = req.body

    const buscarUsuarioCadastrado = usuarios.find(item => item.username === dadosTweet.username)

    if (!buscarUsuarioCadastrado) return res.sendStatus(401)

    tweets.push(dadosTweet)
    
    console.log(tweets)

    res.status(201).send("Tweet criado com sucesso")

})

server.listen(PORT, () => { console.log(`Servidor está funcionando na porta ${PORT}`) })