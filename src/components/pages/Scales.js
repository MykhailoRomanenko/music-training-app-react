import Container from "react-bootstrap/Container";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {Link} from "react-router-dom";
import Row from "react-bootstrap/Row";
import MusicalItemCard from "../musical-items/MusicalItemCard";
import React, {useContext, useState} from "react";
import ApplicationContext from "../../common/context/application-context";
import Button from "react-bootstrap/Button";
import LoginContext from "../../common/context/login-context";
import CreateScaleModal from "../modals/CreateScaleModal";

const Scales = () => {

    const {scales, setScales} = useContext(ApplicationContext)
    const {isLogged} = useContext(LoginContext)
    const [isModalOpen, setModalOpen] = useState(false)

    function createScaleCards() {
        return (
            scales.map((scale) => {
                return <MusicalItemCard key={scale._id} data={scale}
                                        isScale={true}/>
            })
        )
    }

    return (
        <Container className="content">
            <Breadcrumb>
                <Link className="breadcrumb-item" to="/">Home</Link>
                <Breadcrumb.Item >Scales</Breadcrumb.Item>
            </Breadcrumb>
            <hr/>
            <h1>
                Scales
            </h1>
            <br/>
            <p>
                A scale is a set of pitches that are relative to one central pitch.
            </p>
            <hr/>
            {
                isLogged &&
                <>
                    <Button variant="link" style={{textDecoration: 'none'}}
                            onClick={() => setModalOpen(true)}
                    >Add</Button>
                    <CreateScaleModal onClose={() => setModalOpen(false)} isOpen={isModalOpen} setScales={setScales}/>
                </>
            }
            <Row>
                {scales ? createScaleCards() : 'Loading...'}
            </Row>
        </Container>
    )
}

export default Scales
