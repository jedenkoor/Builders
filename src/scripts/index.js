import Swiper from 'swiper/swiper-bundle.js'
import 'swiper/swiper-bundle.css'
import noUiSlider from 'noUiSlider/dist/nouislider.min.js'
import 'noUiSlider/dist/nouislider.min.css'

import { Fancybox } from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox.css'

class Init {
  constructor() {
    this.init()
  }

  init() {
    this.events()

    this.actions().initCatalogRangeSlider()

    Fancybox.bind('[data-fancybox]', {
      infinite: false,
      dragToClose: false,
      Image: {
        zoom: false
      },
      Thumbs: {
        autoStart: false
      }
    })
    Fancybox.defaults.ScrollLock = false

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

  events() {
    const _this = this

    window.ap(document).on('click', '.select-open', function (e) {
      e.preventDefault()
      _this.actions().closeMenu()
      _this.actions().toggleSelect(this)
      if (this.classList.contains('header-menu__link')) {
        _this.actions().toggleHeader()
      }
    })
    document.addEventListener('click', (e) => {
      if (
        e.target !== document.querySelector('.select-content') &&
        e.target.closest('.select-content') === null &&
        e.target !== document.querySelector('.select-open') &&
        e.target.closest('.select-open') === null
      ) {
        document.querySelectorAll('.select').forEach((item) => {
          item.classList.remove('select--active')
        })
        document.querySelector('.header').classList.remove('header--search')
      }
    })

    window.ap(document).on('click', '.accordion__open', function (e) {
      e.preventDefault()
      _this.actions().toggleAccordion(this)
    })

    window.ap(document).on('click', '.header__burger', (e) => {
      e.preventDefault()
      _this.actions().toggleMenu()
    })

    window.ap(document).on('click', '.header-mobile__close', (e) => {
      _this.actions().closeMenu()
    })

    window
      .ap(document)
      .on('click', '.projects-filters__item--filters .projects-filters__btn', (e) => {
        e.preventDefault()
        _this.actions().toggleFilter()
      })

    window.ap(document).on('click', '.projects-mobfilters__close', (e) => {
      _this.actions().closeFilter()
    })
  }

  actions() {
    return {
      initCardsSlider(el) {
        const swiper = el.querySelector('.projects-slider__swiper')
        const prevArr = el.querySelector('.swiper-button-prev')
        const nextArr = el.querySelector('.swiper-button-next')
        ;(() =>
          new Swiper(swiper, {
            slidesPerView: 1,
            resistanceRatio: 0,
            threshold: 5,
            navigation: {
              prevEl: prevArr,
              nextEl: nextArr
            },
            breakpoints: {
              768: {
                slidesPerView: 2
              },
              1200: {
                slidesPerView: 3
              }
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
          spaceBetween: 10,
          breakpoints: {
            768: {
              spaceBetween: 14
            },
            1200: {
              spaceBetween: 20
            }
          }
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
      },
      toggleSelect(el) {
        const select = el.closest('.select')
        if (select.classList.contains('select--active')) {
          select.classList.remove('select--active')
        } else {
          document.querySelectorAll('.select').forEach((item) => {
            item.classList.remove('select--active')
          })
          select.classList.add('select--active')
        }
      },
      toggleAccordion(el) {
        el.closest('.accordion').classList.toggle('accordion--active')
      },
      toggleMenu() {
        document.querySelector('.header__mobile').classList.toggle('header__mobile--active')
        const filter = document.querySelector('.projects__mobfilters')
        if (filter && filter.classList.contains('projects__mobfilters--active')) {
          return
        }
        document.querySelector('html').classList.toggle('fixed')
      },
      closeMenu() {
        document.querySelector('.header__mobile').classList.remove('header__mobile--active')
        document.querySelector('html').classList.remove('fixed')
      },
      toggleFilter() {
        document
          .querySelector('.projects__mobfilters')
          .classList.toggle('projects__mobfilters--active')
        document.querySelector('html').classList.toggle('fixed')
      },
      closeFilter() {
        document
          .querySelector('.projects__mobfilters')
          .classList.remove('projects__mobfilters--active')
        document.querySelector('html').classList.remove('fixed')
      },
      initCatalogRangeSlider() {
        const filterSliders = document.querySelectorAll('.projects-rangeslider')
        if (filterSliders.length) {
          filterSliders.forEach((item) => {
            const min = +item.getAttribute('data-min')
            const max = +item.getAttribute('data-max')
            const step = +item.getAttribute('data-step')
            const minInput = item.previousElementSibling.querySelector('.projects-rangeslider-from')
            const maxInput = item.previousElementSibling.querySelector('.projects-rangeslider-to')
            noUiSlider.create(item, {
              start: [min, max],
              step: step,
              connect: true,
              range: {
                min: [min],
                max: [max]
              },
              format: {
                to: function (value) {
                  return Math.round(value)
                },
                from: function (value) {
                  return value
                }
              }
            })

            item.noUiSlider.on('slide', function (values, handle) {
              ;(handle ? maxInput : minInput).value = values[handle]
            })

            minInput.addEventListener('change', function () {
              item.noUiSlider.set([this.value.replace(/\s/g, ''), null])
            })

            maxInput.addEventListener('change', function () {
              item.noUiSlider.set([null, this.value.replace(/\s/g, '')])
            })
          })
        }
      }
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.controller = new Init()
})
