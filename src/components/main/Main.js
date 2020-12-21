import Table from '../table/Table';
import List from '../list/List';
export default class Main {
  constructor() {
    this.table = new Table();
    this.list = new List('countries');
  }

  async init() {
    this.render();
    await this.table.init();
    await this.list.initList();

  }

  render = () => {
    const container = document.createElement('div');
    document.body.append(container);
    container.className = 'container';
  }
}
