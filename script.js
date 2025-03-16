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
}}

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
const closeCalendar = document.getElementById('close');

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
            
            // Yahoo Finance API endpoint with AllOrigins proxy
            const proxyUrl = 'https://api.allorigins.win/get?url=';
            const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${stockSymbol}?period1=${period1}&period2=${period2}&interval=1d`;
            const url = proxyUrl + encodeURIComponent(yahooUrl);
            
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const rawData = await response.json();
            const data = JSON.parse(rawData.contents);
            
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
});

// Calculate investment for a single stock (initial + monthly) and track daily values
function calculateStockInvestment(data, initialAmountPerStock, monthlyAmountPerStock, startDate, endDate) {
    let totalShares = 0;
    let totalInvested = 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const valueOverTime = [];

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

    for (const day of data) {
        const currentDay = new Date(day.date);

        // Add monthly investment if it's the first trading day of the month
        if (monthlyAmountPerStock > 0 && currentDay >= nextInvestmentDate && currentDay <= end) {
            const sharesBought = monthlyAmountPerStock / day.close;
            totalShares += sharesBought;
            totalInvested += monthlyAmountPerStock;
            nextInvestmentDate.setMonth(nextInvestmentDate.getMonth() + 1);
        }

        // Record portfolio value for this day
        valueOverTime.push({
            date: day.date,
            value: totalShares * day.close
        });
    }

    const finalPrice = data[data.length - 1].close;
    const finalValue = totalShares * finalPrice;
    return { totalInvested, finalValue, totalShares, valueOverTime };
}

// Generate portfolio chart
function generatePortfolioChart(dates, portfolioValues) {
    const chartDiv = document.getElementById('portfolio-chart');
    if (!chartDiv) {
        console.error('Chart container not found');
        return;
    }
    
    // Clear existing chart
    chartDiv.innerHTML = '';
    
    // Ensure the container has a height
    chartDiv.style.minHeight = '400px';
    chart.Div.style.width = '100%';

    // Validate data
    if (!dates || !portfolioValues || dates.length === 0) {
        console.error('Invalid chart data');
        return;
    }

    // Format data for ApexCharts
    const data = dates.map((date, index) => ({
        x: new Date(date).getTime(),
        y: Number(portfolioValues[index])
    })).filter(point => !isNaN(point.y));

    const options = {
        series: [{
            name: 'Portfolio Value',
            data: data
        }],
        chart: {
            type: 'area',
            stacked: false,
            height: 350,
            zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
            },
            toolbar: {
                autoSelected: 'zoom'
            }
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 0,
        },
        title: {
            text: 'Stock Price Movement',
            align: 'left'
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.5,
                opacityTo: 0,
                stops: [0, 90, 100]
            },
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    return (val / 1000000).toFixed(0);
                },
            },
            title: {
                text: 'Price'
            },
        },
        xaxis: {
            type: 'datetime',
        },
        tooltip: {
            shared: false,
            y: {
                formatter: function (val) {
                    return (val / 1000000).toFixed(0)
                }
            }
        }
    };

    // Create new ApexCharts instance and render
    const chart = new ApexCharts(chartDiv, options);
    chart.render();
}

// Backtest form submission handler (portfolio sum with chart)
document.getElementById('backtest-form').addEventListener('submit', async function(event) {
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
        img.onerror = function() {
          this.style.display = "none"; 
        };
      });
    });

    // Fetch data for all stocks
    const promises = stockSymbols.map(symbol => fetchStockData(symbol, startDate, endDate));
    const results = await Promise.allSettled(promises);

    let portfolioTotalInvested = 0;
    let portfolioFinalValue = 0;
    let portfolioShares = 0;
    let allValid = true;
    let errorMessages = [];
    const portfolioValuesOverTime = {};
    
    // Split amounts equally among stocks
    const initialAmountPerStock = initialAmount / stockSymbols.length;
    const monthlyAmountPerStock = monthlyAmount / stockSymbols.length;

    results.forEach((result, index) => {
        const stockSymbol = stockSymbols[index];
        if (result.status === 'fulfilled' && result.value && !result.value.error && result.value.length >= 2) {
            const data = result.value;
            const { totalInvested, finalValue, totalShares, valueOverTime } = calculateStockInvestment(
                data,
                initialAmountPerStock,
                monthlyAmountPerStock,
                startDate,
                endDate
            );

            portfolioTotalInvested += totalInvested;
            portfolioFinalValue += finalValue;
            portfolioShares += totalShares;

            // Aggregate daily portfolio values
            valueOverTime.forEach(({ date, value }) => {
                portfolioValuesOverTime[date] = (portfolioValuesOverTime[date] || 0) + value;
            });
        } else {
            allValid = false;
            const errorMsg = result.value?.error || result.reason?.message || "Unknown error";
            errorMessages.push(`Failed to fetch data for ${stockSymbol}: ${errorMsg}, please reload the page and try again.`);
        }
    });

    let resultHTML = "";
    if (allValid) {
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
            ">

            <div class="portfolio-metrics" style="width: 100%;">
            <div class="metrics-grid" style="
            display: grid; 
            grid-template-columns: 
            repeat(auto-fit, 
            minmax(240px, 1fr)); 
            gap: 15px; 
            width: 100%;
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
                font-weight: bold;">$${portfolioTotalInvested.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
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
                $${portfolioFinalValue.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
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
                $${portfolioProfit.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
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
                ${portfolioShares.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                </span>
            </div>
            </div>
            </div>
            <div class="chart-container" style="width: 100%; margin-top: 30px;">
            <div id="portfolio-chart" style="
                margin-top: 20px;
                background-color: rgb(255, 255, 255);
                border-radius: 8px;
                padding: 15px;
                height: min(400px, 70vh);
                width: 100%;
            "></div>
            </div>
            </div>
        `;
        resultDiv.innerHTML = resultHTML;

        // Create ApexCharts configuration
        const dates = Object.keys(portfolioValuesOverTime).sort();
        const portfolioValues = dates.map(date => portfolioValuesOverTime[date]);

        const chartOptions = {
            series: [{
                name: 'Portfolio Value',
                data: dates.map((date, index) => ({
                    x: new Date(date).getTime(),
                    y: portfolioValues[index]
                }))
            }],
            chart: {
                type: 'area',
                height: 350,
                zoom: {
                    type: 'x',
                    enabled: true,
                    autoScaleYaxis: true
                },
                toolbar: {
                    autoSelected: 'zoom'
                }
            },
            dataLabels: {
                enabled: false
            },
            markers: {
                size: 0
            },
            title: {
                text: '',
                align: 'left'
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: false,
                    opacityFrom: 0.7,
                    opacityTo: 0.1,
                    stops: [0, 90, 100]
                }
            },
            yaxis: {
                title: {
                    text: 'Portfolio Value ($)'
                },
                labels: {
                    formatter: function(val) {
                        return '$' + val.toFixed(2);
                    }
                }
            },
            xaxis: {
                type: 'datetime',
                labels: {
                    datetimeUTC: false
                }
            },
            tooltip: {
                x: {
                    format: 'dd MMM yyyy'
                },
                y: {
                    formatter: function(val) {
                        return '$' + val.toFixed(2);
                    }
                }
            }
        };

        // Create and render the chart
        const chart = new ApexCharts(document.querySelector("#portfolio-chart"), chartOptions);
        chart.render();

    } else {
        resultHTML = `<p style='color: red;'>${errorMessages.join('<br>')}. <a href="https://cors-anywhere.herokuapp.com/" target="_blank">Ensure proxy is active</a>.</p>`;
        resultDiv.innerHTML = resultHTML;
    }

    resultsPanel.style.display = 'block';
    backtestModal.style.display = 'none';
});

