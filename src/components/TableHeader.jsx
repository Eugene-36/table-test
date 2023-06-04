import React from 'react';

const TableHeader = ({ onSort, setToggleColumn }) => {
  const headerTitle = ['#', 'Full Name', 'Title', 'Cite', 'Actions'];

  const handleSort = (column) => {
    if (column === 'Actions') return;

    onSort(column);
    setToggleColumn((value) => !value);
  };

  return (
    <thead>
      <tr>
        {headerTitle.map((column, index) => (
          <th key={index} onClick={(e) => handleSort(column)}>
            {column}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
