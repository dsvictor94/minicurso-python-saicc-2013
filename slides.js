/**
 * @constructor
 */
function SlideDeck() {
  this.curSlide_ = 0;
  this.slides = [];
  this.config_ = null;

  this.getCurrentSlideFromHash_();

  document.addEventListener('DOMContentLoaded',
      this.handleDomLoaded_.bind(this), false);
}

/**
 * @const
 * @private
 */
SlideDeck.prototype.SLIDE_CLASSES_ = ['far-past', 'past', 'current', 'next',
    'far-next'];

/**
 * @private
 */
SlideDeck.prototype.getCurrentSlideFromHash_ = function() {
  var slideNo = parseInt(document.location.hash.substr(1));

  if (slideNo) {
    this.curSlide_ = slideNo;
  }
};

/**
 * @private
 */
SlideDeck.prototype.handleDomLoaded_ = function() {
  this.slides_ = document.querySelectorAll('slide:not(.hidden)');

  // Load config
  this.loadConfig_();
  this.addEventListeners_();
  this.updateSlides_();
};

/**
 * @private
 */
SlideDeck.prototype.addEventListeners_ = function() {
  document.addEventListener('keydown', this.handleBodyKeyDown_.bind(this),
                            false);
  window.addEventListener('popstate', this.handlePopState_.bind(this),
                          false);
};

/**
 * @private
 * @param {Event} e
 */
SlideDeck.prototype.handlePopState_ = function(e) {
  if (e.state != null) {
    this.curSlide_ = e.state;
    this.updateSlides_(true);
  }
};

/**
 * @param {Event} e
 */
SlideDeck.prototype.handleBodyKeyDown_ = function(e) {
  if (/^(input|textarea)$/i.test(e.target.nodeName) ||
      e.target.isContentEditable) {
    return;
  }

  switch (e.keyCode) {
    case 39: // right arrow
    case 32: // space
    case 34: // PgDn
      this.nextSlide();
      e.preventDefault();
      break;

    case 37: // left arrow
    case 8: // Backspace
    case 33: // PgUp
      this.prevSlide();
      e.preventDefault();
      break;

    case 40: // down arrow
      //if (this.isChromeVoxActive()) {
      //  speakNextItem();
      //} else {
        this.nextSlide();
      //}
      e.preventDefault();
      break;

    case 38: // up arrow
      //if (this.isChromeVoxActive()) {
      //  speakPrevItem();
      //} else {
        this.prevSlide();
      //}
      e.preventDefault();
      break;

    case 78: // N
      document.body.classList.toggle('with-notes');
      break;

    case 27: // ESC
      document.body.classList.remove('with-notes');
      break;

    //case 13: // Enter
    case 70: // F
       // Only respect 'f'/enter on body. Don't want to capture keys from <input>
      if (e.target == document.body) {
        if (e.keyCode != 13 && !document.webkitIsFullScreen) {
          document.body.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        } else {
          document.webkitCancelFullScreen();
        }
      }
      break;
  }
};

/**
 * @private
 */
SlideDeck.prototype.loadConfig_ = function() {
  var configScripts =
      document.querySelector('script[type="text/slide-config"]');
  if (configScripts) {
    eval(configScripts.innerHTML);
    this.config_ = slideConfig;
  }

  var settings = this.config_.settings;

  this.loadTheme_(settings.theme || 'default');

  if (settings.favIcon) {
    this.addFavIcon_(settings.favIcon);
  }

  if (settings.title) {
    document.title = settings.title;
  }

  if (settings.usePrettify || true) {
    console.log('Use prettify');
  }

  if (settings.analyticsId) {
    this.loadAnalytics_();
  }

  if (settings.fonts) {
    this.addFonts_(settings.fonts);
  }

  if (settings.useBuilds || true) {
    this.makeBuildLists_();
  }
};

/**
 * @private
 * @param {Array.<string>} fonts
 */
SlideDeck.prototype.addFonts_ = function(fonts) {
  var el = document.createElement('link');
  el.rel = 'stylesheet';
  el.href = 'http://fonts.googleapis.com/css?family=' + fonts.join('|') + '&v2';
  document.querySelector('head').appendChild(el);

};

/**
 * @private
 */
SlideDeck.prototype.buildNextItem_ = function() {
  var slide = this.slides_[this.curSlide_];
  var toBuild = slide.querySelector('.to-build');
  var built = slide.querySelector('.build-current');

  if (built) {
    built.classList.remove('build-current');
    if (built.classList.contains('fade')) {
      built.classList.add('build-fade');
    }
  }

  if (!toBuild) {
    var items = slide.querySelectorAll('.build-fade');
    for (var j = 0, item; item = items[j]; j++) {
      item.classList.remove('build-fade');
    }
    return false;
  }

  toBuild.classList.remove('to-build');
  toBuild.classList.add('build-current');

  /*if (isChromeVoxActive()) {
    speakAndSyncToNode(toBuild);
  }*/

  return true;
};

/**
 * @param {boolean=} opt_dontPush
 */
SlideDeck.prototype.prevSlide = function(opt_dontPush) {
  if (this.curSlide_ > 1) {
    this.curSlide_--;

    this.updateSlides_(opt_dontPush);
  }
};

/**
 * @param {boolean=} opt_dontPush
 */
SlideDeck.prototype.nextSlide = function(opt_dontPush) {

  if (this.buildNextItem_()) {
    return;
  }

  if (this.curSlide_ < this.slides_.length - 1) {
    this.curSlide_++;

    this.updateSlides_(opt_dontPush);
  }
};

