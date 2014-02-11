module.exports = function (jsonStorage) {
    jsonStorage.listen.on('update:name', function (name) { 
        console.log('update all names');
    });
};
