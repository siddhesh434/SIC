const instrumentData = [
    { id: 1, name: 'Instrument 1', description: 'Description of Instrument 1' },
    { id: 2, name: 'Instrument 2', description: 'Description of Instrument 2' },
    // Add more instruments as needed
];

const Instruments = () => {
    console.log('hi');
    return (
        <div className="instrument-container">
            {instrumentData.map(instrument => (
                <div className="instrument-card" key={instrument.id}>
                    <h3>{instrument.name}</h3>
                    <p>{instrument.description}</p>
                    {/* Add additional information or actions as needed */}
                </div>
            ))}
        </div>
    );
};

export default Instruments;
