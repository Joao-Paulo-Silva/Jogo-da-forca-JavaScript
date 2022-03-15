// Listas para guardar as atualizações.
var listaIdLetras = [],
  listaSvgPartes = [],
  palavra = [],
  letrasSelecionadas = [],
  letrasErr = [],
  listaPalavrasErradasMultp = ["", ""],
  listaPalavrasCertasMultp = ["", ""],
  ListaParaManipularPlayers = {
    player1: [],
    player2: [],
    p1LetrasErradas: [],
    p2LetrasErradas: [],
    p1LetrasErradasCertas: [],
    p2LetrasCertas: [],
  };
JogadoresDados = {
  player1: [],
  player2: [],
  idLi1: [],
  idLi2: [],
  resultado1: 0,
  resultado2: 0,
  tentativas1: 6,
  tentativas2: 6,
};

var palavrasMutiplay = {
  1: {
    dica: "Um País com 5 letras!",
    Palavra1: "Egito",
    Palavra2: "Índia",
  },
  2: {
    dica: "Um País com 5 letras!",
    Palavra1: "Angola",
    Palavra2: "Brasil",
  },
  3: {
    dica: "Uma Fruta com 7 letras!",
    Palavra1: "Abacaxi",
    Palavra2: "Abacate",
  },
  4: {
    dica: "Um Animal com 4 letras!",
    Palavra1: "Raia",
    Palavra2: "Sapo",
  },
  5: {
    dica: "Um País com 6 letras",
    Palavra1: "Angola",
    Palavra2: "Brasil",
  },
  6: {
    dica: "Um Fruta com 4 letras",
    Palavra1: "caju",
    Palavra2: "Coco",
  },
  7: {
    dica: "Um Fruta com 4 letras",
    Palavra1: "Açaí",
    Palavra2: "Maçã",
  },
  8: {
    dica: "Um Tecnologia com 8 letras",
    Palavra1: "Telefone",
    Palavra2: "Projetor",
  },
  9: {
    dica: "Um Oceano com 6 letras",
    Palavra1: "Índico",
    Palavra2: "Ártico",
  },
};

// Variaveis de controle.
var tentativas = 0,
  resultado = 0,
  score = 0,
  modoDeJogo = 0,
  jogador = 0;

// Lista de palavras.
var listaPaises = [
  "Angola",
  "Argentina",
  "Brasil",
  "África do Sul",
  "Egito",
  "Índia",
  "Camarões",
  "Cuba",
  "Estados Unidos",
  "Paraguai",
];
var listaFrutas = [
  "Abacaxi",
  "Abacate",
  "Mamão",
  "Banana",
  "Jatobá",
  "caju",
  "Goiaba",
  "Maçã",
  "Pera",
  "Açaí",
  "Amora",
  "Coco",
  "Guaraná",
];
var listaAnimais = [
  "Ganso",
  "Raia",
  "Sapo",
  "Tartaruga",
  "Garça",
  "Ornitorrinco",
  "Girafa",
  "Urso",
  "Lêmures",
  "Tamanduá",
  "Preguiça",
  "Coruja",
  "Papagaio",
  "Seriemas",
  "Gato",
  "Cachorro",
  "Abelha",
  "Camaleão",
  "Ovelha",
  "Golfinho",
  "Urubu",
  "Hiena",
  "Leão",
  "Baleia",
];
var listaOceanos = ["Pacífico", "Atlântico", "Índico", "Ártico"];
var listaTecnologia = [
  "Celular",
  "Computador",
  "Telefone",
  "JavaScript",
  "React Native",
  "Java",
  "Mouse",
  "Teclado",
  "Monitor",
  "Câmera",
  "Projetor",
];

