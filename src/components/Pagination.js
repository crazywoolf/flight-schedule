import React, { Component } from 'react';
import FlightData from './FlightData';

export default class Pagination extends Component {
  constructor(props) {
    super(props);

    this.currentPage = this.props.currentPage;
    this.currentSetOfItems = this.props.data;
    this.handleClick = this.handleClick.bind(this);
    this.pageNumbers = [];
    this.renderPageNumbers = [];
    this.rows = [];
    this.dataPerPage = 20;
  }

  //Выполняем расчеты для пагинации. Формируем набор для отображения записей.
  updateCurrentSet() {
    const { data, currentPage, update } = this.props;

    if (data != null) {
      const indexOfLastItem = currentPage * this.dataPerPage;
      const indexOfFirstItem = indexOfLastItem - this.dataPerPage;

      this.currentSetOfItems = data.slice(indexOfFirstItem, indexOfLastItem);

      this.pageNumbers = [];
      this.renderPageNumbers = [];
      for (let i = 1; i <= Math.ceil(data.length / this.dataPerPage); i++) {
        this.pageNumbers.push(i);
      }

      this.renderPageNumbers = this.pageNumbers.map(number => {
        return (
          <li
            className={number === currentPage ? 'page_item_active' : 'page_item'}
            key={number}
            id={number}
            onClick={this.handleClick}
          >
            {number}
          </li>
        );
      });

      this.rows = this.currentSetOfItems.map((row, index) => {
        return (
          <FlightData
            row={row}
            index={index}
            key={`row-${index}`}
            update={update}
          />
        );
      });
    }
  }

  handleClick(event) {
    this.currentPage = Number(event.target.id);
    this.props.update({
      activePage: this.currentPage,
    });
  }

  render() {
    if (this.props.flagLoad) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }

    this.updateCurrentSet();
    return (
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Дата</th>
            <th>Задержан до</th>
            <th>Город</th>
            <th>Рейс</th>
            <th>Терминал</th>
            <th>Статус</th>
          </tr>
        </thead>
        <tbody>
          {this.rows}
          <tr>
            <td colSpan="6" className="index_pagin">
              <ul id="page-numbers" className="pagination">
                {this.renderPageNumbers}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}
