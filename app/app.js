const express = require('express');
const { getInformationFromHTMLString } = require('./handleHtmlString');

const app = express();

app.get('/fiscalnote/:url', async (req, res) => {
  const fiscalNote = req.params.url;
  
  const URL = `http://www.sefaz.mt.gov.br/nfce/consultanfce?p=${fiscalNote}`;
  const result = await fetch(URL);
  const text = await result.text();

  getInformationFromHTMLString(text);

  res.send('Finished');
});

module.exports = app;