/**
 * @private
 */
SlideDeck.prototype.updateSlides_ = function(opt_dontPush) {
  var dontPush = opt_dontPush || false;

  var curSlide = this.curSlide_;
  for (var i = 0; i < this.slides_.length; i++) {
    switch (i) {
      case curSlide - 2:
        this.updateSlideClass_(i, 'far-past');
        break;
      case curSlide - 1:
        this.updateSlideClass_(i, 'past');
        break;
      case curSlide:
        this.updateSlideClass_(i, 'current');
        break;
      case curSlide + 1:
        this.updateSlideClass_(i, 'next');
        break;
      case curSlide + 2:
        this.updateSlideClass_(i, 'far-next');
        break;
      default:
        this.updateSlideClass_(i);
        break;
    }
  };

  /*this.triggerLeaveEvent(curSlide - 1);
  triggerEnterEvent(curSlide);*/

  window.setTimeout(this.disableSlideFrames_.bind(this, curSlide - 2), 301);

  this.enableSlideFrames_(curSlide - 1);
  this.enableSlideFrames_(curSlide + 1);
  this.enableSlideFrames_(curSlide + 2);

  /*if (isChromeVoxActive()) {
    speakAndSyncToNode(slideEls[curSlide]);
  }*/

  this.updateHash_(dontPush);
};

/**
 * @private
 * @param {number} slideNo
 */
SlideDeck.prototype.enableSlideFrames_ = function(slideNo) {
  var el = this.slides_[slideNo - 1];
  if (!el) {
    return;
  }

  var frames = el.getElementsByTagName('iframe');
  for (var i = 0, frame; frame = frames[i]; i++) {
    this.enableFrame_(frame);
  }
};

/**
 * @private
 * @param {number} slideNo
 */
SlideDeck.prototype.enableFrame_ = function(frame) {
  var src = frame._src;
  if (src && frame.src != src) {
    frame.src = src;
  }
};

/**
 * @private
 * @param {number} slideNo
 */
SlideDeck.prototype.disableSlideFrames_ = function(slideNo) {
  var el = this.slides_[slideNo - 1];
  if (!el) {
    return;
  }

  var frames = el.getElementsByTagName('iframe');
  for (var i = 0, frame; frame = frames[i]; i++) {
    this.disableFrame_(frame);
  }
};

/**
 * @private
 * @param {Node} frame
 */
SlideDeck.prototype.disableFrame_ = function(frame) {
  frame.src = 'about:blank';
};

/**
 * @private
 * @param {number} slideNo
 * @param {string} className
 */
SlideDeck.prototype.updateSlideClass_ = function(slideNo, className) {
  var el = this.slides_[slideNo - 1];

  if (!el) {
    return;
  }

  if (className) {
    el.classList.add(className);
  }

  for (var i = 0, slideClass; slideClass = this.SLIDE_CLASSES_[i]; i++) {
    if (className != slideClass) {
      el.classList.remove(slideClass);
    }
  }
};

/**
 * @private
 */
SlideDeck.prototype.makeBuildLists_ = function () {
  for (var i = this.curSlide_, slide; slide = this.slides_[i]; i++) {
    var items = slide.querySelectorAll('.build > *');
    for (var j = 0, item; item = items[j]; j++) {
      if (item.classList) {
        item.classList.add('to-build');
        if (item.parentNode.classList.contains('fade')) {
          item.classList.add('fade');
        }
      }
    }
  }
};

/**
 * @private
 * @param {boolean} dontPush
 */
SlideDeck.prototype.updateHash_ = function(dontPush) {
  if (!dontPush) {
    var hash = '#' + this.curSlide_;
    if (window.history.pushState) {
      window.history.pushState(this.curSlide_, 'Slide ' + this.curSlide_, hash);
    } else {
      window.location.replace(hash);
    }

    window['_gaq'] && window['_gaq'].push(['_trackPageview', document.location.href]);
  }
};


/**
 * @private
 * @param {string} favIcon
 */
SlideDeck.prototype.addFavIcon_ = function(favIcon) {
  var el = document.createElement('link');
  el.rel = 'icon';
  el.type = 'image/png';
  el.href = favIcon;
  document.querySelector('head').appendChild(el);
};

/**
 * @private
 * @param {string} theme
 */
SlideDeck.prototype.loadTheme_ = function(theme) {
  var styles = ['base', theme];
  for (var i = 0, style; themeUrl = styles[i]; i++) {
    var style = document.createElement('link');
    style.rel = 'stylesheet';
    style.type = 'text/css';
    if (themeUrl.indexOf('http') == -1) {
      style.href = 'theme/' + themeUrl + '.css';
    } else {
      style.href = themeUrl;
    }
    document.querySelector('head').appendChild(style);
  }

  var viewportMeta = document.createElement('meta');
  viewportMeta.name = 'viewport';
  viewportMeta.content = 'width=1100,height=750';
  document.querySelector('head').appendChild(viewportMeta);

  var appleMeta = document.createElement('meta');
  appleMeta.name = 'apple-mobile-web-app-capable';
  appleMeta.content = 'yes';
  document.querySelector('head').appendChild(appleMeta);
};

/**
 * @private
 */
SlideDeck.prototype.loadAnalytics_ = function() {
  var _gaq = window['_gaq'] || [];
  _gaq.push(['_setAccount', this.config_.settings.analyticsId]);
  //_gaq.push(['_setDomainName', '.bleedinghtml5.appspot.com']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
};

// Create the slidedeck
var slidedeck = new SlideDeck();
