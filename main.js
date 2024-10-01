// Personagens
const personagens = {
    cavaleiro: { nome: "Cavaleiro", vida: 100, ataque: 15, defesa: 10 },
    mago: { nome: "Mago", vida: 70, ataque: 25, defesa: 5 },
    arqueiro: { nome: "Arqueiro", vida: 80, ataque: 20, defesa: 8 },
    balanceado: { nome: "Balanceado", vida: 85, ataque: 18, defesa: 9 }
};

// Criaturas Demônios Menores
const demonioMenor = { nome: "Demônio Menor", vida: 40, ataque: 12, defesa: 4 };

// Guardião Demoníaco
const guardiao = { nome: "Guardião Demoníaco", vida: 150, ataque: 20, defesa: 8 };

let jogador;

// Função para exibir mensagens na tela
function exibirMensagem(mensagem) {
    const output = document.getElementById("output");
    output.innerHTML += mensagem + "<br>";
    output.scrollTop = output.scrollHeight;
}

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
        exibirMensagem(${atacante.nome} acertou! Causou ${dano} de dano.);
    } else {
        exibirMensagem(${atacante.nome} errou o ataque!);
    }
}

// Função para iniciar o combate
function iniciarCombate(inimigo) {
    exibirMensagem(Você encontrou um ${inimigo.nome}! Prepare-se para lutar!);

    while (jogador.vida > 0 && inimigo.vida > 0) {
        atacar(jogador, inimigo);
        if (inimigo.vida > 0) {
            atacar(inimigo, jogador);
        }
    }

    if (jogador.vida > 0) {
        exibirMensagem(Você derrotou o ${inimigo.nome}!);
    } else {
        exibirMensagem("Você foi derrotado!");
    }
}

// Função para selecionar personagem
function selecionarPersonagem() {
    let escolha = prompt("Escolha seu personagem: Cavaleiro, Mago, Arqueiro, Balanceado").toLowerCase();
    if (personagens[escolha]) {
        jogador = { ...personagens[escolha] };
        exibirMensagem(Você escolheu: jogador.nome);
        iniciarMissao();
    } else {
        exibirMensagem("Escolha inválida. Tente novamente.");
        selecionarPersonagem();
    }
}

// Função de iniciar a missão
function iniciarMissao() {
    exibirMensagem("Sua missão é explorar as ruínas e encontrar o artefato mágico.");
    iniciarCombate(demonioMenor);
    if (jogador.vida > 0) {
        iniciarCombate(guardiao);
        if (jogador.vida > 0) {
            exibirMensagem("Parabéns! Você recuperou o artefato mágico.");
        }
    }
}