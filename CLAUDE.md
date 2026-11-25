# CLAUDE.md — Turminha do Balacobaco (Party Games)

Leia este arquivo antes de mexer no projeto. Ele guarda as regras e decisões combinadas com o Valdir.
**Sempre que uma decisão nova for tomada, atualize este arquivo no mesmo PR.**

## O que é
App de jogos de grupo para reuniões presenciais: um celular só, passado de mão em mão.
Uso principal em celular Android; desenvolvido e testado também no computador.

## Sobre o dono do projeto
- Valdir escreve em português e não programa: Claude faz código, arte e explicações.
- Explicar resultados em linguagem simples, sem jargão.

## Regras do produto
- Interface 100% em português do Brasil.
- Mobile first, layout responsivo, design moderno, animações suaves, botões com feedback (visual + vibração).
- Funciona offline. Sem login, sem cadastro, sem servidor, sem banco de dados.
- Dados (jogadores, configurações, palavras já usadas) ficam no `localStorage` do aparelho.
- Arte toda feita em CSS/SVG/animações. **Sem imagens geradas por IA e sem imagens de terceiros.**
- Nada de nomes, marcas, arte ou textos de jogos comerciais. Mecânicas parecidas podem, mas com nome e temas próprios
  (ex.: o jogo "estilo ITO" precisa de nome e temas originais).

## Tecnologias (decidido)
- React 19 + Vite + JavaScript (sem TypeScript) + CSS puro (sem framework de CSS).
- PWA com `vite-plugin-pwa` (instala na tela inicial, funciona sem internet).
- Fontes embutidas via Fontsource (Nunito e Baloo 2, só subset latino) para funcionar offline.
- `base: './'` no Vite: caminhos relativos, funciona no GitHub Pages e no Capacitor.
- Futuro: gerar APK Android com Capacitor (ainda não instalado).
- Sem licença no repositório (decisão do Valdir).

## Estrutura
```
src/
  App.jsx              navegação entre telas + botão voltar do Android
  components/          peças reutilizáveis (Button, Screen, Avatar, Characters, CharacterPicker, Chip, Toggle, Stepper, Modal, Icon, Background, SoundToggle, Keypad)
  screens/             telas comuns a todos os jogos (Home, GameIntro, Players)
  games/index.js       registro de jogos (lista GAMES e COMING_SOON)
  games/impostor/      jogo Impostor (logic.js, words.js, Setup, Play, Result, Art)
  games/termometro/    jogo Termômetro (logic.js, themes.js, Setup, Play, Result, Art)
  games/namosca/       jogo Na Mosca (logic.js, questions.js, Setup, Play, Result, Art)
  games/quemmentiu/    jogo Quem Mentiu? (logic.js, pairs.js, Setup, Play, Result, Art)
  lib/                 utilidades (storage, random, players, feedback, sound)
  styles/              global.css (tema em variáveis CSS no :root) e fonts.css
public/                ícones do app (SVG + PNG gerados a partir do SVG)
```

Fluxo de telas: Início → Apresentação do jogo → Jogadores → Configuração → Partida → Resultado.
Jogadores são compartilhados entre todos os jogos.

## Como adicionar um jogo novo
1. Criar `src/games/<id>/index.js` exportando: `id, name, tagline, gradient, minPlayers, maxPlayers, duration,
   howToPlay[], defaultConfig, createRound(players, config, usedWords), Setup, Play, Result`.
2. Registrar em `src/games/index.js` (e tirar o card "Em breve" correspondente).
3. Arte do card/apresentação: adicionar no objeto `ART` de `screens/Home.jsx` e `screens/GameIntro.jsx`.

## Jogo 1: Impostor (pronto)
- 3 a 20 jogadores. Impostores: 1 até `floor((n-1)/2)`.
- 20 categorias com 40 palavras cada (800 no total) em `words.js`. Palavras não se repetem até acabar o conjunto.
- Opções: categorias, quantidade de impostores, tempo de conversa (sem/1/2/3/5 min), dica de categoria para o impostor.
- Rodada: passar o celular → tocar na carta para ver → esconder e passar → conversa (quem começa é sorteado) → votação → resultado.
- Se pegarem o impostor, ele ainda pode chutar a palavra em voz alta para roubar a vitória (regra da mesa, não do app).
  Por isso a tela de resultado esconde a palavra até alguém tocar em "Mostrar a palavra".

## Jogo 2: Termômetro (pronto, nome provisório)
- Mecânica estilo ITO com nome e temas próprios. Valdir ainda vai escolher o nome final.
- 2 a 20 jogadores. Cada um recebe um número diferente (faixa 1–10, 1–50 ou 1–100; nunca menor que o nº de jogadores).
- 150 temas próprios em `themes.js`, cada um com escala (o que vale 1 e o que vale o máximo), em 8 grupos:
  Dia a dia, Comida, Emoções, Absurdos, Brasil, Trabalho e escola, Amor e amizade, Diversão e lazer.
  Temas não se repetem entre rodadas.
- Rodada: passar o celular → ver número (com o tema e a escala) → dicas em voz alta → ordenar a fila com setas
  (pode trocar o tema) → revelar um por um → resultado.
