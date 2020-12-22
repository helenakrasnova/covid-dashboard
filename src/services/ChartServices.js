export default class ChartService {
  constructor() {
    this.dayData = [];
    this.globalData = [];
    this.populationCoefData = [];
    this.allData = [];
    this.newCases = [];
    this.baseUrl = 'https://disease.sh/v3/covid-19/historical/all?lastdays=all';
  }

  async getGlobalCases() {
    const result = await this.sendRequest();
    this.globalData = result;

    // const country = new ChartModel(
    //   item.Country, item.TotalConfirmed, item.TotalRecovered, item.TotalDeaths, item.CountryCode,
    // );
    // return country;
    return result;
  }

  async getNewCases() {
    const result = await this.sendRequest('https://corona-api.com/timeline');
    this.newCases.push(Object.fromEntries(result.data.filter(filterItem => filterItem.date !== '2020-12-11').map((item) => {
      const arr = [item.date, item.new_confirmed];
      return arr;
    }).reverse().slice(0, -1)));

    this.newCases.push(Object.fromEntries(result.data.map((item) => {
      const arr = [item.date, item.new_deaths];
      return arr;
    }).reverse().slice(0, -1)));
    const newRec = result.data.filter(filterItem => filterItem.date !== '2020-12-12' && filterItem.date !== '2020-10-31').map((item) => {
      const arr = [item.date, item.new_recovered];
      return arr;
    }).reverse().slice(0, -1);
    //  console.log(newRec);
    this.newCases.push(Object.fromEntries(newRec));

  }

  async getOneDayCountryCases() {
    const result = await this.sendRequest('https://disease.sh/v3/covid-19/historical?lastdays=all');
    const total = result.filter((item) => item.province === null);
    this.dayData = total;
    return total;
  }

  async sendRequest(url = this.baseUrl) {
    const result = await fetch(url);
    const covidInfo = await result.json();
    this.allData = covidInfo;
    return covidInfo;
  }
}
