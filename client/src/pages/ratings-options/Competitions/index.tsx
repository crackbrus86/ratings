import * as React from "react";

import CompetitionsContainer from "./CompetitionsContainer";
import { CompetitionProvider } from "../context/competitionsContext";

const Competitions: React.FC = () => {
  return (
    <div className="rat-options">
      <CompetitionProvider>
        <CompetitionsContainer />
      </CompetitionProvider>
    </div>
  );
};

export default Competitions;