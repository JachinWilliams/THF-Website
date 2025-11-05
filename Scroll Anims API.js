

//callback function for elements intersecting the viewport
const callback = (entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting) {
            entry.target.classList.add("scrolled");
            
        }
        else {
            entry.target.classList.remove("scrolled");
        }
    });
};

//options for observer API
const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
};

//the observer
const observer = new IntersectionObserver(callback, options);

//observing scrollEls
let scrollEls = document.getElementsByClassName("scrollE");

Array.from(scrollEls).forEach(el => observer.observe(el));


