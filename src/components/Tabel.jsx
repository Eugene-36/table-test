import React, { useEffect, useState } from 'react';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import Modal from './modal/Modal';
import TabelStyle from './TabelStyle';
import SearchBar from './SearchBar';

const Tabel = () => {
  const LOCAL_STORAGE_KEY = 'dataArray';
  const [data, setData] = useState(() => {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
  });
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('asc');
  const [toggleColumn, setToggleColumn] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [customizationOpen, setCustomizationOpen] = useState(false);

  const [rowToEdit, setRowToEdit] = useState(null);
  const [activeRow, setActiveRowId] = useState('');

  // State for style table
  const [tableStyles, setTableStyles] = useState({});

  const [newRowId, setNewRowId] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  // Request for the data and writing them down to local storage
  useEffect(() => {
    const fetchMainData = async () => {
      try {
        const fetchData = await fetch(
          'https://internal.phonexa.com/api/site/team'
        );
        const getResponseJSON = await fetchData.json();
        const flattenedObjects = Object.values(getResponseJSON.marketing);
        const storedList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

        if (storedList) {
          setData(storedList);
        } else {
          setData(flattenedObjects);
          localStorage.setItem('dataArray', JSON.stringify(flattenedObjects));
        }
        setIsLoading(false);
      } catch (error) {
        console.log('error is happend in fetch data', error);
      }
    };
    fetchMainData();
  }, []);
  // Get style for the table from local storage
  useEffect(() => {
    const savedTableStyles = localStorage.getItem('tableStyles');

    if (savedTableStyles) {
      setTableStyles(JSON.parse(savedTableStyles));
    }
  }, []);

  // The logic for sorting data by input
  useEffect(() => {
    const filterData = (searchValue) => {
      if (searchValue === '') return data;

      return data.filter((user) =>
        Object.values(user).some((value) =>
          value.toString().toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    };
    const filteredUsers = filterData(searchValue);
    setFilteredData(filteredUsers);
  }, [data, searchValue]);

  if (isLoading) {
    return <div>Data is loading...</div>;
  }
  // Sorting data by columns
  const onSort = (columnName) => {
    let sortedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    const sortKey = {
      'Full Name': 'name',
      Title: 'title',
      Cite: 'description',
    };
    if (columnName !== '#') {
      sortedData.sort((a, b) => {
        const headerStringValueA = a[sortKey[columnName]];
        const headerStringValueB = b[sortKey[columnName]];
        if (sortOrder === 'asc' && toggleColumn) {
          return headerStringValueB.localeCompare(headerStringValueA);
        } else {
          return headerStringValueA.localeCompare(headerStringValueB);
        }
      });
    } else {
      sortedData.sort((a, b) => {
        if (toggleColumn) {
          return a['id'] - b['id'];
        } else {
          return b['id'] - a['id'];
        }
      });
    }
    localStorage.setItem('dataArray', JSON.stringify(sortedData));
    setData(sortedData);
  };

  // Delete row from local storage
  const handelDeleteRow = (targetIndex) => {
    const allObjects = JSON.parse(localStorage.getItem('dataArray'));
    const approveAction = confirm('Press the button to confirm the action');
    if (approveAction) {
      const result = data.filter((el, index) => el.id !== targetIndex);
      localStorage.setItem('dataArray', JSON.stringify(result));
      setData(result);
    }

    return false;
  };

  //Here is the logic for adding new rows according to the sorting
  // or editing of existing data
  const handelSubmit = (newRow) => {
    const allEntries = JSON.parse(localStorage.getItem('dataArray') || []);
    const existingRowIndex = allEntries.findIndex(
      (entry) => entry.id === newRow.id
    );

    if (existingRowIndex !== -1) {
      allEntries[existingRowIndex] = newRow;
    } else {
      const sortOrderVar = toggleColumn ? -1 : 1;
      const sortedData = allEntries
        .slice()
        .sort((a, b) => (a.id - b.id) * sortOrderVar);
      const insertIndex = sortedData.findIndex(
        (entry) => sortOrderVar * entry.id > sortOrderVar * newRow.id
      );
      if (insertIndex !== -1) {
        const originalIndex = allEntries.findIndex(
          (entry) => entry.id === sortedData[insertIndex].id
        );
        allEntries.splice(originalIndex, 0, newRow);
      } else {
        allEntries.push(newRow);
      }
      setNewRowId(newRow.id);
    }

    localStorage.setItem('dataArray', JSON.stringify(allEntries));
    setData(allEntries);

    setRowToEdit(null);
  };

  const handleEditRow = (index) => {
    const rowToEdit = data.find((element) => element.id === index);
    setRowToEdit(rowToEdit);
    setModalOpen(true);
    setActiveRowId(index);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    setActiveRowId(null);
  };
  return (
    <>
      <SearchBar callback={(searchValue) => setSearchValue(searchValue)} />

      <div className='modal-relative'>
        <table
          className='table'
          cellPadding={tableStyles.cellPadding}
          style={{
            backgroundColor: tableStyles.backgroundColor,
            borderColor: tableStyles.borderColor,
            borderWidth: `${tableStyles.borderWidth}px`,
            color: tableStyles.fontColor,
            fontSize: `${tableStyles.fontSize}px`,
            fontWeight: tableStyles.fontWeight,
            textAlign: tableStyles.textAlign,
          }}
        >
          <TableHeader onSort={onSort} setToggleColumn={setToggleColumn} />
          <tbody style={{ backgroundColor: tableStyles.backgroundColor }}>
            <TableRow
              dataRow={filteredData}
              deleteRow={handelDeleteRow}
              editRow={handleEditRow}
              scrollToEl={newRowId}
              stateModalClose={modalOpen}
              activeRowId={activeRow}
            />
          </tbody>
        </table>
        <Modal
          closeModal={handleCloseModal}
          onSubmit={handelSubmit}
          defaultValue={rowToEdit}
          dataValidations={data}
          stateModal={modalOpen}
          triggerModal={setModalOpen}
          rowEdit={setRowToEdit}
        />

        <TabelStyle
          modalState={customizationOpen}
          styleTableModal={setCustomizationOpen}
        />
      </div>
    </>
  );
};

export default Tabel;
