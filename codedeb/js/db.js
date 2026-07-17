/**
 * CodeDeb Vehicle/Fleet Management System - Shared Database Engine (v4)
 * Unified Client-Side Source of Truth (localStorage)
 */

const ROUTE_WAYPOINTS = [
    { name: "Tamghas Counter", lat: 28.0672, lng: 83.2481, type: "Depot", chargers: 4, power: "60kW DC", amenities: "Driver lounge, basic maintenance bay" },
    { name: "Bartung Chowk Palpa", lat: 27.8643, lng: 83.5492, type: "Charging Hub", chargers: 3, power: "120kW DC / 30kW DC", amenities: "Cafe, washroom" },
    { name: "Tansen", lat: 27.8700, lng: 83.5500, type: "Depot", chargers: 2, power: "60kW DC", amenities: "Ticket counter, food stall" },
    { name: "Butwal Counter", lat: 27.7006, lng: 83.4484, type: "Depot", chargers: 8, power: "120kW DC / 60kW DC", amenities: "Major hub, restaurants, rest bays" },
    { name: "Kawasoti Highway Stop", lat: 27.6432, lng: 84.1132, type: "Eating Place & Charging", chargers: 4, power: "60kW DC", amenities: "Hotel Green Horizon, AC waiting area" },
    { name: "Mugling Junction Stop", lat: 27.8114, lng: 84.5582, type: "Eating Place & Charging", chargers: 6, power: "120kW DC / 60kW DC", amenities: "Riverside restaurants, heavy duty charging" },
    { name: "Dumre Counter Stop", lat: 27.9692, lng: 84.4061, type: "Charging Hub", chargers: 2, power: "30kW DC", amenities: "Local shops, tea house" },
    { name: "Malekhu Transit Stop", lat: 27.8044, lng: 84.8214, type: "Eating Place & Charging", chargers: 4, power: "60kW DC", amenities: "Riverside fish hotels, charging stalls" },
    { name: "Naubise Checkpoint", lat: 27.7122, lng: 85.1612, type: "Charging Hub", chargers: 2, power: "30kW DC", amenities: "Local marketplace" },
    { name: "Kathmandu Kalanki Counter", lat: 27.7172, lng: 85.3240, type: "Depot", chargers: 12, power: "120kW DC / 60kW DC", amenities: "Main terminal, repair shop, operations office" }
];

