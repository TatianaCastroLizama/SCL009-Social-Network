export const postCreate = (userPost,userStageDirection) =>{
    let db = firebase.firestore();
    let date= Date.now()
    console.log(date)
    firebase.auth().onAuthStateChanged(user=> {
        db.collection('users').doc(user.uid).get().then(doc=> {
            db.collection("post").add({
                author: user.uid,
                name: doc.data().name,
                age:doc.data().age,
                location: doc.data().location,
                date: date,
                message: userPost,
                stage_direction: userStageDirection,
                likes: 0,
                liked:""
            
            })  
        })
    })
}





//real-time
export const realTime = () => {
   console.log("fjida")
    let db = firebase.firestore();
    db.collection("post").orderBy("date","desc").onSnapshot(snapshot =>{
    let changes = snapshot.docChanges();
    changes.forEach(change=>{
        console.log(change.type);
        if(change.type == 'added'){


        }else if(change.type == 'removed'){console.log("jsdad");
            let post = document.getElementById("div-container-"+change.doc.id)
            if(post==null){
                return
            }
            document.getElementById("post-wall").removeChild(post);
        }else if ( change.type == 'modified'){
        //Conteo de Likes
        let likes = document.getElementById("count_"+change.doc.id)
        likes.innerHTML = change.doc.data().likes
        isLikeOrDislike(change.doc)

        let btnLike = document.getElementById("btn-like-"+change.doc.id)
        let btnLikeClone = btnLike.cloneNode(true);
        let btnDislike = document.getElementById("btn-dislike-"+change.doc.id);
        let btnDislikeClone = btnDislike.cloneNode(true);
        btnLike.parentNode.replaceChild(btnLikeClone, btnLike)
        btnDislike.parentNode.replaceChild(btnDislikeClone, btnDislike)
        
        btnLikeClone.addEventListener("click", ()=>{
           
        db.collection("post").doc(change.doc.id).update({ likes: (Number(change.doc.data().likes)+1), liked: true})
        
        })
    
    btnDislikeClone.addEventListener("click", ()=>{
       
        if(change.doc.data().likes != "0"){
        db.collection("post").doc(change.doc.id).update({ likes: (Number(change.doc.data().likes)-1), liked: false});}
    })



            change.type = "add"

        }
    
    })
})


}

