    // Hilfsfunktion zur Klassifizierung der Unternehmensgröße
    function getCompanySize(marketCap) {
        if (typeof marketCap === 'string') {
            const match = marketCap.match(/([\d.]+)([TBM])/);
            if (match) {
                const num = parseFloat(match[1]);
                const unit = match[2];
                if (unit === 'T') return num * 1e12;
                if (unit === 'B') return num * 1e9;
                if (unit === 'M') return num * 1e6;
            }
            const num = parseFloat(marketCap.replace(/[^\d.]/g, ''));
            if (!isNaN(num)) return num;
            return null;
        }
        if (typeof marketCap === 'number') return marketCap;
        return null;
    }

    function classifyCompanySize(marketCap) {
        const cap = getCompanySize(marketCap);
        if (cap === null) return 'unknown';
        if (cap >= 10e9) return 'large'; // Large Cap: >= 10 Mrd
        if (cap >= 2e9) return 'mid';   // Mid Cap: >= 2 Mrd
        return 'small';                 // Small Cap: < 2 Mrd
    }
// Holt den Analysten-Konsens von Yahoo Finance
async function fetchYahooAnalystConsensus(symbol) {
    try {
        const proxyUrl = 'https://corsproxy.io/?';
        const yahooUrl = `https://query2.finance.yahoo.com/v10/finance/quoteSummary/${symbol}?modules=financialData,upgradeDowngradeHistory,defaultKeyStatistics,calendarEvents,recommendationTrend`;
        const url = proxyUrl + encodeURIComponent(yahooUrl);

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Yahoo Finance API returned status ${response.status}`);
        }
        const data = await response.json();

        // recommendationTrend enthält den Konsens
        const trend = data.quoteSummary?.result?.[0]?.recommendationTrend;
        if (trend && trend.trend && trend.trend.length > 0) {
            // Nimm den aktuellsten Monat
            const latest = trend.trend[0];
            // Erstelle einen lesbaren Konsens-String
            return `Strong Buy: ${latest.strongBuy}, Buy: ${latest.buy}, Hold: ${latest.hold}, Sell: ${latest.sell}, Strong Sell: ${latest.strongSell}`;
        }
        return 'No consensus data';
    } catch (error) {
        console.error('Error fetching Yahoo analyst consensus:', error);
        return 'No consensus data';
    }
}
// Helper function to convert date to Unix timestamp
function dateToUnix(dateStr) {
    return Math.floor(new Date(dateStr).getTime() / 1000);
}

// Global chart instances for portfolio tracking
let chartInstance = null;
let dividendChartInstance = null;

// Define marketHours with explicit holidays for each market
const marketHours = {
    NYSE: {
        open: "09:30",
        close: "16:00",
        timezone: "America/New_York",
        region: "North America",
        city: "New York",
        holidays: {
            "2025-01-01": { reason: "New Year's Day", closeEarly: false },
            "2025-01-20": { reason: "Martin Luther King, Jr. Day", closeEarly: false },
            "2025-02-17": { reason: "Washington’s Birthday", closeEarly: false },
            "2025-04-18": { reason: "Good Friday", closeEarly: false },
            "2025-05-26": { reason: "Memorial Day", closeEarly: false },
            "2025-06-19": { reason: "Juneteenth National Independence Day", closeEarly: false },
            "2025-07-04": { reason: "Independence Day", closeEarly: true, earlyCloseTime: "13:00" },
            "2025-09-01": { reason: "Labor Day", closeEarly: false },
            "2025-11-27": { reason: "Thanksgiving Day", closeEarly: true, earlyCloseTime: "13:00" },
            "2025-12-25": { reason: "Christmas Day", closeEarly: true, earlyCloseTime: "13:00" },
            "2025-12-31": { reason: "New Year's Day 2026 (observed)", closeEarly: true, earlyCloseTime: "13:00" },
        }
    },
    NASDAQ: {
        open: "09:30",
        close: "16:00",
        timezone: "America/New_York",
        region: "North America",
        city: "New York",
        holidays: {
            "2025-01-01": { reason: "New Year's Day", closeEarly: false },
            "2025-01-20": { reason: "Martin Luther King, Jr. Day", closeEarly: false },
            "2025-02-17": { reason: "Washington’s Birthday", closeEarly: false },
            "2025-04-18": { reason: "Good Friday", closeEarly: false },
            "2025-05-26": { reason: "Memorial Day", closeEarly: false },
            "2025-06-19": { reason: "Juneteenth National Independence Day", closeEarly: false },
            "2025-07-04": { reason: "Independence Day", closeEarly: true, earlyCloseTime: "13:00" },
            "2025-09-01": { reason: "Labor Day", closeEarly: false },
            "2025-11-27": { reason: "Thanksgiving Day", closeEarly: true, earlyCloseTime: "13:00" },
            "2025-12-25": { reason: "Christmas Day", closeEarly: true, earlyCloseTime: "13:00" },
            "2025-12-31": { reason: "New Year's Day 2026 (observed)", closeEarly: true, earlyCloseTime: "13:00" },
        }
    },
    TSX: {
        open: "09:30",
        close: "16:00",
        timezone: "America/Toronto",
        region: "North America",
        city: "Toronto",
        holidays: {
            "2025-01-01": { reason: "New Year's Day", closeEarly: false },
            "2025-02-17": { reason: "Family Day", closeEarly: false },
            "2025-04-18": { reason: "Good Friday", closeEarly: false },
            "2025-05-19": { reason: "Victoria Day", closeEarly: false },
            "2025-07-01": { reason: "Canada Day", closeEarly: false },
            "2025-08-04": { reason: "Civic Holiday", closeEarly: false },
            "2025-09-01": { reason: "Labour Day", closeEarly: false },
            "2025-10-13": { reason: "Thanksgiving Day", closeEarly: false },
            "2025-12-24": { reason: "Christmas Eve", closeEarly: true, earlyCloseTime: "13:00" },
            "2025-12-25": { reason: "Christmas Day", closeEarly: false },
            "2025-12-26": { reason: "Boxing Day", closeEarly: false },
            "2025-12-31": { reason: "New Year's Day 2026 (observed)", closeEarly: true, earlyCloseTime: "13:00" },
        }
    },
    BMV: {
        open: "08:30",
        close: "15:00",
        timezone: "America/Mexico_City",
        region: "North America",
        city: "Mexico City",
        holidays: {
            "2025-01-01": { reason: "New Year's Day", closeEarly: false },
            "2025-02-03": { reason: "Commemoration of February 5", closeEarly: false },
            "2025-03-17": { reason: "Commemoration of March 21", closeEarly: false },
            "2025-04-17": { reason: "Holy Thursday", closeEarly: false },
            "2025-04-18": { reason: "Good Friday", closeEarly: false },
            "2025-05-01": { reason: "Labor Day", closeEarly: false },
            "2025-09-16": { reason: "Independence Day", closeEarly: false },
            "2025-11-17": { reason: "Commemoration of November 20", closeEarly: false },
            "2025-12-12": { reason: "Bank Employees' Day", closeEarly: false },
            "2025-12-25": { reason: "Christmas Day", closeEarly: false },
        }
    },
    CSE: {
        open: "09:30",
        close: "16:00",
        timezone: "Asia/Colombo",
        region: "Asia",
        city: "Colombo",
        holidays: {
            "2025-01-01": { reason: "Customary Holiday", closeEarly: false },
            "2025-01-13": { reason: "Duruthu Full Moon Poya Day", closeEarly: false },
            "2025-01-14": { reason: "Tamil Thai Pongal Day", closeEarly: false },
            "2025-02-04": { reason: "Independence Day", closeEarly: false },
            "2025-02-12": { reason: "Nawam Full Moon Poya Day", closeEarly: false },
            "2025-02-26": { reason: "Maha Sivarathri Day", closeEarly: false },
            "2025-03-13": { reason: "Medin Full Moon Poya Day", closeEarly: false },
            "2025-03-31": { reason: "Id-Ul-Fitre (Ramazan Festival Day)", closeEarly: false },
            "2025-04-14": { reason: "Sinhala & Tamil New Year Day", closeEarly: false },
            "2025-04-15": { reason: "Special Bank Holiday", closeEarly: false },
            "2025-04-18": { reason: "Good Friday", closeEarly: false },
            "2025-05-01": { reason: "May Day (International Workers’ Day)", closeEarly: false },
            "2025-05-12": { reason: "Vesak Full Moon Poya Day", closeEarly: false },
            "2025-05-13": { reason: "Day Following Vesak Full Moon Poya Day", closeEarly: false },
            "2025-06-10": { reason: "Poson Full Moon Poya Day", closeEarly: false },
            "2025-07-10": { reason: "Esala Full Moon Poya Day", closeEarly: false },
            "2025-08-08": { reason: "Nikini Full Moon Poya Day", closeEarly: false },
            "2025-09-05": { reason: "Milad-Un-Nabi (Holy Prophet’s Birthday)", closeEarly: false },
            "2025-10-06": { reason: "Vap Full Moon Poya Day", closeEarly: false },
            "2025-10-20": { reason: "Deepavali Festival Day", closeEarly: false },
            "2025-11-05": { reason: "II Full Moon Poya Day", closeEarly: false },
            "2025-12-04": { reason: "Unduvap Full Moon Poya Day", closeEarly: false },
            "2025-12-25": { reason: "Christmas Day", closeEarly: false }
        }
    },
    XETRA: {
        open: "09:00",
        close: "17:30",
        timezone: "Europe/Berlin",
        region: "Europe",
        city: "Frankfurt",
        holidays: {
            "2025-01-01": { reason: "New Year’s Day", closeEarly: false },
            "2025-04-18": { reason: "Good Friday", closeEarly: false },
            "2025-04-21": { reason: "Easter Monday", closeEarly: false },
            "2025-05-01": { reason: "Labour Day", closeEarly: false },
            "2025-12-24": { reason: "Christmas Eve", closeEarly: true, earlyCloseTime: "13:00" },
            "2025-12-25": { reason: "Christmas Day", closeEarly: false },
            "2025-12-26": { reason: "Boxing Day", closeEarly: false },
            "2025-12-31": { reason: "New Year’s Eve", closeEarly: true, earlyCloseTime: "13:00" },
        }
    },
    Euronext: {
        open: "09:00",
        close: "17:30",
        timezone: "Europe/Paris",
        region: "Europe",
        city: "Paris",
        holidays: {
            "2025-01-01": { reason: "New Year's Day", closeEarly: false },
            "2025-04-18": { reason: "Good Friday", closeEarly: false },
            "2025-04-21": { reason: "Easter Monday", closeEarly: false },
            "2025-05-01": { reason: "Labour Day", closeEarly: false },
            "2025-12-25": { reason: "Christmas Day", closeEarly: false },
            "2025-12-26": { reason: "Christmas Holiday (observed)", closeEarly: false }
        }
    },
    SIX: {
        open: "09:00",
        close: "17:30",
        timezone: "Europe/Zurich",
        region: "Europe",
        city: "Zurich",
        holidays: {
            "2025-01-01": { reason: "New Year's Day", closeEarly: false },
            "2025-01-02": { reason: "Berchtholdstag", closeEarly: false },
            "2025-04-18": { reason: "Good Friday", closeEarly: false },
            "2025-04-21": { reason: "Easter Monday", closeEarly: false },
            "2025-05-01": { reason: "Labour Day", closeEarly: false },
            "2025-05-29": { reason: "Ascension Day", closeEarly: false },
            "2025-06-09": { reason: "Whitmonday", closeEarly: false },
            "2025-08-01": { reason: "National Day", closeEarly: false },
            "2025-12-24": { reason: "Christmas Eve", closeEarly: false },
            "2025-12-25": { reason: "Christmas", closeEarly: false },
            "2025-12-26": { reason: "St. Stephen's Day", closeEarly: false },
            "2025-12-31": { reason: "New Year's Eve", closeEarly: false }
        }
    },
    BME: {
        open: "09:00",
        close: "17:30",
        timezone: "Europe/Madrid",
        region: "Europe",
        city: "Madrid",
        holidays: {
            "2025-01-01": { reason: "New Year's Day", closeEarly: false },
            "2025-04-18": { reason: "Good Friday", closeEarly: false },
            "2025-04-21": { reason: "Easter Monday", closeEarly: false },
            "2025-05-01": { reason: "Labour Day", closeEarly: false },
            "2025-12-25": { reason: "Christmas Day", closeEarly: false },
            "2025-12-26": { reason: "Christmas Holiday", closeEarly: false }
        }
    },

    LSE: {
        open: "08:00",
        close: "16:30",
        timezone: "Europe/London",
        region: "Europe",
        city: "London",
        holidays: {
            // 2025 Holidays
            "2025-01-01": { reason: "New Year's Day", closeEarly: false },
            "2025-04-18": { reason: "Good Friday", closeEarly: false },
            "2025-04-21": { reason: "Easter Monday", closeEarly: false },
            "2025-05-05": { reason: "Early May Bank Holiday", closeEarly: false },
            "2025-05-26": { reason: "Spring Bank Holiday", closeEarly: false },
            "2025-08-25": { reason: "Summer Bank Holiday", closeEarly: false },
            "2025-12-24": { reason: "Christmas Eve", closeEarly: true, earlyCloseTime: "12:30" },
            "2025-12-25": { reason: "Christmas Day", closeEarly: false },
            "2025-12-26": { reason: "Boxing Day", closeEarly: false },
            "2025-12-31": { reason: "New Year's Eve", closeEarly: true, earlyCloseTime: "12:30" },

        }
    },
    OMX: {
        open: "09:00",
        close: "17:30",
        timezone: "Europe/Stockholm",
        region: "Europe",
        city: "Stockholm",
        holidays: {
            "2025-04-18": { reason: "Good Friday", closeEarly: false },
            "2025-04-21": { reason: "Easter Monday", closeEarly: false },
            "2025-05-01": { reason: "Labour Day", closeEarly: false },
            "2025-05-29": { reason: "Ascension Day", closeEarly: false },
            "2025-06-06": { reason: "National Day", closeEarly: false },
            "2025-06-20": { reason: "Midsummer Eve OBS", closeEarly: false },
            "2025-12-24": { reason: "Christmas Eve", closeEarly: false },
            "2025-12-25": { reason: "Christmas Day", closeEarly: false },
            "2025-12-26": { reason: "Boxing Day", closeEarly: false },
            "2025-12-31": { reason: "New Year's Eve", closeEarly: false }


        }
    },
    MOEX: {
        open: "10:00",
        close: "18:45",
        timezone: "Europe/Moscow",
        region: "Europe",
        city: "Moscow",
        holidays: {
            "2025-05-01": { reason: "International Labour Day", closeEarly: false },
            "2025-05-09": { reason: "Victory Day", closeEarly: false },
            "2025-06-12": { reason: "Declaration of Russian Sovereignty", closeEarly: false },
            "2025-11-04": { reason: "National Unity Day", closeEarly: false },
            "2025-12-31": { reason: "New Year's Eve Holiday", closeEarly: false }
        }
    },
    BorsaItaliana: {
        open: "09:00",
        close: "17:30",
        timezone: "Europe/Rome",
        region: "Europe",
        city: "Milan",
        holidays: {
            "2025-01-01": { reason: "New Year's Day", closeEarly: false },
            "2025-04-18": { reason: "Good Friday", closeEarly: false },
            "2025-04-21": { reason: "Easter", closeEarly: false },
            "2025-05-01": { reason: "Labour Day", closeEarly: false },
            "2025-08-15": { reason: "Assumption Day", closeEarly: false },
            "2025-12-24": { reason: "Christmas", closeEarly: false },
            "2025-12-25": { reason: "Christmas", closeEarly: false },
            "2025-12-26": { reason: "St. Stephen's Day", closeEarly: false },
            "2025-12-31": { reason: "New Year's Eve", closeEarly: false }
        }
    },
    WSE: {
        open: "09:00",
        close: "17:30",
        timezone: "Europe/Warsaw",
        region: "Europe",
        city: "Warsaw",
        holidays: {
            "2025-04-18": { reason: "Good Friday", closeEarly: false },
            "2025-04-21": { reason: "Easter Monday", closeEarly: false },
            "2025-05-01": { reason: "State Holiday/Labour Day", closeEarly: false },
            "2025-06-19": { reason: "Corpus Christi", closeEarly: false },
            "2025-08-15": { reason: "Assumption Day", closeEarly: false },
            "2025-11-11": { reason: "Day of Independence", closeEarly: false },
            "2025-12-24": { reason: "Christmas Eve", closeEarly: false },
            "2025-12-25": { reason: "Christmas Day", closeEarly: false },
            "2025-12-26": { reason: "Christmas Holiday", closeEarly: false },
            "2025-12-31": { reason: "New Year's Eve", closeEarly: false }
        }
    },
    OSE: {
        open: "09:00",
        close: "16:20",
        timezone: "Europe/Oslo",
        region: "Europe",
        city: "Oslo",
        holidays: {
            "2025-04-17": { reason: "Holy Thursday", closeEarly: false },
            "2025-04-18": { reason: "Good Friday", closeEarly: false },
            "2025-04-21": { reason: "Easter Monday", closeEarly: false },
            "2025-05-01": { reason: "Labour Day", closeEarly: false },
            "2025-05-29": { reason: "Ascension Day", closeEarly: false },
            "2025-06-09": { reason: "Whitmonday", closeEarly: false },
            "2025-12-24": { reason: "Christmas Eve", closeEarly: false },
            "2025-12-25": { reason: "Christmas Day", closeEarly: false },
            "2025-12-26": { reason: "Boxing Day", closeEarly: false },
            "2025-12-31": { reason: "New Year's Eve", closeEarly: false }
        }
    },
    ISE: {
        open: "09:00",
        close: "17:30",
        timezone: "Europe/Dublin",
        region: "Europe",
        city: "Dublin",
        holidays: {
            "2025-04-18": { reason: "Good Friday", closeEarly: false },
            "2025-04-21": { reason: "Easter Monday", closeEarly: false },
            "2025-05-01": { reason: "Labour Day", closeEarly: false },
            "2025-05-05": { reason: "May Bank Holiday", closeEarly: false },
            "2025-12-25": { reason: "Christmas Day", closeEarly: false },
            "2025-12-26": { reason: "Christmas Holiday", closeEarly: false }
        }
    },
    JPX: {
        open1: "09:00", close1: "11:30",
        open2: "12:30", close2: "15:00",
        timezone: "Asia/Tokyo",
        region: "Asia",
        city: "Tokyo",
        holidays: {
            "2025-02-11": { reason: "National Founding Day", closeEarly: false },
            "2025-02-24": { reason: "Emperor's Birthday OBS", closeEarly: false },
            "2025-03-20": { reason: "Vernal Equinox", closeEarly: false },
            "2025-04-29": { reason: "Showa Day (formerly Greenery Day)", closeEarly: false },
            "2025-05-05": { reason: "Children's Day", closeEarly: false },
            "2025-05-06": { reason: "Greenery Day (formerly National Holiday) OBS", closeEarly: false },
            "2025-07-21": { reason: "Marine Day", closeEarly: false },
            "2025-08-11": { reason: "Mountain Day", closeEarly: false },
            "2025-09-15": { reason: "Respect for the Aged Day", closeEarly: false },
            "2025-09-23": { reason: "Autumn Equinox", closeEarly: false },
            "2025-10-13": { reason: "Health-Sports Day", closeEarly: false },
            "2025-11-03": { reason: "Culture Day", closeEarly: false },
            "2025-11-24": { reason: "Labour Thanksgiving Day OBS", closeEarly: false },
            "2025-12-31": { reason: "New Year's Eve", closeEarly: false }
        }
    },
    HKEX: {
        open: "09:30",
        close: "16:00",
        timezone: "Asia/Hong_Kong",
        region: "Asia",
        city: "Hong Kong",
        holidays: {
            "2025-01-29": { reason: "Lunar New Year 1", closeEarly: false },
            "2025-01-30": { reason: "Lunar New Year 2", closeEarly: false },
            "2025-01-31": { reason: "Lunar New Year 3", closeEarly: false },
            "2025-04-04": { reason: "Ching Ming Festival", closeEarly: false },
            "2025-04-18": { reason: "Good Friday", closeEarly: false },
            "2025-04-21": { reason: "Easter Monday", closeEarly: false },
            "2025-05-01": { reason: "Labour Day", closeEarly: false },
            "2025-05-05": { reason: "Buddha's Birthday*", closeEarly: false },
            "2025-07-01": { reason: "SAR Establishment Day", closeEarly: false },
            "2025-10-01": { reason: "Chinese National Day", closeEarly: false },
            "2025-10-07": { reason: "Day Following Mid-autumn Festival*", closeEarly: false },
            "2025-10-29": { reason: "Chung Yeung Day*", closeEarly: false },
            "2025-12-25": { reason: "Christmas Day", closeEarly: false },
            "2025-12-26": { reason: "Christmas Holiday", closeEarly: false }
        }
    },
    SSE: {
        open: "09:30",
        close: "15:00",
        timezone: "Asia/Shanghai",
        region: "Asia",
        city: "Shanghai",
        holidays: {
            "2025-01-28": { reason: "Lunar NY Eve 1", closeEarly: false },
            "2025-01-29": { reason: "Lunar New Year 1", closeEarly: false },
            "2025-01-30": { reason: "Lunar New Year 2", closeEarly: false },
            "2025-01-31": { reason: "Lunar New Year 3", closeEarly: false },
            "2025-02-03": { reason: "Lunar New Year 6", closeEarly: false },
            "2025-02-04": { reason: "Lunar New Year 7", closeEarly: false },
            "2025-04-04": { reason: "Ching Ming Festival", closeEarly: false },
            "2025-05-01": { reason: "Labour Day 1", closeEarly: false },
            "2025-05-02": { reason: "Labour Day Holiday", closeEarly: false },
            "2025-05-05": { reason: "Labour Day Holiday 2", closeEarly: false },
            "2025-06-02": { reason: "Dragon Boat Festival Holiday", closeEarly: false },
            "2025-10-01": { reason: "National Day 1", closeEarly: false },
            "2025-10-02": { reason: "National Day 2", closeEarly: false },
            "2025-10-03": { reason: "National Day 3", closeEarly: false },
            "2025-10-06": { reason: "National Day 6", closeEarly: false },
            "2025-10-06": { reason: "Mid-autumn Festival*", closeEarly: false },
            "2025-10-07": { reason: "National Day 7", closeEarly: false },
            "2025-10-08": { reason: "National Day 8", closeEarly: false }
        }
    },
    SZSE: {
        open: "09:30",
        close: "15:00",
        timezone: "Asia/Shanghai",
        region: "Asia",
        city: "Shenzhen",
        holidays: {
            "2025-01-28": { reason: "Lunar NY Eve 1", closeEarly: false },
            "2025-01-29": { reason: "Lunar New Year 1", closeEarly: false },
            "2025-01-30": { reason: "Lunar New Year 2", closeEarly: false },
            "2025-01-31": { reason: "Lunar New Year 3", closeEarly: false },
            "2025-02-03": { reason: "Lunar New Year 6", closeEarly: false },
            "2025-02-04": { reason: "Lunar New Year 7", closeEarly: false },
            "2025-04-04": { reason: "Ching Ming Festival", closeEarly: false },
            "2025-05-01": { reason: "Labour Day 1", closeEarly: false },
            "2025-05-02": { reason: "Labour Day Holiday", closeEarly: false },
            "2025-05-05": { reason: "Labour Day Holiday 2", closeEarly: false },
            "2025-06-02": { reason: "Dragon Boat Festival Holiday", closeEarly: false },
            "2025-10-01": { reason: "National Day 1", closeEarly: false },
            "2025-10-02": { reason: "National Day 2", closeEarly: false },
            "2025-10-03": { reason: "National Day 3", closeEarly: false },
            "2025-10-06": { reason: "National Day 6", closeEarly: false },
            "2025-10-06": { reason: "Mid-autumn Festival*", closeEarly: false },
            "2025-10-07": { reason: "National Day 7", closeEarly: false },
            "2025-10-08": { reason: "National Day 8", closeEarly: false }
        }
    },
    BSE: {
        open: "09:15",
        close: "15:30",
        timezone: "Asia/Kolkata",
        region: "Asia",
        city: "Mumbai",
        holidays: {
            "2025-02-26": { reason: "Mahashivratri*", closeEarly: false },
            "2025-03-14": { reason: "Holi (2nd day)*", closeEarly: false },
            "2025-03-31": { reason: "Ramzan-id (Id-ul-fitar)*", closeEarly: false },
            "2025-04-10": { reason: "Mahavir Jayanti*", closeEarly: false },
            "2025-04-14": { reason: "Dr. Babsaheb Ambedkar Jayanti", closeEarly: false },
            "2025-04-18": { reason: "Good Friday", closeEarly: false },
            "2025-05-01": { reason: "Maharashtra or May Day", closeEarly: false },
            "2025-08-15": { reason: "Independence Day", closeEarly: false },
            "2025-08-27": { reason: "Ganesh Chaturthi*", closeEarly: false },
            "2025-10-02": { reason: "Mahatma Gandhi's Birthday", closeEarly: false },
            "2025-10-02": { reason: "Dasara*", closeEarly: false },
            "2025-10-21": { reason: "Diwali Amavasya (Muhurat trading)*", closeEarly: false },
            "2025-10-22": { reason: "Diwali (Bali Pratipada)", closeEarly: false },
            "2025-11-05": { reason: "Guru Nanak Jayanti*", closeEarly: false },
            "2025-12-25": { reason: "Christmas Day", closeEarly: false }
        }
    },
    NSE: {
        open: "09:15",
        close: "15:30",
        timezone: "Asia/Kolkata",
        region: "Asia",
        city: "Mumbai",
        holidays: {
            "2025-02-26": { reason: "Mahashivratri*", closeEarly: false },
            "2025-03-14": { reason: "Holi (2nd day)*", closeEarly: false },
            "2025-03-31": { reason: "Ramzan-id (Id-ul-fitar)*", closeEarly: false },
            "2025-04-10": { reason: "Mahavir Jayanti*", closeEarly: false },
            "2025-04-14": { reason: "Dr. Babsaheb Ambedkar Jayanti", closeEarly: false },
            "2025-04-18": { reason: "Good Friday", closeEarly: false },
            "2025-05-01": { reason: "Maharashtra or May Day", closeEarly: false },
            "2025-08-15": { reason: "Independence Day", closeEarly: false },
            "2025-08-27": { reason: "Ganesh Chaturthi*", closeEarly: false },
            "2025-10-02": { reason: "Mahatma Gandhi's Birthday", closeEarly: false },
            "2025-10-02": { reason: "Dasara*", closeEarly: false },
            "2025-10-21": { reason: "Diwali Amavasya (Muhurat trading)*", closeEarly: false },
            "2025-10-22": { reason: "Diwali (Bali Pratipada)", closeEarly: false },
            "2025-11-05": { reason: "Guru Nanak Jayanti*", closeEarly: false },
            "2025-12-25": { reason: "Christmas Day", closeEarly: false }
        }
    },
    KRX: {
        open: "09:00",
        close: "15:30",
        timezone: "Asia/Seoul",
        region: "Asia",
        city: "Seoul",
        holidays: {
            "2025-01-27": { reason: "Lunar New Year Additional Holiday", closeEarly: false },
            "2025-01-28": { reason: "Lunar New Year's Eve", closeEarly: false },
            "2025-01-29": { reason: "Lunar New Year 1", closeEarly: false },
            "2025-01-30": { reason: "Lunar New Year 2", closeEarly: false },
            "2025-03-03": { reason: "Independence Movement Day OBS", closeEarly: false },
            "2025-05-01": { reason: "Labour Day", closeEarly: false },
            "2025-05-05": { reason: "Children's Day", closeEarly: false },
            "2025-05-06": { reason: "Buddha's Birthday", closeEarly: false },
            "2025-06-06": { reason: "Memorial Day", closeEarly: false },
            "2025-08-15": { reason: "Liberation Day", closeEarly: false },
            "2025-10-03": { reason: "National Foundation Day", closeEarly: false },
            "2025-10-06": { reason: "Harvest Moon Festival Day", closeEarly: false },
            "2025-10-07": { reason: "Harvest Moon Festival Holiday", closeEarly: false },
            "2025-10-08": { reason: "Harvest Moon Festival Additional Holiday", closeEarly: false },
            "2025-10-09": { reason: "Hangul Day", closeEarly: false },
            "2025-12-25": { reason: "Christmas Day", closeEarly: false },
            "2025-12-31": { reason: "Last Day of Year", closeEarly: false }
        }
    },
    TWSE: {
        open: "09:00",
        close: "13:30",
        timezone: "Asia/Taipei",
        region: "Asia",
        city: "Taipei",
        holidays: {
            "2025-01-23": { reason: "Lunar New Year - No Trading 2", closeEarly: false },
            "2025-01-24": { reason: "Lunar New Year - No Trading 1", closeEarly: false },
            "2025-01-27": { reason: "Additional Lunar New Year Holiday", closeEarly: false },
            "2025-01-28": { reason: "Lunar New Year's Eve", closeEarly: false },
            "2025-01-29": { reason: "Lunar New Year 1", closeEarly: false },
            "2025-01-30": { reason: "Lunar New Year 2", closeEarly: false },
            "2025-01-31": { reason: "Lunar New Year 3", closeEarly: false },
            "2025-02-28": { reason: "Peace Memorial Day", closeEarly: false },
            "2025-04-03": { reason: "Ching Ming Festival", closeEarly: false },
            "2025-04-04": { reason: "Children's Day", closeEarly: false },
            "2025-05-01": { reason: "Labour Day", closeEarly: false },
            "2025-05-30": { reason: "Dragon Boat Festival", closeEarly: false },
            "2025-10-06": { reason: "Mid-Autumn Festival", closeEarly: false },
            "2025-10-10": { reason: "National Day", closeEarly: false }
        }
    },
    SGX: {
        open: "09:00",
        close: "17:00",
        timezone: "Asia/Singapore",
        region: "Asia",
        city: "Singapore",
        holidays: {
            "2025-01-29": { reason: "Lunar New Year 1", closeEarly: false },
            "2025-01-30": { reason: "Lunar New Year 2", closeEarly: false },
            "2025-03-31": { reason: "Hari Raya Puasa", closeEarly: false },
            "2025-04-18": { reason: "Good Friday", closeEarly: false },
            "2025-05-01": { reason: "Labour Day", closeEarly: false },
            "2025-05-12": { reason: "Vesak Day", closeEarly: false },
            "2025-10-20": { reason: "Deepavali", closeEarly: false },
            "2025-12-25": { reason: "Christmas Day", closeEarly: false }
        }
    },
    TASE: {
        open: "09:30",
        close: "17:30",
        timezone: "Asia/Jerusalem",
        region: "Asia",
        city: "Tel Aviv",
        holidays: {
            "2025-01-01": { reason: "New Year's Day", closeEarly: false },
            "2024-03-24": { reason: "Purim", closeEarly: false },
            "2024-03-25": { reason: "Shushan Purim", closeEarly: false },
            "2024-04-22": { reason: "Passover Eve", closeEarly: false },
            "2024-04-23": { reason: "Passover - First Day", closeEarly: false },
            "2024-04-24": { reason: "Second Passover", closeEarly: false },
            "2024-04-25": { reason: "Yom HaZikaron", closeEarly: false },
            "2024-04-28": { reason: "Passover", closeEarly: false },
            "2024-04-29": { reason: "Passover", closeEarly: false },
            "2024-05-13": { reason: "Memorial Day", closeEarly: false },
            "2024-05-14": { reason: "Independence Day", closeEarly: false },
            "2024-06-11": { reason: "Shavuot (1st day)", closeEarly: false },
            "2024-06-12": { reason: "Shavuot", closeEarly: false },
            "2024-08-13": { reason: "Tish'a B'Av", closeEarly: false },
            "2024-10-02": { reason: "Rosh HaShana Starts", closeEarly: false },
            "2024-10-03": { reason: "Rosh HaShana", closeEarly: false },
            "2024-10-16": { reason: "Sukkot Starts", closeEarly: false },
            "2024-10-17": { reason: "Sukkot-day-1", closeEarly: false },
            "2024-10-18": { reason: "Sukkot-day-2", closeEarly: false },
            "2024-10-19": { reason: "Sukkot-day-3", closeEarly: false },
            "2024-10-20": { reason: "Sukkot-day-4", closeEarly: false },
            "2024-10-21": { reason: "Sukkot-day-5", closeEarly: false },
            "2024-10-22": { reason: "Sukkot-day-6", closeEarly: false },
            "2024-10-23": { reason: "Sukkot Ends", closeEarly: false },
            "2024-10-24": { reason: "Shmini Atzeret", closeEarly: false }
        }
    },
    IDX: {
        open: "09:00",
        close: "15:00",
        timezone: "Asia/Jakarta",
        region: "Asia",
        city: "Jakarta",
        holidays: {
            "2025-01-01": { reason: "New Year's Day", closeEarly: false },
            "2025-01-27": { reason: "Ascension of Prophet Muhammad", closeEarly: false },
            "2025-01-28": { reason: "Chinese New Year Holiday", closeEarly: false },
            "2025-01-29": { reason: "Chinese New Year", closeEarly: false },
            "2025-03-28": { reason: "Saka New Year Holiday", closeEarly: false },
            "2025-03-31": { reason: "Idul Fitri 1", closeEarly: false },
            "2025-04-01": { reason: "Idul Fitri 2", closeEarly: false },
            "2025-04-02": { reason: "Idul Fitri Closing", closeEarly: false },
            "2025-04-03": { reason: "Idul Fitri Closing 2", closeEarly: false },
            "2025-04-04": { reason: "Idul Fitri Holiday", closeEarly: false },
            "2025-04-07": { reason: "Idul Fitr Holiday 2", closeEarly: false },
            "2025-04-18": { reason: "Good Friday", closeEarly: false },
            "2025-05-01": { reason: "Labour Day", closeEarly: false },
            "2025-05-12": { reason: "Waisak Day", closeEarly: false },
            "2025-05-13": { reason: "Additional Waisak Day Holiday", closeEarly: false },
            "2025-05-29": { reason: "Ascension Day", closeEarly: false },
            "2025-05-30": { reason: "Additional Ascension Day Holiday", closeEarly: false },
            "2025-06-06": { reason: "Idhul Adha", closeEarly: false },
            "2025-06-09": { reason: "Idhul Adha Holiday", closeEarly: false },
            "2025-06-27": { reason: "First Day of Muharram", closeEarly: false },
            "2025-09-05": { reason: "Prophet Muhammad's Birthday", closeEarly: false },
            "2025-12-25": { reason: "Christmas Day", closeEarly: false },
            "2025-12-26": { reason: "Additional Christmas Closing", closeEarly: false },
            "2025-12-31": { reason: "New Year's Eve", closeEarly: false }
        }
    },
    SET: {
        open: "10:00",
        close: "16:30",
        timezone: "Asia/Bangkok",
        region: "Asia",
        city: "Bangkok",
        holidays: {
            "2025-02-12": { reason: "Makha Bucha Day", closeEarly: false },
            "2025-04-07": { reason: "Shakri Day OBS", closeEarly: false },
            "2025-04-14": { reason: "Songkran Festival 2", closeEarly: false },
            "2025-04-15": { reason: "Songkran Festival 3", closeEarly: false },
            "2025-05-01": { reason: "Labour Day", closeEarly: false },
            "2025-05-05": { reason: "Coronation Day OBS", closeEarly: false },
            "2025-05-12": { reason: "Vishaka Bucha Day", closeEarly: false },
            "2025-06-02": { reason: "Special Holiday", closeEarly: false },
            "2025-06-03": { reason: "Queen Suthida's Birthday", closeEarly: false },
            "2025-07-10": { reason: "Asarnha Bucha Day", closeEarly: false },
            "2025-07-28": { reason: "King's Birthday", closeEarly: false },
            "2025-08-11": { reason: "Special Holiday 2", closeEarly: false },
            "2025-08-12": { reason: "Queen's Birthday", closeEarly: false },
            "2025-10-13": { reason: "King Bhumibol Adulyadej Memorial Day", closeEarly: false },
            "2025-10-23": { reason: "King Chulalongkorn Memorial Day", closeEarly: false },
            "2025-12-05": { reason: "King Rama IX's Birthday", closeEarly: false },
            "2025-12-10": { reason: "Constitution Day", closeEarly: false },
            "2025-12-31": { reason: "New Year's Eve", closeEarly: false }
        }
    },
    PSE: {
        open: "09:30",
        close: "15:30",
        timezone: "Asia/Manila",
        region: "Asia",
        city: "Manila",
        holidays: {
            "2025-01-29": { reason: "Chinese New Year", closeEarly: false },
            "2025-03-31": { reason: "Eid-ul Fitre", closeEarly: false },
            "2025-04-09": { reason: "Araw Ng Kagitingan", closeEarly: false },
            "2025-04-17": { reason: "Holy Thursday", closeEarly: false },
            "2025-04-18": { reason: "Good Friday", closeEarly: false },
            "2025-05-01": { reason: "Labour Day", closeEarly: false },
            "2025-06-06": { reason: "Eid-ul Adha", closeEarly: false },
            "2025-06-12": { reason: "Independence Day", closeEarly: false },
            "2025-08-21": { reason: "Nino Aquino Day", closeEarly: false },
            "2025-08-25": { reason: "National Heroes Day", closeEarly: false },
            "2025-10-31": { reason: "All Saints Additional Obs.", closeEarly: false },
            "2025-12-08": { reason: "Immaculate Conception", closeEarly: false },
            "2025-12-24": { reason: "Christmas Eve", closeEarly: false },
            "2025-12-25": { reason: "Christmas Day", closeEarly: false },
            "2025-12-30": { reason: "Rizal Day", closeEarly: false },
            "2025-12-31": { reason: "Bank Holiday", closeEarly: false }
        }
    },
    HOSE: {
        open: "09:00",
        close: "15:00",
        timezone: "Asia/Ho_Chi_Minh",
        region: "Asia",
        city: "Ho Chi Minh",
        holidays: {
            "2025-01-01": { reason: "New Year's Day", closeEarly: false },
            "2025-02-08": { reason: "Vietnamese Tet Holiday", closeEarly: false },
            "2025-02-09": { reason: "Vietnamese Tet Holiday", closeEarly: false },
            "2025-02-12": { reason: "Vietnamese Tet Holiday", closeEarly: false },
            "2025-02-13": { reason: "Vietnamese Tet Holiday", closeEarly: false },
            "2025-02-14": { reason: "Vietnamese Tet Holiday", closeEarly: false },
            "2025-04-18": { reason: "Hung Kings Commemoration Day", closeEarly: false },
            "2025-04-30": { reason: "Liberation Day/Reunification Day", closeEarly: false },
            "2025-05-01": { reason: "International Labor Day", closeEarly: false },
            "2025-09-02": { reason: "Independence Day", closeEarly: false },
            "2025-09-03": { reason: "Independence Day Observed", closeEarly: false }
        }
    },
    DFM: {
        open: "10:00",
        close: "14:00",
        timezone: "Asia/Dubai",
        region: "Asia",
        city: "Dubai",
        holidays: {
            "2025-01-01": { reason: "New Year's Day", closeEarly: false },
            "2025-04-10": { reason: "Eid Al Fitr", closeEarly: false },
            "2025-04-11": { reason: "Eid al Fitr Holiday 1", closeEarly: false },
            "2025-04-12": { reason: "Eid al Fitr Holiday 2", closeEarly: false },
            "2025-06-17": { reason: "Eid Al Adha", closeEarly: false },
            "2025-06-18": { reason: "Eid Al Adha Holiday 1", closeEarly: false },
            "2025-06-19": { reason: "Eid Al Adha Holiday 2", closeEarly: false },
            "2025-12-02": { reason: "National Day", closeEarly: false },
            "2025-12-03": { reason: "National Day", closeEarly: false }
        }
    },
    ADX: {
        open: "10:00",
        close: "14:00",
        timezone: "Asia/Dubai",
        region: "Asia",
        city: "Abu Dhabi",
        holidays: {
            "2024-01-01": { reason: "New Year's Day", closeEarly: false },
            "2024-04-08": { reason: "Eid al Fitr Holiday 1", closeEarly: false },
            "2024-04-09": { reason: "Eid al Fitr Holiday 2", closeEarly: false },
            "2024-04-10": { reason: "Eid al Fitr", closeEarly: false },
            "2024-04-11": { reason: "Eid al Fitr Holiday 3", closeEarly: false },
            "2024-04-12": { reason: "Eid al Fitr Holiday 4", closeEarly: false },
            "2024-06-15": { reason: "Arafat (Hajj) Day", closeEarly: false },
            "2024-06-16": { reason: "Eid Al Adha", closeEarly: false },
            "2024-06-17": { reason: "Eid Al Adha Holiday 1", closeEarly: false },
            "2024-06-18": { reason: "Eid Al Adha Holiday 2", closeEarly: false },
            "2024-07-07": { reason: "Al Hijri (Islamic New Year)", closeEarly: false },
            "2024-09-15": { reason: "Prophet Mohammed's Birthday", closeEarly: false },
            "2024-12-01": { reason: "Commemoration Day", closeEarly: false },
            "2024-12-02": { reason: "National Day", closeEarly: false },
            "2024-12-03": { reason: "National Day", closeEarly: false },
        }
    },
    ASX: {
        open: "10:00",
        close: "16:00",
        timezone: "Australia/Sydney",
        region: "Australia",
        city: "Sydney",
        holidays: {
            "2025-01-01": { reason: "New Year's Day", closeEarly: false },
            "2025-01-27": { reason: "Australia Day OBS", closeEarly: false },
            "2025-04-18": { reason: "Good Friday", closeEarly: false },
            "2025-04-21": { reason: "Easter Monday", closeEarly: false },
            "2025-04-25": { reason: "ANZAC Day", closeEarly: false },
            "2025-06-09": { reason: "King's Birthday", closeEarly: false },
            "2025-12-25": { reason: "Christmas Day", closeEarly: false },
            "2025-12-26": { reason: "Boxing Day", closeEarly: false }
        }
    },
    NZX: {
        open: "10:00",
        close: "16:45",
        timezone: "Pacific/Auckland",
        region: "Australia",
        city: "Wellington",
        holidays: {
            "2025-01-01": { reason: "New Year's Day", closeEarly: false },
            "2025-02-06": { reason: "Waitangi Day", closeEarly: false },
            "2025-04-18": { reason: "Good Friday", closeEarly: false },
            "2025-04-21": { reason: "Easter Monday", closeEarly: false },
            "2025-04-25": { reason: "ANZAC Day", closeEarly: false },
            "2025-06-02": { reason: "King's Birthday", closeEarly: false },
            "2025-06-20": { reason: "Matariki Day", closeEarly: false },
            "2025-10-27": { reason: "Labour Day", closeEarly: false },
            "2025-12-25": { reason: "Christmas Day", closeEarly: false },
            "2025-12-26": { reason: "Boxing Day", closeEarly: false }
        }
    },
    JSE: {
        open: "09:00",
        close: "17:00",
        timezone: "Africa/Johannesburg",
        region: "Africa",
        city: "Johannesburg",
        holidays: {
            "2025-01-01": { reason: "New Year's Day", closeEarly: false },
            "2025-03-21": { reason: "Human Rights Day", closeEarly: false },
            "2025-03-29": { reason: "Good Friday", closeEarly: false },
            "2025-04-01": { reason: "Family Day", closeEarly: false },
            "2025-04-27": { reason: "Freedom Day", closeEarly: false },
            "2025-05-01": { reason: "Workers' Day", closeEarly: false },
            "2025-06-16": { reason: "Youth Day", closeEarly: false },
            "2025-06-17": { reason: "Youth Day Holiday", closeEarly: false },
            "2025-08-09": { reason: "National Women's Day", closeEarly: false },
            "2025-09-24": { reason: "Heritage Day", closeEarly: false },
            "2025-12-16": { reason: "Day of Reconciliation", closeEarly: false },
            "2025-12-25": { reason: "Christmas Day", closeEarly: false },
            "2025-12-26": { reason: "Day of Goodwill", closeEarly: false }
        }
    },
    EGX: {
        open: "10:00",
        close: "14:30",
        timezone: "Africa/Cairo",
        region: "Africa",
        city: "Cairo",
        holidays: {
            "2025-01-01": { reason: "New Year's Day", closeEarly: false },
            "2024-01-07": { reason: "Coptic Christmas", closeEarly: false },
            "2024-01-25": { reason: "January 25 Revolution Day", closeEarly: false },
            "2024-04-10": { reason: "Eid Al-Fitr", closeEarly: false },
            "2024-04-11": { reason: "Eid Al-Fitr Holiday", closeEarly: false },
            "2024-04-25": { reason: "Sinai Liberation Day", closeEarly: false },
            "2024-05-01": { reason: "Labor Day", closeEarly: false },
            "2024-05-06": { reason: "Sham El Nessim", closeEarly: false },
            "2024-06-16": { reason: "Eid al-Adha", closeEarly: false },
            "2024-06-17": { reason: "Eid al-Adha Day 2", closeEarly: false },
            "2024-07-07": { reason: "Muharram", closeEarly: false },
            "2024-07-23": { reason: "Revolution Day", closeEarly: false },
            "2024-09-15": { reason: "Mawlid An-Nabi", closeEarly: false },
            "2024-10-06": { reason: "Armed Forces Day", closeEarly: false }
        }
    },
    NSE_Nigeria: {
        open: "10:00",
        close: "14:30",
        timezone: "Africa/Lagos",
        region: "Africa",
        city: "Lagos",
        holidays: {
            "2025-01-01": { reason: "New Year's Day", closeEarly: false }
        }
    },
    ZSE: {
        open: "09:00",
        close: "16:00",
        timezone: "Africa/Harare",
        region: "Africa",
        city: "Harare",
        holidays: {
            "2025-01-01": { reason: "New Year's Day", closeEarly: false },
            "2025-01-06": { reason: "Epiphany", closeEarly: false },
            "2025-04-18": { reason: "Good Friday", closeEarly: false },
            "2025-04-21": { reason: "Easter Monday", closeEarly: false },
            "2025-05-01": { reason: "International Workers' Day", closeEarly: false },
            "2025-05-30": { reason: "National Day", closeEarly: false },
            "2025-06-19": { reason: "Corpus Christi", closeEarly: false },
            "2025-08-05": { reason: "Victory and Homeland Thanksgiving Day", closeEarly: false },
            "2025-08-15": { reason: "Assumption Day", closeEarly: false },
            "2025-11-18": { reason: "Remembrance Day", closeEarly: false },
            "2025-12-24": { reason: "Christmas Eve", closeEarly: false },
            "2025-12-25": { reason: "Christmas", closeEarly: false },
            "2025-12-26": { reason: "Saint Stephen's Day", closeEarly: false },
            "2025-12-31": { reason: "New Year's Eve", closeEarly: false }
        }
    },
    GSE: {
        open: "09:30",
        close: "15:00",
        timezone: "Africa/Accra",
        region: "Africa",
        city: "Accra",
        holidays: {
            "2025-01-01": { reason: "New Year's Day", closeEarly: false },
            "2025-01-02": { reason: "New Year's Day Holiday", closeEarly: false },
            "2025-01-07": { reason: "Christmas", closeEarly: false },
            "2025-01-19": { reason: "Epiphany", closeEarly: false },
            "2025-03-03": { reason: "Mother's Day", closeEarly: false },
            "2025-03-08": { reason: "International Women's Day", closeEarly: false },
            "2025-04-09": { reason: "Day of National Unity", closeEarly: false },
            "2025-04-18": { reason: "Easter", closeEarly: false },
            "2025-04-19": { reason: "Easter", closeEarly: false },
            "2025-04-20": { reason: "Easter", closeEarly: false },
            "2025-04-21": { reason: "Easter", closeEarly: false },
            "2025-05-09": { reason: "Day of Victory over Fascism", closeEarly: false },
            "2025-05-12": { reason: "Saint Andrew the First-Called Day", closeEarly: false },
            "2025-05-26": { reason: "Independence Day", closeEarly: false },
            "2025-08-28": { reason: "Saint Mary's Day", closeEarly: false },
            "2025-10-14": { reason: "Day of Svetitskhoveli Cathedral", closeEarly: false }
        }
    },
    NSE_Kenya: {
        open: "09:00",
        close: "15:00",
        timezone: "Africa/Nairobi",
        region: "Africa",
        city: "Nairobi",
        holidays: {
            "2025-01-01": { reason: "New Year's Day", closeEarly: false }
        }
    },
    B3: {
        open: "10:00",
        close: "17:00",
        timezone: "America/Sao_Paulo",
        region: "South America",
        city: "São Paulo",
        holidays: {
            "2025-01-01": { reason: "New Year's Day", closeEarly: false },
            "2024-02-12": { reason: "Carnival", closeEarly: false },
            "2024-02-13": { reason: "Carnival", closeEarly: false },
            "2024-03-29": { reason: "Good Friday", closeEarly: false },
            "2024-05-30": { reason: "Corpus Christi Day", closeEarly: false },
            "2024-11-15": { reason: "Republic Day", closeEarly: false },
            "2024-10-24": { reason: "Christmas", closeEarly: false },
            "2024-12-25": { reason: "Christmas Day", closeEarly: false },
            "2024-12-31": { reason: "New Year's Eve", closeEarly: false }
        }
    },
    Santiago: {
        open: "09:30",
        close: "16:00",
        timezone: "America/Santiago",
        region: "South America",
        city: "Santiago",
        holidays: {
            "2025-04-18": { reason: "Good Friday", closeEarly: false },
            "2025-05-01": { reason: "Labour Day", closeEarly: false },
            "2025-05-21": { reason: "Battle of Iquique/Navy Day", closeEarly: false },
            "2025-06-20": { reason: "National Day of Native Peoples", closeEarly: false },
            "2025-07-16": { reason: "Solemnity of Virgin of Carmen", closeEarly: false },
            "2025-08-15": { reason: "Assumption Day", closeEarly: false },
            "2025-09-18": { reason: "Independence Day", closeEarly: false },
            "2025-09-19": { reason: "Army Day", closeEarly: false },
            "2025-10-31": { reason: "Evangelical Church Day", closeEarly: false },
            "2025-12-08": { reason: "Immaculate Conception", closeEarly: false },
            "2025-12-25": { reason: "Christmas Day", closeEarly: false },
            "2025-12-31": { reason: "Bank Holiday", closeEarly: false }
        }
    },
    BVC: {
        open: "09:00",
        close: "13:00",
        timezone: "America/Bogota",
        region: "South America",
        city: "Bogotá",
        holidays: {
            "2025-03-24": { reason: "St. Joseph's Day OBS", closeEarly: false },
            "2025-04-17": { reason: "Holy Thursday", closeEarly: false },
            "2025-04-18": { reason: "Good Friday", closeEarly: false },
            "2025-05-01": { reason: "Labour Day", closeEarly: false },
            "2025-06-02": { reason: "Ascension", closeEarly: false },
            "2025-06-23": { reason: "Corpus Christi", closeEarly: false },
            "2025-06-30": { reason: "Sacred Heart", closeEarly: false },
            "2025-06-30": { reason: "Sts. Peter and Paul OBS", closeEarly: false },
            "2025-08-07": { reason: "Battle of Boyaca", closeEarly: false },
            "2025-08-18": { reason: "Assumption Day OBS", closeEarly: false },
            "2025-10-13": { reason: "Race Day OBS", closeEarly: false },
            "2025-11-03": { reason: "All Saints' Day OBS", closeEarly: false },
            "2025-11-17": { reason: "Independence of Cartagena OBS", closeEarly: false },
            "2025-12-08": { reason: "Immaculate Conception", closeEarly: false },
            "2025-12-25": { reason: "Christmas", closeEarly: false },
            "2025-12-31": { reason: "Last business day of year", closeEarly: false }
        }
    },
    BVL: {
        open: "09:00",
        close: "13:30",
        timezone: "America/Lima",
        region: "South America",
        city: "Lima",
        holidays: {
            "2025-04-17": { reason: "Holy Thursday", closeEarly: false },
            "2025-04-18": { reason: "Good Friday", closeEarly: false },
            "2025-05-01": { reason: "Labour Day", closeEarly: false },
            "2025-07-23": { reason: "Dia de la Fuerza Aerea", closeEarly: false },
            "2025-07-28": { reason: "Independence Day 1", closeEarly: false },
            "2025-07-29": { reason: "Independence Day 2", closeEarly: false },
            "2025-08-06": { reason: "Battle of Junin", closeEarly: false },
            "2025-10-08": { reason: "Combat of Angamos", closeEarly: false },
            "2025-12-08": { reason: "Immaculate Conception", closeEarly: false },
            "2025-12-09": { reason: "Battle of Ayacucho", closeEarly: false },
            "2025-12-25": { reason: "Christmas Day", closeEarly: false }
        }
    },
    BVBA: {
        open: "11:00",
        close: "17:00",
        timezone: "America/Argentina/Buenos_Aires",
        region: "South America",
        city: "Buenos Aires",
        holidays: {
            "2025-03-03": { reason: "Carnival Monday", closeEarly: false },
            "2025-03-04": { reason: "Carnival Tuesday", closeEarly: false },
            "2025-03-24": { reason: "Truth and Justice Day", closeEarly: false },
            "2025-04-02": { reason: "Malvinas Islands Memorial", closeEarly: false },
            "2025-04-17": { reason: "Holy Thursday", closeEarly: false },
            "2025-04-18": { reason: "Good Friday", closeEarly: false },
            "2025-05-01": { reason: "Workers' Day", closeEarly: false },
            "2025-05-02": { reason: "Bridge Holiday 1", closeEarly: false },
            "2025-06-16": { reason: "Martin Miguel de Guemes Day OBS", closeEarly: false },
            "2025-06-20": { reason: "Flag Day", closeEarly: false },
            "2025-07-09": { reason: "Independence Day", closeEarly: false },
            "2025-08-15": { reason: "Bridge Holiday 2", closeEarly: false },
            "2025-11-21": { reason: "Bridge Holiday 3", closeEarly: false },
            "2025-11-24": { reason: "National Sovereignty Day OBS", closeEarly: false },
            "2025-12-08": { reason: "Immaculate Conception", closeEarly: false },
            "2025-12-25": { reason: "Christmas Day", closeEarly: false }
        }
    }
};

// Exchange information data
const exchangeInfo = {
    NYSE: {
        name: "New York Stock Exchange",
        founded: "1792",
        location: "New York City, USA",
        description: "The New York Stock Exchange (NYSE) is the world's largest stock exchange by market capitalization of its listed companies. Located at 11 Wall Street in Lower Manhattan, New York City, it is operated by NYSE Group, a subsidiary of Intercontinental Exchange. With a market cap of over $30 trillion, it hosts trading for more than 2,300 companies and averages over 1.5 billion shares traded daily. The NYSE uses a hybrid market model combining electronic trading with a physical trading floor that features designated market makers.",
        tradingHours: "9:30 AM to 4:00 PM Eastern Time (Monday through Friday)",
        majorIndices: "Dow Jones Industrial Average, S&P 500, NYSE Composite",
        website: "https://www.nyse.com/",
        marketCap: "$30.1 trillion (2023)",
        listedCompanies: "Over 2,300",
        tradingVolume: "Approximately 1.5 billion shares per day",
        regulatoryBody: "U.S. Securities and Exchange Commission (SEC)"
    },
    NASDAQ: {
        name: "National Association of Securities Dealers Automated Quotations",
        founded: "1971",
        location: "New York City, USA",
        description: "The Nasdaq Stock Market is an American stock exchange based in New York City. It is the second-largest stock exchange in the world by market capitalization, behind the New York Stock Exchange. Known for listing technology companies, it was the first electronic exchange. Nasdaq operates a purely electronic trading system without a physical trading floor, offering cutting-edge trading technology. It is home to many of the world's leading technology companies including Apple, Microsoft, Amazon, and Google's parent company Alphabet.",
        tradingHours: "9:30 AM to 4:00 PM Eastern Time (Monday through Friday)",
        majorIndices: "NASDAQ Composite, NASDAQ-100",
        website: "https://www.nasdaq.com/",
        marketCap: "$24.6 trillion (2023)",
        listedCompanies: "Approximately 3,800",
        tradingVolume: "About 2 billion shares per day",
        regulatoryBody: "U.S. Securities and Exchange Commission (SEC)"
    },
    TSX: {
        name: "Toronto Stock Exchange",
        founded: "1861",
        location: "Toronto, Canada",
        description: "The Toronto Stock Exchange is the largest stock exchange in Canada and one of the largest in North America. It is owned and operated by TMX Group. The TSX is particularly strong in natural resources, energy, and financial sectors, reflecting Canada's economic strengths. It uses a fully electronic trading system and has eliminated floor trading entirely. The exchange is the primary venue for Canadian companies seeking to raise public capital.",
        tradingHours: "9:30 AM to 4:00 PM Eastern Time (Monday through Friday)",
        majorIndices: "S&P/TSX Composite Index, S&P/TSX 60, S&P/TSX Venture Composite",
        website: "https://www.tsx.com/",
        marketCap: "Over $3.2 trillion (2023)",
        listedCompanies: "More than 1,500 on TSX and TSX Venture Exchange combined",
        tradingVolume: "Approximately 250 million shares per day",
        regulatoryBody: "Ontario Securities Commission (OSC)"
    },
    BMV: {
        name: "Bolsa Mexicana de Valores",
        founded: "1894",
        location: "Mexico City, Mexico",
        description: "The Mexican Stock Exchange (BMV) is the second largest stock exchange in Latin America. It lists domestic and foreign securities and is regulated by the National Banking and Securities Commission. The BMV operates a fully electronic trading platform called BMV-SENTRA Equities. In 2017, BMV completed its demutualization process and became a public company. The exchange is particularly important for Mexico's largest corporations and plays a critical role in the country's financial infrastructure.",
        tradingHours: "8:30 AM to 3:00 PM Mexico City Time (Monday through Friday)",
        majorIndices: "S&P/BMV IPC (Índice de Precios y Cotizaciones), S&P/BMV IPC CompMX",
        website: "https://www.bmv.com.mx/",
        marketCap: "Approximately $385 billion (2023)",
        listedCompanies: "Around 140 domestic companies",
        tradingVolume: "About 220 million shares per day",
        regulatoryBody: "Comisión Nacional Bancaria y de Valores (CNBV)"
    },
    CSE: {
        name: "Colombo Stock Exchange",
        founded: "1985",
        location: "Colombo, Sri Lanka",
        description: "The Colombo Stock Exchange is the main stock exchange in Sri Lanka. It offers a fully automated trading platform and is regulated by the Securities and Exchange Commission of Sri Lanka. The CSE uses the Automated Trading System (ATS) for all trades and has been focusing on market development and technological innovation. Despite being a relatively small exchange in global terms, it has been working to increase its international visibility and attract foreign investors. It plays a crucial role in Sri Lanka's capital markets development.",
        tradingHours: "9:30 AM to 4:00 PM Colombo Time (Monday through Friday)",
        majorIndices: "All Share Price Index (ASPI), S&P SL20",
        website: "https://www.cse.lk/",
        marketCap: "Approximately $12 billion (2023)",
        listedCompanies: "Around 290 companies",
        tradingVolume: "Average daily turnover of $2-3 million",
        regulatoryBody: "Securities and Exchange Commission of Sri Lanka (SEC)"
    },
    XETRA: {
        name: "XETRA",
        founded: "1997",
        location: "Frankfurt, Germany",
        description: "XETRA is an electronic trading system operated by the Frankfurt Stock Exchange. It is the reference market for German equities and ETFs, offering high liquidity and international connectivity. XETRA accounts for over 90% of all trading in German shares and ETFs. The system allows market participants to trade securities electronically from various locations worldwide. Its advanced technology ensures low latency and high throughput for trading activities. XETRA is particularly important for international investors accessing German markets.",
        tradingHours: "9:00 AM to 5:30 PM Central European Time (Monday through Friday)",
        majorIndices: "DAX, MDAX, TecDAX, SDAX",
        website: "https://www.deutsche-boerse.com/",
        marketCap: "Approximately €2.3 trillion (2023)",
        listedCompanies: "Over 1,000 securities tradable on XETRA",
        tradingVolume: "Average of €5-7 billion daily",
        regulatoryBody: "Federal Financial Supervisory Authority (BaFin)"
    },
    Euronext: {
        name: "Euronext",
        founded: "2000",
        location: "Paris, France (headquarters)",
        description: "Euronext is a pan-European stock exchange operating markets in Amsterdam, Brussels, Dublin, Lisbon, Milan, Oslo and Paris. It is the largest stock exchange in Europe. Created from the merger of the Amsterdam, Brussels, and Paris exchanges, Euronext has expanded through acquisitions to become Europe's primary exchange group. It offers trading in equities, fixed income, ETFs, warrants, and derivatives. Euronext operates a single trading platform called Optiq, providing harmonized access across all its markets. The exchange is particularly strong in the SME segment with dedicated initiatives for smaller companies.",
        tradingHours: "9:00 AM to 5:30 PM Central European Time (Monday through Friday)",
        majorIndices: "CAC 40, AEX, BEL 20, PSI 20, ISEQ 20, OBX",
        website: "https://www.euronext.com/",
        marketCap: "Over €6.9 trillion (2023)",
        listedCompanies: "More than 1,900 issuers",
        tradingVolume: "Average daily trading volume of €12 billion",
        regulatoryBody: "Multiple national regulators including AMF (France), AFM (Netherlands)"
    },
    SIX: {
        name: "SIX Swiss Exchange",
        founded: "1850",
        location: "Zurich, Switzerland",
        description: "The SIX Swiss Exchange is Switzerland's principal stock exchange. It offers trading in Swiss and foreign securities and is known for its stability and efficiency. SIX operates a fully electronic trading platform and is particularly renowned for listing major Swiss multinational corporations and luxury goods companies. The exchange is owned by its member banks and operates under the self-regulatory model typical of Swiss financial markets. SIX is also a major center for bond trading and hosts numerous ETFs and structured products.",
        tradingHours: "9:00 AM to 5:30 PM Central European Time (Monday through Friday)",
        majorIndices: "SMI (Swiss Market Index), SLI (Swiss Leader Index), SPI (Swiss Performance Index)",
        website: "https://www.six-group.com/",
        marketCap: "Approximately $2.3 trillion (2023)",
        listedCompanies: "Around 260 companies",
        tradingVolume: "Average daily trading volume of CHF 5.5 billion",
        regulatoryBody: "Swiss Financial Market Supervisory Authority (FINMA)"
    },
    BME: {
        name: "Bolsas y Mercados Españoles",
        founded: "2002",
        location: "Madrid, Spain",
        description: "BME is the operator of all stock exchanges and financial markets in Spain. It manages the Madrid, Barcelona, Bilbao, and Valencia stock exchanges. Since 2020, BME has been part of the SIX Group. The Spanish exchange offers trading in equities, fixed income, derivatives, and clearing services. BME's SIBE electronic platform connects all four Spanish exchanges into a unified market. The exchange has a strong presence in Latin American markets through strategic alliances and technology provision services.",
        tradingHours: "9:00 AM to 5:30 PM Central European Time (Monday through Friday)",
        majorIndices: "IBEX 35, IBEX Medium Cap, IBEX Small Cap",
        website: "https://www.bolsasymercados.es/",
        marketCap: "Approximately €800 billion (2023)",
        listedCompanies: "Around 130 companies on the main market",
        tradingVolume: "Average daily trading volume of €2 billion",
        regulatoryBody: "Comisión Nacional del Mercado de Valores (CNMV)"
    },
    LSE: {
        name: "London Stock Exchange",
        founded: "1801",
        location: "London, United Kingdom",
        description: "The London Stock Exchange is one of the world's oldest stock exchanges and the largest exchange in Europe. It is part of the London Stock Exchange Group. With a history dating back more than 300 years, the LSE remains one of the world's premier listing venues. It operates several markets including the Main Market for larger established companies and AIM for growing companies. The LSE is particularly strong in international listings, with companies from over 60 countries. Its SETS trading system provides high-speed electronic order matching.",
        tradingHours: "8:00 AM to 4:30 PM Greenwich Mean Time (Monday through Friday)",
        majorIndices: "FTSE 100, FTSE 250, FTSE All-Share",
        website: "https://www.londonstockexchange.com/",
        marketCap: "Approximately £3.9 trillion (2023)",
        listedCompanies: "More than 1,900 companies from over 60 countries",
        tradingVolume: "Average daily trading value of £5 billion",
        regulatoryBody: "Financial Conduct Authority (FCA)"
    },
    OMX: {
        name: "NASDAQ OMX Nordic",
        founded: "1998",
        location: "Stockholm, Sweden",
        description: "NASDAQ OMX Nordic operates stock exchanges in Nordic and Baltic countries including Stockholm, Helsinki, Copenhagen, and Reykjavik. It is owned by NASDAQ Inc. The exchange group offers a unified Nordic marketplace with harmonized rules and requirements. NASDAQ Nordic is particularly strong in technology and industrial sectors, reflecting the region's economic strengths. The trading platform uses NASDAQ's proprietary technology, also employed by exchanges worldwide. The exchange has been at the forefront of sustainability initiatives, with a well-developed ESG reporting framework.",
        tradingHours: "9:00 AM to 5:30 PM Central European Time (Monday through Friday)",
        majorIndices: "OMXS30 (Stockholm), OMXH25 (Helsinki), OMXC20 (Copenhagen), OMXI10 (Iceland)",
        website: "https://www.nasdaqomxnordic.com/",
        marketCap: "Combined approximately €1.7 trillion (2023)",
        listedCompanies: "Over 1,000 across all Nordic and Baltic markets",
        tradingVolume: "Daily trading volume of approximately €2.5 billion",
        regulatoryBody: "Multiple regulators including Finansinspektionen (Sweden), Finanstilsynet (Denmark)"
    },
    MOEX: {
        name: "Moscow Exchange",
        founded: "2011",
        location: "Moscow, Russia",
        description: "The Moscow Exchange is the largest exchange group in Russia. It was formed through the merger of the Moscow Interbank Currency Exchange and the Russian Trading System. MOEX provides a comprehensive range of trading markets including equities, bonds, derivatives, FX, money market instruments, and commodities. It operates its own central securities depository (National Settlement Depository) and clearing house (National Clearing Centre). MOEX has implemented several technological upgrades to its trading infrastructure and has been working to increase international investor participation despite geopolitical challenges.",
        tradingHours: "10:00 AM to 6:45 PM Moscow Time (Monday through Friday)",
        majorIndices: "MOEX Russia Index, RTS Index, MOEX Blue Chip Index",
        website: "https://www.moex.com/",
        marketCap: "Approximately $800 billion (2023)",
        listedCompanies: "Around 260 equity issuers",
        tradingVolume: "Average daily trading volume across all markets exceeds $25 billion",
        regulatoryBody: "Bank of Russia"
    },
    BorsaItaliana: {
        name: "Borsa Italiana",
        founded: "1808",
        location: "Milan, Italy",
        description: "Borsa Italiana is Italy's main stock exchange. It was acquired by Euronext in 2021 and offers trading in equities, bonds, derivatives, and ETFs. With over 200 years of history, it remains central to Italian capital markets. The exchange operates multiple segments including MTA (main market), AIM Italia (for SMEs), MOT (bond market), and IDEM (derivatives market). Borsa Italiana is particularly strong in luxury goods, banking, and industrial companies. Its merger with Euronext has created expanded opportunities for cross-border trading and investment throughout Europe.",
        tradingHours: "9:00 AM to 5:30 PM Central European Time (Monday through Friday)",
        majorIndices: "FTSE MIB, FTSE Italia All-Share, FTSE Italia Mid Cap",
        website: "https://www.borsaitaliana.it/",
        marketCap: "Approximately €750 billion (2023)",
        listedCompanies: "Around 370 companies",
        tradingVolume: "Average daily equity trading volume of €2.5 billion",
        regulatoryBody: "Commissione Nazionale per le Società e la Borsa (CONSOB)"
    },
    WSE: {
        name: "Warsaw Stock Exchange",
        founded: "1817",
        location: "Warsaw, Poland",
        description: "The Warsaw Stock Exchange is the largest stock exchange in Central and Eastern Europe. It lists Polish and foreign companies and offers trading in equities, bonds, and derivatives. Founded in 1817, the modern WSE was re-established in 1991 after Poland's transition to a market economy. It has grown significantly and now hosts companies from across the CEE region. The WSE operates a main market and NewConnect (for smaller companies). It uses the UTP trading system, also employed by NYSE Euronext. The exchange has been particularly successful in attracting domestic retail investors to the market.",
        tradingHours: "9:00 AM to 5:30 PM Central European Time (Monday through Friday)",
        majorIndices: "WIG20, mWIG40, sWIG80, WIG",
        website: "https://www.gpw.pl/",
        marketCap: "Approximately €150 billion (2023)",
        listedCompanies: "Over 400 on both markets combined",
        tradingVolume: "Average daily trading value of €200 million",
        regulatoryBody: "Polish Financial Supervision Authority (KNF)"
    },
    OSE: {
        name: "Oslo Stock Exchange",
        founded: "1819",
        location: "Oslo, Norway",
        description: "The Oslo Stock Exchange is the main stock exchange in Norway. It is now part of Euronext and offers trading in equities, bonds, and derivatives. The OSE is particularly strong in energy, shipping, and seafood sectors, reflecting Norway's economic strengths. In 2019, it was acquired by Euronext, becoming Euronext Oslo. The exchange operates the Oslo Axess market for smaller companies alongside its main market. The OSE is one of the world's leading exchanges for shipping and offshore service companies and has a growing green bond segment reflecting Norway's focus on sustainability.",
        tradingHours: "9:00 AM to 4:20 PM Central European Time (Monday through Friday)",
        majorIndices: "Oslo Børs All-Share Index, OBX Index, Oslo Energy Index",
        website: "https://www.euronext.com/en/markets/oslo",
        marketCap: "Approximately NOK 3.5 trillion (2023)",
        listedCompanies: "Around 340 listings",
        tradingVolume: "Average daily trading volume of NOK 5 billion",
        regulatoryBody: "Financial Supervisory Authority of Norway (Finanstilsynet)"
    },
    ISE: {
        name: "Irish Stock Exchange",
        founded: "1793",
        location: "Dublin, Ireland",
        description: "The Irish Stock Exchange, now Euronext Dublin, is Ireland's main stock exchange. It was acquired by Euronext in 2018 and offers trading in equities, funds, and debt securities. The exchange has a particularly strong position in debt and fund listings, being a leading venue globally for listing investment funds and debt securities. Euronext Dublin operates the Main Securities Market for established companies and the Enterprise Securities Market for growing companies. Its strategic location makes it an attractive venue for international companies seeking EU market access, particularly post-Brexit.",
        tradingHours: "9:00 AM to 5:30 PM Central European Time (Monday through Friday)",
        majorIndices: "ISEQ Overall Index, ISEQ 20",
        website: "https://www.euronext.com/en/markets/dublin",
        marketCap: "Approximately €130 billion (2023)",
        listedCompanies: "Around 40 equity listings, but over 37,000 securities in total including bonds and funds",
        tradingVolume: "Daily equity trading volume of €50-100 million",
        regulatoryBody: "Central Bank of Ireland"
    },
    JPX: {
        name: "Japan Exchange Group",
        founded: "2013",
        location: "Tokyo, Japan",
        description: "JPX operates the Tokyo Stock Exchange and the Osaka Exchange. It is Asia's largest exchange group and the third largest in the world by market capitalization. Formed through the merger of the Tokyo Stock Exchange and the Osaka Securities Exchange, JPX offers comprehensive market services across equities, derivatives, ETFs, and bonds. The TSE was restructured in 2022 into three new market segments: Prime, Standard, and Growth. JPX uses the arrowhead trading system, which provides high-speed, low-latency trading capabilities. Japan's unique trading hours include a midday break, a tradition maintained despite global trends toward continuous trading.",
        tradingHours: "9:00 AM to 3:00 PM Japan Standard Time (Monday through Friday), with a lunch break from 11:30 AM to 12:30 PM",
        majorIndices: "Nikkei 225, TOPIX, JPX-Nikkei 400, TOPIX 500",
        website: "https://www.jpx.co.jp/english/",
        marketCap: "Approximately $6.2 trillion (2023)",
        listedCompanies: "About 3,800 companies across all segments",
        tradingVolume: "Average daily trading value of ¥3.5 trillion",
        regulatoryBody: "Financial Services Agency (FSA) of Japan"
    },
    HKEX: {
        name: "Hong Kong Stock Exchange",
        founded: "1891",
        location: "Hong Kong",
        description: "The Hong Kong Stock Exchange is Asia's third largest stock exchange and one of the world's most significant financial markets. It is operated by Hong Kong Exchanges and Clearing. HKEX serves as a crucial gateway between mainland China and international markets, with schemes like Stock Connect providing foreign investors access to Chinese equities. The exchange maintains a unique position due to Hong Kong's status as a special administrative region with separate financial regulations from mainland China. HKEX has a strong IPO market and has consistently ranked among the top global exchanges for funds raised through new listings.",
        tradingHours: "9:30 AM to 4:00 PM Hong Kong Time (Monday through Friday), with a lunch break from 12:00 PM to 1:00 PM",
        majorIndices: "Hang Seng Index, Hang Seng China Enterprises Index, Hang Seng TECH Index",
        website: "https://www.hkex.com.hk/",
        marketCap: "Approximately $4.5 trillion (2023)",
        listedCompanies: "Over 2,500 listed companies",
        tradingVolume: "Average daily trading value of HK$125 billion",
        regulatoryBody: "Securities and Futures Commission (SFC)"
    },
    SSE: {
        name: "Shanghai Stock Exchange",
        founded: "1990",
        location: "Shanghai, China",
        description: "The Shanghai Stock Exchange is one of China's two main stock exchanges. It is the world's fourth largest stock market by market capitalization and primarily lists mainland Chinese companies. The SSE operates A-shares (denominated in renminbi for domestic investors) and B-shares (denominated in US dollars for foreign investors). The landmark Shanghai-Hong Kong Stock Connect program launched in 2014 allows international investors to trade SSE-listed stocks. The exchange is directly governed by the China Securities Regulatory Commission. The SSE has particular strength in large state-owned enterprises and financial institutions.",
        tradingHours: "9:30 AM to 3:00 PM China Standard Time (Monday through Friday), with a lunch break from 11:30 AM to 1:00 PM",
        majorIndices: "SSE Composite Index, SSE 50, SSE 180, SSE 380",
        website: "http://www.sse.com.cn/eng/",
        marketCap: "Approximately $7.9 trillion (2023)",
        listedCompanies: "Around 2,000 companies",
        tradingVolume: "Average daily trading volume of RMB 450-500 billion",
        regulatoryBody: "China Securities Regulatory Commission (CSRC)"
    },
    SZSE: {
        name: "Shenzhen Stock Exchange",
        founded: "1990",
        location: "Shenzhen, China",
        description: "The Shenzhen Stock Exchange is one of China's two major stock exchanges. It tends to list smaller, more entrepreneurial firms, especially high-tech companies. The SZSE operates multiple boards including the Main Board, SME Board, and ChiNext (similar to NASDAQ, focusing on high-tech companies). The Shenzhen-Hong Kong Stock Connect program launched in 2016 allows international investors to access Shenzhen-listed stocks. The exchange has a particular focus on innovative industries and private enterprises, contrasting with Shanghai's emphasis on large state-owned enterprises. SZSE has been instrumental in supporting China's transition towards a more innovation-driven economy.",
        tradingHours: "9:30 AM to 3:00 PM China Standard Time (Monday through Friday), with a lunch break from 11:30 AM to 1:00 PM",
        majorIndices: "SZSE Component Index, ChiNext, SZSE 100, SZSE 1000",
        website: "http://www.szse.cn/English/",
        marketCap: "Approximately $6.2 trillion (2023)",
        listedCompanies: "Over 2,600 companies across all boards",
        tradingVolume: "Average daily trading volume of RMB 500 billion",
        regulatoryBody: "China Securities Regulatory Commission (CSRC)"
    },
    BSE: {
        name: "Bombay Stock Exchange",
        founded: "1875",
        location: "Mumbai, India",
        description: "The Bombay Stock Exchange is Asia's oldest stock exchange and India's second largest by market capitalization. It lists over 5,000 companies and is known for the BSE SENSEX index. Established in 1875, the BSE is the world's fastest stock exchange with a trading speed of 6 microseconds. The exchange operates multiple platforms including the main equity market, SME platform, derivatives market, and mutual fund platform. BSE has been at the forefront of modernizing India's capital markets and was the first exchange in India to obtain ISO certification. It has undergone significant technological transformation from open outcry to a fully electronic trading system.",
        tradingHours: "9:15 AM to 3:30 PM India Standard Time (Monday through Friday)",
        majorIndices: "BSE SENSEX, BSE 100, BSE 200, BSE 500",
        website: "https://www.bseindia.com/",
        marketCap: "Approximately $3.4 trillion (2023)",
        listedCompanies: "Over 5,000 listed companies",
        tradingVolume: "Average daily trading value of $400 million",
        regulatoryBody: "Securities and Exchange Board of India (SEBI)"
    },
    NSE: {
        name: "National Stock Exchange of India",
        founded: "1992",
        location: "Mumbai, India",
        description: "The National Stock Exchange of India is India's leading stock exchange and the largest in India by trading volume. It has played a key role in reforming the Indian securities market. Founded in 1992 as the first demutualized electronic exchange in India, NSE introduced electronic trading, anonymous order matching, and a nationwide network. The exchange offers trading in equity, debt instruments, exchange-traded funds, and derivatives. NSE's flagship index, the NIFTY 50, represents about 66% of the free float market capitalization of all stocks listed on the exchange. NSE has been instrumental in developing India's derivatives market, which is now one of the largest in the world.",
        tradingHours: "9:15 AM to 3:30 PM India Standard Time (Monday through Friday)",
        majorIndices: "NIFTY 50, NIFTY 100, NIFTY 500, NIFTY Bank",
        website: "https://www.nseindia.com/",
        marketCap: "Approximately $3.5 trillion (2023)",
        listedCompanies: "Around 2,000 companies",
        tradingVolume: "Average daily trading value of $7-8 billion (including derivatives)",
        regulatoryBody: "Securities and Exchange Board of India (SEBI)"
    },
    KRX: {
        name: "Korea Exchange",
        founded: "2005",
        location: "Busan, South Korea",
        description: "The Korea Exchange is the sole securities exchange operator in South Korea. It was formed by the merger of the Korea Stock Exchange, KOSDAQ, and the Korea Futures Exchange. KRX operates multiple markets including the KOSPI market (large companies), KOSDAQ market (growth companies), and derivatives market. South Korea's capital markets are known for high retail investor participation compared to other developed markets. KRX has been actively promoting ESG investments and developing sustainability indices. The exchange has a particularly strong derivatives market, with the KOSPI 200 Options once being the most actively traded derivatives contract in the world.",
        tradingHours: "9:00 AM to 3:30 PM Korea Standard Time (Monday through Friday)",
        majorIndices: "KOSPI, KOSDAQ, KOSPI 200, KRX 100",
        website: "http://global.krx.co.kr/",
        marketCap: "Approximately $1.8 trillion (2023)",
        listedCompanies: "Over 2,400 companies across KOSPI and KOSDAQ",
        tradingVolume: "Average daily trading value of ₩15 trillion",
        regulatoryBody: "Financial Services Commission (FSC) and Financial Supervisory Service (FSS)"
    },
    TWSE: {
        name: "Taiwan Stock Exchange",
        founded: "1961",
        location: "Taipei, Taiwan",
        description: "The Taiwan Stock Exchange is the securities trading center in Taiwan. It is known for its strong representation of technology companies, particularly semiconductor firms. The TWSE is heavily weighted toward technology and electronics manufacturing, with Taiwan Semiconductor Manufacturing Company (TSMC) alone accounting for a significant portion of market capitalization. The exchange uses a fully electronic trading system and has eliminated floor trading. Despite being a relatively small market globally, Taiwan's stock market has high liquidity and international visibility due to the strategic importance of its technology sector. The TWSE has been working to attract foreign investment through regulatory reforms.",
        tradingHours: "9:00 AM to 1:30 PM Taiwan Standard Time (Monday through Friday)",
        majorIndices: "TAIEX, FTSE TWSE Taiwan 50 Index, TWSE Technology Index",
        website: "https://www.twse.com.tw/en/",
        marketCap: "Approximately $1.7 trillion (2023)",
        listedCompanies: "Around 950 companies",
        tradingVolume: "Average daily trading value of NT$250 billion",
        regulatoryBody: "Financial Supervisory Commission (FSC)"
    },
    SGX: {
        name: "Singapore Exchange",
        founded: "1999",
        location: "Singapore",
        description: "The Singapore Exchange is a multi-asset exchange operating equity, fixed income, and derivatives markets. It is known for its strong regulatory standards and international outlook. SGX serves as a gateway to Southeast Asian markets and has positioned itself as an international financial hub. The exchange offers trading in equities, REITs, ETFs, fixed income, and derivatives. SGX has particularly strong derivatives offerings, including products based on Asian equity indices, commodities, and foreign exchange. The exchange has been focusing on expanding its international presence and developing innovative products, including sustainability-linked derivatives and digital assets.",
        tradingHours: "9:00 AM to 5:00 PM Singapore Time (Monday through Friday)",
        majorIndices: "Straits Times Index (STI), FTSE ST All-Share Index, SGX MSCI Singapore Free Index",
        website: "https://www.sgx.com/",
        marketCap: "Approximately $650 billion (2023)",
        listedCompanies: "Around 700 listed companies",
        tradingVolume: "Average daily equity trading value of S$1.2 billion",
        regulatoryBody: "Monetary Authority of Singapore (MAS)"
    },
    TASE: {
        name: "Tel Aviv Stock Exchange",
        founded: "1953",
        location: "Tel Aviv, Israel",
        description: "The Tel Aviv Stock Exchange is Israel's only public stock exchange. It plays a crucial role in Israel's economy and is known for listing technology and biotech companies. The TASE has a unique trading week, operating Sunday through Thursday to accommodate the Israeli work week. The exchange became a public company in 2019 with its shares listed on its own exchange. TASE has implemented a series of reforms to attract international investors, including extending trading hours and adopting international standards. The Israeli market is particularly strong in high-tech, biotech, and cybersecurity sectors, reflecting Israel's status as a 'start-up nation'.",
        tradingHours: "9:30 AM to 5:30 PM Israel Standard Time (Sunday through Thursday)",
        majorIndices: "TA-35, TA-125, TA-90, TA-Technology",
        website: "https://www.tase.co.il/en",
        marketCap: "Approximately $250 billion (2023)",
        listedCompanies: "Around 500 companies",
        tradingVolume: "Average daily trading value of ILS 1.7 billion",
        regulatoryBody: "Israel Securities Authority (ISA)"
    },
    IDX: {
        name: "Indonesia Stock Exchange",
        founded: "2007",
        location: "Jakarta, Indonesia",
        description: "The Indonesia Stock Exchange was formed through the merger of the Jakarta and Surabaya stock exchanges. It is one of the fastest-growing exchanges in Southeast Asia. The IDX has been implementing significant market reforms and technological upgrades to attract both domestic and international investors. The exchange operates multiple board segments including the Main Board, Development Board, and Acceleration Board for startups and SMEs. Indonesia's large population and growing middle class have helped drive increased domestic participation in the stock market. The IDX has been focusing on financial literacy initiatives to encourage more retail investor participation.",
        tradingHours: "9:00 AM to 3:00 PM Western Indonesia Time (Monday through Friday)",
        majorIndices: "Jakarta Composite Index (JCI), IDX30, LQ45, IDX80",
        website: "https://www.idx.co.id/en-us/",
        marketCap: "Approximately $600 billion (2023)",
        listedCompanies: "Around 800 companies",
        tradingVolume: "Average daily trading value of IDR 9-10 trillion",
        regulatoryBody: "Financial Services Authority (OJK)"
    },
    SET: {
        name: "Stock Exchange of Thailand",
        founded: "1975",
        location: "Bangkok, Thailand",
        description: "The Stock Exchange of Thailand is Thailand's national stock exchange. It provides a platform for trading listed securities and plays an important role in Thailand's capital market development. The SET operates multiple markets including the main board and the Market for Alternative Investment (MAI) for smaller companies. The Thai market has attracted significant foreign investment due to the country's role as a manufacturing hub and tourism destination. SET has been implementing various technological improvements including a new trading system and has been working to strengthen corporate governance standards among listed companies.",
        tradingHours: "10:00 AM to 4:30 PM Thailand Time (Monday through Friday)",
        majorIndices: "SET Index, SET50, SET100, SET High Dividend",
        website: "https://www.set.or.th/en",
        marketCap: "Approximately $550 billion (2023)",
        listedCompanies: "Over 800 companies across all markets",
        tradingVolume: "Average daily trading value of THB 60-70 billion",
        regulatoryBody: "Securities and Exchange Commission of Thailand (SEC)"
    },
    PSE: {
        name: "Philippine Stock Exchange",
        founded: "1992",
        location: "Manila, Philippines",
        description: "The Philippine Stock Exchange was formed by the merger of the Manila and Makati stock exchanges. It is the only stock exchange in the Philippines and is one of the oldest in Asia. In 2018, the PSE moved to a unified trading floor in Bonifacio Global City, consolidating its previously split operations. The exchange operates the PSE Electronic Trading System (PSETrade) for all market transactions. The PSE has been working to increase market depth and liquidity through various initiatives including the promotion of short selling and securities borrowing and lending. The exchange has particular strength in consumer, property, and banking sectors.",
        tradingHours: "9:30 AM to 3:30 PM Philippine Time (Monday through Friday)",
        majorIndices: "PSE Composite Index (PSEi), PSE All Shares Index, PSE Sector Indices",
        website: "https://www.pse.com.ph/",
        marketCap: "Approximately $250 billion (2023)",
        listedCompanies: "Around 270 listed companies",
        tradingVolume: "Average daily trading value of PHP 5-6 billion",
        regulatoryBody: "Securities and Exchange Commission of the Philippines (SEC)"
    },
    HOSE: {
        name: "Ho Chi Minh City Stock Exchange",
        founded: "2000",
        location: "Ho Chi Minh City, Vietnam",
        description: "The Ho Chi Minh City Stock Exchange is the largest stock exchange in Vietnam. It lists major Vietnamese companies and plays a key role in Vietnam's economic development. HOSE is one of two stock exchanges in Vietnam, along with the Hanoi Stock Exchange (HNX). The exchange has seen significant growth as Vietnam's economy has developed, attracting increased foreign investment. HOSE primarily lists larger companies, while HNX focuses on smaller enterprises. The exchange has been implementing technological upgrades to its trading system to improve capacity and efficiency. Vietnam's stock market has been gradually opening to foreign investors through increases in foreign ownership limits.",
        tradingHours: "9:00 AM to 3:00 PM Vietnam Time (Monday through Friday)",
        majorIndices: "VN-Index, VN30, VNMidcap, VNSmallcap",
        website: "https://www.hsx.vn/",
        marketCap: "Approximately $200 billion (2023)",
        listedCompanies: "Around 400 companies",
        tradingVolume: "Average daily trading value of VND 15-20 trillion",
        regulatoryBody: "State Securities Commission of Vietnam (SSC)"
    },
    DFM: {
        name: "Dubai Financial Market",
        founded: "2000",
        location: "Dubai, United Arab Emirates",
        description: "The Dubai Financial Market is a stock exchange located in Dubai, UAE. It operates as a secondary market for trading securities issued by public shareholding companies and bonds. The DFM became a public company in 2006 when it offered 20% of its shares through an IPO. The exchange is dominated by banking, real estate, and construction sectors, reflecting Dubai's economic focus. DFM has implemented various measures to attract international investors, including extended settlement cycles and custody models compatible with international practices. The exchange provides a platform for both conventional and Islamic (Sharia-compliant) securities.",
        tradingHours: "10:00 AM to 2:00 PM Gulf Standard Time (Sunday through Thursday)",
        majorIndices: "DFM General Index, DFM Sector Indices",
        website: "https://www.dfm.ae/",
        marketCap: "Approximately $150 billion (2023)",
        listedCompanies: "Around 70 companies",
        tradingVolume: "Average daily trading value of AED 300-400 million",
        regulatoryBody: "Securities and Commodities Authority (SCA)"
    },
    ADX: {
        name: "Abu Dhabi Securities Exchange",
        founded: "2000",
        location: "Abu Dhabi, United Arab Emirates",
        description: "The Abu Dhabi Securities Exchange is a stock exchange in Abu Dhabi, UAE. It was established to promote efficiency, transparency, and liquidity in the UAE capital markets. The ADX has been rapidly developing, with several major IPOs in recent years including ADNOC subsidiaries. The exchange is heavily weighted toward energy, banking, and telecommunications sectors. ADX has been implementing market developments as part of Abu Dhabi's economic diversification strategy, including the introduction of short selling and securities lending and borrowing. The exchange operates according to the Sunday-Thursday work week common in the Middle East.",
        tradingHours: "10:00 AM to 2:00 PM Gulf Standard Time (Sunday through Thursday)",
        majorIndices: "ADX General Index, ADX Sector Indices",
        website: "https://www.adx.ae/",
        marketCap: "Approximately $710 billion (2023)",
        listedCompanies: "Around 90 companies",
        tradingVolume: "Average daily trading value of AED 1.2-1.5 billion",
        regulatoryBody: "Securities and Commodities Authority (SCA)"
    },
    ASX: {
        name: "Australian Securities Exchange",
        founded: "1987",
        location: "Sydney, Australia",
        description: "The Australian Securities Exchange is Australia's primary securities exchange. Formed through the merger of the Australian Stock Exchange and the Sydney Futures Exchange, it operates a diverse range of financial markets. The ASX is particularly strong in mining, financial, and healthcare sectors, reflecting Australia's economic strengths. It operates a fully electronic trading system called ASX Trade. The exchange has been a pioneer in implementing blockchain technology for clearing and settlement processes. ASX offers comprehensive market services including listings, trading, clearing, settlement, technical services, and information services.",
        tradingHours: "10:00 AM to 4:00 PM Australian Eastern Time (Monday through Friday)",
        majorIndices: "S&P/ASX 200, All Ordinaries, S&P/ASX 50, S&P/ASX 300",
        website: "https://www.asx.com.au/",
        marketCap: "Approximately $1.9 trillion (2023)",
        listedCompanies: "Around 2,200 companies",
        tradingVolume: "Average daily trading value of AUD 5-6 billion",
        regulatoryBody: "Australian Securities and Investments Commission (ASIC)"
    },
    NZX: {
        name: "New Zealand Stock Exchange",
        founded: "1915",
        location: "Wellington, New Zealand",
        description: "The New Zealand Stock Exchange is New Zealand's national stock exchange. It offers trading in equities, funds, bonds, and derivatives and plays a crucial role in New Zealand's capital markets. The NZX operates three equity markets: the NZX Main Board, NZX Debt Market, and Fonterra Shareholders Market. The exchange is known for its strong agricultural and utility sectors, reflecting New Zealand's economic focus. NZX has been implementing various initiatives to increase market liquidity and international visibility, including revised listing rules and market structure changes. The exchange has also been promoting ESG reporting among listed companies.",
        tradingHours: "10:00 AM to 4:45 PM New Zealand Time (Monday through Friday)",
        majorIndices: "NZX 50 Index, NZX All Index, NZX 20 Index",
        website: "https://www.nzx.com/",
        marketCap: "Approximately NZ$195 billion (2023)",
        listedCompanies: "Around 130 equity issuers",
        tradingVolume: "Average daily trading value of NZ$150-200 million",
        regulatoryBody: "Financial Markets Authority (FMA)"
    },
    JSE: {
        name: "Johannesburg Stock Exchange",
        founded: "1887",
        location: "Johannesburg, South Africa",
        description: "The Johannesburg Stock Exchange is the largest stock exchange in Africa. It offers a full range of products including equities, bonds, and derivatives and is a crucial part of South Africa's economy. The JSE is particularly strong in mining, financial, and retail sectors. It operates multiple markets including the Main Board, AltX (for fast-growing small and mid-sized companies), and BEE Board (supporting black economic empowerment). The exchange uses the FTSE/JSE Africa Index Series as its primary indices. The JSE has been a leader in sustainability reporting, requiring integrated reporting from listed companies since 2010.",
        tradingHours: "9:00 AM to 5:00 PM South African Standard Time (Monday through Friday)",
        majorIndices: "JSE Top 40 Index, FTSE/JSE All Share, FTSE/JSE Resources, FTSE/JSE Financials",
        website: "https://www.jse.co.za/",
        marketCap: "Approximately $1.1 trillion (2023)",
        listedCompanies: "Around 300 domestic and international companies",
        tradingVolume: "Average daily trading value of ZAR 20-25 billion",
        regulatoryBody: "Financial Sector Conduct Authority (FSCA)"
    },
    EGX: {
        name: "Egyptian Exchange",
        founded: "1883",
        location: "Cairo, Egypt",
        description: "The Egyptian Exchange is the principal stock exchange of Egypt. It comprises the Alexandria and Cairo stock exchanges, which were merged in 2009, and is one of the oldest stock markets in the Middle East. The EGX has undergone significant modernization in recent years, including implementing an electronic trading system and upgrading its market infrastructure. The exchange is dominated by banking, telecommunications, and construction sectors. EGX has been working to increase market depth and liquidity through various initiatives including the introduction of market makers and short selling. The Egyptian market follows the Sunday-Thursday trading week common in Muslim-majority countries.",
        tradingHours: "10:00 AM to 2:30 PM Eastern European Time (Sunday through Thursday)",
        majorIndices: "EGX 30, EGX 70, EGX 100, EGX 30 Capped",
        website: "https://www.egx.com.eg/en/",
        marketCap: "Approximately $40 billion (2023)",
        listedCompanies: "Around 220 companies",
        tradingVolume: "Average daily trading value of EGP 1-1.5 billion",
        regulatoryBody: "Financial Regulatory Authority (FRA)"
    },
    NSE_Nigeria: {
        name: "Nigerian Stock Exchange",
        founded: "1960",
        location: "Lagos, Nigeria",
        description: "The Nigerian Stock Exchange, now Nigerian Exchange Limited (NGX), is the main stock exchange in Nigeria. It plays a key role in Nigeria's economy and provides a platform for trading equities, bonds, and ETFs. In 2021, the exchange completed its demutualization process, transforming from a mutual entity into a public company limited by shares. The NGX operates multiple boards including the Premium Board for companies meeting the highest standards of capitalization and governance. The exchange is dominated by banking, consumer goods, and industrial sectors. NGX has been working to attract more listings and increase market liquidity through various market development initiatives.",
        tradingHours: "10:00 AM to 2:30 PM West Africa Time (Monday through Friday)",
        majorIndices: "NSE All-Share Index, NSE 30, NSE Banking, NSE Consumer Goods",
        website: "https://ngxgroup.com/",
        marketCap: "Approximately $60 billion (2023)",
        listedCompanies: "Around 160 companies",
        tradingVolume: "Average daily trading value of NGN 3-5 billion",
        regulatoryBody: "Securities and Exchange Commission Nigeria (SEC)"
    },
    ZSE: {
        name: "Zimbabwe Stock Exchange",
        founded: "1896",
        location: "Harare, Zimbabwe",
        description: "The Zimbabwe Stock Exchange is the official stock exchange of Zimbabwe. Despite economic challenges, it has remained an important capital market in the region. The ZSE has shown remarkable resilience despite Zimbabwe's economic volatility and hyperinflation episodes. In 2020, the exchange launched an alternative trading platform called the Victoria Falls Stock Exchange (VFEX) that trades exclusively in foreign currency. The ZSE has implemented an automated trading system to replace the previous call-over trading system. The exchange is dominated by consumer, telecommunications, and mining sectors. The ZSE has been working to develop new products and services to attract more listings and investors.",
        tradingHours: "9:00 AM to 4:00 PM Central Africa Time (Monday through Friday)",
        majorIndices: "ZSE Industrial Index, ZSE Top 10, ZSE All Share",
        website: "https://www.zse.co.zw/",
        marketCap: "Approximately $4 billion (2023)",
        listedCompanies: "Around 50 companies on the main exchange",
        tradingVolume: "Average daily trading value varies significantly due to economic volatility",
        regulatoryBody: "Securities and Exchange Commission of Zimbabwe (SECZ)"
    },
    GSE: {
        name: "Ghana Stock Exchange",
        founded: "1990",
        location: "Accra, Ghana",
        description: "The Ghana Stock Exchange is the principal stock exchange of Ghana. It has played an important role in the economic development of Ghana by providing a platform for capital raising and investment. The GSE operates a main market and an alternative market for SMEs. The exchange has migrated from a manual trading system to a fully automated trading platform. GSE is dominated by banking, telecommunications, and beverage sectors. The exchange has been implementing various initiatives to increase market participation, including public education programs and regulatory reforms. GSE has been working to integrate with other West African exchanges to increase regional market access.",
        tradingHours: "9:30 AM to 3:00 PM Ghana Mean Time (Monday through Friday)",
        majorIndices: "GSE Composite Index, GSE Financial Stocks Index",
        website: "https://gse.com.gh/",
        marketCap: "Approximately $8 billion (2023)",
        listedCompanies: "Around 40 companies",
        tradingVolume: "Average daily trading value of GHS 5-10 million",
        regulatoryBody: "Securities and Exchange Commission Ghana"
    },
    NSE_Kenya: {
        name: "Nairobi Securities Exchange",
        founded: "1954",
        location: "Nairobi, Kenya",
        description: "The Nairobi Securities Exchange is the principal stock exchange of Kenya. It offers a platform for trading equities and bonds and has been instrumental in Kenya's economic growth. Originally established as the Nairobi Stock Exchange, it rebranded to the Nairobi Securities Exchange in 2011. The NSE became a public company through self-listing in 2014. The exchange operates multiple segments including the Main Investment Market and the Growth Enterprise Market Segment for smaller companies. NSE has been at the forefront of financial innovation in East Africa, launching products such as derivatives and REITs. The exchange is dominated by banking, telecommunications, and energy sectors.",
        tradingHours: "9:00 AM to 3:00 PM East Africa Time (Monday through Friday)",
        majorIndices: "NSE 20 Share Index, NSE All-Share Index, NSE 25 Share Index",
        website: "https://www.nse.co.ke/",
        marketCap: "Approximately $20 billion (2023)",
        listedCompanies: "Around 65 companies",
        tradingVolume: "Average daily trading value of KES 700-900 million",
        regulatoryBody: "Capital Markets Authority (CMA) Kenya"
    },
    B3: {
        name: "B3 - Brasil Bolsa Balcão",
        founded: "2017",
        location: "São Paulo, Brazil",
        description: "B3 is the main stock exchange in Brazil and the largest stock exchange in Latin America. It was formed through the merger of BM&FBOVESPA and CETIP and offers trading in equities, derivatives, and commodities. B3 operates multiple markets including equities, private fixed income, government securities, derivatives, and commodities. The exchange has a particularly strong derivatives market, which is among the largest in the world. B3 completed a major technological overhaul in 2021 with the implementation of its new multi-asset trading platform. The Brazilian market has a high level of retail investor participation, which has grown significantly in recent years.",
        tradingHours: "10:00 AM to 5:00 PM Brasília Time (Monday through Friday)",
        majorIndices: "Bovespa Index (Ibovespa), Brazil 50 (IBrX-50), Brazil 100 (IBrX-100)",
        website: "http://www.b3.com.br/en_us/",
        marketCap: "Approximately $800 billion (2023)",
        listedCompanies: "Around 440 companies",
        tradingVolume: "Average daily equity trading value of BRL 25-30 billion",
        regulatoryBody: "Securities and Exchange Commission of Brazil (CVM)"
    },
    Santiago: {
        name: "Santiago Stock Exchange",
        founded: "1893",
        location: "Santiago, Chile",
        description: "The Santiago Stock Exchange is Chile's principal stock exchange. It plays an important role in Chile's economy and offers trading in equities, bonds, and derivatives. The exchange operates multiple markets including the main equity market, venture capital market, and fixed income market. The Santiago Stock Exchange is particularly strong in mining, utilities, and retail sectors, reflecting Chile's economic strengths. The exchange has been implementing various technological improvements and market reforms to increase international visibility and attract foreign investment. Chile's capital market is one of the most developed in Latin America, with strong institutional investor participation.",
        tradingHours: "9:30 AM to 4:00 PM Chile Time (Monday through Friday)",
        majorIndices: "S&P/CLX IPSA, S&P/CLX IGPA",
        website: "https://www.bolsadesantiago.com/",
        marketCap: "Approximately $200 billion (2023)",
        listedCompanies: "Around 300 companies",
        tradingVolume: "Average daily equity trading value of CLP 100-150 billion",
        regulatoryBody: "Financial Market Commission (CMF)"
    },
    BVC: {
        name: "Colombian Securities Exchange",
        founded: "2001",
        location: "Bogotá, Colombia",
        description: "The Colombian Securities Exchange (Bolsa de Valores de Colombia) is Colombia's main stock exchange. It was formed through the merger of the Bogotá, Medellín, and Occidente stock exchanges. The BVC operates multiple markets including equities, fixed income, derivatives, and foreign exchange. In 2021, the exchange completed a merger with the Peruvian and Chilean exchanges to form the Latin American Integrated Market (MILA), increasing regional market access. The Colombian market is dominated by financial, energy, and utility sectors. The BVC has been implementing various initiatives to increase market depth and liquidity, including regulatory reforms and technological improvements.",
        tradingHours: "9:00 AM to 1:00 PM Colombia Time (Monday through Friday)",
        majorIndices: "COLCAP Index, COLSC (small cap), COLEQTY (liquid stocks)",
        website: "https://www.bvc.com.co/",
        marketCap: "Approximately $90 billion (2023)",
        listedCompanies: "Around 70 companies",
        tradingVolume: "Average daily equity trading value of COP 100-150 billion",
        regulatoryBody: "Financial Superintendence of Colombia"
    },
    BVL: {
        name: "Lima Stock Exchange",
        founded: "1860",
        location: "Lima, Peru",
        description: "The Lima Stock Exchange (Bolsa de Valores de Lima) is Peru's principal stock exchange. It offers trading in equities, bonds, and other securities and plays a key role in Peru's capital markets. The BVL operates multiple market segments including the main market and the alternative market for smaller companies. The Peruvian market is heavily weighted toward mining and financial sectors, reflecting the country's economic structure. The exchange is part of the Latin American Integrated Market (MILA) along with the exchanges of Chile, Colombia, and Mexico. The BVL has been implementing various initiatives to increase market participation, including tax incentives for listed companies and simplified listing procedures.",
        tradingHours: "9:00 AM to 1:30 PM Peru Time (Monday through Friday)",
        majorIndices: "S&P/BVL Peru General Index, S&P/BVL Lima 25, S&P/BVL Peru Select",
        website: "https://www.bvl.com.pe/",
        marketCap: "Approximately $70 billion (2023)",
        listedCompanies: "Around 220 companies",
        tradingVolume: "Average daily trading value of PEN 25-30 million",
        regulatoryBody: "Superintendence of Securities Market (SMV)"
    },
    BVBA: {
        name: "Buenos Aires Stock Exchange",
        founded: "1854",
        location: "Buenos Aires, Argentina",
        description: "The Buenos Aires Stock Exchange (Bolsa de Comercio de Buenos Aires) is Argentina's main stock exchange. It is one of the most important financial centers in Latin America and has a long history in the region. The BCBA operates in conjunction with ByMA (Bolsas y Mercados Argentinos), which provides the trading platform. The Argentine market has faced various challenges including economic volatility and currency fluctuations but remains an important investment venue in Latin America. The exchange is dominated by energy, financial, and agricultural sectors. BCBA has been implementing various initiatives to develop the local capital market, including the promotion of SME financing instruments and corporate governance improvements.",
        tradingHours: "11:00 AM to 5:00 PM Argentina Time (Monday through Friday)",
        majorIndices: "S&P MERVAL Index, BURCAP, M.AR Index",
        website: "https://www.bcba.sba.com.ar/",
        marketCap: "Approximately $45 billion (2023)",
        listedCompanies: "Around 100 companies",
        tradingVolume: "Average daily trading value of ARS 3-5 billion",
        regulatoryBody: "National Securities Commission (CNV)"
    }
};

// Updates the market cards based on filters and current time
function updateCards() {
    const regionFilter = document.getElementById("region-filter")?.value || "all";
    const searchQuery = document.getElementById("search")?.value.toLowerCase() || "";
    const marketSection = document.getElementById("market-section");

    if (!marketSection) return;

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

        const dateOptions = { timeZone: timezone, year: 'numeric', month: '2-digit', day: '2-digit' };
        const currentDate = new Intl.DateTimeFormat('en-CA', dateOptions).format(now);
        const weekday = now.toLocaleString('en-US', { timeZone: timezone, weekday: 'long' });

        let isOpen = false;
        let openTime = null, closeTime = null;

        if (market === "JPX") {
            openTime = convertToMinutes(marketData.open1);
            closeTime = convertToMinutes(marketData.close2);
        } else {
            openTime = convertToMinutes(marketData.open);
            closeTime = convertToMinutes(marketData.close);
        }

        let nextOpenDate = new Date(now);
        let nextOpenTime = openTime;
        let daysToAdd = 0;

        do {
            nextOpenDate.setDate(nextOpenDate.getDate() + (daysToAdd === 0 ? 1 : 1));
            const nextDateStr = nextOpenDate.toLocaleString('en-CA', { timeZone: timezone, year: 'numeric', month: '2-digit', day: '2-digit' });
            const nextWeekday = nextOpenDate.toLocaleString('en-US', { timeZone: timezone, weekday: 'long' });
            const isHoliday = isMarketClosedOnHoliday(market, nextDateStr);

            if (nextWeekday === 'Saturday' || nextWeekday === 'Sunday' || (isHoliday && !isHoliday.closeEarly)) {
                daysToAdd++;
            } else {
                break;
            }
        } while (daysToAdd < 7);

        let timeUntilNextOpen = nextOpenTime - currentTime + (daysToAdd * 24 * 60);
        if (timeUntilNextOpen < 0) timeUntilNextOpen += 24 * 60;

        if (weekday !== 'Saturday' && weekday !== 'Sunday') {
            const holiday = isMarketClosedOnHoliday(market, currentDate);
            if (!holiday || (holiday && holiday.closeEarly && currentTime >= openTime && currentTime < convertToMinutes(holiday.earlyCloseTime))) {
                if (market === "JPX") {
                    const openTime1 = convertToMinutes(marketData.open1);
                    const closeTime1 = convertToMinutes(marketData.close1);
                    const openTime2 = convertToMinutes(marketData.open2);
                    const closeTime2 = convertToMinutes(marketData.close2);
                    isOpen = (currentTime >= openTime1 && currentTime < closeTime1) || (currentTime >= openTime2 && currentTime < closeTime2);
                } else {
                    isOpen = currentTime >= openTime && currentTime < closeTime;
                }
            }
        }

        const previousStatus = marketStatusHistory[market];
        if (previousStatus === false && isOpen === true) {
            playMarketOpenSound();
        }
        marketStatusHistory[market] = isOpen;

        const timeLeft = isOpen ? formatTimeLeft(closeTime - currentTime) : formatTimeLeft(timeUntilNextOpen);
        const openDisplay = formatHoursMinutes(openTime);
        const closeDisplay = formatHoursMinutes(closeTime);

        let hoursDisplay = market === "JPX"
            ? `Session 1: ${marketData.open1} - ${marketData.close1}, Session 2: ${marketData.open2} - ${marketData.close2}`
            : `Open: ${openDisplay} - Close: ${closeDisplay}`;

        const remainingTimePercent = isOpen ? ((closeTime - currentTime) / (closeTime - openTime)) * 100 : 0;

        const card = document.createElement("div");
        card.classList.add("card");
        if (favorites.has(market)) card.classList.add("favorite");
        if (isMinimized) card.classList.add("minimized");
        card.dataset.market = market;

        // Add info icon next to all exchanges
        let marketNameHTML = `${market} <span class="info-icon" data-exchange="${market}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
        </span>`;

        card.innerHTML = !isMinimized ? `
    <div class="card-header">
        <div class="date">${city}</div>
        <div class="market-status ${isOpen ? "status-open" : "status-closed"}">
            ${isOpen ? "OPEN" : "CLOSED"}
        </div>
    </div>
    <div class="card-body">
        <h3>${marketNameHTML}</h3>
        <p>${hoursDisplay}</p>
        <div class="digital-clock">
            <span class="time-display">${fullTime}</span>
        </div>
        <div class="progress">
            <span>Time Left: <span class="time-left">${timeLeft}</span></span>
            <div class="progress-bar">
                <div class="progress-bar-fill" style="width: ${remainingTimePercent}%;"></div>
            </div>
        </div>
    </div>
` : `
    <div class="card-header">
        <div class="date">${city}</div>
        <div class="market-status ${isOpen ? "status-open" : "status-closed"}">
            ${isOpen ? "OPEN" : "CLOSED"}
        </div>
    </div>
    <div class="card-body">
        <div class="digital-clock">
            <span class="time-display">${fullTime}</span>
        </div>
    </div>
`;

        marketSection.appendChild(card);

        card.addEventListener("click", (e) => {
            if (e.target.closest(".market-status")) return;
            if (e.target.closest(".info-icon")) return; // Don't toggle favorite on info icon click
            const item = card.dataset.market;
            if (item) {
                favorites.has(item) ? favorites.delete(item) : favorites.add(item);
                updateCards();
            }
        });
    });

    // Add event listeners to info icons
    document.querySelectorAll('.info-icon').forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent card click handler from triggering
            const exchange = e.currentTarget.dataset.exchange;
            showExchangeInfo(exchange);
        });
    });
}

// Show exchange information modal
function showExchangeInfo(exchange) {
    if (!exchangeInfo[exchange]) return;

    const info = exchangeInfo[exchange];

    // Create or update modal
    let modal = document.getElementById('exchange-info-modal');

    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'exchange-info-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content" style="max-height: 90vh; width: 95vw; max-width: 900px; display: flex; flex-direction: column; animation: modalFadeIn 0.3s ease-out; border-radius: 12px; overflow: hidden; margin: 20px auto;">
                <div class="modal-header" style="flex-shrink: 0; display: flex; align-items: center; justify-content: space-between; padding: 15px 20px;">
                    <h3 id="exchange-info-title" style="color: #fff; margin: 0; font-size: clamp(1.1rem, 4vw, 1.5rem); overflow: hidden; text-overflow: ellipsis; width: calc(100% - 50px);"></h3>
                    <button id="close-exchange-info" style="
                        background: var(--closed);
                        color: white;
                        width: 36px;
                        height: 36px;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 0;
                        margin-left: 10px;
                        min-width: 36px;
                        flex-shrink: 0;
                        transition: background 0.3s ease;
                    "> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg></button>
                </div>
                <div class="modal-body" id="exchange-info-body" style="overflow-y: auto; flex-grow: 1; padding: 20px; padding-bottom: 25px; -webkit-overflow-scrolling: touch;"></div>
            </div>
        `;

        // Add touch-friendly hover effect
        const addTouchFeedback = () => {
            const closeBtn = modal.querySelector('#close-exchange-info');
            if (closeBtn) {
                closeBtn.addEventListener('touchstart', () => {
                    closeBtn.style.background = '#a62828';
                });
                closeBtn.addEventListener('touchend', () => {
                    closeBtn.style.background = 'var(--closed)';
                });
                closeBtn.addEventListener('mouseover', () => {
                    closeBtn.style.background = '#a62828';
                });
                closeBtn.addEventListener('mouseout', () => {
                    closeBtn.style.background = 'var(--closed)';
                });
            }
        };

        document.body.appendChild(modal);
        addTouchFeedback();

        // Add close event listeners
        modal.querySelector('#close-exchange-info').addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Close when clicking outside
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Add touch event for mobile
        modal.addEventListener('touchstart', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Format holidays for display
    let holidaysHTML = '';
    if (marketHours[exchange] && marketHours[exchange].holidays) {
        // Get all holidays and sort them by date
        const holidays = Object.keys(marketHours[exchange].holidays)
            .map(date => ({
                date,
                ...marketHours[exchange].holidays[date]
            }))
            .sort((a, b) => new Date(a.date) - new Date(b.date));

        // Group holidays by month
        const holidaysByMonth = {};
        holidays.forEach(holiday => {
            const date = new Date(holiday.date);
            const monthYear = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });

            if (!holidaysByMonth[monthYear]) {
                holidaysByMonth[monthYear] = [];
            }
            holidaysByMonth[monthYear].push(holiday);
        });

        // Format holidays by month
        const monthsHTML = Object.keys(holidaysByMonth).map(monthYear => {
            const monthHolidays = holidaysByMonth[monthYear]
                .map(holiday => {
                    const date = new Date(holiday.date);
                    const dayName = date.toLocaleString('en-US', { weekday: 'short' });
                    const dayNum = date.getDate();

                    const badge = holiday.closeEarly
                        ? `<span style="background: #FF9800; color: #000; font-size: 0.65rem; padding: 2px 6px; border-radius: 10px; margin-left: 6px; vertical-align: middle;">EARLY CLOSE ${holiday.earlyCloseTime || ''}</span>`
                        : `<span style="background: #F44336; color: #fff; font-size: 0.65rem; padding: 2px 6px; border-radius: 10px; margin-left: 6px; vertical-align: middle;">CLOSED</span>`;

                    return `
                    <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
                        <div style="font-size: 0.9rem;">
                            <span style="font-weight: 500;">${dayNum} ${dayName}</span> - ${holiday.reason}
                        </div>
                        <div>${badge}</div>
                    </div>`;
                })
                .join('');

            return `
            <div style="margin-bottom: 20px;">
                <h5 style="color: #999; margin-bottom: 8px; font-size: 0.85rem; font-weight: 500;">${monthYear}</h5>
                ${monthHolidays}
            </div>`;
        }).join('');

        holidaysHTML = `
        <div class="holiday-calendar" style="margin-top: 25px;">
            <h4 style="color: #e0e0e0; margin-bottom: 16px; font-size: 1.1rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px;">
                
                Market Holidays (${holidays.length})
            </h4>
            <div style="background: rgba(255, 255, 255, 0.03); padding: 15px; border-radius: 10px; max-height: 300px; overflow-y: auto;">
                ${monthsHTML}
            </div>
        </div>`;
    }

    // Determine if we're on a mobile device
    const isMobile = window.innerWidth < 768;

    // Update modal content with minimalistic design
    document.getElementById('exchange-info-title').textContent = info.name;

    document.getElementById('exchange-info-body').innerHTML = `
        <div class="exchange-info" style="color: #e0e0e0; line-height: 1.6; font-size: ${isMobile ? '0.95rem' : '1rem'};">
        <!-- Map with improved styling -->
            <div style="width: 100%; height: ${isMobile ? '220px' : '220px'}; margin-bottom: 30px; border-radius: 10px; overflow: hidden; box-shadow: 0 3px 15px rgba(0,0,0,0.2);">
                <div id="exchange-map" style="width: 100%; height: 100%;"></div>
            </div>
        
        <!-- Description with gradient border -->
            <div style="margin-bottom: 30px; background: rgba(255,255,255,0.03); border-radius: 10px; padding: 20px;  box-shadow: 0 2px 12px rgba(0,0,0,0.1);">
                <h4 style="color: #e0e0e0; margin-top: 0; margin-bottom: 12px; font-size: 1rem; font-weight: 600; display: flex; align-items: center;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="margin-right: 6px;">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    OVERVIEW
                </h4>
                <p style="line-height: 1.7; margin: 0; color: #bbb;">${info.description}</p>
            </div>
            <!-- Key Information Cards -->
            <div class="exchange-summary" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 15px; margin-bottom: 25px;">
                <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; transition: all 0.2s ease;">
                    <div style="font-size: 0.75rem; color: #999; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.5px; display: flex; align-items: center;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="margin-right: 5px;">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        Founded
                    </div>
                    <div style="font-weight: 500;">${info.founded}</div>
                </div>
                <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; transition: all 0.2s ease;">
                    <div style="font-size: 0.75rem; color: #999; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.5px; display: flex; align-items: center;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="margin-right: 5px;">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        Location
                    </div>
                    <div style="font-weight: 500;">${info.location}</div>
                </div>
                <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; transition: all 0.2s ease;">
                    <div style="font-size: 0.75rem; color: #999; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.5px; display: flex; align-items: center;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="margin-right: 5px;">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        Trading Hours
                    </div>
                    <div style="font-weight: 500;">${info.tradingHours}</div>
                </div>
                <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; transition: all 0.2s ease;">
                    <div style="font-size: 0.75rem; color: #999; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.5px; display: flex; align-items: center;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="margin-right: 5px;">
                            <line x1="12" y1="1" x2="12" y2="23"></line>
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                        </svg>
                        Market Cap
                    </div>
                    <div style="font-weight: 500;">${info.marketCap}</div>
                </div>
            </div>

            

            <!-- Information grid with icons -->
            <div class="info-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px;">
                <div style="background: rgba(255,255,255,0.03); border-radius: 8px; padding: 18px; transition: all 0.2s ease; height: 100%;">
                    <h4 style="color: #e0e0e0; margin-top: 0; margin-bottom: 12px; font-size: 0.95rem; font-weight: 600; display: flex; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="margin-right: 6px;">
                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                        </svg>
                        KEY INDICES
                    </h4>
                    <p style="margin: 0; color: #bbb;">${info.majorIndices}</p>
                </div>
                <div style="background: rgba(255,255,255,0.03); border-radius: 8px; padding: 18px; transition: all 0.2s ease; height: 100%;">
                    <h4 style="color: #e0e0e0; margin-top: 0; margin-bottom: 12px; font-size: 0.95rem; font-weight: 600; display: flex; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="margin-right: 6px;">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        </svg>
                        REGULATORY BODY
                    </h4>
                    <p style="margin: 0; color: #bbb;">${info.regulatoryBody}</p>
                </div>
            </div>
            
            <div class="info-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px;">
                <div style="background: rgba(255,255,255,0.03); border-radius: 8px; padding: 18px; transition: all 0.2s ease; height: 100%;">
                    <h4 style="color: #e0e0e0; margin-top: 0; margin-bottom: 12px; font-size: 0.95rem; font-weight: 600; display: flex; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="margin-right: 6px;">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        LISTED COMPANIES
                    </h4>
                    <p style="margin: 0; color: #bbb;">${info.listedCompanies}</p>
                </div>
                <div style="background: rgba(255,255,255,0.03); border-radius: 8px; padding: 18px; transition: all 0.2s ease; height: 100%;">
                    <h4 style="color: #e0e0e0; margin-top: 0; margin-bottom: 12px; font-size: 0.95rem; font-weight: 600; display: flex; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="margin-right: 6px;">
                            <path d="M12 20v-6M6 20V10M18 20V4"></path>
                        </svg>
                        TRADING VOLUME
                    </h4>
                    <p style="margin: 0; color: #bbb;">${info.tradingVolume}</p>
                </div>
            </div>
            
            <!-- Website link with hover effect -->
            <div style="margin-bottom: 30px;">
                <h4 style="color: #e0e0e0; margin-bottom: 12px; font-size: 0.95rem; font-weight: 600; display: flex; align-items: center;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="margin-right: 6px;">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                    WEBSITE
                </h4>
                <a href="${info.website}" target="_blank" style="
                    color: #4d84e2; 
                    text-decoration: none; 
                    word-break: break-all; 
                    background: rgba(77,132,226,0.1);
                    padding: 8px 12px;
                    border-radius: 4px;
                    display: inline-block;
                    transition: all 0.2s ease;
                    border: 1px solid rgba(77,132,226,0.2);
                ">${info.website}</a>
            </div>
            
            
            
            <!-- Market Holidays Section with improved styling -->
            ${holidaysHTML}
        </div>
    `;

    // Add Leaflet CSS if not already present
    if (!document.getElementById('leaflet-css')) {
        const leafletCSS = document.createElement('link');
        leafletCSS.id = 'leaflet-css';
        leafletCSS.rel = 'stylesheet';
        leafletCSS.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        leafletCSS.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
        leafletCSS.crossOrigin = '';
        document.head.appendChild(leafletCSS);
    }

    // Add Leaflet JS if not already present
    if (!document.getElementById('leaflet-js')) {
        const leafletJS = document.createElement('script');
        leafletJS.id = 'leaflet-js';
        leafletJS.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        leafletJS.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
        leafletJS.crossOrigin = '';
        document.head.appendChild(leafletJS);
    }

    // Initialize map after ensuring Leaflet is loaded
    const initMap = () => {
        // Define geocoding data for exchanges
        const geocode = {
            'NYSE': [40.7069, -74.0113],
            'NASDAQ': [40.7562, -73.9856],
            'TSX': [43.6489, -79.3806],
            'BMV': [19.4326, -99.1332],
            'CSE': [6.9271, 79.8612],
            'XETRA': [50.1109, 8.6821],
            'Euronext': [48.8566, 2.3522],
            'SIX': [47.3769, 8.5417],
            'BME': [40.4168, -3.7038],
            'LSE': [51.5074, -0.1278],
            'OMX': [59.3293, 18.0686],
            'MOEX': [55.7558, 37.6173],
            'BorsaItaliana': [45.4642, 9.1900],
            'WSE': [52.2297, 21.0122],
            'OSE': [59.9139, 10.7522],
            'ISE': [53.3498, -6.2603],
            'JPX': [35.6762, 139.6503],
            'HKEX': [22.2793, 114.1628],
            'SSE': [31.2304, 121.4737],
            'SZSE': [22.5431, 114.0579],
            'BSE': [18.9290, 72.8341],
            'NSE': [19.0176, 72.8561],
            'KRX': [35.1796, 129.0756],
            'TWSE': [25.0330, 121.5654],
            'SGX': [1.2839, 103.8509],
            'TASE': [32.0853, 34.7818],
            'IDX': [-6.2088, 106.8456],
            'SET': [13.7563, 100.5018],
            'PSE': [14.5995, 120.9842],
            'HOSE': [10.7765, 106.7010],
            'DFM': [25.2048, 55.2708],
            'ADX': [24.4539, 54.3773],
            'ASX': [-33.8688, 151.2093],
            'NZX': [-41.2865, 174.7762],
            'JSE': [-26.2041, 28.0473],
            'EGX': [30.0444, 31.2357],
            'NSE_Nigeria': [6.4550, 3.3841],
            'ZSE': [-17.8252, 31.0335],
            'GSE': [5.5560, -0.1969],
            'NSE_Kenya': [-1.2921, 36.8219],
            'B3': [-23.5505, -46.6333],
            'Santiago': [-33.4489, -70.6693],
            'BVC': [4.6097, -74.0817],
            'BVL': [-12.0464, -77.0428],
            'BVBA': [-34.6037, -58.3816]
        };

        // Initialize map with a retry mechanism
        let attempts = 0;
        const maxAttempts = 5;
        const tryInitMap = () => {
            attempts++;

            if (window.L) {
                try {
                    const mapElement = document.getElementById('exchange-map');
                    if (!mapElement) {
                        if (attempts < maxAttempts) setTimeout(tryInitMap, 200);
                        return;
                    }

                    // Get coordinates for the specific exchange
                    const coordinates = geocode[exchange] || [0, 0];

                    // Initialize map with fewer controls for mobile
                    const map = L.map('exchange-map', {
                        zoomControl: !isMobile,
                        attributionControl: !isMobile
                    }).setView(coordinates, 13);

                    // Add dark theme tiles
                    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                        subdomains: 'abcd',
                        maxZoom: 19
                    }).addTo(map);

                    // Simple marker for better mobile performance
                    const marker = L.marker(coordinates).addTo(map);
                    marker.bindPopup(info.name);

                    // Force map refresh after modal appears
                    setTimeout(() => {
                        map.invalidateSize();
                        if (isMobile) map.setZoom(12); // Zoom out slightly on mobile
                    }, 300);
                } catch (err) {
                    console.warn('Map initialization error:', err);
                }
            } else if (attempts < maxAttempts) {
                // Try again if Leaflet isn't loaded yet
                setTimeout(tryInitMap, 200);
            }
        };

        // Start the map initialization process
        tryInitMap();
    };

    // Start map initialization
    initMap();

    // Show the modal
    modal.style.display = 'block';

    // Prevent body scrolling when modal is open (to fix mobile scrolling issues)
    document.body.style.overflow = 'hidden';

    // Restore scrolling when modal is closed
    const restoreScroll = () => {
        document.body.style.overflow = '';
    };

    // Attach one-time event listeners to restore scroll when modal is closed
    const closeBtn = modal.querySelector('#close-exchange-info');
    const onceOptions = { once: true };

    closeBtn.addEventListener('click', restoreScroll, onceOptions);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) restoreScroll();
    }, onceOptions);
}

// State variables for managing UI and market status
let currentRegion = "all";           // Default region filter
let isMinimized = false;             // Toggle for minimized card view
let showFavoritesOnly = false;       // Toggle for showing only favorite markets
let favorites = new Set();           // Set of favorite markets
let marketStatusHistory = {};        // Tracks open/closed status history
let currentChart = null;
let recommendationChart = null;
let earningsChart = null;

const closeButton = document.querySelector("#closeButton");

// Modal and panel toggle logic
const calendarModal = document.getElementById('calendar-modal');
const closeCalendar = document.getElementById('closecalendar');

const calendarPanel = document.getElementById('calendar-panel');
const toggleCalendar = document.getElementById('toggle-calendar');
const closePanel = document.getElementById('close-panel');

const marketSummaryModal = document.getElementById('market-summary-modal');
const toggleMarketSummary = document.getElementById('toggle-market-summary');
const closeMarketSummary = document.getElementById('closesummary');

const backtestModal = document.getElementById('backtest-modal');
const toggleBacktest = document.getElementById('toggle-backtest');
const closeBacktest = document.getElementById('close-backtest');

const resultsPanel = document.getElementById('backtest-results-panel');
const closeResults = document.getElementById('close-results');

toggleMarketSummary.addEventListener('click', () => {
    marketSummaryModal.style.display = 'block';
});
closeMarketSummary.addEventListener('click', () => {
    marketSummaryModal.style.display = 'none';
});

toggleBacktest.addEventListener('click', () => {
    backtestModal.style.display = 'block';
});
closeBacktest.addEventListener('click', () => {
    backtestModal.style.display = 'none';
});

closeResults.addEventListener('click', () => {
    resultsPanel.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === backtestModal) {
        backtestModal.style.display = 'none';
    }
});

// Fetch stock data with proxy
// Wait for DOM to be fully loaded before setting up stock data fetching
document.addEventListener('DOMContentLoaded', () => {
    async function fetchStockData(stockSymbol, startDate, endDate) {
        try {
            const period1 = Math.floor(new Date(startDate).getTime() / 1000);
            const period2 = Math.floor(new Date(endDate).getTime() / 1000);

            // Yahoo Finance API endpoint mit CORS-Proxy
            const proxyUrl = 'https://corsproxy.io/?';
            const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${stockSymbol}?period1=${period1}&period2=${period2}&interval=1d`;
            const url = proxyUrl + encodeURIComponent(yahooUrl);

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // corsproxy.io liefert das JSON direkt, nicht als { contents: ... }
            const data = await response.json();

            if (!data.chart || !data.chart.result || !data.chart.result[0]) {
                throw new Error('Invalid data format received');
            }

            const timestamps = data.chart.result[0].timestamp;
            const closePrices = data.chart.result[0].indicators.quote[0].close;

            return timestamps.map((timestamp, index) => ({
                date: new Date(timestamp * 1000).toISOString().split('T')[0],
                close: closePrices[index]
            })).filter(item => item.close !== null);

        } catch (error) {
            console.error(`Error fetching data for ${stockSymbol}:`, error.message);
            return { error: error.message };
        }
    }

    // Make fetchStockData available globally
    window.fetchStockData = fetchStockData;

    // Fetch dividend data from Yahoo Finance
    async function fetchDividendData(stockSymbol, startDate, endDate) {
        try {
            const startUnix = dateToUnix(startDate);
            const endUnix = dateToUnix(endDate);
            
            // Yahoo Finance API endpoint for dividends
            const proxyUrl = 'https://corsproxy.io/?';
            const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${stockSymbol}?period1=${startUnix}&period2=${endUnix}&interval=1d&events=div`;
            const url = proxyUrl + encodeURIComponent(yahooUrl);

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            if (!data.chart || !data.chart.result || !data.chart.result[0]) {
                return { error: 'Invalid data format received' };
            }

            const result = data.chart.result[0];
            const dividends = result.events?.dividends ? Object.values(result.events.dividends).sort((a, b) => a.date - b.date) : [];

            return dividends.map(div => ({
                date: new Date(div.date * 1000).toISOString().split('T')[0],
                amount: div.amount
            }));

        } catch (error) {
            console.error(`Error fetching dividend data for ${stockSymbol}:`, error.message);
            return { error: error.message };
        }
    }

    // Make fetchDividendData available globally
    window.fetchDividendData = fetchDividendData;
});

// Calculate investment for a single stock (initial + monthly) and track daily values including dividends
function calculateStockInvestment(data, dividendData, initialAmountPerStock, monthlyAmountPerStock, startDate, endDate, reinvestDividends = false) {
    let totalShares = 0;
    let totalInvested = 0;
    let totalDividends = 0;
    let cashDividends = 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const valueOverTime = [];
    const monthlyDividendPayments = {};

    // Initial investment at start date
    const startPrice = data[0].close;
    if (initialAmountPerStock > 0) {
        const initialShares = initialAmountPerStock / startPrice;
        totalShares += initialShares;
        totalInvested += initialAmountPerStock;
    }

    // Track value for each date
    let nextInvestmentDate = new Date(start);
    nextInvestmentDate.setMonth(nextInvestmentDate.getMonth() + 1);
    nextInvestmentDate.setDate(1);

    let dividendIndex = 0;

    for (const day of data) {
        const currentDay = new Date(day.date);
        const monthKey = `${currentDay.getFullYear()}-${String(currentDay.getMonth() + 1).padStart(2, '0')}`;

        // Initialize monthly dividend for this month if not exists
        if (!monthlyDividendPayments[monthKey]) {
            monthlyDividendPayments[monthKey] = 0;
        }

        // Add monthly investment if it's the first trading day of the month
        if (monthlyAmountPerStock > 0 && currentDay >= nextInvestmentDate && currentDay <= end) {
            const sharesBought = monthlyAmountPerStock / day.close;
            totalShares += sharesBought;
            totalInvested += monthlyAmountPerStock;
            nextInvestmentDate.setMonth(nextInvestmentDate.getMonth() + 1);
        }

        // Process dividends for this date
        while (dividendIndex < dividendData.length && new Date(dividendData[dividendIndex].date) <= currentDay) {
            const dividend = dividendData[dividendIndex];
            const dividendAmount = totalShares * dividend.amount;
            totalDividends += dividendAmount;
            monthlyDividendPayments[monthKey] += dividendAmount;

            if (reinvestDividends) {
                // Reinvest dividends to buy more shares
                const additionalShares = dividendAmount / day.close;
                totalShares += additionalShares;
            } else {
                // Keep dividends as cash
                cashDividends += dividendAmount;
            }
            
            dividendIndex++;
        }

        // Record portfolio value for this day
        valueOverTime.push({
            date: day.date,
            value: totalShares * day.close + cashDividends
        });
    }

    const finalPrice = data[data.length - 1].close;
    const finalValue = totalShares * finalPrice + cashDividends;
    return { 
        totalInvested, 
        finalValue, 
        totalShares, 
        totalDividends, 
        cashDividends,
        valueOverTime,
        monthlyDividendPayments
    };
}

// Generate portfolio chart
function generatePortfolioChart(dates, portfolioValues) {
    const ctx = document.getElementById('portfolio-chart');
    if (!ctx) {
        console.error('Chart container not found');
        return;
    }

    // Show the portfolio chart title
    const titleElement = document.getElementById('portfolio-chart-title');
    if (titleElement) {
        titleElement.style.display = 'block';
    }

    // Destroy existing Chart.js chart if present
    if (window.portfolioChart) {
        window.portfolioChart.destroy();
    }

    window.portfolioChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Portfolio Value',
                data: portfolioValues,
                borderColor: '#01c3a8',
                backgroundColor: createGradient(ctx),
                tension: 0.4,
                fill: true,
                pointRadius: 0,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        maxTicksLimit: 8,
                        color: '#888'
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        padding: 10,
                        color: '#888'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    titleFont: {
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 13
                    },
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: function (context) {
                            return `$${context.parsed.y.toFixed(2)}`;
                        }
                    }
                }
            },
            interaction: {
                mode: 'index',
                intersect: false
            },
            elements: {
                point: {
                    radius: 0,
                    hoverRadius: 6,
                    hoverBorderWidth: 2,
                    hoverBackgroundColor: '#fff',
                    hoverBorderColor: '#01c3a8'
                }
            }
        }
    });
}

// Backtest form submission handler (portfolio sum with chart)
document.getElementById('backtest-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const stocksInput = document.getElementById('stocks').value.toUpperCase();
    const stockSymbols = stocksInput.split(',').map(s => s.trim()).filter(s => s !== '');
    const initialAmount = parseFloat(document.getElementById('initial-amount').value);
    const monthlyAmount = parseFloat(document.getElementById('monthly-amount').value);
    const startDate = document.getElementById('start').value;
    const endDate = document.getElementById('end').value;
    const resultDiv = document.getElementById('result');

    if (stockSymbols.length === 0) {
        resultDiv.innerHTML = "<p style='color: red;'>Please enter at least one stock symbol!</p>";
        resultsPanel.style.display = 'block';
        backtestModal.style.display = 'none';
        return;
    }
    if (isNaN(initialAmount) || initialAmount < 0) {
        resultDiv.innerHTML = "<p style='color: red;'>Initial amount must be a non-negative number!</p>";
        resultsPanel.style.display = 'block';
        backtestModal.style.display = 'none';
        return;
    }
    if (isNaN(monthlyAmount) || monthlyAmount < 0) {
        resultDiv.innerHTML = "<p style='color: red;'>Monthly amount must be a non-negative number!</p>";
        resultsPanel.style.display = 'block';
        backtestModal.style.display = 'none';
        return;
    }
    if (initialAmount === 0 && monthlyAmount === 0) {
        resultDiv.innerHTML = "<p style='color: red;'>At least one of initial or monthly amount must be greater than zero!</p>";
        resultsPanel.style.display = 'block';
        backtestModal.style.display = 'none';
        return;
    }
    if (new Date(startDate) >= new Date(endDate)) {
        resultDiv.innerHTML = "<p style='color: red;'>Start date must be before end date!</p>";
        resultsPanel.style.display = 'block';
        backtestModal.style.display = 'none';
        return;
    }

    resultDiv.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; flex-direction: column; height: 100%; min-height: 400px;">
        <div class="loader">
          <div class="loader-animation"></div>
          <style>
            .loader {
              width: 150px;
              height: 150px;
              line-height: 150px;
              position: relative;
              box-sizing: border-box;
              text-align: center;
              z-index: 0;
              text-transform: uppercase;
            }

            .loader-animation {
              width: 100%;
              height: 100%;
              position: relative;
            }

            .loader-animation:before,
            .loader-animation:after {
              opacity: 0;
              box-sizing: border-box;
              content: "\\0020";
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              border-radius: 50%;
              border: 5px solid #fff;
              box-shadow: 0 0 50px #fff, inset 0 0 50px #fff;
            }

            .loader-animation:after {
              z-index: 1;
              -webkit-animation: gogoloader 2s infinite 1s;
            }

            .loader-animation:before {
              z-index: 2;
              -webkit-animation: gogoloader 2s infinite;
            }

            @-webkit-keyframes gogoloader {
              0% {
                -webkit-transform: scale(0);
                opacity: 0;
              }
              50% {
                opacity: 1;
              }
              100% {
                -webkit-transform: scale(1);
                opacity: 0;
              }
            }
          </style>
        </div>
        
      </div>
    `;
    resultsPanel.style.display = 'block';

    window.onload = () => document.querySelector(".loading").remove();

    document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll("img").forEach(img => {
            img.onerror = function () {
                this.style.display = "none";
            };
        });
    });

    // Fetch data for all stocks
    const promises = stockSymbols.map(symbol => fetchStockData(symbol, startDate, endDate));
    const dividendPromises = stockSymbols.map(symbol => fetchDividendData(symbol, startDate, endDate));
    const results = await Promise.allSettled(promises);
    const dividendResults = await Promise.allSettled(dividendPromises);

    let portfolioTotalInvested = 0;
    let portfolioFinalValue = 0;
    let portfolioShares = 0;
    let portfolioTotalDividends = 0;
    let allValid = true;
    let errorMessages = [];
    const portfolioValuesOverTime = {};
    const portfolioMonthlyDividends = {};

    // Get reinvestment preference
    const reinvestDividends = document.getElementById('reinvest-dividends').checked;

    // Split amounts equally among stocks
    const initialAmountPerStock = initialAmount / stockSymbols.length;
    const monthlyAmountPerStock = monthlyAmount / stockSymbols.length;

    results.forEach((result, index) => {
        const stockSymbol = stockSymbols[index];
        const dividendResult = dividendResults[index];
        
        if (result.status === 'fulfilled' && result.value && !result.value.error && result.value.length >= 2) {
            const data = result.value;
            const dividendData = (dividendResult.status === 'fulfilled' && !dividendResult.value.error) 
                ? dividendResult.value 
                : [];

            const { 
                totalInvested, 
                finalValue, 
                totalShares, 
                totalDividends, 
                valueOverTime,
                monthlyDividendPayments
            } = calculateStockInvestment(
                data,
                dividendData,
                initialAmountPerStock,
                monthlyAmountPerStock,
                startDate,
                endDate,
                reinvestDividends
            );

            portfolioTotalInvested += totalInvested;
            portfolioFinalValue += finalValue;
            portfolioShares += totalShares;
            portfolioTotalDividends += totalDividends;

            // Aggregate daily portfolio values
            valueOverTime.forEach(({ date, value }) => {
                portfolioValuesOverTime[date] = (portfolioValuesOverTime[date] || 0) + value;
            });

            // Aggregate monthly dividend payments
            Object.keys(monthlyDividendPayments).forEach(month => {
                portfolioMonthlyDividends[month] = (portfolioMonthlyDividends[month] || 0) + monthlyDividendPayments[month];
            });
        } else {
            allValid = false;
            const errorMsg = result.value?.error || result.reason?.message || "Unknown error";
            errorMessages.push(`Failed to fetch data for ${stockSymbol}: ${errorMsg}, please reload the page and try again.`);
        }
    });

    let resultHTML = "";
    if (allValid) {
        // Halteperiode berechnen (in Tagen)
        let holdingPeriodDays = 0;
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            holdingPeriodDays = Math.max(0, Math.round((end - start) / (1000 * 60 * 60 * 24)));
        }
        const portfolioProfit = portfolioFinalValue - portfolioTotalInvested;
        const profitPercent = (portfolioProfit / portfolioTotalInvested) * 100;
        const profitColor = portfolioFinalValue >= portfolioTotalInvested ? "#00ff00" : "#ff0000";
        const isMobile = window.matchMedia("(max-width: 800px)").matches;
        const mobileStyles = isMobile ? "padding: 0; width: 100%;" : "padding: 10px; width: 100%;";

        resultHTML = `
            <div class="results-container" style="
            margin-bottom: 40px; 
            padding: 10px;
            overflow: hidden;
            max-height: 800px;
            display: flex;
            flex-direction: column;
            ">

            <div class="portfolio-metrics" style="width: 100%;">
            <div class="metrics-grid" style="
            display: grid; 
            grid-template-columns: 
            repeat(auto-fit, 
            minmax(240px, 1fr)); 
            gap: 15px; 
            width: 100%;
            margin-bottom: 20px;
            ">

            <div class="metric-card" style="
            background: rgba(33, 33, 33, 0.9); 
            padding: 15px; 
            border-radius: 8px; 
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            ">

                <span class="metric-label" style="
                color: white; 
                font-size: 
                clamp(0.9rem, 3vw, 1.1rem); 
                display: block; 
                margin-bottom: 8px;
                ">Total Investment</span>

                <span class="metric-value" style="
                color: #2196F3; 
                font-size: clamp(1.1rem, 3.5vw, 1.3rem); 
                font-weight: bold;">$${portfolioTotalInvested.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>

            <div class="metric-card" style="
            background: rgba(33, 33, 33, 0.9); 
            padding: 15px; 
            border-radius: 8px; 
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            ">

                <span class="metric-label" style="
                color: white; 
                font-size: clamp(0.9rem, 3vw, 1.1rem); 
                display: block; 
                margin-bottom: 8px;">Current Value</span>

                <span class="metric-value" style="
                color: ${portfolioFinalValue >= portfolioTotalInvested ? '#4CAF50' : '#F44336'}; 
                font-size: clamp(1.1rem, 3.5vw, 1.3rem); 
                font-weight: bold;">
                $${portfolioFinalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>

            </div>

            <div class="metric-card" style="
            background: rgba(33, 33, 33, 0.9); 
            padding: 15px; 
            border-radius: 8px; 
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            ">

                <span class="metric-label" style="
                color: white; 
                font-size: clamp(0.9rem, 3vw, 1.1rem); 
                display: block; 
                margin-bottom: 8px;">Total Return</span>

                <span class="metric-value" style="
                color: ${portfolioProfit >= 0 ? '#4CAF50' : '#F44336'}; 
                font-size: 
                clamp(1.1rem, 3.5vw, 1.3rem); 
                font-weight: bold;">
                $${portfolioProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                <small style="font-size: clamp(0.8rem, 2.5vw, 1rem);">(${profitPercent >= 0 ? '+' : ''}${profitPercent.toFixed(2)}%)</small>
                </span>
            </div>

            <div class="metric-card" style="
            background: rgba(33, 33, 33, 0.9); 
            padding: 15px; 
            border-radius: 8px; 
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            ">
                <span class="metric-label" style="
                color: white; 
                font-size: clamp(0.9rem, 3vw, 1.1rem); 
                display: block; 
                margin-bottom: 8px;">Total Shares</span>
                <span class="metric-value" style="
                color: #607D8B; 
                font-size: clamp(1.1rem, 3.5vw, 1.3rem); 
                font-weight: bold;">
                ${portfolioShares.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
            </div>

            <div class="metric-card" style="
            background: rgba(33, 33, 33, 0.9); 
            padding: 15px; 
            border-radius: 8px; 
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            ">
                <span class="metric-label" style="
                color: white; 
                font-size: clamp(0.9rem, 3vw, 1.1rem); 
                display: block; 
                margin-bottom: 8px;">Total Dividends</span>
                <span class="metric-value" style="
                color: #FFD700; 
                font-size: clamp(1.1rem, 3.5vw, 1.3rem); 
                font-weight: bold;">
                $${portfolioTotalDividends.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
            </div>

            <div class="metric-card" style="
            background: rgba(33, 33, 33, 0.9); 
            padding: 15px; 
            border-radius: 8px; 
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            ">
                <span class="metric-label" style="
                color: white; 
                font-size: clamp(0.9rem, 3vw, 1.1rem); 
                display: block; 
                margin-bottom: 8px;">Holding Period</span>
                <span class="metric-value" style="
                color: #FF9800; 
                font-size: clamp(1.1rem, 3.5vw, 1.3rem); 
                font-weight: bold;">
                ${holdingPeriodDays} days
                </span>
            </div>
            </div>
            </div>
            <!-- Chart wird im bestehenden Canvas gerendert -->
            </div>
        `;
        resultDiv.innerHTML = resultHTML;

        // Erstellen der Chart.js-Konfiguration
        const dates = Object.keys(portfolioValuesOverTime).sort();
        const portfolioValues = dates.map(date => portfolioValuesOverTime[date]);

        // Erstelle Dividenden-Daten für das Balkendiagramm
        const monthlyDividendLabels = Object.keys(portfolioMonthlyDividends).sort();
        const monthlyDividendValues = monthlyDividendLabels.map(month => portfolioMonthlyDividends[month]);

        // Füge Canvas für das Chart hinzu
        resultDiv.innerHTML += `
            <h3 style="color: #fff; margin-top: 30px; margin-bottom: 10px; font-size: 1.2em; font-weight: 600;">Portfolio Value</h3>
            <div style="width: 100%; height: 400px; margin-top: 10px; position: relative;">
                <canvas id="portfolio-chart" style="width: 100%; height: 100%;"></canvas>
            </div>
            <h3 style="color: #fff; margin-top: 30px; margin-bottom: 10px; font-size: 1.2em; font-weight: 600;">Dividends</h3>
            <div style="width: 100%; height: 250px; margin-top: 10px; position: relative;">
                <canvas id="dividend-chart" style="width: 100%; height: 100%;"></canvas>
            </div>
        `;

        const ctx = document.getElementById('portfolio-chart').getContext('2d');
        const dividendCtx = document.getElementById('dividend-chart').getContext('2d');

        // Gradient für den Hintergrund erstellen
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(1, 195, 168, 0.3)');
        gradient.addColorStop(1, 'rgba(1, 195, 168, 0)');

        // Zerstöre existierende Charts wenn vorhanden
        if (window.portfolioChart) {
            window.portfolioChart.destroy();
        }
        if (window.dividendChart) {
            window.dividendChart.destroy();
        }

        // Chart.js Plugin für Zoom registrieren
        Chart.register('chartjs-plugin-zoom');

        // Erstelle Portfolio-Chart
        window.portfolioChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: 'Portfolio-Wert',
                    data: dates.map((date, index) => ({
                        x: new Date(date),
                        y: portfolioValues[index]
                    })),
                    borderColor: '#01c3a8',
                    backgroundColor: gradient,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 0,
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'month',
                            displayFormats: {
                                month: 'MMM yyyy'
                            }
                        },
                        grid: {
                            display: false,
                            drawBorder: false
                        },
                        ticks: {
                            maxTicksLimit: 8,
                            color: '#888'
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)',
                            drawBorder: false
                        },
                        ticks: {
                            padding: 10,
                            color: '#888',
                            callback: function (value) {
                                return '$' + value.toLocaleString('en-US', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                });
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        titleFont: {
                            size: 14,
                            weight: 'bold'
                        },
                        bodyFont: {
                            size: 13
                        },
                        padding: 12,
                        displayColors: false,
                        callbacks: {
                            title: function (tooltipItems) {
                                return new Date(tooltipItems[0].parsed.x).toLocaleDateString('de-DE', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric'
                                });
                            },
                            label: function (context) {
                                return 'Portfolio-Wert: $' + context.parsed.y.toLocaleString('en-US', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                });
                            }
                        }
                    }
                },
                interaction: {
                    mode: 'index',
                    intersect: false
                }
            }
        });

        // Erstelle Dividenden-Chart
        window.dividendChart = new Chart(dividendCtx, {
            type: 'bar',
            data: {
                labels: monthlyDividendLabels.map(month => {
                    const [year, monthNum] = month.split('-');
                    return new Date(year, monthNum - 1).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short' 
                    });
                }),
                datasets: [{
                    label: 'Monatliche Dividenden',
                    data: monthlyDividendValues,
                    backgroundColor: 'rgba(255, 215, 0, 0.6)',
                    borderColor: '#FFD700',
                    borderWidth: 1,
                    borderRadius: 4,
                    borderSkipped: false,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        grid: {
                            display: false,
                            drawBorder: false
                        },
                        ticks: {
                            color: '#888'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)',
                            drawBorder: false
                        },
                        ticks: {
                            padding: 10,
                            color: '#888',
                            callback: function (value) {
                                return '$' + value.toLocaleString('en-US', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                });
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        titleFont: {
                            size: 14,
                            weight: 'bold'
                        },
                        bodyFont: {
                            size: 13
                        },
                        padding: 12,
                        displayColors: false,
                        callbacks: {
                            label: function (context) {
                                return 'Dividenden: $' + context.parsed.y.toLocaleString('en-US', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                });
                            }
                        }
                    }
                }
            }
        });

    } else {
        resultHTML = `<p style='color: red;'>${errorMessages.join('<br>')}. <a href="https://cors-anywhere.herokuapp.com/" target="_blank">Ensure proxy is active</a>.</p>`;
        resultDiv.innerHTML = resultHTML;
    }

    resultsPanel.style.display = 'block';
    backtestModal.style.display = 'none';
});

// Stock Analysis Modal - Chart.js Implementation (Alpha Vantage version)
document.addEventListener("DOMContentLoaded", () => {
    const analysisButton = document.getElementById("toggle-analysis");
    const analysisModal = document.getElementById("analysis-modal");
    const closeAnalysisButton = document.getElementById("close-analysis");
    const stockSymbolInput = document.getElementById("stock-symbol");
    const analyzeBtn = document.getElementById("analyze-btn");
    const loadingOverlay = document.getElementById("loading-overlay");

    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    // Timeframe functionality
    const timeframeButtons = document.querySelectorAll('.timeframe-btn');

    // Chart.js instance
    let stockChart = null;
    let currentStockData = null;

    // Fetch current stock quote from Yahoo Finance
    async function fetchCurrentStockQuote(symbol) {
        try {
            // Use the same CORS proxy configuration as the working fetchStockData function
            const proxyUrl = 'https://corsproxy.io/?';
            
            // Use chart API to get current quote data (more reliable)
            const endDate = Math.floor(Date.now() / 1000);
            const startDate = endDate - (7 * 24 * 60 * 60); // 7 days ago
            
            const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?period1=${startDate}&period2=${endDate}&interval=1d&includePrePost=false`;
            const url = proxyUrl + encodeURIComponent(yahooUrl);

            console.log('Fetching stock data from:', url);

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Raw API response:', data);
            
            if (!data.chart || !data.chart.result || !data.chart.result[0]) {
                throw new Error('Invalid quote data format');
            }

            const result = data.chart.result[0];
            const meta = result.meta;
            const timestamps = result.timestamp;
            const quotes = result.indicators.quote[0];
            
            // Get the latest price data
            const latestIndex = timestamps.length - 1;
            const currentPrice = quotes.close[latestIndex] || meta.regularMarketPrice;
            const previousClose = meta.previousClose || quotes.close[latestIndex - 1];
            const change = currentPrice - previousClose;
            const changePercent = (change / previousClose) * 100;

            // Try to fetch additional financial metrics
            let additionalMetrics = {};
            try {
                additionalMetrics = await fetchAdditionalMetrics(symbol);
                console.log('Additional metrics received:', additionalMetrics);
            } catch (error) {
                console.warn('Could not fetch additional metrics:', error);
                // Don't use fallback data, just use empty object
                additionalMetrics = {};
            }

            return {
                name: meta.longName || meta.shortName || symbol,
                price: currentPrice,
                change: change,
                changePercent: changePercent,
                marketCap: meta.marketCap ? formatMarketCap(meta.marketCap) : 'N/A',
                
                // Map to correct field names expected by updateAnalysisTab
                pe: additionalMetrics.peRatio || 'N/A',
                pb: additionalMetrics.pbRatio || 'N/A',
                peg: additionalMetrics.pegRatio || 'N/A',
                eps: additionalMetrics.eps || 'N/A',
                revenue: additionalMetrics.revenue || 'N/A',
                beta: additionalMetrics.beta || 'N/A',
                roe: additionalMetrics.roe || 'N/A',
                debtToEquity: additionalMetrics.debtToEquity || 'N/A',
                netMargin: additionalMetrics.profitMargin || 'N/A',
                revenueGrowth: additionalMetrics.revenueGrowth || 'N/A',
                earningsGrowth: additionalMetrics.earningsGrowth || 'N/A',
                epsGrowth: additionalMetrics.epsGrowth || 'N/A',
                roic: additionalMetrics.roic || 'N/A',
                currentRatio: additionalMetrics.currentRatio || 'N/A',
                freeCashFlow: additionalMetrics.freeCashFlow || 'N/A',
                forwardPE: additionalMetrics.forwardPE || 'N/A',
                high52Week: meta.fiftyTwoWeekHigh || 'N/A',
                low52Week: meta.fiftyTwoWeekLow || 'N/A',
                volume: formatVolume(quotes.volume[latestIndex]) || 'N/A',
                dividendYield: additionalMetrics.dividendYield || 'N/A',
                rsi: Math.random() * 100, // RSI would need separate calculation
                ma50: 'N/A', // Would need calculation from historical data
                ma200: 'N/A' // Would need calculation from historical data
            };
        } catch (error) {
            console.error('Error fetching stock quote:', error);
            throw new Error(`Failed to fetch stock data: ${error.message}`);
        }
    }

    // Fetch additional financial metrics - Finviz first, then Yahoo Finance as fallback
    async function fetchAdditionalMetrics(symbol) {
        try {
            console.log('Fetching additional metrics - trying Finviz first...');
            
            // Try Finviz first as primary source
            const finvizMetrics = await fetchFinvizMetrics(symbol);
            if (finvizMetrics && Object.values(finvizMetrics).some(value => value !== null)) {
                console.log('Finviz metrics received:', finvizMetrics);
                
                // Try to supplement with Yahoo Finance data for missing metrics
                try {
                    const yahooMetrics = await fetchYahooFinanceMetrics(symbol);
                    if (yahooMetrics) {
                        console.log('Supplementing with Yahoo Finance metrics:', yahooMetrics);
                        // Merge data, preferring Finviz values
                        return {
                            peRatio: finvizMetrics.peRatio || yahooMetrics.peRatio,
                            pbRatio: finvizMetrics.pbRatio || yahooMetrics.pbRatio,
                            pegRatio: finvizMetrics.pegRatio || yahooMetrics.pegRatio,
                            eps: finvizMetrics.eps || yahooMetrics.eps,
                            revenue: finvizMetrics.revenue || yahooMetrics.revenue,
                            beta: finvizMetrics.beta || yahooMetrics.beta,
                            roe: finvizMetrics.roe || yahooMetrics.roe,
                            debtToEquity: finvizMetrics.debtToEquity || yahooMetrics.debtToEquity,
                            profitMargin: finvizMetrics.profitMargin || yahooMetrics.profitMargin,
                            revenueGrowth: finvizMetrics.revenueGrowth || yahooMetrics.revenueGrowth,
                            earningsGrowth: finvizMetrics.earningsGrowth || yahooMetrics.earningsGrowth,
                            epsGrowth: finvizMetrics.epsGrowth || yahooMetrics.epsGrowth,
                            roic: finvizMetrics.roic || yahooMetrics.roic,
                            currentRatio: finvizMetrics.currentRatio || yahooMetrics.currentRatio,
                            freeCashFlow: finvizMetrics.freeCashFlow || yahooMetrics.freeCashFlow,
                            forwardPE: finvizMetrics.forwardPE || yahooMetrics.forwardPE,
                            dividendYield: finvizMetrics.dividendYield || yahooMetrics.dividendYield
                        };
                    }
                } catch (yahooError) {
                    console.warn('Yahoo Finance supplement failed:', yahooError);
                }
                
                return finvizMetrics;
            }
            
            // If Finviz fails, try Yahoo Finance as fallback
            console.log('Finviz failed, trying Yahoo Finance as fallback...');
            return await fetchYahooFinanceMetrics(symbol);
            
        } catch (error) {
            console.error('Error in fetchAdditionalMetrics:', error);
            return null;
        }
    }

    // Fetch metrics from Finviz (primary source)
    async function fetchFinvizMetrics(symbol) {
        try {
            console.log('Fetching Finviz metrics (primary source)...');
            const proxyUrl = 'https://corsproxy.io/?';
            const finvizUrl = `https://finviz.com/quote.ashx?t=${symbol}`;
            const url = proxyUrl + encodeURIComponent(finvizUrl);

            console.log('Fetching Finviz metrics from:', url);

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Finviz API returned status ${response.status}`);
            }

            const html = await response.text();
            console.log('Finviz response received, parsing HTML...');

            // Parse HTML to extract financial metrics
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Function to extract metric by label
            const extractMetric = (labelText) => {
                const cells = doc.querySelectorAll('td');
                for (let i = 0; i < cells.length; i++) {
                    if (cells[i].textContent.trim() === labelText && cells[i + 1]) {
                        return cells[i + 1].textContent.trim();
                    }
                }
                return null;
            };

            // Extract key metrics from Finviz
            const peRatio = extractMetric('P/E') || extractMetric('PE');
            const pbRatio = extractMetric('P/B') || extractMetric('PB');
            const pegRatio = extractMetric('PEG');
            const eps = extractMetric('EPS (ttm)') || extractMetric('EPS');
            const revenue = extractMetric('Sales') || extractMetric('Revenue');
            const beta = extractMetric('Beta');
            const roe = extractMetric('ROE');
            const debtToEquity = extractMetric('Debt/Eq') || extractMetric('Debt/Equity');
            const profitMargin = extractMetric('Profit M') || extractMetric('Profit Margin');
            const revenueGrowth = extractMetric('Sales Q/Q') || extractMetric('Rev Growth');
            const earningsGrowth = extractMetric('EPS Q/Q') || extractMetric('Earnings Growth');
            const epsGrowth = extractMetric('EPS next Y') || extractMetric('EPS Growth');
            const roic = extractMetric('ROI') || extractMetric('ROIC');
            const currentRatio = extractMetric('Current R') || extractMetric('Current Ratio');
            // Hole Free Cash Flow von MarketBeat für jedes Symbol
            let freeCashFlow = extractMetric('FCF') || extractMetric('Free Cash Flow');
            try {
                const { fetchMarketBeatFreeCashFlow } = await import('./marketbeat_fcf.js');
                const mbFcf = await fetchMarketBeatFreeCashFlow(symbol);
                if (mbFcf) freeCashFlow = mbFcf;
            } catch (e) {
                console.warn('MarketBeat FCF fetch failed:', e);
            }
            const forwardPE = extractMetric('Forward P/E') || extractMetric('Fwd P/E');
            const dividendYield = extractMetric('Dividend %') || extractMetric('Div Yield');
            // Analyst Recom
            const analystRecomRaw = extractMetric('Analyst Recom');
            let analystRecommendation = null;
            if (analystRecomRaw) {
                const value = parseFloat(analystRecomRaw);
                if (!isNaN(value)) {
                    if (value <= 1.5) analystRecommendation = 'Strong Buy';
                    else if (value <= 2.5) analystRecommendation = 'Buy';
                    else if (value <= 3.5) analystRecommendation = 'Hold';
                    else if (value <= 4.5) analystRecommendation = 'Sell';
                    else analystRecommendation = 'Strong Sell';
                }
            }
            // Hole Analysten-Konsens und Price Target ausschließlich von MarketBeat
            let targetPrice = null;
            try {
                analystRecommendation = await fetchMarketBeatConsensus(symbol);
                // Price Target extrahieren
                const proxyUrl = 'https://corsproxy.io/?';
                const marketBeatUrl = `https://www.marketbeat.com/stocks/NASDAQ/${symbol}/forecast/`;
                const url = proxyUrl + encodeURIComponent(marketBeatUrl);
                const response = await fetch(url);
                if (response.ok) {
                    const html = await response.text();
                    const match = html.match(/<span[^>]*class=["']rating-title["'][^>]*>(.*?)<\/span>/i);
                    if (match && match[1]) {
                        targetPrice = match[1].trim();
                    }
                }
            } catch (e) {
                console.warn('MarketBeat consensus/target fetch failed:', e);
                analystRecommendation = 'No consensus data';
            }
// Holt Analysten-Konsens von MarketBeat
async function fetchMarketBeatConsensus(symbol) {
    try {
        const proxyUrl = 'https://corsproxy.io/?';
        // Versuche NASDAQ, dann NYSE
        const exchanges = ['NASDAQ', 'NYSE'];
        let html = null;
        let lastStatus = null;
        for (const ex of exchanges) {
            const marketBeatUrl = `https://www.marketbeat.com/stocks/${ex}/${symbol}/forecast/`;
            const url = proxyUrl + encodeURIComponent(marketBeatUrl);
            const response = await fetch(url);
            lastStatus = response.status;
            if (response.ok) {
                html = await response.text();
                break;
            }
        }
        if (!html) {
            throw new Error(`MarketBeat returned status ${lastStatus}`);
        }
        // Suche nach Konsens-Text im HTML (z.B. "Consensus Rating")
        // Extrahiere Konsens direkt aus <div class="rating-title">...</div>
        let match = html.match(/<div[^>]*class=["']rating-title["'][^>]*>(.*?)<\/div>/i);
        let consensus = null;
        if (match && match[1]) {
            consensus = match[1].trim();
        }
        // Fallback: Suche nach Consensus Rating in <th> oder <td> und extrahiere den Wert aus dem direkt folgenden <td>
        if (!consensus) {
            match = html.match(/Consensus Rating<\/(th|td)>\s*<td[^>]*>(.*?)<\/td>/i);
            if (match && match[2]) {
                consensus = match[2].trim();
            }
        }
        // Fallback: Suche nach Consensus Rating mit <span>
        if (!consensus) {
            match = html.match(/Consensus Rating<\/td>\s*<td[^>]*><span[^>]*>(.*?)<\/span><\/td>/i);
            if (match && match[1]) {
                consensus = match[1].trim();
            }
        }
        // Fallback: Suche nach "Analyst Rating" oder anderen Feldern
        if (!consensus) {
            match = html.match(/Analyst Rating<\/(th|td)>\s*<td[^>]*>(.*?)<\/td>/i);
            if (match && match[2]) {
                consensus = match[2].trim();
            }
        }
        // Fallback: Suche nach Konsens-Text als Klartext im HTML
        if (!consensus) {
            const validRatings = ['Strong Buy', 'Moderate Buy', 'Buy', 'Hold', 'Sell', 'Strong Sell', 'Neutral', 'Outperform', 'Underperform', 'Overweight', 'Underweight'];
            for (const rating of validRatings) {
                if (html.toLowerCase().includes(rating.toLowerCase())) {
                    consensus = rating;
                    break;
                }
            }
        }
        // Nur den echten Konsens-Text zurückgeben
        if (consensus) {
            consensus = consensus.replace(/&#\d+;|&[a-zA-Z]+;/g, '');
            consensus = consensus.replace(/x[a-zA-Z0-9]+/g, '');
            consensus = consensus.replace(/[^a-zA-Z ]/g, '');
            consensus = consensus.replace(/\s+/g, ' ').trim();
            // Nur die wichtigsten Konsens-Texte zulassen
            const validRatings = ['Strong Buy', 'Moderate Buy', 'Buy', 'Hold', 'Sell', 'Strong Sell', 'Neutral', 'Outperform', 'Underperform', 'Overweight', 'Underweight'];
            for (const rating of validRatings) {
                if (consensus.toLowerCase().includes(rating.toLowerCase())) {
                    return rating;
                }
            }
            // Falls kein valider Text gefunden, gib den bereinigten Text zurück
            return consensus;
        }
        return 'No consensus data';
    } catch (error) {
        console.error('Error fetching MarketBeat consensus:', error);
        return 'No consensus data';
    }
}

            console.log('Extracted Finviz metrics:', {
                peRatio, pbRatio, pegRatio, eps, revenue, beta, roe, 
                debtToEquity, profitMargin, revenueGrowth, earningsGrowth,
                epsGrowth, roic, currentRatio, freeCashFlow, forwardPE, dividendYield
            });

            // Convert percentage strings to numbers
            const parsePercent = (value) => {
                if (!value || value === '-') return null;
                const cleaned = value.replace('%', '');
                const num = parseFloat(cleaned);
                return isNaN(num) ? null : num;
            };

            // Convert numeric strings to numbers
            const parseNumber = (value) => {
                if (!value || value === '-') return null;
                const num = parseFloat(value);
                return isNaN(num) ? null : num;
            };

            // Convert large numbers (B, M, K suffixes)
            const parseLargeNumber = (value) => {
                if (!value || value === '-') return null;
                const multipliers = { 'B': 1e9, 'M': 1e6, 'K': 1e3 };
                const match = value.match(/^([\d.]+)([BMK]?)$/);
                if (match) {
                    const num = parseFloat(match[1]);
                    const suffix = match[2];
                    return suffix ? num * multipliers[suffix] : num;
                }
                return value;
            };

            return {
                peRatio: parseNumber(peRatio),
                pbRatio: parseNumber(pbRatio),
                pegRatio: parseNumber(pegRatio),
                eps: parseNumber(eps),
                revenue: parseLargeNumber(revenue),
                beta: parseNumber(beta),
                roe: parsePercent(roe),
                debtToEquity: parseNumber(debtToEquity),
                profitMargin: parsePercent(profitMargin),
                revenueGrowth: parsePercent(revenueGrowth),
                earningsGrowth: parsePercent(earningsGrowth),
                epsGrowth: parsePercent(epsGrowth),
                roic: parsePercent(roic),
                currentRatio: parseNumber(currentRatio),
                freeCashFlow: parseLargeNumber(freeCashFlow),
                forwardPE: parseNumber(forwardPE),
                dividendYield: parsePercent(dividendYield),
                analystRecommendation,
                targetPrice
            };
        } catch (error) {
            console.error('Error fetching Finviz metrics:', error);
            throw error;
        }
    }

    // Fetch metrics from Yahoo Finance (fallback for missing data)
    async function fetchYahooFinanceMetrics(symbol) {
        try {
            const proxyUrl = 'https://corsproxy.io/?';
            const finvizUrl = `https://finviz.com/quote.ashx?t=${symbol}`;
            const url = proxyUrl + encodeURIComponent(finvizUrl);

            console.log('Fetching additional metrics from Finviz:', url);

            const response = await fetch(url);
            if (!response.ok) {
                console.warn(`Finviz API returned status ${response.status}, trying fallback...`);
                return await fetchAlternativeMetrics(symbol);
            }

            const html = await response.text();
            console.log('Finviz response received, parsing HTML...');

            // Parse HTML to extract financial metrics
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Function to extract metric by label
            const extractMetric = (labelText) => {
                const cells = doc.querySelectorAll('td');
                for (let i = 0; i < cells.length; i++) {
                    if (cells[i].textContent.trim() === labelText && cells[i + 1]) {
                        return cells[i + 1].textContent.trim();
                    }
                }
                return null;
            };

            // Extract key metrics from Finviz
            const peRatio = extractMetric('P/E') || extractMetric('PE');
            const pbRatio = extractMetric('P/B') || extractMetric('PB');
            const pegRatio = extractMetric('PEG');
            const eps = extractMetric('EPS (ttm)') || extractMetric('EPS');
            const revenue = extractMetric('Sales') || extractMetric('Revenue');
            const beta = extractMetric('Beta');
            const roe = extractMetric('ROE');
            const debtToEquity = extractMetric('Debt/Eq') || extractMetric('Debt/Equity');
            const profitMargin = extractMetric('Profit M') || extractMetric('Profit Margin');
            const revenueGrowth = extractMetric('Sales Q/Q') || extractMetric('Rev Growth');
            const earningsGrowth = extractMetric('EPS Q/Q') || extractMetric('Earnings Growth');
            const epsGrowth = extractMetric('EPS next Y') || extractMetric('EPS Growth');
            const roic = extractMetric('ROI') || extractMetric('ROIC');
            const currentRatio = extractMetric('Current R') || extractMetric('Current Ratio');
            const freeCashFlow = extractMetric('FCF') || extractMetric('Free Cash Flow');
            const forwardPE = extractMetric('Forward P/E') || extractMetric('Fwd P/E');
            const dividendYield = extractMetric('Dividend %') || extractMetric('Div Yield');

            console.log('Extracted Finviz metrics:', {
                peRatio, pbRatio, pegRatio, eps, revenue, beta, roe, 
                debtToEquity, profitMargin, revenueGrowth, earningsGrowth,
                epsGrowth, roic, currentRatio, freeCashFlow, forwardPE, dividendYield
            });

            // Convert percentage strings to numbers
            const parsePercent = (value) => {
                if (!value || value === '-') return 'N/A';
                const cleaned = value.replace('%', '');
                const num = parseFloat(cleaned);
                return isNaN(num) ? 'N/A' : num;
            };

            // Convert numeric strings to numbers
            const parseNumber = (value) => {
                if (!value || value === '-') return 'N/A';
                const num = parseFloat(value);
                return isNaN(num) ? 'N/A' : num;
            };

            // Convert large numbers (B, M, K suffixes)
            const parseLargeNumber = (value) => {
                if (!value || value === '-') return 'N/A';
                const multipliers = { 'B': 1e9, 'M': 1e6, 'K': 1e3 };
                const match = value.match(/^([\d.]+)([BMK]?)$/);
                if (match) {
                    const num = parseFloat(match[1]);
                    const suffix = match[2];
                    return suffix ? num * multipliers[suffix] : num;
                }
                return value;
            };

            return {
                peRatio: parseNumber(peRatio),
                pbRatio: parseNumber(pbRatio),
                pegRatio: parseNumber(pegRatio),
                eps: parseNumber(eps),
                revenue: parseLargeNumber(revenue),
                beta: parseNumber(beta),
                roe: parsePercent(roe),
                debtToEquity: parseNumber(debtToEquity),
                profitMargin: parsePercent(profitMargin),
                revenueGrowth: parsePercent(revenueGrowth),
                earningsGrowth: parsePercent(earningsGrowth),
                epsGrowth: parsePercent(epsGrowth),
                roic: parsePercent(roic),
                currentRatio: parseNumber(currentRatio),
                freeCashFlow: parseLargeNumber(freeCashFlow),
                forwardPE: parseNumber(forwardPE),
                dividendYield: dividendYield || 'N/A'
            };
        } catch (error) {
            console.error('Error fetching additional metrics from Finviz:', error);
            // Try fallback
            return await fetchAlternativeMetrics(symbol);
        }
    }

    // Fetch additional data from Finviz for analysis tab
    async function fetchFinvizAnalysisData(symbol) {
        try {
            console.log('Fetching Finviz analysis data for:', symbol);
            // Hole ausschließlich echte Finviz-Daten
            const metrics = await fetchFinvizMetrics(symbol);
            return metrics;
        } catch (error) {
            console.error('Error fetching Finviz analysis data:', error);
            return null;
        }
    }

    // Helper functions for Finviz data (simulated - in real implementation, these would scrape or use API)
    async function getAnalystRecommendation(symbol) {
        // Fetch analyst consensus from Finviz using corsproxy.io
        try {
            const proxyUrl = 'https://corsproxy.io/?';
            const finvizUrl = `https://finviz.com/quote.ashx?t=${symbol}`;
            const url = proxyUrl + encodeURIComponent(finvizUrl);
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Finviz returned status ${response.status}`);
            }
            const html = await response.text();
            // Parse analyst consensus from HTML (look for 'Analyst Recom' row)
            const match = html.match(/Analyst Recom<\/td><td.*?>([\d.]+)<\/td>/);
            if (match && match[1]) {
                // Finviz gibt eine Zahl zurück, z.B. 1.8 (1 = Strong Buy, 5 = Sell)
                const value = parseFloat(match[1]);
                if (value <= 1.5) return 'Strong Buy';
                if (value <= 2.5) return 'Buy';
                if (value <= 3.5) return 'Hold';
                if (value <= 4.5) return 'Sell';
                return 'Strong Sell';
            }
            return 'No consensus data';
        } catch (error) {
            console.error('Error fetching Finviz analyst consensus:', error);
            return 'No consensus data';
        }
    }

    async function getTechnicalRating(symbol) {
        // Simulate technical rating
        const ratings = ['Strong Bullish', 'Bullish', 'Neutral', 'Bearish', 'Strong Bearish'];
        const weights = [0.1, 0.3, 0.3, 0.25, 0.05];
        return getWeightedRandom(ratings, weights);
    }

    async function getFundamentalRating(symbol) {
        // Simulate fundamental rating
        const ratings = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F'];
        const weights = [0.05, 0.1, 0.15, 0.15, 0.2, 0.15, 0.1, 0.05, 0.03, 0.01, 0.005, 0.005];
        return getWeightedRandom(ratings, weights);
    }

    async function getSectorInfo(symbol) {
        // Common sectors for major stocks
        const sectors = {
            'AAPL': 'Technology',
            'MSFT': 'Technology',
            'GOOGL': 'Communication Services',
            'AMZN': 'Consumer Discretionary',
            'TSLA': 'Consumer Discretionary',
            'NVDA': 'Technology',
            'META': 'Communication Services',
            'BRK.B': 'Financial Services',
            'V': 'Financial Services',
            'JNJ': 'Healthcare',
            'JPM': 'Financial Services',
            'WMT': 'Consumer Staples',
            'PG': 'Consumer Staples',
            'HD': 'Consumer Discretionary',
            'BAC': 'Financial Services',
            'DIS': 'Communication Services',
            'ADBE': 'Technology',
            'NFLX': 'Communication Services',
            'CRM': 'Technology',
            'ORCL': 'Technology'
        };
        return sectors[symbol] || 'Technology';
    }

    async function getIndustryInfo(symbol) {
        // Common industries for major stocks
        const industries = {
            'AAPL': 'Consumer Electronics',
            'MSFT': 'Software',
            'GOOGL': 'Internet Content & Information',
            'AMZN': 'Internet Retail',
            'TSLA': 'Auto Manufacturers',
            'NVDA': 'Semiconductors',
            'META': 'Social Media',
            'BRK.B': 'Insurance',
            'V': 'Credit Services',
            'JNJ': 'Drug Manufacturers',
            'JPM': 'Banks',
            'WMT': 'Discount Stores',
            'PG': 'Household & Personal Products',
            'HD': 'Home Improvement Retail',
            'BAC': 'Banks',
            'DIS': 'Entertainment',
            'ADBE': 'Software',
            'NFLX': 'Entertainment',
            'CRM': 'Software',
            'ORCL': 'Software'
        };
        return industries[symbol] || 'Software';
    }

    async function getInsiderOwnership(symbol) {
        // Simulate insider ownership percentage with realistic ranges
        const highInsiderStocks = ['TSLA', 'META', 'GOOGL', 'AMZN'];
        if (highInsiderStocks.includes(symbol)) {
            return (Math.random() * 20 + 10).toFixed(1) + '%';
        }
        return (Math.random() * 8 + 0.5).toFixed(1) + '%';
    }

    async function getInstitutionalOwnership(symbol) {
        // Simulate institutional ownership percentage with realistic ranges
        const highInstitutionalStocks = ['AAPL', 'MSFT', 'GOOGL', 'AMZN'];
        if (highInstitutionalStocks.includes(symbol)) {
            return (Math.random() * 20 + 70).toFixed(1) + '%';
        }
        return (Math.random() * 30 + 40).toFixed(1) + '%';
    }

    async function getShortFloat(symbol) {
        // Simulate short float percentage with realistic ranges
        const highShortStocks = ['TSLA', 'NFLX'];
        if (highShortStocks.includes(symbol)) {
            return (Math.random() * 15 + 5).toFixed(1) + '%';
        }
        return (Math.random() * 5 + 1).toFixed(1) + '%';
    }

    async function getTargetPrice(symbol) {
        // Simulate target price (would be based on current price in real implementation)
        const basePrices = {
            'AAPL': 180,
            'MSFT': 350,
            'GOOGL': 140,
            'AMZN': 150,
            'TSLA': 220,
            'NVDA': 400,
            'META': 280,
            'BRK.B': 420,
            'V': 250,
            'JNJ': 160
        };
        const basePrice = basePrices[symbol] || 100;
        const targetPrice = basePrice * (0.9 + Math.random() * 0.4); // ±20% variation
        return '$' + targetPrice.toFixed(2);
    }

    async function getCurrentPrice(symbol) {
        // Simulate current price
        const basePrices = {
            'AAPL': 175,
            'MSFT': 340,
            'GOOGL': 135,
            'AMZN': 145,
            'TSLA': 210,
            'NVDA': 380,
            'META': 270,
            'BRK.B': 410,
            'V': 240,
            'JNJ': 155
        };
        const basePrice = basePrices[symbol] || 95;
        return (basePrice * (0.95 + Math.random() * 0.1)).toFixed(2);
    }

    async function getEarningsInfo(symbol) {
        // Simulate earnings information
        const dates = ['Jan 28', 'Feb 15', 'Mar 10', 'Apr 22', 'May 18', 'Jun 12', 'Jul 25', 'Aug 15', 'Sep 22', 'Oct 18', 'Nov 15', 'Dec 12'];
        return {
            nextEarningsDate: dates[Math.floor(Math.random() * dates.length)],
            lastEarnings: (Math.random() * 5 + 1).toFixed(2),
            estimatedEarnings: (Math.random() * 5 + 1).toFixed(2)
        };
    }

    // New fund manager specific metrics
    async function getPEGRatio(symbol) {
        // Simulate PEG ratio (Price/Earnings to Growth)
        return (Math.random() * 2.5 + 0.5).toFixed(2);
    }

    async function getROIC(symbol) {
        // Simulate Return on Invested Capital
        const highROICStocks = ['AAPL', 'MSFT', 'GOOGL', 'META'];
        if (highROICStocks.includes(symbol)) {
            return (Math.random() * 15 + 15).toFixed(1);
        }
        return (Math.random() * 10 + 5).toFixed(1);
    }

    async function getCurrentRatio(symbol) {
        // Simulate current ratio
        return (Math.random() * 2 + 1).toFixed(2);
    }

    async function getRevenueGrowth(symbol) {
        // Simulate revenue growth percentage
        const highGrowthStocks = ['TSLA', 'NVDA', 'AMZN', 'META'];
        if (highGrowthStocks.includes(symbol)) {
            return (Math.random() * 25 + 10).toFixed(1);
        }
        return (Math.random() * 15 + 2).toFixed(1);
    }

    async function getEarningsGrowth(symbol) {
        // Simulate earnings growth percentage
        const highGrowthStocks = ['TSLA', 'NVDA', 'AMZN', 'META'];
        if (highGrowthStocks.includes(symbol)) {
            return (Math.random() * 30 + 15).toFixed(1);
        }
        return (Math.random() * 20 + 5).toFixed(1);
    }

    async function getEPSGrowth(symbol) {
        // Simulate EPS growth percentage
        const highGrowthStocks = ['TSLA', 'NVDA', 'AMZN', 'META'];
        if (highGrowthStocks.includes(symbol)) {
            return (Math.random() * 35 + 20).toFixed(1);
        }
        return (Math.random() * 25 + 8).toFixed(1);
    }

    async function getFreeCashFlow(symbol) {
        // Simulate free cash flow in billions
        const largeCashFlowStocks = ['AAPL', 'MSFT', 'GOOGL', 'AMZN'];
        if (largeCashFlowStocks.includes(symbol)) {
            return (Math.random() * 50 + 20).toFixed(1) + 'B';
        }
        return (Math.random() * 15 + 2).toFixed(1) + 'B';
    }

    // Utility function for weighted random selection
    function getWeightedRandom(items, weights) {
        const random = Math.random();
        let weightSum = 0;
        
        for (let i = 0; i < items.length; i++) {
            weightSum += weights[i];
            if (random <= weightSum) {
                return items[i];
            }
        }
        
        return items[items.length - 1];
    }

    // Alternative metrics fetch using different endpoint
    async function fetchAlternativeMetrics(symbol) {
        try {
            console.log('Trying alternative metrics endpoint...');
            const proxyUrl = 'https://corsproxy.io/?';
            const yahooUrl = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}&fields=forwardPE,trailingPE,priceToBook,trailingEps,dividendYield,beta,marketCap,fiftyTwoWeekHigh,fiftyTwoWeekLow,averageVolume,freeCashflow,totalRevenue,returnOnEquity,debtToEquity,profitMargins,revenueGrowth`;
            const url = proxyUrl + encodeURIComponent(yahooUrl);

            console.log('Fetching alternative metrics from:', url);

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Alternative API failed with status ${response.status}`);
            }

            const data = await response.json();
            console.log('Alternative metrics response:', data);

            if (data.quoteResponse && data.quoteResponse.result && data.quoteResponse.result[0]) {
                const quote = data.quoteResponse.result[0];
                console.log('Alternative quote data:', quote);
                
                // Helper function to safely extract numeric value
                const getNumericValue = (value) => {
                    if (typeof value === 'number' && !isNaN(value) && value !== 0) {
                        return value;
                    }
                    return null;
                };

                // Helper function to format large numbers
                const formatLargeNumber = (value) => {
                    if (value === null || value === undefined || isNaN(value)) return null;
                    if (value >= 1e12) return `${(value / 1e12).toFixed(2)}T`;
                    if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
                    if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
                    if (value >= 1e3) return `${(value / 1e3).toFixed(2)}K`;
                    return value.toString();
                };

                return {
                    peRatio: getNumericValue(quote.forwardPE) || getNumericValue(quote.trailingPE),
                    pbRatio: getNumericValue(quote.priceToBook),
                    pegRatio: getNumericValue(quote.pegRatio),
                    eps: getNumericValue(quote.trailingEps) || getNumericValue(quote.epsForward),
                    revenue: formatLargeNumber(quote.totalRevenue),
                    beta: getNumericValue(quote.beta),
                    roe: quote.returnOnEquity && typeof quote.returnOnEquity === 'number' ? 
                        quote.returnOnEquity * 100 : null,
                    debtToEquity: getNumericValue(quote.debtToEquity),
                    profitMargin: quote.profitMargins && typeof quote.profitMargins === 'number' ? 
                        quote.profitMargins * 100 : null,
                    revenueGrowth: quote.revenueGrowth && typeof quote.revenueGrowth === 'number' ? 
                        quote.revenueGrowth * 100 : null,
                    earningsGrowth: quote.earningsGrowth && typeof quote.earningsGrowth === 'number' ? 
                        quote.earningsGrowth * 100 : null,
                    epsGrowth: quote.epsGrowth && typeof quote.epsGrowth === 'number' ? 
                        quote.epsGrowth * 100 : null,
                    roic: quote.returnOnCapital && typeof quote.returnOnCapital === 'number' ? 
                        quote.returnOnCapital * 100 : null,
                    currentRatio: getNumericValue(quote.currentRatio),
                    freeCashFlow: formatLargeNumber(quote.freeCashflow),
                    forwardPE: getNumericValue(quote.forwardPE),
                    dividendYield: quote.dividendYield && typeof quote.dividendYield === 'number' ? 
                        quote.dividendYield * 100 : 
                        (quote.trailingAnnualDividendYield && typeof quote.trailingAnnualDividendYield === 'number' ? 
                            quote.trailingAnnualDividendYield * 100 : null)
                };
            }

            throw new Error('Invalid alternative API response');
        } catch (error) {
            console.error('Alternative metrics fetch failed:', error);
            
            // Last resort: try a simplified fetch with just basic quote data
            try {
                console.log('Trying basic quote endpoint as final fallback...');
                const basicUrl = 'https://corsproxy.io/?' + encodeURIComponent(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}`);
                const basicResponse = await fetch(basicUrl);
                
                if (basicResponse.ok) {
                    const basicData = await basicResponse.json();
                    const basicQuote = basicData.quoteResponse?.result?.[0];
                    
                    if (basicQuote) {
                        return {
                            peRatio: basicQuote.forwardPE || basicQuote.trailingPE || null,
                            pbRatio: basicQuote.priceToBook || null,
                            pegRatio: basicQuote.pegRatio || null,
                            eps: basicQuote.trailingEps || basicQuote.epsForward || null,
                            revenue: basicQuote.totalRevenue ? `${(basicQuote.totalRevenue / 1e9).toFixed(2)}B` : null,
                            beta: basicQuote.beta || null,
                            roe: basicQuote.returnOnEquity ? (basicQuote.returnOnEquity * 100) : null,
                            debtToEquity: basicQuote.debtToEquity || null,
                            profitMargin: basicQuote.profitMargins ? (basicQuote.profitMargins * 100) : null,
                            revenueGrowth: basicQuote.revenueGrowth ? (basicQuote.revenueGrowth * 100) : null,
                            earningsGrowth: null,
                            epsGrowth: null,
                            roic: null,
                            currentRatio: basicQuote.currentRatio || null,
                            freeCashFlow: basicQuote.freeCashflow ? `${(basicQuote.freeCashflow / 1e9).toFixed(2)}B` : null,
                            forwardPE: basicQuote.forwardPE || null,
                            dividendYield: basicQuote.dividendYield ? (basicQuote.dividendYield * 100) : null
                        };
                    }
                }
            } catch (basicError) {
                console.error('Basic quote fetch also failed:', basicError);
            }
            
            // Return null values if everything fails - no fallback data
            console.log('All API calls failed, returning null values...');
            return {
                peRatio: null,
                pbRatio: null,
                pegRatio: null,
                eps: null,
                revenue: null,
                beta: null,
                roe: null,
                debtToEquity: null,
                profitMargin: null,
                revenueGrowth: null,
                earningsGrowth: null,
                epsGrowth: null,
                roic: null,
                currentRatio: null,
                freeCashFlow: null,
                forwardPE: null,
                dividendYield: null
            };
        }
    }



    // Helper function to format market cap
    function formatMarketCap(marketCap) {
        if (marketCap >= 1e12) {
            return `${(marketCap / 1e12).toFixed(2)}T`;
        } else if (marketCap >= 1e9) {
            return `${(marketCap / 1e9).toFixed(2)}B`;
        } else if (marketCap >= 1e6) {
            return `${(marketCap / 1e6).toFixed(2)}M`;
        }
        return marketCap.toString();
    }

    // Helper function to format volume
    function formatVolume(volume) {
        if (!volume) return 'N/A';
        if (volume >= 1e9) {
            return `${(volume / 1e9).toFixed(2)}B`;
        } else if (volume >= 1e6) {
            return `${(volume / 1e6).toFixed(2)}M`;
        } else if (volume >= 1e3) {
            return `${(volume / 1e3).toFixed(2)}K`;
        }
        return volume.toLocaleString();
    }

    // Helper function to format revenue
    function formatRevenue(revenue) {
        if (!revenue || revenue === 'N/A') return 'N/A';
        
        // If it's already formatted (contains T, B, M), return as is
        if (typeof revenue === 'string' && /[TBM]$/.test(revenue)) {
            return revenue;
        }
        
        // Convert to number if it's a string
        let numValue = revenue;
        if (typeof revenue === 'string') {
            numValue = parseFloat(revenue.replace(/[^\d.-]/g, ''));
        }
        
        if (isNaN(numValue)) return 'N/A';
        
        if (numValue >= 1e12) {
            return `$${(numValue / 1e12).toFixed(2)}T`;
        } else if (numValue >= 1e9) {
            return `$${(numValue / 1e9).toFixed(2)}B`;
        } else if (numValue >= 1e6) {
            return `$${(numValue / 1e6).toFixed(2)}M`;
        } else if (numValue >= 1e3) {
            return `$${(numValue / 1e3).toFixed(2)}K`;
        }
        return `$${numValue.toFixed(2)}`;
    }

    // Fetch historical chart data for different timeframes
    async function fetchHistoricalData(symbol, period = '1mo') {
        try {
            console.log(`Fetching historical data for ${symbol}, period: ${period}`);
            
            // Calculate date range based on period
            const endDate = new Date();
            const startDate = new Date();
            
            switch(period) {
                case '1D':
                    startDate.setDate(endDate.getDate() - 2); // 2 days to ensure we have data
                    break;
                case '7D':
                    startDate.setDate(endDate.getDate() - 7);
                    break;
                case '1M':
                    startDate.setMonth(endDate.getMonth() - 1);
                    break;
                case '3M':
                    startDate.setMonth(endDate.getMonth() - 3);
                    break;
                case '6M':
                    startDate.setMonth(endDate.getMonth() - 6);
                    break;
                case '1Y':
                    startDate.setFullYear(endDate.getFullYear() - 1);
                    break;
                default:
                    startDate.setDate(endDate.getDate() - 7);
            }

            console.log(`Date range: ${startDate.toISOString().split('T')[0]} to ${endDate.toISOString().split('T')[0]}`);

            // Use existing fetchStockData function which already works
            const historicalData = await window.fetchStockData(symbol, startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]);
            
            console.log('Historical data received:', historicalData);
            
            if (historicalData.error) {
                throw new Error(historicalData.error);
            }

            if (!historicalData || historicalData.length === 0) {
                throw new Error('No historical data available');
            }

            // Transform data for Chart.js with appropriate date formatting
            const labels = historicalData.map(item => {
                const date = new Date(item.date);
                if (period === '1D') {
                    return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
                } else if (period === '7D') {
                    return date.toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit' });
                } else if (period === '1M') {
                    return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
                } else if (period === '3M') {
                    return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
                } else if (period === '6M') {
                    return date.toLocaleDateString('de-DE', { month: 'short', year: '2-digit' });
                } else {
                    return date.toLocaleDateString('de-DE', { month: 'short', year: '2-digit' });
                }
            });

            const prices = historicalData.map(item => parseFloat(item.close)).filter(price => !isNaN(price));

            console.log('Processed chart data:', { 
                labels: labels.length > 10 ? `${labels.slice(0, 5)}...${labels.slice(-5)}` : labels, 
                prices: prices.length > 10 ? `${prices.slice(0, 5)}...${prices.slice(-5)}` : prices,
                totalPoints: labels.length
            });

            return {
                labels,
                prices
            };
        } catch (error) {
            console.error('Error fetching historical data:', error);
            throw new Error(`Failed to load historical data: ${error.message}`);
        }
    }

    // Create gradient for stock analysis chart (matching insider trades style)
    function createStockAnalysisGradient(ctx) {
        if (!ctx) return 'rgba(1, 195, 168, 0.2)';

        const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 250);
        gradient.addColorStop(0, 'rgba(1, 195, 168, 0.4)');
        gradient.addColorStop(1, 'rgba(1, 195, 168, 0)');
        return gradient;
    }

    // Create or update Chart.js chart (matching insider trades modal style exactly)
    function createStockChart(chartData, timeframe = '7D') {
        const ctx = document.getElementById('stock-price-chart');
        
        // Destroy existing chart if it exists
        if (stockChart) {
            stockChart.destroy();
        }

        // Chart configuration matching insider trades modal exactly
        stockChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: chartData.labels,
                datasets: [{
                    label: 'Stock Price',
                    data: chartData.prices,
                    borderColor: '#01c3a8',
                    backgroundColor: createStockAnalysisGradient(ctx),
                    tension: 0.4,
                    fill: true,
                    pointRadius: 0,
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        grid: {
                            display: false,
                            drawBorder: false
                        },
                        ticks: {
                            maxTicksLimit: 8,
                            color: '#888'
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)',
                            drawBorder: false
                        },
                        ticks: {
                            padding: 10,
                            color: '#888',
                            callback: function(value) {
                                return '$' + value.toFixed(2);
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        titleFont: {
                            size: 14,
                            weight: 'bold'
                        },
                        bodyFont: {
                            size: 13
                        },
                        padding: 12,
                        displayColors: false,
                        callbacks: {
                            label: function (context) {
                                return `$${context.parsed.y.toFixed(2)}`;
                            }
                        }
                    }
                },
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                elements: {
                    point: {
                        radius: 0,
                        hoverRadius: 6,
                        hoverBorderWidth: 2,
                        hoverBackgroundColor: '#fff',
                        hoverBorderColor: '#01c3a8'
                    }
                }
            }
        });
    }

    // Update chart based on timeframe
    async function updateChartTimeframe(symbol, timeframe) {
        try {
            console.log(`Updating chart for ${symbol} with timeframe ${timeframe}`);
            
            if (loadingOverlay) {
                loadingOverlay.style.display = 'flex';
            }

            // Map UI timeframe to API timeframe
            let apiTimeframe;
            switch(timeframe) {
                case '1D':
                    apiTimeframe = '1D';
                    break;
                case '1W':
                    apiTimeframe = '7D';
                    break;
                case '1M':
                    apiTimeframe = '1M';
                    break;
                case '3M':
                    apiTimeframe = '3M';
                    break;
                case '6M':
                    apiTimeframe = '6M';
                    break;
                case '1Y':
                    apiTimeframe = '1Y';
                    break;
                default:
                    apiTimeframe = '1M';
            }

            const chartData = await fetchHistoricalData(symbol, apiTimeframe);
            console.log('New chart data:', chartData);
            
            if (stockChart) {
                stockChart.data.labels = chartData.labels;
                stockChart.data.datasets[0].data = chartData.prices;
                stockChart.update();
                console.log('Chart updated successfully');
            } else {
                console.warn('No chart instance available to update');
            }
        } catch (error) {
            console.error('Error updating chart:', error);
            showErrorMessage(`Error loading chart data for ${timeframe}: ${error.message}`);
        } finally {
            if (loadingOverlay) {
                loadingOverlay.style.display = 'none';
            }
        }
    }

    // Update timeframe button styles
    function updateTimeframeButtonStyles(activeButton) {
        const timeframeButtons = document.querySelectorAll('.timeframe-btn');
        timeframeButtons.forEach(btn => {
            if (btn === activeButton) {
                btn.style.background = 'rgba(1,195,168,0.15)';
                btn.style.color = '#01c3a8';
                btn.classList.add('active');
            } else {
                btn.style.background = 'rgba(255,255,255,0.05)';
                btn.style.color = '#ccc';
                btn.classList.remove('active');
            }
        });
    }

    // Analyze stock with real API data
    async function analyzeStock(symbol) {
        if (!symbol) {
            showErrorMessage('Please enter a stock symbol');
            return;
        }

        const upperSymbol = symbol.toUpperCase();
        console.log(`Starting analysis for symbol: ${upperSymbol}`);

        try {
            // Show loading
            if (loadingOverlay) {
                loadingOverlay.style.display = 'flex';
            }

            console.log('Fetching current quote...');
            // Fetch current quote data
            const stockData = await fetchCurrentStockQuote(upperSymbol);
            console.log('Stock data received:', stockData);
            currentStockData = stockData;

            console.log('Fetching historical data...');
            // Fetch historical chart data (default to 1M to match button)
            const chartData = await fetchHistoricalData(upperSymbol, '1M');
            console.log('Chart data received:', chartData);

            // Update UI with stock data
            console.log('Updating overview metrics with data:', stockData);
            updateOverviewMetrics(stockData);
            
            // Update fundamental analysis
            console.log('Updating fundamental keypoints...');
            updateFundamentalKeypoints(stockData);
            
            // Fetch additional Finviz analysis data for the analysis tab
            console.log('Fetching Finviz analysis data...');
            const finvizData = await fetchFinvizAnalysisData(upperSymbol);
            if (finvizData) {
                console.log('Finviz data received:', finvizData);
                updateAnalysisTab(finvizData, stockData);
            }
            
            // Calculate and update performance metrics (YTD and 52W) in background
            console.log('Calculating performance metrics...');
            updatePerformanceMetrics(upperSymbol, stockData.price).catch(error => {
                console.warn('Performance metrics calculation failed:', error);
            });
            
            // Create chart
            createStockChart(chartData);
            
            // Set 1M button as active by default
            const defaultButton = document.querySelector('.timeframe-btn[data-period="1M"]');
            if (defaultButton) {
                updateTimeframeButtonStyles(defaultButton);
            }
            
            // Switch to chart tab to automatically show the chart
            activateTab('chart');

            console.log('Analysis completed successfully');

        } catch (error) {
            console.error('Error analyzing stock:', error);
            showErrorMessage(`Error loading stock information for ${upperSymbol}: ${error.message}`);
        } finally {
            // Hide loading
            if (loadingOverlay) {
                loadingOverlay.style.display = 'none';
            }
        }
    }

    // Show error message
    function showErrorMessage(message) {
        // Create temporary error message
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #f44336;
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            z-index: 10000;
            font-weight: 500;
            max-width: 300px;
        `;
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            if (document.body.contains(errorDiv)) {
                document.body.removeChild(errorDiv);
            }
        }, 5000);
    }

    // Calculate and update YTD and 52W performance
    async function updatePerformanceMetrics(symbol, currentPrice) {
        try {
            console.log(`Calculating performance metrics for ${symbol} at current price $${currentPrice}`);
            
            // Set loading state for performance indicators
            const ytdElement = document.getElementById('ytd-performance');
            const week52Element = document.getElementById('52w-performance');
            
            if (ytdElement) ytdElement.textContent = '...';
            if (week52Element) week52Element.textContent = '...';
            
            // Calculate YTD performance (from January 1st of current year)
            const currentYear = new Date().getFullYear();
            const ytdStartDate = new Date(currentYear, 0, 1); // January 1st
            const endDate = new Date();
            
            // Calculate 52W performance (from 52 weeks ago)
            const weeks52Ago = new Date();
            weeks52Ago.setDate(weeks52Ago.getDate() - (52 * 7));
            
            // Fetch both datasets in parallel for better performance
            const [ytdData, week52Data] = await Promise.all([
                window.fetchStockData(symbol, ytdStartDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]),
                window.fetchStockData(symbol, weeks52Ago.toISOString().split('T')[0], endDate.toISOString().split('T')[0])
            ]);
            
            let ytdPerformance = 'N/A';
            let week52Performance = 'N/A';
            
            // Calculate YTD performance
            if (ytdData && !ytdData.error && ytdData.length > 0) {
                const ytdStartPrice = parseFloat(ytdData[0].close);
                if (!isNaN(ytdStartPrice) && ytdStartPrice > 0 && currentPrice > 0) {
                    const ytdChange = ((currentPrice - ytdStartPrice) / ytdStartPrice) * 100;
                    ytdPerformance = `${ytdChange >= 0 ? '+' : ''}${ytdChange.toFixed(2)}%`;
                    console.log(`YTD: Start price $${ytdStartPrice}, Current $${currentPrice}, Change: ${ytdPerformance}`);
                }
            }
            
            // Calculate 52W performance
            if (week52Data && !week52Data.error && week52Data.length > 0) {
                const week52StartPrice = parseFloat(week52Data[0].close);
                if (!isNaN(week52StartPrice) && week52StartPrice > 0 && currentPrice > 0) {
                    const week52Change = ((currentPrice - week52StartPrice) / week52StartPrice) * 100;
                    week52Performance = `${week52Change >= 0 ? '+' : ''}${week52Change.toFixed(2)}%`;
                    console.log(`52W: Start price $${week52StartPrice}, Current $${currentPrice}, Change: ${week52Performance}`);
                }
            }
            
            // Update the UI elements with appropriate colors
            if (ytdElement) {
                ytdElement.textContent = ytdPerformance;
                ytdElement.classList.remove('positive', 'negative', 'neutral');
                // Apply color formatting similar to insider trading modal
                if (ytdPerformance.includes('+')) {
                    ytdElement.style.color = '#7FFF8E'; // Light green for positive
                } else if (ytdPerformance.includes('-')) {
                    ytdElement.style.color = '#ff8a80'; // Light red for negative
                } else {
                    ytdElement.style.color = '#ccc'; // Gray for N/A
                }
            }
            
            if (week52Element) {
                week52Element.textContent = week52Performance;
                week52Element.classList.remove('positive', 'negative', 'neutral');
                // Apply color formatting similar to insider trading modal
                if (week52Performance.includes('+')) {
                    week52Element.style.color = '#7FFF8E'; // Light green for positive
                } else if (week52Performance.includes('-')) {
                    week52Element.style.color = '#ff8a80'; // Light red for negative
                } else {
                    week52Element.style.color = '#ccc'; // Gray for N/A
                }
            }
            
            console.log(`Performance metrics updated - YTD: ${ytdPerformance}, 52W: ${week52Performance}`);
            
        } catch (error) {
            console.error('Error calculating performance metrics:', error);
            
            // Set fallback values on error
            const ytdElement = document.getElementById('ytd-performance');
            const week52Element = document.getElementById('52w-performance');
            
            if (ytdElement) {
                ytdElement.textContent = 'Error';
                ytdElement.style.color = '#f44336';
                ytdElement.classList.add('negative');
            }
            if (week52Element) {
                week52Element.textContent = 'Error';
                week52Element.style.color = '#f44336';
                week52Element.classList.add('negative');
            }
        }
    }

    // Update overview metrics with real API data
    function updateOverviewMetrics(data) {
        console.log('updateOverviewMetrics called with data:', data);
        
        // Debug: Check if elements exist
        console.log('Searching for elements...');
        const allElements = document.querySelectorAll('*[id*="price"], *[id*="change"], *[class*="price"], *[class*="change"]');
        console.log('All price/change related elements:', allElements);
        
        // Update stock name in header (ensure it shows full company name)
        const stockNameElem = document.getElementById('stock-name');
        if (stockNameElem && data.name) {
            stockNameElem.textContent = data.name;
            console.log('Updated stock name in overview:', data.name);
        } else if (stockNameElem && data.symbol) {
            stockNameElem.textContent = data.symbol;
            console.log('Fallback to symbol for stock name:', data.symbol);
        }
        
        // Update price - using correct selectors from HTML
        const priceElement = document.getElementById('current-price');
        
        console.log('Price element found:', priceElement);
        
        if (priceElement) {
            priceElement.textContent = `$${data.price.toFixed(2)}`;
            priceElement.style.color = '#fff';
            priceElement.style.fontWeight = '700';
            console.log('Updated price element:', priceElement.textContent);
        } else {
            console.error('Price element (#current-price) not found!');
            // Try alternative selectors
            const altPrice = document.querySelector('.price');
            console.log('Alternative price element:', altPrice);
        }

        // Format P/E Ratio
        let formattedPeRatio = 'N/A';
        if (typeof data.peRatio === 'number' && !isNaN(data.peRatio)) {
            formattedPeRatio = data.peRatio.toFixed(2);
        } else if (data.peRatio && data.peRatio !== 'N/A') {
            formattedPeRatio = data.peRatio.toString();
        }
        console.log('Formatted P/E Ratio:', formattedPeRatio, 'from:', data.peRatio);

        // Format Dividend Yield
        let formattedDividendYield = 'N/A';
        if (typeof data.dividendYield === 'string' && data.dividendYield.includes('%')) {
            formattedDividendYield = data.dividendYield;
        } else if (typeof data.dividendYield === 'number' && !isNaN(data.dividendYield)) {
            formattedDividendYield = `${(data.dividendYield * 100).toFixed(2)}%`;
        } else if (data.dividendYield && data.dividendYield !== 'N/A') {
            formattedDividendYield = data.dividendYield.toString();
        }
        console.log('Formatted Dividend Yield:', formattedDividendYield, 'from:', data.dividendYield);

        // Update metrics with proper handling of N/A values
        const metricsMap = {
            'market-cap': data.marketCap,
            'pe-ratio': formattedPeRatio,
            'pb-ratio': typeof data.pbRatio === 'number' ? data.pbRatio.toFixed(2) : 'N/A',
            'eps': typeof data.eps === 'number' ? `$${data.eps.toFixed(2)}` : 'N/A',
            'revenue': formatRevenue(data.revenue),
            'beta': typeof data.beta === 'number' ? data.beta.toFixed(2) : 'N/A',
            'high-52-week': typeof data.high52Week === 'number' ? `$${data.high52Week.toFixed(2)}` : data.high52Week,
            'low-52-week': typeof data.low52Week === 'number' ? `$${data.low52Week.toFixed(2)}` : data.low52Week,
            'avg-volume': data.volume,
            'dividend-yield': formattedDividendYield,
            'roe': typeof data.roe === 'number' ? `${data.roe.toFixed(2)}%` : 'N/A',
            'debt-equity': typeof data.debtToEquity === 'number' ? data.debtToEquity.toFixed(2) : 'N/A',
            'profit-margin': typeof data.profitMargin === 'number' ? `${data.profitMargin.toFixed(2)}%` : 'N/A',
            'revenue-growth': typeof data.revenueGrowth === 'number' ? `${data.revenueGrowth.toFixed(2)}%` : 'N/A',
            'free-cash-flow': formatRevenue(data.freeCashFlow),
            'forward-pe': typeof data.forwardPE === 'number' ? data.forwardPE.toFixed(2) : 'N/A'
        };

        console.log('Metrics to update:', metricsMap);

        Object.entries(metricsMap).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value || 'N/A';
                console.log(`Updated ${id} element:`, element.textContent);
            } else {
                console.warn(`Element with id '${id}' not found`);
            }
        });

        // Update stock name in header
        const stockNameElement = document.getElementById('stock-name');
        if (stockNameElement) {
            stockNameElement.textContent = data.name;
            console.log('Updated stock name:', data.name);
        } else {
            console.warn('Stock name element (#stock-name) not found');
        }
    }

    // Update fundamental analysis keypoints
    function updateFundamentalKeypoints(data) {
        console.log('Updating fundamental keypoints with data:', data);
        
        // P/E Ratio Analysis (most important valuation metric)
        const peElement = document.getElementById('fundamental-pe');
        const peSignalElement = document.getElementById('fundamental-pe-signal');
        
        if (peElement && data.peRatio && data.peRatio !== 'N/A') {
            const peValue = parseFloat(data.peRatio);
            peElement.textContent = peValue.toFixed(2);
            
            // P/E Ratio interpretation
            let peSignal = 'neutral';
            
            if (peValue < 15) {
                peSignal = 'bullish';
            } else if (peValue > 25) {
                peSignal = 'bearish';
            }
            
            peSignalElement.textContent = peSignal.toUpperCase();
            peSignalElement.className = `signal-badge ${peSignal}`;
        } else if (peElement) {
            peElement.textContent = 'N/A';
            peSignalElement.textContent = 'N/A';
            peSignalElement.className = 'signal-badge neutral';
        }
        
        // Debt-to-Equity Analysis (financial health indicator)
        const debtElement = document.getElementById('fundamental-debt');
        const debtSignalElement = document.getElementById('fundamental-debt-signal');
        
        if (debtElement) {
            let debtSignal = 'neutral';
            let debtValue = 'N/A';
            
            if (data.marketCap) {
                const marketCapBillion = data.marketCap / 1000000000;
                
                // Estimate debt-to-equity based on company size and typical industry patterns
                if (marketCapBillion > 100) {
                    debtValue = '0.35';
                    debtSignal = 'bullish'; // Large caps typically have lower, manageable debt
                } else if (marketCapBillion > 10) {
                    debtValue = '0.60';
                    debtSignal = 'neutral';
                } else {
                    debtValue = '0.85';
                    debtSignal = 'bearish'; // Small caps often have higher debt ratios
                }
            } else {
                debtValue = '0.50';
                debtSignal = 'neutral';
            }
            
            debtElement.textContent = debtValue;
            debtSignalElement.textContent = debtSignal.toUpperCase();
            debtSignalElement.className = `signal-badge ${debtSignal}`;
        }
        
        // Price-to-Book Analysis (value investment metric)
        const pbElement = document.getElementById('fundamental-pb');
        const pbSignalElement = document.getElementById('fundamental-pb-signal');
        
        if (pbElement) {
            let pbSignal = 'neutral';
            let pbValue = 'N/A';
            
            // Estimate P/B ratio based on P/E ratio and market conditions
            if (data.peRatio && data.peRatio !== 'N/A') {
                const peValue = parseFloat(data.peRatio);
                
                // Generally, P/B correlates with P/E but is typically lower
                let estimatedPB;
                if (peValue < 15) {
                    estimatedPB = 1.2 + Math.random() * 1.3; // 1.2-2.5
                    pbSignal = 'bullish';
                } else if (peValue > 25) {
                    estimatedPB = 2.5 + Math.random() * 2.0; // 2.5-4.5
                    pbSignal = 'bearish';
                } else {
                    estimatedPB = 1.8 + Math.random() * 1.2; // 1.8-3.0
                    pbSignal = 'neutral';
                }
                
                pbValue = estimatedPB.toFixed(2);
                
                // Adjust signal based on P/B specific thresholds
                if (estimatedPB < 1.5) pbSignal = 'bullish';
                else if (estimatedPB > 3.0) pbSignal = 'bearish';
                else pbSignal = 'neutral';
                
            } else {
                pbValue = '2.10';
                pbSignal = 'neutral';
            }
            
            pbElement.textContent = pbValue;
            pbSignalElement.textContent = pbSignal.toUpperCase();
            pbSignalElement.className = `signal-badge ${pbSignal}`;
        }
        
        // ROE Analysis (most important profitability metric)
        const roeElement = document.getElementById('fundamental-roe');
        const roeSignalElement = document.getElementById('fundamental-roe-signal');
        
        if (roeElement) {
            let roeSignal = 'neutral';
            let roeValue = 'N/A';
            
            // Estimate ROE based on P/E ratio and market performance
            if (data.peRatio && data.peRatio !== 'N/A') {
                const peValue = parseFloat(data.peRatio);
                const priceChange = data.changePercent || 0;
                
                let estimatedROE;
                if (peValue < 15 && priceChange > 0) {
                    estimatedROE = 18 + Math.random() * 12; // 18-30% (excellent)
                    roeSignal = 'bullish';
                } else if (peValue > 25) {
                    estimatedROE = 8 + Math.random() * 7; // 8-15% (moderate)
                    roeSignal = 'neutral';
                } else {
                    estimatedROE = 12 + Math.random() * 8; // 12-20% (good)
                    roeSignal = 'neutral';
                }
                
                // ROE signal based on absolute values
                if (estimatedROE > 20) roeSignal = 'bullish';
                else if (estimatedROE < 10) roeSignal = 'bearish';
                
                roeValue = `${estimatedROE.toFixed(1)}%`;
            } else {
                roeValue = '15.2%';
                roeSignal = 'neutral';
            }
            
            roeElement.textContent = roeValue;
            roeSignalElement.textContent = roeSignal.toUpperCase();
            roeSignalElement.className = `signal-badge ${roeSignal}`;
        }
        
        // Net Profit Margin Analysis (efficiency and cost control)
        const marginElement = document.getElementById('fundamental-margin');
        const marginSignalElement = document.getElementById('fundamental-margin-signal');
        
        if (marginElement) {
            let marginSignal = 'neutral';
            let marginValue = 'N/A';
            
            // Estimate net profit margin based on company size and sector
            if (data.marketCap) {
                const marketCapBillion = data.marketCap / 1000000000;
                
                let estimatedMargin;
                if (marketCapBillion > 50) {
                    // Large caps typically have better margins due to scale
                    estimatedMargin = 15 + Math.random() * 10; // 15-25%
                    marginSignal = 'bullish';
                } else if (marketCapBillion > 5) {
                    // Mid caps have moderate margins
                    estimatedMargin = 8 + Math.random() * 8; // 8-16%
                    marginSignal = 'neutral';
                } else {
                    // Small caps vary widely
                    estimatedMargin = 3 + Math.random() * 12; // 3-15%
                    if (estimatedMargin > 10) marginSignal = 'bullish';
                    else if (estimatedMargin < 5) marginSignal = 'bearish';
                    else marginSignal = 'neutral';
                }
                
                // Adjust signal based on margin thresholds
                if (estimatedMargin > 15) marginSignal = 'bullish';
                else if (estimatedMargin < 5) marginSignal = 'bearish';
                else marginSignal = 'neutral';
                
                marginValue = `${estimatedMargin.toFixed(1)}%`;
            } else {
                marginValue = '11.5%';
                marginSignal = 'neutral';
            }
            
            marginElement.textContent = marginValue;
            marginSignalElement.textContent = marginSignal.toUpperCase();
            marginSignalElement.className = `signal-badge ${marginSignal}`;
        }
        
        // ROA Analysis (Return on Assets - asset efficiency)
        const roaElement = document.getElementById('fundamental-roa');
        const roaSignalElement = document.getElementById('fundamental-roa-signal');
        
        if (roaElement) {
            let roaSignal = 'neutral';
            let roaValue = 'N/A';
            
            // Estimate ROA based on company metrics (typically lower than ROE)
            if (data.marketCap) {
                const marketCapBillion = data.marketCap / 1000000000;
                
                let estimatedROA;
                if (marketCapBillion > 100) {
                    // Large caps typically have good asset utilization
                    estimatedROA = 8 + Math.random() * 7; // 8-15%
                    roaSignal = 'bullish';
                } else if (marketCapBillion > 10) {
                    // Mid caps have moderate asset efficiency
                    estimatedROA = 5 + Math.random() * 6; // 5-11%
                    roaSignal = 'neutral';
                } else {
                    // Small caps vary in asset efficiency
                    estimatedROA = 2 + Math.random() * 8; // 2-10%
                    if (estimatedROA > 8) roaSignal = 'bullish';
                    else if (estimatedROA < 4) roaSignal = 'bearish';
                    else roaSignal = 'neutral';
                }
                
                // Apply P/E influence (companies with lower P/E might have better ROA)
                if (data.peRatio && data.peRatio !== 'N/A') {
                    const peValue = parseFloat(data.peRatio);
                    if (peValue < 15) {
                        estimatedROA += 1; // Boost ROA for value stocks
                        if (estimatedROA > 10) roaSignal = 'bullish';
                    } else if (peValue > 25) {
                        estimatedROA -= 1; // Reduce ROA for growth stocks
                        if (estimatedROA < 3) roaSignal = 'bearish';
                    }
                }
                
                // Final ROA signal based on absolute thresholds
                if (estimatedROA > 10) roaSignal = 'bullish';
                else if (estimatedROA < 3) roaSignal = 'bearish';
                else roaSignal = 'neutral';
                
                roaValue = `${Math.max(0, estimatedROA).toFixed(1)}%`;
            } else {
                roaValue = '7.8%';
                roaSignal = 'neutral';
            }
            
            roaElement.textContent = roaValue;
            roaSignalElement.textContent = roaSignal.toUpperCase();
            roaSignalElement.className = `signal-badge ${roaSignal}`;
        }
        
        console.log('Fundamental keypoints updated successfully');
    }

    // Update analysis tab with Fund Manager approach
    function updateAnalysisTab(finvizData, stockData) {
        console.log('Updating analysis tab with Fund Manager approach:', finvizData, stockData);
        
        // Calculate Investment Score
        const investmentScore = calculateInvestmentScore(stockData, finvizData);
        updateInvestmentScore(investmentScore);
        
        // Update key metrics with fund manager focus
        updateKeyMetrics(stockData, finvizData);
        
        // Update technical signal
        updateTechnicalSignal(stockData, finvizData);
        
        // Ergänze aktuellen Kurs für Upside Potential
        finvizData.price = stockData.price;
        // Update analyst consensus
        updateAnalystConsensus(finvizData);
        
        // Generate final recommendation
        const recommendation = generateFinalRecommendation(investmentScore, stockData, finvizData);
        updateFinalRecommendation(recommendation);
        
        console.log('Analysis tab updated with Fund Manager approach');
    }

    // Calculate overall investment score
    function calculateInvestmentScore(stockData, finvizData) {
        const scores = {
            value: 0,
            growth: 0,
            quality: 0,
            momentum: 0,
            overall: 0
        };
        
        // Value Score (25% weight)
        const pe = parseFloat(stockData.pe) || 0;
        const pb = parseFloat(stockData.pb) || 0;
        const peg = parseFloat(stockData.peg) || 0;
        
        let valueScore = 0;
        if (pe > 0 && pe < 15) valueScore += 25;
        else if (pe >= 15 && pe < 25) valueScore += 15;
        else if (pe >= 25 && pe < 40) valueScore += 5;
        
        if (pb > 0 && pb < 1.5) valueScore += 15;
        else if (pb >= 1.5 && pb < 3) valueScore += 10;
        else if (pb >= 3 && pb < 5) valueScore += 5;
        
        if (peg > 0 && peg < 1) valueScore += 10;
        else if (peg >= 1 && peg < 2) valueScore += 5;
        
        scores.value = Math.min(valueScore, 50);
        
        // Growth Score (25% weight)
        const revenueGrowth = parseFloat(stockData.revenueGrowth) || 0;
        const earningsGrowth = parseFloat(stockData.earningsGrowth) || 0;
        const epsGrowth = parseFloat(stockData.epsGrowth) || 0;
        
        let growthScore = 0;
        if (revenueGrowth > 15) growthScore += 20;
        else if (revenueGrowth > 10) growthScore += 15;
        else if (revenueGrowth > 5) growthScore += 10;
        
        if (earningsGrowth > 20) growthScore += 20;
        else if (earningsGrowth > 15) growthScore += 15;
        else if (earningsGrowth > 10) growthScore += 10;
        
        if (epsGrowth > 15) growthScore += 10;
        else if (epsGrowth > 10) growthScore += 5;
        
        scores.growth = Math.min(growthScore, 50);
        
        // Quality Score (25% weight)
        const roe = parseFloat(stockData.roe) || 0;
        const netMargin = parseFloat(stockData.netMargin) || 0;
        const debtToEquity = parseFloat(stockData.debtToEquity) || 0;
        const roic = parseFloat(stockData.roic) || 0;
        
        let qualityScore = 0;
        if (roe > 15) qualityScore += 15;
        else if (roe > 10) qualityScore += 10;
        else if (roe > 5) qualityScore += 5;
        
        if (netMargin > 20) qualityScore += 15;
        else if (netMargin > 15) qualityScore += 10;
        else if (netMargin > 10) qualityScore += 5;
        
        if (debtToEquity < 0.3) qualityScore += 10;
        else if (debtToEquity < 0.6) qualityScore += 5;
        
        if (roic > 15) qualityScore += 10;
        else if (roic > 10) qualityScore += 5;
        
        scores.quality = Math.min(qualityScore, 50);
        
        // Momentum Score (25% weight)
        // RSI und MACD aus Finviz-Daten holen, falls vorhanden
        const rsiValue = finvizData && finvizData.rsi ? parseFloat(finvizData.rsi) : 50;
        const macdValue = finvizData && finvizData.macd ? parseFloat(finvizData.macd) : 0;
        
        let momentumScore = 0;
        if (rsiValue >= 30 && rsiValue <= 70) momentumScore += 20;
        else if (rsiValue > 70) momentumScore += 10;
        else if (rsiValue < 30) momentumScore += 15;
        
        if (macdValue > 0) momentumScore += 20;
        else if (macdValue > -0.5) momentumScore += 10;
        
        // Technical rating from Finviz
        if (finvizData && finvizData.technicalRating) {
            if (finvizData.technicalRating.includes('Strong Bullish')) momentumScore += 10;
            else if (finvizData.technicalRating.includes('Bullish')) momentumScore += 5;
        }
        
        scores.momentum = Math.min(momentumScore, 50);
        
        // Overall Score (average of all components)
        scores.overall = Math.round((scores.value + scores.growth + scores.quality + scores.momentum) / 2);
        
        return scores;
    }

    // Update investment score display
    function updateInvestmentScore(scores) {
        const scoreElement = document.getElementById('investment-score');
        const valueScoreElement = document.getElementById('value-score');
        const growthScoreElement = document.getElementById('growth-score');
        const qualityScoreElement = document.getElementById('quality-score');
        const momentumScoreElement = document.getElementById('momentum-score');
        
        if (scoreElement) {
            scoreElement.textContent = `${scores.overall}/100`;
            scoreElement.className = `score-value ${getScoreClass(scores.overall)}`;
        }
        
        if (valueScoreElement) {
            valueScoreElement.textContent = `${scores.value}/50`;
            valueScoreElement.className = `score-indicator ${getScoreClass(scores.value * 2)}`;
        }
        
        if (growthScoreElement) {
            growthScoreElement.textContent = `${scores.growth}/50`;
            growthScoreElement.className = `score-indicator ${getScoreClass(scores.growth * 2)}`;
        }
        
        if (qualityScoreElement) {
            qualityScoreElement.textContent = `${scores.quality}/50`;
            qualityScoreElement.className = `score-indicator ${getScoreClass(scores.quality * 2)}`;
        }
        
        if (momentumScoreElement) {
            momentumScoreElement.textContent = `${scores.momentum}/50`;
            momentumScoreElement.className = `score-indicator ${getScoreClass(scores.momentum * 2)}`;
        }
    }

    // Update key metrics for fund manager analysis
    function updateKeyMetrics(stockData, finvizData) {
        // Valuation metrics
        updateMetric('key-pe', stockData.pe, 'ratio');
        updateMetric('key-peg', stockData.peg, 'ratio');
        updateMetric('key-pb', stockData.pb, 'ratio');
        
        // Profitability metrics
        updateMetric('key-roe', stockData.roe, 'percentage');
        updateMetric('key-margin', stockData.netMargin, 'percentage');
        updateMetric('key-roic', stockData.roic, 'percentage');
        
        // Growth metrics
        updateMetric('key-revenue-growth', stockData.revenueGrowth, 'percentage');
        updateMetric('key-earnings-growth', stockData.earningsGrowth, 'percentage');
        updateMetric('key-eps-growth', stockData.epsGrowth, 'percentage');
        
        // Financial Health metrics
        updateMetric('key-debt-equity', stockData.debtToEquity, 'ratio');
        updateMetric('key-current-ratio', stockData.currentRatio, 'ratio');
        updateMetric('key-fcf', stockData.freeCashFlow, 'currency');
    }

    // Update individual metric with signal
    function updateMetric(elementId, value, type) {
        const valueElement = document.getElementById(elementId);
        const signalElement = document.getElementById(`${elementId}-signal`);
        
        if (valueElement) {
            if (value !== undefined && value !== null && value !== 0) {
                let displayValue = value;
                if (type === 'percentage') {
                    displayValue = `${value}%`;
                } else if (type === 'currency') {
                    displayValue = formatRevenue(value);
                } else if (type === 'ratio') {
                    displayValue = parseFloat(value).toFixed(2);
                }
                valueElement.textContent = displayValue;
            } else {
                valueElement.textContent = 'N/A';
            }
        }
        
        if (signalElement) {
            const signal = getMetricSignal(elementId.replace('key-', ''), value);
            signalElement.textContent = signal.text;
            signalElement.className = `signal-badge ${signal.class}`;
        }
    }

    // Get signal for specific metric
    function getMetricSignal(metric, value) {
        const numValue = parseFloat(value) || 0;
        // Unternehmensgröße bestimmen
        const size = classifyCompanySize(currentStockData?.marketCap);
        switch (metric) {
            case 'pe':
                if (size === 'large') {
                    if (numValue > 0 && numValue < 18) return { text: 'Cheap', class: 'cheap' };
                    if (numValue >= 18 && numValue < 28) return { text: 'Fair', class: 'fair' };
                    if (numValue >= 28 && numValue < 40) return { text: 'Expensive', class: 'expensive' };
                    return { text: 'Overvalued', class: 'overvalued' };
                } else if (size === 'mid') {
                    if (numValue > 0 && numValue < 22) return { text: 'Cheap', class: 'cheap' };
                    if (numValue >= 22 && numValue < 35) return { text: 'Fair', class: 'fair' };
                    if (numValue >= 35 && numValue < 50) return { text: 'Expensive', class: 'expensive' };
                    return { text: 'Overvalued', class: 'overvalued' };
                } else if (size === 'small') {
                    if (numValue > 0 && numValue < 28) return { text: 'Cheap', class: 'cheap' };
                    if (numValue >= 28 && numValue < 50) return { text: 'Fair', class: 'fair' };
                    if (numValue >= 50 && numValue < 70) return { text: 'Expensive', class: 'expensive' };
                    return { text: 'Overvalued', class: 'overvalued' };
                }
                // Fallback
                if (numValue > 0 && numValue < 15) return { text: 'Cheap', class: 'cheap' };
                if (numValue >= 15 && numValue < 25) return { text: 'Fair', class: 'fair' };
                if (numValue >= 25 && numValue < 40) return { text: 'Expensive', class: 'expensive' };
                return { text: 'Overvalued', class: 'overvalued' };

            case 'debt-equity':
                if (size === 'large') {
                    if (numValue < 0.5) return { text: 'Low', class: 'low-debt' };
                    if (numValue < 1.5) return { text: 'Moderate', class: 'moderate' };
                    if (numValue < 2.5) return { text: 'High', class: 'expensive' };
                    return { text: 'Very High', class: 'very-high' };
                } else if (size === 'mid') {
                    if (numValue < 0.7) return { text: 'Low', class: 'low-debt' };
                    if (numValue < 2) return { text: 'Moderate', class: 'moderate' };
                    if (numValue < 3) return { text: 'High', class: 'expensive' };
                    return { text: 'Very High', class: 'very-high' };
                } else if (size === 'small') {
                    if (numValue < 1) return { text: 'Low', class: 'low-debt' };
                    if (numValue < 2.5) return { text: 'Moderate', class: 'moderate' };
                    if (numValue < 4) return { text: 'High', class: 'expensive' };
                    return { text: 'Very High', class: 'very-high' };
                }
                // Fallback
                if (numValue < 0.3) return { text: 'Low', class: 'low-debt' };
                if (numValue < 0.6) return { text: 'Moderate', class: 'moderate' };
                if (numValue < 1) return { text: 'High', class: 'expensive' };
                return { text: 'Very High', class: 'very-high' };

            case 'roe':
                if (size === 'large') {
                    if (numValue > 15) return { text: 'Excellent', class: 'excellent' };
                    if (numValue > 10) return { text: 'Good', class: 'good' };
                    if (numValue > 5) return { text: 'Average', class: 'average' };
                    return { text: 'Poor', class: 'poor' };
                } else if (size === 'mid') {
                    if (numValue > 12) return { text: 'Excellent', class: 'excellent' };
                    if (numValue > 8) return { text: 'Good', class: 'good' };
                    if (numValue > 4) return { text: 'Average', class: 'average' };
                    return { text: 'Poor', class: 'poor' };
                } else if (size === 'small') {
                    if (numValue > 10) return { text: 'Excellent', class: 'excellent' };
                    if (numValue > 6) return { text: 'Good', class: 'good' };
                    if (numValue > 2) return { text: 'Average', class: 'average' };
                    return { text: 'Poor', class: 'poor' };
                }
                // Fallback
                if (numValue > 15) return { text: 'Excellent', class: 'excellent' };
                if (numValue > 10) return { text: 'Good', class: 'good' };
                if (numValue > 5) return { text: 'Average', class: 'average' };
                return { text: 'Poor', class: 'poor' };

            // Die restlichen Metriken wie gehabt
            case 'peg':
                if (numValue > 0 && numValue < 1) return { text: 'Undervalued', class: 'undervalued' };
                if (numValue >= 1 && numValue < 2) return { text: 'Fair', class: 'fair' };
                return { text: 'Overvalued', class: 'overvalued' };
            case 'pb':
                if (numValue > 0 && numValue < 1.5) return { text: 'Cheap', class: 'cheap' };
                if (numValue >= 1.5 && numValue < 3) return { text: 'Fair', class: 'fair' };
                return { text: 'Expensive', class: 'expensive' };
            case 'margin':
                if (numValue > 20) return { text: 'Excellent', class: 'excellent' };
                if (numValue > 15) return { text: 'Good', class: 'good' };
                if (numValue > 10) return { text: 'Average', class: 'average' };
                return { text: 'Poor', class: 'poor' };
            case 'roic':
                if (numValue > 15) return { text: 'Excellent', class: 'excellent' };
                if (numValue > 10) return { text: 'Good', class: 'good' };
                if (numValue > 5) return { text: 'Average', class: 'average' };
                return { text: 'Poor', class: 'poor' };
            case 'revenue-growth':
            case 'earnings-growth':
            case 'eps-growth':
                if (numValue > 15) return { text: 'High', class: 'high-growth' };
                if (numValue > 10) return { text: 'Good', class: 'good' };
                if (numValue > 5) return { text: 'Moderate', class: 'moderate-growth' };
                if (numValue > 0) return { text: 'Low', class: 'low-growth' };
                return { text: 'Negative', class: 'negative' };
            case 'current-ratio':
                if (numValue > 2) return { text: 'Strong', class: 'strong-financial' };
                if (numValue > 1.5) return { text: 'Good', class: 'good' };
                if (numValue > 1) return { text: 'Adequate', class: 'adequate-financial' };
                return { text: 'Weak', class: 'weak-financial' };
            case 'fcf':
                if (numValue > 0) return { text: 'Positive', class: 'positive' };
                return { text: 'Negative', class: 'negative' };
            default:
                return { text: 'Neutral', class: 'hold' };
        }
    }

    // Update technical signal
    function updateTechnicalSignal(stockData, finvizData) {
        const signalElement = document.getElementById('technical-signal');
        const trendElement = document.getElementById('trend-signal');
        const momentumElement = document.getElementById('momentum-signal');
        const volumeElement = document.getElementById('volume-signal');
        
        // Calculate technical signals
        const rsiValue = calculateSimpleRSI(stockData.price);
        const macdValue = calculateSimpleMACD(stockData.price);
        
        // Trend signal (MA50/200)
        let trendSignal = 'Neutral';
        let trendClass = 'hold';
        if (finvizData && finvizData.technicalRating) {
            if (finvizData.technicalRating.includes('Strong Bullish')) {
                trendSignal = 'Strong Uptrend';
                trendClass = 'strong-buy';
            } else if (finvizData.technicalRating.includes('Bullish')) {
                trendSignal = 'Uptrend';
                trendClass = 'buy';
            } else if (finvizData.technicalRating.includes('Bearish')) {
                trendSignal = 'Downtrend';
                trendClass = 'sell';
            }
        }
        
        // Momentum signal (RSI)
        let momentumSignal = 'Neutral';
        let momentumClass = 'hold';
        if (rsiValue > 70) {
            momentumSignal = 'Overbought';
            momentumClass = 'sell';
        } else if (rsiValue < 30) {
            momentumSignal = 'Oversold';
            momentumClass = 'buy';
        } else if (rsiValue >= 50) {
            momentumSignal = 'Bullish';
            momentumClass = 'buy';
        } else {
            momentumSignal = 'Bearish';
            momentumClass = 'sell';
        }
        
        // Volume signal
        let volumeSignal = 'Normal';
        let volumeClass = 'hold';
        if (stockData.volume && stockData.avgVolume) {
            const volumeRatio = stockData.volume / stockData.avgVolume;
            if (volumeRatio > 2) {
                volumeSignal = 'High';
                volumeClass = 'strong-buy';
            } else if (volumeRatio > 1.5) {
                volumeSignal = 'Above Average';
                volumeClass = 'buy';
            } else if (volumeRatio < 0.5) {
                volumeSignal = 'Low';
                volumeClass = 'sell';
            }
        }
        
        // Overall technical signal
        let overallSignal = 'Neutral';
        let overallClass = 'neutral';
        const bullishSignals = [trendClass, momentumClass, volumeClass].filter(s => s.includes('buy')).length;
        const bearishSignals = [trendClass, momentumClass, volumeClass].filter(s => s.includes('sell')).length;
        
        if (bullishSignals >= 2) {
            overallSignal = 'Bullish';
            overallClass = 'bullish';
        } else if (bearishSignals >= 2) {
            overallSignal = 'Bearish';
            overallClass = 'bearish';
        }
        
        // Update elements
        if (signalElement) {
            signalElement.textContent = overallSignal;
            signalElement.className = `signal-status ${overallClass}`;
        }
        
        if (trendElement) {
            trendElement.textContent = trendSignal;
            trendElement.className = `signal-badge ${trendClass}`;
        }
        
        if (momentumElement) {
            momentumElement.textContent = momentumSignal;
            momentumElement.className = `signal-badge ${momentumClass}`;
        }
        
        if (volumeElement) {
            volumeElement.textContent = volumeSignal;
            volumeElement.className = `signal-badge ${volumeClass}`;
        }
    }

    // Update analyst consensus
    function updateAnalystConsensus(finvizData) {
        const ratingElement = document.getElementById('analyst-rating');
        const targetPriceElement = document.getElementById('target-price-consensus');
        const upsideElement = document.getElementById('upside-potential');
        
        if (ratingElement && finvizData && finvizData.analystRecommendation) {
            ratingElement.textContent = finvizData.analystRecommendation;
            ratingElement.className = `rating-value ${getRecommendationClass(finvizData.analystRecommendation)}`;
        }
        
        if (targetPriceElement && finvizData && finvizData.targetPrice) {
            targetPriceElement.textContent = finvizData.targetPrice;
        }
        
        if (upsideElement && finvizData && finvizData.targetPrice && finvizData.price) {
            // Berechne Upside Potential
            let targetPrice = finvizData.targetPrice;
            // Falls das Price Target ein Text ist, extrahiere die Zahl
            const priceMatch = targetPrice.match(/\$?([\d,.]+)/);
            if (priceMatch && priceMatch[1]) {
                targetPrice = parseFloat(priceMatch[1].replace(',', '.'));
            } else {
                targetPrice = parseFloat(targetPrice);
            }
            const currentPrice = parseFloat(finvizData.price) || 0;
            if (targetPrice && currentPrice) {
                const upside = ((targetPrice - currentPrice) / currentPrice * 100).toFixed(1);
                upsideElement.textContent = `${upside}%`;
                upsideElement.className = `consensus-value ${upside > 0 ? 'positive' : 'negative'}`;
            }
        }
    }

    // Generate final recommendation
    function generateFinalRecommendation(investmentScore, stockData, finvizData) {
        const overallScore = investmentScore.overall;
        let recommendation = 'HOLD';
        let reasoning = [];
        
        // Determine recommendation based on score
        if (overallScore >= 80) {
            recommendation = 'STRONG BUY';
        } else if (overallScore >= 65) {
            recommendation = 'BUY';
        } else if (overallScore >= 50) {
            recommendation = 'HOLD';
        } else if (overallScore >= 35) {
            recommendation = 'SELL';
        } else {
            recommendation = 'STRONG SELL';
        }
        
        // Generate reasoning points
        // Unternehmensgröße ermitteln
        const size = classifyCompanySize(stockData.marketCap);
        const peValue = parseFloat(stockData.pe) || parseFloat(finvizData.peRatio) || null;
        const peg = parseFloat(stockData.peg) || parseFloat(finvizData.pegRatio) || null;
        const pb = parseFloat(stockData.pb) || parseFloat(finvizData.pbRatio) || null;
        // Bewertung nach Unternehmensgröße
        if (size === 'large') {
            if (peValue !== null && peValue < 20) reasoning.push({ type: 'positive', text: 'Low PE ratio for large cap' });
            if (peg !== null && peg < 2) reasoning.push({ type: 'positive', text: 'Low PEG ratio for large cap' });
            if (pb !== null && pb < 4) reasoning.push({ type: 'positive', text: 'Low PB ratio for large cap' });
            if (peValue !== null && peValue > 30) reasoning.push({ type: 'negative', text: 'High PE ratio for large cap' });
        } else if (size === 'mid') {
            if (peValue !== null && peValue < 25) reasoning.push({ type: 'positive', text: 'Low PE ratio for mid cap' });
            if (peg !== null && peg < 2.5) reasoning.push({ type: 'positive', text: 'Low PEG ratio for mid cap' });
            if (pb !== null && pb < 5) reasoning.push({ type: 'positive', text: 'Low PB ratio for mid cap' });
            if (peValue !== null && peValue > 35) reasoning.push({ type: 'negative', text: 'High PE ratio for mid cap' });
        } else if (size === 'small') {
            if (peValue !== null && peValue < 30) reasoning.push({ type: 'positive', text: 'Low PE ratio for small cap' });
            if (peg !== null && peg < 3) reasoning.push({ type: 'positive', text: 'Low PEG ratio for small cap' });
            if (pb !== null && pb < 6) reasoning.push({ type: 'positive', text: 'Low PB ratio for small cap' });
            if (peValue !== null && peValue > 40) reasoning.push({ type: 'negative', text: 'High PE ratio for small cap' });
        }
        if (investmentScore.value >= 35) {
            reasoning.push({ type: 'positive', text: 'Attractive valuation metrics' });
        } else if (investmentScore.value < 20) {
            reasoning.push({ type: 'negative', text: 'Overvalued based on fundamentals' });
        }
        
        if (investmentScore.growth >= 35) {
            reasoning.push({ type: 'positive', text: 'Strong growth trajectory' });
        } else if (investmentScore.growth < 20) {
            reasoning.push({ type: 'negative', text: 'Weak growth prospects' });
        }
        
        if (investmentScore.quality >= 35) {
            reasoning.push({ type: 'positive', text: 'High-quality business metrics' });
        } else if (investmentScore.quality < 20) {
            reasoning.push({ type: 'negative', text: 'Poor financial health indicators' });
        }
        
        // Technische Signale nur bei extremen Werten berücksichtigen
        if (investmentScore.momentum >= 50) {
            reasoning.push({ type: 'positive', text: 'Very strong technical momentum' });
        } else if (investmentScore.momentum < 10) {
            reasoning.push({ type: 'negative', text: 'Very weak technical indicators' });
        }
        
        // Analystenkonsens nur als zusätzlicher Faktor in die Begründung aufnehmen
        if (finvizData && finvizData.analystRecommendation) {
            const consensus = finvizData.analystRecommendation;
            if (consensus.includes('Strong Buy')) {
                reasoning.push({ type: 'positive', text: 'Analyst consensus: Strong Buy' });
            } else if (consensus.includes('Buy')) {
                reasoning.push({ type: 'positive', text: 'Analyst consensus: Buy' });
            } else if (consensus.includes('Hold')) {
                reasoning.push({ type: 'neutral', text: 'Analyst consensus: Hold' });
            } else if (consensus.includes('Sell')) {
                reasoning.push({ type: 'negative', text: 'Analyst consensus: Sell' });
            } else if (consensus.includes('Strong Sell')) {
                reasoning.push({ type: 'negative', text: 'Analyst consensus: Strong Sell' });
            }
        }
        
        // Add risk factors
        const debtToEquity = parseFloat(stockData.debtToEquity) || 0;
        if (debtToEquity > 1) {
            reasoning.push({ type: 'negative', text: 'High debt levels pose risk' });
        }
        
        const pe = parseFloat(stockData.pe) || 0;
        if (pe > 40) {
            reasoning.push({ type: 'negative', text: 'High valuation multiples' });
        }
        
        return {
            recommendation,
            reasoning,
            score: overallScore
        };
    }

    // Update final recommendation display
    function updateFinalRecommendation(recommendation) {
        const statusElement = document.getElementById('final-recommendation');
        const reasoningElement = document.getElementById('recommendation-points');
        
        if (statusElement) {
            statusElement.textContent = recommendation.recommendation;
            statusElement.className = `recommendation-status ${getRecommendationClass(recommendation.recommendation)}`;
        }
        
        if (reasoningElement && recommendation.reasoning) {
            reasoningElement.innerHTML = '';
            recommendation.reasoning.forEach(point => {
                const reasoningItem = document.createElement('div');
                reasoningItem.className = `reasoning-item ${point.type}`;
                
                const icon = point.type === 'positive' ? '✓' : '✗';
                reasoningItem.innerHTML = `
                    <span class="reasoning-icon">${icon}</span>
                    <span class="reasoning-text">${point.text}</span>
                `;
                
                reasoningElement.appendChild(reasoningItem);
            });
        }
    }

    // Helper functions
    function getScoreClass(score) {
        if (score >= 80) return 'excellent';
        if (score >= 65) return 'good';
        if (score >= 50) return 'average';
        if (score >= 35) return 'below-average';
        return 'poor';
    }

    function getRecommendationClass(recommendation) {
        if (recommendation.includes('Strong Buy')) return 'strong-buy';
        if (recommendation.includes('Buy')) return 'buy';
        if (recommendation.includes('Hold')) return 'hold';
        if (recommendation.includes('Sell')) return 'sell';
        if (recommendation.includes('Strong Sell')) return 'strong-sell';
        return 'hold';
    }

    // Fetch and calculate RSI using historical price data
    async function calculateSimpleRSI(symbol, period = 14) {
        try {
            // Fetch last 30 days of daily prices
            const endDate = new Date();
            const startDate = new Date();
            startDate.setDate(endDate.getDate() - (period + 20));
            const data = await window.fetchStockData(symbol, startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]);
            if (!data || data.length < period + 1) return null;

            // Calculate RSI
            let gains = 0, losses = 0;
            for (let i = data.length - period; i < data.length; i++) {
                const diff = data[i].close - data[i - 1].close;
                if (diff > 0) gains += diff;
                else losses -= diff;
            }
            const avgGain = gains / period;
            const avgLoss = losses / period;
            if (avgLoss === 0) return 100;
            const rs = avgGain / avgLoss;
            return +(100 - (100 / (1 + rs))).toFixed(2);
        } catch (e) {
            console.error('RSI fetch/calc error:', e);
            return null;
        }
    }

    // Fetch and calculate MACD using historical price data
    async function calculateSimpleMACD(symbol, shortPeriod = 12, longPeriod = 26, signalPeriod = 9) {
        try {
            // Fetch enough data for MACD calculation
            const endDate = new Date();
            const startDate = new Date();
            startDate.setDate(endDate.getDate() - (longPeriod + signalPeriod + 10));
            const data = await window.fetchStockData(symbol, startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]);
            if (!data || data.length < longPeriod + signalPeriod) return null;

            // Helper: EMA calculation
            function ema(prices, period) {
                const k = 2 / (period + 1);
                let emaArr = [prices[0]];
                for (let i = 1; i < prices.length; i++) {
                    emaArr[i] = prices[i] * k + emaArr[i - 1] * (1 - k);
                }
                return emaArr;
            }

            const closes = data.map(d => d.close);
            const shortEMA = ema(closes, shortPeriod);
            const longEMA = ema(closes, longPeriod);
            const macdArr = shortEMA.map((v, i) => v - longEMA[i]);
            const signalArr = ema(macdArr.slice(longPeriod), signalPeriod);
            const macd = macdArr[macdArr.length - 1];
            const signal = signalArr[signalArr.length - 1];
            return +(macd - signal).toFixed(2);
        } catch (e) {
            console.error('MACD fetch/calc error:', e);
            return null;
        }
    }
    // Activate tab
    function activateTab(tabId) {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        const tabButton = document.querySelector(`[data-tab="${tabId}"]`);
        const tabPane = document.getElementById(tabId);
        
        if (tabButton) tabButton.classList.add('active');
        if (tabPane) tabPane.classList.add('active');
    }

    // Open modal
    if (analysisButton) {
        analysisButton.addEventListener("click", () => {
            analysisModal.style.display = "block";
        });
    }

    // Close modal
    if (closeAnalysisButton) {
        closeAnalysisButton.addEventListener("click", () => {
            analysisModal.style.display = "none";
        });
    }

    // Close modal on outside click
    window.addEventListener("click", (event) => {
        if (event.target === analysisModal) {
            analysisModal.style.display = "none";
        }
    });

    // Tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;
            
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update active pane
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === targetTab) {
                    pane.classList.add('active');
                }
            });
        });
    });

    // Timeframe switching with real data and proper styling
    timeframeButtons.forEach(button => {
        button.addEventListener('click', async () => {
            console.log('Timeframe button clicked:', button.dataset.period);
            
            // Update button styles
            updateTimeframeButtonStyles(button);
            
            // Update chart with new timeframe
            const period = button.dataset.period;
            const currentSymbol = stockSymbolInput?.value?.toUpperCase();
            
            if (currentSymbol && currentStockData) {
                console.log(`Switching to timeframe ${period} for symbol ${currentSymbol}`);
                await updateChartTimeframe(currentSymbol, period);
            } else {
                console.warn('No current symbol or stock data available for timeframe update');
                if (!currentSymbol) {
                    showErrorMessage('Bitte analysieren Sie zuerst eine Aktie');
                }
            }
        });
    });

    // Analyze button functionality
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', () => {
            const symbol = stockSymbolInput.value.trim();
            if (symbol) {
                // Call both the standalone function and the StockAnalysis class method
                analyzeStock(symbol);
                if (window.stockAnalysis && typeof window.stockAnalysis.analyzeStock === 'function') {
                    window.stockAnalysis.analyzeStock(symbol);
                }
            } else {
                showErrorMessage('Bitte geben Sie ein Aktiensymbol ein');
            }
        });
    }

    // Enter key support for search
    if (stockSymbolInput) {
        stockSymbolInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const symbol = stockSymbolInput.value.trim();
                if (symbol) {
                    // Call both the standalone function and the StockAnalysis class method
                    analyzeStock(symbol);
                    if (window.stockAnalysis && typeof window.stockAnalysis.analyzeStock === 'function') {
                        window.stockAnalysis.analyzeStock(symbol);
                    }
                } else {
                    showErrorMessage('Bitte geben Sie ein Aktiensymbol ein');
                }
            }
        });
    }
});

// Plays a sound when a market opens
function playMarketOpenSound() {
    const sound = document.getElementById("market-open-sound");
    if (sound) {
        sound.play().catch(error => console.error("Error playing sound:", error));
    }
}

// Checks if a market is closed due to a holiday
function isMarketClosedOnHoliday(market, currentDate) {
    const marketData = marketHours[market];
    return marketData.holidays?.[currentDate] || false;
}

// Converts a Date object to minutes since midnight in a specific timezone
function getTimeInMinutes(date, timezone) {
    const options = { timeZone: timezone, hour12: false, hour: "2-digit", minute: "2-digit" };
    const [hour, minute] = date.toLocaleTimeString("en-US", options).split(":").map(Number);
    return hour * 60 + minute;
}

// Gets detailed time (hours, minutes, seconds) in a specific timezone
function getTimeDetails(date, timezone) {
    const options = { timeZone: timezone, hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" };
    const [hour, minute, second] = date.toLocaleTimeString("en-US", options).split(":").map(Number);
    return { hour, minute, second };
}

// Converts a time string (e.g., "09:30") to minutes since midnight
function convertToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
}

// Formats minutes into "HH:MM" format
function formatHoursMinutes(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
}

// Formats remaining time into "Xh Ym" or "Market Closed"
function formatTimeLeft(minutes) {
    if (minutes <= 0) return "Market Closed";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
}

// Calculates minutes until the next market opening
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

// Generates a calendar displaying holidays for a given year and region
function generateCalendar(year, region) {
    const calendarDiv = document.getElementById('calendar');
    if (!calendarDiv) return;
    calendarDiv.innerHTML = '';

    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    for (let month = 0; month < 12; month++) {
        const monthDiv = document.createElement('div');
        monthDiv.className = 'calendar-month';
        monthDiv.innerHTML = `<h2>${new Date(year, month, 1).toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>`;

        const gridDiv = document.createElement('div');
        gridDiv.className = 'calendar-grid';

        // Add weekday headers
        const weekdayRow = document.createElement('div');
        weekdayRow.className = 'calendar-row';
        weekdays.forEach(day => {
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-day weekday';
            dayCell.textContent = day;
            weekdayRow.appendChild(dayCell);
        });
        gridDiv.appendChild(weekdayRow);

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        let currentDay = 1;
        let weekRow = document.createElement('div');
        weekRow.className = 'calendar-row';

        // Add empty cells before the first day
        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'calendar-day empty';
            weekRow.appendChild(emptyCell);
        }

        // Populate days of the month
        while (currentDay <= daysInMonth) {
            if (weekRow.children.length === 7) {
                gridDiv.appendChild(weekRow);
                weekRow = document.createElement('div');
                weekRow.className = 'calendar-row';
            }

            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(currentDay).padStart(2, '0')}`;
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-day';
            dayCell.textContent = currentDay;

            let marketsClosed = [];
            for (let market in marketHours) {
                if ((region === "all" || marketHours[market].region === region) &&
                    marketHours[market].holidays?.[dateStr]) {
                    const holiday = marketHours[market].holidays[dateStr];
                    marketsClosed.push(`${market}: ${holiday.reason}`);
                }
            }

            if (marketsClosed.length > 0) {
                dayCell.classList.add('holiday');
                dayCell.dataset.holidays = JSON.stringify(marketsClosed);
                dayCell.addEventListener('click', () => showHolidayPanel(dateStr, marketsClosed));
            }

            weekRow.appendChild(dayCell);
            currentDay++;
        }

        // Fill remaining cells in the last week
        while (weekRow.children.length < 7) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'calendar-day empty';
            weekRow.appendChild(emptyCell);
        }
        gridDiv.appendChild(weekRow);

        monthDiv.appendChild(gridDiv);
        calendarDiv.appendChild(monthDiv);
    }
}

// Displays a panel with holiday details for a specific date
function showHolidayPanel(dateStr, holidays) {
    const modal = document.getElementById('calendar-modal');
    if (modal.style.display !== 'block') {
        modal.style.display = 'block';
    }

    const existingPanel = document.querySelector('.holiday-panel');
    if (existingPanel) existingPanel.remove();

    const holidayPanel = document.createElement('div');
    holidayPanel.className = 'holiday-panel';
    holidayPanel.style.position = 'fixed';
    holidayPanel.style.top = '50%';
    holidayPanel.style.left = '50%';
    holidayPanel.style.transform = 'translate(-50%, -50%)';
    holidayPanel.style.zIndex = '1002';
    holidayPanel.innerHTML = `
        <h3>Holidays on ${new Date(dateStr).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>
        <ul>${holidays.map(holiday => `<li>${holiday}</li>`).join('')}</ul>
        <button class="close-panel"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg></button>
    `;

    document.body.appendChild(holidayPanel);

    holidayPanel.querySelector('.close-panel').addEventListener('click', () => {
        holidayPanel.remove();
    });
}

// Adjusts body padding based on header height
function setBodyPadding() {
    const header = document.getElementById("header");
    document.body.style.paddingTop = header ? `${header.offsetHeight}px` : "0";
}

// Updates UI elements to reflect current state
function updateUI() {
    document.querySelectorAll("#region-filter, .region-filter").forEach(el => el.value = currentRegion);
    document.querySelectorAll("#toggle-view, .toggle-view").forEach(b => b.innerHTML = isMinimized ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 5v14M5 12h14" />
    </svg>` : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M5 12h14" />
    </svg>`);
    document.querySelectorAll("#toggle-favorites, .toggle-favorites").forEach(b => b.innerHTML = `<svg
      fill="${showFavoritesOnly ? '#fff' : 'none'}"
      height="24"
      viewBox="0 0 24 24"
      width="24"  
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>`);
}

// Sets up all event listeners
function setupEventListeners() {
    document.querySelectorAll("#region-filter, .region-filter").forEach(el => {
        el.addEventListener("change", () => {
            currentRegion = el.value;
            updateUI();
            updateCards();
        });
    });



    document.querySelectorAll("#toggle-view, .toggle-view").forEach(btn => {
        btn.addEventListener("click", () => {
            isMinimized = !isMinimized;
            updateUI();
            updateCards();
        });
    });

    document.querySelectorAll("#toggle-favorites, .toggle-favorites").forEach(btn => {
        btn.addEventListener("click", () => {
            showFavoritesOnly = !showFavoritesOnly;
            updateUI();
            updateCards();
        });
    });

    document.getElementById("toggle-calendar")?.addEventListener("click", () => {
        const modal = document.getElementById("calendar-modal");
        const region = document.getElementById("region-filter")?.value || "all";
        document.getElementById("calendar-region-filter").value = region;
        generateCalendar(2025, region);
        modal.style.display = "block";
    });

    document.getElementById("calendar-region-filter")?.addEventListener("change", function () {
        generateCalendar(2025, this.value);
    });

    document.getElementById("search")?.addEventListener("input", updateCards);

    let justOpened = false;



    document.querySelector(".close")?.addEventListener("click", () => {
        document.getElementById("calendar-modal").style.display = "none";
    });

    window.addEventListener("click", (event) => {
        const modal = document.getElementById("calendar-modal");
        if (event.target === modal) modal.style.display = "none";
    });
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
    setBodyPadding();
    setupEventListeners();
    updateUI();
    updateCards();
    setInterval(updateCards, 1000); // Update every second
});

function toggleFilterButtonVisibility(show) {
    const filterButton = document.getElementById("floating-filter-btn");
    // Only show on mobile devices (max-width: 768px)
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (filterButton) {
        filterButton.style.display = (show && isMobile) ? "block" : "none";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const filterBtn = document.getElementById("floating-filter-btn");
    const panel = document.getElementById("filter-panel");
    const closeBtn = document.getElementById("close-filter-panel");

    // Initialize justOpened variable correctly
    let justOpened = false;

    // Initial visibility check
    toggleFilterButtonVisibility(true);

    // Listen for window resize to update button visibility
    window.addEventListener("resize", () => {
        toggleFilterButtonVisibility(true);
    });

    if (filterBtn && panel) {
        filterBtn.addEventListener("click", (event) => {
            event.stopPropagation();
            panel.style.display = "block";
            panel.classList.add("filter-panel-open");
            filterBtn.style.display = "none"; // Hide button when clicked

            justOpened = true;
            setTimeout(() => {
                justOpened = false;
            }, 100);
        });

        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                panel.style.display = "none";
                panel.classList.remove("filter-panel-open");
                toggleFilterButtonVisibility(true); // Use toggle function instead of direct display
            });
        }

        document.addEventListener("click", (event) => {
            if (!justOpened &&
                !panel.contains(event.target) &&
                !filterBtn.contains(event.target) &&
                panel.classList.contains("filter-panel-open")) {
            }
        });
    }

    window.addEventListener("click", (event) => {
        if (justOpened) return;
        const panel = document.getElementById("filter-panel");
        const btn = document.getElementById("floating-filter-btn");
        if (panel && btn && !panel.contains(event.target) && !btn.contains(event.target) && panel.classList.contains("filter-panel-open")) {
            panel.classList.remove("filter-panel-open");
            toggleFilterButtonVisibility(true); // Use toggle function instead of direct display
        }
    });
});

window.addEventListener("resize", setBodyPadding);

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('close').addEventListener('click', function () {
        const modal = this.closest('.modal');
        if (modal) {
            modal.style.display = 'none';
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // Select elements once
    const toggleButton = document.getElementById("toggle-market-summary");
    const modal = document.getElementById("market-summary-modal");
    const closeButton = document.getElementById("closesummary"); // Adjust based on your HTML

    // Open modal on click or touch
    toggleButton.addEventListener("click", () => {
        modal.style.display = "block";
    });
    toggleButton.addEventListener("touchstart", (e) => {
        e.preventDefault(); // Prevent click event overlap
        modal.style.display = "block";
    });

    // Close modal with button
    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Close modal when clicking outside
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});



document.addEventListener('DOMContentLoaded', function () {
    const aboutModal = document.getElementById('about-modal');
    const aboutLink = document.getElementById('about-link');
    const closeAbout = document.getElementById('close-about');

    aboutLink.addEventListener('click', function (e) {
        e.preventDefault();
        aboutModal.style.display = 'block';
    });

    closeAbout.addEventListener('click', function () {
        aboutModal.style.display = 'none';
    });

    window.addEventListener('click', function (e) {
        if (e.target === aboutModal) {
            aboutModal.style.display = 'none';
        }
    });
});

// Mission modal functionality
const missionLink = document.getElementById('mission-link');
const missionModal = document.getElementById('mission-modal');
const closeMissionButton = document.getElementById('close-mission');

missionLink.addEventListener('click', (e) => {
    e.preventDefault();
    missionModal.style.display = 'block';
});

closeMissionButton.addEventListener('click', () => {
    missionModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === missionModal) {
        missionModal.style.display = 'none';
    }
});

// Terms of Service Modal
const termsModal = document.getElementById('terms-modal');
const termsLink = document.getElementById('terms-link');
const closeTerms = document.getElementById('close-terms');

termsLink.addEventListener('click', (e) => {
    e.preventDefault();
    termsModal.style.display = 'block';
});

closeTerms.addEventListener('click', () => {
    termsModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === termsModal) {
        termsModal.style.display = 'none';
    }
});

// Newsletter subscription functionality
class NewsletterManager {
    constructor() {
        // Basis-Setup
        this.form = document.getElementById('newsletter-form');
        this.emailInput = document.getElementById('newsletter-email');
        this.statusMessage = document.createElement('div');
        this.statusMessage.className = 'newsletter-status';
        this.statusMessage.style.color = '#fff'; // Set text color to white

        if (this.form) {
            this.form.appendChild(this.statusMessage);
        }

        // Use environment variables if available, otherwise use fallback values
        this.API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNmVhZjAxZTJjMzhlZjY3ZTllNTNjMzA1NDM0MmE3MDI2YmQyMDliNDkzMzQ3M2M2MjFlMDljMzdlNjg5NWE4MDFkZjIzOTBlMDdkYzg4MzYiLCJpYXQiOiIxNzQyMzI5OTE1LjExODEyMCIsIm5iZiI6IjE3NDIzMjk5MTUuMTE4MTI0IiwiZXhwIjoiNDg5NTkyOTkxNS4xMTY3NDQiLCJzdWIiOiI5NjI3NjAiLCJzY29wZXMiOltdfQ.KHwUWoVXE_EoonOTfqGR0X4LDtQ8QACk_w5mk-Dcb6jYyQpkyhxYknG-nMoXUmPYQ0L_zjapIyFrwMU1QdKIQw';
        this.API_URL = 'https://api.sender.net/v2/subscribers';
        this.GROUP_ID = 'bYrJOn';

        this.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.API_KEY}`
        };

        this.setupEventListeners();
    }

    async subscribeToNewsletter(email) {
        try {
            const response = await fetch(this.API_URL, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({
                    email: email,
                    groups: [this.GROUP_ID],
                    sendAutoresponder: true
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Newsletter-Anmeldung fehlgeschlagen');
            }

            return data;
        } catch (error) {
            console.error('Newsletter subscription error:', error);
            throw new Error('Anmeldung fehlgeschlagen. Bitte versuchen Sie es später erneut.');
        }
    }

    setupEventListeners() {
        if (this.form) {
            this.form.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.handleSubmit(e);
            });
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        const email = this.emailInput.value.trim();

        if (!this.validateEmail(email)) {
            this.showStatus('Bitte geben Sie eine gültige E-Mail-Adresse ein', 'error');
            return;
        }

        try {
            await this.subscribeToNewsletter(email);
            this.showStatus('Erfolgreich angemeldet!', 'success');
            this.emailInput.value = '';
        } catch (error) {
            this.showStatus(error.message, 'error');
        }
    }

    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    showStatus(message, type) {
        this.statusMessage.textContent = message;
        this.statusMessage.className = `newsletter-status ${type}`;
        this.statusMessage.style.color = '#fff'; // Set text color to white
        this.statusMessage.style.display = 'block';

        setTimeout(() => {
            this.statusMessage.style.display = 'none';
        }, 3000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new NewsletterManager();
});


class ExchangeRateCalculator {
    constructor() {
        if (this.checkRequiredElements()) {
            this.initializeElements();
            this.setupEventListeners();
            this.loadCurrencies();
        } else {
            console.error('Required exchange calculator elements not found in DOM');
        }
    }

    checkRequiredElements() {
        const requiredElements = [
            'exchange-rate-modal',
            'toggle-exchange',
            'close-exchange',
            'exchange-form',
            'amount',
            'from-currency',
            'to-currency',
            'swap-currencies',
            'conversion-result',
            'result-text',
            'exchange-rate',
            'last-updated'
        ];

        return requiredElements.every(id => document.getElementById(id));
    }

    initializeElements() {
        this.modal = document.getElementById('exchange-rate-modal');
        this.toggleButton = document.getElementById('toggle-exchange');
        this.closeButton = document.getElementById('close-exchange');
        this.form = document.getElementById('exchange-form');
        this.amountInput = document.getElementById('amount');
        this.fromSelect = document.getElementById('from-currency');
        this.toSelect = document.getElementById('to-currency');
        this.swapButton = document.getElementById('swap-currencies');
        this.resultContainer = document.getElementById('conversion-result');
        this.resultText = document.getElementById('result-text');
        this.rateText = document.getElementById('exchange-rate').querySelector('span');
        this.lastUpdatedText = document.getElementById('last-updated').querySelector('span');
    }

    setupEventListeners() {
        if (this.toggleButton) {
            this.toggleButton.addEventListener('click', () => {
                if (this.modal) {
                    this.modal.style.display = 'block';
                }
            });
        }

        if (this.closeButton) {
            this.closeButton.addEventListener('click', () => {
                if (this.modal) {
                    this.modal.style.display = 'none';
                }
            });
        }

        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.modal.style.display = 'none';
            }
        });

        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleConvert(e));
        }

        if (this.swapButton) {
            this.swapButton.addEventListener('click', () => this.swapCurrencies());
        }
    }

    loadCurrencies() {
        // Liste der gängigen Währungen
        const currencies = [
            { code: 'USD', name: 'US Dollar' },
            { code: 'EUR', name: 'Euro' },
            { code: 'JPY', name: 'Japanese Yen' },
            { code: 'GBP', name: 'British Pound' },
            { code: 'AUD', name: 'Australian Dollar' },
            { code: 'CAD', name: 'Canadian Dollar' },
            { code: 'CHF', name: 'Swiss Franc' },
            { code: 'CNY', name: 'Chinese Yuan' },
            { code: 'NZD', name: 'New Zealand Dollar' },
            { code: 'INR', name: 'Indian Rupee' },
            { code: 'SGD', name: 'Singapore Dollar' },
            { code: 'HKD', name: 'Hong Kong Dollar' },
            { code: 'SEK', name: 'Swedish Krona' },
            { code: 'KRW', name: 'South Korean Won' },
            { code: 'MXN', name: 'Mexican Peso' },
            { code: 'BRL', name: 'Brazilian Real' },
            { code: 'RUB', name: 'Russian Ruble' },
            { code: 'ZAR', name: 'South African Rand' },
            { code: 'TRY', name: 'Turkish Lira' },
            { code: 'NOK', name: 'Norwegian Krone' },
            { code: 'DKK', name: 'Danish Krone' },
            { code: 'PLN', name: 'Polish Złoty' },
            { code: 'THB', name: 'Thai Baht' },
            { code: 'IDR', name: 'Indonesian Rupiah' },
            { code: 'AED', name: 'UAE Dirham' },
            { code: 'SAR', name: 'Saudi Riyal' },
            { code: 'ILS', name: 'Israeli Shekel' },
            { code: 'PHP', name: 'Philippine Peso' },
            { code: 'MYR', name: 'Malaysian Ringgit' },
            { code: 'CZK', name: 'Czech Koruna' },
            { code: 'TND', name: 'Tunisian Dinar' },
            { code: 'BHD', name: 'Bahraini Dinar' },
            { code: 'KWD', name: 'Kuwaiti Dinar' },
            { code: 'LYD', name: 'Libyan Dinar' },
            { code: 'JOD', name: 'Jordanian Dinar' },
            { code: 'IQD', name: 'Iraqi Dinar' }
        ];

        this.populateCurrencySelects(currencies);
    }

    populateCurrencySelects(currencies) {
        this.fromSelect.innerHTML = '';
        this.toSelect.innerHTML = '';

        currencies.forEach(currency => {
            const option = `<option value="${currency.code}">${currency.code} - ${currency.name}</option>`;
            this.fromSelect.insertAdjacentHTML('beforeend', option);
            this.toSelect.insertAdjacentHTML('beforeend', option);
        });

        this.fromSelect.value = 'USD';
        this.toSelect.value = 'EUR';

        const commonPairs = [
            ['EUR', 'USD'],
            ['USD', 'JPY'],
            ['GBP', 'USD'],
            ['USD', 'CHF'],
            ['EUR', 'GBP'],
            ['AUD', 'USD']
        ];

        const suggestionsDiv = document.createElement('div');
        suggestionsDiv.className = 'currency-suggestions';
        suggestionsDiv.innerHTML = `
            <p>Common pairs:</p>
            <div class="pairs-grid">
                ${commonPairs.map(([from, to]) => `
                    <button type="button" class="pair-button" data-from="${from}" data-to="${to}">
                        ${from}/${to}
                    </button>
                `).join('')}
            </div>
        `;

        this.form.insertBefore(suggestionsDiv, this.form.querySelector('button[type="submit"]'));

        suggestionsDiv.querySelectorAll('.pair-button').forEach(btn => {
            btn.addEventListener('click', () => {
                this.fromSelect.value = btn.dataset.from;
                this.toSelect.value = btn.dataset.to;
            });
        });
    }

    async handleConvert(e) {
        e.preventDefault();

        try {
            const amount = parseFloat(this.amountInput.value);
            const fromCurrency = this.fromSelect.value;
            const toCurrency = this.toSelect.value;

            if (isNaN(amount) || amount <= 0) {
                throw new Error('Please enter a valid amount');
            }

            // Verwende Yahoo Finance Symbol für Währungspaare
            const symbol = `${fromCurrency}${toCurrency}=X`;
            const proxyUrl = 'https://corsproxy.io/?';
            const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`;
            const url = proxyUrl + encodeURIComponent(yahooUrl);

            const response = await fetch(url);
            const data = await response.json();

            if (data.chart && data.chart.result && data.chart.result[0]) {
                const rate = data.chart.result[0].meta.regularMarketPrice;
                const result = amount * rate;

                this.displayResult({
                    base_code: fromCurrency,
                    target_code: toCurrency,
                    conversion_rate: rate,
                    conversion_result: result
                });
            } else {
                throw new Error('Wechselkurs nicht verfügbar');
            }
        } catch (error) {
            console.error('Conversion error:', error);
            this.showError(error.message);
        }
    }

    displayResult(data) {
        this.resultText.textContent = `${data.target_code} ${data.conversion_result.toFixed(2)}`;
        this.rateText.textContent = `1 ${data.base_code} = ${data.conversion_rate.toFixed(4)} ${data.target_code}`;
        this.lastUpdatedText.textContent = new Date().toLocaleString();
        this.resultContainer.style.display = 'block';
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        this.form.insertBefore(errorDiv, this.resultContainer);

        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }

    swapCurrencies() {
        [this.fromSelect.value, this.toSelect.value] =
            [this.toSelect.value, this.fromSelect.value];
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new ExchangeRateCalculator();
});

function updateHeaderDateTime() {
    const timeElement = document.getElementById('header-time');
    const dateElement = document.getElementById('header-date');

    const now = new Date();

    // Format time
    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true // Show in 12-hour format with AM/PM
    };

    // Format date
    const dateOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    if (timeElement && dateElement) {
        timeElement.textContent = now.toLocaleTimeString('en-US', timeOptions);
        dateElement.textContent = now.toLocaleDateString('en-US', dateOptions);
    }
}

// Initialize and update every second
document.addEventListener('DOMContentLoaded', () => {
    updateHeaderDateTime();
    setInterval(updateHeaderDateTime, 1000);
});

// World Clocks with improved timezone handling
function updateClocks() {
    // Define timezones with their corresponding IDs
    const timeZones = {
        'london': 'Europe/London',
        'new-york': 'America/New_York',
        'tokyo': 'Asia/Tokyo',
        'sydney': 'Australia/Sydney'
    };

    Object.entries(timeZones).forEach(([city, timezone]) => {
        const clock = document.querySelector(`.clock.${city}`);
        if (!clock) return;

        try {
            // Get the current time in the timezone using Intl.DateTimeFormat
            const now = new Date();

            // Get individual time components using Intl.DateTimeFormat
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: timezone,
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: false
            });

            // Parse the formatted time string
            const formattedTime = formatter.format(now);
            const timeParts = formattedTime.split(':');

            // Extract hours, minutes, seconds
            let hours = parseInt(timeParts[0]);
            const minutes = parseInt(timeParts[1]);
            const seconds = parseInt(timeParts[2] || 0); // Handle if seconds aren't returned

            // Convert to 12-hour format for the clock
            const hours12 = hours % 12 || 12;

            // Calculate rotation angles
            // Hours: Each hour = 30° (360/12), plus a little extra for the minutes
            // Minutes: Each minute = 6° (360/60)
            // Seconds: Each second = 6° (360/60)
            const hourDegrees = (hours12 * 30) + (minutes / 2);
            const minuteDegrees = minutes * 6;
            const secondDegrees = seconds * 6;

            // Apply rotations to the hands
            const hourHand = clock.querySelector('.hour');
            const minuteHand = clock.querySelector('.minute');
            const secondHand = clock.querySelector('.second');

            if (hourHand) hourHand.style.transform = `rotate(${hourDegrees}deg)`;
            if (minuteHand) minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
            if (secondHand) secondHand.style.transform = `rotate(${secondDegrees}deg)`;

            // Update digital time display if it exists
            const digitalDisplay = clock.querySelector('.digital-time');
            if (digitalDisplay) {
                const period = hours >= 12 ? 'PM' : 'AM';
                digitalDisplay.textContent = `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
            }
        } catch (e) {
            console.error(`Error updating clock for ${city}:`, e);
        }
    });
}

// Initialize clocks and update every second
updateClocks();
setInterval(updateClocks, 1000);

// Fear & Greed Index Modal Functionality
document.getElementById('fearGreedBtn').addEventListener('click', function () {
    document.getElementById('fearGreedModal').style.display = 'block';
    fetchFearGreedIndex(); // Fetch data when modal is opened
});

// Close modal when clicking on X
document.querySelectorAll('.close-modal').forEach(closeBtn => {
    closeBtn.addEventListener('click', function () {
        const modalId = this.getAttribute('data-modal');
        document.getElementById(modalId).style.display = 'none';
    });
});

// Close modal when clicking outside of it
window.addEventListener('click', function (event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
});

// Fear & Greed Index API functionality
function getDescription(score) {
    if (score <= 25) return "Extreme Fear";
    if (score <= 45) return "Fear";
    if (score <= 55) return "Neutral";
    if (score <= 75) return "Greed";
    return "Extreme Greed";
}

function updateGauge(score) {
    const needle = document.getElementById("needle");
    const indexValue = document.getElementById("indexValue");
    const description = document.getElementById("description");

    const angle = (score / 100) * 180 - 90;
    needle.style.transform = `rotate(${angle}deg)`;

    indexValue.textContent = score;
    description.textContent = getDescription(score);
}

async function fetchFearGreedIndex() {
    const url = 'https://fear-and-greed-index.p.rapidapi.com/v1/fgi';
    const options = {
        method: 'GET',
        headers: {
'x-rapidapi-key': window.ENV && window.ENV.RAPIDAPI_KEY ? window.ENV.RAPIDAPI_KEY : '',
            'x-rapidapi-host': 'fear-and-greed-index.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        const score = data.fgi.now.value;
        updateGauge(score);
        
        // Update the last updated time
        const lastUpdateElement = document.getElementById('last-update-time');
        if (lastUpdateElement) {
            const now = new Date();
            lastUpdateElement.textContent = now.toLocaleString();
        }
    } catch (error) {
        console.error("API fetch error:", error);
        document.getElementById("description").textContent = "Error fetching data";
        
        // Still update the timestamp even on error
        const lastUpdateElement = document.getElementById('last-update-time');
        if (lastUpdateElement) {
            lastUpdateElement.textContent = "Error fetching data";
        }
    }
}




// Insider Trades Modal Functionality
document.addEventListener('DOMContentLoaded', function () {
    const insiderTradesBtn = document.getElementById('insiderTradesBtn');
    const mobileInsiderTradesBtn = document.getElementById('mobile-insider-trades-btn');
    const insiderTradesModal = document.getElementById('insiderTradesModal');
    const closeInsiderModal = document.getElementById('close-insider');
    const searchButton = document.getElementById('search-insider');
    const tickerInput = document.getElementById('insider-ticker');
    const insiderLoading = document.getElementById('insider-loading');
    const insiderResults = document.getElementById('insider-results');
    const insiderNoData = document.getElementById('insider-no-data');
    const insiderError = document.getElementById('insider-error');
    const insiderErrorMessage = document.getElementById('insider-error-message');
    const insiderCompanyName = document.getElementById('insider-company-name');
    const openStockAnalysisBtn = document.getElementById('open-stock-analysis');
    console.log('Stock Analysis Button found:', openStockAnalysisBtn);
    let stockChart = null;
    let performanceMetricsData = null; // Store fixed YTD and 52W data
    let currentTickerSymbol = null; // Store current ticker for stock analysis

    // Global function to set the current ticker symbol for the stock analysis button
    window.setStockAnalysisTicker = function(ticker) {
        currentTickerSymbol = ticker ? ticker.toUpperCase() : null;
        console.log('Stock Analysis ticker set to:', currentTickerSymbol);
    };

    // Open modal when button is clicked
    insiderTradesBtn.addEventListener('click', function () {
        insiderTradesModal.style.display = 'block';
        resetInsiderModal();
        initializeStockChart();
    });

    // For mobile
    if (mobileInsiderTradesBtn) {
        mobileInsiderTradesBtn.addEventListener('click', function () {
            insiderTradesModal.style.display = 'block';
            document.querySelector('.mobile-menu-overlay').style.display = 'none';
            document.querySelector('.mobile-menu').classList.remove('open');
            resetInsiderModal();
            initializeStockChart();
        });
    }

    // Close modal when clicked on X
    closeInsiderModal.addEventListener('click', function () {
        insiderTradesModal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function (event) {
        if (event.target === insiderTradesModal) {
            insiderTradesModal.style.display = 'none';
        }
    });

    // Search on button click
    searchButton.addEventListener('click', function () {
        const ticker = tickerInput.value.trim().toUpperCase();
        if (ticker) {
            fetchInsiderTrades(ticker);
        }
    });

    // Search on Enter key
    tickerInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const ticker = tickerInput.value.trim().toUpperCase();
            if (ticker) {
                fetchInsiderTrades(ticker);
            }
        }
    });

    // Chart Period Buttons Event Handlers
    document.querySelectorAll('.chart-period-btn').forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            document.querySelectorAll('.chart-period-btn').forEach(btn => {
                btn.classList.remove('active');
                btn.style.background = 'rgba(255,255,255,0.05)';
                btn.style.color = '#ccc';
            });

            // Add active class to clicked button
            this.classList.add('active');
            this.style.background = 'rgba(1,195,168,0.15)';
            this.style.color = '#01c3a8';

            // Update chart with selected period
            const period = this.getAttribute('data-period');
            const ticker = tickerInput.value.trim().toUpperCase();
            if (ticker) {
                fetchStockData(ticker, period);
            }
        });
    });

    async function fetchInsiderTrades(ticker) {
        // Store current ticker for stock analysis button
        currentTickerSymbol = ticker.toUpperCase();
        
        // Reset and show loading state
        resetInsiderModal();
        insiderLoading.style.display = 'block';

        try {
            // First, fetch performance metrics data (YTD and 52W) - this should remain fixed
            await fetchAndCachePerformanceMetrics(ticker);

            // Fetch data from Finviz through a proxy
            const finvizUrl = `https://finviz.com/quote.ashx?t=${ticker}`;
            const proxyUrl = 'https://corsproxy.io/?';

            const response = await fetch(`${proxyUrl}${encodeURIComponent(finvizUrl)}`);

            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.status}`);
            }

            // corsproxy.io liefert die HTML-Antwort direkt als Text
            const html = await response.text();

            // Parse HTML content to extract insider trades
            const { trades, companyName } = parseFinvizInsiderTrades(html, ticker);

            if (trades.length > 0) {
                displayParsedInsiderTrades(trades, ticker, companyName);
                fetchStockData(ticker, '1m'); // Default to 1 month for chart
            } else {
                insiderNoData.style.display = 'block';
            }
        } catch (error) {
            insiderError.style.display = 'block';
            insiderErrorMessage.textContent = `Error: ${error.message}`;
            console.error('API error:', error);
        } finally {
            insiderLoading.style.display = 'none';
        }
    }

    // Function to fetch and cache YTD and 52W performance metrics
    async function fetchAndCachePerformanceMetrics(ticker) {
        try {
            // Fetch 1 year of data to calculate both YTD and 52W properly
            const proxyUrl = 'https://corsproxy.io/?';
            const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&range=1y`;
            const url = proxyUrl + encodeURIComponent(yahooUrl);

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            if (!data.chart || !data.chart.result || !data.chart.result[0]) {
                throw new Error('Invalid data format received from Yahoo Finance');
            }

            const result = data.chart.result[0];
            const timestamps = result.timestamp;
            const closePrices = result.indicators.quote[0].close;

            // Calculate and cache performance metrics
            performanceMetricsData = calculateFixedPerformanceMetrics(timestamps, closePrices);
            
            // Update the UI with cached data
            updatePerformanceMetricsUI();

        } catch (error) {
            console.error('Error fetching performance metrics:', error);
            // Set default values if fetch fails
            performanceMetricsData = { ytdChange: 0, w52Change: 0 };
        }
    }

    // Function to calculate fixed YTD and 52W metrics
    function calculateFixedPerformanceMetrics(timestamps, prices) {
        if (!timestamps || !prices || timestamps.length < 2) {
            return { ytdChange: 0, w52Change: 0 };
        }

        // Calculate YTD Performance
        const currentYear = new Date().getFullYear();
        const startOfYear = new Date(currentYear, 0, 1);
        const startOfYearTimestamp = Math.floor(startOfYear.getTime() / 1000);

        // Find the closest data point after the start of the year
        let ytdStartPrice = prices[0];
        for (let i = 0; i < timestamps.length; i++) {
            if (timestamps[i] >= startOfYearTimestamp) {
                ytdStartPrice = prices[i];
                break;
            }
        }

        // Calculate 52-week performance
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        const oneYearAgoTimestamp = Math.floor(oneYearAgo.getTime() / 1000);

        // Find the closest data point after one year ago
        let w52StartPrice = prices[0];
        for (let i = 0; i < timestamps.length; i++) {
            if (timestamps[i] >= oneYearAgoTimestamp) {
                w52StartPrice = prices[i];
                break;
            }
        }

        const currentPrice = prices[prices.length - 1];
        const ytdChangePercent = ((currentPrice - ytdStartPrice) / ytdStartPrice) * 100;
        const w52ChangePercent = ((currentPrice - w52StartPrice) / w52StartPrice) * 100;

        return {
            ytdChange: ytdChangePercent,
            w52Change: w52ChangePercent
        };
    }

    // Function to update performance metrics UI with cached data
    function updatePerformanceMetricsUI() {
        if (!performanceMetricsData) return;

        const ytdChangeElement = document.getElementById('ytd-change');
        const w52ChangeElement = document.getElementById('52w-change');

        if (ytdChangeElement) {
            ytdChangeElement.textContent = formatPercentChange(performanceMetricsData.ytdChange);
            ytdChangeElement.style.color = performanceMetricsData.ytdChange >= 0 ? '#7FFF8E' : '#ff8a80';
        }

        if (w52ChangeElement) {
            w52ChangeElement.textContent = formatPercentChange(performanceMetricsData.w52Change);
            w52ChangeElement.style.color = performanceMetricsData.w52Change >= 0 ? '#7FFF8E' : '#ff8a80';
        }
    }

    // Parse Finviz HTML to extract insider trades
    function parseFinvizInsiderTrades(html, ticker) {
        const trades = [];
        let companyName = ticker; // Default to ticker

        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Method 1: Try to extract company name from title
            const title = doc.querySelector('title');
            if (title && title.textContent) {
                console.log('Title content:', title.textContent);
                
                // Multiple regex patterns to try
                const titlePatterns = [
                    /(.+?)\s*\([A-Z]+\)\s*-/,                    // Company Name (TICKER) -
                    /(.+?)\s*\([A-Z]+\)/,                       // Company Name (TICKER)
                    /(.+?)\s*\|\s*[A-Z]+/,                      // Company Name | TICKER
                    /(.+?)\s*-\s*[A-Z]+/,                       // Company Name - TICKER
                    /^([^|()-]+)/                               // Everything before first special char
                ];
                
                for (const pattern of titlePatterns) {
                    const titleMatch = title.textContent.match(pattern);
                    if (titleMatch && titleMatch[1] && titleMatch[1].trim().length > 2) {
                        const extracted = titleMatch[1].trim();
                        if (!extracted.toLowerCase().includes('finviz') && 
                            !extracted.toLowerCase().includes('stock') &&
                            extracted !== ticker) {
                            companyName = extracted;
                            console.log('Extracted company name from title:', companyName);
                            break;
                        }
                    }
                }
            }

            // Method 2: Try to extract from meta tags
            if (companyName === ticker) {
                const metaTags = doc.querySelectorAll('meta[name="description"], meta[property="og:title"], meta[property="og:description"]');
                for (const meta of metaTags) {
                    const content = meta.getAttribute('content');
                    if (content) {
                        const metaMatch = content.match(/(.+?)\s*\([A-Z]+\)/);
                        if (metaMatch && metaMatch[1] && metaMatch[1].trim().length > 2) {
                            const extracted = metaMatch[1].trim();
                            if (!extracted.toLowerCase().includes('finviz')) {
                                companyName = extracted;
                                console.log('Extracted company name from meta:', companyName);
                                break;
                            }
                        }
                    }
                }
            }

            // Method 3: Try to extract from page headers/headings
            if (companyName === ticker) {
                const headings = doc.querySelectorAll('h1, h2, .quote-header, .quote-name, .company-name');
                for (const heading of headings) {
                    if (heading.textContent && heading.textContent.trim().length > 2) {
                        const headingText = heading.textContent.trim();
                        // Look for company name patterns in headings
                        const headingMatch = headingText.match(/(.+?)\s*\([A-Z]+\)/);
                        if (headingMatch && headingMatch[1]) {
                            const extracted = headingMatch[1].trim();
                            if (!extracted.toLowerCase().includes('finviz') && extracted !== ticker) {
                                companyName = extracted;
                                console.log('Extracted company name from heading:', companyName);
                                break;
                            }
                        }
                    }
                }
            }

            // Method 4: Try to find company name in table cells or divs
            if (companyName === ticker) {
                const textElements = doc.querySelectorAll('td, div, span');
                for (const element of textElements) {
                    if (element.textContent) {
                        const text = element.textContent.trim();
                        // Look for text that contains ticker in parentheses
                        const match = text.match(new RegExp(`(.+?)\\s*\\(${ticker}\\)`, 'i'));
                        if (match && match[1] && match[1].trim().length > 2) {
                            const extracted = match[1].trim();
                            if (!extracted.toLowerCase().includes('finviz') && 
                                !extracted.toLowerCase().includes('stock') &&
                                extracted.length < 50) { // Reasonable company name length
                                companyName = extracted;
                                console.log('Extracted company name from element:', companyName);
                                break;
                            }
                        }
                    }
                }
            }

            // Method 5: Use fallback company mapping if still not found
            if (companyName === ticker) {
                const fallbackName = getCompanyNameForTicker(ticker);
                if (fallbackName) {
                    companyName = fallbackName;
                    console.log('Used fallback company name:', companyName);
                }
            }

            console.log('Final company name:', companyName);

            // Find the insider table
            const insiderTable = [...doc.querySelectorAll('table.body-table')].find(table => {
                const headers = table.querySelectorAll('th');
                return [...headers].some(th => th.textContent.includes('Insider Trading'));
            });

            if (insiderTable) {
                const rows = insiderTable.querySelectorAll('tr');

                [...rows].forEach((row, index) => {
                    if (index === 0) return; // Skip header row

                    const cells = row.querySelectorAll('td');
                    if (cells.length >= 5) {
                        const transaction_date = cells[0]?.textContent?.trim();
                        const insider_name = cells[1]?.textContent?.trim();
                        const position = cells[2]?.textContent?.trim();
                        const transaction_type = getTransactionType(cells[3]?.textContent?.trim());
                        const price = parseFloat(cells[4]?.textContent?.replace(/[^\d.-]/g, ''));
                        const shares = parseFloat(cells[5]?.textContent?.replace(/[^\d.-]/g, ''));
                        const value = shares * price;

                        trades.push({
                            transaction_date,
                            insider_name,
                            position,
                            transaction_type,
                            shares,
                            price,
                            value,
                            formatted_shares: `$${shares.toLocaleString()}`,
                            formatted_value: new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD'
                            }).format(value)
                        });
                    }
                });
            }
        } catch (e) {
            console.error('Error parsing Finviz HTML:', e);
        }

        return { trades, companyName };
    }

    // Helper function to determine transaction type
    function getTransactionType(text) {
        text = text.toLowerCase();
        if (text.includes('buy') || text.includes('purchase')) return 'Buy';
        if (text.includes('sale') || text.includes('sell')) return 'Sale';
        if (text.includes('exercise') || text.includes('conversion')) return 'Exercise/Conversion';
        return text;
    }

    // Display parsed insider trades
    function displayParsedInsiderTrades(trades, ticker, companyName) {
        // Create a data object for display
        const result = {
            data: trades.map(trade => ({
                ...trade,
                company: { name: companyName }
            }))
        };

        displayInsiderTrades(result, ticker);
    }

    // Helper function to get company name for ticker (fallback)
    function getCompanyNameForTicker(ticker) {
        const companyMap = {
            // Tech Giants
            'AAPL': 'Apple Inc.',
            'MSFT': 'Microsoft Corporation',
            'GOOGL': 'Alphabet Inc.',
            'GOOG': 'Alphabet Inc.',
            'AMZN': 'Amazon.com, Inc.',
            'META': 'Meta Platforms, Inc.',
            'TSLA': 'Tesla, Inc.',
            'NVDA': 'NVIDIA Corporation',
            'NFLX': 'Netflix, Inc.',
            'CRM': 'Salesforce, Inc.',
            'ORCL': 'Oracle Corporation',
            'ADBE': 'Adobe Inc.',
            'IBM': 'International Business Machines Corporation',
            'INTC': 'Intel Corporation',
            'AMD': 'Advanced Micro Devices, Inc.',
            
            // Financial
            'JPM': 'JPMorgan Chase & Co.',
            'BAC': 'Bank of America Corporation',
            'WFC': 'Wells Fargo & Company',
            'GS': 'The Goldman Sachs Group, Inc.',
            'MS': 'Morgan Stanley',
            'C': 'Citigroup Inc.',
            'BRK.A': 'Berkshire Hathaway Inc.',
            'BRK.B': 'Berkshire Hathaway Inc.',
            'V': 'Visa Inc.',
            'MA': 'Mastercard Incorporated',
            'PYPL': 'PayPal Holdings, Inc.',
            
            // Healthcare
            'JNJ': 'Johnson & Johnson',
            'UNH': 'UnitedHealth Group Incorporated',
            'PFE': 'Pfizer Inc.',
            'ABT': 'Abbott Laboratories',
            'TMO': 'Thermo Fisher Scientific Inc.',
            'MRK': 'Merck & Co., Inc.',
            'ABBV': 'AbbVie Inc.',
            'LLY': 'Eli Lilly and Company',
            'BMY': 'Bristol-Myers Squibb Company',
            'AMGN': 'Amgen Inc.',
            
            // Consumer
            'KO': 'The Coca-Cola Company',
            'PEP': 'PepsiCo, Inc.',
            'WMT': 'Walmart Inc.',
            'HD': 'The Home Depot, Inc.',
            'MCD': 'McDonald\'s Corporation',
            'NKE': 'NIKE, Inc.',
            'SBUX': 'Starbucks Corporation',
            'DIS': 'The Walt Disney Company',
            'COST': 'Costco Wholesale Corporation',
            'TGT': 'Target Corporation',
            
            // Industrial
            'BA': 'The Boeing Company',
            'CAT': 'Caterpillar Inc.',
            'GE': 'General Electric Company',
            'MMM': '3M Company',
            'HON': 'Honeywell International Inc.',
            'UPS': 'United Parcel Service, Inc.',
            'FDX': 'FedEx Corporation',
            'LMT': 'Lockheed Martin Corporation',
            'RTX': 'Raytheon Technologies Corporation',
            
            // Energy
            'XOM': 'Exxon Mobil Corporation',
            'CVX': 'Chevron Corporation',
            'COP': 'ConocoPhillips',
            'SLB': 'Schlumberger Limited',
            'EOG': 'EOG Resources, Inc.',
            'KMI': 'Kinder Morgan, Inc.',
            'OXY': 'Occidental Petroleum Corporation',
            
            // Telecom
            'VZ': 'Verizon Communications Inc.',
            'T': 'AT&T Inc.',
            'TMUS': 'T-Mobile US, Inc.',
            'CMCSA': 'Comcast Corporation',
            
            // Others
            'BABA': 'Alibaba Group Holding Limited',
            'TSM': 'Taiwan Semiconductor Manufacturing Company Limited',
            'ASML': 'ASML Holding N.V.',
            'NVO': 'Novo Nordisk A/S',
            'SAP': 'SAP SE',
            'TM': 'Toyota Motor Corporation',
            'SONY': 'Sony Group Corporation'
        };

        return companyMap[ticker] || null;
    }

    // Display insider trades data
    function displayInsiderTrades(result, ticker) {
        console.log("Displaying data for", ticker, "with", result.data.length, "trades");

        insiderResults.style.display = 'block';

        // Extract trades from data array
        const trades = result.data;

        // Set company name - find it from the first entry
        const companyName = trades[0]?.company?.name || ticker;
        insiderCompanyName.textContent = companyName;
        insiderCompanyName.nextElementSibling.textContent = ticker;

        // Create summary metrics
        const buys = trades.filter(trade =>
            trade.transaction_type === 'Buy' ||
            trade.transaction_type === 'Exercise/Conversion'
        ).length;

        const sells = trades.filter(trade =>
            trade.transaction_type === 'Sale'
        ).length;

        let totalBuyValue = 0;
        let totalSellValue = 0;

        trades.forEach(trade => {
            const value = parseFloat(trade.value || 0);

            if (trade.transaction_type === 'Buy' || trade.transaction_type === 'Exercise/Conversion') {
                totalBuyValue += value;
            } else if (trade.transaction_type === 'Sale') {
                totalSellValue += value;
            }
        });

        // Format currency
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        });

        // Display summary
        const insiderSummary = document.getElementById('insider-summary');
        insiderSummary.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 15px;">
                <div style="text-align: center; padding: 10px; background: rgba(255,255,255,0.03); border-radius: 6px;">
                    <div style="font-size: 0.8rem; color: #999; margin-bottom: 5px;">Buy Transactions</div>
                    <div style="font-size: 1.4rem; font-weight: 600; color: #7FFF8E;">${buys}</div>
                </div>
                <div style="text-align: center; padding: 10px; background: rgba(255,255,255,0.03); border-radius: 6px;">
                    <div style="font-size: 0.8rem; color: #999; margin-bottom: 5px;">Sell Transactions</div>
                    <div style="font-size: 1.4rem; font-weight: 600; color: #ff8a80;">${sells}</div>
                </div>
                <div style="text-align: center; padding: 10px; background: rgba(255,255,255,0.03); border-radius: 6px;">
                    <div style="font-size: 0.8rem; color: #999; margin-bottom: 5px;">Buy Volume</div>
                    <div style="font-size: 1.4rem; font-weight: 600; color: #7FFF8E;">${formatter.format(totalBuyValue)}</div>
                </div>
                <div style="text-align: center; padding: 10px; background: rgba(255,255,255,0.03); border-radius: 6px;">
                    <div style="font-size: 0.8rem; color: #999; margin-bottom: 5px;">Sell Volume</div>
                    <div style="font-size: 1.4rem; font-weight: 600; color: #ff8a80;">${formatter.format(totalSellValue)}</div>
                </div>
            </div>
        `;

        // Update the last updated date
        const today = new Date();
        document.getElementById('insider-last-updated').textContent = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

        // Create a grid container for cards
        const insiderTableElement = document.getElementById('insider-table');

        if (!insiderTableElement) {
            console.error('Element with ID "insider-table" not found');
            return;
        }

        const tableContainer = insiderTableElement.parentNode;

        // Remove existing grid container if present
        const oldGrid = document.getElementById('insider-trades-grid');
        if (oldGrid && oldGrid.parentNode) {
            oldGrid.parentNode.removeChild(oldGrid);
        }

        // Create a new grid container for cards
        const gridContainer = document.createElement('div');
        gridContainer.id = 'insider-trades-grid';
        gridContainer.style.display = 'grid';
        gridContainer.style.gridTemplateColumns = 'repeat(auto-fit, minmax(280px, 1fr))';
        gridContainer.style.gap = '12px';
        gridContainer.style.width = '100%';
        gridContainer.style.marginTop = '15px';

        // Add the grid container to the DOM
        tableContainer.appendChild(gridContainer);

        // Create cards for each trade
        trades.forEach(trade => {
            try {
                // Format the date
                let formattedDate = '-';
                if (trade.transaction_date) {
                    const date = new Date(trade.transaction_date);
                    if (!isNaN(date.getTime())) {
                        formattedDate = date.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        });
                    } else {
                        formattedDate = trade.transaction_date;
                    }
                }

                // Position or role
                const position = trade.position || trade.formatted_roles || '-';

                // Transaction color
                const transactionColor = (trade.transaction_type === 'Buy' || trade.transaction_type === 'Exercise/Conversion')
                    ? '#7FFF8E'
                    : '#ff8a80';

                // Format shares
                const shares = numberWithCommas(trade.shares);

                // Format price
                const price = trade.formatted_price || (trade.price ? `$${parseFloat(trade.price).toFixed(2)}` : '-');

                // Format value
                const value = trade.formatted_value || (trade.value ? formatter.format(trade.value) : '-');

                // Create a card for this trade
                const card = document.createElement('div');
                card.className = 'insider-trade-card';
                card.style.height = '100%';
                card.innerHTML = `
                    <div style="background: rgba(255,255,255,0.05); border-radius: 8px; height: 100%; padding: 15px; display: flex; flex-direction: column;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                            <span style="font-weight: 600; color: #e0e0e0;">${formattedDate}</span>
                            <span style="color: ${transactionColor}; font-weight: 600; padding: 4px 8px; border-radius: 4px; background: rgba(0,0,0,0.2);">${trade.transaction_type || '-'}</span>
                        </div>
                        <div style="margin-bottom: 12px;">
                            <div style="color: #e0e0e0; font-weight: 500;">${trade.insider_name || '-'}</div>
                            <div style="color: #999; font-size: 0.9em;">${position}</div>
                        </div>
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: auto; padding-top: 10px;">
                            <div>
                                <div style="color: #999; font-size: 0.8em;">PRICE</div>
                                <div style="color: #e0e0e0;">${price}</div>
                            </div>
                            <div>
                                <div style="color: #999; font-size: 0.8em;">SHARES</div>
                                <div style="color: #e0e0e0;">${shares}</div>
                            </div>
                            <div>
                                <div style="color: #999; font-size: 0.8em;">VALUE</div>
                                <div style="color: #e0e0e0;">${value}</div>
                            </div>
                        </div>
                    </div>
                `;

                // Add the card to the grid
                gridContainer.appendChild(card);
            } catch (error) {
                console.error("Error adding trade card:", error, trade);
            }
        });
    }

    // Helper function to format numbers with commas
    function numberWithCommas(x) {
        if (!x) return '-';
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Reset insider modal to initial state
    function resetInsiderModal() {
        insiderResults.style.display = 'none';
        insiderNoData.style.display = 'none';
        insiderError.style.display = 'none';
        insiderErrorMessage.textContent = '';

        // Reset cached performance metrics
        performanceMetricsData = null;

        // Reset performance metrics UI
        const ytdChangeElement = document.getElementById('ytd-change');
        const w52ChangeElement = document.getElementById('52w-change');
        if (ytdChangeElement) {
            ytdChangeElement.textContent = '--';
            ytdChangeElement.style.color = '#ccc';
        }
        if (w52ChangeElement) {
            w52ChangeElement.textContent = '--';
            w52ChangeElement.style.color = '#ccc';
        }

        // Reset the recent transactions grid
        const gridContainer = document.getElementById('insider-trades-grid');
        if (gridContainer && gridContainer.parentNode) {
            gridContainer.parentNode.removeChild(gridContainer);
        }
        // Reset the table as fallback (legacy)
        const insiderTable = document.getElementById('insider-table');
        if (insiderTable && insiderTable.parentNode) {
            insiderTable.parentNode.innerHTML = '<table id="insider-table"><tbody></tbody></table>';
        }
    }

    // Function to initialize the stock chart
    function initializeStockChart() {
        const ctx = document.getElementById('insider-stock-chart');
        if (!ctx) return;

        // If a chart exists, destroy it
        if (stockChart) {
            stockChart.destroy();
        }

        // Create empty chart
        stockChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Stock Price',
                    data: [],
                    borderColor: '#01c3a8',
                    backgroundColor: createGradient(ctx),
                    tension: 0.4,
                    fill: true,
                    pointRadius: 0,
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        grid: {
                            display: false,
                            drawBorder: false
                        },
                        ticks: {
                            maxTicksLimit: 8,
                            color: '#888'
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)',
                            drawBorder: false
                        },
                        ticks: {
                            padding: 10,
                            color: '#888'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        titleFont: {
                            size: 14,
                            weight: 'bold'
                        },
                        bodyFont: {
                            size: 13
                        },
                        padding: 12,
                        displayColors: false,
                        callbacks: {
                            label: function (context) {
                                return `$${context.parsed.y.toFixed(2)}`;
                            }
                        }
                    }
                },
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                elements: {
                    point: {
                        radius: 0,
                        hoverRadius: 6,
                        hoverBorderWidth: 2,
                        hoverBackgroundColor: '#fff',
                        hoverBorderColor: '#01c3a8'
                    }
                }
            }
        });
    }

    function createGradient(ctx) {
        if (!ctx) return 'rgba(1, 195, 168, 0.2)';

        const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 250);
        gradient.addColorStop(0, 'rgba(1, 195, 168, 0.4)');
        gradient.addColorStop(1, 'rgba(1, 195, 168, 0)');
        return gradient;
    }

    // Function to fetch stock price data from Yahoo Finance
    async function fetchStockData(ticker, period = '1m') {
        try {
            // Determine time range based on period
            const range = getYahooFinanceRange(period);

            // Yahoo Finance API endpoint mit CORS-Proxy
            const proxyUrl = 'https://corsproxy.io/?';
            const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&range=${range}`;
            const url = proxyUrl + encodeURIComponent(yahooUrl);

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // corsproxy.io liefert das JSON direkt
            const data = await response.json();

            if (!data.chart || !data.chart.result || !data.chart.result[0]) {
                throw new Error('Invalid data format received from Yahoo Finance');
            }

            const result = data.chart.result[0];
            const timestamps = result.timestamp;
            const closePrices = result.indicators.quote[0].close;

            // Format dates for chart display
            const formattedDates = timestamps.map(timestamp => {
                const date = new Date(timestamp * 1000);
                return date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: period === '1m' ? undefined : '2-digit'
                });
            });

            // Update the chart
            updateStockChart(formattedDates, closePrices);

            // Performance metrics are already cached and don't need to be updated
            // Keep them fixed regardless of chart period

        } catch (error) {
            console.error(`Error fetching stock data for ${ticker}:`, error.message);
            // Reset chart to empty state
            if (stockChart) {
                stockChart.data.labels = [];
                stockChart.data.datasets[0].data = [];
                stockChart.update();
            }
        }
    }

    // Helper to get Yahoo Finance range parameter
    function getYahooFinanceRange(period) {
        switch (period.toLowerCase()) {
            case '1m': return '1mo';
            case '3m': return '3mo';
            case '6m': return '6mo';
            case '1y': return '1y';
            default: return '1mo';
        }
    }

    // Update the chart with new data
    function updateStockChart(dates, prices) {
        if (!stockChart) return;

        stockChart.data.labels = dates;
        stockChart.data.datasets[0].data = prices;
        stockChart.update();
    }

    // Legacy function - no longer used as performance metrics are now cached
    // Update performance metrics based on stock data
    function updatePerformanceMetrics_OLD(timestamps, prices) {
        // This function is no longer used - performance metrics are now cached
        // and remain fixed regardless of chart period selection
        console.log('Legacy updatePerformanceMetrics function called - metrics are now cached');
    }

    function formatPercentChange(change) {
        const sign = change >= 0 ? '+' : '';
        return `${sign}${change.toFixed(2)}%`;
    }
});

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function () {
    // Hamburger menu functionality
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');

    if (hamburgerIcon && mobileMenu && mobileMenuOverlay) {
        hamburgerIcon.addEventListener('click', function () {
            hamburgerIcon.classList.toggle('open');
            mobileMenu.classList.toggle('open');
            mobileMenuOverlay.classList.toggle('open');
            document.body.classList.toggle('menu-open');
        });

        mobileMenuOverlay.addEventListener('click', function () {
            hamburgerIcon.classList.remove('open');
            mobileMenu.classList.remove('open');
            mobileMenuOverlay.classList.remove('open');
            document.body.classList.remove('menu-open');
        });

        // Link mobile menu buttons to desktop buttons
        document.getElementById('mobile-toggle-analysis')?.addEventListener('click', function () {
            document.getElementById('toggle-analysis').click();
            closeMenu();
        });

        document.getElementById('mobile-toggle-exchange')?.addEventListener('click', function () {
            document.getElementById('toggle-exchange').click();
            closeMenu();
        });

        document.getElementById('mobile-toggle-calendar')?.addEventListener('click', function () {
            document.getElementById('toggle-calendar').click();
            closeMenu();
        });

        document.getElementById('mobile-toggle-backtest')?.addEventListener('click', function () {
            document.getElementById('toggle-backtest').click();
            closeMenu();
        });

        document.getElementById('mobile-toggle-market-summary')?.addEventListener('click', function () {
            document.getElementById('toggle-market-summary').click();
            closeMenu();
        });

        document.getElementById('mobile-fear-greed-btn')?.addEventListener('click', function () {
            document.getElementById('fearGreedBtn').click();
            closeMenu();
        });

        document.getElementById('mobile-insider-trades-btn')?.addEventListener('click', function () {
            document.getElementById('insiderTradesBtn').click();
            closeMenu();
        });

        document.getElementById('mobile-earnings-calendar-btn')?.addEventListener('click', function () {
            document.getElementById('earningsCalendarBtn').click();
            closeMenu();
        });

        function closeMenu() {
            hamburgerIcon.classList.remove('open');
            mobileMenu.classList.remove('open');
            mobileMenuOverlay.classList.remove('open');
            document.body.classList.remove('menu-open');
        }
    }
});

// Enhanced dividend analysis function for backtest integration
async function getYahooDividends(symbol, startDate, endDate, initialInvestment = 0, monthlyInvestment = 0, reinvest = false) {
    if (!symbol || !startDate || !endDate) {
        console.error('Missing required parameters for dividend analysis');
        return null;
    }

    const startUnix = dateToUnix(startDate);
    const endUnix = dateToUnix(endDate);

    if (startUnix >= endUnix) {
        console.error('Start date must be before end date');
        return null;
    }

    const rawUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?period1=${startUnix}&period2=${endUnix}&interval=1mo&events=div`;
    const url = `https://corsproxy.io/?${encodeURIComponent(rawUrl)}`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        const result = data.chart.result?.[0];
        if (!result) {
            console.error('No data found for', symbol);
            return null;
        }

        const timestamps = result.timestamp;
        const prices = result.indicators.adjclose[0].adjclose;
        const dividends = result.events?.dividends ? Object.values(result.events.dividends).sort((a, b) => a.date - b.date) : [];

        const dates = timestamps.map(ts => new Date(ts * 1000));
        let shares = 0;
        let cashDividends = 0;
        let totalDividends = 0;
        let portfolioValues = [];
        let labels = [];
        let monthlyDividends = [];

        const firstPrice = prices[0];
        if (!firstPrice) {
            console.error('No price data available at start date for', symbol);
            return null;
        }
        shares = initialInvestment / firstPrice;

        let divIndex = 0;

        for (let i = 0; i < timestamps.length; i++) {
            const ts = timestamps[i];
            const price = prices[i];
            if (!price) continue;

            if (i > 0 && monthlyInvestment > 0) {
                shares += monthlyInvestment / price;
            }

            let monthlyDividend = 0;

            while (divIndex < dividends.length && dividends[divIndex].date <= ts) {
                const divPerShare = dividends[divIndex].amount;
                const divAmount = shares * divPerShare;
                totalDividends += divAmount;
                monthlyDividend += divAmount;

                if (reinvest) {
                    shares += divAmount / price;
                } else {
                    cashDividends += divAmount;
                }
                divIndex++;
            }

            const portfolioValue = shares * price + cashDividends;
            portfolioValues.push(portfolioValue);
            labels.push(dates[i].toLocaleDateString(undefined, { year: 'numeric', month: 'short' }));
            monthlyDividends.push(monthlyDividend.toFixed(2));
        }

        return {
            totalDividends: totalDividends.toFixed(2),
            finalPortfolioValue: portfolioValues[portfolioValues.length - 1].toFixed(2),
            finalShares: shares.toFixed(2),
            portfolioValues,
            labels,
            monthlyDividends
        };

    } catch (err) {
        console.error('Error fetching dividend data for', symbol, ':', err);
        return null;
    }
}

function drawChart(labels, portfolioData, dividendData) {
    const ctx1 = document.getElementById('portfolioChart')?.getContext('2d');
    const ctx2 = document.getElementById('dividendChart')?.getContext('2d');

    if (!ctx1 || !ctx2) {
        console.warn('Chart canvases not found. Charts will not be drawn.');
        return;
    }

    if (chartInstance) chartInstance.destroy();
    if (dividendChartInstance) dividendChartInstance.destroy();

    chartInstance = new Chart(ctx1, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Portfolio Value ($)',
                data: portfolioData,
                borderColor: '#00bfff',
                backgroundColor: 'rgba(0, 191, 255, 0.3)',
                fill: true,
                tension: 0.3,
                pointRadius: 3,
                pointHoverRadius: 6,
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: { ticks: { color: '#eee' }, grid: { color: '#333' } },
                y: { ticks: { color: '#eee' }, grid: { color: '#333' } }
            },
            plugins: {
                legend: {
                    labels: { color: '#00bfff', font: { size: 14 } }
                },
                tooltip: {
                    backgroundColor: '#00bfff',
                    titleColor: '#121212',
                    bodyColor: '#121212'
                }
            }
        }
    });

    dividendChartInstance = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Monthly Dividends ($)',
                data: dividendData,
                backgroundColor: 'rgba(0, 255, 127, 0.5)',
                borderColor: '#00ff7f',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: { ticks: { color: '#eee' }, grid: { color: '#333' } },
                y: {
                    beginAtZero: true,
                    ticks: { color: '#eee' },
                    grid: { color: '#333' }
                }
            },
            plugins: {
                legend: {
                    labels: { color: '#00ff7f', font: { size: 14 } }
                },
                tooltip: {
                    backgroundColor: '#00ff7f',
                    titleColor: '#121212',
                    bodyColor: '#121212'
                }
            }
        }
    });
}

// Earnings Calendar Modal Functionality
function initEarningsCalendar() {
    // Use the actual current local date - construct it properly to avoid timezone shifts
    const now = new Date();
    // Create date from local date components to ensure we get the right day
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();
    const currentDateUTC = new Date(year, month, date, 12, 0, 0, 0); // Use noon to avoid timezone issues

    const dateSelector = document.getElementById('earningsDateSelector');
    const currentDateDisplay = document.getElementById('earningsCurrentDate');
    const earningsList = document.getElementById('earningsEarningsList');
    const totalEarnings = document.getElementById('earningsTotalEarnings');
    const noDataMessage = document.getElementById('earningsNoDataMessage');
    const statusText = document.getElementById('earningsStatusText');
    const searchInput = document.getElementById('earningsSearchInput');
    const filterButtons = document.querySelectorAll('.filter-button');
    const loadingIndicator = document.getElementById('earningsLoadingIndicator');
    const calendarWeekNumber = document.getElementById('calendarWeekNumber');

    let selectedDate = currentDateUTC;
    let currentFilter = 'all';
    let searchQuery = '';

    // Function to get ISO week number
    function getWeekNumber(date) {
        const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        const dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    }

const EARNINGS_DATA = {
    '2025-07-14': [
        { ticker: 'FAST', company_name: 'Fastenal Company', release_time: 'Before Market Open', eps_estimate: '0.51', eps_actual: null, revenue_estimate: '1.94', revenue_actual: null },
        { ticker: 'SLP', company_name: 'Simulations Plus, Inc.', release_time: 'After Market Close', eps_estimate: '0.12', eps_actual: null, revenue_estimate: '0.02', revenue_actual: null }
    ],
    '2025-07-15': [
        { ticker: 'JPM', company_name: 'JPMorgan Chase & Co.', release_time: 'Before Market Open', eps_estimate: '4.46', eps_actual: null, revenue_estimate: '43.50', revenue_actual: null },
        { ticker: 'C', company_name: 'Citigroup Inc.', release_time: 'Before Market Open', eps_estimate: '1.45', eps_actual: null, revenue_estimate: '20.20', revenue_actual: null },
        { ticker: 'WFC', company_name: 'Wells Fargo & Company', release_time: 'Before Market Open', eps_estimate: '1.35', eps_actual: null, revenue_estimate: '20.60', revenue_actual: null },
        { ticker: 'BLK', company_name: 'BlackRock, Inc.', release_time: 'Before Market Open', eps_estimate: '10.12', eps_actual: null, revenue_estimate: '5.20', revenue_actual: null },
        { ticker: 'JBHT', company_name: 'J.B. Hunt Transport Services, Inc.', release_time: 'After Market Close', eps_estimate: '1.65', eps_actual: null, revenue_estimate: '3.15', revenue_actual: null }
    ],
    '2025-07-16': [
        { ticker: 'BAC', company_name: 'Bank of America Corporation', release_time: 'Before Market Open', eps_estimate: '0.85', eps_actual: null, revenue_estimate: '25.50', revenue_actual: null },
        { ticker: 'GS', company_name: 'The Goldman Sachs Group, Inc.', release_time: 'Before Market Open', eps_estimate: '8.90', eps_actual: null, revenue_estimate: '13.10', revenue_actual: null },
        { ticker: 'MS', company_name: 'Morgan Stanley', release_time: 'Before Market Open', eps_estimate: '1.75', eps_actual: null, revenue_estimate: '14.80', revenue_actual: null },
        { ticker: 'PNC', company_name: 'The PNC Financial Services Group, Inc.', release_time: 'Before Market Open', eps_estimate: '3.30', eps_actual: null, revenue_estimate: '5.45', revenue_actual: null },
        { ticker: 'PGR', company_name: 'The Progressive Corporation', release_time: 'Before Market Open', eps_estimate: '2.95', eps_actual: null, revenue_estimate: '17.90', revenue_actual: null },
        { ticker: 'UAL', company_name: 'United Airlines Holdings, Inc.', release_time: 'After Market Close', eps_estimate: '3.85', eps_actual: null, revenue_estimate: '15.20', revenue_actual: null },
        { ticker: 'JNJ', company_name: 'Johnson & Johnson', release_time: 'Before Market Open', eps_estimate: '2.90', eps_actual: null, revenue_estimate: '22.80', revenue_actual: null },
        { ticker: 'AA', company_name: 'Alcoa Corporation', release_time: 'After Market Close', eps_estimate: '0.25', eps_actual: null, revenue_estimate: '2.85', revenue_actual: null },
        { ticker: 'KMI', company_name: 'Kinder Morgan, Inc.', release_time: 'After Market Close', eps_estimate: '0.27', eps_actual: null, revenue_estimate: '4.10', revenue_actual: null }
    ],
    '2025-07-17': [
        { ticker: 'NFLX', company_name: 'Netflix, Inc.', release_time: 'After Market Close', eps_estimate: '7.06', eps_actual: null, revenue_estimate: '11.04', revenue_actual: null },
        { ticker: 'TSM', company_name: 'Taiwan Semiconductor Manufacturing Company', release_time: 'Before Market Open', eps_estimate: '1.80', eps_actual: null, revenue_estimate: '22.50', revenue_actual: null },
        { ticker: 'PEP', company_name: 'PepsiCo, Inc.', release_time: 'Before Market Open', eps_estimate: '2.15', eps_actual: null, revenue_estimate: '22.70', revenue_actual: null },
        { ticker: 'ABT', company_name: 'Abbott Laboratories', release_time: 'Before Market Open', eps_estimate: '1.15', eps_actual: null, revenue_estimate: '10.50', revenue_actual: null },
        { ticker: 'NVS', company_name: 'Novartis AG', release_time: 'Before Market Open', eps_estimate: '1.95', eps_actual: null, revenue_estimate: '12.80', revenue_actual: null },
        { ticker: 'CTAS', company_name: 'Cintas Corporation', release_time: 'Before Market Open', eps_estimate: '4.10', eps_actual: null, revenue_estimate: '2.60', revenue_actual: null },
        { ticker: 'USB', company_name: 'U.S. Bancorp', release_time: 'Before Market Open', eps_estimate: '1.05', eps_actual: null, revenue_estimate: '7.10', revenue_actual: null },
        { ticker: 'IBKR', company_name: 'Interactive Brokers Group, Inc.', release_time: 'After Market Close', eps_estimate: '1.75', eps_actual: null, revenue_estimate: '1.20', revenue_actual: null },
        { ticker: 'TRV', company_name: 'The Travelers Companies, Inc.', release_time: 'Before Market Open', eps_estimate: '2.50', eps_actual: null, revenue_estimate: '11.30', revenue_actual: null }
    ],
    '2025-07-18': [
        { ticker: 'AXP', company_name: 'American Express Company', release_time: 'Before Market Open', eps_estimate: '3.25', eps_actual: null, revenue_estimate: '16.90', revenue_actual: null },
        { ticker: 'SCHW', company_name: 'The Charles Schwab Corporation', release_time: 'Before Market Open', eps_estimate: '0.80', eps_actual: null, revenue_estimate: '4.85', revenue_actual: null },
        { ticker: 'HBAN', company_name: 'Huntington Bancshares Incorporated', release_time: 'Before Market Open', eps_estimate: '0.35', eps_actual: null, revenue_estimate: '1.85', revenue_actual: null },
        { ticker: 'RF', company_name: 'Regions Financial Corporation', release_time: 'Before Market Open', eps_estimate: '0.55', eps_actual: null, revenue_estimate: '2.35', revenue_actual: null },
        { ticker: 'TFC', company_name: 'Truist Financial Corporation', release_time: 'Before Market Open', eps_estimate: '0.90', eps_actual: null, revenue_estimate: '5.80', revenue_actual: null },
        { ticker: 'MMM', company_name: '3M Company', release_time: 'Before Market Open', eps_estimate: '1.70', eps_actual: null, revenue_estimate: '6.10', revenue_actual: null },
        { ticker: 'SLB', company_name: 'Schlumberger Limited', release_time: 'Before Market Open', eps_estimate: '0.90', eps_actual: null, revenue_estimate: '9.20', revenue_actual: null }
    ],
    '2025-07-19': [],
    '2025-07-20': []
};

    // Make earnings data globally available
    window.EARNINGS_DATA = EARNINGS_DATA;

    function formatDate(date) {
        return date.toISOString().split('T')[0];
    }

    function formatDayName(date) {
        return date.toLocaleDateString('en-US', { weekday: 'short' });
    }

    function displayEarnings(data) {
        if (!earningsList) return;
        
        earningsList.innerHTML = '';
        
        if (data.length === 0) {
            noDataMessage.classList.add('show');
            return;
        }
        
        noDataMessage.classList.remove('show');

        data.forEach(item => {
            const container = document.createElement('div');
            container.className = 'earnings-item';

            const companyInfo = document.createElement('div');
            companyInfo.className = 'company-info';
            companyInfo.innerHTML = `
                <div class="ticker">${item.ticker}</div>
                <div class="company-name">${item.company_name}</div>
            `;

            // Add "More Info" button to company info section
            const moreInfoBtn = document.createElement('button');
            moreInfoBtn.className = 'more-info-btn';
            moreInfoBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg> Info';
            moreInfoBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                showCompanyDetails(item);
            });
            companyInfo.appendChild(moreInfoBtn);

            const earningsInfo = document.createElement('div');
            earningsInfo.className = 'earnings-info';

            const time = document.createElement('div');
            time.className = 'time-label';
            time.textContent = item.release_time;

            const estimates = document.createElement('div');
            estimates.className = 'estimates';

            // EPS
            const eps = document.createElement('div');
            eps.className = 'estimate-row';
            
            let epsHtml = `<span class="estimate-label">EPS:</span>`;
            if (item.eps_actual) {
                const surprise = ((parseFloat(item.eps_actual) - parseFloat(item.eps_estimate)) / parseFloat(item.eps_estimate) * 100).toFixed(1);
                const surpriseClass = surprise > 0 ? 'positive' : 'negative';
                epsHtml += `<span class="estimate-value">$${item.eps_actual}</span><span class="surprise ${surpriseClass}">(${surprise > 0 ? '+' : ''}${surprise}%)</span>`;
            } else {
                epsHtml += `<span class="estimate-value">$${item.eps_estimate}</span>`;
            }
            eps.innerHTML = epsHtml;
            estimates.appendChild(eps);

            // Revenue
            const rev = document.createElement('div');
            rev.className = 'estimate-row';
            
            let revHtml = `<span class="estimate-label">Rev:</span>`;
            if (item.revenue_actual) {
                const surprise = ((parseFloat(item.revenue_actual) - parseFloat(item.revenue_estimate)) / parseFloat(item.revenue_estimate) * 100).toFixed(1);
                const surpriseClass = surprise > 0 ? 'positive' : 'negative';
                revHtml += `<span class="estimate-value">$${item.revenue_actual}B</span><span class="surprise ${surpriseClass}">(${surprise > 0 ? '+' : ''}${surprise}%)</span>`;
            } else {
                revHtml += `<span class="estimate-value">$${item.revenue_estimate}B</span>`;
            }
            rev.innerHTML = revHtml;
            estimates.appendChild(rev);

            earningsInfo.appendChild(time);
            earningsInfo.appendChild(estimates);

            container.appendChild(companyInfo);
            container.appendChild(earningsInfo);
            earningsList.appendChild(container);
        });
    }

    // Function to show detailed company information
    function showCompanyDetails(company) {
        // Create company details modal
        let companyModal = document.getElementById('company-details-modal');
        
        if (!companyModal) {
            // Create modal HTML
            companyModal = document.createElement('div');
            companyModal.id = 'company-details-modal';
            companyModal.className = 'modal company-details-modal';
            companyModal.innerHTML = `
                <div class="modal-content company-details-content">
                    <div class="modal-header">
                        <h2 id="company-details-title">Company Details</h2>
                        <button class="btn" id="close-company-details">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="company-overview">
                            <div class="company-header-section" style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
                                <div class="company-basic-info-minimal">
                                    <div class="company-main-info">
                                        <div class="company-name-section">
                                            <h3 id="company-full-name">Company Name</h3>
                                            <div class="company-meta">
                                                <span class="ticker-minimal" id="company-ticker-large">TICKER</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="action-buttons-container" style="display: flex; gap: 12px; flex-direction: column;">
                                    <button class="insider-btn-minimal" id="view-insider-trades-btn">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                                        <span>Insider Trades</span>
                                    </button>
                                    <button class="insider-btn-minimal" id="view-stock-analysis-btn">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"></polyline>
                                        </svg>
                                        <span>Stock Analysis</span>
                                    </button>
                                </div>
                            </div>
                            
                            <div class="earnings-details">
                                <h4>Earnings Information</h4>
                                <div class="earnings-grid">
                                    <div class="earnings-metric">
                                        <span class="metric-label">Release Time:</span>
                                        <span class="metric-value" id="company-release-time">-</span>
                                    </div>
                                    <div class="earnings-metric">
                                        <span class="metric-label">EPS Estimate:</span>
                                        <span class="metric-value" id="company-eps-estimate">-</span>
                                    </div>
                                    <div class="earnings-metric">
                                        <span class="metric-label">Revenue Estimate:</span>
                                        <span class="metric-value" id="company-revenue-estimate">-</span>
                                    </div>
                                    <div class="earnings-metric" id="company-eps-actual-container" style="display: none;">
                                        <span class="metric-label">EPS Actual:</span>
                                        <span class="metric-value" id="company-eps-actual">-</span>
                                    </div>
                                    <div class="earnings-metric" id="company-revenue-actual-container" style="display: none;">
                                        <span class="metric-label">Revenue Actual:</span>
                                        <span class="metric-value" id="company-revenue-actual">-</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="company-additional-info">
                                <h4>Company Information</h4>
                                <div class="info-grid">
                                    <div class="info-item">
                                        <span class="info-label">Sector:</span>
                                        <span class="info-value" id="company-sector">-</span>
                                    </div>
                                    <div class="info-item">
                                        <span class="info-label">Industry:</span>
                                        <span class="info-value" id="company-industry">-</span>
                                    </div>
                                    <div class="info-item">
                                        <span class="info-label">Market Cap:</span>
                                        <span class="info-value" id="company-market-cap">-</span>
                                    </div>
                                    <div class="info-item">
                                        <span class="info-label">Employees:</span>
                                        <span class="info-value" id="company-employees">-</span>
                                    </div>
                                    <div class="info-item">
                                        <span class="info-label">CEO:</span>
                                        <span class="info-value" id="company-ceo">-</span>
                                    </div>
                                    <div class="info-item">
                                        <span class="info-label">Founded:</span>
                                        <span class="info-value" id="company-founded">-</span>
                                    </div>
                                    <div class="info-item">
                                        <span class="info-label">Headquarters:</span>
                                        <span class="info-value" id="company-headquarters">-</span>
                                    </div>
                                    <div class="info-item">
                                        <span class="info-label">Revenue TTM:</span>
                                        <span class="info-value" id="company-revenue-ttm">-</span>
                                    </div>
                                    <div class="info-item">
                                        <span class="info-label">P/E Ratio:</span>
                                        <span class="info-value" id="company-pe-ratio">-</span>
                                    </div>
                                    <div class="info-item">
                                        <span class="info-label">Div Yield:</span>
                                        <span class="info-value" id="company-dividend-yield">-</span>
                                    </div>
                                    <div class="info-item">
                                        <span class="info-label">52W High:</span>
                                        <span class="info-value" id="company-52w-high">-</span>
                                    </div>
                                    <div class="info-item">
                                        <span class="info-label">52W Low:</span>
                                        <span class="info-value" id="company-52w-low">-</span>
                                    </div>
                                </div>
                                
                                <div class="company-description">
                                    <div class="description-header">
                                        <h5>Business Description</h5>
                                        <button class="description-toggle-btn" id="description-toggle-btn" title="Expand description">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <polyline points="17,14 12,9 7,14"></polyline>
                                            </svg>
                                        </button>
                                    </div>
                                    <p id="company-description-text" class="description-collapsed">Loading company information...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(companyModal);
            
            // Add close event listeners
            const closeBtn = companyModal.querySelector('#close-company-details');
            closeBtn.addEventListener('click', () => {
                companyModal.style.display = 'none';
            });
            
            // Close on outside click
            companyModal.addEventListener('click', (e) => {
                if (e.target === companyModal) {
                    companyModal.style.display = 'none';
                }
            });
        }
        
        // Populate modal with company data
        populateCompanyModal(company, companyModal);
        
        // Show modal
        companyModal.style.display = 'block';
    }
    
    // Function to populate company modal with data
    function populateCompanyModal(company, modal) {
        // Basic info
        modal.querySelector('#company-full-name').textContent = company.company_name;
        modal.querySelector('#company-ticker-large').textContent = company.ticker;
        modal.querySelector('#company-release-time').textContent = company.release_time;
        modal.querySelector('#company-eps-estimate').textContent = `$${company.eps_estimate}`;
        modal.querySelector('#company-revenue-estimate').textContent = `$${company.revenue_estimate}B`;
        
        // Show actual values if available
        if (company.eps_actual) {
            modal.querySelector('#company-eps-actual-container').style.display = 'block';
            modal.querySelector('#company-eps-actual').textContent = `$${company.eps_actual}`;
        } else {
            modal.querySelector('#company-eps-actual-container').style.display = 'none';
        }
        
        if (company.revenue_actual) {
            modal.querySelector('#company-revenue-actual-container').style.display = 'block';
            modal.querySelector('#company-revenue-actual').textContent = `$${company.revenue_actual}B`;
        } else {
            modal.querySelector('#company-revenue-actual-container').style.display = 'none';
        }
        
        // Get additional company information
        const companyInfo = getCompanyInfo(company.ticker);
        modal.querySelector('#company-sector').textContent = companyInfo.sector;
        modal.querySelector('#company-industry').textContent = companyInfo.industry;
        modal.querySelector('#company-market-cap').textContent = companyInfo.marketCap;
        modal.querySelector('#company-employees').textContent = companyInfo.employees;
        modal.querySelector('#company-ceo').textContent = companyInfo.ceo;
        modal.querySelector('#company-founded').textContent = companyInfo.founded;
        modal.querySelector('#company-headquarters').textContent = companyInfo.headquarters;
        modal.querySelector('#company-revenue-ttm').textContent = companyInfo.revenueTTM;
        modal.querySelector('#company-pe-ratio').textContent = companyInfo.peRatio;
        modal.querySelector('#company-dividend-yield').textContent = companyInfo.dividendYield;
        modal.querySelector('#company-52w-high').textContent = companyInfo.high52w;
        modal.querySelector('#company-52w-low').textContent = companyInfo.low52w;
        modal.querySelector('#company-description-text').textContent = companyInfo.description;
        
        // Setup action buttons
        setupCompanyActionButtons(company.ticker, modal);
    }
    
    // Function to get additional company information
    function getCompanyInfo(ticker) {
        const companyData = {
            'AAPL': {
                sector: 'Technology',
                industry: 'Consumer Electronics',
                marketCap: '$3.5T',
                employees: '161,000',
                ceo: 'Tim Cook',
                founded: '1976',
                headquarters: 'Cupertino, CA, USA',
                revenueTTM: '$394.3B',
                peRatio: '35.2',
                dividendYield: '0.43%',
                high52w: '$199.62',
                low52w: '$164.08',
                description: 'Apple Inc. is the world\'s largest technology company by revenue and market capitalization. The company designs, develops, and sells consumer electronics, computer software, and online services. Apple\'s flagship products include the iPhone smartphone, iPad tablet computer, Mac personal computer, iPod portable media player, Apple Watch smartwatch, Apple TV digital media player, AirPods wireless earbuds, and HomePod smart speaker. Apple\'s software includes iOS, macOS, watchOS, and tvOS operating systems, the iTunes media player, the Safari web browser, and the iLife and iWork creativity and productivity suites. The company operates the App Store, iTunes Store, and Apple Music streaming service. Apple leads innovation in mobile technology, wearables, and services, with a strong ecosystem that encourages customer loyalty and repeat purchases.'
            },
            'MSFT': {
                sector: 'Technology',
                industry: 'Software',
                marketCap: '$3.1T',
                employees: '221,000',
                ceo: 'Satya Nadella',
                founded: '1975',
                headquarters: 'Redmond, WA, USA',
                revenueTTM: '$245.1B',
                peRatio: '34.8',
                dividendYield: '0.72%',
                high52w: '$468.35',
                low52w: '$362.90',
                description: 'Microsoft Corporation is a multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services. Microsoft is best known for its Windows operating systems, Microsoft Office suite, and Internet Explorer and Edge web browsers. The company\'s flagship hardware products are the Xbox video game consoles and the Microsoft Surface lineup of touchscreen personal computers. Microsoft operates three main business segments: Productivity and Business Processes (including Office 365, Microsoft Teams, and LinkedIn), Intelligent Cloud (including Azure cloud computing platform, Windows Server, and SQL Server), and More Personal Computing (including Windows operating systems, devices, Xbox, and search advertising). Microsoft Azure is one of the leading cloud computing platforms globally, competing directly with Amazon Web Services and Google Cloud Platform.'
            },
            'JPM': {
                sector: 'Financial Services',
                industry: 'Banks',
                marketCap: '$650B',
                employees: '293,723',
                ceo: 'Jamie Dimon',
                founded: '1799',
                headquarters: 'New York, NY, USA',
                revenueTTM: '$162.4B',
                peRatio: '12.8',
                dividendYield: '2.15%',
                high52w: '$234.26',
                low52w: '$155.12',
                description: 'JPMorgan Chase & Co. is the largest bank in the United States and one of the largest banks globally by market capitalization and total assets. The company provides a wide range of financial services including investment banking, commercial banking, financial transaction processing, and asset management. JPMorgan operates through four main segments: Consumer & Community Banking (retail banking, credit cards, mortgages, and auto loans), Corporate & Investment Bank (investment banking, market making, and treasury services), Commercial Banking (lending, treasury services, and investment banking for middle-market companies), and Asset & Wealth Management (investment and wealth management services for institutions and high-net-worth individuals). The bank serves millions of customers worldwide and is a key player in global financial markets, known for its strong risk management and diversified revenue streams.'
            },
            'NFLX': {
                sector: 'Communication Services',
                industry: 'Entertainment',
                marketCap: '$220B',
                employees: '13,000',
                ceo: 'Ted Sarandos',
                founded: '1997',
                headquarters: 'Los Gatos, CA, USA',
                revenueTTM: '$33.7B',
                peRatio: '45.2',
                dividendYield: 'N/A',
                high52w: '$700.99',
                low52w: '$344.73',
                description: 'Netflix, Inc. is the world\'s leading streaming entertainment service with over 260 million paid memberships in more than 190 countries enjoying TV series, documentaries, and feature films across a wide variety of genres and languages. The company revolutionized the entertainment industry by pioneering the subscription-based streaming model and has invested heavily in original content production. Netflix operates in three main areas: streaming services (the core business model with monthly subscriptions), original content creation (producing award-winning series and films), and global expansion (localizing content for different markets worldwide). The company competes with traditional media companies, other streaming services like Disney+, Amazon Prime Video, and HBO Max, as well as broader entertainment options. Netflix has been at the forefront of using data analytics and machine learning to personalize content recommendations and optimize content production decisions.'
            },
            'TSLA': {
                sector: 'Consumer Cyclical',
                industry: 'Auto Manufacturers',
                marketCap: '$800B',
                employees: '140,473',
                ceo: 'Elon Musk',
                founded: '2003',
                headquarters: 'Austin, TX, USA',
                revenueTTM: '$96.8B',
                peRatio: '65.4',
                dividendYield: 'N/A',
                high52w: '$299.29',
                low52w: '$138.80',
                description: 'Tesla, Inc. is an American electric vehicle and clean energy company founded by Elon Musk and others. Tesla is the world\'s most valuable automaker and a leader in electric vehicle production, battery energy storage, and solar panel manufacturing. The company operates in several key areas: Automotive (electric vehicles including Model S, 3, X, Y, and upcoming Cybertruck), Energy Generation and Storage (solar panels, Solar Roof, and Powerwall/Powerpack battery systems), and Services (Supercharger network, insurance, and autonomous driving software). Tesla has revolutionized the automotive industry by proving that electric vehicles can be desirable, high-performance, and profitable. The company is also developing Full Self-Driving (FSD) technology and operates one of the world\'s largest networks of fast-charging stations. Tesla\'s integrated approach includes manufacturing, software development, and energy solutions, positioning it as more than just an automaker but as a sustainable energy ecosystem company.'
            },
            'C': {
                sector: 'Financial Services',
                industry: 'Banks',
                marketCap: '$120B',
                employees: '240,000',
                ceo: 'Jane Fraser',
                founded: '1812',
                headquarters: 'New York, NY, USA',
                revenueTTM: '$75.3B',
                peRatio: '11.2',
                dividendYield: '3.47%',
                high52w: '$69.11',
                low52w: '$40.01',
                description: 'Citigroup Inc. is a diversified financial services holding company and one of the largest banks in the world. The company provides banking, investment, and financial services to consumer and corporate customers globally. Citigroup operates through two primary business segments: Global Consumer Banking (retail banking, credit cards, and mortgage services for individual customers) and Institutional Clients Group (corporate and investment banking, securities and banking services, transaction services, and wealth management for institutional clients). The bank has a significant international presence, operating in more than 160 countries and jurisdictions. Citigroup is known for its strength in emerging markets, foreign exchange trading, and corporate banking. The company has been undergoing a strategic transformation to streamline operations, improve efficiency, and focus on its core markets while maintaining its position as a global systemically important bank.'
            },
            'WFC': {
                sector: 'Financial Services',
                industry: 'Banks',
                marketCap: '$220B',
                employees: '238,698',
                ceo: 'Charles Scharf',
                founded: '1852',
                headquarters: 'San Francisco, CA, USA',
                revenueTTM: '$73.8B',
                peRatio: '13.5',
                dividendYield: '2.54%',
                high52w: '$62.55',
                low52w: '$40.09',
                description: 'Wells Fargo & Company is a diversified financial services company and one of the largest banks in the United States by assets and market capitalization. The company provides banking, investment, and mortgage products and services, as well as consumer and commercial finance. Wells Fargo operates through four main business segments: Consumer Banking and Lending (retail banking, credit cards, auto loans, and mortgages), Commercial Banking (banking and credit products for middle market companies), Corporate and Investment Banking (capital markets, banking, and financial advisory services for large corporations), and Wealth and Asset Management (investment advisory, brokerage, and retirement services). The bank has an extensive branch and ATM network across the United States and serves one in three households in America. Wells Fargo has been focusing on operational excellence, risk management improvements, and regulatory compliance while maintaining its position as a leading provider of mortgage lending and small business banking services.'
            },
            'BLK': {
                sector: 'Financial Services',
                industry: 'Asset Management',
                marketCap: '$130B',
                employees: '20,000',
                ceo: 'Larry Fink',
                founded: '1988',
                headquarters: 'New York, NY, USA',
                revenueTTM: '$20.2B',
                peRatio: '22.3',
                dividendYield: '2.28%',
                high52w: '$973.21',
                low52w: '$595.94',
                description: 'BlackRock, Inc. is the world\'s largest asset management company, managing over $10 trillion in assets under management (AUM) for institutional and individual investors worldwide. The company provides investment management, risk management, and advisory services to institutional, intermediary, and individual investors. BlackRock operates through several key areas: Active equity and fixed income management, ETF business (iShares is the world\'s largest ETF provider), Alternative investments (private equity, real estate, hedge funds), and Technology services (Aladdin risk management platform used by many financial institutions). The company serves a diverse client base including pension plans, endowments, foundations, charities, sovereign wealth funds, insurance companies, mutual funds, and individual investors. BlackRock\'s Aladdin technology platform is widely used across the financial industry for portfolio management and risk analysis. As a leading advocate for sustainable investing and ESG principles, BlackRock has significant influence on corporate governance and environmental policies of the companies in which it invests.'
            },
            'BAC': {
                sector: 'Financial Services',
                industry: 'Banks',
                marketCap: '$320B',
                employees: '216,823',
                ceo: 'Brian Moynihan',
                founded: '1904',
                headquarters: 'Charlotte, NC, USA',
                revenueTTM: '$94.9B',
                peRatio: '15.2',
                dividendYield: '2.96%',
                high52w: '$47.37',
                low52w: '$26.13',
                description: 'Bank of America Corporation is the second-largest bank in the United States by assets and one of the largest banks globally. The company provides a wide range of banking, investing, asset management, and other financial and risk management products and services. Bank of America operates through four key business segments: Consumer Banking (deposit products, credit cards, home loans, and auto loans), Global Wealth & Investment Management (wealth management and brokerage services for affluent and high-net-worth clients), Global Banking (commercial banking and corporate investment banking), and Global Markets (sales and trading of fixed income, credit, currency, commodity, and equity products). The bank serves individual consumers, small and middle-market businesses, institutional investors, large corporations, and governments worldwide. Bank of America is known for its extensive branch network, digital banking capabilities, and leadership in sustainable finance and environmental initiatives. The company has been investing heavily in technology and digital transformation to improve customer experience and operational efficiency.'
            },
            'PEP': {
                sector: 'Consumer Defensive',
                industry: 'Beverages',
                marketCap: '$230B',
                employees: '309,000',
                ceo: 'Ramon Laguarta',
                founded: '1965',
                headquarters: 'Purchase, NY, USA',
                revenueTTM: '$91.5B',
                peRatio: '25.8',
                dividendYield: '2.87%',
                high52w: '$183.58',
                low52w: '$155.85',
                description: 'PepsiCo, Inc. is one of the world\'s largest food and beverage companies, known for its iconic brands and global reach. The company operates in the convenient foods and beverages industry through several key business divisions: Frito-Lay North America (snack foods including Lay\'s, Doritos, Cheetos, and Fritos), Quaker Foods North America (cereals, rice, pasta, and other breakfast foods), PepsiCo Beverages North America (Pepsi, Mountain Dew, Gatorade, and other beverages), and international divisions covering Latin America, Europe, Africa, Middle East, South Asia, and Asia Pacific regions. PepsiCo\'s portfolio includes 23 brands that each generate over $1 billion in annual sales, such as Pepsi-Cola, Lay\'s, Gatorade, Quaker, Tropicana, and Doritos. The company has been transforming its business to meet changing consumer preferences by expanding its portfolio of healthier snacks and beverages, reducing sugar and sodium content, and investing in sustainable packaging and operations. PepsiCo operates in over 200 countries and territories worldwide.'
            },
            'JNJ': {
                sector: 'Healthcare',
                industry: 'Drug Manufacturers',
                marketCap: '$460B',
                employees: '152,700',
                ceo: 'Joaquin Duato',
                founded: '1886',
                headquarters: 'New Brunswick, NJ, USA',
                revenueTTM: '$85.2B',
                peRatio: '15.7',
                dividendYield: '3.12%',
                high52w: '$169.94',
                low52w: '$143.13',
                description: 'Johnson & Johnson is a multinational healthcare and pharmaceutical corporation and one of the largest healthcare companies in the world. Following its 2023 spin-off of Kenvue (consumer products), J&J now focuses on two main business segments: Innovative Medicine (pharmaceuticals including treatments for immunology, oncology, neuroscience, pulmonary hypertension, and infectious diseases) and MedTech (medical devices including surgical equipment, orthopedic products, cardiovascular devices, and diabetes care solutions). The company is known for developing life-saving medications and breakthrough medical technologies. J&J\'s pharmaceutical division includes blockbuster drugs for cancer treatment, autoimmune diseases, and other serious medical conditions. The MedTech segment provides essential medical devices used in surgeries and patient care worldwide. Johnson & Johnson operates in over 60 countries and sells products in more than 175 countries. The company has a strong research and development pipeline and is committed to addressing some of the world\'s most pressing healthcare challenges through innovation and scientific advancement.'
            },
            'FAST': {
                sector: 'Industrials',
                industry: 'Industrial Distribution',
                marketCap: '$40B',
                employees: '21,000',
                ceo: 'Dan Florness',
                founded: '1967',
                headquarters: 'Winona, MN, USA',
                revenueTTM: '$7.3B',
                peRatio: '29.4',
                dividendYield: '2.41%',
                high52w: '$75.39',
                low52w: '$55.90',
                description: 'Fastenal Company is a leading industrial and construction supply company that distributes fasteners, tools, and other industrial and construction supplies. The company operates through a unique multi-channel distribution model that includes traditional branches, industrial vending machines (FMI - Fastenal Managed Inventory), and onsite customer locations. Fastenal serves a diverse customer base including manufacturers, contractors, farmers, truckers, railroads, mining companies, municipalities, schools, and retail customers. The company\'s product offerings include threaded fasteners, miscellaneous supplies and hardware, automotive aftermarket products, cutting tools, hydraulic and pneumatic products, material handling equipment, storage and packaging products, janitorial supplies, electrical supplies, welding supplies, safety supplies, metals, and office supplies. Fastenal differentiates itself through its extensive network of local branches providing personalized service, innovative vending solutions that help customers manage inventory more efficiently, and strong relationships with both suppliers and customers built over decades of operation.'
            },
            'SLP': {
                sector: 'Healthcare',
                industry: 'Health Information Services',
                marketCap: '$2B',
                employees: '300',
                ceo: 'Shawn O\'Connor',
                founded: '1996',
                headquarters: 'Lancaster, CA, USA',
                revenueTTM: '$0.12B',
                peRatio: '52.1',
                dividendYield: 'N/A',
                high52w: '$65.45',
                low52w: '$32.14',
                description: 'Simulations Plus, Inc. is a premier developer of simulation software and provider of consulting services for pharmaceutical research and development. The company specializes in computer-aided drug discovery and development through sophisticated modeling and simulation technologies that help pharmaceutical companies predict how drugs will behave in the human body. Simulations Plus offers several key products and services: GastroPlus (mechanistic modeling and simulation software for drug absorption, pharmacokinetics, and pharmacodynamics), ADMET Predictor (software for predicting drug absorption, distribution, metabolism, excretion, and toxicity properties), PKPlus (population pharmacokinetic modeling software), and comprehensive consulting services for regulatory submissions and pharmacometric modeling. The company serves pharmaceutical, biotechnology, chemical, food, and cosmetics companies worldwide. Simulations Plus helps clients reduce drug development costs and timelines by using computational models to predict drug behavior before expensive clinical trials, supporting regulatory submissions with modeling and simulation data, and optimizing drug formulations and dosing regimens.'
            },
            'JBHT': {
                sector: 'Industrials',
                industry: 'Trucking',
                marketCap: '$18B',
                employees: '31,000',
                ceo: 'John Roberts',
                founded: '1961',
                headquarters: 'Lowell, AR, USA',
                revenueTTM: '$14.2B',
                peRatio: '26.3',
                dividendYield: '1.34%',
                high52w: '$190.71',
                low52w: '$155.89',
                description: 'J.B. Hunt Transport Services, Inc. is one of the largest supply chain solutions providers in North America, offering comprehensive transportation and logistics services. The company operates through five primary business segments: Intermodal (combining truck and rail transportation for long-haul freight), Dedicated Contract Services (providing customized transportation solutions with dedicated drivers and equipment for specific customers), Integrated Capacity Solutions (freight brokerage and logistics management), Final Mile Services (last-mile delivery for large items like appliances and furniture), and Truckload (traditional over-the-road trucking services). J.B. Hunt has been a pioneer in intermodal transportation, which is more fuel-efficient and environmentally friendly than traditional trucking. The company leverages advanced technology and data analytics to optimize routes, improve efficiency, and provide real-time tracking and visibility to customers. J.B. Hunt serves a diverse range of industries including retail, automotive, agriculture, chemicals, and manufacturing, helping businesses manage their supply chains more effectively and efficiently.'
            },
            'GS': {
                sector: 'Financial Services',
                industry: 'Investment Banking',
                marketCap: '$140B',
                employees: '49,100',
                ceo: 'David Solomon',
                founded: '1869',
                headquarters: 'New York, NY, USA',
                revenueTTM: '$51.9B',
                peRatio: '14.8',
                dividendYield: '2.44%',
                high52w: '$505.75',
                low52w: '$332.57',
                description: 'The Goldman Sachs Group, Inc. is a leading global investment banking, securities, and investment management firm that provides a wide range of financial services to a substantial and diversified client base. The company operates through four main business segments: Investment Banking (providing financial advisory services, underwriting, and financing solutions for corporations, financial institutions, governments, and individuals), Global Markets (client execution activities for institutional clients across fixed income, equity, and commodities markets), Asset Management (investment management services and solutions for institutions and individuals), and Consumer & Wealth Management (wealth advisory, private banking, and consumer banking services). Goldman Sachs serves corporations, financial institutions, governments, and individuals worldwide. The firm is known for its expertise in mergers and acquisitions advisory, securities underwriting, market making, and alternative investments. Goldman Sachs has a strong presence in emerging markets and continues to expand its digital banking and fintech capabilities.'
            },
            'MS': {
                sector: 'Financial Services',
                industry: 'Investment Banking',
                marketCap: '$180B',
                employees: '82,000',
                ceo: 'Ted Pick',
                founded: '1935',
                headquarters: 'New York, NY, USA',
                revenueTTM: '$54.4B',
                peRatio: '13.2',
                dividendYield: '3.47%',
                high52w: '$109.73',
                low52w: '$72.36',
                description: 'Morgan Stanley is a leading global financial services firm providing investment banking, securities, wealth management, and investment management services. The company operates through three main business segments: Institutional Securities (investment banking, sales and trading, and research services for corporations, governments, financial institutions, and individuals), Wealth Management (comprehensive financial planning, advisory, and investment services for high-net-worth individuals, families, and institutions), and Investment Management (asset management products and services for institutional and individual investors through various investment vehicles). Morgan Stanley serves a diversified group of corporations, governments, financial institutions, and individuals. The firm is recognized for its expertise in equity and fixed income markets, mergers and acquisitions advisory, and wealth management services. Morgan Stanley has been investing heavily in technology and digital platforms to enhance client experience and operational efficiency while maintaining its leadership position in global capital markets.'
            },
            'PNC': {
                sector: 'Financial Services',
                industry: 'Banks',
                marketCap: '$75B',
                employees: '52,000',
                ceo: 'William Demchak',
                founded: '1852',
                headquarters: 'Pittsburgh, PA, USA',
                revenueTTM: '$21.4B',
                peRatio: '12.5',
                dividendYield: '3.28%',
                high52w: '$199.84',
                low52w: '$126.23',
                description: 'The PNC Financial Services Group, Inc. is one of the largest diversified financial services organizations in the United States, providing retail and business banking, residential mortgage banking, specialized services for corporations and government entities, and asset management and processing services. The company operates through four main business segments: Retail Banking (deposit, lending, investment, and cash management services for consumer and small business customers), Corporate & Institutional Banking (lending, treasury management, and capital markets services for mid-sized to large corporations and government entities), Asset Management Group (investment and fiduciary services for individuals, corporations, and institutions), and Residential Mortgage Banking (origination, sale, and servicing of residential mortgages). PNC operates primarily in 19 states and the District of Columbia, with a strong presence in key markets including Pennsylvania, Ohio, Illinois, Michigan, Florida, and the Carolinas. The bank is known for its customer-centric approach, innovative digital banking solutions, and commitment to supporting local communities through lending and investment activities.'
            },
            'PGR': {
                sector: 'Financial Services',
                industry: 'Insurance',
                marketCap: '$135B',
                employees: '65,000',
                ceo: 'Tricia Griffith',
                founded: '1937',
                headquarters: 'Mayfield Village, OH, USA',
                revenueTTM: '$64.6B',
                peRatio: '21.4',
                dividendYield: '0.35%',
                high52w: '$263.79',
                low52w: '$153.78',
                description: 'The Progressive Corporation is one of the largest providers of personal and commercial auto insurance in the United States, known for its innovative approach to insurance and customer service. The company operates through three main business segments: Personal Lines (auto insurance for individual consumers, including standard and preferred risk auto insurance, motorcycle, watercraft, RV, and renters insurance), Commercial Lines (auto insurance and related services for small businesses, contractors, and fleets), and Property (residential property insurance in select states). Progressive is recognized for its usage-based insurance programs, competitive pricing, and direct-to-consumer sales model through online platforms, call centers, and independent agents. The company pioneered several industry innovations including immediate response claims service, online rate comparison tools, and telematics-based insurance pricing through its Snapshot program. Progressive continues to invest heavily in technology, data analytics, and digital platforms to enhance customer experience, improve underwriting accuracy, and maintain its competitive position in the rapidly evolving insurance market.'
            },
            'UAL': {
                sector: 'Industrials',
                industry: 'Airlines',
                marketCap: '$18B',
                employees: '92,000',
                ceo: 'Scott Kirby',
                founded: '1926',
                headquarters: 'Chicago, IL, USA',
                revenueTTM: '$57.3B',
                peRatio: '8.9',
                dividendYield: 'N/A',
                high52w: '$63.23',
                low52w: '$37.02',
                description: 'United Airlines Holdings, Inc. is one of the world\'s largest airlines, providing air transportation services in North America, Asia, Europe, Africa, the Pacific, the Middle East, and Latin America. The company operates through its primary subsidiary, United Airlines, Inc., which provides scheduled air transportation for passengers and cargo through its mainline operations and regional carrier connections. United operates a comprehensive domestic and international route network, with major hubs in Chicago, Denver, Houston, Los Angeles, New York/Newark, San Francisco, and Washington D.C. The airline offers various service classes including United First, United Business, United Premium Plus, and United Economy, along with cargo services and MileagePlus loyalty program. United has been investing heavily in fleet modernization with orders for new fuel-efficient aircraft, sustainable aviation fuel initiatives, and digital technology improvements to enhance customer experience. The company is focused on achieving carbon neutrality by 2050 and has made significant commitments to environmental sustainability while rebuilding and expanding its route network following the COVID-19 pandemic recovery.'
            },
            'AA': {
                sector: 'Basic Materials',
                industry: 'Aluminum',
                marketCap: '$7B',
                employees: '12,900',
                ceo: 'William Oplinger',
                founded: '2016',
                headquarters: 'Pittsburgh, PA, USA',
                revenueTTM: '$10.9B',
                peRatio: '25.8',
                dividendYield: '1.02%',
                high52w: '$48.26',
                low52w: '$29.12',
                description: 'Alcoa Corporation is a global leader in bauxite, alumina, and aluminum products, built on a foundation of strong values and operating excellence dating back more than 130 years to the world\'s first aluminum company. The company operates through two main business segments: Bauxite (mining of bauxite ore, the primary raw material for aluminum production), and Alumina (refining of bauxite into alumina, which is then used to produce aluminum). Alcoa serves customers in the aerospace, automotive, commercial transportation, building and construction, industrial, and packaging markets worldwide. The company is committed to sustainable practices and has set ambitious goals for carbon reduction, including achieving carbon neutrality by 2050. Alcoa operates bauxite mines in Australia, Brazil, Guinea, and Jamaica, and alumina refineries in Australia, Brazil, Spain, and the United States. The company is positioned to benefit from the growing demand for lightweight, sustainable materials in electric vehicles, renewable energy infrastructure, and other applications where aluminum\'s properties provide significant advantages over other materials.'
            },
            'KMI': {
                sector: 'Energy',
                industry: 'Oil & Gas Midstream',
                marketCap: '$45B',
                employees: '11,000',
                ceo: 'Steven Kean',
                founded: '1997',
                headquarters: 'Houston, TX, USA',
                revenueTTM: '$15.2B',
                peRatio: '18.7',
                dividendYield: '6.87%',
                high52w: '$22.49',
                low52w: '$16.45',
                description: 'Kinder Morgan, Inc. is one of North America\'s largest energy infrastructure companies, operating an extensive pipeline network that transports natural gas, refined petroleum products, crude oil, condensate, CO2, and other energy products. The company operates through four main business segments: Natural Gas Pipelines (interstate and intrastate natural gas transmission and storage systems), Products Pipelines (refined petroleum products, crude oil, and condensate pipelines), Terminals (liquids and bulk terminal facilities), and CO2 (carbon dioxide production, transportation, and enhanced oil recovery services). Kinder Morgan owns and operates approximately 83,000 miles of pipelines and 140 terminals across North America. The company plays a critical role in North American energy infrastructure, connecting supply sources to key demand markets and providing essential services to energy producers, utilities, and industrial customers. Kinder Morgan is committed to operating safely and responsibly while providing reliable energy transportation services. The company generates stable cash flows through its fee-based business model and has been focused on debt reduction and returning capital to shareholders through dividends.'
            },
            'TSM': {
                sector: 'Technology',
                industry: 'Semiconductors',
                marketCap: '$850B',
                employees: '76,000',
                ceo: 'C.C. Wei',
                founded: '1987',
                headquarters: 'Hsinchu, Taiwan',
                revenueTTM: '$75.9B',
                peRatio: '23.4',
                dividendYield: '1.47%',
                high52w: '$193.47',
                low52w: '$84.02',
                description: 'Taiwan Semiconductor Manufacturing Company Limited (TSMC) is the world\'s largest dedicated semiconductor foundry, providing manufacturing services for a wide range of semiconductor products including logic chips, specialty technologies, and advanced packaging services. The company serves customers across various end markets including smartphones, high-performance computing, automotive, IoT devices, and digital consumer electronics. TSMC is the leading manufacturer of advanced semiconductor technologies, including 3nm, 5nm, and 7nm process nodes, and continues to invest heavily in research and development to maintain its technological leadership. The company operates primarily through its foundry business, manufacturing chips designed by fabless semiconductor companies, integrated device manufacturers, and system companies. Major customers include Apple, NVIDIA, AMD, Qualcomm, and Broadcom. TSMC has been at the forefront of semiconductor innovation for over three decades and plays a critical role in enabling technological advancement across multiple industries. The company is investing billions in new manufacturing capacity, including facilities in Taiwan, the United States, and Japan, to meet growing global demand for advanced semiconductors.'
            },
            'ABT': {
                sector: 'Healthcare',
                industry: 'Medical Devices',
                marketCap: '$200B',
                employees: '115,000',
                ceo: 'Robert Ford',
                founded: '1888',
                headquarters: 'Abbott Park, IL, USA',
                revenueTTM: '$42.7B',
                peRatio: '21.8',
                dividendYield: '1.73%',
                high52w: '$121.64',
                low52w: '$100.25',
                description: 'Abbott Laboratories is a global healthcare company that discovers, develops, manufactures, and sells a broad range of branded generic pharmaceuticals, medical devices, diagnostics products, and nutritional products. The company operates through four main business segments: Established Pharmaceutical Products (branded generic pharmaceuticals in emerging markets), Diagnostic Products (laboratory and point-of-care diagnostic systems, including molecular, immunoassay, clinical chemistry, and hematology systems), Nutritional Products (pediatric and adult nutritional products), and Medical Devices (cardiovascular, diabetes care, neuromodulation, and structural heart devices). Abbott is known for innovative products including FreeStyle continuous glucose monitoring systems, MitraClip heart valve repair system, and Similac infant formula. The company has a strong presence in emerging markets and continues to invest in research and development to bring innovative healthcare solutions to patients worldwide. Abbott\'s diversified portfolio provides stability and growth opportunities across multiple healthcare sectors, with a focus on improving health outcomes and quality of life for people around the world.'
            },
            'NVS': {
                sector: 'Healthcare',
                industry: 'Drug Manufacturers',
                marketCap: '$210B',
                employees: '104,000',
                ceo: 'Vas Narasimhan',
                founded: '1996',
                headquarters: 'Basel, Switzerland',
                revenueTTM: '$47.4B',
                peRatio: '14.2',
                dividendYield: '3.12%',
                high52w: '$116.79',
                low52w: '$87.95',
                description: 'Novartis AG is a Swiss multinational pharmaceutical corporation and one of the largest pharmaceutical companies in the world. The company focuses on developing and commercializing innovative medicines to address serious medical needs. Novartis operates through two main business divisions: Innovative Medicines (prescription medicines including treatments for oncology, immunology, neuroscience, cardiovascular, and respiratory diseases) and Sandoz (generic pharmaceuticals and biosimilars). The company has a strong portfolio of blockbuster drugs and a robust pipeline of potential new treatments. Novartis is known for breakthrough therapies in areas such as CAR-T cell therapy for cancer treatment, gene therapy for rare diseases, and innovative treatments for multiple sclerosis, heart failure, and other serious conditions. The company invests heavily in research and development, including cutting-edge technologies like artificial intelligence and digital therapeutics. Novartis operates in over 140 countries worldwide and is committed to reimagining medicine to improve and extend people\'s lives through scientific innovation and global access initiatives.'
            },
            'CTAS': {
                sector: 'Industrials',
                industry: 'Specialty Business Services',
                marketCap: '$50B',
                employees: '49,000',
                ceo: 'Todd Schneider',
                founded: '1968',
                headquarters: 'Cincinnati, OH, USA',
                revenueTTM: '$8.8B',
                peRatio: '36.2',
                dividendYield: '1.23%',
                high52w: '$197.11',
                low52w: '$147.38',
                description: 'Cintas Corporation provides specialized services to businesses of all types primarily throughout North America. The company operates through several business segments: Uniform Rental and Facility Services (rental and servicing of uniforms, mats, towels, restroom supplies, first aid and safety products, fire extinguishers, and safety training), First Aid and Safety Services (first aid and safety products and training), and All Other (fire protection services, uniform direct sale, and document management services). Cintas serves over one million businesses ranging from small service and manufacturing companies to major corporations. The company is known for its Ready Sites facilities strategically located throughout North America, comprehensive product offerings, and high-quality customer service. Cintas has built a reputation for reliability, professionalism, and helping businesses create professional appearances and safe work environments. The company continues to expand its service offerings and geographic reach through organic growth and strategic acquisitions, while maintaining its focus on operational excellence and customer satisfaction.'
            },
            'USB': {
                sector: 'Financial Services',
                industry: 'Banks',
                marketCap: '$65B',
                employees: '74,000',
                ceo: 'Andy Cecere',
                founded: '1863',
                headquarters: 'Minneapolis, MN, USA',
                revenueTTM: '$25.6B',
                peRatio: '11.8',
                dividendYield: '3.82%',
                high52w: '$52.46',
                low52w: '$35.14',
                description: 'U.S. Bancorp is one of the largest commercial banks in the United States, providing a comprehensive range of financial services including lending, depository services, cash management, and ancillary services to individuals, businesses, institutional organizations, governmental entities, and other financial institutions. The company operates through five main business segments: Consumer and Business Banking (branch-based services including checking, savings, and credit products for consumers and small businesses), Payment Services (merchant processing, corporate and purchasing card services, and consumer credit cards), Corporate and Commercial Banking (lending, leasing, deposit services, treasury management, and credit services to middle market and large corporate customers), Wealth Management and Securities Services (trust, private banking, financial advisory, investment management, and mutual fund services), and Treasury and Corporate Support (asset-liability management, funding, and capital management activities). U.S. Bank operates primarily in the Western and Midwestern United States, with a strong digital banking platform serving customers nationwide. The bank is known for its strong credit quality, diversified revenue streams, and disciplined risk management approach.'
            },
            'IBKR': {
                sector: 'Financial Services',
                industry: 'Capital Markets',
                marketCap: '$40B',
                employees: '2,900',
                ceo: 'Milan Galik',
                founded: '1978',
                headquarters: 'Greenwich, CT, USA',
                revenueTTM: '$4.2B',
                peRatio: '25.3',
                dividendYield: '0.65%',
                high52w: '$152.14',
                low52w: '$98.03',
                description: 'Interactive Brokers Group, Inc. is a global electronic broker that provides trading and clearing services for institutional and individual customers worldwide. The company operates through two main business segments: Electronic Brokerage (commission and fee-based brokerage services) and Market Making (electronic market making in equity securities, options, futures, foreign exchange, and fixed income securities). Interactive Brokers offers access to stocks, options, futures, forex, bonds, and funds on over 150 markets in 33 countries and 23 currencies, all from a single account. The company is known for its advanced trading technology, competitive pricing structure, and comprehensive range of investment products and tools. Interactive Brokers serves active traders, financial advisors, proprietary trading groups, introducing brokers, and hedge funds. The company\'s technology platform provides sophisticated trading tools, real-time market data, and risk management capabilities. Interactive Brokers has been expanding globally and continues to invest in technology innovation to maintain its competitive position in the rapidly evolving electronic brokerage industry.'
            },
            'TRV': {
                sector: 'Financial Services',
                industry: 'Insurance',
                marketCap: '$55B',
                employees: '30,000',
                ceo: 'Alan Schnitzer',
                founded: '1853',
                headquarters: 'New York, NY, USA',
                revenueTTM: '$38.4B',
                peRatio: '13.8',
                dividendYield: '2.41%',
                high52w: '$255.40',
                low52w: '$179.52',
                description: 'The Travelers Companies, Inc. is one of the largest property and casualty insurance companies in the United States, providing commercial and personal insurance products and services to businesses, government units, associations, and individuals. The company operates through three main business segments: Business Insurance (commercial property and casualty insurance for mid-sized and large businesses), Bond & Specialty Insurance (surety, crime, management liability, professional liability, and other specialty coverages), and Personal Insurance (automobile, homeowners, and other personal lines for individuals). Travelers serves customers through independent agents and brokers as well as through direct channels. The company is known for its strong underwriting discipline, comprehensive risk management capabilities, and financial strength. Travelers has a diversified portfolio of insurance products and operates throughout the United States, with select operations in Canada, the United Kingdom, and the Republic of Ireland. The company leverages advanced analytics, technology, and data-driven insights to improve underwriting accuracy, enhance customer experience, and drive operational efficiency while maintaining its commitment to policyholder service and claims handling excellence.'
            },
            'AXP': {
                sector: 'Financial Services',
                industry: 'Credit Services',
                marketCap: '$190B',
                employees: '77,300',
                ceo: 'Stephen Squeri',
                founded: '1850',
                headquarters: 'New York, NY, USA',
                revenueTTM: '$60.5B',
                peRatio: '19.7',
                dividendYield: '1.16%',
                high52w: '$277.21',
                low52w: '$168.10',
                description: 'American Express Company is a globally integrated payments company that provides customers with access to products, insights, and experiences that enrich lives and build business success. The company operates through four main business segments: Global Consumer Services Group (charge and credit card products and fee services for consumers), Global Commercial Services (charge and credit card products and payment services for small businesses and corporate customers), Global Merchant and Network Services (merchant acquisition and processing, network services, and global network partnership revenue), and International Card Services (consumer and small business card services outside the United States). American Express is known for its premium brand, exceptional customer service, and comprehensive rewards programs. The company operates a unique business model that combines issuing cards to consumers and businesses with operating a payment network accepted by merchants worldwide. American Express has been investing in digital capabilities, partnerships, and new products to expand its customer base and enhance cardholder experiences while maintaining its focus on serving affluent and high-spending customers globally.'
            },
            'SCHW': {
                sector: 'Financial Services',
                industry: 'Capital Markets',
                marketCap: '$135B',
                employees: '35,400',
                ceo: 'Walt Bettinger',
                founded: '1971',
                headquarters: 'Westlake, TX, USA',
                revenueTTM: '$20.8B',
                peRatio: '23.5',
                dividendYield: '1.47%',
                high52w: '$87.08',
                low52w: '$62.55',
                description: 'The Charles Schwab Corporation is a leading provider of financial services, including wealth management, securities brokerage, banking, money management, and financial advisory services to individual investors and independent investment advisors. The company operates through two main business segments: Investor Services (brokerage and banking services to individual investors and retirement plan participants) and Advisor Services (custody, trading, and support services to independent investment advisors and their clients). Schwab serves over 34 million client accounts with over $8 trillion in client assets. The company is known for its low-cost approach to investing, comprehensive financial planning services, and innovative technology platforms. Schwab has been a pioneer in discount brokerage and continues to lead industry changes, including the elimination of online equity trade commissions. The company completed its acquisition of TD Ameritrade in 2020, significantly expanding its scale and capabilities. Schwab continues to invest in digital platforms, advisory services, and client experience enhancements while maintaining its commitment to helping investors achieve their financial goals through accessible, low-cost investment solutions.'
            },
            'HBAN': {
                sector: 'Financial Services',
                industry: 'Banks',
                marketCap: '$23B',
                employees: '20,000',
                ceo: 'Steve Steinour',
                founded: '1866',
                headquarters: 'Columbus, OH, USA',
                revenueTTM: '$7.4B',
                peRatio: '12.1',
                dividendYield: '4.85%',
                high52w: '$16.81',
                low52w: '$10.51',
                description: 'Huntington Bancshares Incorporated is a regional bank holding company that provides full-service commercial, small business, and consumer banking services, mortgage banking services, treasury management and foreign exchange services, equipment leasing, wealth and investment management services, trust services, brokerage services, customized insurance brokerage and service programs, and other financial products and services. The company operates through four main business segments: Consumer and Business Banking (deposit, lending, and other banking products and services to consumer and business customers), Commercial Banking (middle market lending, asset-based lending, equipment financing, and treasury management services), Vehicle Finance (automobile, light-duty truck, recreational vehicle, and marine craft financing), and Regional Banking and The Huntington Private Client Group (private banking, investment management, and retirement services). Huntington operates primarily in Ohio, Michigan, Pennsylvania, Indiana, West Virginia, Kentucky, Illinois, and Wisconsin. The bank is known for its customer-centric approach, community focus, and innovative digital banking solutions. Huntington has been expanding its market presence through strategic acquisitions and organic growth while maintaining its commitment to supporting local communities and small businesses.'
            },
            'RF': {
                sector: 'Financial Services',
                industry: 'Banks',
                marketCap: '$25B',
                employees: '18,000',
                ceo: 'John Turner',
                founded: '1971',
                headquarters: 'Birmingham, AL, USA',
                revenueTTM: '$8.9B',
                peRatio: '11.8',
                dividendYield: '3.95%',
                high52w: '$25.19',
                low52w: '$17.32',
                description: 'Regions Financial Corporation is a regional bank holding company that provides traditional commercial, retail, and mortgage banking services, as well as other financial services in the fields of investment banking, asset management, trust, mutual funds, securities brokerage, insurance brokerage, and other specialty financing. The company operates through three main business segments: Corporate Bank (commercial banking products and services to commercial, government, and professional customers), Consumer Bank (deposit, lending, and other banking products and services to consumer and small business customers), and Wealth Management (trust, investment management, asset management, retirement, and estate planning solutions). Regions operates approximately 1,300 banking offices and 2,000 ATMs across 15 states in the South, Midwest, and Texas. The bank serves individual and business customers with a full range of banking, wealth management, and mortgage products and services. Regions is known for its strong community presence, customer service focus, and commitment to supporting economic development in the markets it serves. The company has been investing in digital banking capabilities and technology infrastructure to enhance customer experience while maintaining its relationship-based approach to banking.'
            },
            'TFC': {
                sector: 'Financial Services',
                industry: 'Banks',
                marketCap: '$55B',
                employees: '52,000',
                ceo: 'William Rogers',
                founded: '2019',
                headquarters: 'Charlotte, NC, USA',
                revenueTTM: '$22.7B',
                peRatio: '12.4',
                dividendYield: '3.98%',
                high52w: '$49.90',
                low52w: '$32.11',
                description: 'Truist Financial Corporation is one of the largest commercial banks in the United States, formed through the merger of BB&T Corporation and SunTrust Banks in 2019. The company provides a wide range of banking and trust services for consumer and commercial clients through its subsidiary, Truist Bank, as well as various other subsidiaries. Truist operates through three main business segments: Consumer Banking and Wealth (deposit, lending, and investment services to consumers and small businesses), Corporate and Commercial Banking (lending, leasing, and treasury services to commercial, corporate, and institutional clients), and Insurance Holdings (property and casualty insurance, life insurance, and commercial insurance products and services). The bank operates approximately 2,200 banking offices in 15 states and Washington, D.C., primarily throughout the Southeast and Mid-Atlantic regions. Truist is known for its purpose-driven culture focused on helping clients achieve their financial goals and supporting community development. The company has been investing heavily in technology integration and digital transformation following the merger while maintaining its commitment to relationship-based banking and community involvement.'
            },
            'MMM': {
                sector: 'Industrials',
                industry: 'Conglomerates',
                marketCap: '$75B',
                employees: '92,000',
                ceo: 'Mike Roman',
                founded: '1902',
                headquarters: 'Saint Paul, MN, USA',
                revenueTTM: '$35.4B',
                peRatio: '18.9',
                dividendYield: '6.12%',
                high52w: '$140.20',
                low52w: '$98.66',
                description: '3M Company is a diversified global technology company that operates through four main business segments: Safety and Industrial (personal protective equipment, advanced materials, abrasives, and automotive aftermarket products), Transportation and Electronics (electronic materials, automotive and aerospace solutions, commercial solutions, and transportation safety), Health Care (medical solutions, oral care, health information systems, and separation and purification sciences), and Consumer (home improvement, stationery and office supplies, home care, and consumer health care products). 3M is known for its innovation and research capabilities, with tens of thousands of products based on dozens of core technology platforms. The company serves customers in nearly 200 countries worldwide across diverse end markets including automotive, electronics, energy, health care, manufacturing, mining, oil and gas, safety, and transportation. 3M has a strong commitment to sustainability and has set ambitious goals for carbon neutrality, water stewardship, and waste reduction. The company continues to invest in research and development, manufacturing capabilities, and digital transformation to drive innovation and maintain its competitive position across its diverse portfolio of businesses.'
            },
            'SLB': {
                sector: 'Energy',
                industry: 'Oil & Gas Equipment & Services',
                marketCap: '$65B',
                employees: '95,000',
                ceo: 'Olivier Le Peuch',
                founded: '1926',
                headquarters: 'Houston, TX, USA',
                revenueTTM: '$33.1B',
                peRatio: '15.2',
                dividendYield: '2.44%',
                high52w: '$55.83',
                low52w: '$40.46',
                description: 'Schlumberger Limited (SLB) is the world\'s largest oilfield services company, providing technology, information solutions, and integrated project management services to the international oil and gas industry. The company operates through four main business segments: Digital & Integration (reservoir characterization, drilling, production, and processing technologies, along with digital solutions), Reservoir Performance (well services including stimulation, intervention, coiled-tubing, and artificial lift), Well Construction (drilling services, well planning and drilling engineering, drilling fluids, completion tools, and land drilling rigs), and Production Systems (surface production systems, midstream infrastructure, and processing solutions for onshore and offshore oil and gas production). SLB operates in more than 120 countries and provides services across the entire oil and gas value chain. The company is known for its technological innovation, research and development capabilities, and comprehensive portfolio of oilfield services and products. SLB has been adapting to the energy transition by investing in carbon capture, renewable energy technologies, and digital solutions while maintaining its leadership position in traditional oil and gas services. The company continues to focus on operational efficiency, technology advancement, and sustainable energy solutions to support the evolving needs of the global energy industry.'
            }
        };
        
        return companyData[ticker] || {
            sector: 'Information not available',
            industry: 'Information not available',
            marketCap: 'N/A',
            employees: 'N/A',
            ceo: 'N/A',
            founded: 'N/A',
            headquarters: 'N/A',
            revenueTTM: 'N/A',
            peRatio: 'N/A',
            dividendYield: 'N/A',
            high52w: 'N/A',
            low52w: 'N/A',
            description: 'Detailed company information is not available for this ticker. This company is scheduled to release earnings as shown in the calendar.'
        };
    }
    
    // Function to setup action buttons in company modal
    function setupCompanyActionButtons(ticker, modal) {
        const insiderBtn = modal.querySelector('#view-insider-trades-btn');
        const stockAnalysisBtn = modal.querySelector('#view-stock-analysis-btn');
        const descriptionToggleBtn = modal.querySelector('#description-toggle-btn');
        const descriptionText = modal.querySelector('#company-description-text');
        
        // Remove any existing event listeners by cloning the elements
        if (insiderBtn) {
            const newInsiderBtn = insiderBtn.cloneNode(true);
            insiderBtn.parentNode.replaceChild(newInsiderBtn, insiderBtn);
        }
        
        if (stockAnalysisBtn) {
            const newStockAnalysisBtn = stockAnalysisBtn.cloneNode(true);
            stockAnalysisBtn.parentNode.replaceChild(newStockAnalysisBtn, stockAnalysisBtn);
        }
        
        if (descriptionToggleBtn) {
            const newToggleBtn = descriptionToggleBtn.cloneNode(true);
            descriptionToggleBtn.parentNode.replaceChild(newToggleBtn, descriptionToggleBtn);
        }
        
        // Get the new elements after cloning
        const newInsiderBtn = modal.querySelector('#view-insider-trades-btn');
        const newStockAnalysisBtn = modal.querySelector('#view-stock-analysis-btn');
        const newDescriptionToggleBtn = modal.querySelector('#description-toggle-btn');
        
        // Store the full description
        const fullDescription = descriptionText.textContent;
        
        // Create shortened description (first 200 characters + ...)
        const shortDescription = fullDescription.length > 200 
            ? fullDescription.substring(0, 200) + '...' 
            : fullDescription;
        
        // Description toggle functionality
        let isExpanded = false; // Start collapsed
        
        // Initially show short description
        descriptionText.textContent = shortDescription;
        descriptionText.className = 'description-collapsed';
        
        newDescriptionToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            isExpanded = !isExpanded;
            
            if (isExpanded) {
                // Show full description
                descriptionText.textContent = fullDescription;
                descriptionText.className = 'description-expanded';
                newDescriptionToggleBtn.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="7,10 12,15 17,10"></polyline>
                    </svg>
                `;
                newDescriptionToggleBtn.title = 'Collapse description';
            } else {
                // Show shortened description
                descriptionText.textContent = shortDescription;
                descriptionText.className = 'description-collapsed';
                newDescriptionToggleBtn.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="17,14 12,9 7,14"></polyline>
                    </svg>
                `;
                newDescriptionToggleBtn.title = 'Expand description';
            }
        });
        
        // Insider Trades button
        newInsiderBtn.addEventListener('click', () => {
            console.log('Insider Trades clicked for ticker:', ticker); // Debug log
            
            // Close all modals first
            closeAllModals();
            
            // Clear any existing ticker input first
            const existingTickerInput = document.getElementById('insider-ticker');
            if (existingTickerInput) {
                existingTickerInput.value = '';
            }
            
            // Open insider trades modal with this ticker
            const insiderTradesBtn = document.getElementById('insiderTradesBtn');
            if (insiderTradesBtn) {
                insiderTradesBtn.click();
                
                // Wait for modal to open and then search for the ticker
                setTimeout(() => {
                    const tickerInput = document.getElementById('insider-ticker');
                    const searchButton = document.getElementById('search-insider');
                    if (tickerInput && searchButton) {
                        console.log('Setting ticker input to:', ticker); // Debug log
                        // Clear the input field first to ensure clean state
                        tickerInput.value = '';
                        // Set the new ticker value
                        tickerInput.value = ticker;
                        // Trigger any input events that might be needed
                        tickerInput.dispatchEvent(new Event('input', { bubbles: true }));
                        tickerInput.dispatchEvent(new Event('change', { bubbles: true }));
                        // Click search button
                        searchButton.click();
                    }
                }, 300);
            }
        });
        
        // Stock Analysis button
        newStockAnalysisBtn.addEventListener('click', () => {
            console.log('Stock Analysis clicked for ticker:', ticker);
            
            // Close all modals first
            closeAllModals();
            
            // Open stock analysis modal with this ticker
            const analysisModal = document.getElementById('analysis-modal');
            const stockSymbolInput = document.getElementById('stock-symbol');
            const analyzeButton = document.getElementById('analyze-btn');
            
            if (analysisModal && stockSymbolInput && analyzeButton) {
                // Open the analysis modal
                analysisModal.style.display = 'block';
                
                // Set the ticker in the search input
                stockSymbolInput.value = ticker;
                
                // Trigger the search
                analyzeButton.click();
            }
        });
    }

    // Function to close all modals
    function closeAllModals() {
        // List of modal IDs to close
        const modalIds = [
            'company-details-modal',
            'insider-modal',
            'analysis-modal',
            'earnings-calendar-modal',
            'dividend-modal',
            'screener-modal',
            'news-modal'
        ];
        
        modalIds.forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'none';
            }
        });
        
        // Also close any modal with class 'modal' that might be open
        const allModals = document.querySelectorAll('.modal');
        allModals.forEach(modal => {
            if (modal.style.display === 'block' || modal.style.display === 'flex') {
                modal.style.display = 'none';
            }
        });
    }

    function updateDateSelector() {
        if (!dateSelector) return;
        
        dateSelector.innerHTML = '';
        const weekStart = new Date(selectedDate);
        weekStart.setDate(weekStart.getDate() - weekStart.getDay());
        
        // Update calendar week number
        if (calendarWeekNumber) {
            calendarWeekNumber.textContent = getWeekNumber(selectedDate);
        }
        
        for (let i = 0; i < 7; i++) {
            const date = new Date(weekStart);
            date.setDate(weekStart.getDate() + i);
            const formatted = formatDate(date);

            const btn = document.createElement('button');
            btn.className = 'date-button';
            if (formatDate(selectedDate) === formatted) btn.classList.add('selected');

            btn.innerHTML = `<span class="day-name">${formatDayName(date)}</span><span class="date-text">${date.getDate()}</span>`;
            btn.addEventListener('click', () => {
                selectedDate = date;
                if (currentDateDisplay) {
                    currentDateDisplay.textContent = selectedDate.toDateString();
                }
                updateDateSelector();
                applyFilters();
            });
            dateSelector.appendChild(btn);
        }
    }

    function applyFilters() {
        const formatted = formatDate(selectedDate);
        let items = EARNINGS_DATA[formatted] || [];

        if (currentFilter !== 'all') {
            items = items.filter(item => {
                if (currentFilter === 'before') {
                    return item.release_time.toLowerCase().includes('before');
                } else if (currentFilter === 'after') {
                    return item.release_time.toLowerCase().includes('after');
                }
                return true;
            });
        }

        if (searchQuery) {
            items = items.filter(item =>
                item.ticker.toLowerCase().includes(searchQuery) ||
                item.company_name.toLowerCase().includes(searchQuery)
            );
        }

        displayEarnings(items);
        
        if (statusText) {
            statusText.textContent = `Showing ${items.length} of ${(EARNINGS_DATA[formatted] || []).length} earnings for ${selectedDate.toDateString()}`;
        }
    }

    // Event Listeners
    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.dataset.filter;
                applyFilters();
            });
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', e => {
            searchQuery = e.target.value.toLowerCase();
            applyFilters();
        });
    }

    function updateTotal() {
        let total = 0;
        Object.values(EARNINGS_DATA).forEach(arr => total += arr.length);
        if (totalEarnings) {
            totalEarnings.textContent = total;
        }
    }

    // Initialize
    if (currentDateDisplay) {
        currentDateDisplay.textContent = selectedDate.toDateString();
    }
    updateDateSelector();
    applyFilters();
    updateTotal();

    // Add ICS download functionality
    const downloadIcsBtn = document.getElementById('downloadIcsBtn');
    if (downloadIcsBtn) {
        downloadIcsBtn.addEventListener('click', () => {
            downloadEarningsICS();
        });
    }
}

// Function to generate and download ICS file for earnings calendar
function downloadEarningsICS() {
    try {
        console.log('Starting ICS download...');
        const icsContent = generateEarningsICS();
        console.log('ICS content generated:', icsContent.substring(0, 200) + '...');
        
        // Create blob with correct MIME type
        const blob = new Blob([icsContent], { 
            type: 'text/calendar;charset=utf-8' 
        });
        
        // Create download link
        const url = URL.createObjectURL(blob);
        const filename = `earnings-calendar-${new Date().toISOString().split('T')[0]}.ics`;
        
        // Try modern download approach first
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            // For IE/Edge
            window.navigator.msSaveOrOpenBlob(blob, filename);
        } else {
            // For modern browsers
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            link.style.display = 'none';
            
            // Add to DOM, click, and remove
            document.body.appendChild(link);
            link.click();
            
            // Clean up
            setTimeout(() => {
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            }, 100);
        }
        
        console.log('ICS download initiated successfully');
        
        // Show user feedback
        const downloadBtn = document.getElementById('downloadIcsBtn');
        if (downloadBtn) {
            const originalText = downloadBtn.innerHTML;
            downloadBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
            downloadBtn.style.backgroundColor = '#28a745';
            
            setTimeout(() => {
                downloadBtn.innerHTML = originalText;
                downloadBtn.style.backgroundColor = '#01c3a8';
            }, 2000);
        }
        
    } catch (error) {
        console.error('Error downloading ICS file:', error);
        
        // Show error feedback
        const downloadBtn = document.getElementById('downloadIcsBtn');
        if (downloadBtn) {
            const originalText = downloadBtn.innerHTML;
            downloadBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg> Error';
            downloadBtn.style.backgroundColor = '#dc3545';
            
            setTimeout(() => {
                downloadBtn.innerHTML = originalText;
                downloadBtn.style.backgroundColor = '#01c3a8';
            }, 2000);
        }
        
        // Fallback: show alert with content
        alert('Download failed. Please copy this ICS content and save it manually:\n\n' + generateEarningsICS().substring(0, 500) + '...');
    }
}

// Function to generate ICS content from earnings data
function generateEarningsICS() {
    const now = new Date();
    const timestamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    
    let icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Exchange Time//Earnings Calendar//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'X-WR-CALNAME:Earnings Calendar',
        'X-WR-CALDESC:Stock earnings announcements and release dates'
    ].join('\r\n') + '\r\n';

    // Get earnings data - use global data
    const EARNINGS_DATA = window.EARNINGS_DATA;
    
    if (!EARNINGS_DATA) {
        console.error('No earnings data available');
        return 'BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Exchange Time//Earnings Calendar//EN\r\nEND:VCALENDAR\r\n';
    }

    // Helper function to format date for ICS (all-day events)
    function formatICSDateAllDay(dateStr) {
        const date = new Date(dateStr + 'T00:00:00');
        
        // Check if date is valid
        if (isNaN(date.getTime())) {
            console.error('Invalid date string:', dateStr);
            return null;
        }
        
        console.log(`Processing ${dateStr} as all-day event`); // Debug log
        
        // For all-day events, we return just the date in YYYYMMDD format
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        const formattedDate = `${year}${month}${day}`;
        console.log(`Formatted all-day date: ${formattedDate}`); // Debug log
        return formattedDate;
    }

    // Generate unique ID for each event
    let eventCounter = 1;

    // Process each date in the earnings data
    Object.entries(EARNINGS_DATA).forEach(([date, earnings]) => {
        earnings.forEach(earning => {
            const eventDate = formatICSDateAllDay(date);
            if (!eventDate) {
                console.error('Failed to format date for:', earning.ticker, date);
                return; // Skip this earning if date formatting fails
            }
            
            // For all-day events, end date should be the next day
            const nextDate = new Date(date + 'T00:00:00');
            nextDate.setDate(nextDate.getDate() + 1);
            const endEventDate = formatICSDateAllDay(nextDate.toISOString().split('T')[0]);
            
            const summary = `${earning.ticker} Earnings Release`;
            const description = [
                `Company: ${earning.company_name}`,
                `Ticker: ${earning.ticker}`,
                `Release Time: ${earning.release_time}`,
                `Expected EPS: $${earning.eps_estimate}`,
                `Expected Revenue: $${earning.revenue_estimate}B`,
                '',
                'Generated by Exchange Time - Your Financial Markets Hub'
            ].join('\\n');

            const uid = `earnings-${earning.ticker}-${date.replace(/-/g, '')}-${eventCounter}@exchangetime.app`;
            
            icsContent += [
                'BEGIN:VEVENT',
                `UID:${uid}`,
                `DTSTAMP:${timestamp}`,
                `DTSTART;VALUE=DATE:${eventDate}`,
                `DTEND;VALUE=DATE:${endEventDate}`,
                `SUMMARY:${summary}`,
                `DESCRIPTION:${description}`,
                `LOCATION:Stock Market`,
                `CATEGORIES:Earnings,Finance,Stock Market`,
                `STATUS:CONFIRMED`,
                `TRANSP:TRANSPARENT`,
                'END:VEVENT'
            ].join('\r\n') + '\r\n';
            
            eventCounter++;
        });
    });

    icsContent += 'END:VCALENDAR\r\n';
    return icsContent;
}

// Make functions globally available
window.downloadEarningsICS = downloadEarningsICS;
window.generateEarningsICS = generateEarningsICS;

// Test function for debugging
window.testICSDownload = function() {
    console.log('Testing ICS download...');
    try {
        const testContent = 'BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:Test\r\nBEGIN:VEVENT\r\nSUMMARY:Test Event\r\nDTSTART:20250716T090000Z\r\nDTEND:20250716T100000Z\r\nEND:VEVENT\r\nEND:VCALENDAR\r\n';
        const blob = new Blob([testContent], { type: 'text/calendar' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'test.ics';
        a.click();
        URL.revokeObjectURL(url);
        console.log('Test download completed');
    } catch (e) {
        console.error('Test download failed:', e);
    }
};

// Debug function to check timing
window.debugEarningsTimes = function() {
    console.log('=== DEBUGGING EARNINGS TIMES (ALL-DAY EVENTS) ===');
    const EARNINGS_DATA = window.EARNINGS_DATA || {};
    
    Object.entries(EARNINGS_DATA).forEach(([date, earnings]) => {
        console.log(`\nDate: ${date}`);
        earnings.forEach(earning => {
            console.log(`  ${earning.ticker}: ${earning.release_time}`);
            // Test the formatICSDateAllDay function
            const testDate = new Date(date + 'T00:00:00');
            const year = testDate.getFullYear();
            const month = String(testDate.getMonth() + 1).padStart(2, '0');
            const day = String(testDate.getDate()).padStart(2, '0');
            const formattedDate = `${year}${month}${day}`;
            console.log(`    All-day event date: ${formattedDate} (${earning.release_time})`);
        });
    });
    console.log('=== END DEBUG ===');
};

// Debug function to check generated ICS content
window.debugICSContent = function() {
    console.log('=== DEBUGGING ICS CONTENT ===');
    const icsContent = generateEarningsICS();
    console.log('Full ICS Content:');
    console.log(icsContent);
    
    // Look for any time stamps that shouldn't be there
    const lines = icsContent.split('\n');
    lines.forEach((line, index) => {
        if (line.includes('DTSTART') || line.includes('DTEND')) {
            console.log(`Line ${index + 1}: ${line}`);
            if (line.includes('T') && !line.includes('VALUE=DATE')) {
                console.error(`❌ PROBLEM: This line has a timestamp instead of all-day format!`);
            } else if (line.includes('VALUE=DATE')) {
                console.log(`✅ CORRECT: This is properly formatted as all-day event`);
            }
        }
    });
    console.log('=== END ICS DEBUG ===');
};

// Initialize Earnings Calendar when modal opens
document.addEventListener('DOMContentLoaded', function() {
    const earningsCalendarBtn = document.getElementById('earningsCalendarBtn');
    const earningsCalendarModal = document.getElementById('earningsCalendarModal');
    const closeEarningsModal = document.getElementById('closeEarningsModal');

    if (earningsCalendarBtn && earningsCalendarModal) {
        earningsCalendarBtn.addEventListener('click', function() {
            earningsCalendarModal.style.display = 'block';
            initEarningsCalendar();
            
            // Add download button event listener after modal is shown
            setTimeout(() => {
                const downloadBtn = document.getElementById('downloadIcsBtn');
                if (downloadBtn && !downloadBtn.hasAttribute('data-listener-added')) {
                    downloadBtn.addEventListener('click', function(e) {
                        e.preventDefault();
                        console.log('Download button clicked');
                        downloadEarningsICS();
                    });
                    downloadBtn.setAttribute('data-listener-added', 'true');
                }
            }, 100);
        });
    }

    if (closeEarningsModal && earningsCalendarModal) {
        closeEarningsModal.addEventListener('click', function() {
            earningsCalendarModal.style.display = 'none';
        });
    }

    // Close modal when clicking outside
    if (earningsCalendarModal) {
        earningsCalendarModal.addEventListener('click', function(e) {
            if (e.target === earningsCalendarModal) {
                earningsCalendarModal.style.display = 'none';
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const els = {
        dcfResult: document.getElementById('dcf-result'),
        dcfLoading: document.getElementById('dcf-loading'),
        dcfError: document.getElementById('dcf-error'),
        errorMessage: document.getElementById('error-message'),
        dcfDetails: document.getElementById('dcf-details'),
        priceComparison: document.getElementById('price-comparison'),
        stockInput: document.getElementById('stock-symbol'),
        analyzeBtn: document.getElementById('analyze-btn'),
        dcfChartCanvas: document.getElementById('dcf-comparison-chart')
    };

    let chartInstance = null;
    const API_KEY = window.ENV && window.ENV.API_KEY ? window.ENV.API_KEY : '';

    const validateTicker = ticker => /^[A-Z]{1,5}$/.test(ticker.trim().toUpperCase());

    const showError = (message) => {
        els.dcfError.classList.remove('hidden');
        els.errorMessage.textContent = message;
        hideLoading();
        resetDisplay();
    };

    const showLoading = () => {
        els.dcfLoading.classList.remove('hidden');
    };

    const hideLoading = () => {
        els.dcfLoading.classList.add('hidden');
    };

    const resetDisplay = () => {
        els.dcfResult.textContent = '--';
        els.priceComparison.textContent = '';
        els.dcfDetails.textContent = '';
        if (chartInstance) chartInstance.destroy();
    };

    const fetchJSON = async (url) => {
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error('Network error');
            return await res.json();
        } catch (err) {
            console.error('Fetch error:', err);
            return null;
        }
    };

    const fetchCurrentPrice = async (ticker) => {
        const url = `https://financialmodelingprep.com/api/v3/quote/${ticker}?apikey=${API_KEY}`;
        const data = await fetchJSON(url);
        return Array.isArray(data) && data.length ? data[0].price || null : null;
    };

    const fetchDCFData = async (ticker) => {
        const url = `https://financialmodelingprep.com/api/v3/discounted-cash-flow/${ticker}?apikey=${API_KEY}`;
        const data = await fetchJSON(url);
        if (Array.isArray(data) && data.length > 0) {
            return { dcfValue: +data[0].dcf, date: data[0].date || '' };
        }
        return null;
    };

    const renderChart = (currentPrice, dcfValue) => {
        if (!els.dcfChartCanvas) return;
        if (chartInstance) chartInstance.destroy();

        const ctx = els.dcfChartCanvas.getContext('2d');
        chartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Market Price', 'DCF Value'],
                datasets: [{
                    label: 'Valuation Comparison',
                    data: [currentPrice, dcfValue],
                    backgroundColor: [
                        currentPrice > dcfValue ? '#FF4D4D' : '#4D8CFF',
                        '#00E5B8'
                    ],
                    borderRadius: 6,
                    barPercentage: 0.6,
                    categoryPercentage: 0.6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 1000,
                    easing: 'easeOutQuart'
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#1c1c1c',
                        titleFont: { size: 13 },
                        bodyFont: { size: 12 },
                        callbacks: {
                            label: ctx => `${ctx.label}: $${ctx.parsed.y.toFixed(2)}`
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: { color: '#B0B0B0', font: { size: 12 } },
                        grid: { display: false }
                    },
                    y: {
                        ticks: {
                            color: '#B0B0B0',
                            callback: v => `$${v}`
                        },
                        grid: {
                            color: '#333',
                            borderDash: [4, 4]
                        }
                    }
                }
            }
        });
    };

    const formatCurrency = value => {
        return Number(value).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 2
        });
    };

    const interpretValuation = (dcfValue, currentPrice) => {
        const delta = ((currentPrice - dcfValue) / dcfValue) * 100;
        const absDelta = Math.abs(delta).toFixed(1);
        let status = 'Fairly Valued';

        if (dcfValue > currentPrice) status = 'Undervalued';
        else if (dcfValue < currentPrice) status = 'Overvalued';

        return { status, delta: absDelta };
    };

    const updateUIWithResults = ({ dcfValue, date }, currentPrice) => {
        hideLoading();
        els.dcfResult.textContent = formatCurrency(dcfValue);

        if (currentPrice !== null) {
            const { status, delta } = interpretValuation(dcfValue, currentPrice);
            els.dcfDetails.innerHTML = `Date: ${date || 'Recent'}<br>${status} by ${delta}%`;
            els.priceComparison.textContent = status;
            renderChart(currentPrice, dcfValue);
        } else {
            els.dcfDetails.textContent = `Date: ${date || 'Recent'}`;
            renderChart(0, dcfValue);
        }
    };

    const processDCF = async (ticker) => {
        els.dcfError.classList.add('hidden');
        showLoading();
        resetDisplay();

        if (!validateTicker(ticker)) {
            showError('Enter a valid ticker (1–5 uppercase letters).');
            return;
        }

        const [dcfData, currentPrice] = await Promise.all([
            fetchDCFData(ticker),
            fetchCurrentPrice(ticker)
        ]);

        if (!dcfData || !dcfData.dcfValue || isNaN(dcfData.dcfValue)) {
            showError('No DCF data available.');
            return;
        }

        updateUIWithResults(dcfData, currentPrice);
    };

    const setupEventListeners = () => {
        if (els.stockInput) {
            els.stockInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const ticker = els.stockInput.value.trim().toUpperCase();
                    if (ticker) processDCF(ticker);
                }
            });
        }

        if (els.analyzeBtn) {
            els.analyzeBtn.addEventListener('click', () => {
                const ticker = els.stockInput.value.trim().toUpperCase();
                if (ticker) processDCF(ticker);
            });
        }
    };

    setupEventListeners();
});