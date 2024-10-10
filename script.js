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
                ataque = "magia";
                dano = Math.floor(Math.random() * 11) + 15; // Dano entre 15 e 25
                break;
            case "knight":
                ataque = "espada";
                dano = Math.floor(Math.random() * 11) + 20; // Dano entre 20 e 30
                break;
            case "druid":
                ataque = "magia de cura";
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

// Função para iniciar a batalha
function iniciarBatalha() {
    const heroi1 = new Heroi("Arus", 20, "knight", 100);
    const heroi2 = new Heroi("Zyra", 18, "sorcerer", 80);
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
