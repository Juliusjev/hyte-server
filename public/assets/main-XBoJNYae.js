import{f as u}from"./fetch-twLTWqyN.js";const s=document.getElementById("loginModal"),t=document.getElementById("createUserModal"),d=document.getElementById("login"),y=document.getElementById("create_user"),m=s.querySelector(".close"),p=t.querySelector(".close");d.addEventListener("click",()=>{s.style.display="block"});y.addEventListener("click",()=>{t.style.display="block"});m.addEventListener("click",()=>{s.style.display="none"});p.addEventListener("click",()=>{t.style.display="none"});window.addEventListener("click",o=>{o.target===s&&(s.style.display="none")});window.addEventListener("click",o=>{o.target===t&&(t.style.display="none")});const g=t.querySelector(".createuser"),r=t.querySelector("#create_user_form");g.addEventListener("click",async o=>{o.preventDefault();const l="http://127.0.0.1:3000/api/users",a=r.querySelector("input[name=password]").value,c=r.querySelector("input[name=confirmPassword]").value;if(a!==c){alert("Salasanat eivät täsmää. Yritä uudelleen.");return}const i={username:r.querySelector("input[name=username]").value,password:r.querySelector("input[name=password]").value,email:r.querySelector("input[name=email]").value},n={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)};try{const e=await u(l,n);console.log(e),alert("Uusi käyttäjä luotu onnistuneesti! Voit nyt kirjautua sisään."),t.style.display="none"}catch(e){console.error(e),alert("Virhe käyttäjää luodessa. Tarkista tiedot ja yritä uudelleen.")}});const S=document.querySelector(".loginuser");S.addEventListener("click",async o=>{o.preventDefault(),console.log("Nyt logataan sisään");const l="http://127.0.0.1:3000/api/auth/login",a=document.querySelector("#login_form"),c={username:a.querySelector("input[name=username]").value,password:a.querySelector("input[name=password]").value},i={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(c)};try{const n=await fetch(l,i),e=await n.json();if(!n.ok)throw new Error(e.message||"Unauthorized user: käyttäjänimi tai salasana ei täsmää");console.log(e),localStorage.setItem("token",e.token),localStorage.setItem("username",e.user.username),localStorage.setItem("user_id",e.user.user_id),alert("Olet nyt kirjautunut"),window.location.href="home.html"}catch(n){console.error("Login error:",n),alert(n.message)}});
