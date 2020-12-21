import ChartService from '../../services/ChartServices';
import ChartModel from '../../models/chartModel';

export default class Chart {
  constructor() {
    this.chartService = new ChartService();
    this.chartTypes = ['cases', 'deaths', 'recovered'];
    this.type = 0;
    this.chart = undefined;
    this.data = undefined;
  }

  createChartHeader() {
    const chartHeader = document.createElement('div');
    const headerWrapper = document.createElement('div');
    const controlWrapper = document.createElement('div');
    const listHeaderText = document.createElement('span');
    const nextItem = document.createElement('img');
    const prevItem = document.createElement('img');
    const switchWrapper = document.createElement('div');
    const button = document.createElement('input');
    const labelforButton = document.createElement('label');
    button.setAttribute('type', 'checkbox');
    button.setAttribute('id', 'chart-selectBy');
    labelforButton.setAttribute('for', 'chart-selectBy');
    button.addEventListener('click', () => {
      if (button.checked) {
        this.chartTypes = ['New cases', 'New deaths', 'New recovered'];
        listHeaderText.textContent = this.chartTypes[this.type];
        this.data = this.chartService.newCases;
        this.addCanvas();
        this.chart = new ChartModel(this.data[this.type]);
        this.chart.createChart();
      } else {
        this.chartTypes = ['cases', 'deaths', 'recovered'];
        this.data = this.chartService.globalData;
        listHeaderText.textContent = this.chartTypes[this.type];
        this.addCanvas();
        this.chart = new ChartModel(this.data[`${this.chartTypes[this.type]}`]);
        this.chart.createChart();
      }
    });
    switchWrapper.classList.add('switch-wrapper');
    switchWrapper.appendChild(button);
    switchWrapper.appendChild(labelforButton);
    nextItem.classList.add('next-arrow-chart');
    nextItem.setAttribute('src', './assets/List/img/next-chart.svg');
    nextItem.setAttribute('width', '16');
    nextItem.setAttribute('height', '16');
    prevItem.classList.add('prev-arrow-chart');
    prevItem.setAttribute('src', './assets/List/img/previous-chart.svg');
    prevItem.setAttribute('width', '16');
    prevItem.setAttribute('height', '16');
    prevItem.addEventListener('click', () => {
      this.prevChart();
      listHeaderText.textContent = this.chartTypes[this.type];
    });
    listHeaderText.classList.add('chart-header-text');
    listHeaderText.textContent = this.chartTypes[this.type];
    controlWrapper.classList.add('chart-header-controls');
    nextItem.addEventListener('click', () => {
      this.nextChart();
      listHeaderText.textContent = this.chartTypes[this.type];
    });
    controlWrapper.appendChild(prevItem);
    controlWrapper.appendChild(listHeaderText);
    controlWrapper.appendChild(nextItem);
    chartHeader.appendChild(controlWrapper);
    chartHeader.appendChild(switchWrapper);
    headerWrapper.classList.add('chart-header-wrapper');
    chartHeader.classList.add('chart-header');
    headerWrapper.appendChild(chartHeader);
    return headerWrapper;
  }

  async prevChart() {
    const switchButton = document.querySelector('#chart-selectBy');
    this.type -= 1;
    if (this.type < 0) {
      this.type = 2;
    }
    this.addCanvas();
    if (switchButton.checked) {
      this.chart = new ChartModel(this.data[this.type]);
    } else {
      this.chart = new ChartModel(this.data[`${this.chartTypes[this.type]}`]);
    }
    this.chart.createChart();
  }

  async nextChart() {
    const switchButton = document.querySelector('#chart-selectBy');
    this.type += 1;
    if (this.type > 2) {
      this.type = 0;
    }
    this.addCanvas();
    if (switchButton.checked) {
      this.chart = new ChartModel(this.data[this.type]);
    } else {
      this.chart = new ChartModel(this.data[`${this.chartTypes[this.type]}`]);
    }
    this.chart.createChart();
  }

  addCanvas = () => {
    document.querySelector('.chart-container-wrapper').innerHTML = '';
    document.querySelector('.chart-container-wrapper').appendChild(this.createCanvas());
  }

createCanvas = () => {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('id', 'chart');
  return canvas;
}

createChart() {
  const chartContainer = document.createElement('section');
  const chartWrapper = document.createElement('div');
  chartWrapper.classList.add('chart-container-wrapper');
  chartContainer.classList.add('chart-container');
  chartWrapper.appendChild(this.createCanvas());
  chartContainer.appendChild(this.createChartHeader());
  chartContainer.appendChild(chartWrapper);
  return chartContainer;
}

async initChart() {
  this.chartService.getNewCases();
  await this.chartService.getGlobalCases();
  const container = document.querySelector('.container');
  await this.chartDataHandler();
  container.appendChild(this.createChart());
  this.data = this.chartService.globalData;
  this.chart = new ChartModel(this.data.cases);
  this.chart.createChart();
}
}
