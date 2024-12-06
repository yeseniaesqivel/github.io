let idioma = "ES";

const textos = {
    titulosNavBar: {
        es: {
            inicio: "Inicio",
            acerca: "Acerca",
            habilidades: "Habilidades",
            proyectos: "Proyectos",
            filosofia: "Filosofía",
            contacto: "Contacto"
        },
        en: {
            inicio: "Home",
            acerca: "About",
            habilidades: "Skills",
            proyectos: "Proyects",
            filosofia: "Philosophy",
            contacto: "Contact"
        }
    }
}

let cambiarIdioma = (ev) =>{
      let pathname = window.location.pathname;
    const divIdioma = document.getElementById("divIdioma");
    
    if(pathname.includes("indexe.html")){
        idioma = "ES"
        divIdioma.textContent = "ES";
        window.location.href = "/index.html"
    }else{
        idioma = "ENG"
        divIdioma.textContent = "ENG";
        window.location.href = "/indexe.html"
    }
 }
let toggle = false;
const descargar = async(ev)=>{
    ev.preventDefault();
    const link = document.createElement('a')
    link.href ="/resources/curriculum.pdf" //URL.createObjectURL(archivo)
    link.download = "curriculum.pdf";
    link.dispatchEvent(new MouseEvent('click'));
    /* const ruta = "/resources/curriculum.pdf";
    try {
        let respuesta = await fetch(ruta);
    if(!respuesta.ok){
        alert("Error al descargar el curriculum");
    }
    let archivo = respuesta.blob;
    const link = document.createElement('a');
    
    link.click();
    URL.revokeObjectURL(link.href);    
    } catch (error) {
        console.log(error);
        alert("Ha ocurrido al descargar el curriculum")
    } */
    
}
let handleResize = () => {
    const width = window.innerWidth;  // Ancho de la ventana
    const height = window.innerHeight; // Alto de la ventana
    let mainNavContainer = document.getElementById("mainNavContainer");
    let ulNav = document.getElementById("navList");
    if (width <= 767) {

        mainNavContainer.classList.add("justify-content-center");
        ulNav.classList.add("justify-content-center", "text-center");

    } else {
        mainNavContainer.classList.remove("justify-content-center");
        ulNav.classList.remove("justify-content-center", "text-center");
    }

}

document.addEventListener("DOMContentLoaded", () => {
    const navList = document.getElementById("navList");
    const titleSlogan = document.querySelector("#animatedSpanTitle");
    const slogan = document.querySelector("#anmatedSpanSlogan");
    const alink = document.getElementById("downloadLink");
    const liIdioma = document.getElementById("liLanguaje");
    liIdioma.addEventListener("click",cambiarIdioma);
    alink.addEventListener("click",descargar)
    addIntersectionObserver();
    titleSlogan.addEventListener("animationend", (ev) => {
        titleSlogan.classList.remove("animate-text");
    });
    slogan.addEventListener("animationend", (ev) => {
        slogan.classList.remove("animate-slogan");
    });
    let navItems = navList.querySelectorAll("a");
    //asignacion de idioma en javascript, se deshabilita porque se pondra manualmente en html
    /* for (let i = 0; i < Object.keys(textos.titulosNavBar.es).length; i++) {
        navItems[i].textContent = Object.values(textos.titulosNavBar[idioma])[i];
    } */
    setHeightToPhilosophyItems();
    selectDefaultPhilosophyTab("botonMision");
    disbleDefaultFormValidation();

});


const interceptionObserverConfig = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
}
const selectSkillItemAnim = (toggle) => {
    let animationName = "animate__backInLeft"
    if (toggle) {
        animationName = "animate__backInRight";
    }
    return animationName
}
const selectBioAnim = () => {
    let animationName = "animate__backInLeft";
    return animationName;
}
const selectProyextItemAnim = () => {
    let animationName = "animate__flipInY";
    return animationName;
}
const selectItemToAnimate = (type, toggle) => {
    let animationName = null;
    switch (type) {
        case "tech-skill":
            animationName = selectSkillItemAnim(toggle)
            break;
        case "soft-skill":
            animationName = selectSkillItemAnim(toggle)
            break;
        case "proyect":
            animationName = selectProyextItemAnim();
            break;
        case "bio":
            animationName = selectBioAnim();
            break;
    }
    return animationName;
}
const interceptionObserverCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {

            let animation = selectItemToAnimate(entry.target.dataset.typeitem, toggle) //selectSkillItemAnim(toggle);
            entry.target.classList.remove('invisible');
            entry.target.classList.add(animation);
            observer.unobserve(entry.target);
            toggle = !toggle;
            if (entry.target.id == "anitatedBio") {
                toggle = false;
            }
        }
    });
}
const addIntersectionObserver = () => {
    const skillsItems = document.querySelectorAll('.skill-item,.animate-bio,.proyect');
    const observer = new IntersectionObserver(interceptionObserverCallback, interceptionObserverConfig);
    skillsItems.forEach(skillItem => observer.observe(skillItem));
}

function openTab(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "flex";
    evt.currentTarget.className += " active";
}

const getHigherPhilosophyItem = () => {
    const higherElement = document.getElementById("parrafoValores");
    return higherElement.style.height;
}
const setHeightToPhilosophyItems = () => {
    const parrafoMision = document.getElementById("parrafoMision")
    const parrafoVision = document.getElementById("parrafoVision")
    parrafoMision.style.height = getHigherPhilosophyItem();
    parrafoVision.style.height = getHigherPhilosophyItem();
}
const selectDefaultPhilosophyTab = (idButton) => {
    const defaultElement = document.getElementById(idButton);
    defaultElement.click();
}
const disbleDefaultFormValidation = () => {
    'use strict'
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }
            form.classList.add('was-validated')
        }, false)
    })
}

// Get the button:
let whatsAppButton = document.getElementById("whatsAppIconContainer");
let topButton = document.getElementById("topButtonContainer");
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    whatsAppButton.style.display = "block";
    topButton.style.display = "block";
  } else {
    whatsAppButton.style.display = "none";
    topButton.style.display = "none";
  }
}


function topFunction() {
  document.body.scrollTop = 0; 
  document.documentElement.scrollTop = 0; 
}

// Agregar el evento 'resize' al objeto window
window.addEventListener('resize', handleResize);