// Example API usage for stock analysis
document.addEventListener("DOMContentLoaded", () => {
    const analysisButton = document.getElementById("toggle-analysis");
    const analysisModal = document.getElementById("analysis-modal");
    const closeAnalysisButton = document.getElementById("close-analysis");
    const stockSymbolInput = document.getElementById("stock-symbol");
    const timeframeSelect = document.getElementById("analysis-timeframe");

 

    function updateAnalysis(symbol) {
        stockSymbolInput.value = symbol;
        updateCharts(timeframeSelect.value);
        updateTechnicalIndicators();
    }

    if (analysisButton) {
        analysisButton.addEventListener("click", () => {
            analysisModal.style.display = "block";
            updateCharts(timeframeSelect.value);
            updateTechnicalIndicators();
        });
    }

    if (closeAnalysisButton) {
        closeAnalysisButton.addEventListener("click", () => {
            analysisModal.style.display = "none";
        });
    }

    if (timeframeSelect) {
        timeframeSelect.addEventListener("change", () => {
            updateCharts(timeframeSelect.value);
        });
    }

    if (stockSymbolInput) {
        stockSymbolInput.addEventListener("change", () => {
            updateCharts(timeframeSelect.value);
            updateTechnicalIndicators();
        });
    }

    window.addEventListener("click", (event) => {
        if (event.target === analysisModal) {
            analysisModal.style.display = "none";
        }
    });

    // Initial load
    updateCharts(timeframeSelect.value);

    stockSymbolInput.addEventListener('change', (e) => {
        const symbol = e.target.value.trim().toUpperCase();
        if (symbol) {
            updateAnalysis(symbol);
        }
    });

    timeframeSelect.addEventListener('change', () => {
        const symbol = stockSymbolInput.value.trim().toUpperCase();
        if (symbol) {
            updateAnalysis(symbol);
        }
    });
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

    document.getElementById("calendar-region-filter")?.addEventListener("change", function() {
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
            filterBtn.style.display = "none"; 
            
            const justOpened = true;
            setTimeout(() => {
                panel.dataset.justOpened = "false";
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
            if (!panel.dataset.justOpened && 
                !panel.contains(event.target) && 
                !filterBtn.contains(event.target) && 
                panel.classList.contains("filter-panel-open")) {
                panel.style.display = "none";
                panel.classList.remove("filter-panel-open");
                toggleFilterButtonVisibility(true); // Use toggle function instead of direct display
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

class StockAnalysis {
    constructor() {
        if (typeof ApexCharts === 'undefined') {
            console.error('ApexCharts ist nicht geladen!');
            return;
        }

        // DOM-Elemente
        this.symbolInput = document.getElementById('stock-symbol');
        this.analyzeBtn = document.getElementById('analyze-btn');
        this.errorDiv = document.getElementById('error-message');
        this.loadingOverlay = document.querySelector('.loading-overlay');
        
        // Status-Management
        this.cache = new Map();
        this.chartInstances = new Map();
        this.debounceTimer = null;

        // Chart-Konfiguration
        this.chartConfig = {
            defaults: {
                chart: {
                    type: 'line',
                    height: 350,
                    background: '#1a1a1a',
                    foreColor: '#fff'
                },
                theme: {
                    mode: 'dark'
                },
                stroke: { curve: 'smooth', width: 2 },
                markers: { size: 0 }
            }
        };

        // Initialisierung
        this.setupEventListeners();
        this.setupTabs();
        this.setupCharts();
    }

    setupEventListeners() {
        console.log('Setting up event listeners...');
        
        // Enter-Taste im Input
        this.symbolInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const symbol = this.symbolInput.value.trim().toUpperCase();
                console.log('Enter pressed with symbol:', symbol);
                if (symbol) this.analyzeStock(symbol);
            }
        });

        // Debounced Input-Handler
        this.symbolInput.addEventListener('input', (e) => {
            clearTimeout(this.debounceTimer);
            this.debounceTimer = setTimeout(() => {
                const symbol = e.target.value.trim().toUpperCase();
                console.log('Input debounced with symbol:', symbol);
                if (symbol.length >= 2) {
                    this.analyzeStock(symbol);
                }
            }, 500);
        });

        // Analyze-Button Handler
        this.analyzeBtn.addEventListener('click', () => {
            const symbol = this.symbolInput.value.trim().toUpperCase();
            console.log('Analyze button clicked with symbol:', symbol);
            if (symbol) this.analyzeStock(symbol);
        });
    }

    setupTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabPanes = document.querySelectorAll('.tab-pane');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.dataset.tab;
                console.log('Tab switched to:', targetTab);
                
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                tabPanes.forEach(pane => {
                    pane.classList.remove('active');
                    if (pane.id === targetTab) {
                        pane.classList.add('active');
                        if (targetTab === 'technical') {
                            this.updateTechnicalCharts();
                        }
                    }
                });
            });
        });
    }

    async analyzeStock(symbol) {
        try {
            console.log('Starting analysis for:', symbol);
            this.showLoading();
            
            if (this.cache.has(symbol)) {
                const cachedData = this.cache.get(symbol);
                if (Date.now() - cachedData.timestamp < 5 * 60 * 1000) {
                    console.log('Using cached data for:', symbol);
                    this.updateUI(cachedData.data);
                    this.updateCharts(cachedData.data);
                    this.hideLoading();
                    return;
                }
            }

            const rawData = await this.fetchStockData(symbol);
            console.log('Raw data received:', rawData);
            
            const analyzedData = this.analyzeData(rawData);
            console.log('Analyzed data:', analyzedData);

            this.cache.set(symbol, {
                timestamp: Date.now(),
                data: analyzedData
            });

            this.updateUI(analyzedData);
            this.updateCharts(analyzedData);

        } catch (error) {
            console.error('Analysis error:', error);
            this.showError(error.message);
        } finally {
            this.hideLoading();
        }
    }

    async fetchStockData(symbol) {
        try {
            console.log('Fetching data for:', symbol);
            const proxyUrl = 'https://api.allorigins.win/get?url=';
            const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1y`;
            const url = proxyUrl + encodeURIComponent(yahooUrl);

            const response = await fetch(url);
            
            if (response.status === 429) {
                console.warn('Rate limit reached, retrying...');
                await new Promise(resolve => setTimeout(resolve, 1000));
                return this.fetchStockData(symbol);
            }

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            const rawData = await response.json();
            
            if (!rawData?.contents) {
                throw new Error('Invalid API response format');
            }

            const data = JSON.parse(rawData.contents);
            
            if (!data?.chart?.result?.[0]) {
                throw new Error('No data available for this symbol');
            }

            return data.chart.result[0];

        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
        
    }
    
        async analyzeStock(symbol) {
            try {
                this.showLoading();
                console.log('Analyzing stock:', symbol);
                
                // Prüfe Cache
                if (this.cache.has(symbol)) {
                    const cachedData = this.cache.get(symbol);
                    if (Date.now() - cachedData.timestamp < 5 * 60 * 1000) {
                        console.log('Using cached data');
                        this.updateUI(cachedData.data);
                        this.updateCharts(cachedData.data);
                        this.hideLoading();
                        return;
                    }
                }
    
                const rawData = await this.fetchStockData(symbol);
                const analyzedData = this.analyzeData(rawData);
                
                this.cache.set(symbol, {
                    timestamp: Date.now(),
                    data: analyzedData
                });
    
                this.updateUI(analyzedData);
                this.updateCharts(analyzedData);
    
            } catch (error) {
                console.error('Analysis error:', error);
                this.showError(error.message);
            } finally {
                this.hideLoading();
            }
        }
    
        async fetchStockData(symbol) {
            try {
                const proxyUrl = 'https://api.allorigins.win/get?url=';
                const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1y`;
                const url = proxyUrl + encodeURIComponent(yahooUrl);
    
                console.log('Fetching from:', url);
                const response = await fetch(url);
                
                if (response.status === 429) {
                    console.warn('Rate limit reached, retrying...');
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    return this.fetchStockData(symbol);
                }
    
                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status}`);
                }
    
                const rawData = await response.json();
                
                if (!rawData?.contents) {
                    throw new Error('Invalid API response format');
                }
    
                const data = JSON.parse(rawData.contents);
                
                if (!data?.chart?.result?.[0]) {
                    throw new Error('No data available for this symbol');
                }
    
                return data.chart.result[0];
    
            } catch (error) {
                console.error('Fetch error:', error);
                throw error;
            }
        }
    
        analyzeData(rawData) {
            const { meta, indicators, timestamp: timestamps } = rawData;
            const quotes = indicators.quote[0];
            const closePrices = quotes.close;
            
            return {
                symbol: meta.symbol,
                currency: meta.currency,
                timestamps: timestamps,
                priceHistory: timestamps.map((time, i) => ({
                    time: time * 1000,
                    value: quotes.close[i],
                    open: quotes.open[i],
                    high: quotes.high[i],
                    low: quotes.low[i],
                    volume: quotes.volume[i]
                })).filter(item => item.value !== null),
                technicalIndicators: {
                    rsi: this.calculateRSI(closePrices),
                    macd: this.calculateMACD(closePrices),
                    ...this.calculateMovingAverages(closePrices),
                    volatility: this.calculateVolatility(closePrices),
                    momentum: this.calculateMomentum(closePrices),
                    atr: this.calculateATR(quotes.high, quotes.low, closePrices),
                    bollinger: this.calculateBollingerBands(closePrices)
                },
                fundamentalData: {
                    marketCap: meta.marketCap,
                    high52Week: meta.fiftyTwoWeekHigh,
                    low52Week: meta.fiftyTwoWeekLow,
                    avgVolume: meta.regularMarketVolume
                }
            };
        }
    
        updateUI(data) {
            const elements = {
                'stock-name': data.symbol,
                'current-price': `$${data.priceHistory[data.priceHistory.length-1].value.toFixed(2)}`,
                'price-change': this.calculatePriceChange(data.priceHistory),
                'market-cap': this.formatMarketCap(data.fundamentalData.marketCap),
                'high-52-week': `$${data.fundamentalData.high52Week.toFixed(2)}`,
                'low-52-week': `$${data.fundamentalData.low52Week.toFixed(2)}`,
                'avg-volume': this.formatNumber(data.fundamentalData.avgVolume),
                'rsi': data.technicalIndicators.rsi.toFixed(2),
                'macd': data.technicalIndicators.macd.macd.toFixed(2),
                'ma50': `$${data.technicalIndicators.MA50.toFixed(2)}`,
                'ma200': `$${data.technicalIndicators.MA200.toFixed(2)}`
            };
    
            for (const [id, value] of Object.entries(elements)) {
                const element = document.getElementById(id);
                if (element) element.textContent = value;
            }
    
            this.updateSignals(data.technicalIndicators);
        }
    
        // Technische Indikatoren
calculateRSI(prices, period = 14) {
    if (!prices || prices.length < period) return 0;
    
    const gains = [], losses = [];
    for(let i = 1; i < prices.length; i++) {
        const difference = prices[i] - prices[i-1];
        gains.push(difference > 0 ? difference : 0);
        losses.push(difference < 0 ? Math.abs(difference) : 0);
    }
    
    const avgGain = gains.slice(0, period).reduce((a, b) => a + b) / period;
    const avgLoss = losses.slice(0, period).reduce((a, b) => a + b) / period;
    
    if (avgLoss === 0) return 100;
    const rs = avgGain / avgLoss;
    return 100 - (100 / (1 + rs));
}

calculateMACD(prices, shortPeriod = 12, longPeriod = 26, signalPeriod = 9) {
    if (!prices || prices.length < longPeriod) return { macd: 0, signal: 0, histogram: 0 };
    
    const shortEMA = this.calculateEMA(prices, shortPeriod);
    const longEMA = this.calculateEMA(prices, longPeriod);
    const macdLine = shortEMA - longEMA;
    const signalLine = this.calculateEMA([macdLine], signalPeriod);
    
    return {
        macd: macdLine,
        signal: signalLine,
        histogram: macdLine - signalLine
    };
}

calculateMovingAverages(prices) {
    return {
        MA50: this.calculateSMA(prices, 50),
        MA200: this.calculateSMA(prices, 200)
    };
}

calculateSMA(prices, period) {
    if (!prices?.length || prices.length < period) return 0;
    return prices.slice(-period).reduce((a, b) => a + b) / period;
}

calculateEMA(prices, period) {
    if (!prices?.length || prices.length < period) return 0;
    const multiplier = 2 / (period + 1);
    let ema = prices.slice(0, period).reduce((a, b) => a + b) / period;
    
    for(let i = period; i < prices.length; i++) {
        ema = (prices[i] - ema) * multiplier + ema;
    }
    return ema;
}

calculateATR(high, low, close, period = 14) {
    if (!high?.length || !low?.length || !close?.length) return 0;
    const tr = high.map((h, i) => {
        if (i === 0) return h - low[i];
        return Math.max(h - low[i], Math.abs(h - close[i-1]), Math.abs(low[i] - close[i-1]));
    });
    return this.calculateSMA(tr, period);
}

calculateBollingerBands(prices, period = 20, multiplier = 2) {
    if (!prices?.length || prices.length < period) {
        return { upper: 0, middle: 0, lower: 0 };
    }
    
    const middle = this.calculateSMA(prices, period);
    const deviation = Math.sqrt(
        prices.slice(-period).reduce((sum, price) => 
            sum + Math.pow(price - middle, 2), 0) / period
    );
    
    return {
        upper: middle + (multiplier * deviation),
        middle: middle,
        lower: middle - (multiplier * deviation)
    };
}

calculateVolatility(prices, period = 20) {
    if (!prices || prices.length < period) return 0;
    
    const returns = [];
    for(let i = 1; i < prices.length; i++) {
        returns.push((prices[i] - prices[i-1]) / prices[i-1]);
    }
    
    const mean = returns.reduce((a, b) => a + b) / returns.length;
    const variance = returns.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / returns.length;
    
    return Math.sqrt(variance) * Math.sqrt(252); // Annualisierte Volatilität
}

calculateMomentum(prices, period = 14) {
    if (!prices || prices.length < period) return 0;
    return (prices[prices.length - 1] / prices[prices.length - period - 1]) * 100;
}

calculatePriceChange(priceHistory) {
    if (!priceHistory?.length) return '0.00%';
    
    const firstPrice = priceHistory[0].value;
    const lastPrice = priceHistory[priceHistory.length - 1].value;
    const change = ((lastPrice - firstPrice) / firstPrice) * 100;
    
    return `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
}

