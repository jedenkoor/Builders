import Swiper from 'swiper/swiper-bundle.js'
import 'swiper/swiper-bundle.css'

class Init {
  constructor() {
    this.init()
  }

  init() {
    if (document.querySelectorAll('.projects-slider__content').length) {
      const sliders = document.querySelectorAll('.projects-slider__content')
      sliders.forEach((item) => {
        this.actions().initCardsSlider(item)
      })
    }

    if (document.querySelectorAll('.photo__slider').length) {
      const sliders = document.querySelectorAll('.photo__slider')
      sliders.forEach((item) => {
        this.actions().initPhotoSlider(item)
      })
    }

    if (document.querySelectorAll('.project__gallery').length) {
      const sliders = document.querySelectorAll('.project__gallery')
      sliders.forEach((item) => {
        this.actions().initProjectPageSlider(item)
      })
    }
  }

  actions() {
    return {
      initCardsSlider(el) {
        const swiper = el.querySelector('.projects-slider__swiper')
        const prevArr = el.querySelector('.swiper-button-prev')
        const nextArr = el.querySelector('.swiper-button-next')
        ;(() =>
          new Swiper(swiper, {
            slidesPerView: 3,
            resistanceRatio: 0,
            threshold: 5,
            navigation: {
              prevEl: prevArr,
              nextEl: nextArr
            }
          }))()
      },
      initPhotoSlider(el) {
        const pagination = el.querySelector('.swiper-pagination')
        ;(() =>
          new Swiper(el, {
            slidesPerView: 1,
            resistanceRatio: 0,
            threshold: 5,
            spaceBetween: 5,
            nested: true,
            pagination: {
              el: pagination,
              type: 'bullets',
              clickable: true
            }
          }))()
      },
      initProjectPageSlider(el) {
        const slider = el.querySelector('.project-gallery__slider')
        const thumbs = el.querySelector('.project-gallery__thumbs')
        const pagination = el.querySelector('.swiper-pagination')
        const thumbsSlider = new Swiper(thumbs, {
          slidesPerView: 5,
          resistanceRatio: 0,
          threshold: 5,
          spaceBetween: 20
        })
        ;(() =>
          new Swiper(slider, {
            slidesPerView: 1,
            resistanceRatio: 0,
            threshold: 5,
            spaceBetween: 5,
            pagination: {
              el: pagination,
              type: 'bullets',
              clickable: true
            },
            thumbs: {
              swiper: thumbsSlider
            }
          }))()
      }
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.controller = new Init()
})
