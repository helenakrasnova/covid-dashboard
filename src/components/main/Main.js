import Table from '../table/Table';
import List from '../list/List';
import CovidMap from '../covidMap/CovidMap';
import Chart from '../chart/Chart';

export default class Main {
  constructor() {
    this.table = new Table(this.onDateRangeClicked, this.onNumberFormatsClicked);
    this.covidMap = new CovidMap(this.onMapCountryClicked);
    this.list = new List('countries');
    this.state = {
      isAbsoluteValues: true,
      isLatestDay: false,
      currentCountry: null,
      distributionParam: null,
    };
    this.chart = new Chart(this.list.flags.listDataOrder, this.list.clickedCountry);
  }

  async init() {
    this.render();
    await Promise.all([
      this.table.init(),
      this.covidMap.render(
        this.state.isAbsoluteValues,
        this.state.isLatestDay,
        this.state.currentCountry,
      ),
      this.list.initList(),
      this.chart.initChart()]);
  }

  setState = (newState) => {
    this.state = { ...this.state, ...newState };
  }

  render = () => {
    const container = document.createElement('div');
    document.body.append(container);
    container.className = 'container';
  }

  onMapCountryClicked = async (countryName) => {
    this.setState({
      currentCountry: countryName,
    });
    await this.table.update(this.state.currentCountry);
  }

  onDateRangeClicked = async (value) => {
    this.setState({
      isLatestDay: value,
    });
    await this.covidMap.update(
      this.state.isAbsoluteValues,
      this.state.isLatestDay,
      this.state.currentCountry,
    );
  }

  onNumberFormatsClicked = async (value) => {
    this.setState({
      isAbsoluteValues: value,
    });
    await this.covidMap.update(
      this.state.isAbsoluteValues,
      this.state.isLatestDay,
      this.state.currentCountry,
    );
  }
}
