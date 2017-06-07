/**
 * Created by michaelzapf on 06.06.17.
 */

'use strict';


function Presentation() {
    this.container = null;
    this.slides = [];
    this.slideCount = 0;
    this.currentSlideId = -1;

    this.load = function (data) {
        if (data.slides != undefined) {
            this.loadSlides(data.slides);
        }
        if (data.settings != undefined) {
            this.loadSettings(data.settings);
        }
    };

    this.loadSlides = function(rawSlides) {
        this.slides = [];
        this.slideCount = 0;
        for (var i = 0; i < rawSlides.length; i++) {
            var rawSlide = rawSlides[i];
            var slide = {};
            if (rawSlide.type == 'Image') {
                slide = new ImageSlide();
            }
            slide.duration = rawSlide.duration;
            slide.src = rawSlide.src;
            slide.title = rawSlide.title;
            slide.transition = rawSlide.transition;
            slide.init(this.container);
            this.slides.push(slide);
            this.slideCount += 1;
        }

        this.nextSlide();
    };

    this.loadSettings = function(settings) {
        if (settings.backgroundColor != undefined) {
            $('body').css('background-color', settings.backgroundColor);
        }
    };

    this.showSlide = function(id) {
        var slide = this.getSlide(id);
        this.hideSlide();
        slide.show();
        this.currentSlideId = id;
    };

    this.nextSlide = function() {
        var nextId = this.currentSlideId + 1;
        if (nextId >= this.slideCount) {
            nextId = 0;
        }
        this.showSlide(nextId);
        var slide = this.getSlide(nextId);
        setTimeout($.proxy(this.nextSlide, this), slide.duration);
    };

    this.hideSlide = function() {
        var currentSlide = this.getCurrentSlide();
        if (currentSlide == null) return;
        currentSlide.hide();
    };

    this.getSlide = function(id) {
        return this.slides[id];
    };

    this.getCurrentSlide = function() {
        if (this.currentSlideId < 0 || this.currentSlideId >= this.slideCount) {
            return null;
        }
        return this.slides[this.currentSlideId];
    };
}