import TableService from '../../services/TableService';

export default class Table {
  constructor() {
    this.tableService = new TableService();
    this.state = {
      isAbsoluteValues: true,
      isLatestDay: false,
    };
  }

  async init() {
    const tableData = await this.tableService.get(
      this.state.isAbsoluteValues,
      this.state.isLatestDay,
    );
    this.render(tableData);
  }

  async update(country) {
    const tableData = await this.tableService.get(
      this.state.isAbsoluteValues,
      this.state.isLatestDay,
      country,
    );
    this.render(tableData);
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

  setState = (newState) => {
    this.state = { ...this.state, ...newState };
  }

  onDateRangeClicked = async () => {
    this.setState({
      isLatestDay: !this.state.isLatestDay,
    });
    const tableData = await this.tableService.get(
      this.state.isAbsoluteValues,
      this.state.isLatestDay,
    );
    this.render(tableData);
  }

  onNumberFormatsClicked = async () => {
    this.setState({
      isAbsoluteValues: !this.state.isAbsoluteValues,
    });
    const tableData = await this.tableService.get(
      this.state.isAbsoluteValues,
      this.state.isLatestDay,
    );
    this.render(tableData);
  }

  render = (tableData) => {
    const container = document.querySelector('.container');
    let tableComponent = document.querySelector('.table-component');
    if (!tableComponent) {
      tableComponent = document.createElement('div');
      tableComponent.className = 'table-component';
      container.append(tableComponent);
    }
    tableComponent.innerHTML = '';
    const tableBox = document.createElement('div');
    tableBox.className = 'table-box';
    tableComponent.append(tableBox);
    const covidTable = document.createElement('table');
    tableBox.append(covidTable);
    covidTable.className = 'covid-table';
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

    this.createTableToggle('table-select', this.state.isLatestDay, 'all<br>time');
    this.createTableToggle('table-selectBy', this.state.isAbsoluteValues, 'abs.');
    const checkbox = document.querySelector('#table-select');
    const secondCheckbox = document.querySelector('#table-selectBy');
    checkbox.addEventListener('click', () => {
      this.onDateRangeClicked();
    });
    secondCheckbox.addEventListener('click', () => {
      this.onNumberFormatsClicked();
    });
  }

  createTableToggle = (inputId, checked, labelText) => {
    const tableComponent = document.querySelector('.table-component');
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = inputId;
    input.checked = checked;
    const label = document.createElement('label');
    label.htmlFor = inputId;
    label.innerHTML = labelText;
    tableComponent.append(input);
    tableComponent.append(label);
  }
}
