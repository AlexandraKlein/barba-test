Barba.Pjax.start();
Barba.Prefetch.init();

var speed = 750;

var transition = Barba.BaseTransition.extend({
  start: function() {
    Promise
      .all([this.newContainerLoading, this.fadeOut()])
      .then(this.fadeIn.bind(this));

    setTimeout(function() {
      $('html, body').animate({ scrollTop: 0 }, speed / 2);
    }, speed / 3)
  },

  fadeOut: function() {
    var $elOld = $(this.oldContainer);
    var $nextArticle = $elOld.find('.next');
    var height = $nextArticle.height();
    var translationValue = $nextArticle.offset().top + (height / 2);

    $elOld.removeClass('transition-in')
      .addClass('transition-out')
      .find('.next').css({ 'transform': 'translate3d(0, -' + translationValue + 'px, 0)' });

    return $elOld.animate({ opacity: 1 }).promise();
  },

  fadeIn: function() {
    var _this = this;
    var $elNew = $(this.newContainer);

    $(this.oldContainer).hide();

    $elNew.css({
      visibility : 'visible'
    });

    $elNew.animate(
      { opacity: 1 }
      , speed, function() {
        _this.done();
      });

    $elNew.addClass('transition-in')
      .removeClass('transition-out');
  }
});

Barba.Pjax.getTransition = function() {
  return transition;
};
