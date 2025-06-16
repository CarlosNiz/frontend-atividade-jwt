import Formulario from "./components/formulario/Formulario";

function App() {
  return (
    <>
      <main className='bg-gray-800 h-screen w-screen flex items-center justify-center'>
        <div className="bg-slate-700 p-8 rounded-lg shadow-lg border border-white w-full max-w-md">
          <Formulario />
        </div> 
      </main>
    </>
  )
}

export default App;
