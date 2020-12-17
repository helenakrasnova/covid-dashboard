import Table from '../table/Table';

export default class Main {
  constructor() {
    this.table = new Table();
  }

  async init() {
    this.render();
    await this.table.init();
  }

  render = () => {
    const container = document.createElement('div');
    document.body.append(container);
    container.className = 'container';
  }
}
