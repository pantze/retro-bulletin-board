function generate(fileList) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Honung Mod Board</title>
      <link rel="stylesheet" href="/static/retro-style.css">
    </head>
    <body>
      <header>
        <h1>Welcome to honung.pantze.se</h1>
      </header>
      <div class="container">
        <h2>Shared mods:</h2>
        ${fileList.join('<br>')}
      </div>
      <footer>
          <pre>
           _    _                               
          | |  | |                              
          | |__| | ___  _ __  _   _ _ __   __ _ 
          |  __  |/ _ &#92;| '_ &#92;| | | | '_ &#92; / _\` |
          | |  | | (_) | | | | |_| | | | | (_| |
          |_|  |_|&#92;___/|_| |_|&#92;__,_|_| |_|&#92;__, |
                                           __/ |
                                          |___/          
          </pre>
        <p>&copy; 2025 honung.pantze.se</p>
      </footer>
    </body>
    </html>
  `;
}

module.exports = { generate };