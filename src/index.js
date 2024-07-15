class Player {
    constructor(nome, velocidade, manobrabilidade, poder, pontos){
        this.nome = nome;
        this.velocidade = velocidade;
        this.manobrabilidade = manobrabilidade;
        this.poder = poder;
        this.pontos = pontos;
    }

    exibirInformacoes() {
        return `${this.nome} ${this.velocidade} ${this.manobrabilidade} ${this.poder} ${this.pontos}`;
    }
}

async function rollDice(){
    return Math.floor(Math.random() * 6) + 1
}

async function getRandomBlock(){
    let random = Math.random()
    let result

    switch (true) {
        case random <= 0.33:
            result = "RETA"
            break;
        
        case random > 0.33 && random < 0.66:
            result = "CURVA"
            break;
        
        default:
            result = "CONFRONTO"
    }
    
    return result
}

async function logRollResult(characterName, block, diceResult, attribute){
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${attribute} + ${attribute} = ${diceResult + attribute}`)

}

async function playRaceEngine(character1, character2){
    for(let round = 1; round <= 5; round ++){
        console.log(`🏁 Rodada ${round}`)

        // sortear bloco
        let block = await getRandomBlock()
        console.log(`Bloco: ${block}`)

        // rolar os dados
        let diceResult1 = await rollDice()
        let diceResult2 = await rollDice()

        // teste de habilidade
        let totalTestSkill1 = 0
        let totalTestSkill2 = 0

        if(block === "RETA"){
            totalTestSkill1 = diceResult1 + character1.velocidade
            totalTestSkill2 = diceResult2 + character2.velocidade

            await logRollResult(
                character1.nome, 
                "Velocidade", 
                diceResult1, 
                character1.velocidade
            )

            await logRollResult(
                character2.nome, 
                "Velocidade", 
                diceResult2, 
                character2.velocidade
            )
        }

        else if(block === "CURVA"){
            totalTestSkill1 = diceResult1 + character1.manobrabilidade
            totalTestSkill2 = diceResult2 + character2.manobrabilidade

            await logRollResult(
                character1.nome, 
                "Manobrabilidade", 
                diceResult1, 
                character1.manobrabilidade
            )

            await logRollResult(
                character2.nome, 
                "Manobrabilidade", 
                diceResult2, 
                character2.manobrabilidade
            )
        }

        else if(block === "CONFRONTO"){
            let powerResult1 = diceResult1 + character1.poder
            let powerResult2 = diceResult2 + character2.poder

            console.log(`${character1.nome} confrontou com ${character2.nome}! 🥊`)
            
            await logRollResult(
                character1.nome, 
                "Poder", 
                diceResult1, 
                character1.poder
            )

            await logRollResult(
                character2.nome, 
                "Poder", 
                diceResult2, 
                character2.poder
            )
            
            if (powerResult1 > powerResult2 && character2.pontos > 0) {
                console.log(
                  `${character1.nome} venceu o confronto! ${character2.nome} perdeu 1 ponto 🐢`
                );
                character2.pontos--;
            }


            if (powerResult2 > powerResult1 && character1.pontos > 0) {
                console.log(
                  `${character2.nome} venceu o confronto! ${character1.nome} perdeu 1 ponto 🐢`
                );
                character1.pontos--;
            }
            
            console.log(
                powerResult2 === powerResult1
                  ? "Confronto empatado! Nenhum ponto foi perdido"
                  : ""
            );
        }

        if(totalTestSkill1 > totalTestSkill2){
            console.log(`${character1.nome} marcou um ponto!`)
            character1.pontos++
        }
        
        else if(totalTestSkill2 > totalTestSkill1){
            console.log(`${character2.nome} marcou um ponto!`)
            character2.pontos++
        }

        console.log("------------------------------------------------------------")
    }

        
}

async function declareWinner(character1, character2) {
    console.log("Resultado final:");
    console.log(`${character1.nome}: ${character1.pontos} ponto(s)`);
    console.log(`${character2.nome}: ${character2.pontos} ponto(s)`);
  
    if (character1.pontos > character2.pontos)
      console.log(`\n${character1.nome} venceu a corrida! Parabéns! 🏆`);
    else if (character2.pontos > character1.pontos)
      console.log(`\n${character2.nome} venceu a corrida! Parabéns! 🏆`);
    else console.log("A corrida terminou em empate");
}


(async function main(){
    let mario = new Player('Mario', 4, 3, 3, 6)
    let luigi = new Player('Luigi', 3, 4, 4, 6)

    console.log(
        `🏁🚨 Corrida entre ${mario.nome} e ${luigi.nome} começando...\n`
    )
    
    await playRaceEngine(mario, luigi)
    await declareWinner(mario, luigi)
})()