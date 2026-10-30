const WHATSAPP="573204632683";
// Recubridoras y fileteadoras son productos de ejemplo hasta confirmar inventario real.
const products=[
{id:"p1",cat:"plana",name:"Máquina plana JACK F6",brand:"JACK",desc:"Máquina plana industrial. Modelo según la foto recibida.",img:"assets/plana-jack-f6.jpg", real:true} ,
{id:"p2",cat:"plana",name:"Máquina plana JINTHEX",brand:"JINTHEX",desc:"Máquina plana industrial. Modelo exacto por confirmar.",img:"",real:true},
{id:"r1",cat:"recubridora",name:"Recubridora industrial",brand:"SIRUBA",desc:"Ejemplo de catálogo. Pregunta por el modelo disponible.",img:"https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80"},
{id:"r2",cat:"recubridora",name:"Recubridora industrial",brand:"JACK",desc:"Ejemplo de catálogo. Pregunta por el modelo disponible.",img:""},
{id:"r3",cat:"recubridora",name:"Recubridora industrial",brand:"JUKI",desc:"Ejemplo de catálogo. Pregunta por el modelo disponible.",img:""},
{id:"f1",cat:"fileteadora",name:"Fileteadora industrial",brand:"JACK",desc:"Ejemplo de catálogo. Pregunta por el modelo disponible.",img:"https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=800&q=80"},
{id:"f2",cat:"fileteadora",name:"Fileteadora industrial",brand:"SIRUBA",desc:"Ejemplo de catálogo. Pregunta por el modelo disponible.",img:"https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80"},
{id:"f3",cat:"fileteadora",name:"Fileteadora industrial",brand:"JUKI",desc:"Ejemplo de catálogo. Pregunta por el modelo disponible.",img:"https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=800&q=80"}];
let category="todas",cart=[];
const $=s=>document.querySelector(s);
function label(c){return ({plana:"Plana",recubridora:"Recubridora",fileteadora:"Fileteadora"})[c]||c}
function render(){
 const q=$("#search").value.trim().toLowerCase();
 const shown=products.filter(p=>(category==="todas"||p.cat===category)&&`${p.name} ${p.brand} ${p.cat}`.toLowerCase().includes(q));
 $("#products").innerHTML=shown.length?shown.map(p=>`<article class="card"><div class="photo">${p.img?`<img src="${p.img}" alt="Imagen ilustrativa de ${p.brand}" loading="lazy" onerror="this.remove()">`:'<span class="placeholder">🧵</span>'}</div><div class="info"><span class="tag">${label(p.cat)} · ${p.real?"Foto pendiente":"Ejemplo"}</span><h3>${p.name}</h3><b>${p.brand}</b><p>${p.desc}</p><button class="btn red" data-add="${p.id}">Agregar al pedido</button><button class="btn" data-ask="${p.id}">Consultar por WhatsApp</button></div></article>`).join(""):'<p>No encontramos máquinas con esa búsqueda.</p>';
}
function renderCart(){
 $("#count").textContent=cart.length;$("#send").disabled=!cart.length;
 $("#cartItems").innerHTML=cart.length?cart.map((p,i)=>`<div class="cart-row"><span><b>${p.brand}</b> — ${p.name}</span><button data-remove="${i}">Quitar</button></div>`).join(""):"Todavía no has agregado máquinas.";
}
function whatsapp(message){window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`,"_blank","noopener")}
$("#products").addEventListener("click",e=>{const add=e.target.closest("[data-add]")?.dataset.add,ask=e.target.closest("[data-ask]")?.dataset.ask;if(add){cart.push(products.find(p=>p.id===add));renderCart();$("#carrito").scrollIntoView({behavior:"smooth"})}if(ask){const p=products.find(p=>p.id===ask);whatsapp(`Hola, quiero consultar por ${p.name}, marca ${p.brand}, categoría ${label(p.cat)}. ¿Tienen disponibilidad y cuál es el precio?`)}});
$("#cartItems").addEventListener("click",e=>{const i=e.target.closest("[data-remove]")?.dataset.remove;if(i!==undefined){cart.splice(Number(i),1);renderCart()}});
$("#send").addEventListener("click",()=>{if(cart.length)whatsapp("Hola, quiero consultar este pedido:\n"+cart.map((p,i)=>`${i+1}. ${p.name} — ${p.brand} (${label(p.cat)})`).join("\n")+"\nPor favor confirmen disponibilidad, precio y entrega.")});
document.querySelectorAll("[data-cat]").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll("[data-cat]").forEach(x=>x.classList.remove("active"));b.classList.add("active");category=b.dataset.cat;render()}));
$("#search").addEventListener("input",render);$("#year").textContent=new Date().getFullYear();
$("#menuBtn").addEventListener("click",()=>$("#nav").classList.toggle("open"));
render();renderCart();