// Helper-Methoden
formatMarketCap(value) {
    if (!value) return 'N/A';
    const billion = 1000000000;
    const million = 1000000;
    
    if (value >= billion) {
        return `$${(value / billion).toFixed(2)}B`;
    }
    return `$${(value / million).toFixed(2)}M`;
}

formatNumber(num) {
    if (!num) return 'N/A';
    return new Intl.NumberFormat().format(num);
}

showLoading() {
    if (this.loadingOverlay) {
        this.loadingOverlay.style.display = 'flex';
    }
}

hideLoading() {
    if (this.loadingOverlay) {
        this.loadingOverlay.style.display = 'none';
    }
}

showError(message) {
    console.error(message);
    if (this.errorDiv) {
        this.errorDiv.textContent = message;
        this.errorDiv.style.display = 'block';
        setTimeout(() => {
            this.errorDiv.style.display = 'none';
        }, 5000);
    }
}

// Nach der showError Methode hinzufügen:

setupCharts() {
    this.chartConfig = {
        price: {
            chart: {
                type: 'candlestick',
                height: 400,
                background: '#fff',
                foreColor: '#fff'
            },
            title: {
                text: 'Price Chart',
                align: 'left',
                style: { color: '#fff' }
            },
            xaxis: {
                type: 'datetime',
                labels: {
                    style: { colors: '#fff' }
                }
            },
            yaxis: {
                labels: {
                    style: { colors: '#fff' },
                    formatter: (value) => `$${value.toFixed(2)}`
                }
            },
            grid: {
                borderColor: '#404040'
            }
        },
        technical: {
            chart: {
                type: 'line',
                height: 350,
                background: '#1a1a1a',
                foreColor: '#fff',
                toolbar: {
                    show: true
                }
            },
            stroke: {
                curve: 'smooth',
                width: 2
            },
            grid: {
                borderColor: '#404040'
            },
            xaxis: {
                type: 'datetime',
                labels: {
                    style: { colors: '#fff' }
                }
            },
            yaxis: {
                labels: {
                    style: { colors: '#fff' }
                }
            }
        }
    };
}

