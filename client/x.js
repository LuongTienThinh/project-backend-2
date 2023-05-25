let words = [];

const fetchApi = () => {
    fetch('http://127.0.0.1:8000/api/word-english')
        .then((res) => res.json())
        .then((result) => {
            words = result;
        });
};

fetchApi();

setTimeout(() => {
    console.log(words);
    let x = 0;
    const data = [];
    const unsearch = [];
    let i = 0;

    const fetchData = (word) => {
        fetch(`https://api.freedictionary.dev/api/v1/entries/en/${word}`)
            .then((res) => res.json())
            .then((result) => {
                setTimeout(() => {
                    if (Array.isArray(result)) {
                        data.push(result);
                    } else {
                        unsearch.push(word);
                    }
                }, 1000);
            });
    };

    while (i < words.length) {
        fetchData(words[i++]);
    }

    setTimeout(() => {
        console.log(words.length);
        console.log(data);
        console.log(unsearch);

        const fs = require('fs'); // Đối tượng fs để làm việc với tệp tin

        const filePath = './server/data/x.json'; // Đường dẫn đến tệp tin .json
        const unsearchPath = './server/data/unsearch.json'; // Đường dẫn đến tệp tin .json

        fs.readFile(filePath, 'utf8', (err, dt) => {
            if (err) {
                console.error('Lỗi khi đọc tệp tin:', err);
            } else {
                let jsonData = JSON.parse(dt); // Phân tích cú pháp JSON thành đối tượng JavaScript
                jsonData = [...jsonData, ...data]; // Thêm nội dung mới vào đối tượng JSON

                const updatedData = JSON.stringify(jsonData); // Chuyển đối tượng JavaScript thành chuỗi JSON

                fs.writeFile(filePath, updatedData, 'utf8', (err) => {
                    if (err) {
                        console.error('Lỗi khi ghi tệp tin:', err);
                    } else {
                        console.log('Đã thêm nội dung vào cuối tệp tin thành công.');
                    }
                });
            }
        });

        fs.readFile(unsearchPath, 'utf8', (err, dt) => {
            if (err) {
                console.error('Lỗi khi đọc tệp tin:', err);
            } else {
                let jsonData = JSON.parse(dt); // Phân tích cú pháp JSON thành đối tượng JavaScript
                jsonData = [...jsonData, ...unsearch]; // Thêm nội dung mới vào đối tượng JSON

                const updatedData = JSON.stringify(jsonData); // Chuyển đối tượng JavaScript thành chuỗi JSON

                fs.writeFile(unsearchPath, updatedData, 'utf8', (err) => {
                    if (err) {
                        console.error('Lỗi khi ghi tệp tin:', err);
                    } else {
                        console.log('Đã thêm nội dung vào cuối tệp tin thành công.');
                    }
                });
            }
        });
    }, 20000);
}, 2000);
