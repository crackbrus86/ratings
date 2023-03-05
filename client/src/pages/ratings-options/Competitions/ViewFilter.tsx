import * as React from "react";
import * as classnames from "classnames";

import { CompetitionView } from "../models/competition.models";
import { CompetitionsContext } from "../context/competitionsContext";

const ViewFilter: React.FC = () => {
  const { view, setView } = React.useContext(CompetitionsContext);
  const isActive = view == CompetitionView.Active;
  const isAll = view == CompetitionView.All;

  return (
    <div className="competition-view">
      <button
        className={classnames({ "is-selected": isActive })}
        onClick={() => setView(CompetitionView.Active)}
      >
        Активні
      </button>
      <button
        className={classnames({ "is-selected": isAll })}
        onClick={() => setView(CompetitionView.All)}
      >
        Всі
      </button>
    </div>
  );
};

export default ViewFilter;
