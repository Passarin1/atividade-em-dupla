// Personagens
const personagens = {
    cavaleiro: { nome: "Cavaleiro", vida: 100, ataque: 15, defesa: 10, magia: null, itens: [] },
    mago: { nome: "Mago", vida: 70, ataque: 25, defesa: 5, magia: "Bola de Fogo", itens: [] },
    arqueiro: { nome: "Arqueiro", vida: 80, ataque: 20, defesa: 8, magia: null, itens: [] },
    personalizado: { nome: "Personalizado", vida: 85, ataque: 18, defesa: 9, magia: "Raio", itens: [] }
};

// Criaturas
const demonioMenor = { nome: "Demônio Menor", vida: 40, ataque: 12, defesa: 4 };
const guardiao = { nome: "Guardião Demoníaco", vida: 150, ataque: 20, defesa: 8 };

let jogador;

// Função de rolar dados d100
function rolarDado() {
    return Math.floor(Math.random() * 100) + 1;
}

// Função de atacar
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

// Função de defesa
function defender(defensor) {
    console.log(`${defensor.nome} se preparou para defender!`);
    defensor.defesa *= 2; // Aumenta a defesa temporariamente
}

// Função de usar magia
function usarMagia(atacante, defensor) {
    if (atacante.magia) {
        console.log(`${atacante.nome} usou ${atacante.magia}!`);
        let dano = 30; // Dano fixo para magia
        defensor.vida -= dano;
        console.log(`${defensor.nome} recebeu ${dano} de dano.`);
    } else {
        console.log(`${atacante.nome} não tem magia para usar!`);
    }
}

// Função de fugir
function fugir() {
    console.log("Você conseguiu fugir da batalha!");
    return true;
}

// Função para iniciar o combate
function iniciarCombate(inimigo) {
    console.log(`Você encontrou um ${inimigo.nome}! Prepare-se para lutar!`);

    while (jogador.vida > 0 && inimigo.vida > 0) {
        console.log(`\nVida do Jogador: ${jogador.vida}`);
        console.log(`Vida do Inimigo: ${inimigo.vida}`);

        let acao = prompt("Escolha sua ação: (atacar, defender, usar magia, fugir)").toLowerCase();

        if (acao === "atacar") {
            atacar(jogador, inimigo);
        } else if (acao === "defender") {
            defender(jogador);
        } else if (acao === "usar magia") {
            usarMagia(jogador, inimigo);
        } else if (acao === "fugir") {
            if (fugir()) return; // Saída da função se fugiu
        } else {
            console.log("Ação inválida, tente novamente.");
            continue; // Volta ao início do loop
        }

        if (inimigo.vida > 0) {
            atacar(inimigo, jogador);
        }
    }

    if (jogador.vida > 0) {
        console.log(`Você derrotou o ${inimigo.nome}!`);
    } else {
        console.log("Você foi derrotado!\nGame over");
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
    const entrega = prompt("Você volta ao reino e se encontra com o rei. Você deseja entregar o artefato ao rei? (sim/não)").toLowerCase();
    
    if (entrega === 'sim') {
        console.log("Parabéns! Você entregou o artefato ao rei e completou sua missão!");
    } else if (entrega === 'não') {
        console.log("Você decidiu não entregar o artefato. Sua aventura continua...");
    } else {
        console.log("Resposta inválida. O artefato ainda está com você.");
        entregarArtefato(); // Pergunta novamente
    }
}

// Função para selecionar personagem
function selecionarPersonagem(personagemEscolhido) {
    if (personagens[personagemEscolhido]) {
        jogador = { ...personagens[personagemEscolhido] };
        console.log(`Você escolheu: ${jogador.nome}`);
        iniciarMissao();
    } else {
        console.log("Personagem inválido. Escolha entre: cavaleiro, mago, arqueiro, personalizado.");
        iniciarJogo(); // Reinicia o jogo se a escolha for inválida
    }
}

// Função para iniciar o jogo
function iniciarJogo() {
    alert("Bem-vindo ao jogo de RPG 'Missão das Ruínas Antigas'!\nEstá pronto para a aventura?");
    const personagemEscolhido = prompt("Digite o personagem que você quer jogar: " +
        "Escolha seu personagem digitando:\n" +
        "cavaleiro\nmago\narqueiro\npersonalizado").toLowerCase();
    selecionarPersonagem(personagemEscolhido);
}

// Chamada inicial para iniciar o jogo
iniciarJogo();
