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
  games/quemsoueu/     jogo Quem Sou Eu? (logic.js, cards.js, Setup, Play, Result, Art)
  games/euduvido/      jogo Eu Duvido! (logic.js, lists.js, Setup, Play, Result, Art)
  games/bomba/         jogo Bomba Secreta (logic.js, categories.js, Setup, Play, Result, Art)
  lib/                 utilidades (storage, random, players, feedback, sound)
  styles/              global.css (tema em variáveis CSS no :root) e fonts.css
public/                ícones do app (SVG + PNG gerados a partir do SVG)
```

Fluxo de telas: Início → Apresentação do jogo → Jogadores → Configuração → Partida → Resultado.
Jogadores são compartilhados entre todos os jogos. Jogo com `noPlayers: true` (Eu Duvido!) pula a tela de jogadores.

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
- 210 temas próprios em `themes.js`, cada um com escala (o que vale 1 e o que vale o máximo), em 8 grupos:
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
- 261 pares próprios em `pairs.js` (100 sim/não, 70 número, 43 escolha, 48 texto). Não se repetem.
  No Setup dá para escolher os tipos de pergunta.

## Jogo 5: Quem Sou Eu? (pronto)
- Pedido do Valdir: o "quem sou eu" tradicional, **uma pessoa adivinha por vez**. 2 a 20 jogadores.
- Vez em rodízio (`session.turn`), com botão "Trocar quem adivinha". Contagem 3-2-1 para pôr o celular na testa.
- Carta com letras enormes e fundo claro (legível de longe), categoria, cronômetro opcional (sem/1/2/3/5 min),
  contador de perguntas (a turma toca), botões "Desistiu" e "Acertou!". Tela fica acesa (Wake Lock) durante a carta.
- Resultado: o que era, tempo e perguntas, placar de acertos da partida (`session.scores`) e "Próximo: fulano".
- 520 cartas em `cards.js`, 12 categorias (Animais, Profissões, Objetos, Comidas e bebidas, Lugares, Países e
  cidades, Famosos do Brasil, Famosos do mundo, Histórias e folclore, Esportes e brincadeiras,
  Transportes e máquinas, Natureza e corpo). Não se repetem. Famosos: só gente muito conhecida.

## Jogo 6: Eu Duvido! (pronto, nome provisório)
- Pedido do Valdir. **Sem cadastro de jogadores** (`noPlayers: true`): só o mediador usa o celular e não joga.
- Rodada: tema para todos lerem → mediador vê a lista → a turma fala itens; quando alguém grita "eu duvido",
  o mediador confere. Tocar no item marca "Está na lista!"; botão "Não está na lista!" conta chute errado.
  No fim mostra a lista inteira, com o que ninguém falou.
- Regra da mesa: se estava na lista, perde quem duvidou; se não estava, perde quem falou.
- 50 listas em `lists.js`, 5 assuntos, cada uma com fonte e ano. **Só dados conferidos**; a ordem não importa.
  Valdir sugeriu temas como "cursos mais feitos" e "filmes mais vistos": só entra lista com ranking confiável.

## Jogo 7: Bomba Secreta (pronto, nome provisório)
- Pedido do Valdir ("item proibido": quem falar é eliminado). 2 a 20 jogadores, eliminação até sobrar um campeão.
- Cada rodada sorteia uma categoria e monta um tabuleiro com até 12 opções (sorteadas da lista da categoria);
  uma delas é a bomba, que **ninguém sabe** qual é. Na sua vez, a pessoa fala a opção e toca nela.
  Bomba = explosão (som `sound.boom()` sintetizado, vibração, tela tremendo) e a pessoa sai.
- Quem está vivo, de quem é a vez e o número da rodada ficam em `session` (zera ao começar partida nova).
- 65 categorias em `categories.js`, 5 assuntos, com 7 a 16 itens cada. Sem emojis: arte só em SVG/CSS.

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
- 6 personagens animados descritos pelo Valdir (caricaturas carinhosas da turma), em `components/Characters.jsx`:
  - **Testuda**: menina com a testa enorme (com brilho passeando), cabelo puxado para trás.
  - **Diva**: menina de pele bem escura (tom rico e bonito), black power, argolas douradas, vestido amarelo.
  - **Sargento**: cabelo raspado militar, muito forte, flexionando o braço, bumbum avantajado que balança.
  - **Quadradão**: baixinho, forte, cabeça bem quadrada que balança.
  - **Cavanhaque**: homem de pele morena, queixo quadrado, ombros largos, barba por fazer, costeletas, bigode grosso
    e cavanhaque; cabelo trançado rente à cabeça e tranças curtinhas
    atrás que balançam (pedido do Valdir em 26/11: tranças no lugar do cabelo longo, curtas e bem masculino).
  - **Zoeiro**: rapaz branco de cabelo curtinho, mãos levantadas com os dedos abertos para a frente (balançando),
    boca aberta e língua de fora (mexendo).
- Nomes são provisórios.
- Sem foto de câmera: tudo em SVG + animação CSS (piscar, respirar e um movimento próprio de cada um).
- Escolha opcional no cadastro de jogadores (grade com todos visíveis, sem arrastar para o lado); tocar no avatar na lista troca o personagem.
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
- A tela inicial mostra "Versão de dd/mm, hh:mm" (hora de Brasília do build) para conferir se o celular pegou a versão nova.
- O app instalado (GitHub Pages) se atualiza sozinho: `registerType: 'autoUpdate'` no PWA.
- GitHub Pages via `.github/workflows/deploy.yml` a cada push na `main`.
- Endereço: https://warock99.github.io/TurminhaDoBalacobaco/
- Precisa ativar uma vez: Settings → Pages → Source: GitHub Actions.
