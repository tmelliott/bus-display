import React from 'react'
import styled from 'styled-components'

function InfoPanel() {
    return (
        <Container>
            <p>
                <strong>Real-time positions of buses</strong> are obtained through Auckland Tranport's public API, which includes <strong>arrival/departure delays</strong> at the most recently visited stop. Buses between <strong>1 minute early and 5 minutes late</strong> are defined as <strong>on time</strong>.
            </p>
            <p>
                Location points are coloured by the bus's <strong>occupancy status</strong>, which indicates the number of passengers on board.
            </p>
            {/* <p>
                The line graph shows how the <strong>percentage of buses
                that are on time, early</strong> (by more than 1 minute), <strong>and late</strong>
                (by more than 5 minutes) has changed today.
            </p> */}
        </Container>
    )
}

export default InfoPanel

const Container = styled.div`
    position: fixed;
    top: 1.0em;
    left: 1.0em;
    width: 25vw;
    z-index: 1000;

    font-size: 1.2rem;
    line-height: 1.5;
    background: rgba(0,0,0,0.4);
    padding: 1em 2em 0;
    color: #fff;
    border: 4px solid #fff;

    p {
        margin: 0 0 1em 0;
    }

`
