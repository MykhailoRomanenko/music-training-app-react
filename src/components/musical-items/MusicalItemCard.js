import React, {useContext} from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import '../../css/musical-item.css'
import {createDegreeString, createScaleDegreeString, createSemitoneString} from "../../services";
import ApplicationContext from "../../common/context/application-context";
import {useNavigate} from "react-router-dom";
import useMusicalObjectLinkHandler from "../../common/hooks/use-musical-object-link-handler";

const MusicalItemCard = ({data, isScale}) => {
    const clickHandler = useMusicalObjectLinkHandler(data, isScale)

    return (
        <Col lg="4" md="6" sm="12" key={data._id}>
            <Card className="musical-item-card" onClick={clickHandler}>
                <Card.Header>
                    <Card.Title>
                        {data.name + (isScale ? ' scale' : ' chord')}
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        Degrees: {isScale ? createScaleDegreeString(data.degrees) : createDegreeString(data.degrees)}
                        <br/>
                        Semitonal structure: {createSemitoneString(data.semitones)}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default MusicalItemCard