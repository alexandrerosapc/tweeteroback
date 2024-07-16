import express from "express";

import cors from "cors"

const server = express()

server.use(express.json())

server.use(cors())

const PORT = 5000

const usuarios = []

const tweets = []

server.post("/sign-up", (req, res) => {
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

server.get("/tweets", (req, res) => {
// retornar um array de objetos com os 10 últimos tweets públicados contendo o username, avatar e o tweet

    const ultimos10Tweets = tweets.slice(-10).reverse().map(tweet =>{
        const  usuario = usuarios.find(u => u.username === tweet.username)
        return {
            username: tweet.username,
            avatar: usuario.avatar,
            tweet: tweet.tweet
        }
    })
    res.status(200).send(ultimos10Tweets)
})

server.listen(PORT, () => { console.log(`Servidor está funcionando na porta ${PORT}`) })