import React from 'react'
import styled from 'styled-components'

function InfoPanel({total, refresh}) {
    return (
        <Container>
            <p>
                <strong>Real-time vehicle locations</strong> of buses and trains are obtained from Auckland Transport's public API. The data on the map is updated once every <strong>{refresh} seconds</strong>. Animations are interpolated between consecutive locations (so don't worry if you see a bus swimming in the Waitematā).
            </p>
            <p>
                Map points are coloured by the bus's <strong>occupancy status</strong>, which indicates the number of passengers on board.
            </p>

            <Stats>
                <Stat>
                    <label>Total Vehicles:</label>
                    <p>{total}</p>
                </Stat>
            </Stats>
        </Container>
    )
}

export default InfoPanel

const Container = styled.div`
    /* position: fixed;
    top: 1.0em;
    left: 1.0em;
    width: 25vw;
    z-index: 1000; */

    width: 100%;
    font-size: 1.2rem;
    line-height: 1.5;
    /* background: rgba(0,0,0,0.4); */
    /* padding: 1em 2em 0; */
    color: #fff;
    /* border: 4px solid #fff; */

    p {
        margin: 0 0 1em 0;
    }

`

const Stats = styled.div`
    font-size: 1.5em;
`
const Stat = styled.div`
    display: flex;
    label {
        /* display: inline-block; */
        width: 50%;
        text-align: right;
        padding-right: 1em;
    }
`
