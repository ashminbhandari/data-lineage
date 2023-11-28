
const dtc = ['P0128', 'P0133', 'P0135', 'P0171', 'P0174', 'P0300', 'P0302', 'P0303',
    'P0304', 'P0401', 'P0420', 'P0430', 'P0440', 'P0442', 'P0446', 'P0455'];

const service_tasks = ['Oil Change', 'Tire Rotation', 'Brake Pad Replacement', 'Battery Replacement',
    'Air Filter Replacement', 'Spark Plug Replacement', 'Coolant Flush', 'Transmission Fluid Change',
    'Brake Fluid Change', 'Fuel Filter Replacement', 'Wiper Blade Replacement', 'Timing Belt Replacement',
    'Wheel Alignment', 'Serpentine Belt Replacement', 'Headlight Bulb Replacement', 'Ball Joint Replacement',
    'Shock Absorber Replacement', 'Strut Replacement', 'Tie Rod End Replacement', 'Control Arm Replacement',
    'Wheel Bearing Replacement', 'CV Joint Replacement', 'Radiator Replacement', 'Thermostat Replacement',
    'Water Pump Replacement', 'Alternator Replacement', 'Starter Replacement', 'Power Steering Pump Replacement',
    'AC Compressor Replacement', 'Exhaust System Replacement'];

class ProducerSim {
    constructor() {
        this.dtc = dtc;
        this.service_tasks = service_tasks;
    }

    getRandomOdometer(currentOdometer = 0) {
        return (Math.floor(Math.random() * 7000) + 5000 + currentOdometer);
    }

    //VIN - Vehicle Identification Number
    getRandomVIN() {
        const VIN_chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        return Array.from({ length: 17 }, () => VIN_chars.charAt(Math.floor(Math.random() * VIN_chars.length))).join('');
    }

    //creates a random timestamp between 1/1/2022 - 1/1/2023
    getRandomTimestamp() {
        const startDate = new Date(2022, 0, 1);
        const endDate = new Date(2022 + 1, 0, 1);
        const timeDifference = endDate.getTime() - startDate.getTime();

        const randomTime = startDate.getTime() + Math.random() * timeDifference;

        return new Date(randomTime);
    }

    getRandomTelematics() {
        const timestamp = this.getRandomTimestamp();
        const vin = this.getRandomVIN();
        const odometer = this.getRandomOdometer();
        const engine_rpm = Math.floor(Math.random() * 6000 + 400);
        const speed = Math.floor(Math.random() * 100);
        const throttle = Math.floor(Math.random() * 100);
        const longitude = Math.random() * 360 - 180;
        const latitude = Math.random() * 180 - 90;
        const active_dtc = [];

        const record = {
            "timestamp": timestamp,
            "vin": vin,
            "odometer": odometer,
            "location": {
                "latitude": latitude,
                "longitude": longitude
            },
            "speed": speed,
            "engine_rpm": engine_rpm,
            "throttle": throttle,
            "active_dtc": active_dtc
        };

        return record;
    }
};

export default ProducerSim;