// Função para definir partes do svg invisivel.
window.onload = function () {
  document.getElementById("player1Win").style.visibility = "hidden";
  document.getElementById("player2Win").style.visibility = "hidden";
  document.getElementById("empateID").style.visibility = "hidden";
  document.getElementById("telaWinMult").style.visibility = "hidden";
  document.getElementById("gameOverID").style.visibility = "hidden";
  document.getElementById("botaoReiniciar").style.visibility = "hidden";
  document.getElementById("gameWinID").style.visibility = "hidden";
  document.getElementById("forcaDuplaID").style.visibility = "hidden";
  document.getElementById("modoJogoID").style.visibility = "hidden";
  document.getElementById("telaWinMult").style.visibility = "hidden";
  
  
};

// Função para gerar os li das palavras a serem acertadas, retorna uma lista com os ids dos li.
function criaLista(texto = [], tag, id) {
  var ListaPalavras = document.getElementById(tag);
  var listaId = [];
  for (var i = 0; i < texto.length; i++) {
    var novoLi = document.createElement("li");
    novoLi.textContent = "  ";
    if (texto[i] != " ") {
      novoLi.className = "letra";
      listaId.push(id + i);
      novoLi.id = id + i;
    } else {
      novoLi.className = "espaco";
      listaId.push("espaco");
      novoLi.id = "espaco";
    }
    ListaPalavras.appendChild(novoLi);
  }
  return listaId;
}

// Mostra as letras erradas na tela.
function letrasErradas(tecla) {
  var ListaPalavras = document.getElementById("letrasErradas");
  var novoLi = document.createElement("li");
  novoLi.textContent = tecla;
  novoLi.className = "letra";
  novoLi.id = "erro" + letrasErr.length;
  ListaPalavras.appendChild(novoLi);
  letrasErr.push("erro" + letrasErr.length);
}

// Remove os acentos de uma string.
function removeAcento(texto = []) {
  texto = texto.toUpperCase();
  texto = texto.replace(/[ÀÁÂÃÄÅ]/, "A");
  texto = texto.replace(/[àáâãäå]/, "a");
  texto = texto.replace(/[ÈÉÊË]/, "E");
  texto = texto.replace(/[èéêë]/, "e");
  texto = texto.replace(/[ÌÍÎÏ]/, "I");
  texto = texto.replace(/[ìíîï]/, "i");
  texto = texto.replace(/[óòôõõ]/, "o");
  texto = texto.replace(/[ÓÒÔÕÖ]/, "o");

  return texto;
}

// função que conta os espaços das strings
function contaEspaco(texto) {
  var quant = 0;
  for (var i = 0; i < texto.length; i++) {
    if (texto[i] == " ") {
      quant = 1 + quant;
    }
  }
  return quant;
}

// Deixa visivel as partes dos personagens.
function deixaVisivelPersonagem(lista = []) {
  if (lista.length < 7) {
    document.getElementById(lista.pop(0)).style.visibility = "visible";
  } else {
    document.getElementById(lista.pop(0)).style.visibility = "visible";
    document.getElementById(lista.pop(0)).style.visibility = "visible";
  }
}

// Função que desabilita as teclas clicadas, apenas no single player. 
function desabilitaBotaoClicado(id_btn, cor) {
  document.getElementById(id_btn).style.color = "#FFFFFF";
  document.getElementById(id_btn).style.backgroundColor = cor;
  document.getElementById(id_btn).disabled = true;
}
// Função que reabilita as teclas clicadas, apenas no single player. 
function reabilitaBotoesClicados(lista_id_btn) {
  for (var i = 0; i < lista_id_btn.length; i++) {
    document.getElementById(lista_id_btn[i]).style.color = "#000000";
    document.getElementById(lista_id_btn[i]).style.backgroundColor = "#efefef";
    document.getElementById(lista_id_btn[i]).disabled = false;
  }
}

