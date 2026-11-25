// Categorias do "Bomba Secreta". Em cada rodada o app mostra até 12 opções da categoria
// e esconde a bomba em uma delas. Listas maiores dão tabuleiros diferentes a cada vez.
// Para adicionar: { group, title, items: [...] } com pelo menos 6 itens.

export const BOMB_GROUPS = [
  { id: 'dia', name: 'Dia a dia', color: '#60a5fa' },
  { id: 'comida', name: 'Comidas', color: '#fb923c' },
  { id: 'lugares', name: 'Lugares', color: '#34d399' },
  { id: 'natureza', name: 'Bichos e natureza', color: '#4ade80' },
  { id: 'diversao', name: 'Diversão e cultura', color: '#f472b6' },
]

export const BOMB_CATEGORIES = [
  // ---------- Dia a dia ----------
  { group: 'dia', title: 'Dias da semana', items: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'] },
  {
    group: 'dia',
    title: 'Meses do ano',
    items: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  },
  { group: 'dia', title: 'Cores', items: ['Vermelho', 'Azul', 'Amarelo', 'Verde', 'Preto', 'Branco', 'Rosa', 'Roxo', 'Laranja', 'Marrom', 'Cinza', 'Bege', 'Dourado', 'Prateado'] },
  { group: 'dia', title: 'Números de 1 a 10', items: ['Um', 'Dois', 'Três', 'Quatro', 'Cinco', 'Seis', 'Sete', 'Oito', 'Nove', 'Dez'] },
  { group: 'dia', title: 'Formas geométricas', items: ['Círculo', 'Quadrado', 'Triângulo', 'Retângulo', 'Losango', 'Estrela', 'Coração', 'Hexágono', 'Oval', 'Pentágono'] },
  {
    group: 'dia',
    title: 'Partes do corpo',
    items: ['Cabeça', 'Olho', 'Nariz', 'Boca', 'Orelha', 'Pescoço', 'Ombro', 'Braço', 'Mão', 'Dedo', 'Barriga', 'Joelho', 'Pé', 'Costas', 'Cotovelo', 'Umbigo'],
  },
  {
    group: 'dia',
    title: 'Roupas',
    items: ['Camiseta', 'Calça', 'Bermuda', 'Saia', 'Vestido', 'Meia', 'Cueca', 'Calcinha', 'Pijama', 'Casaco', 'Moletom', 'Boné', 'Jaqueta', 'Sunga', 'Biquíni', 'Gravata'],
  },
  { group: 'dia', title: 'Calçados', items: ['Tênis', 'Chinelo', 'Sandália', 'Bota', 'Sapato social', 'Salto alto', 'Pantufa', 'Rasteirinha', 'Galocha', 'Sapatilha', 'Crocs', 'Chuteira'] },
  {
    group: 'dia',
    title: 'Coisas da cozinha',
    items: ['Panela', 'Frigideira', 'Colher', 'Garfo', 'Faca', 'Prato', 'Copo', 'Xícara', 'Geladeira', 'Fogão', 'Micro-ondas', 'Liquidificador', 'Concha', 'Escorredor', 'Pano de prato', 'Abridor'],
  },
  {
    group: 'dia',
    title: 'Coisas do banheiro',
    items: ['Escova de dentes', 'Pasta de dente', 'Sabonete', 'Xampu', 'Toalha', 'Papel higiênico', 'Chuveiro', 'Espelho', 'Pente', 'Fio dental', 'Desodorante', 'Secador', 'Barbeador', 'Cotonete'],
  },
  {
    group: 'dia',
    title: 'Material escolar',
    items: ['Lápis', 'Caneta', 'Borracha', 'Apontador', 'Régua', 'Caderno', 'Mochila', 'Estojo', 'Cola', 'Tesoura', 'Lápis de cor', 'Compasso', 'Calculadora', 'Livro', 'Marca-texto'],
  },
  {
    group: 'dia',
    title: 'Móveis da casa',
    items: ['Sofá', 'Cama', 'Mesa', 'Cadeira', 'Guarda-roupa', 'Estante', 'Rack', 'Criado-mudo', 'Poltrona', 'Banqueta', 'Cômoda', 'Beliche', 'Armário', 'Escrivaninha'],
  },
  {
    group: 'dia',
    title: 'Profissões',
    items: ['Médico', 'Professor', 'Bombeiro', 'Policial', 'Cozinheiro', 'Motorista', 'Advogado', 'Dentista', 'Pedreiro', 'Enfermeiro', 'Piloto', 'Cabeleireiro', 'Padeiro', 'Mecânico', 'Veterinário', 'Garçom'],
  },
  { group: 'dia', title: 'Meios de transporte', items: ['Carro', 'Moto', 'Bicicleta', 'Ônibus', 'Trem', 'Metrô', 'Avião', 'Helicóptero', 'Navio', 'Barco', 'Caminhão', 'Patinete', 'Táxi', 'Skate', 'Balão', 'Foguete'] },
  { group: 'dia', title: 'Eletrodomésticos', items: ['Geladeira', 'Fogão', 'Micro-ondas', 'Máquina de lavar', 'Liquidificador', 'Ventilador', 'Ar-condicionado', 'Televisão', 'Ferro de passar', 'Aspirador', 'Batedeira', 'Torradeira', 'Air fryer', 'Cafeteira'] },
  { group: 'dia', title: 'Coisas que têm na bolsa', items: ['Carteira', 'Celular', 'Chave', 'Batom', 'Óculos', 'Fone de ouvido', 'Carregador', 'Guarda-chuva', 'Lenço', 'Bala', 'Álcool em gel', 'Caneta', 'Documento', 'Perfume'] },
  { group: 'dia', title: 'Sentimentos', items: ['Alegria', 'Tristeza', 'Raiva', 'Medo', 'Saudade', 'Ciúme', 'Vergonha', 'Amor', 'Preguiça', 'Ansiedade', 'Orgulho', 'Nojo', 'Surpresa', 'Tédio'] },
  { group: 'dia', title: 'Parentes', items: ['Mãe', 'Pai', 'Avó', 'Avô', 'Tia', 'Tio', 'Prima', 'Primo', 'Irmã', 'Irmão', 'Sogra', 'Cunhado', 'Madrinha', 'Padrinho', 'Sobrinho', 'Neta'] },
  { group: 'dia', title: 'Tempo e clima', items: ['Sol', 'Chuva', 'Vento', 'Nuvem', 'Neblina', 'Granizo', 'Neve', 'Trovão', 'Relâmpago', 'Garoa', 'Tempestade', 'Arco-íris', 'Frio', 'Calor'] },

  // ---------- Comidas ----------
  { group: 'comida', title: 'Frutas', items: ['Banana', 'Maçã', 'Laranja', 'Uva', 'Morango', 'Abacaxi', 'Melancia', 'Manga', 'Mamão', 'Pera', 'Kiwi', 'Limão', 'Goiaba', 'Maracujá', 'Acerola', 'Caju'] },
  { group: 'comida', title: 'Legumes e verduras', items: ['Alface', 'Tomate', 'Cenoura', 'Batata', 'Cebola', 'Alho', 'Pepino', 'Abobrinha', 'Beterraba', 'Couve', 'Brócolis', 'Chuchu', 'Berinjela', 'Pimentão', 'Mandioca', 'Quiabo'] },
  { group: 'comida', title: 'Doces', items: ['Brigadeiro', 'Beijinho', 'Pudim', 'Pé de moleque', 'Paçoca', 'Cocada', 'Quindim', 'Sorvete', 'Chocolate', 'Bolo', 'Mousse', 'Pavê', 'Goiabada', 'Doce de leite', 'Churros', 'Bombom'] },
  { group: 'comida', title: 'Salgadinhos de festa', items: ['Coxinha', 'Kibe', 'Esfiha', 'Risole', 'Bolinha de queijo', 'Enroladinho de salsicha', 'Pastel', 'Empada', 'Pão de queijo', 'Croquete', 'Mini pizza', 'Canudinho', 'Cachorro-quente', 'Mini hambúrguer'] },
  { group: 'comida', title: 'Bebidas', items: ['Água', 'Café', 'Leite', 'Suco', 'Refrigerante', 'Chá', 'Água de coco', 'Chocolate quente', 'Vitamina', 'Limonada', 'Caldo de cana', 'Mate', 'Chimarrão', 'Milk-shake'] },
  { group: 'comida', title: 'Sabores de pizza', items: ['Mussarela', 'Calabresa', 'Portuguesa', 'Frango com catupiry', 'Margherita', 'Quatro queijos', 'Atum', 'Napolitana', 'Pepperoni', 'Chocolate', 'Banana com canela', 'Baiana', 'Palmito', 'Bacon'] },
  { group: 'comida', title: 'Comidas típicas do Brasil', items: ['Feijoada', 'Acarajé', 'Moqueca', 'Pão de queijo', 'Tapioca', 'Coxinha', 'Brigadeiro', 'Churrasco', 'Baião de dois', 'Tacacá', 'Arroz carreteiro', 'Vatapá', 'Pamonha', 'Cuscuz', 'Feijão tropeiro', 'Escondidinho'] },
  { group: 'comida', title: 'Comidas de festa junina', items: ['Pipoca', 'Pamonha', 'Curau', 'Canjica', 'Quentão', 'Pé de moleque', 'Paçoca', 'Milho cozido', 'Maçã do amor', 'Arroz doce', 'Cocada', 'Bolo de milho', 'Cachorro-quente', 'Pinhão'] },
  { group: 'comida', title: 'Sabores de sorvete', items: ['Chocolate', 'Morango', 'Creme', 'Flocos', 'Limão', 'Coco', 'Napolitano', 'Pistache', 'Doce de leite', 'Menta', 'Maracujá', 'Uva', 'Açaí', 'Abacaxi'] },
  { group: 'comida', title: 'Coisas do café da manhã', items: ['Pão', 'Manteiga', 'Café', 'Leite', 'Queijo', 'Presunto', 'Ovo', 'Tapioca', 'Cuscuz', 'Bolo', 'Frutas', 'Iogurte', 'Cereal', 'Geleia', 'Requeijão', 'Torrada'] },
  { group: 'comida', title: 'Temperos', items: ['Sal', 'Pimenta', 'Alho', 'Cebola', 'Orégano', 'Cominho', 'Colorau', 'Salsinha', 'Cebolinha', 'Coentro', 'Manjericão', 'Louro', 'Canela', 'Noz-moscada', 'Açafrão', 'Páprica'] },
  { group: 'comida', title: 'Massas', items: ['Espaguete', 'Lasanha', 'Nhoque', 'Ravióli', 'Talharim', 'Penne', 'Parafuso', 'Capeletti', 'Canelone', 'Miojo', 'Fettuccine', 'Pastel', 'Macarrão de letrinha', 'Rondelli'] },

  // ---------- Lugares ----------
  {
    group: 'lugares',
    title: 'Lugares famosos do mundo',
    items: ['Torre Eiffel', 'Cristo Redentor', 'Estátua da Liberdade', 'Coliseu', 'Pirâmides do Egito', 'Big Ben', 'Muralha da China', 'Machu Picchu', 'Taj Mahal', 'Torre de Pisa', 'Times Square', 'Pão de Açúcar', 'Ópera de Sydney', 'Disneylândia', 'Las Vegas', 'Cataratas do Iguaçu'],
  },
  {
    group: 'lugares',
    title: 'Países',
    items: ['Brasil', 'Argentina', 'Portugal', 'Estados Unidos', 'Japão', 'China', 'Itália', 'França', 'Alemanha', 'México', 'Espanha', 'Canadá', 'Egito', 'Índia', 'Austrália', 'Chile'],
  },
  {
    group: 'lugares',
    title: 'Estados do Brasil',
    items: ['São Paulo', 'Rio de Janeiro', 'Minas Gerais', 'Bahia', 'Pernambuco', 'Ceará', 'Paraná', 'Santa Catarina', 'Rio Grande do Sul', 'Goiás', 'Amazonas', 'Pará', 'Maranhão', 'Espírito Santo', 'Mato Grosso', 'Paraíba'],
  },
  {
    group: 'lugares',
    title: 'Capitais do Brasil',
    items: ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Salvador', 'Recife', 'Fortaleza', 'Brasília', 'Curitiba', 'Porto Alegre', 'Florianópolis', 'Manaus', 'Belém', 'Goiânia', 'Natal', 'Maceió', 'João Pessoa'],
  },
  { group: 'lugares', title: 'Cômodos da casa', items: ['Sala', 'Cozinha', 'Quarto', 'Banheiro', 'Lavanderia', 'Varanda', 'Garagem', 'Quintal', 'Escritório', 'Corredor', 'Sótão', 'Despensa', 'Área de churrasco', 'Closet'] },
  { group: 'lugares', title: 'Lugares da cidade', items: ['Escola', 'Hospital', 'Padaria', 'Farmácia', 'Mercado', 'Igreja', 'Praça', 'Banco', 'Shopping', 'Cinema', 'Academia', 'Posto de gasolina', 'Rodoviária', 'Delegacia', 'Correios', 'Feira'] },
  { group: 'lugares', title: 'Lugares para passear', items: ['Praia', 'Shopping', 'Cinema', 'Parque', 'Zoológico', 'Museu', 'Cachoeira', 'Sítio', 'Restaurante', 'Parque de diversões', 'Show', 'Estádio', 'Clube', 'Aquário', 'Boliche', 'Trilha'] },
  { group: 'lugares', title: 'Cidades do mundo', items: ['Paris', 'Londres', 'Nova York', 'Roma', 'Tóquio', 'Lisboa', 'Buenos Aires', 'Madri', 'Dubai', 'Cancún', 'Orlando', 'Miami', 'Barcelona', 'Veneza', 'Santiago', 'Berlim'] },
  { group: 'lugares', title: 'Praias e destinos do Brasil', items: ['Copacabana', 'Fernando de Noronha', 'Porto de Galinhas', 'Jericoacoara', 'Búzios', 'Florianópolis', 'Maragogi', 'Porto Seguro', 'Bonito', 'Gramado', 'Foz do Iguaçu', 'Lençóis Maranhenses', 'Arraial do Cabo', 'Ilhabela', 'Chapada Diamantina', 'Pantanal'] },

  // ---------- Bichos e natureza ----------
  { group: 'natureza', title: 'Animais da fazenda', items: ['Vaca', 'Boi', 'Cavalo', 'Porco', 'Galinha', 'Galo', 'Pato', 'Ovelha', 'Cabra', 'Burro', 'Peru', 'Coelho', 'Ganso', 'Bode'] },
  { group: 'natureza', title: 'Animais da selva', items: ['Leão', 'Tigre', 'Elefante', 'Girafa', 'Zebra', 'Macaco', 'Hipopótamo', 'Rinoceronte', 'Gorila', 'Onça', 'Jacaré', 'Cobra', 'Leopardo', 'Hiena', 'Crocodilo', 'Chimpanzé'] },
  { group: 'natureza', title: 'Animais do mar', items: ['Tubarão', 'Baleia', 'Golfinho', 'Polvo', 'Lula', 'Estrela-do-mar', 'Cavalo-marinho', 'Caranguejo', 'Água-viva', 'Tartaruga', 'Foca', 'Arraia', 'Camarão', 'Lagosta', 'Peixe-palhaço', 'Orca'] },
  { group: 'natureza', title: 'Aves', items: ['Papagaio', 'Arara', 'Tucano', 'Pinguim', 'Coruja', 'Águia', 'Pombo', 'Beija-flor', 'Galinha', 'Pato', 'Avestruz', 'Pavão', 'Canário', 'Gaivota', 'Urubu', 'Flamingo'] },
  { group: 'natureza', title: 'Insetos e bichinhos', items: ['Formiga', 'Abelha', 'Borboleta', 'Mosquito', 'Mosca', 'Barata', 'Joaninha', 'Grilo', 'Gafanhoto', 'Libélula', 'Vaga-lume', 'Aranha', 'Minhoca', 'Lesma', 'Escorpião', 'Cupim'] },
  { group: 'natureza', title: 'Animais de estimação', items: ['Cachorro', 'Gato', 'Peixinho', 'Hamster', 'Coelho', 'Papagaio', 'Calopsita', 'Tartaruga', 'Porquinho-da-índia', 'Canário', 'Iguana', 'Furão', 'Periquito', 'Cobra'] },
  { group: 'natureza', title: 'Animais do Brasil', items: ['Onça-pintada', 'Capivara', 'Tucano', 'Arara-azul', 'Mico-leão-dourado', 'Bicho-preguiça', 'Tamanduá', 'Tatu', 'Jacaré', 'Boto-cor-de-rosa', 'Lobo-guará', 'Anta', 'Sucuri', 'Quati', 'Ema', 'Sagui'] },
  { group: 'natureza', title: 'Flores', items: ['Rosa', 'Margarida', 'Girassol', 'Orquídea', 'Tulipa', 'Lírio', 'Violeta', 'Cravo', 'Hortênsia', 'Lavanda', 'Ipê', 'Azaleia', 'Jasmim', 'Copo-de-leite', 'Begônia', 'Bromélia'] },
  { group: 'natureza', title: 'Planetas e espaço', items: ['Sol', 'Lua', 'Mercúrio', 'Vênus', 'Terra', 'Marte', 'Júpiter', 'Saturno', 'Urano', 'Netuno', 'Cometa', 'Estrela', 'Meteoro', 'Galáxia', 'Buraco negro', 'Astronauta'] },
  { group: 'natureza', title: 'Árvores e plantas', items: ['Coqueiro', 'Mangueira', 'Bananeira', 'Pinheiro', 'Ipê', 'Jabuticabeira', 'Cacto', 'Samambaia', 'Bambu', 'Babosa', 'Palmeira', 'Eucalipto', 'Goiabeira', 'Laranjeira', 'Pau-brasil', 'Araucária'] },

  // ---------- Diversão e cultura ----------
  { group: 'diversao', title: 'Esportes', items: ['Futebol', 'Vôlei', 'Basquete', 'Tênis', 'Natação', 'Corrida', 'Ciclismo', 'Surfe', 'Skate', 'Boxe', 'Judô', 'Handebol', 'Ginástica', 'Golfe', 'Capoeira', 'Futsal'] },
  { group: 'diversao', title: 'Instrumentos musicais', items: ['Violão', 'Guitarra', 'Piano', 'Bateria', 'Flauta', 'Violino', 'Saxofone', 'Pandeiro', 'Cavaquinho', 'Sanfona', 'Trompete', 'Baixo', 'Teclado', 'Gaita', 'Tamborim', 'Harpa'] },
  { group: 'diversao', title: 'Estilos de música', items: ['Samba', 'Pagode', 'Sertanejo', 'Funk', 'Rock', 'Forró', 'MPB', 'Axé', 'Pop', 'Rap', 'Gospel', 'Eletrônica', 'Reggae', 'Bossa nova', 'Frevo', 'Piseiro'] },
  { group: 'diversao', title: 'Brincadeiras de criança', items: ['Esconde-esconde', 'Pega-pega', 'Amarelinha', 'Pular corda', 'Pipa', 'Bolinha de gude', 'Pião', 'Queimada', 'Cabo de guerra', 'Estátua', 'Telefone sem fio', 'Ciranda', 'Elástico', 'Passa anel', 'Batata quente', 'Polícia e ladrão'] },
  { group: 'diversao', title: 'Jogos de mesa', items: ['Xadrez', 'Dama', 'Dominó', 'Baralho', 'Bingo', 'Truco', 'Uno', 'Jogo da velha', 'Ludo', 'Quebra-cabeça', 'Pôquer', 'Buraco', 'Jogo da memória', 'Gamão'] },
  { group: 'diversao', title: 'Signos do zodíaco', items: ['Áries', 'Touro', 'Gêmeos', 'Câncer', 'Leão', 'Virgem', 'Libra', 'Escorpião', 'Sagitário', 'Capricórnio', 'Aquário', 'Peixes'] },
  { group: 'diversao', title: 'Personagens de contos de fada', items: ['Cinderela', 'Branca de Neve', 'Chapeuzinho Vermelho', 'Lobo Mau', 'Rapunzel', 'Bela Adormecida', 'Pinóquio', 'Peter Pan', 'João e Maria', 'Os Três Porquinhos', 'Aladim', 'Patinho Feio', 'Gato de Botas', 'Pequena Sereia'] },
  { group: 'diversao', title: 'Folclore brasileiro', items: ['Saci-Pererê', 'Curupira', 'Mula sem cabeça', 'Boitatá', 'Iara', 'Boto cor-de-rosa', 'Lobisomem', 'Cuca', 'Negrinho do Pastoreio', 'Caipora', 'Boi-bumbá', 'Mapinguari', 'Vitória-régia', 'Bicho-papão'] },
  { group: 'diversao', title: 'Datas comemorativas', items: ['Natal', 'Ano-Novo', 'Carnaval', 'Páscoa', 'Dia das Mães', 'Dia dos Pais', 'Dia das Crianças', 'Dia dos Namorados', 'Festa Junina', 'Halloween', 'Aniversário', 'Dia do Professor', 'Independência', 'Finados'] },
  { group: 'diversao', title: 'Coisas de praia', items: ['Guarda-sol', 'Protetor solar', 'Canga', 'Toalha', 'Óculos de sol', 'Chinelo', 'Biquíni', 'Sunga', 'Cadeira de praia', 'Isopor', 'Prancha', 'Baldinho', 'Castelo de areia', 'Picolé', 'Milho', 'Frescobol'] },
  { group: 'diversao', title: 'Coisas de festa de aniversário', items: ['Bolo', 'Vela', 'Balão', 'Brigadeiro', 'Presente', 'Parabéns', 'Refrigerante', 'Salgadinho', 'Chapéu de festa', 'Língua de sogra', 'Confete', 'Lembrancinha', 'Convite', 'Música', 'Pula-pula', 'Piñata'] },
  { group: 'diversao', title: 'Super-poderes', items: ['Voar', 'Ficar invisível', 'Super força', 'Ler mentes', 'Teletransporte', 'Super velocidade', 'Viajar no tempo', 'Respirar debaixo da água', 'Soltar fogo', 'Controlar o clima', 'Visão de raio X', 'Mudar de forma', 'Parar o tempo', 'Falar com animais'] },
  { group: 'diversao', title: 'Personagens de terror', items: ['Fantasma', 'Vampiro', 'Zumbi', 'Lobisomem', 'Múmia', 'Bruxa', 'Frankenstein', 'Esqueleto', 'Palhaço assustador', 'Boneca assombrada', 'Demônio', 'Monstro do armário', 'Caveira', 'Alienígena'] },
  { group: 'diversao', title: 'Coisas do Carnaval', items: ['Confete', 'Serpentina', 'Fantasia', 'Bloco', 'Trio elétrico', 'Escola de samba', 'Marchinha', 'Abadá', 'Máscara', 'Purpurina', 'Frevo', 'Samba-enredo', 'Bateria', 'Porta-bandeira', 'Rei Momo', 'Sambódromo'] },
  { group: 'diversao', title: 'Redes e aplicativos', items: ['WhatsApp', 'Instagram', 'YouTube', 'TikTok', 'Facebook', 'X (Twitter)', 'Netflix', 'Spotify', 'Google Maps', 'Uber', 'iFood', 'Telegram', 'Pinterest', 'Waze', 'Kwai', 'LinkedIn'] },
]
