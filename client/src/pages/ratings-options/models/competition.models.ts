import { ValidationResult } from "../../../infrastructure/models";

export interface Competition {
    id: number;
    name: string;
    dbName: string;
    sortOrder: number;
    ratingUPF: boolean;
    shortName: string;
    isActive: boolean;
}

export type  EditableCompetition = Competition & { isNew: boolean };

export type CreateCompetitionRequest = Competition & { isActive: boolean };

export interface UpdateCompetitionRequest {
    id: number;
    name: string;
    ratingUPF: boolean;
}

export interface DeleteCompetitionRequest {
    id: number;
}

export interface RestoreCompetitionRequest {
    id: number;
}

export interface  EditableCompetitionValidation {
    isValid: boolean;
    nameValidation: ValidationResult;
    dbNameValidation: ValidationResult;
    shortNameValidation: ValidationResult;
}

export type CompetitionContextType = {
    competitions: Competition[];
    search: string;
    competitionsToDisplay: Competition[];
    validation: EditableCompetitionValidation;
    editableCompetition: EditableCompetition;
    view: CompetitionView;
    loadCompetitions: () => void;
    onSearchChange: (searchValue: string) => void;
    openCompetition: (competition: Competition) => void;
    addCompetition: () => void;
    saveCompetition: () => void;
    changeEditableCompetition: (change: Partial<EditableCompetition>) => void;
    closeEditableCompetition: () => void;
    deleteCompetition: (id: number) => void;
    setView: (view: CompetitionView) => void;
    restoreCompetition: (id: number) => void;
}

export enum CompetitionView {
    Active = 'active',
    All = 'all'
}