- Erro = número revelado menor que algum já revelado antes (cooperativo, sem placar).

## Jogo 3: Na Mosca (pronto, nome provisório)
- Valdir chamou de "Palpite Certo"; usamos nome próprio provisório. Ele ainda pode escolher o nome final.
- Pergunta com resposta em número inteiro; cada um digita o palpite escondido num teclado numérico próprio
  (não usa o teclado do celular). Quem chega mais perto ganha 1 ponto (empate: todos); acerto exato vale 2.
- Partida de 5, 10, 15 ou 20 perguntas, com placar e pódio no fim. Placar fica em `session` no `App.jsx`
  (zera ao começar partida nova).
- 246 perguntas em `questions.js`, 9 assuntos. **Só fatos conferidos** e que não mudam (ou com o ano da informação).
  Anos aparecem sem ponto de milhar (2016, não 2.016).

## Jogo 4: Quem Mentiu? (pronto, nome provisório)
- Impostor com perguntas, pedido do Valdir. 3 a 20 jogadores, **sempre 1 impostor**.
- Todos recebem a mesma pergunta; o impostor recebe outra parecida, com o mesmo tipo de resposta.
  **O impostor não sabe que é o impostor**: a tela é igual para todos, só muda o texto da pergunta.
- Tipos de resposta: sim/não (botões grandes), número (teclado próprio `components/Keypad.jsx`),
  escolha entre opções (mesmas opções para as duas perguntas) e texto curto (até 40 letras).
- Rodada: passar o celular → responder escondido → mostra a pergunta da turma e as respostas de todos →
  votação (1 jogador ou "revelar sem votar") → resultado com a pergunta do impostor e a resposta dele.
- 171 pares próprios em `pairs.js` (70 sim/não, 45 número, 28 escolha, 28 texto). Não se repetem.
  No Setup dá para escolher os tipos de pergunta.

## Conteúdo (regra geral)
- Valdir quer MUITAS opções em todos os jogos para não repetir. Sempre que mexer num jogo, considere ampliar o conteúdo.
- O app lembra no aparelho o que já saiu (até 3000 itens por jogo) e só repete quando acabar tudo.

## Sons
- Todos os sons são sintetizados na hora com Web Audio API (`src/lib/sound.js`): sem arquivos, funciona offline.
- Botões, chips, cartas, revelação, tique do cronômetro, alarme, acerto/erro, vitória e derrota.
- Ao ver a carta, som e vibração são **iguais para todos** (pedido do Valdir): nada pode denunciar o impostor.
- Botão de som/mudo na tela inicial; a escolha fica salva no aparelho.
- Pedido do Valdir: ter áudio. Música de fundo ainda não foi feita.

## Personagens (pronto)
- 5 personagens animados descritos pelo Valdir (caricaturas carinhosas da turma), em `components/Characters.jsx`:
  - **Testuda**: menina com a testa enorme (com brilho passeando), cabelo puxado para trás.
  - **Diva**: menina de pele bem escura (tom rico e bonito), black power, argolas douradas, vestido amarelo.
  - **Sargento**: cabelo raspado militar, muito forte, flexionando o braço, bumbum avantajado que balança.
  - **Quadradão**: baixinho, forte, cabeça bem quadrada que balança.
  - **Cavanhaque**: pele morena, cavanhaque e bigode, cabelo grande preso em rabo de cavalo que balança.
- Valdir falou em 6; descreveu 5. Falta o sexto (aguardando descrição). Nomes são provisórios.
- Sem foto de câmera: tudo em SVG + animação CSS (piscar, respirar e um movimento próprio de cada um).
- Escolha opcional no cadastro de jogadores (faixa rolável); tocar no avatar na lista troca o personagem.
  Pode repetir personagem; mostra quem já está usando. Quem não escolhe fica com círculo colorido + iniciais.
- Avatar usa só a cabeça (`headBox`); a tela de passar o celular mostra o corpo inteiro.
- Para criar um personagem novo: copiar um bloco em `CHARACTERS`, ajustar cores, desenho e `headBox`,
  e (se quiser animação própria) adicionar a classe e a animação no fim de `styles/global.css`.

## Desempenho no celular
- Não usar `filter: blur()` nem `backdrop-filter` em elementos grandes ou fixos: deixava o teclado do Android
  abrindo e fechando devagar. Brilhos e manchas de cor são feitos com `radial-gradient`.
- O fundo animado tem altura fixa (`100lvh`) para não ser redesenhado quando o teclado abre.
- Enquanto um campo de texto está em foco, o `body` ganha a classe `typing` e as animações de fundo e dos
  personagens pausam (ver `main.jsx`). Avatares pequenos (lista de jogadores) não são animados.

## Comandos
- `npm install` — instala dependências
- `npm run dev` — roda no computador (o `--host` permite abrir no celular na mesma rede Wi-Fi)
- `npm run build` — gera a versão final em `dist/`
- `npm run preview` — testa a versão final

## Publicação
- GitHub Pages via `.github/workflows/deploy.yml` a cada push na `main`.
- Endereço: https://warock99.github.io/TurminhaDoBalacobaco/
- Precisa ativar uma vez: Settings → Pages → Source: GitHub Actions.
