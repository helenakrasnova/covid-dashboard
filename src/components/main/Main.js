import Table from '../table/Table';
import CovidMap from '../covidMap/CovidMap';

export default class Main {
  constructor() {
    this.table = new Table();
    this.covidMap = new CovidMap();
  }

  async init() {
    this.render();
    await this.table.init();
    await this.covidMap.render();
  }

  render = () => {
    const container = document.createElement('div');
    document.body.append(container);
    container.className = 'container';
  }
}
