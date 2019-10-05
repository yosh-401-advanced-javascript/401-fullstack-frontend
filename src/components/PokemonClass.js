
export default class Pokemon {
  constructor(pokeData) {
    this.id = pokeData.id;
    this.name = pokeData.name;
    this.sprites = pokeData.sprites.front_default;
    this.type = pokeData.types[0].type.name;
  }
}
