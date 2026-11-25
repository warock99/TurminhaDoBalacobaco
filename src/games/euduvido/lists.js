// Listas do "Eu Duvido". Só dados conferidos, que não mudam (ou com o ano da informação na fonte).
// A ordem dos itens não importa no jogo: vale estar ou não estar na lista.
// Para adicionar: { cat, title, source, items: [...] }. Itens podem ter apelidos entre parênteses.

export const LIST_GROUPS = [
  { id: 'brasil', name: 'Brasil', color: '#4ade80' },
  { id: 'mundo', name: 'Mundo', color: '#60a5fa' },
  { id: 'esporte', name: 'Esportes', color: '#fb923c' },
  { id: 'ciencia', name: 'Ciência e natureza', color: '#a78bfa' },
  { id: 'cultura', name: 'Cultura e curiosidades', color: '#f472b6' },
]

export const LISTS = [
  // ---------- Brasil ----------
  {
    cat: 'brasil',
    title: 'Os 10 estados mais populosos do Brasil',
    source: 'IBGE, Censo 2022',
    items: ['São Paulo', 'Minas Gerais', 'Rio de Janeiro', 'Bahia', 'Paraná', 'Rio Grande do Sul', 'Pernambuco', 'Ceará', 'Pará', 'Santa Catarina'],
  },
  {
    cat: 'brasil',
    title: 'Os 10 maiores estados do Brasil em tamanho',
    source: 'IBGE (área territorial)',
    items: ['Amazonas', 'Pará', 'Mato Grosso', 'Minas Gerais', 'Bahia', 'Mato Grosso do Sul', 'Goiás', 'Maranhão', 'Rio Grande do Sul', 'Tocantins'],
  },
  {
    cat: 'brasil',
    title: 'Os 10 menores estados do Brasil em tamanho (contando o DF)',
    source: 'IBGE (área territorial)',
    items: ['Distrito Federal', 'Sergipe', 'Alagoas', 'Rio de Janeiro', 'Espírito Santo', 'Rio Grande do Norte', 'Paraíba', 'Santa Catarina', 'Pernambuco', 'Amapá'],
  },
  {
    cat: 'brasil',
    title: 'As 10 cidades mais populosas do Brasil',
    source: 'IBGE, Censo 2022',
    items: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Fortaleza', 'Salvador', 'Belo Horizonte', 'Manaus', 'Curitiba', 'Recife', 'Goiânia'],
  },
  {
    cat: 'brasil',
    title: 'Os 10 países que fazem fronteira com o Brasil',
    source: 'Inclui a Guiana Francesa, que é da França',
    items: ['Argentina', 'Bolívia', 'Colômbia', 'Guiana', 'Guiana Francesa (França)', 'Paraguai', 'Peru', 'Suriname', 'Uruguai', 'Venezuela'],
  },
  {
    cat: 'brasil',
    title: 'Os 17 estados brasileiros que têm praia (litoral)',
    source: 'IBGE',
    items: [
      'Amapá', 'Pará', 'Maranhão', 'Piauí', 'Ceará', 'Rio Grande do Norte', 'Paraíba', 'Pernambuco', 'Alagoas',
      'Sergipe', 'Bahia', 'Espírito Santo', 'Rio de Janeiro', 'São Paulo', 'Paraná', 'Santa Catarina', 'Rio Grande do Sul',
    ],
  },
  {
    cat: 'brasil',
    title: 'Os 9 estados do Nordeste',
    source: 'IBGE (regiões do Brasil)',
    items: ['Maranhão', 'Piauí', 'Ceará', 'Rio Grande do Norte', 'Paraíba', 'Pernambuco', 'Alagoas', 'Sergipe', 'Bahia'],
  },
  {
    cat: 'brasil',
    title: 'As 9 capitais do Nordeste',
    source: 'IBGE',
    items: ['São Luís', 'Teresina', 'Fortaleza', 'Natal', 'João Pessoa', 'Recife', 'Maceió', 'Aracaju', 'Salvador'],
  },
  {
    cat: 'brasil',
    title: 'Os 7 estados da região Norte',
    source: 'IBGE (regiões do Brasil)',
    items: ['Acre', 'Amapá', 'Amazonas', 'Pará', 'Rondônia', 'Roraima', 'Tocantins'],
  },
  {
    cat: 'brasil',
    title: 'Os 6 biomas do Brasil',
    source: 'IBGE',
    items: ['Amazônia', 'Cerrado', 'Mata Atlântica', 'Caatinga', 'Pampa', 'Pantanal'],
  },

  {
    cat: 'brasil',
    title: 'As 7 capitais da região Norte',
    source: 'IBGE',
    items: ['Rio Branco', 'Macapá', 'Manaus', 'Belém', 'Porto Velho', 'Boa Vista', 'Palmas'],
  },
  {
    cat: 'brasil',
    title: 'As 7 capitais do Sul e do Sudeste',
    source: 'IBGE',
    items: ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Vitória', 'Curitiba', 'Florianópolis', 'Porto Alegre'],
  },

  // ---------- Mundo ----------
  {
    cat: 'mundo',
    title: 'Os 10 países mais populosos do mundo',
    source: 'ONU, 2023',
    items: ['Índia', 'China', 'Estados Unidos', 'Indonésia', 'Paquistão', 'Nigéria', 'Brasil', 'Bangladesh', 'Rússia', 'México'],
  },
  {
    cat: 'mundo',
    title: 'Os 10 maiores países do mundo em tamanho',
    source: 'Área total (dados da ONU)',
    items: ['Rússia', 'Canadá', 'Estados Unidos', 'China', 'Brasil', 'Austrália', 'Índia', 'Argentina', 'Cazaquistão', 'Argélia'],
  },
  {
    cat: 'mundo',
    title: 'As 10 maiores economias do mundo',
    source: 'FMI, PIB de 2023',
    items: ['Estados Unidos', 'China', 'Alemanha', 'Japão', 'Índia', 'Reino Unido', 'França', 'Itália', 'Brasil', 'Canadá'],
  },
  {
    cat: 'mundo',
    title: 'Os 12 países da América do Sul',
    source: 'Países independentes',
    items: ['Argentina', 'Bolívia', 'Brasil', 'Chile', 'Colômbia', 'Equador', 'Guiana', 'Paraguai', 'Peru', 'Suriname', 'Uruguai', 'Venezuela'],
  },
  {
    cat: 'mundo',
    title: 'Os 10 maiores países da América do Sul em tamanho',
    source: 'Área total',
    items: ['Brasil', 'Argentina', 'Peru', 'Colômbia', 'Bolívia', 'Venezuela', 'Chile', 'Paraguai', 'Equador', 'Guiana'],
  },
  {
    cat: 'mundo',
    title: 'Os 10 maiores países da África em tamanho',
    source: 'Área total',
    items: ['Argélia', 'República Democrática do Congo', 'Sudão', 'Líbia', 'Chade', 'Níger', 'Angola', 'Mali', 'África do Sul', 'Etiópia'],
  },
  {
    cat: 'mundo',
    title: 'Os 9 países que têm o português como língua oficial',
    source: 'CPLP',
    items: ['Brasil', 'Portugal', 'Angola', 'Moçambique', 'Cabo Verde', 'Guiné-Bissau', 'São Tomé e Príncipe', 'Timor-Leste', 'Guiné Equatorial'],
  },
  {
    cat: 'mundo',
    title: 'As 7 novas maravilhas do mundo',
    source: 'Votação mundial de 2007',
    items: ['Cristo Redentor', 'Machu Picchu', 'Chichén Itzá', 'Coliseu', 'Taj Mahal', 'Grande Muralha da China', 'Petra'],
  },
  {
    cat: 'mundo',
    title: 'Os 7 países do G7',
    source: 'Grupo dos Sete',
    items: ['Estados Unidos', 'Canadá', 'Reino Unido', 'França', 'Alemanha', 'Itália', 'Japão'],
  },
  {
    cat: 'mundo',
    title: 'As 10 maiores ilhas do mundo',
    source: 'Área (sem contar a Austrália, que é continente)',
    items: ['Groenlândia', 'Nova Guiné', 'Bornéu', 'Madagascar', 'Ilha de Baffin', 'Sumatra', 'Honshu (Japão)', 'Ilha Vitória (Canadá)', 'Grã-Bretanha', 'Ilha Ellesmere (Canadá)'],
  },

  {
    cat: 'mundo',
    title: 'Os 10 países mais populosos da América do Sul',
    source: 'ONU, 2023',
    items: ['Brasil', 'Colômbia', 'Argentina', 'Peru', 'Venezuela', 'Chile', 'Equador', 'Bolívia', 'Paraguai', 'Uruguai'],
  },
  {
    cat: 'mundo',
    title: 'Os 10 países mais populosos da África',
    source: 'ONU, 2023',
    items: ['Nigéria', 'Etiópia', 'Egito', 'República Democrática do Congo', 'Tanzânia', 'África do Sul', 'Quênia', 'Uganda', 'Sudão', 'Argélia'],
  },
  {
    cat: 'mundo',
    title: 'Os 5 oceanos',
    source: 'Divisão mais usada hoje',
    items: ['Pacífico', 'Atlântico', 'Índico', 'Antártico (Austral)', 'Ártico'],
  },

  // ---------- Esportes ----------
  {
    cat: 'esporte',
    title: 'Os 8 países campeões da Copa do Mundo de futebol masculino',
    source: 'FIFA, até 2022',
    items: ['Brasil', 'Alemanha', 'Itália', 'Argentina', 'França', 'Uruguai', 'Inglaterra', 'Espanha'],
  },
  {
    cat: 'esporte',
    title: 'Os países que já foram sede da Copa do Mundo masculina',
    source: 'FIFA, até 2022 (2002 foi dividida entre Coreia do Sul e Japão)',
    items: [
      'Uruguai', 'Itália', 'França', 'Brasil', 'Suíça', 'Suécia', 'Chile', 'Inglaterra', 'México',
      'Alemanha', 'Argentina', 'Espanha', 'Estados Unidos', 'Coreia do Sul', 'Japão', 'África do Sul', 'Rússia', 'Catar',
    ],
  },
  {
    cat: 'esporte',
    title: 'Os países que já foram sede das Olimpíadas de verão',
    source: 'COI, até Paris 2024 (Moscou 1980 conta como Rússia)',
    items: [
      'Grécia', 'França', 'Estados Unidos', 'Reino Unido', 'Suécia', 'Bélgica', 'Holanda', 'Alemanha', 'Finlândia', 'Austrália',
      'Itália', 'Japão', 'México', 'Canadá', 'Rússia', 'Coreia do Sul', 'Espanha', 'China', 'Brasil',
    ],
  },
  {
    cat: 'esporte',
    title: 'Os 12 clubes brasileiros campeões da Libertadores',
    source: 'Conmebol, até 2024',
    items: ['Santos', 'Cruzeiro', 'Flamengo', 'Grêmio', 'São Paulo', 'Vasco', 'Palmeiras', 'Internacional', 'Corinthians', 'Atlético Mineiro', 'Fluminense', 'Botafogo'],
  },
  {
    cat: 'esporte',
    title: 'Os 3 brasileiros campeões mundiais de Fórmula 1',
    source: 'FIA',
    items: ['Emerson Fittipaldi', 'Nelson Piquet', 'Ayrton Senna'],
  },

  {
    cat: 'esporte',
    title: 'Os 10 países campeões da Eurocopa',
    source: 'UEFA, até 2024',
    items: ['Espanha', 'Alemanha', 'Itália', 'França', 'União Soviética', 'Tchecoslováquia', 'Holanda', 'Dinamarca', 'Grécia', 'Portugal'],
  },
  {
    cat: 'esporte',
    title: 'Os 8 países campeões da Copa América',
    source: 'Conmebol, até 2024',
    items: ['Uruguai', 'Argentina', 'Brasil', 'Paraguai', 'Peru', 'Colômbia', 'Chile', 'Bolívia'],
  },
  {
    cat: 'esporte',
    title: 'Os 12 grandes clubes do futebol brasileiro',
    source: 'Lista tradicional dos "12 grandes"',
    items: ['Corinthians', 'Palmeiras', 'São Paulo', 'Santos', 'Flamengo', 'Fluminense', 'Vasco', 'Botafogo', 'Atlético Mineiro', 'Cruzeiro', 'Grêmio', 'Internacional'],
  },
  {
    cat: 'esporte',
    title: 'As 6 peças do xadrez',
    source: 'Regras do xadrez',
    items: ['Rei', 'Dama (rainha)', 'Torre', 'Bispo', 'Cavalo', 'Peão'],
  },

  // ---------- Ciência e natureza ----------
  {
    cat: 'ciencia',
    title: 'As 10 montanhas mais altas do mundo',
    source: 'Altitude acima do nível do mar',
    items: ['Everest', 'K2', 'Kangchenjunga', 'Lhotse', 'Makalu', 'Cho Oyu', 'Dhaulagiri', 'Manaslu', 'Nanga Parbat', 'Annapurna'],
  },
  {
    cat: 'ciencia',
    title: 'Os 10 rios mais compridos do mundo',
    source: 'Comprimento aproximado (as medições variam um pouco)',
    items: ['Nilo', 'Amazonas', 'Yangtzé (Azul)', 'Mississippi-Missouri', 'Ienissei', 'Rio Amarelo', 'Ob-Irtysh', 'Paraná', 'Congo', 'Amur'],
  },
  {
    cat: 'ciencia',
    title: 'Os 8 planetas do Sistema Solar',
    source: 'União Astronômica Internacional',
    items: ['Mercúrio', 'Vênus', 'Terra', 'Marte', 'Júpiter', 'Saturno', 'Urano', 'Netuno'],
  },
  {
    cat: 'ciencia',
    title: 'As 10 maiores luas do Sistema Solar',
    source: 'Diâmetro (dados da NASA)',
    items: ['Ganimedes', 'Titã', 'Calisto', 'Io', 'Lua (da Terra)', 'Europa', 'Tritão', 'Titânia', 'Reia', 'Oberon'],
  },
  {
    cat: 'ciencia',
    title: 'Os 10 elementos químicos mais comuns no corpo humano',
    source: 'Pela massa do corpo',
    items: ['Oxigênio', 'Carbono', 'Hidrogênio', 'Nitrogênio', 'Cálcio', 'Fósforo', 'Potássio', 'Enxofre', 'Sódio', 'Cloro'],
  },
  {
    cat: 'ciencia',
    title: 'Os 10 elementos químicos mais comuns na crosta da Terra',
    source: 'Pela massa da crosta',
    items: ['Oxigênio', 'Silício', 'Alumínio', 'Ferro', 'Cálcio', 'Sódio', 'Potássio', 'Magnésio', 'Titânio', 'Hidrogênio'],
  },
  {
    cat: 'ciencia',
    title: 'As 7 cores do arco-íris',
    source: 'Divisão tradicional',
    items: ['Vermelho', 'Laranja', 'Amarelo', 'Verde', 'Azul', 'Anil', 'Violeta'],
  },

  {
    cat: 'ciencia',
    title: 'Os 5 sentidos do corpo humano',
    source: 'Divisão tradicional',
    items: ['Visão', 'Audição', 'Olfato', 'Paladar', 'Tato'],
  },
  {
    cat: 'ciencia',
    title: 'Os 4 planetas que têm anéis',
    source: 'NASA',
    items: ['Júpiter', 'Saturno', 'Urano', 'Netuno'],
  },
  {
    cat: 'ciencia',
    title: 'As 4 fases principais da Lua',
    source: 'Astronomia',
    items: ['Lua nova', 'Quarto crescente', 'Lua cheia', 'Quarto minguante'],
  },

  // ---------- Cultura e curiosidades ----------
  {
    cat: 'cultura',
    title: 'As 10 maiores bilheterias de cinema de todos os tempos',
    source: 'Bilheteria mundial, até o fim de 2024',
    items: [
      'Avatar', 'Vingadores: Ultimato', 'Avatar: O Caminho da Água', 'Titanic', 'Star Wars: O Despertar da Força',
      'Vingadores: Guerra Infinita', 'Homem-Aranha: Sem Volta Para Casa', 'Divertida Mente 2', 'Jurassic World', 'O Rei Leão (2019)',
    ],
  },
  {
    cat: 'cultura',
    title: 'Os 12 signos do zodíaco',
    source: 'Astrologia ocidental',
    items: ['Áries', 'Touro', 'Gêmeos', 'Câncer', 'Leão', 'Virgem', 'Libra', 'Escorpião', 'Sagitário', 'Capricórnio', 'Aquário', 'Peixes'],
  },
  {
    cat: 'cultura',
    title: 'Os 12 animais do horóscopo chinês',
    source: 'Tradição chinesa',
    items: ['Rato', 'Boi', 'Tigre', 'Coelho', 'Dragão', 'Serpente', 'Cavalo', 'Cabra', 'Macaco', 'Galo', 'Cão', 'Porco'],
  },
  {
    cat: 'cultura',
    title: 'Os 7 meses do ano que têm 31 dias',
    source: 'Calendário',
    items: ['Janeiro', 'Março', 'Maio', 'Julho', 'Agosto', 'Outubro', 'Dezembro'],
  },
  {
    cat: 'cultura',
    title: 'As 7 notas musicais',
    source: 'Escala de dó maior',
    items: ['Dó', 'Ré', 'Mi', 'Fá', 'Sol', 'Lá', 'Si'],
  },
  {
    cat: 'cultura',
    title: 'Os 7 pecados capitais',
    source: 'Tradição cristã',
    items: ['Gula', 'Avareza', 'Luxúria', 'Ira', 'Inveja', 'Preguiça', 'Soberba (orgulho)'],
  },
]
