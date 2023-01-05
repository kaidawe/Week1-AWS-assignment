const express = require('express')
const app = express()

const path = require("path")

app.use(express.json())

app.use(express.static("build"))



function Pokemon(id, name, type, level, image) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.level = level;
    this.image = image;
  }
  
  const pokemons = [
    new Pokemon(1, "Pikachu", "electric ⚡️", 99, "/pikachu.webp")
  ];

  app.get("/api/pokemons", (req, res) => {
    console.log("GET /api/pokemons")
    console.log(res);
    res.send({pokemons: pokemons})
  });
  
  app.post("/api/pokemons", (req, res) => {
    const data = req.body;
    console.log("POST /api/pokemons", data);
  
    const newPokemon = new Pokemon(
      data.id+1,
      data.name,
      data.type,
      parseInt(data.level),
      data.image
    );
  
    pokemons.push(newPokemon);
    res.send(pokemons);
  });
  
  
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'))
});

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`listening on port ${port}`))


