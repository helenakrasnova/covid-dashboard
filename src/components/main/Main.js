import Table from '../table/Table';
import List from '../list/List';
import Chart from '../chart/Chart'
export default class Main {
  constructor() {
    this.table = new Table();
    this.list = new List('countries');
    this.chart = new Chart();
  }

  async init() {
    this.render();
    await this.table.init();
    await this.list.initList();
    await this.chart.initChart();
  }

  render = () => {
    const container = document.createElement('div');
    document.body.append(container);
    container.className = 'container';
  }
}
