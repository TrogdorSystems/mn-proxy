module.exports = (script) => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Silverspoon</title>
    </head>
    <link rel="stylesheet" type="text/css" href="styles.css">
    <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>  
    <body>
      ${script}
    </body>
  </html>
`;

