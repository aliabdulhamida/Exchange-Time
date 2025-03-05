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
    SP500: { name: "S&P 500", region: "North America", city: "New York", symbol: "^GSPC" },
    DJIA: { name: "Dow Jones", region: "North America", city: "New York", symbol: "^DJI" },
    NASDAQ100: { name: "Nasdaq 100", region: "North America", city: "New York", symbol: "^NDX" },
    TSXCOMP: { name: "S&P/TSX Composite", region: "North America", city: "Toronto", symbol: "^GSPTSE" },
    FTSE100: { name: "FTSE 100", region: "Europe", city: "London", symbol: "^FTSE" },
    DAX: { name: "DAX", region: "Europe", city: "Frankfurt", symbol: "^GDAXI" },
    CAC40: { name: "CAC 40", region: "Europe", city: "Paris", symbol: "^FCHI" },
    IBEX35: { name: "IBEX 35", region: "Europe", city: "Madrid", symbol: "^IBEX" },
    FTSEMIB: { name: "FTSE MIB", region: "Europe", city: "Milan", symbol: "FTSEMIB.MI" },
    NIKKEI225: { name: "Nikkei 225", region: "Asia", city: "Tokyo", symbol: "^N225" },
    HSI: { name: "Hang Seng Index", region: "Asia", city: "Hong Kong", symbol: "^HSI" },
    SENSEX: { name: "BSE Sensex", region: "Asia", city: "Mumbai", symbol: "^BSESN" },
    NIFTY50: { name: "NIFTY 50", region: "Asia", city: "Mumbai", symbol: "^NSEI" },
    KOSPI: { name: "KOSPI", region: "Asia", city: "Seoul", symbol: "^KS11" },
    SSECOMP: { name: "SSE Composite", region: "Asia", city: "Shanghai", symbol: "000001.SS" },
    ASX200: { name: "S&P/ASX 200", region: "Australia", city: "Sydney", symbol: "^AXJO" },
    NZX50: { name: "NZX 50", region: "Australia", city: "Wellington", symbol: "^NZ50" },
    JTOPI: { name: "Johannesburg Top 40", region: "Africa", city: "Johannesburg", symbol: "^JTOPI" },
    IBOV: { name: "Ibovespa", region: "South America", city: "São Paulo", symbol: "^BVSP" },
    MERVAL: { name: "Merval", region: "South America", city: "Buenos Aires", symbol: "^MERV" }
};

// Initialize real-time value and change properties
Object.keys(indices).forEach(key => {
    indices[key].value = 0;
    indices[key].change = 0;
});

let isMinimized = false;
let showFavoritesOnly = false;
let favorites = new Set();
let showIndices = false;

// Finnhub WebSocket setup
const finnhubApiKey = "cv4do51r01qn2ga9jptgcv4do51r01qn2ga9jpu0"; // Replace with your Finnhub API key
const socket = new WebSocket(`wss://ws.finnhub.io?token=${finnhubApiKey}`);

socket.onopen = () => {
    console.log("WebSocket connected");
    Object.keys(indices).forEach(index => {
        socket.send(JSON.stringify({ type: "subscribe", symbol: indices[index].symbol }));
    });
};

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === "trade" && data.data) {
        data.data.forEach(trade => {
            const indexKey = Object.keys(indices).find(key => indices[key].symbol === trade.s);
            if (indexKey) {
                const lastValue = indices[indexKey].value || trade.p;
                indices[indexKey].value = trade.p;
                indices[indexKey].change = ((trade.p - lastValue) / lastValue * 100).toFixed(2);
            }
        });
        updateCards();
    }
};

socket.onerror = (error) => {
    console.error("WebSocket error:", error);
};

socket.onclose = () => {
    console.log("WebSocket closed");
};

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
                const item = card.dataset.index;
                if (item) {
                    if (favorites.has(item)) {
                        favorites.delete(item);
                        card.classList.remove("favorite");
                    } else {
                        favorites.add(item);
                        card.classList.add("favorite");
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
                const item = card.dataset.market;
                if (item) {
                    if (favorites.has(item)) {
                        favorites.delete(item);
                        card.classList.remove("favorite");
                    } else {
                        favorites.add(item);
                        card.classList.add("favorite");
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
    setInterval(updateCards, 5000); // Update every 5 seconds for market clocks
});

window.addEventListener("resize", setBodyPadding);
