import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './css/app.css';
import Header from "./components/Header";
import {Route, Routes} from "react-router-dom";
import Chords from "./components/pages/Chords";
import ChordDetails from "./components/pages/ChordDetails";
import ContentContext from "./common/context/application-context";
import {getChords, getScales} from "./services";
import Home from "./components/pages/Home";
import Scales from "./components/pages/Scales";
import ScaleDetails from "./components/pages/ScaleDetails";
import './services/guitar-playback-service'
import Footer from "./components/Footer";
import LoginContext from "./common/context/login-context";
import useLogin from "./common/hooks/use-login";

const App = () => {
    const [displayChord, setDisplayChord] = useState(null)
    const [displayScale, setDisplayScale] = useState(null)
    const [chords, setChords] = useState(null)
    const [scales, setScales] = useState(null)
    useEffect( () => {
        getChords().then(setChords)
    }, [])
    useEffect(() => {
        getScales().then(setScales)
    }, [])
    const contentContextValue = {displayChord, setDisplayChord,
        displayScale, setDisplayScale, chords, setChords, scales, setScales}
    return (
        <div className="app">
            <Header/>
            <ContentContext.Provider value={contentContextValue}>
                <LoginContext.Provider value={useLogin()}>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/chords" element={<Chords/>}/>
                        <Route path="/chords/:id" element={<ChordDetails/>}/>
                        <Route path="/scales" element={<Scales/>}/>
                        <Route path="/scales/:id" element={<ScaleDetails/>}/>
                    </Routes>
                    <Footer/>
                </LoginContext.Provider>
            </ContentContext.Provider>
        </div>
    );
}

export default App;
