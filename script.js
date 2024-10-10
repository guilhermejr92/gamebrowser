// Classe Heroi representando os personagens da aventura
class Heroi {
    constructor(nome, level, vocacao, vida) {
        this.nome = nome;
        this.level = level;
        this.vocacao = vocacao;
        this.vida = vida;
    }

    // Método atacar, com base na vocação do herói
    atacar() {
        let ataque;
        let dano;

        switch (this.vocacao) {
            case "sorcerer":
                ataque = "magia de fogo";
                dano = Math.floor(Math.random() * 11) + 15; // Dano entre 15 e 25
                break;
            case "knight":
                ataque = "espada";
                dano = Math.floor(Math.random() * 11) + 20; // Dano entre 20 e 30
                break;
            case "druid":
                ataque = "magia de gelo";
                dano = Math.floor(Math.random() * 11) + 10; // Dano entre 10 e 20
                break;
            case "paladin":
                ataque = "arco e flecha";
                dano = Math.floor(Math.random() * 11) + 18; // Dano entre 18 e 28
                break;
            default:
                ataque = "fez um ataque básico";
                dano = Math.floor(Math.random() * 11) + 5; // Dano entre 5 e 15
        }

        log(`${this.nome} atacou usando ${ataque} e causou ${dano} de dano!`);
        return dano;
    }

    // Método para receber dano
    receberDano(dano) {
        this.vida -= dano;
        log(`${this.nome} recebeu ${dano} de dano. Vida restante: ${this.vida}`);

        if (this.vida <= 0) {
            log(`${this.nome} foi derrotado!`);
            return true; // Herói derrotado
        }
        return false;
    }

    // Método para subir de nível
    subirNivel() {
        this.level += 1;
        this.vida += 10; // Ganha mais vida ao subir de nível
        log(`${this.nome} subiu para o nível ${this.level}! Vida aumentou para ${this.vida}`);
    }

    // Método para curar o herói
    curar() {
        let cura;

        switch (this.vocacao) {
            case "druid":
                cura = Math.floor(Math.random() * 11) + 20; // Cura entre 20 e 30 para druida
                break;
            case "sorcerer":
                cura = Math.floor(Math.random() * 11) + 15; // Cura entre 15 e 25 para sorcerer
                break;
            default:
                cura = Math.floor(Math.random() * 11) + 10; // Cura entre 10 e 20 para os outros
        }

        this.vida += cura;
        log(`${this.nome} se curou e recuperou ${cura} de vida! Vida atual: ${this.vida}`);
    }
}

// Função para adicionar log no div
function log(message) {
    const logDiv = document.getElementById('log');
    logDiv.innerHTML += `<p>${message}</p>`;
    logDiv.scrollTop = logDiv.scrollHeight; // Rolagem automática para o final
}

// Função para atualizar o status dos heróis na interface
function atualizarStatus(heroi1, heroi2) {
    document.getElementById('heroi1Vida').textContent = heroi1.vida;
    document.getElementById('heroi2Vida').textContent = heroi2.vida;
}

// Função para escolher uma vocação aleatória
function escolherVocacaoAleatoria() {
    const vocacoes = ["knight", "sorcerer", "druid", "paladin"];
    return vocacoes[Math.floor(Math.random() * vocacoes.length)];
}

// Função para criar dois heróis aleatórios com vocações diferentes
function criarHeroisAleatorios() {
    let vocacao1 = escolherVocacaoAleatoria();
    let vocacao2;

    // Garante que os dois heróis tenham vocações diferentes
    do {
        vocacao2 = escolherVocacaoAleatoria();
    } while (vocacao1 === vocacao2);

    const heroi1 = new Heroi("Arus", Math.floor(Math.random() * 10) + 15, vocacao1, 100);
    const heroi2 = new Heroi("Zyra", Math.floor(Math.random() * 10) + 15, vocacao2, 100);

    log(`Heróis selecionados aleatoriamente: ${heroi1.nome} (${heroi1.vocacao}) vs ${heroi2.nome} (${heroi2.vocacao})`);
    return { heroi1, heroi2 };
}

// Função para iniciar a batalha
function iniciarBatalha() {
    const { heroi1, heroi2 } = criarHeroisAleatorios(); // Cria heróis aleatórios
    let rodada = 1;

    log(`Iniciando a batalha entre ${heroi1.nome} e ${heroi2.nome}!`);

    const batalhaInterval = setInterval(() => {
        log(`--- Rodada ${rodada} ---`);

        // Heroi 1 ataca Heroi 2
        let dano = heroi1.atacar();
        if (heroi2.receberDano(dano)) {
            log(`${heroi1.nome} venceu a batalha!`);
            heroi1.subirNivel();
            clearInterval(batalhaInterval); // Para a batalha
            document.getElementById('iniciarBatalha').disabled = false;
            return;
        }

        // Heroi 2 ataca Heroi 1
        dano = heroi2.atacar();
        if (heroi1.receberDano(dano)) {
            log(`${heroi2.nome} venceu a batalha!`);
            heroi2.subirNivel();
            clearInterval(batalhaInterval); // Para a batalha
            document.getElementById('iniciarBatalha').disabled = false;
            return;
        }

        // Heroi 2 se cura na rodada ímpar
        if (rodada % 2 === 1) {
            heroi2.curar();
        }

        atualizarStatus(heroi1, heroi2);
        rodada += 1;
    }, 1500);
}

// Event listener para o botão de iniciar a batalha
document.getElementById('iniciarBatalha').addEventListener('click', () => {
    document.getElementById('iniciarBatalha').disabled = true; // Desativa o botão durante a batalha
    document.getElementById('log').innerHTML = ''; // Limpa o log
    iniciarBatalha();
});
