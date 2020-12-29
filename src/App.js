import React, { useState } from "react";
import "./App.css";
import AgricolaPage from "./Components/AgricolaPage";
import AgricolaScoreModal from "./Components/AgricolaScoreModal";
import TerraformingMarsPage from "./Components/TerraformingMarsPage";
import WingspanPage from "./Components/WingspanPage";

const App = () => {
  const [view, setView] = useState("Agricola");
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="App">
      <nav className="navbar">
        <div>
          <button onClick={() => setView("Agricola")}>Agricola</button>
          <button onClick={() => setView("TerraformingMars")}>
            Terraforming Mars
          </button>
          <button onClick={() => setView("Wingspan")}>Wingspan</button>
        </div>
        <button onClick={() => setShowModal(true)}>Agricola Scoresheet</button>
      </nav>
      {view === "Agricola" && <AgricolaPage></AgricolaPage>}
      {view === "TerraformingMars" &&
        <TerraformingMarsPage></TerraformingMarsPage>
      }
      {view === "Wingspan" && <WingspanPage></WingspanPage>}
      {showModal && (
        <AgricolaScoreModal
          hideModal={() => setShowModal(false)}
        ></AgricolaScoreModal>
      )}
    </div>
  );
};

export default App;
