console.log('JS OK')

/* Ricreiamo un feed social aggiungendo al layout di base fornito, il nostro script JS in cui:
# Milestone 1
Creiamo il nostro array di oggetti che rappresentano ciascun post.
Ogni post dovrà avere le informazioni necessarie per stampare la relativa card:
- id del post, numero progressivo da 1 a n
- nome autore,
- foto autore (potrebbe mancare a qualcuno),
- data in formato americano (mm-gg-yyyy),
- testo del post,
- immagine (non tutti i post devono avere una immagine),
- numero di likes.
*Non è necessario creare date casuali, inventatele*
*Per le immagini va bene utilizzare qualsiasi servizio di placeholder ad es. Unsplash (https://unsplash.it/300/300?image=3)*
#Milestone 2
Prendendo come riferimento il layout di esempio presente nell'html, stampiamo i post del nostro feed.
#Milestone 3
Se clicchiamo sul tasto "Mi Piace" cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo.
# ****BONUS**
 1. Formattare le date in formato italiano (gg/mm/aaaa)
 2. Gestire l'assenza dell'immagine profilo con un elemento di fallback che contiene le iniziali dell'utente (es. Luca Formicola  => LF).
 3. Al click su un pulsante "Mi Piace" di un post, se abbiamo già cliccato dobbiamo decrementare il contatore e cambiare il colore del bottone. */

 //Creo un array

const posts = [
    {
        id: 1,
        name: 'Phil Mangione',
        profilePicture: 'https://unsplash.it/300/300?image=15',
        date: new Date('12-23-2022'),
        content: 'Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.',
        picture: 'https://unsplash.it/600/300?image=171',
        likes: 44
    },
    {
        id: 2,
        name: 'Vincenzo Di Masi',
        date: new Date('08-03-2021'),
        content: 'Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.',
        likes: 93
    },
    {
        id: 3,
        name: 'Romelu Lukaku',
        profilePicture: 'https://unsplash.it/300/300?image=14',
        date: new Date('05-25-2021'),
        content: 'Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.',
        picture: 'https://unsplash.it/600/300?image=155',
        likes: 90
    },
    {
        id: 4,
        name: 'Lautaro Martinez',
        date: new Date('09-22-2020'),
        content: 'Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.',
        picture: 'https://unsplash.it/600/300?image=174',
        likes: 100
    },
    {
        id: 5,
        name: 'Marcelo Brozovic',
        profilePicture: 'https://unsplash.it/300/300?image=27',
        date: new Date('06-17-2021'),
        content: 'Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.',
        likes: 77
    },
    {
        id: 6,
        name: 'Nicolò Barella',
        date: new Date('07-23-2022'),
        content: 'Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.',
        likes: 99
    },

    

]

console.log(posts);

//Prendo gli elementi dal DOM
const targetPostList = document.getElementById('container');



//# FUNZIONI

//Funzione per convertire data
const convertDate = (date) => {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    const year = date.getFullYear();
    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;
    return `${day}/${month}/${year}`
}

//Funzione per creare i post

const createPost = (item) => {

    //If per propic
   let profilePicture = `<img class="profile-pic" src="${item.profilePicture}" alt="${item.name}" />`;
   if (!item.profilePicture){
       const nameSurname = item.name.split(' ');
       console.table(nameSurname);
       let initials = ''
       nameSurname.forEach((word) => {
           initials += word.charAt(0);
       })
       console.log(initials);
       profilePicture = `<div class="profile-pic-default"><span>${initials}</span></div>`;
   }

   
   let picture = item.picture ? `<div class="post__image">
   <img src="${item.picture}" alt="" />
   </div>` : '';

   //Converto la data
   const date = convertDate(item.date);

   const post = `
   <div class="post">
       <div class="post__header">
         <div class="post-meta">
           <div class="post-meta__icon">
           ${profilePicture}
           </div>
           <div class="post-meta__data">
             <div class="post-meta__author">${item.name}</div>
             <div class="post-meta__time">${date}</div>
           </div>
         </div>
       </div>
       <div class="post__text">
         ${item.content}
       </div>
       <div class="post__image">
         ${picture}
       </div>
       <div class="post__footer">
         <div class="likes js-likes">
           <div class="likes__cta">
             <button class="like-button js-like-button" href="#" data-postid="1">
               <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
               <span class="like-button__label">Mi Piace</span>
             </button>
           </div>
           <div class="likes__counter">Piace a <b id="like-counter-${item.id}" class="js-likes-counter">${item.likes}</b> persone</div>
         </div>
       </div>
     </div>
   `;
  return post
}


//Funzione per aggiungere il post nella pagina

const addPosts = array => {

   let posts = ''
   array.forEach((post) => {
       posts += createPost(post);
   });

   return posts
}

//Stampo
targetPostList.innerHTML = addPosts(posts);

//Prendo il button dal DOM
const likeButtons = document.querySelectorAll('.like-button');

//Event Listener
likeButtons.forEach( (button, i) => {
   button.addEventListener('click', () => {
       //Toggle 
       button.classList.toggle('like-button--liked');
       
       //Incremento like button
       if (button.classList.contains('like-button--liked')){
           posts[i].likes++;
       } else {
           posts[i].likes--; 
       }

       const likeTarget = document.getElementById(`like-counter-${i+1}`);
       likeTarget.innerText = posts[i].likes;
   })
});