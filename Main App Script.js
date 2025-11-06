import {programmers, programs} from "./Databases.js";

//page switching
var pages = document.getElementsByClassName("page");
var links = document.getElementsByClassName("nav-link");
function page (index) {
    
    //Hiding all pages
    for (var i = 0; i < pages.length; i++) {
        pages[i].style.display = "none";
    }
    
    //Displaying page
    pages[index].style.animation = "2s fade-in forwards"; 
    pages[index].style.display = "block";
    
    //scrolling to top
    window.scroll({top:0,behavior:"smooth"});
    
    
    //Making all nav links inactive
    for (var i = 0; i < links.length; i++) {
        links[i].classList.remove("active");
    }
    
    //Adding class to nav-link
    links[index].classList.add("active");
    
};
page(0);

//project page
var pjpages = document.querySelectorAll(".project-page");
var pjlinks = document.querySelectorAll(".pj-nav-links");
function pjPage (index) {

    //Hiding all pages
    for (var i = 0; i < pjpages.length; i++) {
        pjpages[i].style.display = "none";
    }
    
    //Displaying page
    pjpages[index].style.display = "block";
    pjpages[index].style.animation = "2s fade-in forwards"; 
    
    //scrolling to top
    window.scroll({top:0,behavior:"smooth"});
    
    
    //Making all nav links inactive
    for (var i = 0; i < pjlinks.length; i++) {
        pjlinks[i].classList.remove("active");
    }
    
    //Adding class to nav-link
    pjlinks[index].classList.add("active");

}
pjPage(2);

//swiping on team carousel
function swipeRight(car) {
    document.getElementById(car).querySelector(".team-container").scrollBy({ left: 300, behavior: 'smooth' });
}
function swipeLeft(car) {
    document.getElementById(car).querySelector(".team-container").scrollBy({ left: -300, behavior: 'smooth' });
}

//Adding members
function addMember(data, car) {
    var card = document.createElement("div");
    card.classList.add("member-card");
    
    card.innerHTML = `
        <h3>${data.name}</h3>
        <img src="${data.avatar}" alt="logo" class="member-avatar">
        <p class="member-subtext">${data.user}</p>
        <p>${data.bio}
            <em>~${data.bioAuthor}, ${data.date}</em>
        </p>
        `;
        
    car.appendChild(card);
}

//adding carousel
function addCarousel(data, section) {
    var car = document.createElement("div");
    car.classList.add("team-container");
    
    data.forEach(member => {
        addMember(member, car);
    });
    
    section.appendChild(car);
    
}

//adding team section
function addTeam(data, id) {
    
    var team = document.createElement("div");
    team.classList.add("content-section");
    team.id = "yr"+id;
    
    team.innerHTML += `<h2>Team of ${id}</h2>`;
    
    addCarousel(data, team);
    
    var leftBtn = document.createElement('button');
    leftBtn.className = 'btn2';
    leftBtn.innerHTML = '&larr;';
    leftBtn.addEventListener('click', () => swipeLeft(team.id));

    var rightBtn = document.createElement('button');
    rightBtn.className = 'btn2';
    rightBtn.innerHTML = '&rarr;';
    rightBtn.style.float = "right";
    rightBtn.addEventListener('click', () => swipeRight(team.id));

    team.appendChild(leftBtn);
    team.appendChild(rightBtn);

    
    document.querySelector("#teams").appendChild(team);
    
}

//Create teams based on programmers database
var dividedTeams = {};
programmers.forEach(pro => {
    
    if(pro.team in dividedTeams) {
        dividedTeams[pro.team].push(pro);
    }
    else {
        dividedTeams[pro.team] = [pro];
    }
    
});
for (var i = Object.keys(dividedTeams).length-1; i >= 0; i--) {
    var team = Object.keys(dividedTeams)[i];
    addTeam(dividedTeams[team], team)
}

//Add project to appropiate page
function addProgram(data) {
    var pro = document.createElement("div");
    pro.classList.add("program");
    pro.innerHTML = `
    <img src="${data.link}/latest.png" alt="program thumbnail" class="program-img">
    <div class="program-text">
        <a href="${data.link}"><h3>${data.name}</h3></a>
        <p>By ${data.author}</p>
    </div>`;

    document.getElementById(data.year).appendChild(pro);
}

programs.forEach(program => addProgram(program));

//Event listeners for buttons and links

//nav links
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    page(parseInt(link.dataset.page, 10));
  });
});

//Footer links
document.querySelectorAll(".foot-links").forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault(); // Prevent default anchor behavior
        page(parseInt(link.dataset.page, 10)); // Call your page-switching function
    });
});

//Project page links
document.querySelectorAll(".pj-nav-links").forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault(); // Prevent default anchor behavior
        pjPage(parseInt(link.dataset.page, 10));
    });
});

//Page switching buttons
document.querySelectorAll(".page-switcher").forEach(btn => {
    btn.addEventListener("click", () => {
        page(parseInt(btn.dataset.page, 10))
    });
});



