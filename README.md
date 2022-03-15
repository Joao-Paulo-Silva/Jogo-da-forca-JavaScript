# Jogo da Forca em JavaScript
## Feito por João Paulo da Silva Barros

---

Neste jogo foram utilizados ``JavaScript``, ``Html`` e gráficos vetoriais escalonáveis(``svg``). A tela principal do jogo com a forca é um svg, feito no figma e inkscape.

Que se encontra na pasta ``Jogo-da-forca-JavaScript/imagens/forca.svg``: 

``` BASH
   📦Jogo-da-forca-JavaScript
    ┣ 📁css 
    ┣ 📂imagens
    ┣ ┣ 🖼 iconPag.svg
    ┃ ┗ 🖼 forca.svg
    ┣ 📂js
    ┃ ┗ 📜 script.js
    ┗ 📜 index.html
```

Inserir o código do svg no ``html`` index.html, e foi adicionado id as tags do svg para a manipulação via ``javaScript``, como por exemplo deixar partes visíveis/invisíveis ou adicionar textos ao svg.

---

### Iniciar o jogo:

Para iniciar o jogo clique no botão play na tela ou no console digite ``start()``, após aparecerá a tela de modo de jogo, no qual é só escolher a quantidade de jogadores.

### Regras do Jogo!

Cada letra acertada na palavra vale 5 pontos, ao acertar toda a palavras pode da play para a próxima palavra o jogo termina quando o jogador gastar sua 6 tentativas, essas tentativas reiniciam a cada nova palavra, ao da **GameOver** é mostrado o recorde acumulado.

No **multi-jogador** ganhar quem acerta a palavra sozinho, se os dois erraram ou acertaram é considerado um empate.

---

#### ``@author João Paulo``, Link para acessar o site com o projeto no [Jogo da Forca](https://cranky-carson-9f48a0.netlify.app/).
