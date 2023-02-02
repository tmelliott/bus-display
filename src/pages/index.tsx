import { type NextPage } from "next";
import Head from "next/head";

import { useEffect, useState } from "react";
import styled from "styled-components";
import * as d3 from "d3";
import VehicleMap from "../components/VehicleMap";
import InfoPanel from "../components/InfoPanel";
import BarChart, { TableType } from "../components/BarChart";
import { trpc } from "../utils/trpc";
import {
  StopTimeUpdate,
  TripUpdate,
  VehicleUpdate,
} from "../server/trpc/router/at";

const Home: NextPage = () => {
  // Timing information:
  const refresh_rate = 20;

  // const [feed, setFeed] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<VehicleUpdate[]>([]);
  const [tripUpdates, setTripUpdates] = useState<TripUpdate[]>([]);
  const [occupancyTable, setOccupancyTable] = useState<TableType[]>([]);
  const [delaysTable, setDelaysTable] = useState<TableType[]>([]);

  const { data: feed } = trpc.at.fetch.useQuery();

  const d3spectral = d3.schemeSpectral[5] || [];

  const specPal = [...d3spectral, "#cecece"].reverse();
  const occupancyPalette = [
    specPal[0],
    specPal[1],
    specPal[2],
    specPal[3],
    specPal[4],
    specPal[4],
    specPal[5],
    specPal[5],
  ];
  const delayPalette = [
    "#95a5a6",
    "#3c42a5",
    "#28aebb",
    "#26d926",
    "#f39c12",
    "#d35400",
    "red",
    "#990000",
  ];
  const delayMapFn = (d: number | undefined) => {
    if (d === undefined) return 0;
    if (d <= -300) return 1;
    if (d <= -60) return 2;
    if (d <= 300) return 3;
    if (d <= 600) return 4;
    if (d <= 1200) return 5;
    if (d <= 1800) return 6;
    return 7;
  };

  // Run when the app loads:
  // useEffect(() => {
  //   let fetching = false;

  //   const fetchData = () => {
  //     if (fetching) return;
  //     console.log(" --- fetch data --- ");
  //     fetching = true;

  //     const headers = {
  //       "Ocp-Apim-Subscription-Key": process.env.NEXT_PUBLIC_AT_API_KEY || "",
  //     };

  //     fetch("https://api.at.govt.nz/v2/public/realtime/", { headers })
  //       .then((response) => {
  //         if (response.ok) {
  //           return response.json();
  //         }
  //         // console.log(response)
  //       })
  //       .then((data) => setFeed(data.response.entity))
  //       .then(() => {
  //         fetching = false;
  //       });

  //     return () => {
  //       fetching = false;
  //     };
  //   };

  //   fetchData();
  //   let interval = setInterval(() => fetchData(), refresh_rate * 1000);

  //   return () => clearInterval(interval);
  // }, []);

  // Run when the feed changes:
  useEffect(() => {
    if (!feed) return;

    const vehicles: VehicleUpdate[] = feed.entities
      .filter((f) => {
        if (f.is_deleted) return false;
        if (!("vehicle" in f)) return false;
        return f.vehicle;
      })
      .map((f) => f.vehicle as VehicleUpdate);

    const tripupdates: TripUpdate[] = feed.entities
      .filter((f) => {
        if (f.is_deleted) return false;
        if (!("trip_update" in f)) return false;
        return f.trip_update;
      })
      .map((f) => f.trip_update as TripUpdate);

    setVehicles(
      vehicles
        .filter((v) => {
          return (
            v &&
            v.timestamp &&
            v.timestamp > Date.now() / 1000 - 5 * 60 &&
            v.position &&
            v.position.latitude &&
            v.position.latitude > -38 &&
            v.position.latitude < -36 &&
            v.position.longitude &&
            v.position.longitude > 174 &&
            v.position.longitude < 176
          );
        })
        .map((v) => {
          // if (!("vehicle" in v)) return;
          if (!v.vehicle) return;
          if (!v.vehicle.id) return;

          const ft = tripupdates.filter(
            (tu) => tu.vehicle?.id === v.vehicle.id
          );
          return {
            ...v,
            key: v.vehicle?.id,
            trip_update: ft.length ? ft[0] : undefined,
          };
        }) as VehicleUpdate[]
    );

    setTripUpdates(tripupdates);
  }, [feed]);

  useEffect(() => {
    // create occupancy table
    let occ = vehicles.map((v) =>
      v.occupancy_status === undefined ? 0 : v.occupancy_status + 1
    );
    let tbl = new Array(8).fill(0);
    for (let i = 0; i < occ.length; i++) {
      const oi = occ[i];
      if (oi) tbl[oi]++;
    }
    setOccupancyTable([
      {
        label: "No data",
        count: tbl[0],
        colour: occupancyPalette[0],
      },
      { label: "Empty", count: tbl[1], colour: occupancyPalette[1] },
      {
        label: "Many seats",
        count: tbl[2],
        colour: occupancyPalette[2],
      },
      {
        label: "Few seats",
        count: tbl[3],
        colour: occupancyPalette[3],
      },
      {
        label: "Standing room only",
        count: tbl[4] + tbl[5],
        colour: occupancyPalette[4],
      },
      // {'label': 'Crushed standing room only', 'count': tbl[5], 'colour': occupancyPalette[5]},
      {
        label: "Full / Not accepting passengers",
        count: tbl[6] + tbl[7],
        colour: occupancyPalette[6],
      }, // NOTE change index if uncommenting other rows
      // {'label': 'Not accepting passengers', 'count': tbl[7], 'colour': occupancyPalette[7]},
    ]);
  }, [vehicles]);

  useEffect(() => {
    if (tripUpdates.length === 0) return;

    let delays = tripUpdates.map((tu) => {
      if (!tu || !tu.stop_time_update) return;
      console.log(typeof tu.stop_time_update);
      let stu = tu.stop_time_update;
      if (Array.isArray(stu)) stu = stu[0] as StopTimeUpdate;

      if (stu.arrival) return stu.arrival.delay;
      if (stu.departure) return stu.departure.delay;
      return 0;
    });

    const tbl = new Array(8).fill(0);
    for (let i = 0; i < delays.length; i++) {
      let di = delayMapFn(delays[i]);
      tbl[di]++;
    }

    setDelaysTable([
      { label: "No data", count: tbl[0], colour: delayPalette[0] },
      { label: ">5m early", count: tbl[1], colour: delayPalette[1] },
      { label: "1-5m early", count: tbl[2], colour: delayPalette[2] },
      { label: "On time", count: tbl[3], colour: delayPalette[3] },
      { label: "5-10m late", count: tbl[4], colour: delayPalette[4] },
      { label: "10-20m late", count: tbl[5], colour: delayPalette[5] },
      { label: "20-30m late", count: tbl[6], colour: delayPalette[6] },
      { label: "30+m late", count: tbl[7], colour: delayPalette[7] },
    ]);
  }, [tripUpdates]);

  return (
    <>
      <Head>
        <title></title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      g{" "}
      <div>
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

        <div className="fixed top-4 left-0 z-20 w-[50vw] rounded-r bg-white bg-opacity-80 py-4 px-12 text-right font-bold text-black shadow-xl">
          <h1 className="pb-2 text-5xl">Real-time Public Transport Data</h1>
          <h2 className="text-3xl italic">
            Vehicle Occupancy in Central Auckland
          </h2>
        </div>

        <div className="fixed top-8 right-8 bottom-8 z-50 flex w-[30em] flex-col rounded bg-black bg-opacity-80 px-8 py-4 shadow-xl">
          <InfoPanel total={vehicles.length} refresh={refresh_rate} />

          <BarChart data={occupancyTable} xlab="Occupancy Status" />
          <BarChart data={delaysTable} xlab="Arrival and Departure Delays" />
        </div>
      </div>
    </>
  );
};

export default Home;
