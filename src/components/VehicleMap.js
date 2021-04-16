import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'

import mapboxgl from 'mapbox-gl/dist/mapbox-gl'
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker'

import * as d3 from 'd3'

mapboxgl.workerClass = MapboxWorker
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY

function VehicleMap({vehicles}) {
    const mapContainer = useRef()
    const [lng, setLng] = useState(174.860478)
    const [lat, setLat] = useState(-36.845794)
    const [zoom, setZoom] = useState(10)

    const [container, setContainer] = useState()
    const [map, setMap] = useState()
    const [svg, setSvg] = useState()
    const [data, setData] = useState([])

    useEffect(() => {
        console.log("-- set map --")
        setMap(
            new mapboxgl.Map({
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
        )

        // return () => map.remove()
    }, [])

    useEffect(() => {
        if (map === undefined) return
        console.log("-- set container --")
        map.on('load', () => {
            map.scrollZoom.disable()
            setContainer(map.getCanvasContainer())
        })
    }, [map])

    useEffect(() => {
        if (container === undefined) return
        console.log("-- set svg --")
        setSvg(
            d3.select(container)
                .append('svg')
                .attr("height", "100%")
                .attr("width", "100%")
                .style("position", "absolute")
                .style("z-index", "2")
                // .style("background", "pink")
        )

        return () => setSvg()
    }, [container])


    useEffect(() => {
        if (svg === undefined) return
        if (vehicles.length === 0) return
        console.log("-- set data --")
        setData(
            vehicles.map(v => ({
                id: v.key,
                pos: map.project(
                    new mapboxgl.LngLat(
                        v.position.longitude,
                        v.position.latitude
                    )
                ),
            }))
        )
    }, [svg, vehicles])

    useEffect(() => {
        if (data.length === 0) return

        console.log("-- set data points --")
        let circles = svg
            .selectAll('circle')
            .data(data, d => d.id)

        circles.exit()
            .style('fill', 'green')
            // .transition()
            // .duration(500)
            // .attr('r', 0)
            // .remove()

        circles.enter()
            .append('circle')
            .style('fill', 'red')
            .attr('r', 0)
            .attr('cx', d => d.pos.x)
            .attr('cy', d => d.pos.y)
            .transition()
            .duration(500)
            .attr('r', 5)

        circles.transition()
            .duration(20 * 1000)
            .attr('cx', d => d.pos.x)
            .attr('cy', d => d.pos.y)
            .style('fill', 'blue')
            // .transition()
            // .duration(500)
            // .attr('r', 5)

        return () => svg.selectAll('circle').data([])
    }, [data, svg])

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
