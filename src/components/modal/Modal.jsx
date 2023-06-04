import React, { useState, useEffect } from 'react';
import './Modal.css';
const Modal = ({
  closeModal,
  onSubmit,
  defaultValue,
  dataValidations,
  stateModal,
  triggerModal,
  rowEdit,
}) => {
  const initialFormState = {
    id: '',
    name: '',
    title: '',
    description: '',
  };
  const [formState, setFormState] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [currentArray, setCurrentArray] = useState([]);

  const [isValid, setIsValid] = useState(false);
  const isStateValid =
    formState.description ||
    formState.id ||
    formState.name ||
    formState.title !== '';
  useEffect(() => {
    setCurrentArray(dataValidations);
  }, [dataValidations]);

  useEffect(() => {
    if (defaultValue) {
      setFormState(defaultValue);
    }
  }, [defaultValue]);

  const handelChange = (e) => {
    const { name, value } = e.target;

    setFormState((prevState) => ({
      ...prevState,
      [name]: name === 'id' ? parseInt(value) : value,
    }));

    setErrors({});
  };
  const resetForm = () => {
    setFormState(initialFormState);
    setErrors({});
    setIsValid(false);
  };

  const onValidate = () => {
    const errors = {
      id: '',
      name: '',
      title: '',
      description: '',
    };
    let isNounUniqueId = currentArray.some((el) => formState.id === el.id);

    if (!formState.id) {
      errors.id = 'Cannot be blank';
    } else if (isNounUniqueId && !defaultValue) {
      errors.id = 'Id should be unique';
    }

    if (!formState.name) {
      errors.name = 'Cannot be blank';
    }
    if (!formState.title) {
      errors.title = 'Cannot be blank';
    }
    if (!formState.description) {
      errors.description = 'Cannot be blank';
    }
    const hasError = Object.values(errors).some((el) => el !== '');

    if (hasError) {
      setErrors(errors);
      setIsValid(false);
      return false;
    }
    setIsValid(true);
    return true;
  };

  const handelSubmit = (e) => {
    e.preventDefault();

    const isValidForm = onValidate();

    if (isValidForm) {
      onSubmit(formState);
      closeModal();
      resetForm();
    }
  };

  return (
    <div className='modal-container'>
      <div className={`modal ${stateModal ? 'modal-open' : 'modal-close'}`}>
        <button
          className='add-btn'
          onClick={() => {
            rowEdit(null);
            triggerModal(!stateModal);
          }}
        >
          <span className='material-symbols-outlined'>add</span>
        </button>
        <form onSubmit={handelSubmit}>
          <h3> Edit / Add</h3>
          <div className='form-group'>
            <label htmlFor='id'>ID</label>
            <input
              type='number'
              name='id'
              placeholder='Enter Id*'
              disabled={defaultValue === null ? false : true}
              value={formState.id}
              className={`input-field ${
                errors.id ? 'invalid' : formState.id ? 'success' : ''
              }`}
              onChange={handelChange}
            />
            {errors.id ? (
              <i className='fas fa-exclamation-circle failure-icon'></i>
            ) : formState.id ? (
              <i className='far fa-check-circle success-icon'></i>
            ) : (
              ''
            )}

            <span className='text-danger'>{errors.id}</span>
          </div>

          <div className='form-group'>
            <label htmlFor='name'>Full Name</label>
            <input
              type='text'
              name='name'
              placeholder='Enter Full Name*'
              onChange={handelChange}
              value={formState.name}
              className={`input-field ${
                errors.name ? 'invalid' : formState.name ? 'success' : ''
              }`}
            />
            {errors.name ? (
              <i className='fas fa-exclamation-circle failure-icon'></i>
            ) : formState.name ? (
              <i className='far fa-check-circle success-icon'></i>
            ) : (
              ''
            )}
            <span className='text-danger'>{errors.name}</span>
          </div>

          <div className='form-group'>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              name='title'
              placeholder='Enter Title*'
              onChange={handelChange}
              value={formState.title}
              className={`input-field ${
                errors.title ? 'invalid' : formState.title ? 'success' : ''
              }`}
            />
            {errors.title ? (
              <i className='fas fa-exclamation-circle failure-icon'></i>
            ) : formState.title ? (
              <i className='far fa-check-circle success-icon'></i>
            ) : (
              ''
            )}
            <span className='text-danger'>{errors.title}</span>
          </div>

          <div className='form-group'>
            <label htmlFor='description'>Cite</label>
            <textarea
              type='text'
              name='description'
              value={formState.description}
              placeholder='Enter Cite*'
              onChange={handelChange}
              className={`input-field ${
                errors.description
                  ? 'invalid'
                  : formState.description
                  ? 'success'
                  : ''
              }`}
            />
            {errors.description ? (
              <i className='fas fa-exclamation-circle failure-icon'></i>
            ) : formState.description ? (
              <i className='far fa-check-circle success-icon'></i>
            ) : (
              ''
            )}
            <span className='text-danger'>{errors.description}</span>
          </div>

          <button
            disabled={isStateValid ? false : true}
            type='submit'
            className='btn-save'
          >
            Save
          </button>
          <button
            type='button'
            className='btn-cancel'
            onClick={() => {
              closeModal();
              resetForm();
            }}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
