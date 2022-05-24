import { Router } from "solid-app-router";
import Hero from "./components/Hero";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <Nav />
      <Hero />
    </Router>
  );
}

export default App;