function generateMockVehicles() {
    const list = [];
    const drivers = [
        "Balram Gurung", "Ram Bahadur Gurung", "Lalit Sen", "Chandra Bhandari", "Bikash Tamang", "Suresh Rai", 
        "Rajesh Shrestha", "Dinesh Thapa", "Karan Ghale", "Navin Karki", "Sabin Magar"
    ];
    const conductors = [
        "Hari Prasad Shrestha", "Prem Chaudhari", "Bikram Thapa", "Deepak Gurung", "Sunil Giri",
        "Santosh Koirala", "Aman Shakya", "Manoj Adhikari", "Raju Pandey", "Tek Bahadur"
    ];
    const owners = [
        "Arjun Prasad Acharya","Aayush Acharya","Radhika Acharya","Maya Gyawali","Shishir Gyawali", "Aashriya Rijal", "Maitree Multipurpose Cooperative", "Nilima Shrestha", "Swornim Raj Dangol" , "Hari Prasad Marasini", "Indu Pokharel","Dhanishwor Aryal","Hari Prasad Pokharel","Shrijana Aryal"
    ];

    for (let i = 1; i <= 65; i++) {
        const is19Seater = i <= 6; 
        const capacity = is19Seater ? 19 : (i % 5 === 0 ? 15 : 14); // Supports 14, 15, and 19 seat capacities
        const regPrefix = is19Seater ? "Ba 2 Kha" : (i % 2 === 0 ? "Ba 3 Cha" : "Lu 2 Kha");
        const regNo = `${regPrefix} ${4000 + i}`;
        const chargeRate = is19Seater ? "120kW" : (i % 3 === 0 ? "30kW" : "60kW");
        
        const statusList = ["In Transit", "Boarding", "Charging", "Delayed", "Standby"];
        const status = statusList[i % statusList.length];
        
        const lastWaypointIdx = (i % (ROUTE_WAYPOINTS.length - 2)) + 1;
        const currentLoc = ROUTE_WAYPOINTS[lastWaypointIdx];
        const nextLoc = ROUTE_WAYPOINTS[lastWaypointIdx + 1] || ROUTE_WAYPOINTS[0];
        
        // Generate passenger seating data with diverse boarding scenarios
        const seats = [];
        for (let s = 1; s <= capacity; s++) {
            const seatId = `${Math.floor((s - 1) / 2) + 1}${String.fromCharCode(65 + ((s - 1) % 2))}`;
            const isOccupied = Math.random() > 0.35; 
            
            // Randomly assign pricing types: Fixed, Conditional (Butwal-bound on KTM EV), or Midway Boarders
            let fareType = "Fixed";
            let seatFare = 1650; // default full Tamghas-KTM
            
            if (isOccupied) {
                const randType = Math.random();
                if (randType < 0.20) {
                    fareType = "Midway Boarder";
                    seatFare = 800; // shorter segment boarding
                } else if (randType < 0.35) {
                    fareType = "Conditional Butwal";
                    seatFare = 650; // conditional lower tariff
                }
            }

            seats.push({
                id: seatId,
                status: isOccupied ? "occupied" : "vacant",
                name: isOccupied ? `Passenger ${s}` : "",
                phone: isOccupied ? `9841${Math.floor(100000 + Math.random() * 900000)}` : "",
                fareType: isOccupied ? fareType : "N/A",
                fare: isOccupied ? seatFare : 0
            });
        }

        // Financial & Cargo Aggregations
        const ticketRev = seats.reduce((acc, curr) => acc + curr.fare, 0);
        const cargoRev = Math.floor(2000 + Math.random() * 8000); // NPR cargo revenue per trip

        // Expense Ledger Breakdown
        const expenses = {
            hotel: status === "In Transit" ? 1500 : 0,
            meals: 800,
            maintenance: i % 10 === 0 ? 12000 : 1500, // randomized heavy parts wear-and-tear
            charging: Math.floor(1200 + Math.random() * 2500),
            tolls: 350,
            bribery: i % 8 === 0 ? 1000 : 0, // dynamic traffic compliance charges
            misc: 400,
            miscComment: i % 8 === 0 ? "Checkpost highway coordination" : "Windshield wiper fluid refill"
        };

        const totalExpenses = Object.values(expenses).reduce((acc, val) => {
            return typeof val === "number" ? acc + val : acc;
        }, 0);

        list.push({
            id: `EV-${100 + i}`,
            regNo: regNo,
            model: is19Seater ? "King Long King-Express (19 Seater)" : `King Long Mini-EV (${capacity} Seater)`,
            capacity: capacity,
            chargeLimit: chargeRate,
            driver: drivers[i % drivers.length],
            driverPhone: `9841${Math.floor(100000 + Math.random() * 900000)}`,
            conductor: conductors[i % conductors.length],
            conductorPhone: `9813${Math.floor(100000 + Math.random() * 900000)}`,
            owner: owners[i % owners.length],
            route: "Tamghas ⇄ Kathmandu",
            origin: "Tamghas",
            destination: "Kathmandu",
            currentLocation: currentLoc.name,
            lat: currentLoc.lat + (Math.random() - 0.5) * 0.02, 
            lng: currentLoc.lng + (Math.random() - 0.5) * 0.02,
            nextStop: nextLoc.name,
            eta: `${(7 + (i % 5))}:${(i % 4) * 15} ${i % 2 === 0 ? "AM" : "PM"}`,
            speed: status === "In Transit" ? Math.floor(40 + Math.random() * 30) : 0,
            battery: Math.floor(25 + Math.random() * 70),
            range: Math.floor(80 + Math.random() * 140),
            delay: i % 7 === 0 ? 30 : 0,
            status: status,
            passengerRevenue: ticketRev,
            cargoRevenue: cargoRev,
            expenses: expenses,
            totalExpenses: totalExpenses,
            netRevenue: (ticketRev + cargoRev) - totalExpenses,
            checklist: { tyres: "OK", brakes: "OK", lights: "OK" },
            seats: seats
        });
    }
    return list;
}

const DEFAULT_STATE = {
    manager: "Hari Marasini",
    role: "Operations Director",
    terminals: ["Tamghas", "Tansen", "Butwal", "Kathmandu"],
    routeWaypoints: ROUTE_WAYPOINTS,
    alerts: [
        { id: "al-1", vehicle: "EV-101", msg: "High speed warning: 75 km/h near Mugling segment", time: "04:12 PM", level: "warning" },
        { id: "al-2", vehicle: "EV-109", msg: "Low battery alarm (14%) before Dumre Charging Stop", time: "03:45 PM", level: "critical" },
        { id: "al-3", vehicle: "EV-124", msg: "Prolonged idle status (45 mins) at Kawasoti Stop", time: "03:10 PM", level: "warning" }
    ],
    vehicles: generateMockVehicles()
};

function getDatabase() {
    let localData = localStorage.getItem("codedeb_vms_state_v4");
    if (!localData) {
        localStorage.setItem("codedeb_vms_state_v4", JSON.stringify(DEFAULT_STATE));
        return DEFAULT_STATE;
    }
    return JSON.parse(localData);
}

function updateDatabase(newState) {
    localStorage.setItem("codedeb_vms_state_v4", JSON.stringify(newState));
}