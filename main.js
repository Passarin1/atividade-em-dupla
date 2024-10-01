// Personagens
const personagens = {
    cavaleiro: { nome: "Cavaleiro", vida: 100, ataque: 15, defesa: 10 },
    mago: { nome: "Mago", vida: 70, ataque: 25, defesa: 5 },
    arqueiro: { nome: "Arqueiro", vida: 80, ataque: 20, defesa: 8 },
    balanceado: { nome: "Balanceado", vida: 85, ataque: 18, defesa: 9 }
};

prompt // add o propite para o usuario enteragir com o jogo ,

// Criaturas Demônios Menores
const demonioMenor = { nome: "Demônio Menor", vida: 40, ataque: 12, defesa: 4 };

// Guardião Demoníaco
const guardiao = { nome: "Guardião Demoníaco", vida: 150, ataque: 20, defesa: 8 };

let jogador;

// Função de rolar dados d100
function rolarDado() {
    return Math.floor(Math.random() * 100) + 1;
}

// Função de ataque
function atacar(atacante, defensor) {
    let rolagem = rolarDado();
    if (rolagem > 50) {  // Chance de acerto
        let dano = atacante.ataque - defensor.defesa;
        if (dano < 0) dano = 0;
        defensor.vida -= dano;
        console.log(`${atacante.nome} acertou! Causou ${dano} de dano.`);
    } else {
        console.log(`${atacante.nome} errou o ataque!`);
    }
}

// Função para iniciar o combate
function iniciarCombate(inimigo) {
    console.log(`Você encontrou um ${inimigo.nome}! Prepare-se para lutar!`);

    while (jogador.vida > 0 && inimigo.vida > 0) {
        atacar(jogador, inimigo);
        if (inimigo.vida > 0) {
            atacar(inimigo, jogador);
        }
    }

    if (jogador.vida > 0) {
        console.log(`Você derrotou o ${inimigo.nome}!`);
    } else {
        console.log("Você foi derrotado!");
    }
}

// Função para selecionar personagem
function selecionarPersonagem(personagemEscolhido) {
    if (personagens[personagemEscolhido]) {
        jogador = { ...personagens[personagemEscolhido] };
        console.log(`Você escolheu: ${jogador.nome}`);
        iniciarMissao();
    } else {
        console.log("Personagem inválido. Escolha entre: cavaleiro, mago, arqueiro, balanceado.");
    }
}

// Função de iniciar a missão
function iniciarMissao() {
    console.log("Sua missão é explorar as ruínas e encontrar o artefato mágico.");
    iniciarCombate(demonioMenor);
    if (jogador.vida > 0) {
        iniciarCombate(guardiao);
        if (jogador.vida > 0) {
            entregarArtefato();
        }
    }
}

// Função para entregar o artefato
function entregarArtefato() {
    const entrega = prompt("Você derrotou o Guardião! Deseja entregar o artefato ao rei? (sim/não)").toLowerCase();
    
    if (entrega === 'sim') {
        console.log("Parabéns! Você entregou o artefato ao rei e completou sua missão!");
    } else if (entrega === 'não') {
        console.log("Você decidiu não entregar o artefato. Sua aventura continua...");
        // Aqui você pode adicionar mais lógica se desejar
    } else {
        console.log("Resposta inválida. O artefato ainda está com você.");
        entregarArtefato(); // Pergunta novamente
    }
}

// Alerta de boas-vindas ao iniciar o jogo
alert("Bem-vindo ao jogo de RPG 'Missão das Ruínas Antigas'!\n" +
      "Escolha seu personagem digitando: \nselecionar Personagem(Cavaleiro)" +
      "\nselecionar Personagem(Mago)\nselecionar Personagem(Arqueiro)" +
      "\nselecionar Personagem(Balanceado)");

// Exemplo de chamada inicial
console.log("Digite seu personagem para começar a aventura!");