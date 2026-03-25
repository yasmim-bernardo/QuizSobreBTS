function escaparHtml(valor) {
    return String(valor)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function montarDetalhesCorrecao(detalhes) {
    const itens = detalhes.map((item) => {
        const classeStatus = item.status === "acertou"
            ? "acertou"
            : item.status === "errou"
                ? "errou"
                : "nao-respondida";

        const textoStatus = item.status === "acertou"
            ? "Acertou"
            : item.status === "errou"
                ? "Errou"
                : "N\u00E3o respondida";

        return `
            <li class="item-correcao ${classeStatus}">
                <span class="badge-status">${textoStatus}</span>
                <p class="pergunta-correcao">${escaparHtml(item.titulo)}</p>
                <p><strong>Sua resposta:</strong> ${escaparHtml(item.respostaUsuario)}</p>
                <p><strong>Resposta correta:</strong> ${escaparHtml(item.respostaCorreta)}</p>
            </li>
        `;
    }).join("");

    return `<ul class="lista-correcao">${itens}</ul>`;
}

function calcularResultado() {
    const perguntas = {
        pergunta1: {
            titulo: "1. Qual \u00E9 o nome verdadeiro do RM?",
            correta: "Kim Namjoon"
        },
        pergunta2: {
            titulo: "2. Em que ano o BTS debutou oficialmente?",
            correta: "2013"
        },
        pergunta3: {
            titulo: "3. Qual desses membros \u00E9 o mais novo do grupo?",
            correta: "Jungkook"
        },
        pergunta4: {
            titulo: "4. Qual foi o primeiro single oficial do BTS?",
            correta: "No More Dream"
        },
        pergunta5: {
            titulo: "5. Qual desses \u00E1lbuns pertence \u00E0 trilogia The Most Beautiful Moment in Life?",
            correta: "The Most Beautiful Moment in Life, Part 1"
        },
        pergunta6: {
            titulo: "6. O que significa o nome BTS?",
            correta: "Bangtan Sonyeondan"
        },
        pergunta7: {
            titulo: "7. Qual membro \u00E9 conhecido como Worldwide Handsome?",
            correta: "Jin"
        },
        pergunta8: {
            titulo: "8. Qual desses \u00E9 o nome do fandom oficial do BTS?",
            correta: "ARMY"
        },
        pergunta9: {
            titulo: "9. Qual dessas m\u00FAsicas foi indicada ao Grammy?",
            correta: "Dynamite"
        },
        pergunta10: {
            titulo: "10. Qual \u00E9 o lema do BTS segundo o RM?",
            correta: "Love Myself, speak yourself"
        }
    };

    const totalPerguntas = Object.keys(perguntas).length;
    let pontos = 0;
    let respondidas = 0;
    const detalhes = [];

    for (const nomePergunta in perguntas) {
        const selecionada = document.querySelector(`input[name="${nomePergunta}"]:checked`);
        const respostaCorreta = perguntas[nomePergunta].correta;
        let status = "nao-respondida";
        let respostaUsuario = "N\u00E3o respondida";

        if (selecionada) {
            respondidas++;
            respostaUsuario = selecionada.value;

            if (selecionada.value === respostaCorreta) {
                pontos++;
                status = "acertou";
            } else {
                status = "errou";
            }
        }

        detalhes.push({
            titulo: perguntas[nomePergunta].titulo,
            status,
            respostaUsuario,
            respostaCorreta
        });
    }

    const resultado = document.getElementById("resultado");
    const pontuacao = document.getElementById("pontuacao");
    const mensagem = document.getElementById("mensagem");
    const detalhesResultado = document.getElementById("detalhes-resultado");

    if (!resultado || !pontuacao || !mensagem || !detalhesResultado) {
        return;
    }

    detalhesResultado.innerHTML = montarDetalhesCorrecao(detalhes);

    if (respondidas < totalPerguntas) {
        resultado.innerHTML = "Responda todas as perguntas para ver seu resultado final.";
        pontuacao.textContent = `Voc\u00EA respondeu ${respondidas} de ${totalPerguntas}.`;
        mensagem.textContent = "Veja abaixo a corre\u00E7\u00E3o de cada pergunta.";
        return;
    }

    resultado.innerHTML = `Voc\u00EA acertou <strong>${pontos}</strong> de ${totalPerguntas} perguntas!`;
    pontuacao.textContent = `Pontua\u00E7\u00E3o: ${pontos}/${totalPerguntas}`;

    if (pontos === totalPerguntas) {
        mensagem.textContent = "Incr\u00EDvel! Voc\u00EA \u00E9 um verdadeiro ARMY!";
    } else if (pontos >= 7) {
        mensagem.textContent = "Quase perfeito! Voc\u00EA conhece muito sobre BTS!";
    } else if (pontos >= 4) {
        mensagem.textContent = "Bom! Continue estudando sobre o grupo!";
    } else {
        mensagem.textContent = "Parece que voc\u00EA est\u00E1 come\u00E7ando agora. Vamos aprender juntos!";
    }
}

function iniciarMenuHamburguer() {
    const menu = document.querySelector(".menu-principal");
    if (!menu) {
        return;
    }

    const botaoMenu = menu.querySelector(".menu-toggle");
    const linksMenu = menu.querySelector(".menu-links");

    if (!botaoMenu || !linksMenu) {
        return;
    }

    const fecharMenu = () => {
        menu.classList.remove("menu-aberto");
        botaoMenu.setAttribute("aria-expanded", "false");
    };

    const alternarMenu = () => {
        const aberto = menu.classList.toggle("menu-aberto");
        botaoMenu.setAttribute("aria-expanded", aberto ? "true" : "false");
    };

    botaoMenu.addEventListener("click", alternarMenu);

    linksMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 768) {
                fecharMenu();
            }
        });
    });

    document.addEventListener("click", (evento) => {
        if (window.innerWidth <= 768 && !menu.contains(evento.target)) {
            fecharMenu();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            fecharMenu();
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    iniciarMenuHamburguer();

    const botaoEnviar = document.getElementById("btn-enviar");
    if (botaoEnviar) {
        botaoEnviar.addEventListener("click", calcularResultado);
    }
});
