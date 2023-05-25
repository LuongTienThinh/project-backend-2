
function readFile() {
    const fileInput = document.getElementById('fileInput'); // Định danh của input[type="file"]
    const file = fileInput.files[0];

    let returnValue = [];

    const reader = new FileReader();

    reader.onload = function (event) {
        const content = event.target.result;
        returnValue = JSON.parse(content);
        console.log(returnValue);

        returnValue = returnValue.filter((element) => {
            return Array.isArray(element);
        });
        console.log(returnValue);

        let result = [];
        returnValue.forEach((element) => {
            element.forEach((e) => {
                result.push(e);
            });
        });

        console.log(result);

        result = result.map((element) => {
            let meaning = [];
            let similar = [];
            let opposite = [];
            element['meanings'].forEach((e) => {
                meaning.push(e['definition']);
                if (e['synonyms'] != null) similar.push(...e['synonyms'].map(f => f["text"]));
                if (e['antonyms'] != null) opposite.push(...e['antonyms'].map(f => f["text"]));
            });
            return {
                word: element['word'],
                meaning: `${meaning}`,
                similar_word: `${similar}`,
                opposite_word: `${opposite}`,
                part_of_speech: element["partOfSpeech"],
                forms: JSON.stringify(element['forms']),
            };
        });
        
        console.log(result);

        const jsonData = JSON.stringify(result);

        const blob = new Blob([jsonData], { type: 'application/json' });

        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'php_data.json';
        link.click();

        URL.revokeObjectURL(downloadUrl);
    };
    reader.readAsText(file);
}
