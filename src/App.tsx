import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-100">
      <div className="flex gap-6">
        <a href="https://vite.dev" target="_blank">
          <img
            src={viteLogo}
            className="h-20 hover:scale-110 transition"
            alt="Vite logo"
          />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="h-20 hover:scale-110 transition"
            alt="React logo"
          />
        </a>
      </div>

      <h1 className="text-4xl font-bold text-red-500">
        Tailwind 적용 테스트
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          count is {count}
        </button>

        <p className="mt-4 text-gray-600">
          Edit <code className="font-mono text-sm bg-gray-100 px-1 rounded">src/App.tsx</code> and save
        </p>
      </div>

      <p className="text-sm text-gray-500">
        Vite + React + Tailwind
      </p>
    </div>
  )
}

export default App
