// Categorias e palavras do Impostor.
// Para adicionar uma categoria nova, copie um bloco e troque id, nome, cor e palavras.
export const CATEGORIES = [
  {
    id: 'comidas',
    name: 'Comidas',
    color: '#fb923c',
    words: [
      'Pizza', 'Feijoada', 'Brigadeiro', 'Coxinha', 'Pão de queijo', 'Lasanha', 'Hambúrguer',
      'Sushi', 'Churrasco', 'Pastel', 'Açaí', 'Pipoca', 'Sorvete', 'Macarrão', 'Tapioca',
      'Cuscuz', 'Moqueca', 'Strogonoff', 'Panqueca', 'Bolo de cenoura', 'Omelete', 'Salada',
      'Cachorro-quente', 'Esfirra', 'Paçoca', 'Pudim', 'Acarajé', 'Batata frita', 'Chocolate', 'Torta de limão',
    ],
  },
  {
    id: 'animais',
    name: 'Animais',
    color: '#4ade80',
    words: [
      'Cachorro', 'Gato', 'Elefante', 'Girafa', 'Leão', 'Macaco', 'Tubarão', 'Golfinho', 'Pinguim',
      'Jacaré', 'Cavalo', 'Vaca', 'Galinha', 'Papagaio', 'Tartaruga', 'Coelho', 'Cobra', 'Sapo',
      'Coruja', 'Abelha', 'Formiga', 'Borboleta', 'Polvo', 'Canguru', 'Urso', 'Capivara',
      'Tamanduá', 'Morcego', 'Camelo', 'Zebra',
    ],
  },
  {
    id: 'lugares',
    name: 'Lugares',
    color: '#60a5fa',
    words: [
      'Praia', 'Escola', 'Hospital', 'Aeroporto', 'Cinema', 'Supermercado', 'Igreja', 'Shopping',
      'Academia', 'Biblioteca', 'Padaria', 'Zoológico', 'Estádio', 'Farmácia', 'Restaurante',
      'Delegacia', 'Museu', 'Parque de diversões', 'Fazenda', 'Rodoviária', 'Hotel', 'Banco',
      'Salão de beleza', 'Posto de gasolina', 'Circo', 'Acampamento', 'Feira', 'Piscina', 'Cemitério', 'Boate',
    ],
  },
  {
    id: 'profissoes',
    name: 'Profissões',
    color: '#a78bfa',
    words: [
      'Médico', 'Professor', 'Bombeiro', 'Policial', 'Cozinheiro', 'Dentista', 'Motorista',
      'Pedreiro', 'Advogado', 'Cabeleireiro', 'Piloto', 'Astronauta', 'Jogador de futebol',
      'Cantor', 'Palhaço', 'Mecânico', 'Veterinário', 'Garçom', 'Fotógrafo', 'Jornalista',
      'Eletricista', 'Padeiro', 'Enfermeiro', 'Juiz', 'Carteiro', 'Programador', 'Agricultor',
      'Salva-vidas', 'Mágico', 'Pintor',
    ],
  },
  {
    id: 'objetos',
    name: 'Objetos',
    color: '#facc15',
    words: [
      'Guarda-chuva', 'Celular', 'Tesoura', 'Escova de dente', 'Relógio', 'Óculos', 'Travesseiro',
      'Geladeira', 'Ventilador', 'Controle remoto', 'Mochila', 'Chave', 'Vela', 'Espelho',
      'Panela', 'Garrafa', 'Lanterna', 'Caneta', 'Cadeira', 'Fone de ouvido', 'Martelo', 'Vassoura',
      'Carregador', 'Liquidificador', 'Secador de cabelo', 'Sabonete', 'Toalha', 'Bola', 'Mala', 'Rede',
    ],
  },
  {
    id: 'esportes',
    name: 'Esportes',
    color: '#22d3ee',
    words: [
      'Futebol', 'Vôlei', 'Basquete', 'Natação', 'Tênis', 'Surfe', 'Skate', 'Boxe', 'Judô',
      'Ciclismo', 'Corrida', 'Xadrez', 'Golfe', 'Handebol', 'Capoeira', 'Futevôlei', 'Ginástica',
      'Escalada', 'Pingue-pongue', 'Boliche', 'Sinuca', 'Patinação', 'Esgrima', 'Hipismo',
      'Paraquedismo', 'Remo', 'Beisebol', 'Karatê', 'Mergulho', 'Queimada',
    ],
  },
  {
    id: 'brasil',
    name: 'Coisas do Brasil',
    color: '#34d399',
    words: [
      'Carnaval', 'Samba', 'Caipirinha', 'Havaiana', 'Festa junina', 'Novela', 'Pagode',
      'Forró', 'Churrasco de domingo', 'Pelada', 'Cristo Redentor', 'Amazônia', 'Pão francês',
      'Guaraná', 'Mate', 'Rodízio', 'Bloco de rua', 'Quentão', 'Fila do banco', 'Reality show',
      'Fusca', 'Feira livre', 'Mandioca', 'Chimarrão', 'Pastel de feira', 'Arraial', 'Sertanejo',
      'Funk', 'Torcida', 'Pé de moleque',
    ],
  },
  {
    id: 'natureza',
    name: 'Natureza',
    color: '#86efac',
    words: [
      'Vulcão', 'Cachoeira', 'Montanha', 'Deserto', 'Floresta', 'Arco-íris', 'Tempestade',
      'Neve', 'Lua', 'Sol', 'Estrela', 'Rio', 'Oceano', 'Ilha', 'Caverna', 'Furacão', 'Terremoto',
      'Girassol', 'Cacto', 'Coqueiro', 'Lago', 'Relâmpago', 'Nuvem', 'Pôr do sol', 'Areia',
      'Geleira', 'Cometa', 'Pantanal', 'Orvalho', 'Folha seca',
    ],
  },
  {
    id: 'festa',
    name: 'Festa',
    color: '#f472b6',
    words: [
      'Aniversário', 'Casamento', 'Bolo', 'Balão', 'Karaokê', 'DJ', 'Confete', 'Fantasia',
      'Brinde', 'Parabéns', 'Velinha', 'Convite', 'Chá de bebê', 'Formatura', 'Réveillon',
      'Fogos de artifício', 'Pista de dança', 'Docinhos', 'Presente', 'Lembrancinha',
      'Amigo secreto', 'Open bar', 'Churrasco', 'Buquê', 'Piñata', 'Pula-pula', 'Chapéu de festa',
      'Ressaca', 'Despedida de solteiro', 'Serenata',
    ],
  },
  {
    id: 'transportes',
    name: 'Transportes',
    color: '#f87171',
    words: [
      'Avião', 'Ônibus', 'Bicicleta', 'Moto', 'Navio', 'Trem', 'Metrô', 'Helicóptero', 'Táxi',
      'Submarino', 'Foguete', 'Patinete', 'Caminhão', 'Ambulância', 'Barco', 'Balão de ar quente',
      'Carroça', 'Teleférico', 'Jet ski', 'Trator', 'Canoa', 'Limusine', 'Kart', 'Caiaque',
      'Monociclo', 'Disco voador', 'Carro de bombeiro', 'Van escolar', 'Bondinho', 'Tanque de guerra',
    ],
  },
]

export const CATEGORY_BY_ID = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]))
