const fs = require('fs');
const path = require('path');

// Directory containing quizzes
const quizzesDir = path.join(__dirname, 'quizzes');

// Read the quizzes directory and get the list of JSON files
fs.readdir(quizzesDir, (err, files) => {
    if (err) {
        console.error('Error reading quizzes directory:', err);
        process.exit(1);
    }

    // Filter to include only .json files
    const quizFiles = files.filter(file => file.endsWith('.json'));

    // Write the list of quizzes to index.json
    fs.writeFileSync(
        path.join('index.json'),
        JSON.stringify(quizFiles, null, 2)  // Pretty print the JSON
    );
    console.log('index.json has been generated successfully.');
});
