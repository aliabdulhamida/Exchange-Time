/**
 * Konfigurationsdatei für Exchange-Time-2
 * Lädt Umgebungsvariablen und stellt sie der Anwendung zur Verfügung
 * 
 * WICHTIG: Diese Datei sollte NICHT die tatsächlichen API-Schlüssel enthalten!
 * Sie dient nur als Schnittstelle zu den Umgebungsvariablen.
 */

// Import dotenv für Node.js-Umgebungen
if (typeof process !== 'undefined' && process.env) {
    try {
        require('dotenv').config();
    } catch (e) {
        console.warn('dotenv nicht verfügbar, lädt Umgebungsvariablen aus process.env');
    }
}

const Config = {
    // API-Schlüssel
    apiKeys: {
        newsletter: {
            apiKey: process.env.API_NEWSLETTER || '',
            groupId: process.env.GROUP_NEWSLETTER || ''
        },
        yahooFinance: process.env.YAHOO_FINANCE_API_KEY || '',
        tradingView: process.env.TRADINGVIEW_API_KEY || '',
        fearAndGreed: process.env.FEAR_AND_GREED || '',
        stockData: process.env.STOCK_API_KEY || '',
        exchangeRate: process.env.EXCHANGE_RATE_API_KEY || ''
    },
    
    // Umgebungsvariablen
    environment: process.env.NODE_ENV || 'development',
    
    // Hilfsfunktionen
    isProduction: function() {
        return this.environment === 'production';
    },
    
    // Sichere Methode zum Abrufen der API-Schlüssel
    getApiKey: function(apiName) {
        switch(apiName) {
            case 'newsletter':
                return this.apiKeys.newsletter.apiKey;
            case 'newsletter-group':
                return this.apiKeys.newsletter.groupId;
            case 'yahoo-finance':
                return this.apiKeys.yahooFinance;
            case 'trading-view':
                return this.apiKeys.tradingView;
            case 'fear-and-greed':
                return this.apiKeys.fearAndGreed;
            case 'stock-data':
                return this.apiKeys.stockData;
            case 'exchange-rate':
                return this.apiKeys.exchangeRate;
            default:
                console.warn(`API-Schlüssel "${apiName}" nicht gefunden`);
                return '';
        }
    }
};

// Exportieren der Konfiguration für die Verwendung in anderen Dateien
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Config;
} else {
    window.Config = Config;
}