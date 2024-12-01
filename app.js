document.getElementById('analyzeButton').addEventListener('click', () => {
    // Start timing
    const startTime = Date.now();

    // Prendi il testo dall'area di testo
    const text = document.getElementById('inputText').value;

    // Prendi il valore del selettore
    const limit = parseInt(document.getElementById('limitSelector').value);

    // Funzione per contare le parole
    const countWords = (str) => {
        const cleanedText = str.toLowerCase().replace(/[^\w\s]/g, '');
        const words = cleanedText.split(/\s+/);
        const wordCount = {};

        for (const word of words) {
            if (word) {
                wordCount[word] = (wordCount[word] || 0) + 1;
            }
        }
        return wordCount;
    };

    // Conteggio parole e caratteri
    const totalWords = text.trim().split(/\s+/).filter(word => word).length; // Conta tutte le parole
    const totalCharacters = text.replace(/\s/g, '').length; // Conta tutti i caratteri escludendo gli spazi

    // Ottieni il conteggio delle parole
    const results = countWords(text);

    // Ordina le parole per frequenza
    const sortedResults = Object.entries(results).sort((a, b) => b[1] - a[1]);

    // Applica il limite selezionato (se 0 mostra tutto)
    const limitedResults = limit > 0 ? sortedResults.slice(0, limit) : sortedResults;

    // Mostra i risultati
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Pulisce i risultati precedenti

    // End timing
    const endTime = Date.now();
    const elapsedTime = endTime - startTime; // Tempo in millisecondi

    // Mostra il tempo impiegato, parole totali e caratteri totali sopra la tabella
    const statsInfo = document.createElement('div');
    statsInfo.style.marginBottom = '10px';
    statsInfo.innerHTML = `
        <p><strong>Total words:</strong> ${(totalWords/1000).toFixed(1)} k</p>
        <p><strong>Total characters:</strong> ${(totalCharacters/1000).toFixed(1)} k</p>
        <p><strong>Time needed:</strong> ${elapsedTime} ms</p>
    `;
    resultsDiv.appendChild(statsInfo);

    // Crea la tabella dei risultati
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';

    // Aggiungi intestazione
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
        <th style="border: 1px solid #ccc; padding: 10px; text-align: left;">Parola</th>
        <th style="border: 1px solid #ccc; padding: 10px; text-align: right;">Conteggio</th>
    `;
    table.appendChild(headerRow);

    // Aggiungi righe per ciascuna parola e il suo conteggio
    for (const [word, count] of limitedResults) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="border: 1px solid #ccc; padding: 10px;">${word}</td>
            <td style="border: 1px solid #ccc; padding: 10px; text-align: right;">${count}</td>
        `;
        table.appendChild(row);
    }

    // Aggiungi la tabella al contenitore
    resultsDiv.appendChild(table);
});
