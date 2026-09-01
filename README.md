# Genética — Plataforma de Estudos

Plataforma web completa de estudos de Genética e Hereditariedade para o Ensino Médio.

## Como usar

Abra o arquivo `index.html` no navegador (duplo clique) — não é necessário instalar nada
nem ter internet, exceto para carregar as fontes do Google Fonts (a plataforma funciona
normalmente mesmo sem internet, usando as fontes de sistema como alternativa).

Se preferir rodar com um servidor local (recomendado para evitar restrições de alguns
navegadores com arquivos locais), na pasta do projeto rode:

```
python3 -m http.server 8080
```

e acesse `http://localhost:8080` no navegador.

## O que tem dentro

- **Dashboard** com progresso geral, XP, nível, sequência de estudos e recomendações.
- **Conteúdos**: trilha com 11 aulas, da introdução à genética até Sistema Rh, cada uma
  dividida em blocos (conceito → exemplo → visualização → pratique → resumo) e miniquiz.
- **Laboratório Genético**: simuladores interativos de Punnett (mono e dihíbrido), ABO,
  Rh, herança ligada ao sexo, calculadora de probabilidade e analisador de heredogramas.
- **Exercícios** organizados por categoria, com dificuldade progressiva.
- **Simulados** rápido (10), completo (20) e desafio (30 questões), com relatório de
  desempenho por conteúdo ao final.
- **Modo Revisão**: folha de revisão para a prova, cartões de revisão (flashcards) e lista
  de dificuldades.
- **Glossário** com busca instantânea, e **busca global** cobrindo aulas, glossário e questões.
- **Meu progresso** e **Conquistas** (XP, níveis e insígnias).
- **Minha revisão**: aulas favoritas, termos favoritos, lista "estudar depois" e questões
  erradas salvas para prática.
- **Modo escuro/claro**, com preferência salva entre visitas.
- Totalmente responsivo (menu lateral vira menu inferior/gaveta no celular).

## Dados e progresso

Todo o progresso (XP, aulas concluídas, respostas, simulados, favoritos, etc.) é salvo
localmente no navegador (localStorage), por estudante/dispositivo — não depende de
servidor ou conta de usuário. Limpar os dados do navegador reinicia o progresso.

## Arquitetura

```
index.html
css/            → tokens (cores/tipografia), base, layout, componentes
js/
  data/         → conteúdo das aulas, banco de questões, glossário, conquistas
  components/   → mecanismo de Punnett, widget de Punnett, motor de quiz,
                  ferramentas do laboratório (ABO/Rh/sexo/heredograma), sidebar
  pages/        → uma função de render por página (dashboard, conteúdos, aula,
                  exercícios, simulados, revisão, glossário, progresso,
                  conquistas, laboratório, busca, minha revisão)
  state.js      → estado do estudante e persistência em localStorage
  router.js     → roteador baseado em hash (#/rota)
  app.js        → inicialização da aplicação
```

Para adicionar uma nova aula, edite `js/data/lessons.js`. Para adicionar novas questões,
edite `js/data/questions.js` (o `category` da questão deve casar com o `category` da aula).