setupCharts() {
    // Stelle sicher, dass die Chart-Container existieren und leer sind
    ['price-chart', 'technical-chart'].forEach(id => {
        const container = document.getElementById(id);
        if (container) {
            container.innerHTML = '';
        } else {
            console.error(`Chart-Container ${id} nicht gefunden`);
        }
    });

    // Basis-Chart-Konfiguration
    this.chartConfig = {
        shared: {
            chart: {
                type: 'line',
                height: 350,
                background: '#1a1a1a',
                foreColor: '#fff',
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    dynamicAnimation: {
                        speed: 1000
                    }
                },
                toolbar: {
                    show: true,
                    tools: {
                        download: true,
                        selection: true,
                        zoom: true,
                        zoomin: true,
                        zoomout: true,
                        pan: true,
                        reset: true
                    }
                }
            },
            theme: {
                mode: 'dark',
                palette: 'palette1'
            },
            stroke: {
                curve: 'smooth',
                width: 2,
                lineCap: 'round'
            },
            markers: {
                size: 0,
                hover: {
                    size: 5
                }
            },
            grid: {
                show: true,
                borderColor: '#404040',
                strokeDashArray: 0,
                position: 'back'
            },
            xaxis: {
                type: 'datetime',
                labels: {
                    style: { colors: '#fff' }
                }
            },
            yaxis: {
                labels: {
                    style: { colors: '#fff' },
                    formatter: (value) => `$${value.toFixed(2)}`
                }
            },
            tooltip: {
                enabled: true,
                theme: 'dark',
                x: {
                    format: 'dd MMM yyyy'
                }
            }
        }
    };
}

