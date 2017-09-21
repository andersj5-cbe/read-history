var sqlite = require("sqlite3").verbose();

/**
 * readHistory pulls the chrome history from specificed path
 * @param {String} path - path to the history database
 * @param {requestedCallback} cb - callback 
 */
function readHistory(path,cb){

    var db = new sqlite.Database(path);

    db.all("select url, title, datetime(last_visit_time / 1000000 -(5*60*60)+ (strftime('%s', '1601-01-01')), 'unixepoch')as 'date' from urls where last_visit_time/1000000+strftime('%s', '1601-01-01') order by Date DESC",
    function(err,data){
        if(err){
            cb(err);
        }
        cb(null,data);
    });
}

module.exports = readHistory;