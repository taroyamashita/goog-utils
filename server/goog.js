require('dotenv').config()
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// // Load client secrets from a local file.
// fs.readFile('credentials.json', (err, content) => {
//   if (err) return console.log('Error loading client secret file:', err);
//   // Authorize a client with credentials, then call the Google Sheets API.
//   authorize(JSON.parse(content), listMajors);
// });

authorize(content=[], listMajors);
authorize(content=[], createSheet);
authorize(content = [], updateSheet);
// random small change 2 
//random small change 
/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
//   const {client_secret, client_id, redirect_uris} = credentials.installed;
  const client_secret = process.env.GOOGLE_CLIENT_SECRET
  const client_id = process.env.GOOGLE_CLIENT_ID
  const redirect_uris = [ "urn:ietf:wg:oauth:2.0:oob", "http://localhost"]

  console.log('secret is', client_secret)
//   const client_secret= 
//   const client_id = process.env.GOOG_CLIENT_ID
  
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}




/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function listMajors(auth) {
  const sheets = google.sheets({version: 'v4', auth});
//   console.log(sheets.spreadsheets)
  sheets.spreadsheets.values.get({
    spreadsheetId: '1gBneQacGkIAkUEdNrBbuu4Popt9NXLMSPlj4Is0Mcj8',
    range: 'Class Data!A2:E',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    if (rows.length) {
      console.log('Name, Major:');
      // Print columns A and E, which correspond to indices 0 and 4.
      rows.map((row) => {
        console.log(`${row[0]}, ${row[4]}`);
      });
    } else {
      console.log('No data found.');
    }
  });
}

function createSheet(auth){

    const resource = {
        properties: {
          title: "Haru Sheet"
        },
      };
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.create({
        resource,
        fields: 'spreadsheetId',
      }, (err, spreadsheet) =>{
        if (err) {
          // Handle error.
          console.log(err);
        } else {
          console.log(`Spreadsheet ID: ${spreadsheet.spreadsheetId}`);
        }
      });
}

function updateSheet(auth){

    const sheets = google.sheets({version: 'v4', auth});
     
    sheets.spreadsheets.values.append({
        spreadsheetId: '1dlYZPVm8cfm9kbSOTC3rPv0sNrBdSjBrsvIS2zKqTSw',
        range: 'Sheet1!A2',
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        resource: {
          values: [
            [new Date().toISOString(), "Some new value", "Another value"]
          ],
        },
        auth: auth
      }, (err, response) => {
        if (err) return console.error(err)
        else {
            console.log('sheet successfully updated');
        }
      })
}    
// random commit 
// random commit 2 
// random commit 3 
// random commit 4 

// write to the google sheet;
// create tool for developing different training templates

