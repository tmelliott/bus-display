import { router, publicProcedure } from "../trpc";

// read at_schema.json file
import path from "path";
import { writeFileSync } from "fs";
import { compileFromFile } from "json-schema-to-typescript";

const dir = path.join(process.cwd(), "src", "server", "trpc", "router");

// if running in dev mode, generate typescript types from json schema
if (process.env.NODE_ENV === "development")
  compileFromFile(dir + "/at_schema.json").then((ts) => {
    writeFileSync(dir + "/at_schema.d.ts", ts);
  });

export interface Trip {
  trip_id: string;
  route_id: string;
  direction_id: number;
  start_time: string;
  start_date: string;
  schedule_relationship: 0 | 1 | 2 | 3;
}
export interface Vehicle {
  id: string;
  label: string;
  license_plate: string;
}
export interface Position {
  latitude: number;
  longitude: number;
}
export interface StopTimeEvent {
  delay: number;
  time: number;
  uncertainty?: number;
}
export interface StopTimeUpdate {
  stop_sequence: number;
  stop_id: string;
  arrival: StopTimeEvent | undefined;
  departure: StopTimeEvent | undefined;
  schedule_relationship: 0 | 1 | 2;
}
export interface VehicleUpdate {
  id: string;
  trip?: Trip;
  vehicle: Vehicle;
  position: Position;
  occupancy_status: number;
  timestamp: number;
  trip_update?: TripUpdate;
}
export interface TripUpdate {
  trip: Trip;
  vehicle?: Vehicle;
  stop_time_update: StopTimeUpdate[] | StopTimeUpdate;
  timestamp: number;
}

export interface Entity {
  id: string;
  is_deleted: boolean;
  trip_update?: TripUpdate;
  vehicle?: VehicleUpdate;
}

export const atRouter = router({
  fetch: publicProcedure.query(async () => {
    const headers = {
      "Ocp-Apim-Subscription-Key": process.env.AT_API_KEY || "",
    };

    const data = await fetch("https://api.at.govt.nz/realtime/legacy/", {
      headers,
    });
    const res = await data.json();

    if (!res.response?.entity) return { entities: [] };

    // map over results and force it into a better format
    const entities: Entity[] = res.response.entity;

    return {
      entities,
    };
  }),
});
