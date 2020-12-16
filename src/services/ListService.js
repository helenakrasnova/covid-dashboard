export default class ListService {
  constructor() {
    this.baseUrl = 'https://api.covid19api.com';
  }

  async getTotalCases() {
    const result = await this.sendRequest();
    const total = result.Countries.map((item) => item);
    return total;
  }

  async sendRequest() {
    const result = await fetch(`${this.baseUrl}/summary`);
    const covidInfo = await result.json();
    return covidInfo;
  }
}
