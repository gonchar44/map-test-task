import { Library } from '@googlemaps/js-api-loader'

export const mapLibraries: Library[] = ['core', 'maps', 'places', 'marker']

export const mapOptions: google.maps.MapOptions = {
  center: {
    lat: 55.647291324906334,
    lng: 12.285111990678741
  },
  zoom: 17,
  mapId: 'TEST-MAP-ID'
}
