const { JSDOM } = require('jsdom');

const getTable = (string) => {
  const tableString = string.match(/<table border(.*?)<\/table>/sg);
  const temp = Array.from(tableString);

  return new JSDOM(temp[0]);
};

const getTdsArray = (stringy) => {
  const tableDOM = getTable(stringy);
  
  const tds = tableDOM.window.document.querySelectorAll('tr');

  return Array.from(tds);
};

const constructTitleAndValueArr = (stringy) => {
  const tdsArray = getTdsArray(stringy);

  const titleAndValueArr = tdsArray.map((td) => {
    const title = td.querySelector('span.txtTit');
    const value = td.querySelector('span.valor');

    return [title.textContent, value.textContent];
  });

  return titleAndValueArr;
};

const getInformationFromHTMLString = (string) => {
  const itensArr = constructTitleAndValueArr(string);

  return itensArr;
};

module.exports = {
  getInformationFromHTMLString,
};