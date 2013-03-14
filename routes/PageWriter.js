var sbuilder = require('./StringBuilder.js');
exports.createPageWriter = function ()
{
  console.log('Creating pagewriter object...');
  return new PageWriter();
}

function PageWriter(value)
{
    this.sb = sbuilder.createStringBuilder();
    this.sb.appendln('<!DOCTYPE html>');
    this.sb.appendln('<html>');
    this.sb.appendln('<body>');   
    this.sb.appendln('<div id=\"container\" style=\"width:800px\">');     
}

// Appends the given value to the end of this instance.
PageWriter.prototype.addHeader = function (value)
{
  this.sb.appendln('<div id=\"header\" style=\"background-color:#FFA500;\">');
  this.sb.appendln('<p> Pagewriter Test... Header goes here... test page</p>');
  this.sb.appendln('</div>');
}

PageWriter.prototype.addMenu = function (value)
{
  this.sb.appendln('<div id=\"menu\" style=\"background-color:#FFD700;height:200px;width:100px;float:left;\">');
  this.sb.appendln('<b>Menu</b><br>PWLogin<br>PWLogout<br>'); 
  this.sb.appendln('</div>');

}

PageWriter.prototype.addContent = function (results)
{

  console.log(results);
  this.sb.appendln('<div id=\"content\" style=\"background-color:#EEEEEE;height:200px;width:500px;float:left;\">');
  this.sb.appendln('<ul>');
  
  for (var i in results) {
    this.sb.appendln('<li>'+results[i].users_ID+','+results[i].users_email+','+results[i].users_timestamp+'</li>');
  }  
  
  this.sb.appendln('<ul>');
  this.sb.appendln('</div>');    
}

PageWriter.prototype.addRealTime = function (value)
{
  this.sb.appendln('<div id=\"realtime\" style=\"background-color:#FFD700;height:200px;width:200px;float:right;\">');
  this.sb.appendln('<p> PW Realtime updates here...</p>');
  this.sb.appendln('</div>');    
}

PageWriter.prototype.addFooter = function (value)
{
  this.sb.appendln('<div id=\"footer\" style=\"background-color:#FFA500;clear:both;text-align:center;\">');
  this.sb.appendln('<p> PW Footer here...</p>');     
  this.sb.appendln('</div>');  
  
  this.sb.appendln('</div>');
 
  this.sb.appendln('</body>');
  this.sb.appendln('</html>');  
}


PageWriter.prototype.toString = function ()
{
    return this.sb.toString();
}
