import { useState } from "react";
import PropTypes from 'prop-types';
import Card from './Card.js'

const NewCardForm = (props) => {
    const [formFields, setFormFields] = useState({
        message: '',
        likes_count: 0,
    });

    const onMessageChange = (event) => {
        setFormFields({
            ...formFields,
            message: event.target.value,
            likes_count: event.target.value
        })
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        props.addCardCallback({
            message: formFields.message,
            likes_count: 0
        });

        setFormFields({
            message: '',
            likes_count: 0,
        });

    };


    return (
        <form onSubmit={onFormSubmit}>
            <label htmlFor="card-message">Message: </label>
            <input name="card-message" type='text' value={formFields.message} onChange={onMessageChange}/>
            <p>Preview: <Card
            id={formFields.id}
            message={formFields.message}
            likes_count={0}
        /></p>
            <input type='Submit'></input>
        </form>
    );
};

NewCardForm.propTypes = {
    addCardCallback: PropTypes.func.isRequired
};

export default NewCardForm;