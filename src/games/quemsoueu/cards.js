// Cartas do "Quem Sou Eu?". Cada categoria tem uma lista de nomes.
// Para adicionar: coloque o nome na lista certa (sem repetir em outra categoria).

export const CATEGORIES = [
  {
    id: 'animais',
    name: 'Animais',
    color: '#4ade80',
    items: [
      'Cachorro', 'Gato', 'Cavalo', 'Vaca', 'Porco', 'Galinha', 'Leão', 'Tigre', 'Elefante', 'Girafa',
      'Macaco', 'Zebra', 'Jacaré', 'Tubarão', 'Baleia', 'Golfinho', 'Polvo', 'Tartaruga', 'Coelho', 'Rato',
      'Cobra', 'Sapo', 'Papagaio', 'Pinguim', 'Coruja', 'Urso', 'Canguru', 'Camelo', 'Bicho-preguiça', 'Tamanduá',
      'Onça-pintada', 'Capivara', 'Tucano', 'Arara', 'Abelha', 'Formiga', 'Borboleta', 'Mosquito', 'Hipopótamo', 'Lobo',
      'Raposa', 'Ovelha', 'Pato', 'Pavão', 'Avestruz', 'Morcego', 'Esquilo', 'Caranguejo', 'Camarão', 'Lagartixa',
    ],
  },
  {
    id: 'profissoes',
    name: 'Profissões',
    color: '#60a5fa',
    items: [
      'Médico', 'Enfermeira', 'Dentista', 'Professor', 'Bombeiro', 'Policial', 'Advogado', 'Juiz', 'Cozinheiro', 'Garçom',
      'Motorista de ônibus', 'Taxista', 'Piloto de avião', 'Comissário de bordo', 'Astronauta', 'Pedreiro', 'Eletricista', 'Encanador', 'Mecânico', 'Cabeleireiro',
      'Manicure', 'Padeiro', 'Açougueiro', 'Carteiro', 'Jardineiro', 'Pescador', 'Fazendeiro', 'Veterinário', 'Farmacêutico', 'Fotógrafo',
      'Jornalista', 'Cantor', 'Ator', 'Palhaço', 'Mágico', 'Jogador de futebol', 'Árbitro', 'Salva-vidas', 'Detetive', 'Cientista',
      'Programador', 'Arquiteto', 'Costureira', 'Gari', 'Porteiro', 'Vendedor ambulante', 'Youtuber', 'Babá', 'Psicólogo', 'Personal trainer',
    ],
  },
  {
    id: 'objetos',
    name: 'Objetos',
    color: '#fbbf24',
    items: [
      'Celular', 'Controle remoto', 'Guarda-chuva', 'Óculos', 'Relógio', 'Chave', 'Carteira', 'Mochila', 'Tesoura', 'Escova de dentes',
      'Pente', 'Secador de cabelo', 'Travesseiro', 'Cobertor', 'Vassoura', 'Balde', 'Panela', 'Frigideira', 'Garfo', 'Colher',
      'Faca', 'Copo', 'Prato', 'Geladeira', 'Fogão', 'Micro-ondas', 'Liquidificador', 'Televisão', 'Ventilador', 'Ar-condicionado',
      'Espelho', 'Lâmpada', 'Vela', 'Isqueiro', 'Caneta', 'Lápis', 'Borracha', 'Caderno', 'Livro', 'Calculadora',
      'Fone de ouvido', 'Carregador', 'Pilha', 'Martelo', 'Prego', 'Escada', 'Cadeira', 'Sofá', 'Rede de dormir', 'Varal',
    ],
  },
  {
    id: 'comidas',
    name: 'Comidas e bebidas',
    color: '#fb923c',
    items: [
      'Pizza', 'Hambúrguer', 'Cachorro-quente', 'Pastel', 'Coxinha', 'Pão de queijo', 'Brigadeiro', 'Beijinho', 'Feijoada', 'Churrasco',
      'Arroz', 'Feijão', 'Farofa', 'Lasanha', 'Macarrão', 'Sushi', 'Tapioca', 'Açaí', 'Pipoca', 'Sorvete',
      'Chocolate', 'Bolo de cenoura', 'Pudim', 'Paçoca', 'Pamonha', 'Cuscuz', 'Acarajé', 'Moqueca', 'Batata frita', 'Ovo frito',
      'Banana', 'Maçã', 'Melancia', 'Abacaxi', 'Manga', 'Morango', 'Limão', 'Café', 'Leite', 'Suco de laranja',
      'Refrigerante', 'Água de coco', 'Caldo de cana', 'Chimarrão', 'Pão francês', 'Queijo', 'Presunto', 'Salada', 'Sopa', 'Panqueca',
    ],
  },
  {
    id: 'lugares',
    name: 'Lugares',
    color: '#22d3ee',
    items: [
      'Praia', 'Escola', 'Hospital', 'Igreja', 'Supermercado', 'Shopping', 'Cinema', 'Academia', 'Padaria', 'Farmácia',
      'Banco', 'Aeroporto', 'Rodoviária', 'Estádio de futebol', 'Zoológico', 'Parque de diversões', 'Circo', 'Biblioteca', 'Museu', 'Delegacia',
      'Cemitério', 'Fazenda', 'Floresta', 'Deserto', 'Montanha', 'Ilha', 'Cachoeira', 'Piscina', 'Banheiro', 'Cozinha',
      'Quarto', 'Elevador', 'Restaurante', 'Bar', 'Salão de beleza', 'Posto de gasolina', 'Feira livre', 'Prisão', 'Castelo', 'Espaço sideral',
    ],
  },
  {
    id: 'mundo',
    name: 'Países e cidades',
    color: '#a78bfa',
    items: [
      'Brasil', 'Argentina', 'Portugal', 'Estados Unidos', 'México', 'Japão', 'China', 'Índia', 'Egito', 'Itália',
      'França', 'Espanha', 'Alemanha', 'Inglaterra', 'Rússia', 'Austrália', 'Canadá', 'Chile', 'Peru', 'Grécia',
      'Rio de Janeiro', 'São Paulo', 'Salvador', 'Recife', 'Fortaleza', 'Manaus', 'Brasília', 'Belo Horizonte', 'Curitiba', 'Porto Alegre',
      'Foz do Iguaçu', 'Fernando de Noronha', 'Paris', 'Nova York', 'Londres', 'Roma', 'Tóquio', 'Lisboa', 'Buenos Aires', 'Las Vegas',
    ],
  },
  {
    id: 'famosos-br',
    name: 'Famosos do Brasil',
    color: '#f472b6',
    items: [
      'Pelé', 'Ayrton Senna', 'Neymar', 'Ronaldinho Gaúcho', 'Ronaldo Fenômeno', 'Marta', 'Romário', 'Zico', 'Rebeca Andrade', 'Gustavo Kuerten',
      'Xuxa', 'Silvio Santos', 'Faustão', 'Ana Maria Braga', 'Fátima Bernardes', 'Luciano Huck', 'Anitta', 'Ivete Sangalo', 'Roberto Carlos', 'Caetano Veloso',
      'Gilberto Gil', 'Chico Buarque', 'Elis Regina', 'Rita Lee', 'Tim Maia', 'Zeca Pagodinho', 'Ludmilla', 'Gusttavo Lima', 'Wesley Safadão', 'Luan Santana',
      'Gisele Bündchen', 'Fernanda Montenegro', 'Tony Ramos', 'Paulo Gustavo', 'Renato Aragão', 'Chacrinha', 'Monteiro Lobato', 'Santos Dumont', 'Dom Pedro II', 'Tiradentes',
    ],
  },
  {
    id: 'famosos-mundo',
    name: 'Famosos do mundo',
    color: '#f87171',
    items: [
      'Albert Einstein', 'Isaac Newton', 'Leonardo da Vinci', 'Michelangelo', 'Pablo Picasso', 'Vincent van Gogh', 'William Shakespeare', 'Charles Chaplin', 'Marilyn Monroe', 'Elvis Presley',
      'Michael Jackson', 'Madonna', 'Beyoncé', 'Freddie Mercury', 'Os Beatles', 'Bob Marley', 'Lionel Messi', 'Cristiano Ronaldo', 'Michael Jordan', 'Usain Bolt',
      'Serena Williams', 'Muhammad Ali', 'Napoleão', 'Cleópatra', 'Júlio César', 'Cristóvão Colombo', 'Gandhi', 'Nelson Mandela', 'Martin Luther King', 'Papa Francisco',
      'Rainha Elizabeth II', 'Frida Kahlo', 'Mozart', 'Beethoven', 'Steve Jobs', 'Bill Gates', 'Walt Disney', 'Neil Armstrong', 'Galileu Galilei', 'Marie Curie',
    ],
  },
  {
    id: 'historias',
    name: 'Histórias e folclore',
    color: '#c084fc',
    items: [
      'Saci-Pererê', 'Curupira', 'Mula sem cabeça', 'Boitatá', 'Iara', 'Boto cor-de-rosa', 'Lobisomem', 'Cuca', 'Papai Noel', 'Coelhinho da Páscoa',
      'Fada do dente', 'Cinderela', 'Branca de Neve', 'Chapeuzinho Vermelho', 'Lobo Mau', 'Os Três Porquinhos', 'João e Maria', 'Rapunzel', 'Bela Adormecida', 'Pinóquio',
      'Peter Pan', 'Capitão Gancho', 'Alice no País das Maravilhas', 'Aladim', 'Gênio da lâmpada', 'Robin Hood', 'Rei Arthur', 'Dom Quixote', 'Drácula', 'Frankenstein',
      'Múmia', 'Sereia', 'Dragão', 'Unicórnio', 'Bruxa', 'Fantasma', 'Zumbi', 'Vampiro', 'Pirata', 'Ninja',
    ],
  },
  {
    id: 'esportes',
    name: 'Esportes e brincadeiras',
    color: '#34d399',
    items: [
      'Futebol', 'Vôlei', 'Basquete', 'Tênis', 'Natação', 'Corrida', 'Ciclismo', 'Surfe', 'Skate', 'Boxe',
      'Judô', 'Capoeira', 'Ginástica', 'Xadrez', 'Golfe', 'Boliche', 'Sinuca', 'Pingue-pongue', 'Handebol', 'Futevôlei',
      'Esconde-esconde', 'Pega-pega', 'Amarelinha', 'Pular corda', 'Pipa', 'Bolinha de gude', 'Pião', 'Dominó', 'Baralho', 'Bingo',
      'Queimada', 'Cabo de guerra', 'Estátua', 'Telefone sem fio', 'Videogame', 'Karaokê', 'Quebra-cabeça', 'Dança das cadeiras', 'Patins', 'Balanço',
    ],
  },
  {
    id: 'transportes',
    name: 'Transportes e máquinas',
    color: '#94a3b8',
    items: [
      'Carro', 'Moto', 'Bicicleta', 'Ônibus', 'Caminhão', 'Trem', 'Metrô', 'Avião', 'Helicóptero', 'Navio',
      'Barco', 'Canoa', 'Jet ski', 'Submarino', 'Foguete', 'Balão', 'Ambulância', 'Viatura de polícia', 'Caminhão de bombeiro', 'Trator',
      'Patinete', 'Carroça', 'Teleférico', 'Escada rolante', 'Robô', 'Drone', 'Computador', 'Impressora', 'Máquina de lavar', 'Aspirador de pó',
      'Disco voador', 'Skate elétrico', 'Táxi', 'Lancha', 'Caiaque', 'Monociclo', 'Triciclo', 'Kart', 'Tanque de guerra', 'Bondinho',
    ],
  },
  {
    id: 'natureza',
    name: 'Natureza e corpo',
    color: '#86efac',
    items: [
      'Sol', 'Lua', 'Estrela', 'Nuvem', 'Chuva', 'Arco-íris', 'Raio', 'Neve', 'Vulcão', 'Terremoto',
      'Rio', 'Mar', 'Lago', 'Árvore', 'Flor', 'Cacto', 'Grama', 'Pedra', 'Areia', 'Fogo',
      'Vento', 'Furacão', 'Planeta Terra', 'Cometa', 'Coração', 'Cérebro', 'Nariz', 'Orelha', 'Dente', 'Unha',
      'Cabelo', 'Barriga', 'Joelho', 'Cotovelo', 'Umbigo', 'Bigode', 'Espirro', 'Soluço', 'Bocejo', 'Ronco',
    ],
  },
]

export const CATEGORY_BY_ID = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]))
