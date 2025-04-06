import AppRoutes from "./router/AppRoutes";


const App = () => {
  return (
    <div>
      <div className="text-3xl font-bold pt-10 flex justify-center">
        React Speedrun
      </div>
      <AppRoutes />
    </div>
  )
}

export default App