updateCharts(data) {
    console.log('Updating charts with data:', data);
    this.destroyExistingCharts();

    try {
        // Preis-Chart
        const priceChartOptions = {
            ...this.chartConfig.shared,
            series: [{
                name: 'Preis',
                data: data.priceHistory.map(item => ({
                    x: new Date(item.time).getTime(),
                    y: item.value
                }))
            }],
            title: {
                text: `${data.symbol} Price Chart`,
                align: 'left',
                style: { color: '#fff' }
            }
        };

        // Technischer Chart
        const technicalChartOptions = {
            ...this.chartConfig.shared,
            series: [
                {
                    name: 'Price',
                    data: data.priceHistory.map(item => ({
                        x: new Date(item.time).getTime(),
                        y: item.value
                    }))
                },
                {
                    name: 'MA50',
                    data: data.priceHistory.map(item => ({
                        x: new Date(item.time).getTime(),
                        y: data.technicalIndicators.MA50
                    }))
                },
                {
                    name: 'MA200',
                    data: data.priceHistory.map(item => ({
                        x: new Date(item.time).getTime(),
                        y: data.technicalIndicators.MA200
                    }))
                }
            ]
        };

        const priceChart = new ApexCharts(
            document.getElementById('price-chart'),
            priceChartOptions
        );

        const technicalChart = new ApexCharts(
            document.getElementById('technical-chart'),
            technicalChartOptions
        );

        console.log('Rendering charts...');
        priceChart.render();
        technicalChart.render();

        this.chartInstances.set('price', priceChart);
        this.chartInstances.set('technical', technicalChart);

    } catch (error) {
        console.error('Fehler beim Erstellen der Charts:', error);
        this.showError('Charts konnten nicht erstellt werden');
    }
}

