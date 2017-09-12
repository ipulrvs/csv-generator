# CSV-Generator Sample App
This repository is used for generating csv for sample import for testing import requirement. You can customize to see you fit.

![csv generator h2h](https://user-images.githubusercontent.com/6582408/30315548-8ca1f8fc-97ce-11e7-9127-7e04a923d1a4.png)

## Getting Started 
- Clone this Repository `git clone https://github.com/ipulrvs/csv-generator`
- Install requirement module `npm install` or `yarn`
- Run Server with `http-server .` or `open/drag index.html`to your Browser

## Manual 
- Input total data and total child of object
- Pick standard delimiter `,` or `;`
- This app generate csv 3 header that contain ''FK'', ''LT'' and ''OF'' and each ''FK'' will have lots of ''OF'' rows
- Click Submit and you will see table contain how much OF in each FK
- Then you see button called `fetch`
- Click `fetch` button and wait for data mining (we use api to generate data)
- And save file to your drive

## Reminder Logic
- Generate requirement data parent (FK) and children (OF) with random number from input form
- After get requirement data `fetch` data from internet with `API`
- After progress has complete re-map RAW data to consumable DATA
- Then convert MAP data to CSV format