'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');


const btnScrolToo= document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1')

const nav = document.querySelector('.nav')

const tabs = document.querySelectorAll('.Options__tab');
const tabsContainer = document.querySelector('.Options__tab-container');
const tabsContent = document.querySelectorAll('.Options__content');


const navMenu= document.querySelector('.menu');

const openModal = function (e) {
    e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//scroling button

btnScrolToo.addEventListener('click', (e) =>{
  const s1coords=section1.getBoundingClientRect();
  console.log(s1coords);

//window.scrollTo(s1coords.left + window.pageYOffset, s1coords.top + window.pageYOffset);


// ///woaaaa old school
// window.scrollTo({
// left: s1coords.left + window.pageYOffset,
// top: s1coords.top + window.pageYOffset,
// behavior: 'smooth',
// })

///mult mai usorrr!!!!
section1.scrollIntoView({
    behavior:'smooth',})
})


//page navigation

// document.querySelectorAll('.nav__link').forEach( (el)=>{
//     el.addEventListener('click',(e) =>{
//         e.preventDefault();

//         const id = el.getAttribute('href');
//         console.log(id);
//         document.querySelector(id).scrollIntoView({
//           behavior: 'smooth'
//         })
//     })
// });

// 1 Add event listener to common parent element
//determine wath element originated the vent

document.querySelector('.nav__links').addEventListener('click',(e) =>{
  e.preventDefault();

  //matching strategy
  if(e.target.classList.contains('nav__link')){
    
    const idd = e.target.getAttribute('href');
        document.querySelector(idd).scrollIntoView({
         behavior: 'smooth'
        })
       
  }
})
//tabbed component


//pentru pagini scurte
// tabs.forEach(t=>{
//   t.addEventListener('click',()=>console.log('tab'))
// })

tabsContainer.addEventListener('click', function(e){
  //closest gaseste elementul ca clasa accea care este cem mai apropiat
 const clicked = e.target.closest('.Options__tab');


 if(!clicked) return;
 tabs.forEach(t => t.classList.remove('Options__tab--active'))
 
 
 
 clicked.classList.add('Options__tab--active')
// activate content area
tabsContent.forEach(c => c.classList.remove('Options__content--active'));

document.querySelector(`.Options__content--${clicked.dataset.tab}`)
.classList.add('Options__content--active')


})



//menu fade animation

const handleHover = function (e, op){
  // console.log(this);
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
 
 
    siblings.forEach( el=>{
      if(el!== link) el.style.opacity=this;
 
    });
    logo.style.opacity=this;
  }

}

 nav.addEventListener('mouseover',handleHover.bind(0.5) 
 //(e) =>{
 //handleHover(e,0.5);

//
 );

nav.addEventListener('mouseout',handleHover.bind(1) //(e) =>{
 //handleHover(e,1);

//}
);

//sticky navigation

const header = document.querySelector('.header');

const stickyNav= function(entries){
  // entries.forEach(e =>{
    const [entry]=entries
    if(!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky')
  //})
}

const headerObs= new IntersectionObserver(
  stickyNav,{
    root: null,
    threshold: .9,
  }
);
headerObs.observe(header);

///reveal section
const allSection = document.querySelectorAll('.section');

const revealSection = function(entr, obs){
  const[entries]=entr;
  
  if(!entries.isIntersecting) return;
  entries.target.classList.remove('section--hidden')

  obs.unobserve(entries.target);
}
const sectObs = new IntersectionObserver(revealSection,{
  root:null,
  threshold:0.15,
})
allSection.forEach(function(section){
  sectObs.observe(section);
  section.classList.add('section--hidden');
})

//lazy loading images

const imgTargets = document.querySelectorAll('img[data-src')
console.log(imgTargets);

const loadImg = function(entr, obs){
 const [entries]=entr;
 if(!entries.isIntersecting) return;
 //replace src with data src;

 entries.target.src = entries.target.dataset.src;

 entries.target.addEventListener('load',function(){
   entries.target.classList.remove('lazy-img');
 })
 obs.unobserve(entries.target);
}
const imgObs= new IntersectionObserver(loadImg,{
 root:null,
 threshold:0,
 rootMargin:'200px'
});
imgTargets.forEach(img => imgObs.observe(img));

//slider





 const sliderFunction = function(){

 const slide =document.querySelectorAll('.slide');
 const btnLeft = document.querySelector('.slider__btn--left');
 const btnRight = document.querySelector('.slider__btn--right');
 const dotContainer = document.querySelector('.dots');

 let curentSlide=0;
 const maxSlide = slide.length;

//  const slider=document.querySelector('.slider');
//  slider.style.transform='scale(0.3) translateX(-1200px)';

//  slider.style.overflow='visible';

//function

 const createDots = function(){
   slide.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
    'beforeend',
    `<button class="dots__dot" data-slide="${i}"></button>`);

   })
 }
 
//
const activateDost = function(slide){

 document
 .querySelectorAll('.dots__dot')
 .forEach(dot => dot.classList.remove('dots__dot--active'));


document
.querySelector(`.dots__dot[data-slide="${slide}"]`)
.classList.add('dots__dot--active');

}

//

const goToSlide = function(se){
  slide.forEach((s,i) => s.style.transform=`translateX(${100 * (i- se)}%)`);
}



//next slide
const nextSlide = function(){
  if(curentSlide === maxSlide - 1){
    curentSlide=0;
  }else{
    curentSlide++;
  }
  goToSlide(curentSlide);
  activateDost(curentSlide);
}


const prevSlide = function(){
  if(curentSlide===0){
    curentSlide=maxSlide-1;
  }else{
    curentSlide--;
  }
  
  goToSlide(curentSlide);
  activateDost(curentSlide);
}


const init = function(){
  goToSlide(0);
  createDots();
  activateDost(0);
}
init();

//event hendlers
btnRight.addEventListener('click',nextSlide);
btnLeft.addEventListener('click', prevSlide);



document.addEventListener('keydown',function(e){
  console.log(e);

  //abele variante sunt ok
  if(e.key === 'ArrowLeft') prevSlide();
   e.key==='ArrowRight' && nextSlide();
});

dotContainer.addEventListener('click',function(e){
  if(e.target.classList.contains('dots__dot')){

    const {slide}=e.target.dataset;
    goToSlide(slide);
    activateDost(slide);
  };




});

};
sliderFunction();

navMenu.addEventListener("click",()=>{
  document.querySelector('.nav__links').classList.toggle('hidden');
})


