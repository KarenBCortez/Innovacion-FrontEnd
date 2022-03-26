let lastId=0

const getPokemon = () =>{
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();

    const url= `https://pokeapi.co/api/v2/pokemon/${pokeName}`
    fetch(url).then((res) => {
        console.log(res)
        if(res.status == 200){
            return res.json()
        } else{
            return  null
        }
       
    }).then((data) =>{

        if(data == null){
            alert ("Pokemon no encontrado");  
        } else{
            console.log(data.sprites.front_default)
            pokeImage(data.sprites.front_default);
            changeStyles(data.forms[0].name, data.id, data.types[0].type.name, data.moves, data.stats);
            lastId = data.id
        }
    })
}

const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    console.log(url)
    pokePhoto.src = url;
}

const changeStyles = (name,id,type,moves,stats) => {
    const styleImagen = document.getElementById("top-img-pokemon");
    styleImagen.className = 'top-img-pokemon-active';

    const styleText = document.getElementById("info-pokemon");
    styleText.className = 'info-pokemon-activate';

    const pokeNameLabel = document.getElementById("pokeNameLabel");
    pokeNameLabel.innerHTML = `Name:  ${name}`
    
    const pokeIdLabel = document.getElementById("pokeIdLabel");
    pokeIdLabel.innerHTML = `ID:  ${id}`

    const pokeType = document.getElementById("pokeType");
    pokeType.innerHTML = `Type:  ${type}`

    const pokeMoves = document.getElementById("pokeMoves");
    let movesText = ''
    console.log(moves)
    moves.forEach(element => movesText == '' ? movesText=element.move.name : movesText=movesText +','+element.move.name);
    pokeMoves.innerHTML = `Moves:  ${movesText}`

    let statText = ''
    const pokeStats = document.getElementById("pokeStats");
    stats.forEach(element => statText == '' ? statText=element.stat.name : statText=statText +','+element.stat.name)
    pokeStats.innerHTML = `Stats:  ${statText}`
   

}

const getPokemonId = (next) =>{

    let id = 0
    console.log(lastId)
    if(Boolean(next)){
        id = lastId + 1
    } else {
        id = lastId -1
    }
     console.log(id)

    const url= `https://pokeapi.co/api/v2/pokemon/${id}`
    fetch(url).then((res) => {
        console.log(res)
        if(res.status == 200){
            return res.json()
        } else{
            return  null
        }
       
    }).then((data) =>{
        console.log(data.sprites.front_default)
        pokeImage(data.sprites.front_default);
        changeStyles(data.forms[0].name, data.id, data.types[0].type.name,data.moves, data.stats);
        lastId = data.id
    })
}