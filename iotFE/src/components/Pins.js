import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Pins.css";

function Pins() {
    const [data, setData] = useState([]);
    const [relayState, setRelayState] = useState({ relay_PIN_1: false, relay_PIN_2: false });
    const [auto, setAuto] = useState([true]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios('http://localhost:8080/data/sensor');
            const data = result.data;
            const latestData = data[data.length - 1];
            setRelayState({ relay_PIN_1: latestData.relay_PIN_1, relay_PIN_2: latestData.relay_PIN_2 });
        };
        fetchData();
    }, []);

    // const handleClick1 = async () => {
    //     const newRelayState = { ...relayState, relay_PIN_1: !relayState.relay_PIN_1 };
    //     setRelayState(newRelayState);

    //     const payload = {
    //         topic: 'esp32/relay',
    //         message: newRelayState.relay_PIN_1 ? 'on' : 'off',
    //         retained: true,
    //         qos: 2
    //     };

    //     try {
    //         await axios.post('http://localhost:8080/api/mqtt/publish', payload);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    const handleClick2 = async () => {
        const newRelayState = { ...relayState, relay_PIN_2: !relayState.relay_PIN_2 };
        setRelayState(newRelayState);

        const payload = {
            topic: 'esp32/relay',
            message: newRelayState.relay_PIN_2 ? 'ON' : 'OFF',
            retained: true,
            qos: 2
        };

        try {
            await axios.post('http://localhost:8080/api/mqtt/publish', payload);
        } catch (error) {
            console.error(error);
        }
    };

    const handleClick3 = async () => {
        const newAutoState = !auto;
        setAuto(newAutoState);

        const payload = {
            topic: 'esp32/status',
            message: newAutoState ? 'ON' : 'OFF',
            retained: true,
            qos: 2
        };

        try {
            await axios.post('http://localhost:8080/api/mqtt/publish', payload);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div>
            <button className="buttonP buttonP1">
                Float <br/> {relayState.relay_PIN_1 ? 'ON' : 'OFF'}
            </button>
            <button className="buttonP buttonP2" onClick={handleClick2}>
                Pump <br/> {relayState.relay_PIN_2 ? 'ON' : 'OFF'}
            </button>
            <button className="buttonP button3" onClick={handleClick3}>
                Auto <br/> {auto ? 'ON' : 'OFF'}
            </button>
        </div>

    );

}

export default Pins;
