import * as L from 'leaflet';
import CovidMapService from '../../services/CovidMapService';
import TableService from '../../services/TableService';
// import 'leaflet/dist/leaflet.css';

export default class CovidMap {
  constructor() {
    this.covidMapService = new CovidMapService();
    this.tableService = new TableService();
    this.cachedMapData = null;
    this.legendValues = [0, 1000, 5000, 10000, 50000, 100000, 500000, 1000000];
  }

  createMap = () => {
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
    return covidMap;
  }

  async render() {
    const covidMap = this.createMap();
    const tableData = await this.tableService.get(true, false);
    for (let i = 0; i < tableData.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const covidMapData = await this.covidMapService.getCovidMapData(tableData[i]);
      const circle = this.createCircle(covidMapData);
      if (circle) {
        circle.addTo(covidMap);
      }
    }
    const legend = this.createLegend();
    legend.addTo(covidMap);
  }

  createCircle = (covidMapData) => {
    if (covidMapData.lat && covidMapData.lon) {
      const circleCenter = [covidMapData.lat, covidMapData.lon];
      const circleColor = this.getCircleColor(covidMapData.confirmed);
      const circleOptions = {
        color: circleColor,
        fillColor: circleColor,
        fillOpacity: 1.0,
      };
      const circle = L.circle(circleCenter, 50000, circleOptions)
        .bindPopup(`${covidMapData.country} confirmed - ${covidMapData.confirmed}`).openPopup();
      return circle;
    }
    return null;
  }

  getCircleColor = (value) => {
    let circleColor = '';
    if (value > this.legendValues[7]) {
      circleColor = '#800026';
    } else if (value > this.legendValues[6]) {
      circleColor = '#BD0026';
    } else if (value > this.legendValues[5]) {
      circleColor = '#E31A1C';
    } else if (value > this.legendValues[4]) {
      circleColor = '#FC4E2A';
    } else if (value > this.legendValues[3]) {
      circleColor = '#FD8D3C';
    } else if (value > this.legendValues[2]) {
      circleColor = '#FEB24C';
    } else if (value > this.legendValues[1]) {
      circleColor = '#FED976';
    } else {
      circleColor = '#FFEDA0';
    }
    return circleColor;
  }

  createLegend = () => {
    const legend = L.control({ position: 'bottomright' });
    legend.onAdd = () => {
      const legendInfo = L.DomUtil.create('div', 'info legend');
      for (let i = 0; i < this.legendValues.length; i++) {
        legendInfo.innerHTML += `<i style="background:${this.getCircleColor(this.legendValues[i] + 1)}"></i> ${this.legendValues[i]}${this.legendValues[i + 1] ? ` - ${this.legendValues[i + 1]}<br>` : '+'}`;
      }
      return legendInfo;
    };
    return legend;
  }
}
