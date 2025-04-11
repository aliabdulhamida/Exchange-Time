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
    chartDiv.style.width = '100%';

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
            const proxyUrl = 'https://api.allorigins.win/get?url=';
            const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`;
            const url = proxyUrl + encodeURIComponent(yahooUrl);

            const response = await fetch(url);
            const data = await response.json();
            
            if (data.contents) {
                const parsed = JSON.parse(data.contents);
                if (parsed.chart.result) {
                    const rate = parsed.chart.result[0].meta.regularMarketPrice;
                    const result = amount * rate;
                    
                    this.displayResult({
                        base_code: fromCurrency,
                        target_code: toCurrency,
                        conversion_rate: rate,
                        conversion_result: result
                    });
                } else {
                    throw new Error('Rate not available');
                }
            } else {
                throw new Error('Conversion failed');
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
document.getElementById('fearGreedBtn').addEventListener('click', function() {
    document.getElementById('fearGreedModal').style.display = 'block';
    fetchFearGreedIndex(); // Fetch data when modal is opened
  });
  
  // Close modal when clicking on X
  document.querySelectorAll('.close-modal').forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
      const modalId = this.getAttribute('data-modal');
      document.getElementById(modalId).style.display = 'none';
    });
  });
  
  // Close modal when clicking outside of it
  window.addEventListener('click', function(event) {
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
            'x-rapidapi-key': 'a8d81eea34msh9318a170ad799bdp1a9d7fjsna333e1b65e8a',
            'x-rapidapi-host': 'fear-and-greed-index.p.rapidapi.com'
        }
    };
    
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      const score = data.fgi.now.value;
      updateGauge(score);
    } catch (error) {
      console.error("API fetch error:", error);
      document.getElementById("description").textContent = "Error fetching data";
    }
}

// Insider Trades Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Insider Trades Modal
    const insiderTradesBtn = document.getElementById('insiderTradesBtn');
    const insiderTradesModal = document.getElementById('insiderTradesModal');
    const closeInsiderBtn = document.getElementById('close-insider');
    const searchInsiderBtn = document.getElementById('search-insider');
    const insiderTickerInput = document.getElementById('insider-ticker');
    const insiderLoading = document.getElementById('insider-loading');
    const insiderResults = document.getElementById('insider-results');
    const insiderNoData = document.getElementById('insider-no-data');
    const insiderError = document.getElementById('insider-error');
    const insiderErrorMessage = document.getElementById('insider-error-message');
    const insiderCompanyName = document.getElementById('insider-company-name');
    const insiderSummary = document.getElementById('insider-summary');
    const insiderTable = document.getElementById('insider-table').querySelector('tbody');

    // Show modal when button is clicked
    insiderTradesBtn.addEventListener('click', function() {
        insiderTradesModal.style.display = 'block';
        resetInsiderModal();
    });

    // Close modal with close button
    closeInsiderBtn.addEventListener('click', function() {
        insiderTradesModal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === insiderTradesModal) {
            insiderTradesModal.style.display = 'none';
        }
    });

    // Handle search button click
    searchInsiderBtn.addEventListener('click', function() {
        const ticker = insiderTickerInput.value.trim().toUpperCase();
        if (ticker) {
            fetchInsiderTrades(ticker);
        }
    });

    // Handle enter key press in input
    insiderTickerInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            const ticker = insiderTickerInput.value.trim().toUpperCase();
            if (ticker) {
                fetchInsiderTrades(ticker);
            }
        }
    });

    // Fetch insider trades data
    async function fetchInsiderTrades(ticker) {
        // Reset and show loading state
        resetInsiderModal();
        insiderLoading.style.display = 'block';

        try {
            // Fetch from Finviz which doesn't require an API key
            const finvizUrl = `https://finviz.com/quote.ashx?t=${ticker}`;
            const proxyUrl = 'https://api.allorigins.win/get?url=';
            
            const response = await fetch(`${proxyUrl}${encodeURIComponent(finvizUrl)}`);
            
            if (!response.ok) {
            throw new Error(`Error fetching data: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data && data.contents) {
            // Parse HTML content to extract insider trades
            const { trades, companyName } = parseFinvizInsiderTrades(data.contents, ticker);
            
            if (trades.length > 0) {
                displayParsedInsiderTrades(trades, ticker, companyName);
            } else {
                insiderNoData.style.display = 'block';
            }
            } else {
            throw new Error('Invalid response from server');
            }
            
        } catch (error) {
            insiderError.style.display = 'block';
            insiderErrorMessage.textContent = `Error: ${error.message}`;
            console.error('API error:', error);
        } finally {
            insiderLoading.style.display = 'none';
        }
        }
        
        // Parse Finviz HTML to extract insider trades
        function parseFinvizInsiderTrades(html, ticker) {
        const trades = [];
        let companyName = ticker; // Default to ticker
        
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Try to extract company name from title
            const title = doc.querySelector('title');
            if (title) {
                const titleMatch = title.textContent.match(/(.+)\s*\(.*?\)\s*-/);
                if (titleMatch && titleMatch[1]) {
                    companyName = titleMatch[1].trim();
                }
            }
            
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
                const insider_name = cells[1]?.textContent?.trim(); // Changed from full_name to insider_name
                const position = cells[2]?.textContent?.trim();
                const transaction_type = getTransactionType(cells[3]?.textContent?.trim());
                const price = parseFloat(cells[4]?.textContent?.replace(/[^\d.-]/g, ''));
                const shares = parseFloat(cells[5]?.textContent?.replace(/[^\d.-]/g, ''));
                const value = shares * price;
                
                trades.push({
                    transaction_date,
                    insider_name, // Store under insider_name
                    position,
                    transaction_type,
                    shares,
                    price,
                    value,
                    formatted_shares: `$${shares.toFixed(2)}`,
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
        
        // Display parsed insider trades (for Finviz data)
        function displayParsedInsiderTrades(trades, ticker, companyName) {
        // Use the extracted company name or use a fallback
        const displayName = companyName || getCompanyNameForTicker(ticker) || `${ticker}`;
        
        // Create a data object similar to the SynthFinance API response
        const result = {
            data: trades.map(trade => ({
            ...trade,
            company: { name: displayName }
            }))
        };
        
        displayInsiderTrades(result, ticker);
        }
        
        // Helper function to get company name for ticker
        function getCompanyNameForTicker(ticker) {
        const companyMap = {
            'AAPL': 'Apple Inc.',
            'MSFT': 'Microsoft Corporation',
            'GOOGL': 'Alphabet Inc.',
            'AMZN': 'Amazon.com, Inc.',
            'META': 'Meta Platforms, Inc.',
            'TSLA': 'Tesla, Inc.',
            'NVDA': 'NVIDIA Corporation'
            // Add more mappings as needed
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
    
    // Create a grid container for cards (replacing the table)
    const insiderTableElement = document.getElementById('insider-table');
    
    // Prüfen, ob das Element existiert, bevor auf parentNode zugegriffen wird
    if (!insiderTableElement) {
        console.error('Element with ID "insider-table" not found');
        return;
    }
    
    const tableContainer = insiderTableElement.parentNode;
    tableContainer.innerHTML = ''; // Clear the container
    
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
    
    // Debug: Log first trade if available
    if (trades.length > 0) {
        console.log("Sample trade data:", {
            date: trades[0].transaction_date,
            name: trades[0].insider_name,
            position: trades[0].position,
            roles: trades[0].formatted_roles,
            type: trades[0].transaction_type,
            shares: trades[0].shares,
            price: trades[0].price,
            value: trades[0].value
        });
    }
    
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
            console.error("Fehler beim Hinzufügen einer Trade-Zeile:", error, trade);
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
    insiderTable.innerHTML = '';
}
});
