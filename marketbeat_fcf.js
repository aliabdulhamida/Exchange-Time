// Extrahiere Free Cash Flow von MarketBeat für NASDAQ/AAPL
// Beispielseite: https://www.marketbeat.com/stocks/NASDAQ/AAPL/financials/

async function fetchMarketBeatFreeCashFlow(symbol) {
    const proxyUrl = 'https://corsproxy.io/?';
    const url = proxyUrl + encodeURIComponent(`https://www.marketbeat.com/stocks/NASDAQ/${symbol}/financials/`);
    const response = await fetch(url);
    if (!response.ok) return null;
    const html = await response.text();
    // Suche nach dem <tr> mit id="row-freecashflow-yCal"
    const trMatch = html.match(/<tr[^>]*id=["']row-freecashflow-yCal["'][^>]*>([\s\S]*?)<\/tr>/i);
    if (trMatch && trMatch[1]) {
        // Extrahiere alle <td data-value="...">...</td> innerhalb des <tr>
        const tdMatches = [...trMatch[1].matchAll(/<td[^>]*data-value=["']([\d.]+)["'][^>]*>([\d,]+)<\/td>/g)];
        if (tdMatches.length > 0) {
            // Nimm den letzten Wert (aktuellster FCF)
            const last = tdMatches[tdMatches.length - 1];
            const value = parseFloat(last[1]);
            if (!isNaN(value)) {
                return (value / 1e9).toFixed(2) + 'B';
            }
        }
    }
    return null;
}

export { fetchMarketBeatFreeCashFlow };