export const renderPost = (change,db) =>{
    
    const postDate = new Date(change.data().date);

    // Contenedor 
    const divContainer = document.createElement("Div");
    divContainer.setAttribute("class", "post-container" );
    divContainer.id="div-container-"+change.id;

    //COL para botones superiores
    const divBtnRowFirst = document.createElement("Div");
    divBtnRowFirst.setAttribute("class", "col-btn-post-icons" );
    divContainer.appendChild(divBtnRowFirst);
    

     // Boton Borrar
    const btnDelete = document.createElement("Button");
    btnDelete.id="btn-delete-"+change.id
    btnDelete.setAttribute("class","btn-post");
    divBtnRowFirst.appendChild(btnDelete);

    //IMG para boton Borrar
    const imgBtnDelete = document.createElement("img");
    imgBtnDelete.setAttribute("class", "btn-delete-icon");
    imgBtnDelete.setAttribute("src", "assets/img/delete_icon.png")
    btnDelete.appendChild(imgBtnDelete);

    //Contenedor 
    const divElement = document.createElement("Div");
    divElement.setAttribute("class", "post-read");
    divContainer.appendChild(divElement);
    
    //Creando parrafo contenedor de informacion
    const allData = document.createElement("P");
    divElement.appendChild(allData);

    //Span Fecha
    const dateSpan = document.createElement("Span");
    const textDate = document.createTextNode(postDate.toLocaleDateString()+" a las "+postDate.toLocaleTimeString());
    dateSpan.setAttribute("class","post-date")
    dateSpan.appendChild(textDate);
    allData.appendChild(dateSpan);
   
    //BR
    const brDate = document.createElement("br");
    allData.appendChild(brDate);
    
    //Span Nombre
    const nameSpan = document.createElement("Span");
    const textName = document.createTextNode(change.data().name)
    nameSpan.setAttribute("class","post-top");
    nameSpan.appendChild(textName);
    allData.appendChild(nameSpan);

    //BR
    const brName = document.createElement("br");
    allData.appendChild(brName);

    //Span Stage
    const stageSpan = document.createElement("span");
    const textStage = document.createTextNode("( "+change.data().stage_direction+" ) :")
    stageSpan.appendChild(textStage);
    allData.appendChild(stageSpan);

    //Parrafo Msg
    const msgSpan = document.createElement("p");
    const textMsg = document.createTextNode(change.data().message);
    msgSpan.setAttribute("class","post-message");
    msgSpan.appendChild(textMsg)
    allData.appendChild(msgSpan)
    



    //Div contenedor de botones like y dislike 
    const divBtnRow = document.createElement("Div");
    divBtnRow.setAttribute("class", "row-btn-post" );
    divContainer.appendChild(divBtnRow)
    
    //Div COl likes
    const divLikesCol = document.createElement("Div");
    divLikesCol.setAttribute("class", "left-col-likes");
    divBtnRow.appendChild(divLikesCol);

    //Div row span y boton
    const divLikesRow = document.createElement("Div");
    divLikesRow.setAttribute("class", "row-post");
    divLikesCol.appendChild(divLikesRow);

    // Parrafo de likes
    const likeSpan = document.createElement("p");
    likeSpan.setAttribute("id","count_"+change.id)
    const textLike = document.createTextNode(change.data().likes);
    likeSpan.appendChild(textLike);
    divLikesRow.appendChild(likeSpan);
   
      // Boton Like
      const btnLike = document.createElement("Button");
      btnLike.id="btn-like-"+change.id
      btnLike.setAttribute("class","icon-btn");
      divLikesRow.appendChild(btnLike)

       //IMG para boton Like
       const imgBtnLike = document.createElement("img");
       imgBtnLike.setAttribute("class", "btn-dis-like-icon");
       imgBtnLike.setAttribute("src", "assets/img/dislike_icon.png")
       btnLike.appendChild(imgBtnLike);
    
        // Botone DisLike
        const btnDislike = document.createElement("Button");
        btnDislike.id="btn-dislike-"+change.id
        btnDislike.setAttribute("class","icon-btn");
        divLikesRow.appendChild(btnDislike);
 
         //IMG para boton DisLike
         const imgBtnDislike = document.createElement("img");
         imgBtnDislike.setAttribute("class", "btn-dis-like-icon");
         imgBtnDislike.setAttribute("src", "assets/img/like_icon.png")
         btnDislike.appendChild(imgBtnDislike);

          //Div COLlikes
    const divParrRow = document.createElement("Div");
    divParrRow.setAttribute("class", "center-col-likes");
    divBtnRow.appendChild(divParrRow);

           //Parrafo firma
     const footer = document.createElement("p");
     const textFooter = document.createTextNode("( "+change.data().name+", "+change.data().age+" años... de "+change.data().location+" ) ")
     footer.setAttribute("class","post-age-location")
     footer.appendChild(textFooter);
     divParrRow.appendChild(footer);

    //quitando eventlistener
   let btnDeleteClone = btnDelete.cloneNode(true);

    btnDelete.parentNode.replaceChild(btnDeleteClone, btnDelete);

    btnDeleteClone.addEventListener('click', ()=>{
        if(confirm("¿Realmente quieres eliminar esta publicación?")){
        db.collection('post').doc(change.id).delete()  
    }
    })

    

    //Funcion boton like
    btnLike.addEventListener("click", ()=>{
    db.collection("post").doc(change.id).update({ likes: (Number(change.data().likes)+1), liked: true})
    
    
    })
    //Funcion boton dislike
    btnDislike.addEventListener("click", ()=>{
        if(change.data().likes != "0"){
        db.collection("post").doc(change.id).update({ likes: (Number(change.data().likes)-1), liked: false});
        }
       
        })
        
     
    // Unir todo a div contenedor post-wall    
    const algo = document.getElementById("post-wall");
    if(algo!=null){
    algo.appendChild(divContainer);
}
isLikeOrDislike(change)
userPostDelete(change)
}





const userPostDelete = (change) =>{
    firebase.auth().onAuthStateChanged(user => {
        const btnDelete = document.getElementById("btn-delete-"+change.id);
        if(btnDelete == null || user==null){
            return
        }
    if(user.uid == change.data().author){
        btnDelete.style.display = "inline";
    }else{
        btnDelete.style.display = "none";
    }})}

const isLikeOrDislike = (change) =>{
        const btnLike = document.getElementById("btn-like-"+change.id);
        const btnDislike = document.getElementById("btn-dislike-"+change.id);
        if(btnLike == null || btnDislike == null){
            return
        }
    if(change.data().liked){
        btnLike.style.display= "none";
        btnDislike.style.display= "inline";
    }else{
        btnDislike.style.display= "none";
        btnLike.style.display= "inline";
    }
}




// //real-time
// export const realTime = () => {
//     let db = firebase.firestore();
//     db.collection("post").orderBy("date","desc").onSnapshot(snapshot =>{
//     let changes = snapshot.docChanges();
//     changes.forEach(change=>{
        
//         if(change.type == 'added'){
//             renderPost(change.doc,db);
//         }else if(change.type == 'removed'){
//             let post = document.getElementById("div-container-"+change.doc.id)
//             document.getElementById("post-wall").removeChild(post);}
//         // }else if ( change.type == 'modified'){
//         //     let likes = document.getElementById("count_"+change.doc.id)
//         //     likes.innerHTML = change.doc.data().likes+"❤️"
            

//         // }
//     })
// })


// }
