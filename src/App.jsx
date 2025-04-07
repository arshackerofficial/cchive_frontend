import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AppRoutes from "./router/AppRoutes";


const App = () => {
  return (
    <div>
      <div className="text-3xl font-bold pt-10 flex justify-center">
        React Speedrun 
      </div>
      <Navbar />
      <AppRoutes />
      <Footer />
    </div>
  )
}

export default App