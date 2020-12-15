import TableRowModel from '../models/TableRowModel';

export default class TableService {
  constructor() {
    this.baseUrl = 'https://api.covid19api.com';
  }

  async getTotalAbsolute() {
    const results = await this.get();
    const total = results.Countries.map((item) => {
      const tableRow = new TableRowModel(
        item.Country, item.TotalConfirmed, item.TotalRecovered, item.TotalDeaths,
      );
      return tableRow;
    });
    return total;
  }

  async getLastDayAbsolute() {
    const results = await this.get();
    const lastDay = results.Countries.map((item) => {
      const tableRow = new TableRowModel(
        item.Country, item.NewConfirmed, item.NewRecovered, item.NewDeaths,
      );
      return tableRow;
    });
    return lastDay;
  }

  // getTotalRelative() {

  // }

  // getLastDayRelative() {

  // }

  async get() {
    const res = await fetch(`${this.baseUrl}/summary`);
    if (res.ok) {
      const data = await res.json();
      return data;
    }
    return null;
  }
}
