import * as React from "react";

import * as Components from "../../../components/index";

import CompetitionModal from "./CompetitionModal";
import CompetitionsTable from "./CompetitionsTable";
import AddCompetitionButton from "./AddCompetitionButton";
import { CompetitionsContext } from "../context/competitionsContext";

const CompetitionsContainer: React.FC = () => {
    const { search, onSearchChange } = React.useContext(CompetitionsContext);
  return (
    <div className="rat-options">
        <AddCompetitionButton />
        <Components.Search
          searchValue={search}
          onChange={onSearchChange}
        />
        <CompetitionsTable />
        <CompetitionModal  />
    </div>
  );
};

export default CompetitionsContainer;
