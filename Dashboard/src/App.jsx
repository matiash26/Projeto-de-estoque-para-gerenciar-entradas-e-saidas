import Routes from "./components/Routes/Routes"
import AuthProvider from "./Contexts/AuthContext"
import "./App.css"
function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )

}

export default App