destroyExistingCharts() {
    console.log('Destroying existing charts...');
    this.chartInstances.forEach((chart, key) => {
        try {
            if (chart && typeof chart.destroy === 'function') {
                chart.destroy();
                console.log(`Chart ${key} destroyed`);
            }
        } catch (error) {
            console.error(`Fehler beim Zerstören des Charts ${key}:`, error);
        }
    });
    this.chartInstances.clear();
}

updateTechnicalCharts() {
    const symbol = this.symbolInput.value.trim().toUpperCase();
    if (symbol && this.cache.has(symbol)) {
        const data = this.cache.get(symbol).data;
        this.updateCharts(data);
    }
}

updateSignals(indicators) {
    const signalElements = {
        'ma-signal': this.calculateMASignal(indicators.MA50, indicators.MA200),
        'momentum-signal': this.calculateMomentumSignal(indicators.rsi, indicators.macd)
    };

    for (const [id, signal] of Object.entries(signalElements)) {
        const element = document.getElementById(id);
        if (element) {
            element.className = 'signal-indicator';
            element.classList.add(signal.type);
            element.title = signal.message;
        }
    }
}

calculateMASignal(ma50, ma200) {
    if (ma50 > ma200) {
        return { type: 'bullish', message: 'Bullish: MA50 above MA200' };
    } else {
        return { type: 'bearish', message: 'Bearish: MA50 below MA200' };
    }
}

