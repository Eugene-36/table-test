import React, { useEffect, useState, useRef } from 'react';

const TableRow = ({
  dataRow,
  deleteRow,
  editRow,
  scrollToEl,
  stateModalClose,
  activeRowId,
}) => {
  const elementRefs = useRef([]);
  const [toId, setToId] = useState(null);
  useEffect(() => {
    setToId(scrollToEl);
  }, [scrollToEl]);

  useEffect(() => {
    let clearTimeOut = '';
    if (toId) {
      const scrollToElement = elementRefs.current.find(
        (ref) => ref.id === toId
      );
      if (scrollToElement) {
        scrollToElement.element.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        scrollToElement.element.style.backgroundColor = '#ffff99';

        clearTimeOut = setTimeout(() => {
          scrollToElement.element.style.backgroundColor = '';
        }, 3000);
      }
    }
    return () => {
      clearTimeout(clearTimeOut);
    };
  }, [toId]);

  return dataRow.map(({ id, name, title, description }) => (
    <tr
      ref={(ref) => {
        elementRefs.current.push({ id, element: ref });
      }}
      key={id}
      className={
        stateModalClose ? (id === activeRowId ? 'activeElementEdit' : '') : ''
      }
    >
      <td>{id}</td>
      <td>{name}</td>
      <td>{title}</td>
      <td>{description}</td>
      <td>
        <button onClick={() => editRow(id)} className='edit-btn'>
          Edit
        </button>
        <button onClick={() => deleteRow(id)} className='delete-btn'>
          Delete
        </button>
      </td>
    </tr>
  ));
};

export default TableRow;
