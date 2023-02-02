import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

// import mapboxgl from "mapbox-gl/dist/mapbox-gl";
// eslint-disable-next-line import/no-webpack-loader-syntax
// import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";

import * as d3 from "d3";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

type VehicleMapProps = {
  vehicles: any;
  refresh: number;
  palette: (string | undefined)[];
  cvar: (v: any) => number;
};

function VehicleMap({ vehicles, refresh, palette, cvar }: VehicleMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [lng] = useState(174.812378);
  const [lat] = useState(-36.845794);
  const [zoom] = useState(12);

  const [container, setContainer] = useState<HTMLElement>();
  const [map, setMap] = useState<mapboxgl.Map>();
  const svgRef = useRef<SVGSVGElement>(null);
  //   const [svg, setSvg] = useState<SVGSVGElement | unknown | null | undefined>();
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("-- set map --");
    if (mapContainer.current === null) return;
    setMap(
      new mapboxgl.Map({
        container: mapContainer.current,
        style: {
          version: 8,
          sources: {
            "raster-tiles": {
              type: "raster",
              tiles: [
                "https://abcd.basemaps.cartocdn.com/rastertiles/dark_nolabels/{z}/{x}/{y}.png",
              ],
              tileSize: 256,
            },
          },
          layers: [
            {
              id: "simple-tiles",
              type: "raster",
              source: "raster-tiles",
              minzoom: 0,
              maxzoom: 22,
            },
          ],
        },
        center: [lng, lat],
        zoom: zoom,
      })
    );

    // return () => map.remove()
  }, [mapContainer, lat, lng, zoom]);

  useEffect(() => {
    if (map === undefined) return;
    console.log("-- set container --");
    map.on("load", () => {
      map.scrollZoom.disable();
      setContainer(map.getCanvasContainer());
    });
  }, [map]);

  useEffect(() => {
    if (container === undefined) return;
    console.log("-- set svg --");
    // setSvg(
    d3.select(svgRef.current)
      // .append("svg")
      .attr("height", "100%")
      .attr("width", "100%")
      .style("position", "absolute")
      .style("z-index", "2");
    // .style("background", "pink")
    // );

    // return () => setSvg(null);
  }, [container]);

  useEffect(() => {
    if (!svgRef) return;
    if (vehicles.length === 0) return;
    if (map === undefined) return;
    setData(
      vehicles
        .map((v: any) => ({
          id: v.key,
          pos: map.project(
            new mapboxgl.LngLat(v.position.longitude, v.position.latitude)
          ),
          // occ_stat: cvar(v),
          status: cvar(v) === undefined ? 0 : cvar(v) + 1,
        }))
        .sort((a: any, b: any) => a.status - b.status)
    );
  }, [svgRef, vehicles, map]);

  useEffect(() => {
    if (data.length === 0) return;
    // console.log(data)

    console.log("-- set data points --");
    let circles = d3
      .select(svgRef.current)
      .selectAll("circle")
      .data(data, (d: any) => d.id);

    circles.exit().transition().duration(500).attr("r", 0).remove();

    circles
      .enter()
      .append("circle")
      .style("fill", (d: any) => palette[d.status])
      .attr("r", 0)
      .attr("cx", (d: any) => d.pos.x)
      .attr("cy", (d: any) => d.pos.y)
      .transition()
      .duration(500)
      .attr("r", 5);

    circles
      .transition()
      .ease(d3.easeLinear)
      .duration(refresh)
      .attr("cx", (d: any) => d.pos.x)
      .attr("cy", (d: any) => d.pos.y)
      .style("fill", (d: any) => palette[d.status]);

    return () => {
      d3.select(svgRef.current).selectAll("circle").data([]);
    };
  }, [data, svgRef, map, palette, refresh]);

  return (
    <div>
      <div
        className="fixed top-0 left-0 z-10 h-screen w-screen bg-gray-800"
        ref={mapContainer}
      ></div>
      <div className="fixed top-0 left-0 z-20 h-screen w-screen">
        <svg ref={svgRef}></svg>
      </div>
    </div>
  );
}

export default VehicleMap;
