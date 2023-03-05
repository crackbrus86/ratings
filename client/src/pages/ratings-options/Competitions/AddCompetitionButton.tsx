import * as React from "react";
import * as Components from "../../../components";

import { CompetitionsContext } from "../context/competitionsContext";

const AddCompetitionButton: React.FC = () => {
  const { addCompetition } = React.useContext(CompetitionsContext);
  return <Components.Button label="Додати змагання" onClick={addCompetition} />;
};

export default AddCompetitionButton;
