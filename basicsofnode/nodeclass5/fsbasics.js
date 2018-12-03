var fs = require('fs');
console.log('before directory being created')
// fs.rmdirSync('./data1');

// fs.writeFile('file.txt','testcontent from file',function(data){
//     console.log('file is created ');
// })
// console.log('after directory being created');
// fs.writeFile('./data/readme.txt','node file system basics',function(err){
    
// })
// fs.unlink('./data/readme.txt',function(err){
//     console.log()
// })
// fs.unlink('./data/readme.txt',function(){
//     fs.rmdir('./data', function (data) {
//         console.log(data);
//         console.log('delete the data folder')
//     })
// });

// fs.readFile('./file.txt','utf8',function(err,data){
//     console.log(data);
//     fs.writeFile('./data/sample.txt', data ,function(){
//         console.log('have written the data');
//     })
// })

// fs.open('./data/sample.txt',)
// fs.readdir('./data',function(err,files){
//     if(err){
//         console.log('directory errmsg')
//     }else{
//         console.log(files.length);
//     }
// })


// fs.appendFile('file.txt','textdata',function(err,data){
//     console.log(err);
//     console.log(data);
// })
// var fd = fs.openSync('./data/sample.txt','ax');
// fs.writeFile(fd,'this is opened file ',function(err,data){
//     // console.log('err',err);
//     // console.log('data',data);
// })
// // fs.readFile(fd,'utf8',function(err,data){
// //     console.log('err' , err);
// //     console.log('reading file  using the file descriptor',data);
// // })
// fs.appendFile(fd,'appending new content in opened file ',function(err,data){
//     console.log('err',err);
//     console.log('data',data);
// })
fs.open('sample.txt','a',function(err, fd){
    console.log('err',err);
    console.log('fd',fd);
    fs.appendFile(fd, 'new text after closing the file', function (err) {
        console.log(err)
    })
    fs.close(fd,function(err){
        console.log('err msg from closing file', err);
    })
    
});
// console.log(fd);