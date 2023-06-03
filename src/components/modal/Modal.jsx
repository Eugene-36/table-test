/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
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
  // ======
  const initState = () => {
    let id = '';
    let name = '';
    let title = '';
    let description = '';
    let checkUniqueId = currentArray.filter((el) => formState.id === el.id);

    if (!formState.id) {
      id = 'Cannot be blank';
    } else if (checkUniqueId.length !== 0 && !defaultValue) {
      id = 'Id should be unique';
    }

    if (!formState.name) {
      name = 'Cannot be blank';
    }
    if (!formState.title) {
      title = 'Cannot be blank';
    }
    if (!formState.description) {
      description = 'Cannot be blank';
    }

    if (id || name || description || title) {
      setErrors({ id, name, title, description });
      setIsValid(false);
      return false;
    }

    setIsValid(true);
    return true;
  };

  const handelSubmit = (e) => {
    e.preventDefault();

    const isValidForm = initState();

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
          {stateModal ? '<<' : '>>'}
        </button>
        <form onSubmit={handelSubmit}>
          <h3> Edit / Add</h3>
          <div className='form-group'>
            <label htmlFor='id'>ID</label>
            <input
              value={formState?.id}
              className={`input-field ${
                errors.id ? 'invalid' : formState.id ? 'success' : ''
              }`}
              type='number'
              name='id'
              onChange={handelChange}
              placeholder='Enter Id'
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
              onChange={handelChange}
              value={formState.name}
              className={`input-field ${
                errors.name ? 'invalid' : formState.name ? 'success' : ''
              }`}
              placeholder='Enter Full Name'
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
              onChange={handelChange}
              value={formState.title}
              className={`input-field ${
                errors.title ? 'invalid' : formState.title ? 'success' : ''
              }`}
              placeholder='Enter Title'
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
              onChange={handelChange}
              value={formState.description}
              className={`input-field ${
                errors.description
                  ? 'invalid'
                  : formState.description
                  ? 'success'
                  : ''
              }`}
              placeholder='Enter Cite'
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

          <button type='submit' className='btn-save'>
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
