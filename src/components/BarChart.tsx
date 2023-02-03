import { useEffect, useState } from "react";

export type TableType = {
  label: string;
  count: number;
  colour: string | undefined;
};

type BarChartProps = {
  data: TableType[];
  xlab: string;
};

function BarChart({ data, xlab }: BarChartProps) {
  const [maxCount, setMaxCount] = useState(0);

  useEffect(() => {
    if (data.length === 0) return;
    setMaxCount(
      data.reduce((a, v) => (a = Math.max(a, v.count)), 0)
      // data.reduce((a,v) => a = a + v.count, 0)
      // Math.max.apply(Math, data.map(d => d.count))
    );
  }, [data]);

  return (
    <div className="mb-8 mt-4 flex flex-col border-b border-t-4 border-t-white border-b-white">
      <div className="fontb-bold border-b border-b-white p-2 text-white">
        {xlab}
      </div>
      {data.length &&
        data.map((d) => (
          <div
            key={d.label}
            className="flex h-8 w-full flex-1 flex-row-reverse overflow-hidden text-center text-[0.7em] font-bold text-white"
          >
            <div className="relative my-[2px] mx-0 flex-1">
              <div
                className="absolute left-0 h-full transition-[height] duration-[5s] ease-in-out"
                style={{
                  width: `${100 * (d.count / maxCount)}%`,
                  backgroundColor: d.colour,
                }}
              ></div>
            </div>
            <div className="flex w-12 items-center justify-center p-2">
              {d.count}
            </div>
            <div className="flex w-[180px] items-center justify-end overflow-hidden border-r border-r-white pr-[10px]">
              {d.label}
            </div>
          </div>
        ))}
    </div>
  );
}

export default BarChart;
