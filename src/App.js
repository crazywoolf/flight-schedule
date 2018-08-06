import React, { Component } from 'react';
import load from './components/load';
import Searchbar from './components/SearchBar';
import Pagination from './components/Pagination';

const timerDelay = 60000;     //задержка таймера в мс
const departure = 'departure';
const arrival = 'arrival';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentData: null,      //отсортированне данные на текущей странице
      initialData: {},        //исходные данные полученные с сервера за заданный промежуток времени, отсортированные по дате
      term: '',               //строка поиска по номеру рейса
      activePage: 1,          //номер текущей страницы
      dataType: null,         //тип данных (вылет, прилет)
      isLoadingData: false    //статус загрузки данных
    };

    this.switchDataType(departure);
    setInterval(this.onTimer.bind(this), timerDelay);
  }

  onTimer() {
    if (this.state.isLoadingData)
      return;
    this.switchDataType(this.state.dataType, true);
  }

  sort(data) {
    return data.sort((a, b) => {
      if (a.dateOld === b.dateOld)
        return 0;
      return a.dateOld > b.dateOld ? 1 : -1;
    });
  }

  /*
    switchDataType смена типа данных
    Проверяем, загружены ли по данному типу данные:
    если не загружены, то загружаем и сортируем.
    Отображаем данные.
    @type [string] тип данных (прилет/вылет)
    @force [boolean] влаг, отражающий необходимость безусовной перезаписи initialData
    (при вызове из таймера, безусловно перезаписываем initialData)    
  */
  switchDataType(type, force = false) {
    if (this.state.initialData.hasOwnProperty(type) && !force) {
      this.setState({
        currentData: this.state.initialData[type],
        dataType: type,
        term: ''
      });
    } else {
      this.setState({
        currentData: null,
        isLoadingData: true
      });

      load(type).then(rows => {
        this.setState({
          isLoadingData: false
        });

        this.state.initialData[type] = this.sort(JSON.parse(rows));
        this.setState({
          currentData: this.state.initialData[type],
          dataType: type,
          term: ''
        });
      });
    }
  }

  updateData(config) {
    this.setState(config);
  }

  render() {
    const bgColor = "index_btn_type";
    const bgColorSelect = "index_btn_type_select";

    return (
      <div className="app container-fluid index_main">
        <div className="row-fluid">
          <nav className="navbar" id="index_navbar">
            <a className="navbar-brand" href="#">Табло аэропорта</a>
          </nav>

          <div className="btn-group col-md-12">
            <button
              className="btn btn-danger col-md-6"
              id={this.state.dataType === departure ? bgColorSelect : bgColor}
              onClick={() => this.switchDataType(departure)}
            >
              Вылет
            </button>
            <button
              className="btn btn-danger col-md-6"
              id={this.state.dataType === arrival ? bgColorSelect : bgColor}
              onClick={() => this.switchDataType(arrival)}
            >
              Прилет
            </button>
          </div>

          <div className="col-md-12">
            <Searchbar
              term={this.state.term}
              currentData={this.state.currentData}
              initialData={this.state.initialData}
              dataType={this.state.dataType}
              update={this.updateData.bind(this)}
            />
          </div>

          <div className="col-md-12">
            <Pagination
              data={this.state.currentData}
              currentPage={this.state.activePage}
              update={this.updateData.bind(this)}
              flagLoad={this.state.isLoadingData}
            />
          </div>
        </div>
      </div>
    );
  }
}