/*
*
* Função que pega os inputs da tela, e verificar as teclas clicadas, 
* executando todos os algoritmos de verificação para definir se acertou 
* ou errou.
*/
function clickTeclado(tecla) {
    // If para executar o modo single player.
  if (modoDeJogo == 1) {
    if (palavra.length > 0) {
      var auxText = removeAcento(palavra);

      if (letrasSelecionadas.indexOf(tecla) == -1) {
        letrasSelecionadas = letrasSelecionadas + tecla;
        if (palavra.length > 0) {
          for (var i = 0; i < palavra.length; i++) {
            if (auxText[i] == tecla) {
              document.getElementById(listaIdLetras[i]).textContent =
                palavra[i].toUpperCase();
              resultado++;
              score += 5;
            }
          }

          if (auxText.indexOf(tecla) < 0) {
            deixaVisivelPersonagem(listaSvgPartes);
            tentativas++;
            letrasErradas(tecla);
            document.getElementById("numTentativa").textContent =
              6 - tentativas;
            desabilitaBotaoClicado(tecla, "#EE4037");
          } else {
            desabilitaBotaoClicado(tecla, "#4BCA7D");
          }
        }
        if (tentativas == 6) {
          document.getElementById("numTentativa").textContent = 0;
          document.getElementById("botaoReiniciar").style.visibility = "hidden";
          document.getElementById("gameOverID").style.visibility = "visible";
          document.getElementById("respostaGameOve").textContent = palavra;
          palavra = [];
          document.getElementById("record").textContent =  score;
          return;
        }
      }
      if (resultado == palavra.length) {
        document.getElementById("scoreResult").textContent = score;
        document.getElementById("botaoReiniciar").style.visibility = "hidden";
        document.getElementById("gameWinID").style.visibility = "visible";
        document.getElementById("respostagameWin").textContent = palavra;
        palavra = [];

        return;
      }
    }
  }
  // If para executar o modo multi-player. 
  if (modoDeJogo == 2) {
    document.getElementById("tentivPl1").textContent = JogadoresDados.tentativas1;
    document.getElementById("tentivPl2").textContent = JogadoresDados.tentativas2;
    var palavraPlay;
    var idList = [];
    var erros, certas;
    if (jogador == 1){ 
      erros = listaPalavrasErradasMultp[0];
      certas = listaPalavrasCertasMultp[0]
    }
    if (jogador == 2) {
      erros = listaPalavrasErradasMultp[1];
      certas = listaPalavrasCertasMultp[1];
    }
    if (erros.indexOf(tecla) < 0 && certas.indexOf(tecla) < 0){

      if (JogadoresDados.tentativas1 > 0 || JogadoresDados.tentativas2 > 0) {
        if (JogadoresDados.tentativas1 == 0 || JogadoresDados.resultado1 == JogadoresDados.player1.length){ 
          jogador = 2;
        }
        if (JogadoresDados.tentativas2 == 0 || JogadoresDados.resultado2 == JogadoresDados.player2.length) {
          jogador = 1;
        }
        
        if (jogador == 1) {
          document.getElementById("VezPlay2Lab").style.visibility = "visible";
          document.getElementById("VezPlay1Lab").style.visibility = "hidden";
          document.getElementById("p1Digite").style.visibility = "hidden";
          document.getElementById("p2Digite").style.visibility = "visible";
          palavraPlay = JogadoresDados.player1;
          idList = JogadoresDados.idLi1;
        } else if (jogador == 2) {
          document.getElementById("VezPlay1Lab").style.visibility = "visible";
          document.getElementById("VezPlay2Lab").style.visibility = "hidden";
          document.getElementById("p2Digite").style.visibility = "hidden";
          document.getElementById("p1Digite").style.visibility = "visible";

          palavraPlay = JogadoresDados.player2;
          idList = JogadoresDados.idLi2;
        }

        var aux = removeAcento(palavraPlay).toUpperCase();
        for (var i = 0; i < palavraPlay.length; i++) {
          if (aux[i] == tecla) {
            document.getElementById(idList[i]).textContent = palavraPlay[i].toUpperCase();
            if(jogador == 1){ 
              JogadoresDados.resultado1 += 1;
              listaPalavrasCertasMultp[0] += tecla;
            }
            else if(jogador == 2){
              JogadoresDados.resultado2 += 1;
              listaPalavrasCertasMultp[1] += tecla;
            }
            
          }
        }

        if (aux.indexOf(tecla) < 0) {
          if (jogador == 1 && JogadoresDados.resultado1 < palavraPlay.length) {
            listaPalavrasErradasMultp[0] += tecla;
            deixaVisivelPersonagem(ListaParaManipularPlayers.player1);
            JogadoresDados.tentativas1--;
            document.getElementById("letraErrPlay1").textContent =
              document.getElementById("letraErrPlay1").textContent +
              " " +
              tecla;
          } else if (jogador == 2 &&  JogadoresDados.resultado2 < palavraPlay.length) {
            listaPalavrasErradasMultp[1] += tecla;
            deixaVisivelPersonagem(ListaParaManipularPlayers.player2);
            document.getElementById("letraErrPlay2").textContent =
              document.getElementById("letraErrPlay2").textContent +
              " " +
              tecla;
            JogadoresDados.tentativas2--;
          }
        }
      }
      if(
        (JogadoresDados.tentativas1 == 0 && JogadoresDados.tentativas2 == 0) || 
        (JogadoresDados.tentativas2 == 0 && JogadoresDados.resultado1 == JogadoresDados.player1.length) ||
        (JogadoresDados.tentativas1 == 0 && JogadoresDados.resultado2 == JogadoresDados.player2.length) ||
        (JogadoresDados.resultado1 == JogadoresDados.player1.length && JogadoresDados.resultado2 == JogadoresDados.player2.length)
        ){
          document.getElementById("telaWinMult").style.visibility = "visible";
          if(JogadoresDados.tentativas1 == 0 && JogadoresDados.tentativas2 == 0){
            document.getElementById("empateID").style.visibility = "visible";
          }else if(JogadoresDados.tentativas2 == 0 && JogadoresDados.resultado1 == JogadoresDados.player1.length){
            document.getElementById("player1Win").style.visibility = "visible";
          }else if(JogadoresDados.tentativas1 == 0 && JogadoresDados.resultado2 == JogadoresDados.player2.length){
            document.getElementById("player2Win").style.visibility = "visible";
          }else if(JogadoresDados.resultado1 == JogadoresDados.player1.length && JogadoresDados.resultado2 == JogadoresDados.player2.length){
            document.getElementById("empateID").style.visibility = "visible";
          }
          document.getElementById("VezPlay1Lab").style.visibility = "hidden";
          document.getElementById("VezPlay2Lab").style.visibility = "hidden";
          document.getElementById("palavra1Mult").textContent = JogadoresDados.player1;
          document.getElementById("palavra2Mult").textContent = JogadoresDados.player2;
          document.getElementById("p1Digite").style.visibility = "hidden";
          document.getElementById("p2Digite").style.visibility = "hidden";
          listaPalavrasErradasMultp[0] = '';
          listaPalavrasErradasMultp[1] = ''
      }
      if (jogador == 1) {
        jogador = 2;
      } else if (jogador == 2) {
        jogador = 1;
      }
    }
  }
}

