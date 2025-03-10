@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&display=swap');

:root {
    /* Farben */
    --primary-bg: #08090b;
    --card-bg: #121316;
    --text: #b8bec6;
    --open: #007a6e;
    --closed: #b33936;
    --input-bg: #1e2024;
    --button-bg: #0f1013;
    --button-hover: #2c2e34;
    --input-border: #3c3f47;
    --favorite-border: rgba(184, 147, 0, 0.3);
    --positive: #2e7031;
    --negative: #a62828;
    --modal-bg: rgba(50, 50, 50, 0.2);
    --header-height: 0px;
}

/* Reset */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Oswald', sans-serif;
}

/* Layout */
body {
    display: flex;
    flex-direction: column;
    background: var(--primary-bg);
    margin-left: 20px;
}

h1, h2, h3 {
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
}

h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
h3 { font-size: 1.5rem; }
p, ul { font-weight: 300; }

/* Buttons */
.btn {
    background: var(--button-bg);
    color: white;
    padding: 0.8rem 1rem;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    transition: background 0.3s ease;
}

#close {
    position: absolute;
    top: 15px;
    right: 15px;
    background: var(--closed);
    color: white;
    padding: 5px 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 600;
    transition: background 0.3s ease;
}

#close:hover {
    background: #a62828;
}

#closesummary {
    position: absolute;
    top: 15px;
    right: 15px;
    background: var(--closed);
    color: white;
    padding: 5px 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 600;
    transition: background 0.3s ease;
}

#closesummary:hover {
    background: #a62828;
}

#search-box {
    flex-grow: 1;
    margin: 0 2px;
}

#search {
    width: 100%;
    background: none;
    color: #fff;
    padding: 0.75rem 1rem;
    border-radius: 30px;
    font-size: 1rem;
    border: 1px solid var(--input-border);
    transition: border-color 0.3s ease;
}

#search:focus {
    outline: none;
    border-color: var(--open);
    box-shadow: 0 0 5px var(--open);
}

.btn:hover { background: var(--open); }
.btn:active { transform: scale(0.98); }

/* Dropdowns */
.select {
    background: none;
    color: #fff;
    padding: 0.6rem 1rem;
    border: 0.5px solid var(--input-border);
    border-radius: 30px;
    font-size: 1rem;
    cursor: pointer;
    appearance: none;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="5" fill="%23fff"><polygon points="0,0 10,0 5,5"/></svg>');
    background-repeat: no-repeat;
    background-position: right 10px center;
    padding-right: 2rem;
}

.select:focus {
    outline: none;
    border-color: var(--open);
    box-shadow: 0 0 5px var(--open);
}

/* Container */
#main-container {
    display: grid;
    grid-template-columns: 400px 4fr 400px;
    grid-template-areas: "left market right";
    gap: 20px;
    width: 100%;
    margin-top: var(--header-height);
}

#market-section {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 20px;
    grid-area: market;
    height: 80vh;
    overflow-y: auto;
}

#right-container { 
  grid-area: right;
}

#new-container { 
  grid-area: left; 
  margin-left: 100px;
}

/* Tabellen */
.table-container {
    color: white;
    border-radius: 12px;
    margin: 15px;
    text-align: center;
}

th, td {
    border: 1px solid black;
    padding: 15px;
    color: white;
    text-align: center;
}

/* Header */
#header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: var(--primary-bg);
    padding: 10px 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    z-index: 1000;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    border-bottom: 1px solid var(--input-border);
    margin-bottom: 20px;
}

/* Calendar */
#calendar {
    margin-top: 10px;
}

.calendar-month {
    margin-bottom: 15px;
    background: #000;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid grey;
}

.calendar-month h2 {
    color: #fff;
    margin-bottom: 1px;
    font-size: 1rem;
    font-weight: 700;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 2px;
}

