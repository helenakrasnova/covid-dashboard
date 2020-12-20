import Table from '../table/Table';
import List from '../list/List';
import CovidMap from '../covidMap/CovidMap';

export default class Main {
  constructor() {
    this.table = new Table();
    this.covidMap = new CovidMap();
    this.list = new List('countries');
  }

  async init() {
    this.render();
    await Promise.all([this.table.init(), this.covidMap.render(), this.list.initList()]);
  }

  render = () => {
    const container = document.createElement('div');
    document.body.append(container);
    container.className = 'container';
  }
}
