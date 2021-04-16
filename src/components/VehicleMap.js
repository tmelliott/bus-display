import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'

import mapboxgl from 'mapbox-gl/dist/mapbox-gl'
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker'

mapboxgl.workerClass = MapboxWorker
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY

function VehicleMap({vehicles}) {
    const mapContainer = useRef()
    const [lng, setLng] = useState(174.860478)
    const [lat, setLat] = useState(-36.845794)
    const [zoom, setZoom] = useState(10)

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            // style: 'mapbox://styles/mapbox/dark-v10',
            style: {
                'version': 8,
                'sources': {
                    'raster-tiles': {
                        'type': 'raster',
                        'tiles': [
                            'https://abcd.basemaps.cartocdn.com/rastertiles/dark_nolabels/{z}/{x}/{y}.png'
                        ],
                        'tileSize': 256,
                    }
                },
                layers: [
                    {
                        'id':  'simple-tiles',
                        'type': 'raster',
                        'source': 'raster-tiles',
                        'minzoom': 0,
                        'maxzoom': 22
                    }
                ],
            },
            center: [lng, lat],
            zoom: zoom
        })
        map.scrollZoom.disable()
    }, [])

    return (
        <Container>
            <Map ref={mapContainer} />
            {/* <Vehicles>
                {vehicles.map(v => (
                <Vehicle key={v.key}>
                    {v?.trip_update?.delay}
                </Vehicle>
                ))}
            </Vehicles> */}
        </Container>
    )
}

export default VehicleMap

const Container = styled.div``

const Map = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: #262626;
`

const Vehicles = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`

const Vehicle = styled.div`
  display: inline-block;
  height: 20px;
  width: 50px;
  font-size: 10px;
  background: pink;
  margin: 1em;
  text-align: center;
  line-height: 20px;
`
