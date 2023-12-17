import React, { useState, useEffect } from 'react';

function Button() {
  const [data, setData] = useState({ relay_PIN_1: false, relay_PIN_2: false });

  useEffect(() => {
    fetch('http://localhost:8080/data/sensor')
      .then(response => response.json())
      .then(data => {
        setData({ relay_PIN_1: data.relay_PIN_1, relay_PIN_2: data.relay_PIN_2 });
      })
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <button>
        {data.relay_PIN_1 ? 'ON' : 'OFF'}
      </button>
      <button>
        {data.relay_PIN_2 ? 'ON' : 'OFF'}
      </button>
    </div>
  );
}

export default Button;
