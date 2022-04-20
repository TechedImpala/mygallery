import Header from "./components/header";
import Layout from "./components/layout";
import AppProvider from "./context/AppContext";

function App() {
  return (
    <div className="App">
      <AppProvider>
        <Header />
        <Layout />
      </AppProvider>
    </div>
  );
}

export default App;
