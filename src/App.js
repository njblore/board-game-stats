import React, { useState } from "react";
import "./App.css";
import AgricolaPage from "./Components/AgricolaPage";
import TerraformingMarsPage from "./Components/TerraformingMarsPage";

const App = () => {
  const [view, setView] = useState("Agricola");
  return (
    <div className="App">
      <nav>
        <button onClick={() => setView("Agricola")}>Agricola</button>
        <button onClick={() => setView("TerraformingMars")}>
          Terraforming Mars
        </button>
      </nav>
      {view === "Agricola" && <AgricolaPage></AgricolaPage>}
      {view === "TerraformingMars" && (
        <TerraformingMarsPage></TerraformingMarsPage>
      )}
    </div>
  );
};

export default App;
