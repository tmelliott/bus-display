import { useEffect, useState } from "react";
import styled from "styled-components";

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
    <Container>
      <Label>{xlab}</Label>
      {data.length &&
        data.map((d) => (
          <Column key={d.label}>
            <Bar height={100 * (d.count / maxCount)} colour={d.colour} />
            <BarCount>{d.count}</BarCount>
            <BarLabel>{d.label}</BarLabel>
          </Column>
        ))}
    </Container>
  );
}

export default BarChart;

const Container = styled.div`
  margin-bottom: 2em;
  margin-top: 1em;
  /* left: 2em;
    bottom: 2em; */
  /* height: 30vh; */
  display: flex;
  flex-direction: column;
  /* background: rgba(0,0,0,0.3); */
  /* padding: 0.5em; */
  border-top: solid 4px white;
  /* padding-top: 0.5em; */
  border-bottom: solid 1px white;
`;

const Label = styled.div`
  color: white;
  /* width: 180px; */
  /* text-align: right; */
  font-weight: bold;
  /* background: pink; */
  padding: 0.5em;
  border-bottom: solid 1px white;
`;

const Column = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: row-reverse;
  color: white;
  text-align: center;
  font-weight: bold;
  font-size: 0.7em;
  overflow: hidden;
  height: 2em;
`;

interface BarProps {
  height: number;
  colour: string;
}
const Bar = styled.div<BarProps>`
  flex: 1;
  margin: 2px 0;
  position: relative;

  &:before {
    content: "";
    display: block;
    position: absolute;
    height: 100%;
    left: 0;
    width: ${(props) => props.height * 0.85}%;
    background: ${(props) => props.colour};
    transition: width 5s ease-in-out;
  }
`;

const BarCount = styled.div`
  padding: 0.5em;
  width: 3em;
  align-items: center;
  display: flex;
  justify-content: center;
`;

const BarLabel = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-right: solid 1px white;
  padding-right: 10px;
  width: 180px;
  overflow: hidden;
`;
