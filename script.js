const marketHours = {
    NYSE: { open: "09:30", close: "16:00", timezone: "America/New_York", region: "North America", city: "New York" },
    NASDAQ: { open: "09:30", close: "16:00", timezone: "America/New_York", region: "North America", city: "New York" },
    TSX: { open: "09:30", close: "16:00", timezone: "America/Toronto", region: "North America", city: "Toronto" },
    BMV: { open: "08:30", close: "15:00", timezone: "America/Mexico_City", region: "North America", city: "Mexico City" },
    CSE: { open: "09:30", close: "16:00", timezone: "America/Toronto", region: "North America", city: "Toronto" },
    LSE: { open: "08:00", close: "16:30", timezone: "Europe/London", region: "Europe", city: "London" },
    XETRA: { open: "09:00", close: "17:30", timezone: "Europe/Berlin", region: "Europe", city: "Frankfurt" },
    Euronext: { open: "09:00", close: "17:30", timezone: "Europe/Paris", region: "Europe", city: "Paris" },
    SIX: { open: "09:00", close: "17:30", timezone: "Europe/Zurich", region: "Europe", city: "Zurich" },
    BME: { open: "09:00", close: "17:30", timezone: "Europe/Madrid", region: "Europe", city: "Madrid" },
    OMX: { open: "09:00", close: "17:30", timezone: "Europe/Stockholm", region: "Europe", city: "Stockholm" },
    MOEX: { open: "10:00", close: "18:45", timezone: "Europe/Moscow", region: "Europe", city: "Moscow" },
    BorsaItaliana: { open: "09:00", close: "17:30", timezone: "Europe/Rome", region: "Europe", city: "Milan" },
    WSE: { open: "09:00", close: "17:30", timezone: "Europe/Warsaw", region: "Europe", city: "Warsaw" },
    OSE: { open: "09:00", close: "16:20", timezone: "Europe/Oslo", region: "Europe", city: "Oslo" },
    ISE: { open: "09:30", close: "17:30", timezone: "Europe/Dublin", region: "Europe", city: "Dublin" },
    JPX: { 
        open1: "09:00", close1: "11:30", 
        open2: "12:30", close2: "15:00",
        timezone: "Asia/Tokyo", 
        region: "Asia",
        city: "Tokyo"
    },
    HKEX: { open: "09:30", close: "16:00", timezone: "Asia/Hong_Kong", region: "Asia", city: "Hong Kong" },
    SSE: { open: "09:30", close: "15:00", timezone: "Asia/Shanghai", region: "Asia", city: "Shanghai" },
    SZSE: { open: "09:30", close: "15:00", timezone: "Asia/Shanghai", region: "Asia", city: "Shenzhen" },
    BSE: { open: "09:15", close: "15:30", timezone: "Asia/Kolkata", region: "Asia", city: "Mumbai" },
    NSE: { open: "09:15", close: "15:30", timezone: "Asia/Kolkata", region: "Asia", city: "Mumbai" },
    KRX: { open: "09:00", close: "15:30", timezone: "Asia/Seoul", region: "Asia", city: "Seoul" },
    TWSE: { open: "09:00", close: "13:30", timezone: "Asia/Taipei", region: "Asia", city: "Taipei" },
    SGX: { open: "09:00", close: "17:00", timezone: "Asia/Singapore", region: "Asia", city: "Singapore" },
    TASE: { open: "09:30", close: "17:30", timezone: "Asia/Jerusalem", region: "Asia", city: "Tel Aviv" },
    IDX: { open: "09:00", close: "15:30", timezone: "Asia/Jakarta", region: "Asia", city: "Jakarta" },
    SET: { open: "10:00", close: "16:30", timezone: "Asia/Bangkok", region: "Asia", city: "Bangkok" },
    PSE: { open: "09:30", close: "15:30", timezone: "Asia/Manila", region: "Asia", city: "Manila" },
    HOSE: { open: "09:00", close: "15:00", timezone: "Asia/Ho_Chi_Minh", region: "Asia", city: "Ho Chi Minh City" },
    DFM: { open: "10:00", close: "14:00", timezone: "Asia/Dubai", region: "Asia", city: "Dubai" },
    ADX: { open: "10:00", close: "14:00", timezone: "Asia/Dubai", region: "Asia", city: "Abu Dhabi" },
    ASX: { open: "10:00", close: "16:00", timezone: "Australia/Sydney", region: "Australia", city: "Sydney" },
    NZX: { open: "10:00", close: "16:45", timezone: "Pacific/Auckland", region: "Australia", city: "Wellington" },
    JSE: { open: "09:00", close: "17:00", timezone: "Africa/Johannesburg", region: "Africa", city: "Johannesburg" },
    EGX: { open: "10:00", close: "14:30", timezone: "Africa/Cairo", region: "Africa", city: "Cairo" },
    NSE_Nigeria: { open: "10:00", close: "14:30", timezone: "Africa/Lagos", region: "Africa", city: "Lagos" },
    ZSE: { open: "09:00", close: "16:00", timezone: "Africa/Harare", region: "Africa", city: "Harare" },
    GSE: { open: "09:30", close: "15:00", timezone: "Africa/Accra", region: "Africa", city: "Accra" },
    NSE_Kenya: { open: "09:00", close: "15:00", timezone: "Africa/Nairobi", region: "Africa", city: "Nairobi" },
    B3: { open: "10:00", close: "17:00", timezone: "America/Sao_Paulo", region: "South America", city: "São Paulo" },
    Santiago: { open: "09:30", close: "16:00", timezone: "America/Santiago", region: "South America", city: "Santiago" },
    BVC: { open: "09:00", close: "13:00", timezone: "America/Bogota", region: "South America", city: "Bogotá" },
    BVL: { open: "09:00", close: "13:30", timezone: "America/Lima", region: "South America", city: "Lima" },
    BVBA: { open: "11:00", close: "17:00", timezone: "America/Argentina/Buenos_Aires", region: "South America", city: "Buenos Aires" }
};

