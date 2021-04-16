import { useEffect, useState } from 'react';
import styled from 'styled-components';

import './App.css'
import VehicleMap from './components/VehicleMap';

function App() {

  const [fetching, setFetching] = useState(false)
  const [feed, setFeed] = useState([])
  const [vehicles, setVehicles] = useState([])

  const fetchData = () => {
    if (fetching) return
    console.log(" --- fetch data --- ")
    setFetching(true)
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
      .then(() => setFetching(false))

      return () => setFetching(false)
  }

  // Run when the app loads:
  useEffect(() => {
    fetchData()
    let interval = setInterval(() => fetchData(), 30 * 1000)

    return () => clearInterval(interval)
  }, [])

  // Run when the feed changes:
  useEffect(() => {
    setVehicles(
      feed.filter(f => f.vehicle && !f.is_deleted && f.vehicle.position)
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
  }, [vehicles])

  return (
    <Container>
      <VehicleMap vehicles={vehicles} />
    </Container>
  );
}

export default App

const Container = styled.div``
