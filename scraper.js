const cheerio = require('cheerio');
const fetch = require('node-fetch');
const url = "https://www.codechef.com/contests";
var http= require('http');
var timezone=[];
   var contests=[];
    var json = ""; 
fetch(`${url}`).then(response => response.text()).then(function(res){ 
   const $ = cheerio.load(res);
   
   var cnt=0;
   $(".dataTable").each(function(i){
   	timezone = [];
      cnt++;
      if(cnt>2)
   		return false;
     $(this).find("tbody tr").each(function(){
        
     	var end = $(this).find("td").eq(3).text();
       var code = $(this).find("td").eq(0).text();
        var start= $(this).find("td").eq(2).text();
        var link =$(this).find("td a").attr("href");
        var name = $(this).find("td").eq(1).text();
        var contest = {
        	code : code,
            name : name,
            link : link,
            start : start,
            end : end

        };
        timezone.push(contest);
     });
     contests.push(timezone); 
   });
  json = JSON.stringify(contests);
   json=JSON.parse(json);
   console.log(json[0][0].end);
    });
http.createServer(function(req,res){

	
   res.writeHead(200,{"Content-Type":"text/HTML"});
   res.write("<h1>Codechef contests:</h1>");
   res.write("<h2>Present contests</h2>");
   res.write("<table>");
   for(var i=0;i<contests[0].length;i++){
   res.write("<tr><td>"+contests[0][i].code+"</td><td><a href=http://www.codechef.com"+contests[0][i].link+">"+contests[0][i].name+"</a></td><td>"+contests[0][i].start+"</td><td>"+contests[0][i].end+"</td></tr>");
   console.log(contests[0]);
}
res.write("</table>");
res.write("<hr><br><h2>Future Contests</h2>");
res.write("<table>");
   for(var i=0;i<contests[1].length;i++){
   res.write("<tr><td>"+contests[1][i].code+"</td><td><a href=http://www.codechef.com"+contests[1][i].link+">"+contests[1][i].name+"</a></td><td>"+contests[1][i].start+"</td><td>"+contests[1][i].end+"</td></tr>");
   console.log(contests[0]);
}
res.write("</table>");
   res.end();


}).listen(9200);