.calendar-grid {
    grid-template-columns: repeat(7, 1fr);
    grid-auto-rows: 45px;
    gap: 5px;
    padding: 10px;
    background: none;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

.calendar-row {
    display: flex;
    justify-content: space-between;
}

.calendar-day {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    text-align: center;
    line-height: 45px;
    color: #fff;
    margin: 2.5px auto;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: 600;
    transition: background 0.3s ease;
    cursor: pointer;
}

.calendar-day:hover {
    background: #333;
}

.calendar-day:active {
    transform: scale(0.95);
}

.calendar-day.weekday {
    font-weight: 700;
    cursor: default;
}

.calendar-day.weekday::after {
    position: absolute;
    bottom: 0;
    left: -2.5px;
    right: -2.5px;
    height: 1px;
    background: var(--text);
}

.calendar-day.empty {
    background: none;
    cursor: default;
}

.calendar-day.holiday {
    background: #a63d2a;
    color: #fff;
    font-weight: 700;
}

.calendar-day.holiday:hover {
    background: #8a2f20;
}

/* Holiday Panel */
.holiday-panel {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1002;
    background-color: #1a1a1e;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.7);
    color: #e0e0e0;
    border: 1px solid #333;
    width: 90%;
    max-width: 500px;
    max-height: 70vh;
    overflow-y: auto;
}

.holiday-panel h3 {
    font-size: 1.4rem;
    margin-bottom: 15px;
    color: #01c3a8;
    font-weight: 700;
}

.holiday-panel ul {
    list-style: none;
    padding: 0;
    margin: 0 0 20px 0;
}

.holiday-panel li {
    padding: 5px 0;
    border-bottom: 1px solid #444;
    font-size: 0.8rem;
    word-wrap: break-word;
}

.holiday-panel .close-panel {
    position: absolute;
    top: 10px;
    right: 10px;
    background: var(--closed);
    color: white;
    padding: 5px 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 800;
    transition: background 0.3s ease;
    text-align: center;
}

.holiday-panel .close-panel:hover {
    background: #a62828;
}

.holiday-panel::-webkit-scrollbar {
    width: 8px;
}

.holiday-panel::-webkit-scrollbar-thumb {
    background-color: #555;
    border-radius: 4px;
}

.holiday-panel::-webkit-scrollbar-track {
    background: #222;
}

/* Filter Panel */
#floating-filter-btn {
    position: fixed;
    bottom: 65px;
    right: 20px;
    background: var(--open);
    color: white;
    padding: 10px 20px;
    border-radius: 30px;
    cursor: pointer;
    z-index: 1002;
    display: none;
}

#filter-panel {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: var(--card-bg);
    padding: 15px;
    display: none;
    gap: 10px;
    z-index: 1001;
    box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.3);
}

#close-filter-panel {
    position: absolute;
    top: 25px;
    right: 15px;
    background: var(--closed);
    color: white;
    padding: 5px 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 800;
    transition: background 0.3s ease;
    text-align: center;
}

#close-filter-panel:hover {
    background: #a62828;
}

#filter-panel .region-filter {
    padding: 0.7rem 1rem; /* Slight variation kept */
}


/* Footer */
#footer, #footerprivacy {
    margin-top: auto;
    background: var(--primary-bg);
    color: var(--text);
    padding: 10px 0;
    width: 100%;
    text-align: center;
    border-top: 1px solid var(--input-border);
}

#footerprivacy {
    background: white;
    margin-top: 40px;
}

/* Cards */
.card {
    background: var(--card-bg);
    border-radius: 12px;
    padding: 1.2rem;
    text-align: center;
    width: calc(25% - 20px);
    box-shadow: 1px 12px 25px rgba(0, 0, 0, 0.7);
    cursor: pointer;
    font-weight: 300;
    max-height: 250px;
}

.card.favorite { box-shadow: 0px 0px 3px 1px rgba(241, 255, 46, 0.26); }
.card.minimized { opacity: 0.85; padding: 1rem; }

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0;
}

.date {
    color: var(--text);
    font-weight: 600;
    font-size: 1rem;
}

.market-status {
    padding: 2px 10px;
    border-radius: 15px;
    font-size: 0.9rem;
    font-weight: bold;
    color: white;
}

