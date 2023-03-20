// const Chance = require('chance');
// const chance = new Chance();
const fs = require('fs');
// const data = [];

// for (let i = 0; i < 200; i++) {
//   const date = chance.date({year: 2023});
//   data.push({
//     id: i + 1,
//     user_id: chance.name(),
//     title: chance.sentence({words: 5}),
//     content: chance.paragraph(),
//     created_at: date.toISOString(),
//   });
// }

// // console.log(data);
// const filePath = 'data.txt';
// const fileContent = JSON.stringify(data);

// fs.writeFile(filePath, fileContent, err => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(`Data saved to ${filePath}`);
// });
const filePath = 'data.txt';
fs.readFile(filePath, (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const parsedData = JSON.parse(data);
  console.log(parsedData[3].title);
});
