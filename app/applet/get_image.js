import fetch from 'node-fetch';

async function getOGImage(url) {
  try {
    const res = await fetch(url);
    const text = await res.text();
    const match = text.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i);
    if (match) {
      console.log(match[1]);
    } else {
      console.log('No og:image found for', url);
    }
  } catch (err) {
    console.error(err);
  }
}

getOGImage('https://ibb.co/RGg2bp73');
getOGImage('https://ibb.co/kgCk055z');
