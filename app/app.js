const express = require('express');
const cd = require('child_process');
const { getInformationFromHTMLString } = require('./handleHtmlString');

const app = express();

app.get('/teste', async (req, res) => {
  const coolJSON = [[1, 2, 3], ['a', 'b', 'c']];
  res.send('finished');
});

app.get('/fiscalnote/:url', async (req, res) => {
  const fiscalNoteCode = req.params.url;
  
  const URL = `http://www.sefaz.mt.gov.br/nfce/consultanfce?p=${fiscalNoteCode}`;
  const result = await fetch(URL);
  const text = await result.text();

  const fiscalNoteInfo = getInformationFromHTMLString(text);

  cd.spawn(
    'python3',
    ['./register_informations.py', JSON.stringify(fiscalNoteInfo)],
    { stdio: 'inherit' },
  );

  res.download('./nota_fiscal.xlsx');
});

module.exports = app;