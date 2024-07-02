const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Define the path to the index.html file
const indexPath = path.join(__dirname, '/dist/twitposter/browser/index.html');

// Read the index.html file
fs.readFile(indexPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading index.html:', err);
    return;
  }

  // Generate a new GUID
  const guid = uuidv4();

  // Insert the GUID into the index.html file
  const modifiedData = data.replace(
    '</body>',
    `<script>window.appGuid="${guid}";</script></body>`
  );

  // Write the modified content back to the index.html file
  fs.writeFile(indexPath, modifiedData, 'utf8', err => {
    if (err) {
      console.error('Error writing index.html:', err);
    } else {
      console.log('GUID inserted successfully:', guid);
    }
  });
});
