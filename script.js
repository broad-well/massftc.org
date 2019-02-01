window.addEventListener('load',function(b,w,x,l,f,r,A,N,D,a) {
//arrays for formatting the data we recieve later
A=['January','February','March','April','May','June','July','August','September','October','November','December']
N=['th','st','nd','rd']
r=new XMLHttpRequest();
//open xhr
r.open('GET','qualifiers.json');
//process data once it has loaded
r.onload = E=>{
E=JSON.parse(r.responseText)
//sort by the qualifier number
E=E.sort((a,c)=>{return a.qualNum-c.qualNum})
//fill every card container
document.querySelectorAll('.qualifier-cards').forEach(s => {
//reset innerHTML to nothing
s.innerHTML = ''
//iterate through the JSON file and format data
for(l=0;l<E.length;l++) {
//make a new Date object for the day of the competition
a=E[l].date.split('-');
D = new Date(a[2],a[0]-1,a[1])
//create an element for the card
f=document.createElement('div');
//add the CSS class 
f.classList.add('qualifier-card')
//set innerHTML
f.innerHTML = 
"<label>Qualifier "+E[l].qualNum+"</label>" +
"<h2>"+E[l].name+"</h2>" +
'<p class="date">' + A[D.getMonth()] + ' ' + D.getDate() + '<sup>' + (N[D.getDate() % 10] || 'th') + '</sup>' +
'<br><span class="time">' + E[l].timeRange + '</span>' +
'<p class="location">' + E[l].location + '</p>' +
'<p class="region">' + E[l].region + '</p>' +
'<div class="buttonset"> <a href="events/' + (E[l].results_url||(D.getMonth()<6?D.getFullYear()-1:D.getFullYear()) +'-'+ E[l].qualNum +'-qual-teams.pdf')+'">Teams</a>' +
'<a href="events/' + (E[l].results_url||(D.getMonth()<6?D.getFullYear()-1:D.getFullYear()) + '-' + E[l].qualNum +'-qual-teams.pdf')+'"'+(D.getTime()>Date.now()?' disabled':'')+'>Results</a> </div>'
//append the card element to the container
s.appendChild(f);
}

})
}
//send request
r.send()

});