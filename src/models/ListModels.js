export default class ListItemModelAllTime {
  constructor(country, confirmed, recovered, deaths, code) {
    this.country = country;
    this.confirmed = confirmed;
    this.recovered = recovered;
    this.deaths = deaths;
    this.countryCode = code;
  }
}

// export class ListItemModelPerDay {
//   constructor(country, newConfirmed, newRecovered, newDeaths, code) {
//     this.country = country;
//     this.newConfirmed = newConfirmed
//     this.newRecovered = newRecovered;
//     this.newDeaths = newDeaths;
//     this.countryCode = code;
//   }
// }
