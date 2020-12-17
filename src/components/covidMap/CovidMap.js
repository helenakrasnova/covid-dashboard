import * as L from 'leaflet';
import CovidMapService from '../../services/CovidMapService';
import TableService from '../../services/TableService';
// import 'leaflet/dist/leaflet.css';

export default class CovidMap {
  constructor() {
    this.covidMapService = new CovidMapService();
    this.tableService = new TableService();
  }

  async render() {
    const mapOptions = {
      center: [0, 0],
      zoom: 10,
    };
    // eslint-disable-next-line new-cap
    const covidMap = new L.map('covidMap', mapOptions);
    const layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    covidMap.addLayer(layer);

    const tableData = await this.tableService.get(true, false);
    for (let i = 0; i < tableData.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const covidMapData = await this.covidMapService.getCovidMapData(tableData[i]);
      if (covidMapData.lat && covidMapData.lon) {
        const circleCenter = [covidMapData.lat, covidMapData.lon];
        const circleOptions = {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 1,
        };
        const circle = L.circle(circleCenter, 50000, circleOptions);
        circle.addTo(covidMap);
      }
    }
  }
}
