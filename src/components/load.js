const intervalDays = 1;      //количество дней между DateStart DateEnd
const monthCorrection = 1;   //корректировка номера месяца
const countRows = 32;
const maxId = 1000;

export default type => {
  return new Promise((success, fail) => {    
    const oldDateStart = new Date();
    const oldDateEnd = new Date();
    const newDateStart = new Date();
    const newDateEnd = new Date();
    oldDateEnd.setDate(oldDateStart.getDate() + intervalDays);
    newDateStart.setDate(oldDateEnd.getDate() + intervalDays);
    newDateEnd.setDate(newDateStart.getDate() + intervalDays);

    //функция формирует строку для url из диапазона дат
    const dateIntervalToString = (dateStart, dateEnd) => 
      (dateStart.getUTCMonth() + monthCorrection) + '-' + dateStart.getUTCDate() + '-' + dateStart.getUTCFullYear() + ',' +
      (dateEnd.getUTCMonth()   + monthCorrection) + '-' + dateEnd.getUTCDate()   + '-' + dateEnd.getUTCFullYear();


    const urlSet = {
      countRows: countRows,                                     //количество записей
      id: maxId,                                                //максимальное значение id для рандомного генерирования
      cityName: "city",                                         //название города с типом генерируемого значения "city"
      dateOld: dateIntervalToString(oldDateStart, oldDateEnd),  //дата вылета
      dateNew: dateIntervalToString(newDateStart, newDateEnd),  //дата задержки рейса
      delayed: "bool",                                          //флаг, отражающий состояние "задержан ли рейс" с типом генерируемого значения "bool"
      airlineName: "letterUpper|2",                             //название авиа компании с типом генерируемого значения "2 символа в верхнем регистре"
      airlineFlightNumber: "numberLength|4",                    //номер рейса с типом генерируемого значения "4 цифры"
      terminal: "%22A%22,%22B%22,%22C%22,%22D%22",              //название терминала с типом генерируемого значения "значение из набора [A, B, C, D]"
      status: "lorem|3"                                         //статус рейса с типом генерируемого значения "3 слова, разделенных пробелом"
    }

    const departureDataSet =
      `http://www.filltext.com/?rows=${urlSet.countRows
      }&id={number|${urlSet.id
      }}&cityName={${urlSet.cityName
      }}&dateOld={date|${urlSet.dateOld
      }}&dateNew={date|${urlSet.dateNew
      }}&delayed={${urlSet.delayed
      }}&airlineName={${urlSet.airlineName
      }}&airlineFlightNumber={${urlSet.airlineFlightNumber
      }}&terminal=[${urlSet.terminal
      }]&status={${urlSet.status}}`;

    const arrivalDataSet =
      `http://www.filltext.com/?rows=${urlSet.countRows
      }&id={number|${urlSet.id
      }}&cityName={${urlSet.cityName
      }}&dateOld={date|${urlSet.dateOld
      }}&dateNew={date|${urlSet.dateNew
      }}&delayed={${urlSet.delayed
      }}&airlineName={${urlSet.airlineName
      }}&airlineFlightNumber={${urlSet.airlineFlightNumber
      }}&terminal=[${urlSet.terminal
      }]&status={${urlSet.status}}`;

    let url = type === 'departure' ? departureDataSet : type === 'arrival' ? arrivalDataSet : '';

    const request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.addEventListener('load', () => {
      request.status >= 200 && request.status < 400
        ? success(request.responseText)
        : fail(new Error(`Request Failed: ${request.statusText}`));
    });

    request.addEventListener('error', () => {
      fail(new Error('Network Error'));
    });

    request.send();
  });
};