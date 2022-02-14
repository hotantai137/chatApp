var fs = require('fs'),
    request = require('request');

var download = async function(uri, filename, callback){
    // let fileContents = await request(myUrl)
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);
    if(res.headers['content-type'] == 'image/png'){
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    }    
  });
};

var autoDownloadImage = async function(){
    let url = 'https://web.telegram.org/k/assets/img/emoji/1f910.png'
    let imageIndex = 600;
    for(let i = 600; i < 999; i++){
        url = `https://web.telegram.org/k/assets/img/emoji/1f${i}.png`;
        await download(url, '1f' + i  + '.png', function(){
            console.log('done image: ' + '1f' + i + '.png');
          })
    }
}

autoDownloadImage();
// download('https://web.telegram.org/k/assets/img/emoji/1f910.png', 'google.png', function(){
//   console.log('done');
// });