calculateMomentumSignal(rsi, macd) {
    let signal = { type: 'neutral', message: 'Neutral momentum' };
    
    if (rsi > 70 || macd.histogram < 0) {
        signal = { type: 'overbought', message: 'Overbought conditions' };
    } else if (rsi < 30 || macd.histogram > 0) {
        signal = { type: 'oversold', message: 'Oversold conditions' };
    }
    
    return signal;
}

destroyExistingCharts() {
    this.chartInstances.forEach(chart => {
        if (chart && typeof chart.destroy === 'function') {
            chart.destroy();
        }
    });
    this.chartInstances.clear();
}

}

// Initialisierung
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing StockAnalysis...');
    window.stockAnalysis = new StockAnalysis();
});

document.addEventListener('DOMContentLoaded', function() {
    const aboutModal = document.getElementById('about-modal');
    const aboutLink = document.getElementById('about-link');
    const closeAbout = document.getElementById('close-about');

    aboutLink.addEventListener('click', function(e) {
        e.preventDefault();
        aboutModal.style.display = 'block';
    });

    closeAbout.addEventListener('click', function() {
        aboutModal.style.display = 'none';
    });

    window.addEventListener('click', function(e) {
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
        this.form = document.getElementById('newsletter-form');
        this.emailInput = document.getElementById('newsletter-email');
        this.statusMessage = document.getElementById('newsletter-status');
        this.subscribers = new Set(this.loadSubscribers());
        
        // Load API key from environment variables or config file
        this.API_KEY = null;
        this.loadApiKey();
        
        // Define headers that will be used for API requests
        this.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.API_KEY}`
        };
        
        this.setupEventListeners();
    }

    async loadApiKey() {
        try {
            // In production, load from secure environment or config service
            const response = await fetch('/api/config/mailerlite-key');
            const data = await response.json();
            this.API_KEY = data.apiKey;
            this.headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${this.API_KEY}`
            };
        } catch (error) {
            console.error('Failed to load API key:', error);
            this.showStatus('Newsletter service temporarily unavailable', 'error');
        }
    }

    setupEventListeners() {
        if (this.form) {
            this.form.addEventListener('submit', async (e) => {
                e.preventDefault();
                if (!this.API_KEY) {
                    this.showStatus('Newsletter service not initialized', 'error');
                    return;
                }
                await this.handleSubmit(e);
            });
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        const email = this.emailInput.value.trim();

        if (!this.validateEmail(email)) {
            this.showStatus('Please enter a valid email address', 'error');
            return;
        }

        if (this.subscribers.has(email)) {
            this.showStatus('This email is already subscribed', 'error');
            return;
        }

        try {
            await this.subscribeToNewsletter(email);
            this.subscribers.add(email);
            this.saveSubscribers();
            this.showStatus('Successfully subscribed!', 'success');
            this.emailInput.value = '';
        } catch (error) {
            this.showStatus(error.message, 'error');
        }
    }

    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    async subscribeToNewsletter(email) {
        try {
            const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({
                    email: email,
                    groups: ['98765432'],
                    status: 'active'
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Subscription failed');
            }

            return await response.json();
        } catch (error) {
            console.error('Newsletter subscription error:', error);
            throw new Error('Network error. Please try again later.');
        }
    }

    showStatus(message, type) {
        if (this.statusMessage) {
            this.statusMessage.textContent = message;
            this.statusMessage.className = `status-message ${type}`;
            this.statusMessage.style.display = 'block';

            setTimeout(() => {
                this.statusMessage.style.display = 'none';
            }, 3000);
        }
    }

    loadSubscribers() {
        try {
            return JSON.parse(localStorage.getItem('newsletter_subscribers')) || [];
        } catch {
            return [];
        }
    }

    saveSubscribers() {
        localStorage.setItem('newsletter_subscribers', 
            JSON.stringify([...this.subscribers]));
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    new NewsletterManager();
});
