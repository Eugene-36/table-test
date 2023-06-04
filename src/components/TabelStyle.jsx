import React, { useState } from 'react';

const TabelStyle = ({ modalState, styleTableModal }) => {
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [cellPadding, setCellPadding] = useState(5);
  const [borderWidth, setBorderWidth] = useState(1);
  const [borderColor, setBorderColor] = useState('#000000');
  const [fontSize, setFontSize] = useState(14);
  const [fontWeight, setFontWeight] = useState('lighter');
  const [fontColor, setFontColor] = useState('#000000');
  const [textAlign, settextAlign] = useState('start');

  const handleSubmit = (e) => {
    const tableStyles = {
      backgroundColor,
      cellPadding,
      borderWidth,
      borderColor,
      fontSize,
      fontWeight,
      fontColor,
      textAlign,
    };
    localStorage.setItem('tableStyles', JSON.stringify(tableStyles));
  };

  const handleReset = () => {
    localStorage.removeItem('tableStyles');
    window.location.reload(true);
  };
  return (
    <div className='modal-container'>
      <div
        style={{ overflow: 'visible' }}
        className={`custom-modal ${modalState ? 'modal-open' : 'modal-close'}`}
      >
        <button
          className='style-btn'
          onClick={() => {
            styleTableModal(!modalState);
          }}
        >
          <span className='material-symbols-outlined'>settings</span>
        </button>
        <form onSubmit={handleSubmit}>
          <h3>Customization</h3>
          <div className='form-group input-color'>
            <label>Bacground color:</label>
            <input
              type='color'
              value={backgroundColor}
              onChange={(event) => setBackgroundColor(event.target.value)}
            />
          </div>

          <div className='form-group'>
            <label>Cell padding:</label>
            <input
              type='number'
              value={cellPadding}
              onChange={(event) => setCellPadding(event.target.value)}
            />
          </div>
          <div className='form-group'>
            <label>Border width:</label>
            <input
              type='number'
              value={borderWidth}
              onChange={(event) => setBorderWidth(event.target.value)}
            />
          </div>

          <div className='form-group input-color'>
            <label>Border color:</label>
            <input
              type='color'
              value={borderColor}
              onChange={(event) => setBorderColor(event.target.value)}
            />
          </div>

          <div className='form-group'>
            <label>Font size:</label>
            <input
              type='number'
              value={fontSize}
              onChange={(event) => setFontSize(event.target.value)}
            />
          </div>

          <div className='form-group'>
            <label>Font weight</label>
            <select
              onChange={(event) => setFontWeight(event.target.value)}
              className='browser-default custom-select'
            >
              <option defaultValue={'lighter'} value='lighter'>
                Lighter
              </option>
              <option value='normal'>Normal</option>
              <option value='bold'>Bold</option>
            </select>
          </div>
          <div className='form-group input-color'>
            <label>Font color:</label>
            <input
              type='color'
              value={fontColor}
              onChange={(event) => setFontColor(event.target.value)}
            />
          </div>

          <div className='form-group'>
            <label>Text align</label>
            <select
              onChange={(event) => settextAlign(event.target.value)}
              className='browser-default custom-select'
            >
              <option defaultValue={'start'} value='start'>
                Start
              </option>
              <option value='end'>End</option>
              <option value='center'>Center</option>
              <option value='justify'>Justify</option>
            </select>
          </div>
          <button type='submit' className='btn-save'>
            Save
          </button>
          <button
            type='button'
            onClick={() => handleReset()}
            className='btn-cancel'
          >
            Default
          </button>
        </form>
      </div>
    </div>
  );
};

export default TabelStyle;
