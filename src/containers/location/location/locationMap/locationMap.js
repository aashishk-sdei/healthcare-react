import React from "react";
import { Col } from "shards-react";
import './locationMap.scss';
const LocationMap = () => {
    return (

        <Col lg="6" className="locationMap">
            <iframe title="Localtion Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.4128714322583!2d76.70606101446081!3d30.70679149393478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390feef1493e5e27%3A0x9c0c0f501673443b!2sIvy%20Hospital!5e0!3m2!1sen!2sin!4v1594903278388!5m2!1sen!2sin" width={600} height={450} frameBorder={0} style={{ border: 0 }} allowFullScreen aria-hidden="false" tabIndex={0} />
        </Col>
    );
}
export default LocationMap;