// Temas do Termômetro. Cada tema tem uma escala: o que vale 1 (min) e o que vale 100 (max).
// Para adicionar: copie uma linha e troque o texto. Grupos servem para o filtro da configuração.
export const THEME_GROUPS = [
  { id: 'dia', name: 'Dia a dia', color: '#60a5fa' },
  { id: 'comida', name: 'Comida', color: '#fb923c' },
  { id: 'emocao', name: 'Emoções', color: '#f472b6' },
  { id: 'absurdo', name: 'Absurdos', color: '#a78bfa' },
  { id: 'brasil', name: 'Brasil', color: '#34d399' },
]

export const THEMES = [
  // Dia a dia
  { group: 'dia', text: 'Coisas que custam caro', min: 'Baratinho', max: 'Custa um rim' },
  { group: 'dia', text: 'Coisas para levar numa viagem', min: 'Inútil', max: 'Indispensável' },
  { group: 'dia', text: 'Barulhos', min: 'Silêncio total', max: 'Estoura o ouvido' },
  { group: 'dia', text: 'Coisas pesadas', min: 'Uma pena', max: 'Um caminhão' },
  { group: 'dia', text: 'Profissões', min: 'Moleza', max: 'Trabalho pesado' },
  { group: 'dia', text: 'Animais', min: 'Fofinho', max: 'Perigoso' },
  { group: 'dia', text: 'Lugares para passar as férias', min: 'Nem de graça', max: 'Sonho de vida' },
  { group: 'dia', text: 'Coisas que demoram', min: 'Num piscar de olhos', max: 'Uma eternidade' },
  { group: 'dia', text: 'Presentes de aniversário', min: 'Decepção', max: 'Perfeito' },
  { group: 'dia', text: 'Tarefas de casa', min: 'Até gosto', max: 'Odeio' },
  { group: 'dia', text: 'Coisas grudentas', min: 'Nada', max: 'Não sai nunca' },
  // Comida
  { group: 'comida', text: 'Comidas', min: 'Horrível', max: 'Delícia' },
  { group: 'comida', text: 'Comidas apimentadas', min: 'Não arde', max: 'Fogo na boca' },
  { group: 'comida', text: 'Comidas para um encontro', min: 'Péssima ideia', max: 'Perfeita' },
  { group: 'comida', text: 'Bebidas', min: 'Sem graça', max: 'A melhor do mundo' },
  { group: 'comida', text: 'Comidas que dão sono', min: 'Leve', max: 'Coma garantido' },
  { group: 'comida', text: 'Doces', min: 'Enjoativo', max: 'Viciante' },
  { group: 'comida', text: 'Comidas de festa', min: 'Ninguém come', max: 'Some em 1 minuto' },
  // Emoções
  { group: 'emocao', text: 'Coisas que dão medo', min: 'Nem um pouco', max: 'Pesadelo' },
  { group: 'emocao', text: 'Situações constrangedoras', min: 'Tranquilo', max: 'Quero sumir' },
  { group: 'emocao', text: 'Coisas que deixam feliz', min: 'Tanto faz', max: 'Felicidade total' },
  { group: 'emocao', text: 'Coisas que irritam', min: 'Nem ligo', max: 'Fico louco' },
  { group: 'emocao', text: 'Desculpas para faltar', min: 'Ninguém acredita', max: 'Convincente' },
  { group: 'emocao', text: 'Coisas românticas', min: 'Brochante', max: 'Apaixonante' },
  { group: 'emocao', text: 'Coisas nojentas', min: 'De boa', max: 'Ânsia de vômito' },
  { group: 'emocao', text: 'Momentos de tensão', min: 'Relax', max: 'Coração na boca' },
  // Absurdos
  { group: 'absurdo', text: 'Superpoderes', min: 'Inútil', max: 'Poderoso demais' },
  { group: 'absurdo', text: 'Coisas para sobreviver num apocalipse zumbi', min: 'Não ajuda', max: 'Salva a vida' },
  { group: 'absurdo', text: 'Animais para ter como pet', min: 'Péssima ideia', max: 'Melhor amigo' },
  { group: 'absurdo', text: 'Armas numa guerra de travesseiros', min: 'Fraquinha', max: 'Arma letal' },
  { group: 'absurdo', text: 'Coisas para levar para uma ilha deserta', min: 'Inútil', max: 'Essencial' },
  { group: 'absurdo', text: 'Nomes para um cachorro', min: 'Ridículo', max: 'Perfeito' },
  { group: 'absurdo', text: 'Lugares para se esconder', min: 'Acham na hora', max: 'Ninguém acha' },
  { group: 'absurdo', text: 'Coisas que um alienígena acharia estranho', min: 'Normal', max: 'Bizarro' },
  // Brasil
  { group: 'brasil', text: 'Coisas de churrasco', min: 'Dispensável', max: 'Obrigatório' },
  { group: 'brasil', text: 'Músicas para animar a festa', min: 'Esvazia a pista', max: 'Todo mundo dança' },
  { group: 'brasil', text: 'Lugares do Brasil', min: 'Não iria', max: 'Iria amanhã' },
  { group: 'brasil', text: 'Coisas de festa junina', min: 'Esquecível', max: 'A alma da festa' },
  { group: 'brasil', text: 'Situações no ônibus lotado', min: 'Aceitável', max: 'Caos total' },
  { group: 'brasil', text: 'Coisas que a mãe fala', min: 'Fofo', max: 'Hora de correr' },
  { group: 'brasil', text: 'Coisas de praia', min: 'Dispensável', max: 'Não vivo sem' },
]
