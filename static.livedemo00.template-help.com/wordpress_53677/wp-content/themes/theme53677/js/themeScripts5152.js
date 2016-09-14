    var
        _window = jQuery(window);
    ;

jQuery(document).ready(function(){

	var
		_window = jQuery(window);
		not_resizes = false;
	;

	_window.on("resize", function(){
		resizeFunction();
	})
	resizeFunction();

	function resizeFunction(){
		if(!not_resizes){
			var
				newWidth = _window.width()
			,	marginHalf = _window.width()/-2;
			;
			if (jQuery('body').hasClass('cherry-fixed-layout')) {
				var
					newWidth = jQuery('.main-holder').width()
				,	marginHalf =jQuery('.main-holder').width()/-2;
				;
			}

			jQuery('.wide,.social-nets-wrapper').css({width: newWidth, "margin-left": marginHalf, left: '50%'});
		}
	}

    $('.portfolio_wrapper .portfolio-item').magnificPopup({
        delegate: '.thumbnail > a',
        type: 'image',
        removalDelay: 500,
        mainClass: 'mfp-zoom-in',
        callbacks: {
            beforeOpen: function() {
                // just a hack that adds mfp-anim class to markup
                this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
            },
            open: function() {
              not_resizes = true;
            },
            close: function() {
              not_resizes = false;
            }
        },
        gallery: {enabled:true}
    });

      $('.logo, .site-name').each(function(){
             var me = $(this);
             me.html(me.html().replace(/^(\w+)/, '<strong>$1</strong>'));
    });

      $('.btn, .sf-menu a').mousedown(function (e) {
        var target = e.target;
        var rect = target.getBoundingClientRect();
        var ripple = target.querySelector('.ripple');
        $(ripple).remove();
        ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
        target.appendChild(ripple);
        var top = e.pageY - rect.top - ripple.offsetHeight / 2 -  document.body.scrollTop;
        var left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
        ripple.style.top = top + 'px';
        ripple.style.left = left + 'px';
        return false;
    });


 jQuery('.skills_wrapper').scrollShowTime({onShow: chartStart})

  function chartStart(){
  jQuery('.skills_wrapper > .skills-item').each(function(){
    var
      skill_level = parseFloat(jQuery(this).data("level"))
    , base_color_doughnut = jQuery(".chartCanvasDoughnut",this).data("base-color")
    , skill_color_doughnut = jQuery(".chartCanvasDoughnut",this).data("skill-color")
    , levelHolder = jQuery('.level', this)
    , animInterval
    ;

    //if (device.tablet() || device.mobile()) {}

    var OptionDoughnut = {
      animationSteps: 100
    , segmentShowStroke   : false
    , percentageInnerCutout  : 55.2
    , animationEasing: "easeOutExpo"
    , segmentStrokeWidth: 20
    }

    var dataDoughnut = [
      {
        value: skill_level,
        color: skill_color_doughnut
      },
      {
        value : 100-skill_level,
        color : base_color_doughnut
      }
    ];

    var ctxDoughnut = jQuery(".chartCanvasDoughnut", this).get(0).getContext("2d");
    var myDoughnut = new Chart(ctxDoughnut).Doughnut(dataDoughnut, OptionDoughnut);

    })
  }
});
