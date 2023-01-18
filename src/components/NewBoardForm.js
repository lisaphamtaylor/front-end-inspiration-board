import { useState } from 'react';
import PropTypes from 'prop-types';

const NewBoardForm = ({ addFormCallback }) => {
  const [boardFormFields, setBoardFormFields] = useState({
    title: '',
    owner: '',
  });

  const onTitleChange = (event) => {
    setBoardFormFields({
      ...boardFormFields,
      title: event.target.value,
    });
  };

  const onOwnerChange = (event) => {
    setBoardFormFields({
      ...boardFormFields,
      owner: event.target.value,
    });
  };

  const onBoardFormSubmit = (event) => {
    event.preventDefault();

    addFormCallback({
      title: boardFormFields.title,
      owner: boardFormFields.owner,
    });

    setBoardFormFields({
      title: '',
      owner: '',
    });
  };

  return (
    <form onSubmit={onBoardFormSubmit}>
      <label>Title: </label>
      <input
        type='text'
        value={boardFormFields.title}
        onChange={onTitleChange}
      />
      <br />
      <br />
      <label>Owner's Name: </label>
      <input
        type='text'
        value={boardFormFields.owner}
        onChange={onOwnerChange}
      />

      <br />
      <p>
        Preview: {boardFormFields.title} - {boardFormFields.owner}
      </p>
      <input type='Submit'></input>
    </form>
  );
};

NewBoardForm.propTypes = {
  addFormCallback: PropTypes.func.isRequired,
};

export default NewBoardForm;
