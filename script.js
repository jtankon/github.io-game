'use strict';

PetiteVue.createApp({
  positionX: 0,
  fall: false,
  appX: 0,
  appY: 0,
  rest: 10,
  score: 0,
  showKago: false,
  finish: "",
  fallInterval: null,

  left() {
    this.positionX -= 100;
    this.imgPosition();
  },

  right() {
    this.positionX += 100;
    this.imgPosition();
  },

  imgPosition() {
    const kg = document.getElementById('kg');
    kg.style.left = this.positionX + 'px';
  },

  start() {
    this.appX = Math.floor(Math.random() * 5) * 100 + 490;
    this.appY = 70;
    this.fall = true;
    this.showKago = true;
    this.finish = "";

    if (this.fallInterval) {
      clearInterval(this.fallInterval);
    }
  
    this.fallInterval = setInterval(() => {
      if (this.judg()) {
        this.score += 100;
        clearInterval(this.fallInterval);
        this.fall = false;
        this.rest--;
        if (this.rest > 0) {
          this.start();
        } else {
          this.finish = "Finish";
        }
      } else if (this.appY >= 500) {
        clearInterval(this.fallInterval);
        this.fall = false;
        this.rest--;
        if (this.rest > 0) {
          this.start();
        } else {
          this.finish = "Finish";     
        }
      } else {
        this.appY += Math.random() * 5 + 15;
      }
    }, 50);
  },
  
  judg() {
    const kg = document.getElementById("kg");
    const kgRect = kg.getBoundingClientRect();
    const apple = document.getElementById("fallApple");
    const appleRect = apple.getBoundingClientRect();
  
    return (
      appleRect.top < kgRect.bottom &&
      appleRect.bottom - 50 > kgRect.top &&
      appleRect.left < kgRect.right &&
      appleRect.right > kgRect.left
    );
  },
  
  reset() {
    this.positionX = 0;
    this.fall = false;
    this.appX = 0;
    this.appY = 0;
    this.rest = 10;
    this.score = 0;
    this.finish = "";
    this.showKago = false;
    if (this.fallInterval) {
      clearInterval(this.fallInterval);
      this.fallInterval = null;
    }
  }
}).mount();

