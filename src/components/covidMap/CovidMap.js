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
    const container = document.querySelector('.container');
    const mapDiv = document.createElement('div');
    mapDiv.id = 'covidMap';
    container.append(mapDiv);
    const southWest = L.latLng(-89.98155760646617, -180);
    const northEast = L.latLng(89.99346179538875, 180);
    const bounds = L.latLngBounds(southWest, northEast);
    const mapOptions = {
      center: [30, 10],
      zoom: 1.5,
      maxBoundsViscosity: 1.0,
      maxBounds: bounds,
    };
    // eslint-disable-next-line new-cap
    const covidMap = new L.map('covidMap', mapOptions);
    const layer = new L.TileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png');
    covidMap.addLayer(layer);
    const tableData = await this.tableService.get(true, false);
    for (let i = 0; i < tableData.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const covidMapData = await this.covidMapService.getCovidMapData(tableData[i]);
      if (covidMapData.lat && covidMapData.lon) {
        const circleCenter = [covidMapData.lat, covidMapData.lon];
        // const totallyConfirmed = covidMapData.confirmed;
        // const opacity = totallyConfirmed;
        let circleColor = '';
        if (covidMapData.confirmed > 1000000) {
          circleColor = '#800026';
        } else if (covidMapData.confirmed > 500000) {
          circleColor = '#BD0026';
        } else if (covidMapData.confirmed > 100000) {
          circleColor = '#E31A1C';
        } else if (covidMapData.confirmed > 50000) {
          circleColor = '#FC4E2A';
        } else if (covidMapData.confirmed > 10000) {
          circleColor = '#FD8D3C';
        } else if (covidMapData.confirmed > 5000) {
          circleColor = '#FEB24C';
        } else if (covidMapData.confirmed > 1000) {
          circleColor = '#FED976';
        } else {
          circleColor = '#FFEDA0';
        }
        const circleOptions = {
          // color: 'red',
          color: circleColor,
          fillColor: circleColor,
          fillOpacity: 1.0,
        };
        // const circleSize = covidMapData.confirmed / 100;
        const circle = L.circle(circleCenter,
          50000,
          //  circleSize,
          circleOptions);
        circle.addTo(covidMap);
      }
    }
  }
}
