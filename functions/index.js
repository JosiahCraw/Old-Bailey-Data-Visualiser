var request = require('request')
var parseXML = require('xml2js').parseString
const functions = require('firebase-functions');

/* GET users listing. */
exports.getData = functions.https.onRequest((req, res) => {
  punishment = req.query.punishment
  crime = req.query.crime
  verdict = req.query.verdict
  yearTo = req.query.year_to
  yearFrom = req.query.year_from

  let dataURL = `https://www.oldbaileyonline.org/stats.jsp?y=year&x=punishmentCategory&countBy=_punishments&render=&_offences_offenceCategory_offenceSubcategory=${crime}&_verdicts_verdictCategory_verdictSubcategory=${verdict}&_punishments_punishmentCategory_punishmentSubcategory=${punishment}&_defendantNames_defendantGender=&defendantAgeFrom=&defendantAgeTo=&_victimNames_victimGender=&victimAgeFrom=&victimAgeTo=&_divs_fulltext=&kwparse=and&fromMonth=01&fromYear=${yearFrom}&toMonth=12&toYear=${yearTo}&export=csv`
  console.log(dataURL)
  request(dataURL, (err, response, body) => {
    body = body.replace('<br/>', '')
    let years = new Array()
    let data = new Array()
    parseXML(body, {trim: true}, (err, result) => {
      rows = result.table.tr
      rows = rows.slice(2)

      rows.forEach(element => {
        years.push(parseInt(element.th[0]))
        data.push({meta: `Year: ${element.th[0]}`, value: parseInt(element.td[0])})
      });

      res.json({ years: years, data: data });
    })
  })
});