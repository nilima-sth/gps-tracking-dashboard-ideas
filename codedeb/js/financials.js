function calculateFleetFinancials(db) {
    let totalTicketRev = 0;
    let totalCargoRev = 0;
    let totalExpenses = 0;
    let totalBribery = 0;
    let totalHotel = 0;
    let totalMeals = 0;
    let totalMaintenance = 0;
    let totalCharging = 0;
    let totalTolls = 0;

    const ownerPerformance = {};

    db.vehicles.forEach(v => {
        const ticketRev = v.passengerRevenue || 0;
        const cargoRev = v.cargoRevenue || 0;
        
        // Expense breakdown
        const hotel = v.expenses?.hotel || 0;
        const meals = v.expenses?.meals || 0;
        const maintenance = v.expenses?.maintenance || 0;
        const charging = v.expenses?.charging || 0;
        const tolls = v.expenses?.tolls || 0;
        const bribery = v.expenses?.bribery || 0;
        const misc = v.expenses?.misc || 0;

        const vehicleExpenses = hotel + meals + maintenance + charging + tolls + bribery + misc;

        totalTicketRev += ticketRev;
        totalCargoRev += cargoRev;
        totalExpenses += vehicleExpenses;

        totalBribery += bribery;
        totalHotel += hotel;
        totalMeals += meals;
        totalMaintenance += maintenance;
        totalCharging += charging;
        totalTolls += tolls;

        const netProfit = (ticketRev + cargoRev) - vehicleExpenses;

        // Grouping metrics by vehicle owners
        if (!ownerPerformance[v.owner]) {
            ownerPerformance[v.owner] = {
                ticketRev: 0,
                cargoRev: 0,
                expenses: 0,
                netProfit: 0,
                vehicleCount: 0
            };
        }

        ownerPerformance[v.owner].ticketRev += ticketRev;
        ownerPerformance[v.owner].cargoRev += cargoRev;
        ownerPerformance[v.owner].expenses += vehicleExpenses;
        ownerPerformance[v.owner].netProfit += netProfit;
        ownerPerformance[v.owner].vehicleCount += 1;
    });

    return {
        totalTicketRev,
        totalCargoRev,
        totalExpenses,
        totalNetProfit: (totalTicketRev + totalCargoRev) - totalExpenses,
        breakdown: {
            hotel: totalHotel,
            meals: totalMeals,
            maintenance: totalMaintenance,
            charging: totalCharging,
            tolls: totalTolls,
            bribery: totalBribery
        },
        owners: ownerPerformance
    };
}