const indices = {
    SP500: { name: "S&P 500", region: "North America", city: "New York", value: 5200.45, change: 1.23 },
    DJIA: { name: "Dow Jones", region: "North America", city: "New York", value: 39000.12, change: -0.45 },
    NASDAQ100: { name: "Nasdaq 100", region: "North America", city: "New York", value: 18000.78, change: 0.89 },
    TSXCOMP: { name: "S&P/TSX Composite", region: "North America", city: "Toronto", value: 22000.34, change: 0.56 },
    FTSE100: { name: "FTSE 100", region: "Europe", city: "London", value: 7500.34, change: 0.56 },
    DAX: { name: "DAX", region: "Europe", city: "Frankfurt", value: 16000.67, change: -0.12 },
    CAC40: { name: "CAC 40", region: "Europe", city: "Paris", value: 7200.89, change: 0.34 },
    IBEX35: { name: "IBEX 35", region: "Europe", city: "Madrid", value: 10000.23, change: 0.78 },
    FTSEMIB: { name: "FTSE MIB", region: "Europe", city: "Milan", value: 28000.45, change: -0.23 },
    NIKKEI225: { name: "Nikkei 225", region: "Asia", city: "Tokyo", value: 38000.23, change: 1.45 },
    HSI: { name: "Hang Seng Index", region: "Asia", city: "Hong Kong", value: 16500.45, change: -0.78 },
    SENSEX: { name: "BSE Sensex", region: "Asia", city: "Mumbai", value: 65000.67, change: 0.23 },
    NIFTY50: { name: "NIFTY 50", region: "Asia", city: "Mumbai", value: 19500.89, change: 0.45 },
    KOSPI: { name: "KOSPI", region: "Asia", city: "Seoul", value: 2500.12, change: -0.34 },
    SSECOMP: { name: "SSE Composite", region: "Asia", city: "Shanghai", value: 3200.34, change: 0.67 },
    ASX200: { name: "S&P/ASX 200", region: "Australia", city: "Sydney", value: 7200.12, change: 0.67 },
    NZX50: { name: "NZX 50", region: "Australia", city: "Wellington", value: 11500.56, change: -0.12 },
    JTOPI: { name: "Johannesburg Top 40", region: "Africa", city: "Johannesburg", value: 68000.89, change: -0.34 },
    IBOV: { name: "Ibovespa", region: "South America", city: "São Paulo", value: 120000.34, change: 0.89 },
    MERVAL: { name: "Merval", region: "South America", city: "Buenos Aires", value: 95000.67, change: 1.23 }
};

let isMinimized = false;
let showFavoritesOnly = false;
let favorites = new Set();
let showIndices = false;

function getTimeInMinutes(date, timezone) {
    const options = { timeZone: timezone, hour12: false, hour: "2-digit", minute: "2-digit" };
    const timeString = date.toLocaleTimeString("en-US", options);
    const [hour, minute] = timeString.split(":").map(Number);
    return hour * 60 + minute;
}

function getTimeDetails(date, timezone) {
    const options = { timeZone: timezone, hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" };
    const timeString = date.toLocaleTimeString("en-US", options);
    const [hour, minute, second] = timeString.split(":").map(Number);
    return { hour, minute, second };
}

function convertToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
}

function formatHoursMinutes(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
}

