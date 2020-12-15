import TableService from '../../services/TableService';

export default class Table {
  constructor() {
    this.tableService = new TableService();
  }

  async init() {
    const tableData = await this.tableService.getTotalAbsolute();
    this.render(tableData);
  }

  render = (tableData) => {
    const container = document.querySelector('.container');
    let covidTable = document.querySelector('.covid-table');
    if (!covidTable) {
      covidTable = document.createElement('table');
      container.append(covidTable);
      covidTable.className = 'covid-table';
    }
    covidTable.innerHTML = '';
    const trHeading = document.createElement('tr');
    trHeading.className = 'table-heading';
    this.createHeadCell('Country', trHeading);
    this.createHeadCell('Total<br>confirmed', trHeading);
    this.createHeadCell('Total<br>recovered', trHeading);
    this.createHeadCell('Total<br>deaths', trHeading);
    covidTable.append(trHeading);
    for (let i = 0; i < tableData.length; i++) {
      const tr = document.createElement('tr');
      tr.className = 'table-row';
      this.createBodyCell(tableData[i].country, tr);
      this.createBodyCell(tableData[i].confirmed, tr);
      this.createBodyCell(tableData[i].recovered, tr);
      this.createBodyCell(tableData[i].deaths, tr);
      covidTable.append(tr);
    }
  }

  createHeadCell = (text, trHeading) => {
    const th = document.createElement('th');
    th.innerHTML = text;
    trHeading.append(th);
  }

  createBodyCell = (text, tr) => {
    const td = document.createElement('td');
    td.textContent = text;
    tr.append(td);
  }
}
