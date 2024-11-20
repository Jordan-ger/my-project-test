document.getElementById('translate-button').addEventListener('click', async () => {
    const textInput = document.getElementById('text-input').value;
    const targetLanguage = document.getElementById('language-select').value;

    // API details
    const apiKey = '26337960b5msh31951aa7d915ef6p1c9799jsnd468f57b771c';
    const apiHost = 'google-translate-unlimited.p.rapidapi.com';

    if (textInput === "") {
        alert("Please enter text to translate");
        return;
    }

    try {
        // Detect language
        const detectResponse = await fetch(`https://${apiHost}/detect`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': apiHost
            },
            body: JSON.stringify({ q: textInput })
        });

        const detectData = await detectResponse.json();
        const sourceLanguage = detectData.data.detections[0][0].language;

        // Translate text
        const translateResponse = await fetch(`https://${apiHost}/translate`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': apiHost
            },
            body: JSON.stringify({ q: textInput, target: targetLanguage, source: sourceLanguage })
        });

        const translateData = await translateResponse.json();
        const translatedText = translateData.data.translations[0].translatedText;

        // Display result
        document.getElementById('translation-result').innerText = translatedText;
    } catch (error) {
        console.error("Error translating text:", error);
        document.getElementById('translation-result').innerText = "An error occurred. Please try again.";
    }
});
