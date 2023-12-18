import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Pins() {
    const [data, setData] = useState([]);
    const [relayState, setRelayState] = useState({ relay_PIN_1: false, relay_PIN_2: false });

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios('http://localhost:8080/data/sensor');
            setData(result.data);
        };
        fetchData();
    }, []);

    const latestData = data[data.length - 1];

    const handleClick = async (pin) => {
        const newRelayState = { ...relayState, [pin]: !relayState[pin] };
        setRelayState(newRelayState);

        const payload = {
            topic: 'esp32/pin',
            message: JSON.stringify(newRelayState),
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
            <button onClick={() => handleClick('relay_PIN_1')}>
                relay_PIN_1 is {relayState.relay_PIN_1 ? 'ON' : 'OFF'}
            </button>
            <br />
            <button onClick={() => handleClick('relay_PIN_2')}>
                relay_PIN_2 is {relayState.relay_PIN_2 ? 'ON' : 'OFF'}
            </button>
        </div>
    );
}

export default Pins;
