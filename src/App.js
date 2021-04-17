import { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3'

import './App.css'
import VehicleMap from './components/VehicleMap';
import BarChart from './components/BarChart';
import InfoPanel from './components/InfoPanel';

function App() {

  // Timing information:
  const refresh_rate = 30

  const [feed, setFeed] = useState([])
  const [vehicles, setVehicles] = useState([])
  const [occupancyTable, setOccupancyTable] = useState([])
  const [delaysTable, setDelaysTable] = useState([])


  const specPal = [...d3.schemeSpectral[7], '#cecece']
  const occupancyPalette = specPal.reverse()

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
          console.log(response)
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
          f => f.vehicle && !f.is_deleted &&
            f.vehicle.position
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
    // create occupancy table
    let occ = vehicles.map(v => v.occupancy_status === undefined ? 0 : v.occupancy_status + 1)
    let tbl = new Array(8).fill(0)
    for (let i=0;i<occ.length;i++) {
      tbl[occ[i]]++
    }
    setOccupancyTable([
      {'label': 'Unknown', 'count': tbl[0], 'colour': occupancyPalette[0]},
      {'label': 'Empty', 'count': tbl[1], 'colour': occupancyPalette[1]},
      {'label': 'Many seats', 'count': tbl[2], 'colour': occupancyPalette[2]},
      {'label': 'Few seats', 'count': tbl[3], 'colour': occupancyPalette[3]},
      {'label': 'Standing room only', 'count': tbl[4], 'colour': occupancyPalette[4]},
      {'label': 'Crushed standing room only', 'count': tbl[5], 'colour': occupancyPalette[5]},
      {'label': 'Full', 'count': tbl[6], 'colour': occupancyPalette[6]},
      {'label': 'Not accepting passengers', 'count': tbl[7], 'colour': occupancyPalette[7]},
    ])

    let delays = vehicles.map(v => {
      if (v.trip_update === undefined) return
      return v.trip_update.stop_time_update.arrival ?
        v.trip_update.stop_time_update.arrival.delay :
        v.trip_update.stop_time_update.departure.delay
    })

    tbl = new Array(8).fill(0)
    console.log(delays)
    for (let i=0;i<delays.length;i++) {
      if (delays[i] === undefined) tbl[0]++
      else if (delays[i] <= -300) tbl[1]++
      else if (delays[i] <= 60) tbl[2]++
      else if (delays[i] >= 300) tbl[3]++
      else if (delays[i] >= 600) tbl[4]++
      else if (delays[i] >= 1200) tbl[5]++
      else if (delays[i] >= 1800) tbl[6]++
      else tbl[7]++
    }
    setDelaysTable([
      {'label': 'No data', 'count': tbl[0], 'colour': '#95a5a6'},
      {'label': '>5m early', 'count': tbl[1], 'colour': '#3c42a5'},
      {'label': '1-5m early', 'count': tbl[2], 'colour': '#28aebb'},
      {'label': 'On time', 'count': tbl[3], 'colour': '#26d926'},
      {'label': '5-10m late', 'count': tbl[4], 'colour': '#f39c12'},
      {'label': '10-20m late', 'count': tbl[5], 'colour': '#d35400'},
      {'label': '20-30m late', 'count': tbl[6], 'colour': 'red'},
      {'label': '30+m late', 'count': tbl[7], 'colour': '#990000'},
    ])

  }, [vehicles])



  // useEffect(() => {
  //   console.log(occupancyTable)
  // }, [occupancyTable])

  return (
    <Container>
      <VehicleMap vehicles={vehicles}
        refresh={(refresh_rate - 5) * 1000}
        palette={occupancyPalette}
        />

      <InfoPanel />

      <Charts>
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
`
