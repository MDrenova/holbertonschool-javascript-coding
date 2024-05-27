const http = require('http');
const fs = require('fs').promises;

const host = 'localhost';
const port = 1245;
const database = process.argv[2]; // The name of the database is passed as an argument

let studentList = '';

const requestListener = function (req, res) {
    res.setHeader('Content-Type', 'text/plain');

    if (req.url === '/') {
        res.writeHead(200);
        res.end('Hello Holberton School!');
    } else if (req.url === '/students') {
        fs.readFile(database, 'utf8')
            .then(contents => {
                studentList = 'This is the list of our students\n';
                const lines = contents.split('\n');
                lines.forEach((line) => {
                    if (line) {
                        studentList += line + '\n';
                    }
                });
                res.writeHead(200);
                res.end(studentList);
            })
            .catch(err => {
                res.writeHead(500);
                res.end(err);
            });
    } else {
        res.writeHead(404);
        res.end('Resource not found');
    }
};

const app = http.createServer(requestListener);
app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});

module.exports = app;
