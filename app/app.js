/* eslint-disable max-lines-per-function */
const express = require('express');
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const { getInformationFromHTMLString } = require('./handleHtmlString');

const app = express();

app.get('/generateTable/:url', async (req, res) => {
  console.time('xlsx');
  const fiscalNoteCode = req.params.url;
  
  const URL = `http://www.sefaz.mt.gov.br/nfce/consultanfce?p=${fiscalNoteCode}`;
  const result = await fetch(URL);
  const text = await result.text();

  const fiscalNoteInfo = getInformationFromHTMLString(text);
  fiscalNoteInfo.unshift(['Itens', 'Valor']);

  const workbook = XLSX.utils.book_new();

  const worksheet = XLSX.utils.aoa_to_sheet(fiscalNoteInfo);
  worksheet['!cols'] = [{ width: 60 }, { width: 10 }];

  XLSX.utils.book_append_sheet(workbook, worksheet);

  const buffer = XLSX.write(workbook, { type: 'buffer' });

  const tempFilePath = path.join(__dirname, 'temp.xlsx');
  fs.writeFileSync(tempFilePath, buffer);

  res.download(tempFilePath, 'example.xlsx', (err) => {
    if (err) {
      console.error('Falha na parte de download:', err);

      res.status(400).send('Failed to download file:', err);
    }

    fs.unlinkSync(tempFilePath);
  });

  console.timeEnd('xlsx');
});

module.exports = app;