import * as React from "react";

import * as Components from "../../../components/index";
import Confirm from "../../../components/confirm/confirm";
import { ColumnTypes } from "../../../components/table/column";

import { Competition, CompetitionView } from "../models/competition.models";
import { CompetitionsContext } from "../context/competitionsContext";
import ViewFilter from "./ViewFilter";

const CompetitionsTable: React.FC = () => {
  const {
    competitionsToDisplay,
    view,
    loadCompetitions,
    openCompetition,
    deleteCompetition,
    restoreCompetition,
  } = React.useContext(CompetitionsContext);
  const [idToDelete, setIdToDelete] = React.useState<number>(null);
  const [idToRestore, setIdToRestore] = React.useState<number>(null);

  React.useEffect(() => {
    loadCompetitions();
  }, [view]);

  const onDelete = () => {
    deleteCompetition(idToDelete);
    setIdToDelete(null);
  };

  const onRestore = () => {
    restoreCompetition(idToRestore);
    setIdToRestore(null);
  };

  return (
    <>
      <ViewFilter />
      <Components.Table
        items={competitionsToDisplay}
        columns={[
          {
            title: "",
            type: ColumnTypes.Button,
            icon: "edit",
            width: "20px",
            onClick: (item: Competition) => openCompetition(item),
          },
          {
            title: "",
            type: ColumnTypes.Button,
            icon: "trash-alt",
            width: "20px",
            hint: "Видалити",
            disabled: (item: Competition) => !item.isActive,
            onClick: (item: Competition) => setIdToDelete(item.id),
          },
          {
            title: "",
            type: ColumnTypes.Button,
            icon: "trash-restore-alt",
            width: "20px",
            hint: "Відновити",
            disabled: (item: Competition) => item.isActive,
            onClick: (item: Competition) => setIdToRestore(item.id),
          },
          {
            title: "Змагання",
            field: "name",
            width: "300px",
            sortable: true,
          },
          {
            title: "Кодове ім'я",
            field: "dbName",
            width: "250px",
            sortable: true,
          },
          {
            title: "Код",
            field: "shortName",
            width: "80px",
            sortable: true,
          },
          {
            title: "ФПУ",
            field: "ratingUPF",
            width: "50px",
            type: ColumnTypes.Check,
          },
          {
            title: "Активне",
            field: "isActive",
            width: "50px",
            type: ColumnTypes.Check,
          },
          {
            title: "Порядок",
            field: "sortOrder",
            width: "80px",
            sortable: true,
            isDefaultSortOrder: true,
          },
          {
            title: "",
            width: "*",
          },
        ]}
      />
      <Confirm
        title="Підтвердіть видалення"
        text="Ви впевнені що хочете видалити це змагання?"
        show={!!idToDelete}
        onClose={() => setIdToDelete(null)}
        onConfirm={() => onDelete()}
      />
      <Confirm
        title="Підтвердіть відновлення"
        text="Ви впевнені що хочете відновити це змагання?"
        show={!!idToRestore}
        onClose={() => setIdToRestore(null)}
        onConfirm={() => onRestore()}
      />
    </>
  );
};

export default CompetitionsTable;
