const marketHours = {
    NYSE: { open: "09:30", close: "16:00", timezone: "America/New_York", region: "North America", city: "New York" },
    NASDAQ: { open: "09:30", close: "16:00", timezone: "America/New_York", region: "North America", city: "New York" },
    LSE: { open: "08:00", close: "16:30", timezone: "Europe/London", region: "Europe", city: "London" },
    XETRA: { open: "09:00", close: "17:30", timezone: "Europe/Berlin", region: "Europe", city: "Frankfurt" },
    JPX: { 
        open1: "09:00", close1: "11:30", 
        open2: "12:30", close2: "15:00",
        timezone: "Asia/Tokyo", 
        region: "Asia",
        city: "Tokyo"
    },
    HKEX: { open: "09:30", close: "16:00", timezone: "Asia/Hong_Kong", region: "Asia", city: "Hong Kong" },
    ASX: { open: "10:00", close: "16:00", timezone: "Australia/Sydney", region: "Australia", city: "Sydney" },
    SSE: { open: "09:30", close: "15:00", timezone: "Asia/Shanghai", region: "Asia", city: "Shanghai" },
    BSE: { open: "09:15", close: "15:30", timezone: "Asia/Kolkata", region: "Asia", city: "Mumbai" },
    TSX: { open: "09:30", close: "16:00", timezone: "America/Toronto", region: "North America", city: "Toronto" },
    SIX: { open: "09:00", close: "17:30", timezone: "Europe/Zurich", region: "Europe", city: "Zurich" },
    Euronext: { open: "09:00", close: "17:30", timezone: "Europe/Paris", region: "Europe", city: "Paris" },
    KRX: { open: "09:00", close: "15:30", timezone: "Asia/Seoul", region: "Asia", city: "Seoul" },
    BME: { open: "09:00", close: "17:30", timezone: "Europe/Madrid", region: "Europe", city: "Madrid" },
    TASE: { open: "09:30", close: "17:30", timezone: "Asia/Jerusalem", region: "Asia", city: "Tel Aviv" },
    IDX: { open: "09:00", close: "15:30", timezone: "Asia/Jakarta", region: "Asia", city: "Jakarta" },
    JSE: { open: "09:00", close: "17:00", timezone: "Africa/Johannesburg", region: "Africa", city: "Johannesburg" },
    NSE: { open: "09:15", close: "15:30", timezone: "Asia/Kolkata", region: "Asia", city: "Mumbai" },
    ZSE: { open: "09:00", close: "16:00", timezone: "Africa/Harare", region: "Africa", city: "Harare" }
};

let isMinimized = false;
let showFavoritesOnly = false;
let favorites = new Set();

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

function updateMarketCards() {
    const regionFilter = document.getElementById("region-filter").value;
    const searchQuery = document.getElementById("search").value.toLowerCase();
    const marketSection = document.getElementById("market-section");
    marketSection.innerHTML = "";

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
                } else {
                    favorites.add(market);
                }
                updateMarketCards();
            }
        });
    });
}

function setBodyPadding() {
    const header = document.getElementById("header");
    const headerHeight = header.offsetHeight;
    document.body.style.paddingTop = `${headerHeight}px`;
}

document.getElementById("region-filter").addEventListener("change", updateMarketCards);
document.getElementById("search").addEventListener("input", updateMarketCards);
document.getElementById("toggle-view").addEventListener("click", function() {
    isMinimized = !isMinimized;
    this.textContent = isMinimized ? "Show Details" : "Minimize";
    updateMarketCards();
});
document.getElementById("toggle-favorites").addEventListener("click", function() {
    showFavoritesOnly = !showFavoritesOnly;
    this.textContent = showFavoritesOnly ? "Show All" : "Favorites";
    updateMarketCards();
});

document.addEventListener("DOMContentLoaded", () => {
    setBodyPadding();
    updateMarketCards();
    setInterval(updateMarketCards, 1000);
});

window.addEventListener("resize", setBodyPadding);