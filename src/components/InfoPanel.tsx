import styled from "styled-components";

type InfoPanelProps = {
  total: number;
  refresh: number;
};

function InfoPanel({ total, refresh }: InfoPanelProps) {
  return (
    <div className="flex w-full flex-col gap-8 text-lg text-white">
      <div className="flex flex-col gap-4">
        <p>
          <strong>Real-time vehicle locations</strong> of buses and trains are
          obtained from Auckland Transport's public API. The data on the map is
          updated once every <strong>{refresh} seconds</strong>. Animations are
          interpolated between consecutive locations (so don't worry if you see
          a bus swimming in the Waitematā).
        </p>
        <p>
          Map points are coloured by the bus's <strong>occupancy status</strong>
          , which indicates the number of passengers on board.
        </p>
      </div>

      <div className="text-2xl">
        <div className="flex">
          <label className="w-1/2 pr-4 text-right">Total Vehicles:</label>
          <p>{total}</p>
        </div>
      </div>
    </div>
  );
}

export default InfoPanel;