// Função que decide uma palavra aleatória para o modo single player.
function decidePalavra() {
  palavra = "";
  letrasSelecionadas = "";
  tema = Math.floor(Math.random() * 5); // Determina um tema.

  switch (tema) {
    case 0:
      posi = Math.floor(Math.random() * listaPaises.length);
      palavra = listaPaises[posi];
      document.getElementById("dica").textContent =
        "Um País com " + palavra.length + " letras!";
      break;
    case 1:
      posi = Math.floor(Math.random() * listaFrutas.length);
      palavra = listaFrutas[posi];
      document.getElementById("dica").textContent =
        "Uma Fruta com " + palavra.length + " letras!";
      break;
    case 2:
      posi = Math.floor(Math.random() * listaAnimais.length);
      palavra = listaAnimais[posi];
      document.getElementById("dica").textContent =
        "Um Animal com " + palavra.length + " letras!";
      break;
    case 3:
      posi = Math.floor(Math.random() * listaOceanos.length);
      palavra = listaOceanos[posi];
      document.getElementById("dica").textContent =
        "Um Oceano com " + palavra.length + " letras!";
      break;
    case 4:
      posi = Math.floor(Math.random() * listaTecnologia.length);
      palavra = listaTecnologia[posi];
      document.getElementById("dica").textContent =
        "Uma Tecnologia com " + palavra.length + " letras!";
      break;
  }
}

