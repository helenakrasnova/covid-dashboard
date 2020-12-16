import List from '../list/List';

export default class Main {
  constructor() {
    this.list = new List('countries');
  }

  async init() {
    this.render();
    const container = document.querySelector('.container');
    const list = await this.list.initList();
    container.appendChild(list);
  }

  render = () => {
    const container = document.createElement('div');
    document.body.append(container);
    container.className = 'container';
  }
}
