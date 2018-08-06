import React from 'react';

export default ({ term, currentData, initialData, dataType, update }) => {
  //фильтруем данные по рейсу в соответствии со значением в строке поиска.
  const dataSearch = () => {
    const value = term;
    const filteredData = initialData[dataType].filter(row => {
      return String(row.airlineFlightNumber).includes(value);
    });

    update({
      currentData: filteredData,
      term: value,
      activePage: 1,
      isSorted: false,
    });
  };

  const handleChange = e => {
    if (initialData[dataType]) {
      e.target.placeholder = 'Введите номер рейса...';
      update({ term: e.target.value });
    } else {
      e.target.placeholder = 'Выберите данные...';
    }
  };

  const handleClick = () => {
    if (initialData[dataType]) {
      dataSearch();
    } else {
      update({
        currentData: null,
        activePage: 1,
      });
    }
  };

  return (
    <div className="input-group">
      <input
        value={term}
        type="text"
        className="form-control"
        placeholder="Введите номер рейса..."
        onChange={handleChange}
      />
      <button className="btn index_btn" onClick={handleClick}>
        Найти
      </button>
    </div>
  );
};