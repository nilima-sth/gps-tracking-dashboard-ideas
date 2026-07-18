/**
 * CodeDeb Vehicle/Fleet Management System - Central Database Engine
 */

const ROUTE_WAYPOINTS = [
    { name: "Tamghas Counter", type: "Depot", chargers: 4, power: "60kW DC" },
    { name: "Bartung Chowk Palpa", type: "Hub", chargers: 3, power: "120kW" },
    { name: "Tansen Transit Hub", type: "Depot", chargers: 2, power: "60kW" },
    { name: "Butwal Terminal", type: "Depot", chargers: 8, power: "120kW" },
    { name: "Kawasoti Highway Stop", type: "Hotel/Stop", chargers: 4, power: "60kW" },
    { name: "Mugling Junction Checkpoint", type: "Hotel/Stop", chargers: 6, power: "120kW" },
    { name: "Dumre Counter Stop", type: "Hub", chargers: 2, power: "30kW" },
    { name: "Malekhu Transit Stop", type: "Hotel/Stop", chargers: 4, power: "60kW" },
    { name: "Naubise Checkpoint", type: "Hub", chargers: 2, power: "30kW" },
    { name: "Kathmandu Kalanki Counter", type: "Depot", chargers: 12, power: "120kW" }
];

function generate65Vehicles() {
    const list = [];
    const drivers = ["Ram Bahadur Gurung", "Balram Gurung", "Lalit Sen", "Chandra Bhandari", "Bikash Tamang", "Suresh Rai", "Rajesh Shrestha", "Dinesh Thapa", "Karan Ghale", "Navin Karki", "Sabin Magar"];
    const conductors = ["Hari Prasad Shrestha", "Prem Chaudhari", "Bikram Thapa", "Deepak Gurung", "Sunil Giri", "Santosh Koirala", "Aman Shakya", "Manoj Adhikari", "Raju Pandey", "Tek Bahadur"];
    const owners = ["Arjun Prasad Acharya", "Aayush Acharya", "Radhika Acharya", "Maya Gyawali", "Shishir Gyawali", "Aashriya Rijal", "Maitree Cooperative", "Nilima Shrestha", "Swornim Raj Dangol", "Hari Prasad Marasini"];

    const schedules = ["05:30 AM", "06:15 AM", "07:00 AM", "07:45 AM", "08:30 AM", "09:15 AM", "10:00 AM", "11:30 AM", "01:00 PM", "03:30 PM", "05:00 PM", "06:30 PM"];

    for (let i = 1; i <= 65; i++) {
        const is19Seater = i <= 6;
        const capacity = is19Seater ? 19 : (i % 3 === 0 ? 15 : 14);
        const regPrefix = is19Seater ? "Ba 2 Kha" : (i % 2 === 0 ? "Ba 3 Cha" : "Lu 2 Kha");
        const regNo = `${regPrefix} ${4000 + i}`;
        
        const statusOptions = ["On Schedule", "Boarding", "Delayed"];
        const status = i <= 15 ? statusOptions[(i - 1) % 3] : "On Schedule"; 
        
        const waypointIdx = (i % (ROUTE_WAYPOINTS.length - 2)) + 1;
        
        const seats = [];
        for (let s = 1; s <= capacity; s++) {
            const seatId = `${Math.floor((s - 1) / 2) + 1}${String.fromCharCode(65 + ((s - 1) % 2))}`;
            seats.push({
                id: seatId,
                status: s <= Math.floor(capacity * 0.7) ? "occupied" : "vacant",
                name: s <= Math.floor(capacity * 0.7) ? `Passenger ${s}` : "",
                phone: s <= Math.floor(capacity * 0.7) ? `9841${Math.floor(100000 + Math.random() * 900000)}` : ""
            });
        }

        list.push({
            id: `EV-${100 + i}`,
            regNo: regNo,
            model: is19Seater ? "King Long (19 Seater)" : `King Long (${capacity} Seater)`,
            capacity: capacity,
            chargeLimit: is19Seater ? "120kW" : "60kW",
            departureTime: schedules[(i - 1) % schedules.length],
            driver: drivers[i % drivers.length],
            driverPhone: `9841${Math.floor(100000 + Math.random() * 900000)}`,
            driverLicense: `01-06-N-${Math.floor(10000 + Math.random() * 90000)}`,
            conductor: conductors[i % conductors.length],
            conductorPhone: `9813${Math.floor(100000 + Math.random() * 900000)}`,
            owner: owners[i % owners.length],
            origin: i % 2 === 0 ? "Tamghas" : "Kathmandu",
            destination: i % 2 === 0 ? "Kathmandu" : "Tamghas",
            currentLocation: status === "Boarding" ? (i % 2 === 0 ? "Tamghas Counter" : "Kathmandu Kalanki Counter") : ROUTE_WAYPOINTS[waypointIdx].name,
            nextStop: ROUTE_WAYPOINTS[waypointIdx + 1].name,
            speed: status === "On Schedule" ? Math.floor(45 + Math.random() * 15) : 0,
            battery: Math.floor(30 + Math.random() * 60),
            range: Math.floor(80 + Math.random() * 130),
            delay: status === "Delayed" ? 30 : 0,
            status: status,
            seats: seats
        });
    }
    return list;
}

const DEFAULT_STATE = {
    manager: "Hari Marasini",
    role: "Operations Director",
    alerts: [
        { id: "al-1", vehicle: "Ba 2 Kha 4001", msg: "Delayed 30 mins at Mugling - waiting for open charging slot.", time: "09:12 AM" },
        { id: "al-2", vehicle: "Ba 3 Cha 4003", msg: "Driver reported heavy traffic jam near Naubise checkpoint.", time: "08:45 AM" }
    ],
    vehicles: generate65Vehicles()
};

function getDatabase() {
    let localData = localStorage.getItem("codedeb_vms_state_v6");
    if (!localData) {
        localStorage.setItem("codedeb_vms_state_v6", JSON.stringify(DEFAULT_STATE));
        return DEFAULT_STATE;
    }
    return JSON.parse(localData);
}

function updateDatabase(newState) {
    localStorage.setItem("codedeb_vms_state_v6", JSON.stringify(newState));
}