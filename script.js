function calcularResultado() {

    // Respostas corretas
    const respostas = {
        pergunta1: "Kim Namjoon",
        pergunta2: "2013",
        pergunta3: "jungkook",
        pergunta4: "No More Dream",
        pergunta5: "The Most Beautiful Moment in Life, Part 1",
        pergunta6: "Bangtan Sonyeondan",
        pergunta7: "Jin",
        pergunta8: "ARMY",
        pergunta9: "Dynamite",
        pergunta10: "Love Myself, speak yourself"
    };

    let pontos = 0;

    // Verifica cada questão
    for (let pergunta in respostas) {
        const selecionada = document.querySelector(`input[name="${pergunta}"]:checked`);

        if (selecionada && selecionada.value === respostas[pergunta]) {
            pontos++;
        }
    }

    // Exibe o resultado
    const resultado = document.getElementById("resultado");

    resultado.innerHTML = `Você acertou <strong>${pontos}</strong> de 10 perguntas!`;

    if (pontos === 10) {
        resultado.innerHTML += "<br>💜 Incrível! Você é um verdadeiro ARMY!";
    } else if (pontos >= 7) {
        resultado.innerHTML += "<br>💜 Quase perfeito! Você conhece muito sobre BTS!";
    } else if (pontos >= 4) {
        resultado.innerHTML += "<br>✨ Bom! Continue estudando sobre o grupo!";
    } else {
        resultado.innerHTML += "<br>😅 Parece que você está começando agora. Vamos aprender juntos!";
    }
}
