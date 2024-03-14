import{f as p}from"./fetch--FzvIhyn.js";E();document.addEventListener("DOMContentLoaded",function(){l()});const k=document.querySelector(".get_entry");k.addEventListener("click",l);async function l(){console.log("Haetaan kaikki käyttäjän merkinnät tietokannasta");const o=`http://127.0.0.1:3000/api/entries/${localStorage.getItem("user_id")}`,n={method:"GET",headers:{Authorization:"Bearer: "+localStorage.getItem("token")}};p(o,n).then(d=>{I(d)})}function I(e){console.log(e);const o=document.querySelector(".tbody");o.innerHTML="",e.forEach(t=>{console.log(t.entry_date,t.user_id,t.user_level);const n=document.createElement("tr"),d=new Date(t.entry_date).toLocaleDateString("fi-Fi"),i=document.createElement("td");i.innerText=d;const r=document.createElement("td");r.innerText=t.mood;const s=document.createElement("td");s.innerText=t.weight;const u=document.createElement("td");u.innerText=t.sleep_hours;const m=document.createElement("td");m.innerText=t.notes;const y=document.createElement("td"),a=document.createElement("button");a.className="del",a.setAttribute("data-id",t.entry_id),a.innerText="Poista merkintä",a.addEventListener("click",_),y.appendChild(a);const g=document.createElement("td"),c=document.createElement("button");c.className="mod",c.setAttribute("data-id",t.entry_id),c.innerText="Muokkaa",c.addEventListener("click",()=>v(t)),g.appendChild(c),n.appendChild(i),n.appendChild(r),n.appendChild(s),n.appendChild(u),n.appendChild(m),n.appendChild(g),n.appendChild(y),o.appendChild(n)})}const h=document.getElementById("editEntryModal"),f=document.querySelector(".close");function v(e){document.getElementById("editDate").value=new Date(e.entry_date).toISOString().split("T")[0],document.getElementById("editMood").value=e.mood,document.getElementById("editWeight").value=e.weight,document.getElementById("editSleep").value=e.sleep_hours,document.getElementById("editEntry").value=e.notes,document.getElementById("entryId").value=e.entry_id,document.getElementById("editEntryForm").addEventListener("submit",B);const t=document.getElementById("editEntryModal");t.style.display="block"}f.onclick=function(){h.style.display="none"};window.onclick=function(e){e.target==h&&(h.style.display="none")};function B(e){e.preventDefault(),console.log("Päivitetään merkintä"),console.log(e);const o=document.getElementById("entryId").value,t=`https://healthdiary.northeurope.cloudapp.azure.com/${o}`;let n=localStorage.getItem("token");const d=document.getElementById("editDate").value,i=document.getElementById("editMood").value,r=document.getElementById("editWeight").value,s=document.getElementById("editSleep").value,u=document.getElementById("editEntry").value,m={method:"PUT",headers:{Authorization:"Bearer: "+n,"Content-type":"application/json"},body:JSON.stringify({id:o,entry_date:d,mood:i,weight:r,sleep_hours:s,notes:u})};p(t,m).then(y=>{console.log(y),alert("Merkinnän päivitys onnistunut!");const a=document.getElementById("editEntryModal");a.style.display="none",l()})}function _(e){console.log(e);const t=`https://healthdiary.northeurope.cloudapp.azure.com/api/entries/${e.target.attributes["data-id"].value}`,d={method:"DELETE",headers:{Authorization:"Bearer: "+localStorage.getItem("token")}};confirm("Haluatko varmasti poistaa merkinnän?")&&p(t,d).then(r=>{console.log(r),l()})}function E(){console.log("Hei, täällä ollaan!");const e="https://healthdiary.northeurope.cloudapp.azure.com/api/auth/me",t={method:"GET",headers:{Authorization:"Bearer: "+localStorage.getItem("token")}};p(e,t).then(n=>{console.log(n),document.getElementById("name").innerHTML=n.user.username})}document.getElementById("logout").addEventListener("click",function(){alert("Kirjauduttu ulos"),localStorage.removeItem("token"),localStorage.removeItem("username"),window.location.href="index.html"});E();document.addEventListener("DOMContentLoaded",function(){l()});
