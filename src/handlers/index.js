import GeolocHandler from './geoloc'

export default (models) => {
    return {
        GeolocHandler: GeolocHandler(models)
    }
}
