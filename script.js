class Heroi {
    constructor(nome, level, vocacao, vida) {
        this.nome = nome;
        this.level = level;
        this.vocacao = vocacao;
        this.vida = vida;
    }

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

    receberDano(dano) {
        this.vida -= dano;
        log(`${this.nome} recebeu ${dano} de dano. Vida restante: ${this.vida}`);

        if (this.vida <= 0) {
            log(`${this.nome} foi derrotado!`);
            return true; // Herói derrotado
        }
        return false;
    }

    subirNivel() {
        this.level += 1;
        this.vida += 10; // Ganha mais vida ao subir de nível
        log(`${this.nome} subiu para o nível ${this.level}! Vida aumentou para ${this.vida}`);
    }

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

// Função para gerar uma vocação aleatória
function gerarVocacaoAleatoria() {
    const vocacoes = ["knight", "sorcerer", "druid", "paladin"];
    const vocacaoAleatoria = vocacoes[Math.floor(Math.random() * vocacoes.length)];
    return vocacaoAleatoria;
}

// Função para atualizar o status dos heróis na interface
function atualizarStatus(heroi1, heroi2) {
    document.getElementById('heroi1Vida').textContent = heroi1.vida;
    document.getElementById('heroi2Vida').textContent = heroi2.vida;
    atualizarBarraDeVida('Heroi1', heroi1.vida);
    atualizarBarraDeVida('Heroi2', heroi2.vida);
}

// Função para atualizar as barras de vida
function atualizarBarraDeVida(heroi, vida) {
    const barra = document.getElementById(`barraVida${heroi}`);
    const vidaPercentual = (vida / 100) * 100; // Calcule a porcentagem
    barra.style.width = `${vidaPercentual}%`; // Atualiza a largura da barra
}

// Função para atualizar o avatar de acordo com a vocação
function atualizarAvatar(heroi, vocacao) {
    const avatar = document.getElementById(`avatar${heroi}`);
    let caminhoImagem;

    switch (vocacao) {
        case "knight":
            caminhoImagem = "imagens/knight.png";
            break;
        case "sorcerer":
            caminhoImagem = "imagens/sorcerer.png";
            break;
        case "druid":
            caminhoImagem = "imagens/druid.png";
            break;
        case "paladin":
            caminhoImagem = "imagens/paladin.png";
            break;
        default:
            caminhoImagem = "imagens/default.png"; // Imagem padrão caso algo dê errado
    }

    avatar.src = caminhoImagem; // Atualiza a imagem do avatar
}

// Função para iniciar a batalha
function iniciarBatalha() {
    // Definindo vocações aleatórias para cada herói
    const vocacaoAleatoriaHeroi1 = gerarVocacaoAleatoria();
    const vocacaoAleatoriaHeroi2 = gerarVocacaoAleatoria();

    // Criando heróis com vocações aleatórias
    const heroi1 = new Heroi("Arus", 1, vocacaoAleatoriaHeroi1, 100);
    const heroi2 = new Heroi("Zyra", 1, vocacaoAleatoriaHeroi2, 100);

    // Atualizando os nomes e vocações na interface
    document.getElementById('heroi1Nome').textContent = `${heroi1.nome} (${heroi1.vocacao})`;
    document.getElementById('heroi2Nome').textContent = `${heroi2.nome} (${heroi2.vocacao})`;

    // Atualizando as imagens dos avatares
    atualizarAvatar('Heroi1', vocacaoAleatoriaHeroi1);
    atualizarAvatar('Heroi2', vocacaoAleatoriaHeroi2);

    // Iniciando a batalha
    let batalha = setInterval(() => {
        let dano1 = heroi1.atacar();
        if (heroi2.receberDano(dano1)) {
            clearInterval(batalha);
            return;
        }

        atualizarStatus(heroi1, heroi2); // Atualiza status após o ataque

        let dano2 = heroi2.atacar();
        if (heroi1.receberDano(dano2)) {
            clearInterval(batalha);
            return;
        }

        atualizarStatus(heroi1, heroi2); // Atualiza status após o ataque
    }, 1000);
}

// Evento de clique para iniciar a batalha
document.getElementById('iniciarBatalha').addEventListener('click', iniciarBatalha);