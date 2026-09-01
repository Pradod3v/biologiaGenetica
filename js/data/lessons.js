/* Dados das aulas — cada aula tem blocos no formato:
   01 Conceito, 02 Exemplo, 03 Visualização, 04 Pratique, 05 Resumo
   'category' liga a aula ao banco de questões (js/data/questions.js) */
window.LESSONS = [
  {
    id: "fundamentos",
    order: 1,
    title: "Fundamentos da Genética",
    short: "Os conceitos essenciais para entender hereditariedade: genes, alelos, genótipo e fenótipo.",
    difficulty: "Fácil",
    minutes: 15,
    category: "fundamentos",
    blocks: [
      { kind: "concept", title: "O que a genética estuda", html: `
        <p>Imagine que cada ser vivo carrega, dentro de si, um manual de instruções escrito com apenas quatro "letras" químicas. Esse manual explica como montar um organismo inteiro — a cor dos olhos, o tipo sanguíneo, até a predisposição a certas doenças. A <strong>genética</strong> é a ciência que estuda esse manual: como ele é copiado, como passa de pais para filhos e como suas instruções se transformam em características visíveis.</p>
        <p>O nome técnico para "passar características de uma geração para outra" é <strong class="term-chip" title="Transmissão de características biológicas dos pais para os descendentes">hereditariedade</strong>. Toda a genética clássica, que você vai estudar nesta plataforma, nasce dessa ideia simples: características são herdadas segundo regras que podem ser previstas.</p>
      `},
      { kind: "concept", title: "DNA, gene e cromossomo", html: `
        <p>O <strong class="term-chip" title="Ácido desoxirribonucleico — molécula que armazena as instruções genéticas">DNA</strong> é a molécula onde as instruções ficam escritas. Ele fica organizado dentro do núcleo das células, enrolado em estruturas chamadas <strong class="term-chip" title="Estrutura organizada de DNA e proteínas, visível durante a divisão celular">cromossomos</strong> — como se o DNA fosse um fio muito longo e o cromossomo fosse o carretel que o organiza.</p>
        <p>Um <strong class="term-chip" title="Trecho do DNA que contém a informação para uma característica">gene</strong> é um trecho específico desse DNA que contém a informação para produzir uma característica — por exemplo, a cor dos olhos ou o tipo sanguíneo. O conjunto completo de genes de um organismo é chamado de <strong class="term-chip" title="Conjunto completo do material genético de um organismo">genoma</strong>.</p>
      `},
      { kind: "concept", title: "Alelo, gameta e as duas cópias de cada gene", html: `
        <p>Na maioria dos organismos (inclusive nós), cada característica é controlada por um par de genes — um vindo da mãe e outro do pai. Cada versão desse gene é chamada de <strong class="term-chip" title="Cada uma das variantes possíveis de um mesmo gene">alelo</strong>. Por exemplo, para a cor de uma flor, pode existir um alelo "roxo" e um alelo "branco".</p>
        <p>Essas cópias parentais chegam até o novo organismo através dos <strong class="term-chip" title="Células reprodutivas (óvulo e espermatozoide) que carregam metade da informação genética">gametas</strong> — óvulo e espermatozoide — cada um carregando apenas uma cópia de cada gene. Quando o óvulo e o espermatozoide se unem, o novo indivíduo volta a ter o par completo.</p>
      `},
      { kind: "example", title: "Genótipo vs. fenótipo", html: `
        <p>Dois termos aparecem o tempo todo em genética e é essencial não confundi-los:</p>
        <div class="grid grid-2">
          <div class="card-flat"><h4>Genótipo</h4><p class="mb-0">A combinação de alelos que um indivíduo possui — a "receita" escrita. Exemplo: <span class="geno">Aa</span>.</p></div>
          <div class="card-flat"><h4>Fenótipo</h4><p class="mb-0">A característica que aparece de fato, visível ou mensurável. Exemplo: "flor roxa".</p></div>
        </div>
        <p class="mt-4">Genótipos diferentes podem gerar o <em>mesmo</em> fenótipo — é exatamente isso que você vai entender no próximo módulo, sobre dominância e recessividade.</p>
      `},
      { kind: "visual", title: "Homozigoto e heterozigoto", html: `
        <p>Quando as duas cópias de um gene são iguais, o indivíduo é <strong class="term-chip" title="Possui dois alelos idênticos para um gene">homozigoto</strong> (<span class="geno">AA</span> ou <span class="geno">aa</span>). Quando as duas cópias são diferentes, ele é <strong class="term-chip" title="Possui dois alelos diferentes para um gene">heterozigoto</strong> (<span class="geno">Aa</span>).</p>
        <div class="grid grid-3 mt-4">
          <div class="card-flat center"><span class="geno" style="font-size:22px">AA</span><p class="mb-0 mt-2">Homozigoto</p></div>
          <div class="card-flat center"><span class="geno" style="font-size:22px">Aa</span><p class="mb-0 mt-2">Heterozigoto</p></div>
          <div class="card-flat center"><span class="geno" style="font-size:22px">aa</span><p class="mb-0 mt-2">Homozigoto</p></div>
        </div>
      `},
      { kind: "summary", title: "Você precisa saber", html: `
        <div class="key-points"><h4>Resumo da aula</h4><ul>
          <li><strong>Hereditariedade</strong>: transmissão de características entre gerações.</li>
          <li><strong>DNA</strong>: molécula que guarda as instruções genéticas.</li>
          <li><strong>Gene</strong>: trecho do DNA responsável por uma característica.</li>
          <li><strong>Alelo</strong>: cada variante de um gene.</li>
          <li><strong>Cromossomo</strong>: estrutura que organiza o DNA.</li>
          <li><strong>Genoma</strong>: conjunto de todos os genes de um organismo.</li>
          <li><strong>Gameta</strong>: célula reprodutiva com metade da informação genética.</li>
          <li><strong>Genótipo</strong> = combinação de alelos. <strong>Fenótipo</strong> = característica observável.</li>
          <li><strong>Homozigoto</strong> = alelos iguais. <strong>Heterozigoto</strong> = alelos diferentes.</li>
        </ul></div>
      `}
    ]
  },
  {
    id: "mendel",
    order: 2,
    title: "Gregor Mendel",
    short: "Conheça o monge que descobriu as regras da hereditariedade estudando ervilhas.",
    difficulty: "Fácil",
    minutes: 12,
    category: "mendel",
    blocks: [
      { kind: "concept", title: "Quem foi Mendel", html: `
        <p>Gregor Mendel (1822–1884) foi um monge agostiniano e naturalista que, entre 1856 e 1863, cultivou e cruzou milhares de plantas de ervilha-de-cheiro (<em>Pisum sativum</em>) no jardim de seu mosteiro, na atual República Tcheca. Ele não tinha microscópios modernos nem sabia da existência do DNA — mas, contando cuidadosamente os resultados de seus cruzamentos, percebeu que as características seguiam padrões numéricos previsíveis.</p>
        <p>Esse trabalho, publicado em 1866, praticamente passou despercebido durante décadas. Só foi redescoberto por outros cientistas em 1900, e hoje Mendel é chamado de "pai da genética".</p>
      `},
      { kind: "concept", title: "Por que ervilhas?", html: `
        <p>Mendel escolheu ervilhas por motivos muito práticos:</p>
        <ul>
          <li>Crescem rápido e produzem muitos descendentes.</li>
          <li>Podem se autofecundar ou ser cruzadas manualmente com facilidade.</li>
          <li>Existiam variedades "puras" (que sempre geravam descendentes iguais a si) já estabelecidas havia gerações.</li>
          <li>Possuíam características fáceis de observar e classificar em apenas duas formas — por exemplo, semente lisa ou rugosa, nunca uma mistura ambígua.</li>
        </ul>
      `},
      { kind: "example", title: "As sete características estudadas", html: `
        <p>Mendel selecionou sete características bem definidas da ervilha, entre elas: cor da semente (amarela ou verde), textura da semente (lisa ou rugosa), cor da flor (roxa ou branca) e altura da planta (alta ou baixa). Em todas elas, ao cruzar uma linhagem pura com outra, ele observava sempre o mesmo tipo de padrão nas gerações seguintes.</p>
      `},
      { kind: "visual", title: "Gerações P, F1 e F2", html: `
        <p>Mendel organizou seus cruzamentos em gerações. Clique em cada etapa para entender o que aconteceu:</p>
        <div class="grid grid-3" id="mendel-timeline"></div>
      `},
      { kind: "practice", title: "Pratique", html: `<div id="mendel-quick-quiz"></div>` },
      { kind: "summary", title: "Você precisa saber", html: `
        <div class="key-points"><h4>Resumo da aula</h4><ul>
          <li>Mendel cruzou ervilhas puras e contou estatisticamente os resultados por gerações.</li>
          <li><strong>Geração P</strong> (parental): os indivíduos puros cruzados inicialmente.</li>
          <li><strong>Geração F1</strong> (primeira geração filial): filhos diretos da geração P — todos com o mesmo fenótipo (o dominante).</li>
          <li><strong>Geração F2</strong> (segunda geração filial): obtida cruzando indivíduos de F1 entre si — reaparece a característica recessiva, na proporção 3:1.</li>
          <li>Esse trabalho deu origem às Leis de Mendel, que você estudará nos próximos módulos.</li>
        </ul></div>
      `}
    ]
  },
  {
    id: "dominancia",
    order: 3,
    title: "Dominância e Recessividade",
    short: "Entenda como o genótipo determina o fenótipo através de alelos dominantes e recessivos.",
    difficulty: "Fácil",
    minutes: 14,
    category: "dominancia",
    blocks: [
      { kind: "concept", title: "Alelo dominante e alelo recessivo", html: `
        <p>Quando um indivíduo é heterozigoto (<span class="geno">Aa</span>), apenas uma das características aparece no fenótipo. O alelo que "se manifesta" e esconde o outro é chamado de <strong class="term-chip" title="Alelo que se manifesta no fenótipo mesmo em heterozigose">dominante</strong> — representado por letra maiúscula (<span class="geno">A</span>). O que fica "escondido", só aparecendo quando está em dose dupla, é o <strong class="term-chip" title="Alelo que só se manifesta no fenótipo em homozigose">recessivo</strong> — letra minúscula (<span class="geno">a</span>).</p>
        <p>Isso não significa que o alelo recessivo desapareça: ele continua no genótipo e pode ser passado para a próxima geração.</p>
      `},
      { kind: "example", title: "Classificando os genótipos", html: `
        <div class="table-scroll"><table>
          <thead><tr><th>Genótipo</th><th>Classificação</th><th>Fenótipo</th></tr></thead>
          <tbody>
            <tr><td class="mono">AA</td><td>Homozigoto dominante</td><td>Dominante</td></tr>
            <tr><td class="mono">Aa</td><td>Heterozigoto</td><td>Dominante</td></tr>
            <tr><td class="mono">aa</td><td>Homozigoto recessivo</td><td>Recessivo</td></tr>
          </tbody>
        </table></div>
        <p class="mt-4">Repare que <span class="geno">AA</span> e <span class="geno">Aa</span> resultam no <em>mesmo</em> fenótipo — por isso, olhando só para a aparência, nem sempre é possível saber o genótipo exato de alguém.</p>
      `},
      { kind: "visual", title: "Do genótipo ao fenótipo", html: `<div id="dominancia-visual"></div>` },
      { kind: "practice", title: "Pratique", html: `<div id="dominancia-quick-quiz"></div>` },
      { kind: "summary", title: "Você precisa saber", html: `
        <div class="key-points"><h4>Resumo da aula</h4><ul>
          <li><strong>Dominante</strong> (letra maiúscula): manifesta-se mesmo em heterozigose.</li>
          <li><strong>Recessivo</strong> (letra minúscula): só se manifesta em homozigose.</li>
          <li><span class="geno">AA</span> e <span class="geno">Aa</span> → mesmo fenótipo dominante.</li>
          <li><span class="geno">aa</span> → fenótipo recessivo.</li>
        </ul></div>
      `}
    ]
  },
  {
    id: "primeira-lei",
    order: 4,
    title: "Primeira Lei de Mendel",
    short: "A Lei da Segregação dos Alelos: como os pares de alelos se separam na formação dos gametas.",
    difficulty: "Médio",
    minutes: 20,
    category: "primeira-lei",
    blocks: [
      { kind: "concept", title: "A Lei da Segregação dos Alelos", html: `
        <p>A Primeira Lei de Mendel afirma que <strong>cada característica é determinada por um par de alelos, e esse par se separa (segrega) na formação dos gametas</strong> — cada gameta recebe apenas um alelo do par. Por isso ela também é chamada de <em>Lei da Pureza dos Gametas</em>.</p>
        <p>Em símbolos: um indivíduo <span class="geno">Aa</span> produz gametas <span class="geno">A</span> e gametas <span class="geno">a</span>, em proporções iguais — nunca um gameta <span class="geno">Aa</span>.</p>
      `},
      { kind: "visual", title: "De Aa para os gametas", html: `
        <div class="card-flat center">
          <div class="geno" style="font-size:28px">Aa</div>
          <div style="font-size:22px;margin:8px 0;">↓ segregação ↓</div>
          <div class="flex" style="justify-content:center;gap:32px;">
            <div class="geno" style="font-size:24px;color:var(--moss-dark)">A</div>
            <div class="geno" style="font-size:24px;color:var(--clay)">a</div>
          </div>
          <p class="muted mt-3 mb-0">Cada gameta carrega só um dos dois alelos.</p>
        </div>
      `},
      { kind: "example", title: "Cruzamento passo a passo: Aa × Aa", html: `
        <p>Vamos cruzar dois indivíduos heterozigotos, <span class="geno">Aa</span> × <span class="geno">Aa</span>, seguindo o raciocínio completo:</p>
        <ol>
          <li><strong>Genótipos parentais:</strong> <span class="geno">Aa</span> e <span class="geno">Aa</span>.</li>
          <li><strong>Gametas de cada um:</strong> <span class="geno">A</span> e <span class="geno">a</span> (cada parental produz os dois tipos).</li>
          <li><strong>Construção do quadro de Punnett</strong> (você vai gerar um automaticamente no próximo módulo).</li>
          <li><strong>Combinação dos alelos</strong> nas células do quadro.</li>
          <li><strong>Genótipos resultantes:</strong> 1 <span class="geno">AA</span> : 2 <span class="geno">Aa</span> : 1 <span class="geno">aa</span>.</li>
          <li><strong>Fenótipos resultantes:</strong> 3 partes dominantes : 1 parte recessiva.</li>
          <li><strong>Probabilidades:</strong> 25% <span class="geno">AA</span>, 50% <span class="geno">Aa</span>, 25% <span class="geno">aa</span> — ou 75% dominante, 25% recessivo.</li>
        </ol>
      `},
      { kind: "practice", title: "Pratique", html: `<div id="primeira-lei-quick-quiz"></div>` },
      { kind: "summary", title: "Você precisa saber", html: `
        <div class="key-points"><h4>Resumo da aula</h4><ul>
          <li>Primeira Lei = Lei da Segregação dos Alelos (ou da Pureza dos Gametas).</li>
          <li>Cada gameta recebe apenas um alelo de cada par.</li>
          <li>Cruzamento <span class="geno">Aa × Aa</span> → proporção genotípica 1:2:1 e fenotípica 3:1.</li>
        </ul></div>
      `}
    ]
  },
  {
    id: "punnett",
    order: 5,
    title: "Quadro de Punnett Interativo",
    short: "Use o gerador automático de cruzamentos para visualizar qualquer combinação de alelos.",
    difficulty: "Médio",
    minutes: 15,
    category: "punnett",
    blocks: [
      { kind: "concept", title: "Para que serve o quadro de Punnett", html: `
        <p>O quadro de Punnett é uma ferramenta visual que organiza todas as combinações possíveis entre os gametas de dois indivíduos, facilitando o cálculo das proporções genotípicas e fenotípicas de um cruzamento.</p>
        <p>Os gametas de um dos pais ficam nas linhas, os do outro pai nas colunas, e cada célula interna mostra a combinação resultante.</p>
      `},
      { kind: "visual", title: "Gerador automático", html: `<div id="punnett-tool-mount"></div>` },
      { kind: "practice", title: "Pratique", html: `<div id="punnett-quick-quiz"></div>` },
      { kind: "summary", title: "Você precisa saber", html: `
        <div class="key-points"><h4>Resumo da aula</h4><ul>
          <li>Linhas e colunas do quadro recebem os gametas de cada progenitor.</li>
          <li>Cada célula interna é uma combinação genotípica possível na descendência.</li>
          <li>Contar quantas células dão cada fenótipo fornece a proporção esperada.</li>
        </ul></div>
      `}
    ]
  },
  {
    id: "probabilidade",
    order: 6,
    title: "Probabilidade Genética",
    short: "As regras matemáticas por trás das proporções: multiplicação, adição e cálculo de chances.",
    difficulty: "Médio",
    minutes: 18,
    category: "probabilidade",
    blocks: [
      { kind: "concept", title: "Frações, porcentagens e eventos genéticos", html: `
        <p>Em genética, probabilidade mede a chance de um descendente apresentar determinado genótipo ou fenótipo. Ela pode ser expressa como fração (1/4), decimal (0,25) ou porcentagem (25%) — todas equivalentes.</p>
      `},
      { kind: "concept", title: "Regra da multiplicação", html: `
        <p>Quando dois eventos são <strong>independentes</strong> (o resultado de um não afeta o outro) e queremos saber a chance de os <strong>dois acontecerem juntos</strong>, multiplicamos as probabilidades individuais.</p>
        <p>Exemplo: a chance de um casal <span class="geno">Aa × Aa</span> ter um filho <span class="geno">aa</span> é 1/4. A chance de dois filhos seguidos serem <span class="geno">aa</span> é 1/4 × 1/4 = 1/16.</p>
      `},
      { kind: "concept", title: "Regra da adição", html: `
        <p>Quando queremos a chance de <strong>um evento OU outro</strong> acontecerem (eventos mutuamente exclusivos), somamos as probabilidades.</p>
        <p>Exemplo: no cruzamento <span class="geno">Aa × Aa</span>, a chance de nascer <span class="geno">AA</span> OU <span class="geno">Aa</span> (ou seja, fenótipo dominante) é 1/4 + 2/4 = 3/4.</p>
      `},
      { kind: "example", title: "Resolvendo passo a passo", html: `
        <p><strong>Pergunta:</strong> qual a probabilidade de nascer um descendente <span class="geno">aa</span> no cruzamento <span class="geno">Aa × Aa</span>?</p>
        <ol>
          <li>Gametas de cada pai: 1/2 <span class="geno">A</span> e 1/2 <span class="geno">a</span>.</li>
          <li>Para o filho ser <span class="geno">aa</span>, precisa receber <span class="geno">a</span> do pai <strong>e</strong> <span class="geno">a</span> da mãe.</li>
          <li>Aplicando a regra da multiplicação: 1/2 × 1/2 = 1/4.</li>
          <li><strong>Resposta: 1/4, ou 25%.</strong></li>
        </ol>
      `},
      { kind: "practice", title: "Pratique", html: `<div id="probabilidade-quick-quiz"></div>` },
      { kind: "summary", title: "Você precisa saber", html: `
        <div class="key-points"><h4>Resumo da aula</h4><ul>
          <li>Regra da multiplicação → eventos que acontecem <strong>juntos</strong> ("e").</li>
          <li>Regra da adição → eventos alternativos ("ou").</li>
          <li>Probabilidades genéticas podem ser expressas em fração, decimal ou porcentagem.</li>
        </ul></div>
      `}
    ]
  },
  {
    id: "segunda-lei",
    order: 7,
    title: "Segunda Lei de Mendel",
    short: "A Lei da Segregação Independente e os cruzamentos dihíbridos: proporção 9:3:3:1.",
    difficulty: "Difícil",
    minutes: 22,
    category: "segunda-lei",
    blocks: [
      { kind: "concept", title: "Duas características ao mesmo tempo", html: `
        <p>Enquanto a Primeira Lei trata de uma única característica (cruzamento <strong>mono-híbrido</strong>), a Segunda Lei de Mendel explica o que acontece quando acompanhamos <strong>duas características simultaneamente</strong> — o chamado cruzamento <strong>dihíbrido</strong>.</p>
        <p>A Segunda Lei afirma que <strong>os pares de alelos de genes diferentes segregam de forma independente</strong> um do outro durante a formação dos gametas — desde que estejam em cromossomos diferentes.</p>
      `},
      { kind: "example", title: "Gametas de um dihíbrido: AaBb", html: `
        <p>Um indivíduo <span class="geno">AaBb</span> forma gametas combinando um alelo de cada par, de todas as formas possíveis:</p>
        <div class="pill-row">
          <span class="badge">AB</span><span class="badge">Ab</span><span class="badge">aB</span><span class="badge">ab</span>
        </div>
        <p class="mt-3">Cada gameta leva sempre <strong>um</strong> alelo do gene A/a e <strong>um</strong> alelo do gene B/b, mas as combinações entre eles são independentes.</p>
      `},
      { kind: "visual", title: "Quadro de Punnett 4×4", html: `<div id="segunda-lei-punnett"></div>` },
      { kind: "concept", title: "De onde vem o 9:3:3:1", html: `
        <p>No cruzamento <span class="geno">AaBb × AaBb</span>, das 16 combinações possíveis no quadro 4×4:</p>
        <ul>
          <li><strong>9</strong> combinações → dominante para as duas características (A_B_)</li>
          <li><strong>3</strong> combinações → dominante para A, recessivo para B (A_bb)</li>
          <li><strong>3</strong> combinações → recessivo para A, dominante para B (aaB_)</li>
          <li><strong>1</strong> combinação → recessivo para as duas (aabb)</li>
        </ul>
        <p>Essa proporção fenotípica <strong>9:3:3:1</strong> é a assinatura de um cruzamento dihíbrido clássico.</p>
      `},
      { kind: "practice", title: "Pratique", html: `<div id="segunda-lei-quick-quiz"></div>` },
      { kind: "summary", title: "Você precisa saber", html: `
        <div class="key-points"><h4>Resumo da aula</h4><ul>
          <li>Segunda Lei = Lei da Segregação Independente.</li>
          <li><span class="geno">AaBb</span> produz 4 tipos de gametas: AB, Ab, aB, ab.</li>
          <li>Cruzamento <span class="geno">AaBb × AaBb</span> → quadro 4×4 → proporção 9:3:3:1.</li>
        </ul></div>
      `}
    ]
  },
  {
    id: "heredogramas",
    order: 8,
    title: "Heredogramas",
    short: "Aprenda a ler árvores genealógicas e identificar padrões de herança entre gerações.",
    difficulty: "Médio",
    minutes: 18,
    category: "heredogramas",
    blocks: [
      { kind: "concept", title: "Os símbolos do heredograma", html: `
        <p>Um <strong class="term-chip" title="Representação gráfica da transmissão de uma característica ao longo das gerações de uma família">heredograma</strong> (ou árvore genealógica) é um diagrama que representa como uma característica passa entre gerações de uma família.</p>
        <ul>
          <li><strong>Quadrado</strong> □ representa um indivíduo do sexo masculino.</li>
          <li><strong>Círculo</strong> ○ representa um indivíduo do sexo feminino.</li>
          <li><strong>Símbolo preenchido</strong> (■ ou ●) indica indivíduo <strong>afetado</strong> pela característica.</li>
          <li><strong>Símbolo vazio</strong> (□ ou ○) indica indivíduo <strong>não afetado</strong>.</li>
          <li>Linhas horizontais conectam casais; linhas verticais conectam pais e filhos.</li>
          <li>Números romanos (I, II, III) indicam as gerações.</li>
        </ul>
      `},
      { kind: "visual", title: "Analisando um heredograma", html: `<div id="heredograma-tool-mount"></div>` },
      { kind: "practice", title: "Pratique", html: `<div id="heredogramas-quick-quiz"></div>` },
      { kind: "summary", title: "Você precisa saber", html: `
        <div class="key-points"><h4>Resumo da aula</h4><ul>
          <li>□ = homem, ○ = mulher; preenchido = afetado.</li>
          <li>Se dois pais não afetados têm um filho afetado, a característica é recessiva.</li>
          <li>Sempre comece identificando quem é homozigoto recessivo (afetado) — isso ajuda a deduzir o genótipo dos demais.</li>
        </ul></div>
      `}
    ]
  },
  {
    id: "heranca-sexo",
    order: 9,
    title: "Herança Ligada ao Sexo",
    short: "Como genes localizados no cromossomo X se comportam de forma diferente entre homens e mulheres.",
    difficulty: "Difícil",
    minutes: 20,
    category: "heranca-sexo",
    blocks: [
      { kind: "concept", title: "Cromossomos sexuais: X e Y", html: `
        <p>Nos seres humanos, o sexo é determinado por um par de cromossomos especiais: mulheres possuem dois cromossomos X (<span class="geno">XX</span>), e homens possuem um X e um Y (<span class="geno">XY</span>). O cromossomo X é bem maior e carrega muito mais genes do que o Y.</p>
        <p>Genes que ficam localizados no cromossomo X (e não têm equivalente no Y) apresentam um padrão de herança chamado <strong>herança ligada ao sexo</strong>.</p>
      `},
      { kind: "example", title: "Notação e por que homens 'expressam mais'", html: `
        <p>Representamos o alelo dominante como <span class="geno">X<sup>A</sup></span> e o recessivo como <span class="geno">X<sup>a</sup></span>. Uma mulher pode ser <span class="geno">X<sup>A</sup>X<sup>A</sup></span>, <span class="geno">X<sup>A</sup>X<sup>a</sup></span> (portadora) ou <span class="geno">X<sup>a</sup>X<sup>a</sup></span> (afetada).</p>
        <p>Já um homem só tem <strong>um</strong> cromossomo X — então seu genótipo é <span class="geno">X<sup>A</sup>Y</span> ou <span class="geno">X<sup>a</sup>Y</span>. Como não existe um segundo alelo no Y para "mascarar" o recessivo, basta um único alelo recessivo para que a característica apareça. É por isso que características recessivas ligadas ao X são muito mais comuns em homens.</p>
      `},
      { kind: "visual", title: "Cruzamento ligado ao sexo", html: `<div id="heranca-sexo-tool"></div>` },
      { kind: "practice", title: "Pratique", html: `<div id="heranca-sexo-quick-quiz"></div>` },
      { kind: "summary", title: "Você precisa saber", html: `
        <div class="key-points"><h4>Resumo da aula</h4><ul>
          <li>Mulheres: <span class="geno">XX</span>. Homens: <span class="geno">XY</span>.</li>
          <li>O homem só precisa de um alelo recessivo em X para manifestar a característica.</li>
          <li>Ao calcular cruzamentos ligados ao sexo, sempre separe as proporções entre filhas e filhos.</li>
        </ul></div>
      `}
    ]
  },
  {
    id: "abo",
    order: 10,
    title: "Sistema ABO",
    short: "Os grupos sanguíneos A, B, AB e O explicados por alelos múltiplos e codominância.",
    difficulty: "Médio",
    minutes: 16,
    category: "abo",
    blocks: [
      { kind: "concept", title: "Três alelos para um gene", html: `
        <p>O sistema ABO é controlado por um único gene, mas com <strong>três alelos possíveis</strong>: <span class="geno">I<sup>A</sup></span>, <span class="geno">I<sup>B</sup></span> e <span class="geno">i</span>. Cada pessoa herda apenas dois desses três alelos (um de cada progenitor).</p>
        <p><span class="geno">I<sup>A</sup></span> e <span class="geno">I<sup>B</sup></span> são dominantes sobre <span class="geno">i</span>, mas entre si eles apresentam <strong class="term-chip" title="Situação em que os dois alelos se manifestam simultaneamente no fenótipo, sem que um domine o outro">codominância</strong> — ou seja, quando presentes juntos, os dois se expressam ao mesmo tempo.</p>
      `},
      { kind: "example", title: "Genótipos e tipos sanguíneos", html: `
        <div class="table-scroll"><table>
          <thead><tr><th>Tipo sanguíneo</th><th>Genótipos possíveis</th></tr></thead>
          <tbody>
            <tr><td>A</td><td class="mono">I<sup>A</sup>I<sup>A</sup> ou I<sup>A</sup>i</td></tr>
            <tr><td>B</td><td class="mono">I<sup>B</sup>I<sup>B</sup> ou I<sup>B</sup>i</td></tr>
            <tr><td>AB</td><td class="mono">I<sup>A</sup>I<sup>B</sup></td></tr>
            <tr><td>O</td><td class="mono">ii</td></tr>
          </tbody>
        </table></div>
      `},
      { kind: "concept", title: "Antígenos, anticorpos, hemácias e plasma", html: `
        <p>Os alelos <span class="geno">I<sup>A</sup></span> e <span class="geno">I<sup>B</sup></span> determinam a produção de <strong>antígenos</strong> (proteínas de identificação) na superfície das <strong>hemácias</strong> (glóbulos vermelhos). Quem não produz nenhum dos dois (tipo O) tem hemácias sem antígenos A ou B.</p>
        <p>No <strong>plasma</strong> (a parte líquida do sangue) circulam <strong>anticorpos</strong> contra os antígenos que a pessoa não possui — por isso o tipo O é chamado de "doador universal" (não tem antígenos que provoquem rejeição) e o tipo AB de "receptor universal" (não produz anticorpos anti-A nem anti-B).</p>
      `},
      { kind: "visual", title: "Simulador de cruzamento ABO", html: `<div id="abo-tool-mount"></div>` },
      { kind: "practice", title: "Pratique", html: `<div id="abo-quick-quiz"></div>` },
      { kind: "summary", title: "Você precisa saber", html: `
        <div class="key-points"><h4>Resumo da aula</h4><ul>
          <li>3 alelos: <span class="geno">I<sup>A</sup></span>, <span class="geno">I<sup>B</sup></span> (codominantes entre si) e <span class="geno">i</span> (recessivo).</li>
          <li>Tipo AB = <span class="geno">I<sup>A</sup>I<sup>B</sup></span>. Tipo O = <span class="geno">ii</span>.</li>
          <li>Antígenos ficam nas hemácias; anticorpos circulam no plasma.</li>
        </ul></div>
      `}
    ]
  },
  {
    id: "rh",
    order: 11,
    title: "Sistema Rh",
    short: "O fator Rh e sua herança simples, dominante e recessiva.",
    difficulty: "Fácil",
    minutes: 12,
    category: "rh",
    blocks: [
      { kind: "concept", title: "Um gene, dois alelos", html: `
        <p>O fator Rh é bem mais simples que o sistema ABO: é controlado por um gene com dois alelos, <span class="geno">R</span> (dominante) e <span class="geno">r</span> (recessivo).</p>
      `},
      { kind: "example", title: "Genótipos e fenótipos Rh", html: `
        <div class="table-scroll"><table>
          <thead><tr><th>Genótipo</th><th>Fenótipo</th></tr></thead>
          <tbody>
            <tr><td class="mono">RR</td><td>Rh+</td></tr>
            <tr><td class="mono">Rr</td><td>Rh+</td></tr>
            <tr><td class="mono">rr</td><td>Rh−</td></tr>
          </tbody>
        </table></div>
        <p class="mt-3">Isso é essencialmente o mesmo padrão que você já viu no módulo de Dominância e Recessividade — só muda o nome das letras.</p>
      `},
      { kind: "visual", title: "Simulador de cruzamento Rh", html: `<div id="rh-tool-mount"></div>` },
      { kind: "practice", title: "Pratique", html: `<div id="rh-quick-quiz"></div>` },
      { kind: "summary", title: "Você precisa saber", html: `
        <div class="key-points"><h4>Resumo da aula</h4><ul>
          <li><span class="geno">R</span> dominante (Rh+), <span class="geno">r</span> recessivo (Rh−).</li>
          <li>Só é Rh− quem for homozigoto recessivo <span class="geno">rr</span>.</li>
        </ul></div>
      `}
    ]
  }
];

window.getLesson = function(id){ return window.LESSONS.find(l => l.id === id); };
window.getLessonsOrdered = function(){ return [...window.LESSONS].sort((a,b)=>a.order-b.order); };
