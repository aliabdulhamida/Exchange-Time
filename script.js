// Define marketHours with explicit holidays for each market
const marketHours = {
    NYSE: {
        open: "09:30",
        close: "16:00",
        timezone: "America/New_York",
        region: "North America",
        city: "New York",
        holidays: {
            // 2025
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
            // 2026
            "2026-01-01": { reason: "New Year's Day", closeEarly: false },
            "2026-01-19": { reason: "Martin Luther King, Jr. Day", closeEarly: false },
            "2026-02-16": { reason: "Washington’s Birthday", closeEarly: false },
            "2026-04-03": { reason: "Good Friday", closeEarly: false },
            "2026-05-25": { reason: "Memorial Day", closeEarly: false },
            "2026-06-19": { reason: "Juneteenth National Independence Day", closeEarly: false },
            "2026-07-03": { reason: "Independence Day (observed)", closeEarly: true, earlyCloseTime: "13:00" },
            "2026-09-07": { reason: "Labor Day", closeEarly: false },
            "2026-11-26": { reason: "Thanksgiving Day", closeEarly: true, earlyCloseTime: "13:00" },
            "2026-12-25": { reason: "Christmas Day", closeEarly: true, earlyCloseTime: "13:00" },
            // 2027
            "2027-01-01": { reason: "New Year's Day", closeEarly: false },
            "2027-01-18": { reason: "Martin Luther King, Jr. Day", closeEarly: false },
            "2027-02-15": { reason: "Washington’s Birthday", closeEarly: false },
            "2027-04-02": { reason: "Good Friday", closeEarly: false },
            "2027-05-31": { reason: "Memorial Day", closeEarly: false },
            "2027-06-18": { reason: "Juneteenth National Independence Day (observed)", closeEarly: false },
            "2027-07-05": { reason: "Independence Day (observed)", closeEarly: true, earlyCloseTime: "13:00" },
            "2027-09-06": { reason: "Labor Day", closeEarly: false },
            "2027-11-25": { reason: "Thanksgiving Day", closeEarly: true, earlyCloseTime: "13:00" },
            "2027-12-24": { reason: "Christmas Day (observed)", closeEarly: true, earlyCloseTime: "13:00" }
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
            "2026-01-01": { reason: "New Year's Day", closeEarly: false },
            "2026-01-19": { reason: "Martin Luther King, Jr. Day", closeEarly: false },
            "2026-02-16": { reason: "Washington’s Birthday", closeEarly: false },
            "2026-04-03": { reason: "Good Friday", closeEarly: false },
            "2026-05-25": { reason: "Memorial Day", closeEarly: false },
            "2026-06-19": { reason: "Juneteenth National Independence Day", closeEarly: false },
            "2026-07-03": { reason: "Independence Day (observed)", closeEarly: true, earlyCloseTime: "13:00" },
            "2026-09-07": { reason: "Labor Day", closeEarly: false },
            "2026-11-26": { reason: "Thanksgiving Day", closeEarly: true, earlyCloseTime: "13:00" },
            "2026-12-25": { reason: "Christmas Day", closeEarly: true, earlyCloseTime: "13:00" },
            "2027-01-01": { reason: "New Year's Day", closeEarly: false },
            "2027-01-18": { reason: "Martin Luther King, Jr. Day", closeEarly: false },
            "2027-02-15": { reason: "Washington’s Birthday", closeEarly: false },
            "2027-04-02": { reason: "Good Friday", closeEarly: false },
            "2027-05-31": { reason: "Memorial Day", closeEarly: false },
            "2027-06-18": { reason: "Juneteenth National Independence Day (observed)", closeEarly: false },
            "2027-07-05": { reason: "Independence Day (observed)", closeEarly: true, earlyCloseTime: "13:00" },
            "2027-09-06": { reason: "Labor Day", closeEarly: false },
            "2027-11-25": { reason: "Thanksgiving Day", closeEarly: true, earlyCloseTime: "13:00" },
            "2027-12-24": { reason: "Christmas Day (observed)", closeEarly: true, earlyCloseTime: "13:00" }
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
            "2026-01-01": { reason: "New Year's Day", closeEarly: false },
            "2026-02-16": { reason: "Family Day", closeEarly: false },
            "2026-04-03": { reason: "Good Friday", closeEarly: false },
            "2026-05-18": { reason: "Victoria Day", closeEarly: false },
            "2026-07-01": { reason: "Canada Day", closeEarly: false },
            "2026-08-03": { reason: "Civic Holiday", closeEarly: false },
            "2026-09-07": { reason: "Labour Day", closeEarly: false },
            "2026-10-12": { reason: "Thanksgiving Day", closeEarly: false },
            "2026-12-24": { reason: "Christmas Eve", closeEarly: true, earlyCloseTime: "13:00" },
            "2026-12-25": { reason: "Christmas Day", closeEarly: false },
            "2026-12-26": { reason: "Boxing Day", closeEarly: false },
            "2026-12-31": { reason: "New Year's Day 2027 (observed)", closeEarly: true, earlyCloseTime: "13:00" },
            "2027-01-01": { reason: "New Year's Day", closeEarly: false },
            "2027-02-15": { reason: "Family Day", closeEarly: false },
            "2027-04-02": { reason: "Good Friday", closeEarly: false },
            "2027-05-24": { reason: "Victoria Day", closeEarly: false },
            "2027-07-01": { reason: "Canada Day", closeEarly: false },
            "2027-08-02": { reason: "Civic Holiday", closeEarly: false },
            "2027-09-06": { reason: "Labour Day", closeEarly: false },
            "2027-10-11": { reason: "Thanksgiving Day", closeEarly: false },
            "2027-12-24": { reason: "Christmas Day (observed)", closeEarly: true, earlyCloseTime: "13:00" },
            "2027-12-27": { reason: "Boxing Day (observed)", closeEarly: false }
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
            "2026-01-01": { reason: "New Year's Day", closeEarly: false },
            "2026-01-19": { reason: "Martin Luther King, Jr. Day", closeEarly: false },
            "2026-02-16": { reason: "Washington’s Birthday", closeEarly: false },
            "2026-04-03": { reason: "Good Friday", closeEarly: false },
            "2026-05-25": { reason: "Memorial Day", closeEarly: false },
            "2026-06-19": { reason: "Juneteenth National Independence Day", closeEarly: false },
            "2026-07-03": { reason: "Independence Day (observed)", closeEarly: true, earlyCloseTime: "13:00" },
            "2026-09-07": { reason: "Labor Day", closeEarly: false },
            "2026-11-26": { reason: "Thanksgiving Day", closeEarly: true, earlyCloseTime: "13:00" },
            "2026-12-25": { reason: "Christmas Day", closeEarly: true, earlyCloseTime: "13:00" },
            "2027-01-01": { reason: "New Year's Day", closeEarly: false },
            "2027-01-18": { reason: "Martin Luther King, Jr. Day", closeEarly: false },
            "2027-02-15": { reason: "Washington’s Birthday", closeEarly: false },
            "2027-04-02": { reason: "Good Friday", closeEarly: false },
            "2027-05-31": { reason: "Memorial Day", closeEarly: false },
            "2027-06-18": { reason: "Juneteenth National Independence Day (observed)", closeEarly: false },
            "2027-07-05": { reason: "Independence Day (observed)", closeEarly: true, earlyCloseTime: "13:00" },
            "2027-09-06": { reason: "Labor Day", closeEarly: false },
            "2027-11-25": { reason: "Thanksgiving Day", closeEarly: true, earlyCloseTime: "13:00" },
            "2027-12-24": { reason: "Christmas Day (observed)", closeEarly: true, earlyCloseTime: "13:00" }
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
            "2026-01-01": { reason: "New Year’s Day", closeEarly: false },
            "2026-04-03": { reason: "Good Friday", closeEarly: false },
            "2026-04-06": { reason: "Easter Monday", closeEarly: false },
            "2026-05-01": { reason: "Labour Day", closeEarly: false },
            "2026-12-24": { reason: "Christmas Eve", closeEarly: true, earlyCloseTime: "13:00" },
            "2026-12-25": { reason: "Christmas Day", closeEarly: false },
            "2026-12-26": { reason: "Boxing Day", closeEarly: false },
            "2026-12-31": { reason: "New Year’s Eve", closeEarly: true, earlyCloseTime: "13:00" },
            "2027-01-01": { reason: "New Year’s Day", closeEarly: false },
            "2027-03-26": { reason: "Good Friday", closeEarly: false },
            "2027-03-29": { reason: "Easter Monday", closeEarly: false },
            "2027-05-01": { reason: "Labour Day", closeEarly: false },
            "2027-12-24": { reason: "Christmas Eve", closeEarly: true, earlyCloseTime: "13:00" },
            "2027-12-25": { reason: "Christmas Day", closeEarly: false },
            "2027-12-26": { reason: "Boxing Day", closeEarly: false },
            "2027-12-31": { reason: "New Year’s Eve", closeEarly: true, earlyCloseTime: "13:00" },
            "2028-01-01": { reason: "New Year’s Day", closeEarly: false },
            "2028-04-14": { reason: "Good Friday", closeEarly: false },
            "2028-04-17": { reason: "Easter Monday", closeEarly: false },
            "2028-05-01": { reason: "Labour Day", closeEarly: false },
            "2028-12-24": { reason: "Christmas Eve", closeEarly: true, earlyCloseTime: "13:00" },
            "2028-12-25": { reason: "Christmas Day", closeEarly: false },
            "2028-12-26": { reason: "Boxing Day", closeEarly: false },
            "2028-12-31": { reason: "New Year’s Eve", closeEarly: true, earlyCloseTime: "13:00" },
            "2029-01-01": { reason: "New Year’s Day", closeEarly: false },
            "2029-03-30": { reason: "Good Friday", closeEarly: false },
            "2029-04-02": { reason: "Easter Monday", closeEarly: false },
            "2029-05-01": { reason: "Labour Day", closeEarly: false },
            "2029-12-24": { reason: "Christmas Eve", closeEarly: true, earlyCloseTime: "13:00" },
            "2029-12-25": { reason: "Christmas Day", closeEarly: false },
            "2029-12-26": { reason: "Boxing Day", closeEarly: false },
            "2029-12-31": { reason: "New Year’s Eve", closeEarly: true, earlyCloseTime: "13:00" },
            "2030-01-01": { reason: "New Year’s Day", closeEarly: false },
            "2030-04-19": { reason: "Good Friday", closeEarly: false },
            "2030-04-22": { reason: "Easter Monday", closeEarly: false },
            "2030-05-01": { reason: "Labour Day", closeEarly: false },
            "2030-12-24": { reason: "Christmas Eve", closeEarly: true, earlyCloseTime: "13:00" },
            "2030-12-25": { reason: "Christmas Day", closeEarly: false },
            "2030-12-26": { reason: "Boxing Day", closeEarly: false },
            "2030-12-31": { reason: "New Year’s Eve", closeEarly: true, earlyCloseTime: "13:00" }
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
            "2025-01-01": { reason: "New Year's Day", closeEarly: false }
        }
    },
    TASE: {
        open: "09:30",
        close: "17:30",
        timezone: "Asia/Jerusalem",
        region: "Asia",
        city: "Tel Aviv",
        holidays: {
            "2025-01-01": { reason: "New Year's Day", closeEarly: false }
        }
    },
    IDX: {
        open: "09:00",
        close: "15:00",
        timezone: "Asia/Jakarta",
        region: "Asia",
        city: "Jakarta",
        holidays: {
            "2025-01-01": { reason: "New Year's Day", closeEarly: false }
        }
    },
    SET: {
        open: "10:00",
        close: "16:30",
        timezone: "Asia/Bangkok",
        region: "Asia",
        city: "Bangkok",
        holidays: {
    "2025-02-12": { "reason": "Makha Bucha Day", "closeEarly": false },
    "2025-04-07": { "reason": "Shakri Day OBS", "closeEarly": false },
    "2025-04-14": { "reason": "Songkran Festival 2", "closeEarly": false },
    "2025-04-15": { "reason": "Songkran Festival 3", "closeEarly": false },
    "2025-05-01": { "reason": "Labour Day", "closeEarly": false },
    "2025-05-05": { "reason": "Coronation Day OBS", "closeEarly": false },
    "2025-05-12": { "reason": "Vishaka Bucha Day", "closeEarly": false },
    "2025-06-02": { "reason": "Special Holiday", "closeEarly": false },
    "2025-06-03": { "reason": "Queen Suthida's Birthday", "closeEarly": false },
    "2025-07-10": { "reason": "Asarnha Bucha Day", "closeEarly": false },
    "2025-07-28": { "reason": "King's Birthday", "closeEarly": false },
    "2025-08-11": { "reason": "Special Holiday 2", "closeEarly": false },
    "2025-08-12": { "reason": "Queen's Birthday", "closeEarly": false },
    "2025-10-13": { "reason": "King Bhumibol Adulyadej Memorial Day", "closeEarly": false },
    "2025-10-23": { "reason": "King Chulalongkorn Memorial Day", "closeEarly": false },
    "2025-12-05": { "reason": "King Rama IX's Birthday", "closeEarly": false },
    "2025-12-10": { "reason": "Constitution Day", "closeEarly": false },
    "2025-12-31": { "reason": "New Year's Eve", "closeEarly": false }
}
    },
    PSE: {
        open: "09:30",
        close: "15:30",
        timezone: "Asia/Manila",
        region: "Asia",
        city: "Manila",
        holidays: {
    "2025-01-29": { "reason": "Chinese New Year", "closeEarly": false },
    "2025-03-31": { "reason": "Eid-ul Fitre", "closeEarly": false },
    "2025-04-09": { "reason": "Araw Ng Kagitingan", "closeEarly": false },
    "2025-04-17": { "reason": "Holy Thursday", "closeEarly": false },
    "2025-04-18": { "reason": "Good Friday", "closeEarly": false },
    "2025-05-01": { "reason": "Labour Day", "closeEarly": false },
    "2025-06-06": { "reason": "Eid-ul Adha", "closeEarly": false },
    "2025-06-12": { "reason": "Independence Day", "closeEarly": false },
    "2025-08-21": { "reason": "Nino Aquino Day", "closeEarly": false },
    "2025-08-25": { "reason": "National Heroes Day", "closeEarly": false },
    "2025-10-31": { "reason": "All Saints Additional Obs.", "closeEarly": false },
    "2025-12-08": { "reason": "Immaculate Conception", "closeEarly": false },
    "2025-12-24": { "reason": "Christmas Eve", "closeEarly": false },
    "2025-12-25": { "reason": "Christmas Day", "closeEarly": false },
    "2025-12-30": { "reason": "Rizal Day", "closeEarly": false },
    "2025-12-31": { "reason": "Bank Holiday", "closeEarly": false }
}
    },
    HOSE: {
        open: "09:00",
        close: "15:00",
        timezone: "Asia/Ho_Chi_Minh",
        region: "Asia",
        city: "Ho Chi Minh",
        holidays: {
            "2025-01-01": { reason: "New Year's Day", closeEarly: false }
        }
    },
    DFM: {
        open: "10:00",
        close: "14:00",
        timezone: "Asia/Dubai",
        region: "Asia",
        city: "Dubai",
        holidays: {
            "2025-01-01": { reason: "New Year's Day", closeEarly: false }
        }
    },
    ADX: {
        open: "10:00",
        close: "14:00",
        timezone: "Asia/Dubai",
        region: "Asia",
        city: "Abu Dhabi",
        holidays: {
            "2025-01-01": { reason: "New Year's Day", closeEarly: false }
        }
    },
    ASX: {
        open: "10:00",
        close: "16:00",
        timezone: "Australia/Sydney",
        region: "Australia",
        city: "Sydney",
        holidays: {
    "2025-01-27": { "reason": "Australia Day OBS", "closeEarly": false },
    "2025-04-18": { "reason": "Good Friday", "closeEarly": false },
    "2025-04-21": { "reason": "Easter Monday", "closeEarly": false },
    "2025-04-25": { "reason": "ANZAC Day", "closeEarly": false },
    "2025-06-09": { "reason": "King's Birthday", "closeEarly": false },
    "2025-12-25": { "reason": "Christmas Day", "closeEarly": false },
    "2025-12-26": { "reason": "Boxing Day", "closeEarly": false }
}
    },
    NZX: {
        open: "10:00",
        close: "16:45",
        timezone: "Pacific/Auckland",
        region: "Australia",
        city: "Wellington",
        holidays: {
    "2025-02-06": { "reason": "Waitangi Day", "closeEarly": false },
    "2025-04-18": { "reason": "Good Friday", "closeEarly": false },
    "2025-04-21": { "reason": "Easter Monday", "closeEarly": false },
    "2025-04-25": { "reason": "ANZAC Day", "closeEarly": false },
    "2025-06-02": { "reason": "King's Birthday", "closeEarly": false },
    "2025-06-20": { "reason": "Matariki Day", "closeEarly": false },
    "2025-10-27": { "reason": "Labour Day", "closeEarly": false },
    "2025-12-25": { "reason": "Christmas Day", "closeEarly": false },
    "2025-12-26": { "reason": "Boxing Day", "closeEarly": false }
}
    },
    JSE: {
        open: "09:00",
        close: "17:00",
        timezone: "Africa/Johannesburg",
        region: "Africa",
        city: "Johannesburg",
        holidays: {
            "2025-01-01": { reason: "New Year's Day", closeEarly: false }
        }
    },
    EGX: {
        open: "10:00",
        close: "14:30",
        timezone: "Africa/Cairo",
        region: "Africa",
        city: "Cairo",
        holidays: {
            "2025-01-01": { reason: "New Year's Day", closeEarly: false }
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
            "2025-01-01": { reason: "New Year's Day", closeEarly: false }
        }
    },
    GSE: {
        open: "09:30",
        close: "15:00",
        timezone: "Africa/Accra",
        region: "Africa",
        city: "Accra",
        holidays: {
            "2025-01-01": { reason: "New Year's Day", closeEarly: false }
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
            "2025-01-01": { reason: "New Year's Day", closeEarly: false }
        }
    },
    Santiago: {
        open: "09:30",
        close: "16:00",
        timezone: "America/Santiago",
        region: "South America",
        city: "Santiago",
        holidays: {
    "2025-04-18": { "reason": "Good Friday", "closeEarly": false },
    "2025-05-01": { "reason": "Labour Day", "closeEarly": false },
    "2025-05-21": { "reason": "Battle of Iquique/Navy Day", "closeEarly": false },
    "2025-06-20": { "reason": "National Day of Native Peoples", "closeEarly": false },
    "2025-07-16": { "reason": "Solemnity of Virgin of Carmen", "closeEarly": false },
    "2025-08-15": { "reason": "Assumption Day", "closeEarly": false },
    "2025-09-18": { "reason": "Independence Day", "closeEarly": false },
    "2025-09-19": { "reason": "Army Day", "closeEarly": false },
    "2025-10-31": { "reason": "Evangelical Church Day", "closeEarly": false },
    "2025-12-08": { "reason": "Immaculate Conception", "closeEarly": false },
    "2025-12-25": { "reason": "Christmas Day", "closeEarly": false },
    "2025-12-31": { "reason": "Bank Holiday", "closeEarly": false }
}
    },
    BVC: {
        open: "09:00",
        close: "13:00",
        timezone: "America/Bogota",
        region: "South America",
        city: "Bogotá",
        holidays: {
    "2025-03-24": { "reason": "St. Joseph's Day OBS", "closeEarly": false },
    "2025-04-17": { "reason": "Holy Thursday", "closeEarly": false },
    "2025-04-18": { "reason": "Good Friday", "closeEarly": false },
    "2025-05-01": { "reason": "Labour Day", "closeEarly": false },
    "2025-06-02": { "reason": "Ascension", "closeEarly": false },
    "2025-06-23": { "reason": "Corpus Christi", "closeEarly": false },
    "2025-06-30": { "reason": "Sacred Heart", "closeEarly": false },
    "2025-06-30": { "reason": "Sts. Peter and Paul OBS", "closeEarly": false },
    "2025-08-07": { "reason": "Battle of Boyaca", "closeEarly": false },
    "2025-08-18": { "reason": "Assumption Day OBS", "closeEarly": false },
    "2025-10-13": { "reason": "Race Day OBS", "closeEarly": false },
    "2025-11-03": { "reason": "All Saints' Day OBS", "closeEarly": false },
    "2025-11-17": { "reason": "Independence of Cartagena OBS", "closeEarly": false },
    "2025-12-08": { "reason": "Immaculate Conception", "closeEarly": false },
    "2025-12-25": { "reason": "Christmas", "closeEarly": false },
    "2025-12-31": { "reason": "Last business day of year", "closeEarly": false }
}
    },
    BVL: {
        open: "09:00",
        close: "13:30",
        timezone: "America/Lima",
        region: "South America",
        city: "Lima",
        holidays: {
    "2025-04-17": { "reason": "Holy Thursday", "closeEarly": false },
    "2025-04-18": { "reason": "Good Friday", "closeEarly": false },
    "2025-05-01": { "reason": "Labour Day", "closeEarly": false },
    "2025-07-23": { "reason": "Dia de la Fuerza Aerea", "closeEarly": false },
    "2025-07-28": { "reason": "Independence Day 1", "closeEarly": false },
    "2025-07-29": { "reason": "Independence Day 2", "closeEarly": false },
    "2025-08-06": { "reason": "Battle of Junin", "closeEarly": false },
    "2025-10-08": { "reason": "Combat of Angamos", "closeEarly": false },
    "2025-12-08": { "reason": "Immaculate Conception", "closeEarly": false },
    "2025-12-09": { "reason": "Battle of Ayacucho", "closeEarly": false },
    "2025-12-25": { "reason": "Christmas Day", "closeEarly": false }
}
    },
    BVBA: {
        open: "11:00",
        close: "17:00",
        timezone: "America/Argentina/Buenos_Aires",
        region: "South America",
        city: "Buenos Aires",
        holidays: {
    "2025-03-03": { "reason": "Carnival Monday", "closeEarly": false },
    "2025-03-04": { "reason": "Carnival Tuesday", "closeEarly": false },
    "2025-03-24": { "reason": "Truth and Justice Day", "closeEarly": false },
    "2025-04-02": { "reason": "Malvinas Islands Memorial", "closeEarly": false },
    "2025-04-17": { "reason": "Holy Thursday", "closeEarly": false },
    "2025-04-18": { "reason": "Good Friday", "closeEarly": false },
    "2025-05-01": { "reason": "Workers' Day", "closeEarly": false },
    "2025-05-02": { "reason": "Bridge Holiday 1", "closeEarly": false },
    "2025-06-16": { "reason": "Martin Miguel de Guemes Day OBS", "closeEarly": false },
    "2025-06-20": { "reason": "Flag Day", "closeEarly": false },
    "2025-07-09": { "reason": "Independence Day", "closeEarly": false },
    "2025-08-15": { "reason": "Bridge Holiday 2", "closeEarly": false },
    "2025-11-21": { "reason": "Bridge Holiday 3", "closeEarly": false },
    "2025-11-24": { "reason": "National Sovereignty Day OBS", "closeEarly": false },
    "2025-12-08": { "reason": "Immaculate Conception", "closeEarly": false },
    "2025-12-25": { "reason": "Christmas Day", "closeEarly": false }
}
    }
};