// Função para reiniciar os elementos do svg, para uma nova partida.
function reiniciarElementosDaPagina() {
  (tentativas = 0), (posi = 0), (tema = 0), (resultado = 0);
  document.getElementById("numTentativa").textContent = 6;
  document.getElementById("InicioJogoID").style.visibility = "hidden";
  document.getElementById("gameOverID").style.visibility = "hidden";
  document.getElementById("gameWinID").style.visibility = "hidden";
  listaSvgPartes = [
    "pernaDireitaID",
    "PernaEsquedaID",
    "BracoDireitoID",
    "BracoEsquedoID",
    "troncoID",
    "pescocoID",
    "cabecaID",
  ];
  for(var i = 0; i < listaSvgPartes.length; i++){
    document.getElementById(listaSvgPartes[i]).style.visibility = "hidden";
  }
  for (var i = 0; i < listaSvgPartes.length; i++) {
    document.getElementById(listaSvgPartes[i] + 1).style.visibility = "hidden";
    document.getElementById(listaSvgPartes[i] + 2).style.visibility = "hidden";
  }
  if (letrasSelecionadas.length > 0) {
    reabilitaBotoesClicados(letrasSelecionadas);
  }

  // Limpa as listas e as letras dentro dos vetores.
  if (listaIdLetras.length > 0) {
    for (var i = 0; i < listaIdLetras.length; i++) {
      document.getElementById(listaIdLetras[i]).remove();
    }
    listaIdLetras = [];
  }
  if (letrasErr.length > 0) {
    for (var i = 0; i < letrasErr.length; i++) {
      document.getElementById(letrasErr[i]).remove();
    }
    letrasErr = [];
  }
}

// Função que inicia um jogo single-player.
function jogoUmPlay() {
  modoDeJogo = 1;
  JogadoresDados.tentativas1 = 6;
  JogadoresDados.tentativas2 = 6;
  reiniciarElementosDaPagina();
  document.getElementById("errosLabel").style.visibility = "visible";
  document.getElementById("gameWinID").style.visibility = "hidden";
  document.getElementById("botaoReiniciar").style.visibility = "visible";
  document.getElementById("modoJogoID").style.visibility = "hidden";
  document.getElementById("forcaDuplaID").style.visibility = "hidden";
  document.getElementById("forcaID").style.visibility = "visible";
  decidePalavra();

  if (contaEspaco(palavra) > 0) {
    resultado = contaEspaco(palavra);
  }
  document.getElementById("respPlay2").style.position = "absolute";
  document.getElementById("respPlay2").style.visibility = "hidden";
  document.getElementById("letrasResposta").style.visibility = "visible";
  document.getElementById("letrasResposta").style.position = "relative";
  listaIdLetras = criaLista(palavra, "letrasResposta", "letra");
}

