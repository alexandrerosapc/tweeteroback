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

    if (!dadosUsuario.username || !dadosUsuario.avatar) {
        return res.status(400).send("Todos os campos são obrigatórios")
    }

    if (buscarUsuarioExistente) {
        return res.status(409).send("Usuário já existente")
    }

    usuarios.push(dadosUsuario)

    res.status(201).send("Usuário criado com sucesso")
})

server.post("/tweets", (req, res) => {

    const { username } = req.headers

    const { tweet } = req.body

    if (!username || !tweet) {
        return res.status(400).send("Todos os campos são obrigatórios")
    }

    const buscarUsuarioCadastrado = usuarios.find(item => item.username === username);

    if (!buscarUsuarioCadastrado) {
        return res.sendStatus(401)
    }

    const dadosTweet = { username, tweet }

    tweets.push(dadosTweet)


    res.status(201).send("Tweet criado com sucesso")
})


server.get("/tweets", (req, res) => {
    const page = parseInt(req.query.page) || 1

    const tweetsPerPage = 10

    const start = (page - 1) * tweetsPerPage

    const end = start + tweetsPerPage

    const ultimosTweets = tweets.slice().reverse().slice(start, end).map(tweet => {
        const usuario = usuarios.find(u => u.username === tweet.username)
        return {
            username: tweet.username,
            avatar: usuario.avatar,
            tweet: tweet.tweet
        }
    })

    res.status(200).send(ultimosTweets)
})

server.get("/tweets/:USERNAME", (req, res) => {
    const nomeUsuario = req.params.USERNAME

    const tweetsDoUsuario = tweets.filter(tweet => tweet.username === nomeUsuario).map(tweet => {
        const usuario = usuarios.find(u => u.username === tweet.username)
        return {
            username: tweet.username,
            avatar: usuario.avatar,
            tweet: tweet.tweet
        };
    });

    if (tweetsDoUsuario.length === 0) {
        return res.status(404).send("Usuário ou tweets não encontrados")
    }

    res.status(200).send(tweetsDoUsuario)
})

server.listen(PORT, () => {
    console.log(`Servidor está funcionando na porta ${PORT}`)
})