// State variables for managing UI and market status
let currentRegion = "all";           // Default region filter
let isMinimized = false;             // Toggle for minimized card view
let showFavoritesOnly = false;       // Toggle for showing only favorite markets
let favorites = new Set();           // Set of favorite markets
let marketStatusHistory = {};        // Tracks open/closed status history

const closeButton = document.querySelector("#closeButton");

function setHeaderHeight() {
    const header = document.getElementById('header');
    document.documentElement.style.setProperty('--header-height', header.offsetHeight + 'px');
}

window.addEventListener('load', setHeaderHeight);
window.addEventListener('resize', setHeaderHeight);

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
        <button class="close-panel">×</button>
    `;

    document.body.appendChild(holidayPanel);

    holidayPanel.querySelector('.close-panel').addEventListener('click', () => {
        holidayPanel.remove();
    });
}

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

        card.innerHTML = !isMinimized ? `
    <div class="card-header">
        <div class="date">${city}</div>
        <div class="market-status ${isOpen ? "status-open" : "status-closed"}">
            ${isOpen ? "OPEN" : "CLOSED"}
        </div>
    </div>
    <div class="card-body">
        <h3>${market}</h3>
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
            const item = card.dataset.market;
            if (item) {
                favorites.has(item) ? favorites.delete(item) : favorites.add(item);
                updateCards();
            }
        });
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
    document.querySelectorAll("#toggle-view, .toggle-view").forEach(b => b.textContent = isMinimized ? "Details" : "Minimize");
    document.querySelectorAll("#toggle-favorites, .toggle-favorites").forEach(b => b.textContent = showFavoritesOnly ? "Show All" : "Favorites");
}