// Função que inicia um jogo multi-player.
function jogoDoisPlay() {
  modoDeJogo = 2;
  listaPalavrasCertasMultp = ["", ""],
  listaPalavrasErradasMultp = ["", ""];
  jogador = 1;
  ListaParaManipularPlayers = {
    player1: [],
    player2: [],
    p1LetrasErradas: [],
    p2LetrasErradas: [],
    p1LetrasErradasCertas: [],
    p2LetrasCertas: [],
  };
  JogadoresDados = {
    player1: [],
    player2: [],
    idLi1: [],
    idLi2: [],
    resultado1: 0,
    resultado2: 0,
    tentativas1: 6,
    tentativas2: 6,
  };
  document.getElementById("tentivPl1").textContent = JogadoresDados.tentativas1;
  document.getElementById("tentivPl2").textContent = JogadoresDados.tentativas2;
  document.getElementById("letraErrPlay1").textContent = "";
  document.getElementById("letraErrPlay2").textContent = "";
  document.getElementById("errosLabel").style.visibility = "hidden";
  document.getElementById("gameWinID").style.visibility = "hidden";
  document.getElementById("botaoReiniciar").style.visibility = "visible";
  document.getElementById("modoJogoID").style.visibility = "hidden";
  document.getElementById("forcaDuplaID").style.visibility = "visible";
  document.getElementById("forcaID").style.visibility = "hidden";
  ListaParaManipularPlayers.player1 = [
    "pernaDireitaID1",
    "PernaEsquedaID1",
    "BracoDireitoID1",
    "BracoEsquedoID1",
    "troncoID1",
    "pescocoID1",
    "cabecaID1",
  ];
  ListaParaManipularPlayers.player2 = [
    "pernaDireitaID2",
    "PernaEsquedaID2",
    "BracoDireitoID2",
    "BracoEsquedoID2",
    "troncoID2",
    "pescocoID2",
    "cabecaID2",
  ];
  for (var i = 0; i < 7; i++) {
    document.getElementById(ListaParaManipularPlayers.player1[i]).style.visibility =
      "hidden";
    document.getElementById(ListaParaManipularPlayers.player2[i]).style.visibility =
      "hidden";
  }
  posi = Math.floor(Math.random() * 7) + 1;
  document.getElementById("dica").textContent = palavrasMutiplay[posi].dica;
  JogadoresDados.player1 = palavrasMutiplay[posi].Palavra1;
  JogadoresDados.player2 = palavrasMutiplay[posi].Palavra2;

  if (contaEspaco(palavra) > 0) {
    JogadoresDados.resultado1 = contaEspaco(palavrasMutiplay[posi].Palavra1);
    JogadoresDados.resultado2 = contaEspaco(palavrasMutiplay[posi].Palavra2);
  }
  palavra = [];
  document.getElementById("letrasResposta").style.visibility = "hidden";
  document.getElementById("letrasResposta").style.position = "absolute";
  document.getElementById("respPlay2").style.visibility = "visible";
  document.getElementById("respPlay2").style.position = "relative";
  document.getElementById("VezPlay1Lab").style.visibility = "visible";
  document.getElementById("VezPlay2Lab").style.visibility = "hidden";
  document.getElementById("p2Digite").style.visibility = "hidden";
  document.getElementById("p1Digite").style.visibility = "visible";
  JogadoresDados.idLi1 = criaLista(JogadoresDados.player1, "RespostaPlay1", "play1Letra");
  JogadoresDados.idLi2 = criaLista(JogadoresDados.player2, "RespostaPlay2", "play2Letras");
}

// Função start iniciar o jogo e limpar os dados armazenados nas variaveis.
function start() {
  score = 0;
  modoDeJogo = 0;
  jogador = 0;
  tentativas = 0,
  resultado = 0,
  score = 0,
  modoDeJogo = 0,
  jogador = 0;
  document.getElementById("empateID").style.visibility = "hidden";
  document.getElementById("player1Win").style.visibility = "hidden";
  document.getElementById("player2Win").style.visibility = "hidden";
  document.getElementById("empateID").style.visibility = "hidden";
  document.getElementById("telaWinMult").style.visibility = "hidden";
  document.getElementById("RespostaPlay1").innerHTML = "<li>Player 1: </li>";
  document.getElementById("RespostaPlay2").innerHTML = "<li>Player 2: </li>";
  document.getElementById("respPlay2").style.position = "absolute";
  document.getElementById("respPlay2").style.visibility = "hidden";
  document.getElementById("letrasResposta").style.visibility = "visible";
  document.getElementById("letrasResposta").style.position = "relative";
  document.getElementById("modoJogoID").style.visibility = "visible";
  reiniciarElementosDaPagina();
  document.getElementById("botaoReiniciar").style.visibility = "hidden";
}
