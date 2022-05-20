import React from 'react'
import Container from "react-bootstrap/Container";

const Home = () => {

    return (
        <Container>
            <br/>
            <div style={{display:'flex', flexDirection: 'column' , justifyContent:'center', alignItems: 'center'}}>
                <h1>Welcome to MusicLib!</h1>
                <h3>This app is designed to help musicians understand and visualise chords and scales.</h3>
            </div>
        </Container>
    )
}

export default Home