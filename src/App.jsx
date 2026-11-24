import { useCallback, useEffect, useRef, useState } from 'react'
import Background from './components/Background.jsx'
import ConfirmModal from './components/Modal.jsx'
import Home from './screens/Home.jsx'
import GameIntro from './screens/GameIntro.jsx'
import Players from './screens/Players.jsx'
import { GAME_BY_ID } from './games/index.js'
import { useStoredState } from './lib/storage.js'

// Fluxo: início → jogo → jogadores → configuração → partida → resultado
export default function App() {
  const [stack, setStack] = useState(['home'])
  const [gameId, setGameId] = useState(null)
  const [players, setPlayers] = useStoredState('players', [])
  const [configs, setConfigs] = useStoredState('configs', {})
  const [memory, setMemory] = useStoredState('memory', {})
  const [round, setRound] = useState(null)
  const [result, setResult] = useState(null)
  const [confirmExit, setConfirmExit] = useState(false)

  const screen = stack[stack.length - 1]
  const game = gameId ? GAME_BY_ID[gameId] : null
  const config = game ? { ...game.defaultConfig, ...configs[game.id] } : null

  const go = (name) => setStack((s) => [...s, name])
  const replace = (name) => setStack((s) => [...s.slice(0, -1), name])
  const resetTo = (names) => setStack(names)

  const back = useCallback(() => {
    if (screen === 'play') {
      setConfirmExit(true)
      return
    }
    setStack((s) => (s.length > 1 ? s.slice(0, -1) : s))
  }, [screen])

  // Botão "voltar" do Android: mantém uma entrada extra no histórico do navegador.
  const backRef = useRef(back)
  backRef.current = back
  const atHome = stack.length === 1
  useEffect(() => {
    if (!atHome && !history.state?.balacobaco) {
      history.pushState({ balacobaco: true }, '')
    }
  }, [atHome])
  useEffect(() => {
    const onPop = () => {
      const current = stackRef.current
      const stays = current[current.length - 1] === 'play' || current.length > 2
      backRef.current()
      if (stays) history.pushState({ balacobaco: true }, '')
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])
  const stackRef = useRef(stack)
  stackRef.current = stack

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [screen])

  const startRound = (cfg = config) => {
    const used = memory[game.id] ?? []
    const r = game.createRound(players, cfg, used)
    const nextUsed = r.resetMemory ? [r.word] : [...used, r.word].slice(-200)
    setMemory({ ...memory, [game.id]: nextUsed })
    setRound(r)
    setResult(null)
  }

  let content = null
  if (screen === 'home') {
    content = (
      <Home
        onPick={(id) => {
          setGameId(id)
          go('intro')
        }}
      />
    )
  } else if (screen === 'intro') {
    content = <GameIntro game={game} onBack={back} onPlay={() => go('players')} />
  } else if (screen === 'players') {
    content = (
      <Players
        players={players}
        setPlayers={setPlayers}
        min={game.minPlayers}
        max={game.maxPlayers}
        onBack={back}
        onNext={() => go('setup')}
      />
    )
  } else if (screen === 'setup') {
    const Setup = game.Setup
    content = (
      <Setup
        players={players}
        config={config}
        setConfig={(c) => setConfigs({ ...configs, [game.id]: c })}
        onBack={back}
        onStart={(cfg) => {
          setConfigs({ ...configs, [game.id]: cfg })
          startRound(cfg)
          go('play')
        }}
      />
    )
  } else if (screen === 'play') {
    const Play = game.Play
    content = (
      <Play
        key={round?.word + round?.starterId}
        round={round}
        players={players}
        config={config}
        onExit={back}
        onFinish={(res) => {
          setResult(res)
          replace('result')
        }}
      />
    )
  } else if (screen === 'result') {
    const Result = game.Result
    content = (
      <Result
        round={round}
        result={result}
        players={players}
        onAgain={() => {
          startRound()
          replace('play')
        }}
        onSetup={() => resetTo(['home', 'intro', 'players', 'setup'])}
        onPlayers={() => resetTo(['home', 'intro', 'players'])}
        onHome={() => resetTo(['home'])}
      />
    )
  }

  return (
    <>
      <Background tone={screen === 'play' || screen === 'result' ? 'night' : 'party'} />
      <div className="app" key={screen}>
        {content}
      </div>
      <ConfirmModal
        open={confirmExit}
        title="Sair da partida?"
        message="A rodada atual vai ser perdida."
        confirmLabel="Sair"
        cancelLabel="Voltar ao jogo"
        danger
        onCancel={() => setConfirmExit(false)}
        onConfirm={() => {
          setConfirmExit(false)
          setStack((s) => s.slice(0, -1))
        }}
      />
    </>
  )
}
