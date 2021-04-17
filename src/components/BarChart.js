import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

function BarChart({data, xlab}) {

    const [maxCount, setMaxCount] = useState(0)

    useEffect(() => {
        if (data.length === 0) return
        setMaxCount(
            Math.max.apply(Math, data.map(d => d.count))
        )
    }, [data])

    return (
        <Container>
            <Label>{xlab}</Label>
            {data.length && data.map(d => (
                <Column>
                    <Bar
                        height={100 * (d.count / maxCount)}
                        colour={d.colour}
                        />
                    <BarCount>{d.count}</BarCount>
                    <BarLabel>{d.label}</BarLabel>
                </Column>
            ))}
        </Container>
    )
}

export default BarChart

const Container = styled.div`
    margin-bottom: 2em;
    /* left: 2em;
    bottom: 2em; */
    height: 30vh;
    width: 30vw;
    display: flex;
    flex-direction: column;
    background: rgba(0,0,0,0.3);
    padding: 0.5em;
    border: solid 4px white;
`

const Label = styled.div`
    color: white;
    /* width: 180px; */
    /* text-align: right; */
    font-weight: bold;
    /* background: pink; */
`

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
`
const Bar = styled.div`
    flex: 1;
    margin: 2px 0;
    position: relative;

    &:before {
        content: '';
        display: block;
        position: absolute;
        height: 100%;
        left: 0;
        width: ${props => props.height}%;
        background: ${props => props.colour};
        transition: width 5s ease-in-out;
    }
`

const BarCount = styled.div`
    padding: 0.5em;
    width: 3em;
    align-items: center;
    display: flex;
    justify-content: center;
`

const BarLabel = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-right: solid 1px white;
    padding-right: 10px;
    width: 180px;
    overflow: hidden;
`