// Toggles visibility of the floating filter button
function toggleFilterButtonVisibility(show) {
    const filterButton = document.getElementById("floating-filter-btn");
    if (filterButton) filterButton.style.display = show ? "block" : "none";
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

    document.getElementById("calendar-region-filter")?.addEventListener("change", function() {
        generateCalendar(2025, this.value);
    });

    document.getElementById("search")?.addEventListener("input", updateCards);

    document.getElementById("floating-filter-btn")?.addEventListener("click", () => {
        const panel = document.getElementById("filter-panel");
        if (panel) {
            panel.style.display = "block";
            toggleFilterButtonVisibility(false);
        }
    });

    window.addEventListener("click", (event) => {
        const panel = document.getElementById("filter-panel");
        const btn = document.getElementById("floating-filter-btn");
        if (panel && btn && !panel.contains(event.target) && !btn.contains(event.target) && panel.style.display === "block") {
            panel.style.display = "none";
            toggleFilterButtonVisibility(true);
        }
    });

    document.getElementById("close-filter-panel")?.addEventListener("click", () => {
        const panel = document.getElementById("filter-panel");
        if (panel) {
            panel.style.display = "none";
            toggleFilterButtonVisibility(true);
        }
    });

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

window.addEventListener("resize", setBodyPadding);

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('close').addEventListener('click', function() {
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
