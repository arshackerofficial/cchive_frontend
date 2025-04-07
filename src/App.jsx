import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AppRoutes from "./router/AppRoutes";


const App = () => {
  return (
    <div>
    <div className="hidden">React Speedrun</div>
      <Navbar />
      <AppRoutes />
      <Footer />
    </div>
  )
}

export default App