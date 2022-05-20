import React, {useContext, useState} from "react";
import Container from "react-bootstrap/Container";
import MusicalItemCard from "../musical-items/MusicalItemCard";
import Row from "react-bootstrap/Row";
import ApplicationContext from '../../common/context/application-context'
import {Link} from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Button from "react-bootstrap/Button";
import LoginContext from "../../common/context/login-context";
import CreateChordModal from "../modals/CreateChordModal";


const Chords = () => {
    const {chords, setChords} = useContext(ApplicationContext)
    const [isModalOpen, setModalOpen] = useState(false)
    const {isLogged} = useContext(LoginContext)

    return (
        <Container className="content">
            <Breadcrumb>
                <Link className="breadcrumb-item" to="/">Home</Link>
                <Breadcrumb.Item className="link-unstyled">Chords</Breadcrumb.Item>
            </Breadcrumb>
            <hr/>
            <h1>
                Chords
            </h1>
            <br/>
            <p>
                A chord is a set of pitches, usually stacked in thirds.
            </p>
            <hr/>

            {
                isLogged &&
                <>
                    <Button variant="link" style={{textDecoration: 'none'}}
                            onClick={() => setModalOpen(true)}
                    >Add</Button>
                    <CreateChordModal onClose={() => setModalOpen(false)} isOpen={isModalOpen} setChords={setChords}/>
                </>
            }

            <Row>
                {chords ? chords.map((chord) => {
                    return <MusicalItemCard key={chord._id} data={chord}
                                            isScale={false}/>
                }) : 'Loading...'}
            </Row>
        </Container>

    )
}

export default Chords