const express = require('express')
const app = express()

const path = require("path")

app.use(express.json())

app.use(express.static("build"))

const pokemons = [
  {
    id: 1,
    name: "Pikachu",
    type: "electric ⚡️",
    level: 99,
    image: "/pikachu.webp"
  }
]


app.get("/api/pokemons", (req, res) => {
  console.log("GET /api/pokemons")
  res.send({pokemons: pokemons})
});


app.post("/api/pokemons", (req, res) => {
  const data = req.body
  console.log("POST /api/pokemons", data)

  const newPokemon = new pokemons({
    id: parseInt(data.id)+2,
    name: data.name,
    type: data.type,
    level: data.level,
    image: data.image
  });

  pokemons.push(newPokemon)
  res.send(data)

});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'))
});

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`listening on port ${port}`))


