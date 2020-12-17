import TableRowModel from './TableRowModel';

export default class CovidMapModel extends TableRowModel {
  constructor(country, confirmed, recovered, deaths, countrySlug, lat, lon, coff) {
    super(country, confirmed, recovered, deaths, countrySlug);
    this.lat = lat;
    this.lon = lon;
    this.coff = coff;
  }
}
