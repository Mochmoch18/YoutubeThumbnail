// pages/api/thumbnail.js
import puppeteer from 'puppeteer';

export default async (req, res) => {
  const { url } = req.query;

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // Extract the thumbnail URL from the YouTube page
    const thumbnailUrl = await page.evaluate(() => {
      const thumbnailElement = document.querySelector('link[itemprop="thumbnailUrl"]');
      return thumbnailElement ? thumbnailElement.getAttribute('href') : null;
    });

    if (thumbnailUrl) {
      res.status(200).json({ thumbnailUrl });
    } else {
      res.status(404).json({ error: 'Thumbnail not found on this page.' });
    }

    await browser.close();
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
