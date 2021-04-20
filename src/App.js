import { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3'

import './App.css'
import VehicleMap from './components/VehicleMap';
import BarChart from './components/BarChart';
import InfoPanel from './components/InfoPanel';

function App() {

  // Timing information:
  const refresh_rate = 20

  const [feed, setFeed] = useState([])
  const [vehicles, setVehicles] = useState([])
  const [occupancyTable, setOccupancyTable] = useState([])
  const [delaysTable, setDelaysTable] = useState([])


  const specPal = [...d3.schemeSpectral[5], '#cecece'].reverse()
  const occupancyPalette = [specPal[0], specPal[1], specPal[2], specPal[3], specPal[4], specPal[4], specPal[5], specPal[5]]
  const delayPalette = ['#95a5a6', '#3c42a5', '#28aebb', '#26d926', '#f39c12', '#d35400', 'red', '#990000']
  const delayMapFn = (d) => {
    if (d === undefined) return 0
    if (d <= -300) return 1
    if (d <= -60) return 2
    if (d <= 300) return 3
    if (d <= 600) return 4
    if (d <= 1200) return 5
    if (d <= 1800) return 6
    return 7
  }

  // Run when the app loads:
  useEffect(() => {
    let fetching = false

    const fetchData = () => {
      if (fetching) return
      console.log(" --- fetch data --- ")
      fetching = true

      const headers = {
        "Ocp-Apim-Subscription-Key": process.env.REACT_APP_AT_API_KEY,
      }

      fetch("https://api.at.govt.nz/v2/public/realtime/", { headers })
        .then(response => {
          if (response.ok) {
            return response.json()
          }
          // console.log(response)
        })
        .then(data => setFeed(data.response.entity))
        .then(() => {
          fetching = false
        })

      return () => {
        fetching = false
      }
    }

    fetchData()
    let interval = setInterval(() => fetchData(), refresh_rate * 1000)

    return () => clearInterval(interval)
  }, [])

  // Run when the feed changes:
  useEffect(() => {
    setVehicles(
      feed
        .filter(
          f => !f.is_deleted &&
            f.vehicle &&
            f.vehicle.trip &&
            f.vehicle.timestamp > (Date.now() / 1000 - 5 * 60) &&
            f.vehicle.position &&
            f.vehicle.position.latitude > -38 &&
            f.vehicle.position.latitude < -36 &&
            f.vehicle.position.longitude > 174 &&
            f.vehicle.position.longitude < 176
        )
        .map(
          f => {
            let ft = feed.filter(
              f2 =>
                f2.trip_update &&
                f2.trip_update.vehicle?.id === f.vehicle.vehicle.id
            )
            return {
              ...f.vehicle,
              key: f.vehicle.vehicle.id,
              trip_update: ft[0]?.trip_update,
            }
          }
        )
    )
  }, [feed])

  useEffect(() => {
    // console.log(vehicles)
    // create occupancy table
    let occ = vehicles.map(v => v.occupancy_status === undefined ? 0 : v.occupancy_status + 1)
    let tbl = new Array(8).fill(0)
    for (let i=0;i<occ.length;i++) {
      tbl[occ[i]]++
    }
    setOccupancyTable([
      {'label': 'No data', 'count': tbl[0], 'colour': occupancyPalette[0]},
      {'label': 'Empty', 'count': tbl[1], 'colour': occupancyPalette[1]},
      {'label': 'Many seats', 'count': tbl[2], 'colour': occupancyPalette[2]},
      {'label': 'Few seats', 'count': tbl[3], 'colour': occupancyPalette[3]},
      {'label': 'Standing room only', 'count': tbl[4] + tbl[5], 'colour': occupancyPalette[4]},
      // {'label': 'Crushed standing room only', 'count': tbl[5], 'colour': occupancyPalette[5]},
      {'label': 'Full / Not accepting passengers', 'count': tbl[6] + tbl[7], 'colour': occupancyPalette[6]}, // NOTE change index if uncommenting other rows
      // {'label': 'Not accepting passengers', 'count': tbl[7], 'colour': occupancyPalette[7]},
    ])

    let delays = vehicles.map(v => {
      if (v.trip_update === undefined || v.trip_update.stop_time_update === undefined) return
      return v.trip_update.stop_time_update.arrival ?
        v.trip_update.stop_time_update.arrival.delay :
        v.trip_update.stop_time_update.departure.delay
    })

    tbl = new Array(8).fill(0)
    for (let i=0;i<delays.length;i++) {
      let di = delayMapFn(delays[i])
      tbl[di]++
    }

    setDelaysTable([
      {'label': 'No data', 'count': tbl[0], 'colour': delayPalette[0]},
      {'label': '>5m early', 'count': tbl[1], 'colour': delayPalette[1]},
      {'label': '1-5m early', 'count': tbl[2], 'colour': delayPalette[2]},
      {'label': 'On time', 'count': tbl[3], 'colour': delayPalette[3]},
      {'label': '5-10m late', 'count': tbl[4], 'colour': delayPalette[4]},
      {'label': '10-20m late', 'count': tbl[5], 'colour': delayPalette[5]},
      {'label': '20-30m late', 'count': tbl[6], 'colour':delayPalette[6]},
      {'label': '30+m late', 'count': tbl[7], 'colour': delayPalette[7]},
    ])

  }, [vehicles])

  return (
    <Container>
      <VehicleMap
        vehicles={vehicles}
        refresh={(refresh_rate - 1) * 1000}
        palette={occupancyPalette}
        cvar={(v) => v.occupancy_status}
        // palette={delayPalette}
        // cvar={(v) => {
        //   let d = v.trip_update?.stop_time_update?.arrival ?
        //     v.trip_update?.stop_time_update?.arrival.delay :
        //     v.trip_update?.stop_time_update?.departure.delay
        //   return delayMapFn(d)
        // }}
        />

      <Title>
        <h1>Real-time Public Transport Data</h1>
        <h2>Vehicle Occupancy in Central Auckland</h2>
      </Title>

      <Charts>
        <InfoPanel
          total={vehicles.length}
          refresh={refresh_rate}
        />

        <BarChart data={occupancyTable}
          xlab="Occupancy Status"
          />
        <BarChart data={delaysTable}
          xlab="Arrival and Departure Delays"
          />
      </Charts>
    </Container>
  );
}

export default App

const Container = styled.div``

const Charts = styled.div`
  position: fixed;
  z-index: 5;
  top: 2em;
  right: 2em;
  bottom: 2em;
  width: 30em;
  padding: 1em 2em;
  background: rgba(0,0,0,0.7);
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  box-shadow: 5px 3px 10px 5px rgba(0,0,0,0.4);
  border-radius: 5px;
`

const Title = styled.div`
  position: fixed;
  z-index: 10;
  top: 1em;
  left: 0em;
  color: black;
  padding: 1em 3em;
  width: 50vw;
  text-align: right;
  background: rgba(255,255,255,0.8);
  box-shadow: 5px 3px 10px 10px rgba(0,0,0,0.4);
  border-radius: 0 3px 3px 0;

  h1 {
    font-size: 45px;
  }
  h2 {
    font-size: 30px;
    font-style: italic;
  }
`
