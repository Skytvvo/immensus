const express = require('express');
const path = require('path');

const app = express();

const port = process.env.PORT_CLIENT || 3000;
const staticFilesPath = path.join(__dirname, 'dist');

app.use(express.static(staticFilesPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(staticFilesPath, 'index.html'));
});

const runServer = () => {
  try {
    app.listen(port, () => console.log(`The server is running on the PORT ${port}`));
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

runServer();