.status-open {
    background: var(--open);
}

.status-closed {
    background: var(--closed);
}

.card-body h3 {
    color: #fff;
    font-size: 1.3rem;
    font-weight: 500;
    margin-bottom: 0;
}

.card-body p {
    color: var(--text);
    margin: 5px;
    font-size: 0.8rem;
    margin-bottom: 0;
}

.digital-clock {
    margin: 5px;
    display: flex;
    justify-content: center;
    font-size: 1rem;
    color: #fff;
    font-weight: bold;
}

.progress {
    margin-top: 1rem;
}

.progress span {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    font-size: 0.9rem;
    margin-bottom: 5px;
}

.progress .time-left {
    font-weight: bold;
    margin-left: 10px;
}

.progress-bar {
    width: 100%;
    height: 8px;
    background: #333;
    border-radius: 4px;
}

.progress-bar-fill {
    height: 100%;
    background: var(--open);
    border-radius: 4px;
    transition: background 0.3s ease;
}

/* Modal */
.modal {
    display: none;
    position: fixed;
    z-index: 1001;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: var(--modal-bg);
}

.modal-content {
    background-color: #000;
    padding: 30px;
    border-radius: 30px;
    width: 90%;
    max-width: 600px;
    box-shadow: 0px 0px 10px 10px rgba(0, 0, 0, 0.2);
    overflow-y: auto;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-height: 85vh;
}

/* Privacy Policy */
.privacy-policy {
    max-width: 900px;
    width: 90%;
    margin: 100px auto 40px;
    padding: 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 1px 12px 25px rgba(0, 0, 0, 0.7);
}

.privacy-policy h1 {
    color: black;
    margin-bottom: 20px;
    text-align: center;
}

.privacy-policy p {
    font-size: 1rem;
    line-height: 1.6;
    color: black;
}

/* Responsive */
@media (max-width: 800px) {
  body, html {
    height: 100%
  }
  
  .card {
        width: calc(50% - 1rem);
    }

    .privacy-policy {
        margin: 80px auto 30px;
        padding: 15px;
    }

    .privacy-policy h1 {
        font-size: 2rem;
    }

    .privacy-policy h2 {
        font-size: 1.5rem;
    }

    .privacy-policy h3 {
        font-size: 1.2rem;
    }

    .privacy-policy p,
    .privacy-policy li {
        font-size: 0.9rem;
    }

    #main-container {
        grid-template-columns: 1fr;
        grid-template-areas: "market";
        gap: 0;
        padding: 0;
        margin: 0;
        margin-bottom: 30px;
    }

    #market-section {
        display: flex;
        flex-directiom: column;
        min-height: 100vh;
        width: 100%;
        height: 100vh;
        overflow-y: none;
    }

    #market-section section {
        justify-content: center;
        max-width: 100%;
        padding: 0;
        width: 100%;
        padding-top: 50px;
    }

    .card {
        width: 100%;
        max-width: 300px;
        margin: 0 auto;
    }

    #right-container,
    #new-container {
        display: none !important;
    }

    #footer {
        padding: 15px 0;
        margin-top: auto;
    }

    .footer-content {
        gap: 8px;
    }

    .footer-content p,
    .footer-link {
        font-size: 0.8rem;
    }

    #header {
        padding: 10px 15px;
        justify-content: center;
        margin-bottom: 50px;
    }

    #region-options {
        display: none;
    }

    #view-toggle {
        display: contents;
    }

    #view-toggle #toggle-view,
    #view-toggle #toggle-favorites {
        display: none;
    }

    #toggle-calendar {
        padding: 0.8rem 1.5rem;
        height: 50px;
        line-height: 0px;
        white-space: nowrap;
    }
  
    #search-box {
        margin-right: 0px;
        padding: 10;
        height: 50px;
        line-height: 40px;
        min-width: 70px;
    }
  
    #floating-filter-btn {
        display: flex;
        justify-content: space-between;
    }
  
  .table-container th, .table-container td {
    padding: 1px;
    text-align: center; 
  }
}
