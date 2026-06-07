const https = require('https');
https.get('https://ibb.co/wN3Zy2nk', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const match = data.match(/property="og:image" content="(.*?)"/);
    if(match) console.log(match[1]);
  });
});
