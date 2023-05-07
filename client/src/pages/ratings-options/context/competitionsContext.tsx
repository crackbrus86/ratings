import * as React from "react";
import * as toastr from "toastr";

import { isMatchingSearchString } from "../../../utils/utils";
import {
  Competition,
  CompetitionContextType,
  CompetitionView,
  EditableCompetition,
  EditableCompetitionValidation,
} from "../models/competition.models";
import * as Services from "../services/competition.service";

toastr.options.timeOut = 5000;

export const CompetitionsContext =
  React.createContext<CompetitionContextType | null>(null);

export const CompetitionProvider: React.FC<React.ReactNode> = ({
  children,
}) => {
  const [competitions, setCompetitions] = React.useState<Competition[]>([]);

  const [view, setView] = React.useState<CompetitionView>(CompetitionView.Active);

  const [search, setSearch] = React.useState<string>(null);

  const competitionsToDisplay = React.useMemo(() => {
    return competitions.filter(
      (x) =>
        !search ||
        isMatchingSearchString(search, x.name) ||
        isMatchingSearchString(search, x.dbName) ||
        isMatchingSearchString(search, x.shortName)
    );
  }, [competitions, search]);

  const [validation, setValidation] = React.useState<EditableCompetitionValidation>({
    isValid: true,
    nameValidation: { isValid: true, message: null },
    dbNameValidation: { isValid: true, message: null },
    shortNameValidation: { isValid: true, message: null },
  });

  const [editableCompetition, setEditableCompetition] = React.useState<EditableCompetition>(null);

  const loadCompetitions = () => {
    switch(view)
    {
      case CompetitionView.Active: {
        loadActiveCompetitions();
        break;
      }
      case CompetitionView.All: {
        loadAllCompetitions();
        break;
      }
      default:
        break;
    }
  };

  const loadActiveCompetitions = () => {
    Services.getActiveCompetitions().then((response) => {
      if (response.status) {
        setCompetitions(response.data);
      } else {
        toastr.error(response.message);
      }
    });
  };

  const loadAllCompetitions = () => {
    Services.getAllCompetitions().then((response) => {
      if (response.status) {
        setCompetitions(response.data);
      } else {
        toastr.error(response.message);
      }
    });
  };

  const onSearchChange = (searchValue: string) => {
    setSearch(searchValue);
  };

  const openCompetition = (competition: Competition) => {
    setEditableCompetition({ ...competition, isNew: false });
  };

  const addCompetition = () => {
    setEditableCompetition({
      id: null,
      name: null,
      dbName: null,
      shortName: null,
      ratingUPF: false,
      sortOrder: null,
      isNew: true,
      isActive: true
    });
  };

  const createCompetition = () => {
    Services.createCompetition({
      id: editableCompetition.id,
      name: editableCompetition.name,
      dbName: editableCompetition.dbName,
      shortName: editableCompetition.shortName,
      sortOrder: editableCompetition.sortOrder,
      ratingUPF: editableCompetition.ratingUPF,
      isActive: true
    }).then(response => {
      if(response.status)
      {
        toastr.success(response.message);
        loadCompetitions();
      } else {
        toastr.error(response.message);
      }
    });
  };

  const updateCompetition = () => {
    Services.updateCompetition({
      id: editableCompetition.id,
      name: editableCompetition.name,
      ratingUPF: editableCompetition.ratingUPF,
      dbName: editableCompetition.dbName,
      shortName: editableCompetition.shortName
    }).then(response => {
      if(response.status)
      {
        toastr.success(response.message);
        loadCompetitions();
      } else {
        toastr.error(response.message);
      }
    });
  };

  const saveCompetition = () => {
    if(editableCompetition.isNew)
      createCompetition();
    else
      updateCompetition();
  };

  const deleteCompetition = (id: number) => {
    Services.deleteCompetition({id}).then(response => {
      if(response.status)
      {
        toastr.success(response.message);
        loadCompetitions();
      } else {
        toastr.error(response.message);
      }
    });
  };

  const restoreCompetition = (id: number) => {
    Services.restoreeCompetition({id}).then(response => {
      if(response.status)
      {
        toastr.success(response.message);
        loadCompetitions();
      }else{
        toastr.error(response.message);
      }
    });
  }

  const competitionsToCompare = React.useMemo(() => {
    return competitions.filter(competition => competition.id !== editableCompetition?.id);
  }, [competitions, editableCompetition]);

  React.useEffect(() => {
    const nextValidation = {
      isValid: true,
      nameValidation: { isValid: true, message: null },
      dbNameValidation: { isValid: true, message: null },
      shortNameValidation: { isValid: true, message: null },
    };

    if(!editableCompetition)
      return;

    if (!editableCompetition?.name) {
      nextValidation.nameValidation.isValid = false;
      nextValidation.nameValidation.message = "Обов'язкове поле";
    }

    if(!!editableCompetition?.name && !!competitionsToCompare.find(competition => competition.name === editableCompetition.name)) {
      nextValidation.nameValidation.isValid = false;
      nextValidation.nameValidation.message = "Назва змагань не унікальна";
    }

    if (!editableCompetition?.dbName) {
      nextValidation.dbNameValidation.isValid = false;
      nextValidation.dbNameValidation.message = "Обов'язкове поле";
    }

    if(!!editableCompetition?.dbName && !!competitionsToCompare.find(competition => competition.dbName === editableCompetition.dbName)) {
      nextValidation.dbNameValidation.isValid = false;
      nextValidation.dbNameValidation.message = "Кодове ім'я не унікальне";
    }

    if (!editableCompetition?.shortName) {
      nextValidation.shortNameValidation.isValid = false;
      nextValidation.shortNameValidation.message = "Обов'язкове поле";
    }

    if(!!editableCompetition?.shortName && !!competitionsToCompare.find(competition => competition.shortName === editableCompetition.shortName)) {
      nextValidation.shortNameValidation.isValid = false;
      nextValidation.shortNameValidation.message = "Код не унікальний";
    }

    if(
        !nextValidation.nameValidation.isValid || 
        !nextValidation.dbNameValidation.isValid || 
        !nextValidation.shortNameValidation.isValid
      )
    {
      nextValidation.isValid = false;
    }

    setValidation(nextValidation);
  }, [competitionsToCompare, editableCompetition, setValidation]);

  const changeEditableCompetition = (change: Partial<EditableCompetition>) => {
    setEditableCompetition({...editableCompetition, ...change});
  }

  const closeEditableCompetition = () => {
    setEditableCompetition(null);
  }

  return (
    <CompetitionsContext.Provider
      value={{
        competitions,
        search,
        competitionsToDisplay,
        validation,
        editableCompetition,
        view,
        loadCompetitions,
        onSearchChange,
        openCompetition,
        addCompetition,
        saveCompetition,
        changeEditableCompetition,
        closeEditableCompetition,
        deleteCompetition,
        setView,
        restoreCompetition
      }}
    >
      {children}
    </CompetitionsContext.Provider>
  );
};
