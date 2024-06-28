import "./App.scss";
import AuthContextProvider from "./context/AuthContext";
import Routes from "./pages/Routes";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
function App() {
  return (
    <>
      <AuthContextProvider>
        <Routes />
      </AuthContextProvider>
    </>
  );
}

export default App;
