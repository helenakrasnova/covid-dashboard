import ListItemModelAllTime from '../models/ListModels';
import ListItemModelPerDay from '../models/ListModels';

export default class ListService {
  constructor() {
    this.dayData = [];
    this.globalData = [];
    this.populationCoefData = [];
    this.allCases = 0;
    this.baseUrl = 'https://api.covid19api.com';
  }

  async getTotalCases() {
    const result = await this.sendRequest();
    this.allCases = result.Global;
    const total = result.Countries.map((item) => {
      const listItem = new ListItemModelAllTime(
        item.Country, item.TotalConfirmed, item.TotalRecovered, item.TotalDeaths, item.CountryCode,
      );
      return listItem;
    });
    this.globalData = total;
    return total;
  }

  async getOneDayCases() {
    const result = await this.sendRequest();
    const total = result.Countries.map((item) => {
      const listItem = new ListItemModelPerDay(
        item.Country, item.NewConfirmed, item.NewRecovered, item.NewDeaths, item.CountryCode,
      );
      return listItem;
    });

    this.dayData = total;
    return total;
  }

  async getPopulationData() {
    const request = await fetch(`${this.baseUrl}/premium/summary`, {
      headers: {
        'X-Access-Token': '5cf9dfd5-3449-485e-b5ae-70a60e997864',
      },
    });
    const result = await request.json();
    const total = result.Countries.map((item) => {
      const listItem = new ListItemModelPerDay(
        item.Country,
        Math.trunc(item.IncidenceRiskConfirmedPerHundredThousand),
        Math.trunc(item.IncidenceRiskNewConfirmedPerHundredThousand),
        Math.trunc(item.IncidenceRiskDeathsPerHundredThousand),
        item.CountryISO,
      );
      return listItem;
    });
    this.populationCoefData = total;
    return total;
  }

  async sendRequest() {
    this.getPopulationData();
    const result = await fetch(`${this.baseUrl}/summary`);
    const covidInfo = await result.json();
    return covidInfo;
  }
}
