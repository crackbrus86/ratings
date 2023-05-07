import * as React from "react";

import Form from "../../../components/form/form";
import Modal from "../../../components/modal/modal";
import { CompetitionsContext } from "../context/competitionsContext";

const CompetitionModal: React.FC = () => {
  const {
    editableCompetition,
    validation,
    saveCompetition,
    changeEditableCompetition,
    closeEditableCompetition,
  } = React.useContext(CompetitionsContext);

  const onSave = () => {
    saveCompetition();
    closeEditableCompetition();
  };
  return (
    editableCompetition && (
      <Modal width="500px">
        <Modal.Header
          title={`${
            editableCompetition.isNew ? "Створити" : "Змінити"
          } змагання`}
          onClose={closeEditableCompetition}
        />
        <Modal.Body>
          <Form>
            <Form.TextInput
              label="Змагання"
              value={editableCompetition.name}
              validation={validation.nameValidation}
              maxLength={50}
              onChange={(v) => changeEditableCompetition({ name: v })}
            />
            <Form.TextInput
              label="Кодове ім`я"
              value={editableCompetition.dbName}
              validation={validation.dbNameValidation}
              maxLength={50}
              onChange={(v) => changeEditableCompetition({ dbName: v })}
            />
            <Form.TextInput
              label="Код"
              value={editableCompetition.shortName}
              validation={validation.shortNameValidation}
              maxLength={10}
              onChange={(v) => changeEditableCompetition({ shortName: v })}
            />
            <Form.CheckBox
              label="ФПУ"
              isChecked={editableCompetition.ratingUPF}
              onChange={() =>
                changeEditableCompetition({
                  ratingUPF: !editableCompetition.ratingUPF,
                })
              }
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Modal.FooterButton label="Зберегти" icon="save" disabled={!validation.isValid} onClick={onSave} />
        </Modal.Footer>
      </Modal>
    )
  );
};

export default CompetitionModal;