function formatTimeLeft(minutes) {
    if (minutes <= 0) return "Market Closed";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
}

function getTimeUntilOpen(market, currentTime) {
    const marketData = marketHours[market];
    const timezone = marketData.timezone;

    if (market === "JPX") {
        const openTime1 = convertToMinutes(marketData.open1);
        const openTime2 = convertToMinutes(marketData.open2);
        const nextOpen = currentTime < openTime1 ? openTime1 : (currentTime < openTime2 ? openTime2 : openTime1 + 24 * 60);
        return nextOpen - currentTime > 0 ? nextOpen - currentTime : (24 * 60 + nextOpen - currentTime);
    } else {
        const openTime = convertToMinutes(marketData.open);
        return openTime - currentTime > 0 ? openTime - currentTime : (24 * 60 + openTime - currentTime);
    }
}

function updateCards() {
    const regionFilter = document.getElementById("region-filter").value;
    const searchQuery = document.getElementById("search").value.toLowerCase();
    const marketSection = document.getElementById("market-section");
    marketSection.innerHTML = "";

    const disclaimer = document.getElementById("disclaimer");
    disclaimer.style.display = showIndices ? "block" : "none";

    if (showIndices) {
        let indicesToShow = Object.keys(indices).filter(index => {
            const indexData = indices[index];
            const regionMatch = regionFilter === "all" || indexData.region === regionFilter;
            const searchMatch = index.toLowerCase().includes(searchQuery) || indexData.name.toLowerCase().includes(searchQuery) || indexData.city.toLowerCase().includes(searchQuery);
            const favoriteMatch = !showFavoritesOnly || favorites.has(index);
            return regionMatch && searchMatch && favoriteMatch;
        });

        indicesToShow.forEach(index => {
            const indexData = indices[index];

            const card = document.createElement("div");
            card.classList.add("card");
            if (favorites.has(index)) card.classList.add("favorite");
            if (isMinimized) card.classList.add("minimized");
            card.dataset.index = index;

            if (!isMinimized) {
                card.innerHTML = `
                    <div class="card-header">
                        <div class="date">${indexData.city}</div>
                    </div>
                    <div class="card-body">
                        <h3>${indexData.name}</h3>
                        <div class="index-value">${indexData.value.toLocaleString()}</div>
                        <div class="index-change ${indexData.change >= 0 ? 'positive' : 'negative'}">
                            ${indexData.change >= 0 ? '+' : ''}${indexData.change}%
                        </div>
                    </div>
                `;
            } else {
                card.innerHTML = `
                    <div class="card-header">
                        <div class="date">${indexData.city}</div>
                    </div>
                    <div class="card-body">
                        <h3>${indexData.name}</h3>
                        <div class="index-value">${indexData.value.toLocaleString()}</div>
                    </div>
                `;
            }

            marketSection.appendChild(card);

            card.addEventListener("click", (e) => {
                if (e.target.closest(".market-status")) return;
                const item = card.dataset.index || card.dataset.market;
                if (item) {
                    if (favorites.has(item)) {
                        favorites.delete(item);
                        card.classList.remove("favorite");
                    } else {
                        favorites.add(item);
                        card.classList.add("favorite");
                        setTimeout(() => {
                            if (favorites.has(item)) {
                                card.classList.remove("favorite");
                                favorites.delete(item);
                            }
                        }, 3000);
                    }
                    updateCards();
                }
            });
        });
    } else {
        let marketsToShow = Object.keys(marketHours).filter(market => {
            const marketData = marketHours[market];
            const regionMatch = regionFilter === "all" || marketData.region === regionFilter;
            const searchMatch = market.toLowerCase().includes(searchQuery) || marketData.city.toLowerCase().includes(searchQuery);
            const favoriteMatch = !showFavoritesOnly || favorites.has(market);
            return regionMatch && searchMatch && favoriteMatch;
        });

        marketsToShow.forEach(market => {
            const marketData = marketHours[market];
            const timezone = marketData.timezone;
            const city = marketData.city;

            const now = new Date();
            const timeDetails = getTimeDetails(now, timezone);
            const currentTime = timeDetails.hour * 60 + timeDetails.minute;
            const fullTime = `${timeDetails.hour.toString().padStart(2, '0')}:${timeDetails.minute.toString().padStart(2, '0')}:${timeDetails.second.toString().padStart(2, '0')}`;

            let isOpen = false;
            let openTime = null, closeTime = null;

            if (market === "JPX") {
                const openTime1 = convertToMinutes(marketData.open1);
                const closeTime1 = convertToMinutes(marketData.close1);
                const openTime2 = convertToMinutes(marketData.open2);
                const closeTime2 = convertToMinutes(marketData.close2);

                if (currentTime >= openTime1 && currentTime < closeTime1) {
                    isOpen = true;
                    openTime = openTime1;
                    closeTime = closeTime1;
                } else if (currentTime >= openTime2 && currentTime < closeTime2) {
                    isOpen = true;
                    openTime = openTime2;
                    closeTime = closeTime2;
                }
            } else {
                openTime = convertToMinutes(marketData.open);
                closeTime = convertToMinutes(marketData.close);
                isOpen = currentTime >= openTime && currentTime < closeTime;
            }

            const openDisplay = openTime !== null ? formatHoursMinutes(openTime) : "N/A";
            const closeDisplay = closeTime !== null ? formatHoursMinutes(closeTime) : "N/A";

            let hoursDisplay;
            if (market === "JPX") {
                hoursDisplay = `Session 1: ${marketData.open1} - ${marketData.close1}, Session 2: ${marketData.open2} - ${marketData.close2}`;
            } else {
                hoursDisplay = `Open: ${openDisplay} - Close: ${closeDisplay}`;
            }

            const timeLeft = isOpen ? formatTimeLeft(closeTime - currentTime) : formatTimeLeft(getTimeUntilOpen(market, currentTime));
            const remainingTimePercent = isOpen ? ((closeTime - currentTime) / (closeTime - openTime)) * 100 : 0;

            const card = document.createElement("div");
            card.classList.add("card");
            if (favorites.has(market)) card.classList.add("favorite");
            if (isMinimized) card.classList.add("minimized");
            card.dataset.market = market;

            if (!isMinimized) {
                card.innerHTML = `
                    <div class="card-header">
                        <div class="date">${city}</div>
                        <div class="market-status ${isOpen ? "status-open" : "status-closed"}">
                            ${isOpen ? "OPEN" : "CLOSED"}
                        </div>
                    </div>
                    <div class="card-body">
                        <h3>${market} Market</h3>
                        <p>${hoursDisplay}</p>
                        <div class="digital-clock">
                            <span class="visually-hidden">Current Time: ${fullTime}</span>
                            <span class="time-display">${fullTime}</span>
                        </div>
                        <div class="progress">
                            <span>Time Left: <span class="time-left">${timeLeft}</span></span>
                            <div class="progress-bar">
                                <div class="progress-bar-fill" style="width: ${remainingTimePercent}%;"></div>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                card.innerHTML = `
                    <div class="card-header">
                        <div class="date">${city}</div>
                        <div class="market-status ${isOpen ? "status-open" : "status-closed"}">
                            ${isOpen ? "OPEN" : "CLOSED"}
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="digital-clock">
                            <span class="visually-hidden">Current Time: ${fullTime}</span>
                            <span class="time-display">${fullTime}</span>
                        </div>
                    </div>
                `;
            }

            marketSection.appendChild(card);

            card.addEventListener("click", (e) => {
                if (e.target.closest(".market-status")) return;
                const market = card.dataset.market;
                if (market) {
                    if (favorites.has(market)) {
                        favorites.delete(market);
                        card.classList.remove("favorite");
                    } else {
                        favorites.add(market);
                        card.classList.add("favorite");
                        setTimeout(() => {
                            if (favorites.has(market)) {
                                card.classList.remove("favorite");
                                favorites.delete(market);
                            }
                        }, 3000);
                    }
                    updateCards();
                }
            });
        });
    }
}

function setBodyPadding() {
    const header = document.getElementById("header");
    const headerHeight = header.offsetHeight;
    document.body.style.paddingTop = `${headerHeight}px`;
}

document.getElementById("region-filter").addEventListener("change", updateCards);
document.getElementById("search").addEventListener("input", updateCards);
document.getElementById("toggle-view").addEventListener("click", function() {
    isMinimized = !isMinimized;
    this.textContent = isMinimized ? "Show Details" : "Minimize";
    updateCards();
});
document.getElementById("toggle-favorites").addEventListener("click", function() {
    showFavoritesOnly = !showFavoritesOnly;
    this.textContent = showFavoritesOnly ? "Show All" : "Favorites";
    updateCards();
});
document.getElementById("toggle-exchanges").addEventListener("click", function() {
    showIndices = false;
    this.classList.add("active");
    document.getElementById("toggle-indices").classList.remove("active");
    updateCards();
});
document.getElementById("toggle-indices").addEventListener("click", function() {
    showIndices = true;
    this.classList.add("active");
    document.getElementById("toggle-exchanges").classList.remove("active");
    updateCards();
});

document.addEventListener("DOMContentLoaded", () => {
    setBodyPadding();
    updateCards();
    setInterval(updateCards, 1000);
});

window.addEventListener("resize", setBodyPadding);
