var cherryIsotopeView_not_resizes = false;

$.fn.cherryIsotopeView=function(o)
{ 
    var options = {
        columns   : 3,
        fullwidth : 'false',
        layout    : 'masonry'
    }
    
    $.extend(options, o);
    
    var _this = $(this),
        _window = $(window);
    
    var isotopeObject = $('.isotopeview_wrapper', _this),
        isotopeObject_item_selector = '.isotopeview-item',
        isotopeObject_item = $(isotopeObject_item_selector, isotopeObject),
        isotopeObject_columns_init = options.columns,
        transitionDuration = '0.5',
        filterButtons = $('.isotopeview_filter_buttons > .filter_button', _this),
        currentCategory = '*';
               
    if(isotopeObject.length > 0) 
    {
        isotopeObject.imagesLoaded( function() 
        {
            setTimeout(function()
            {
                setColumnsNumber();
                resizeIsotopeObject();
                isotopeObject.isotope ({
                    itemSelector: isotopeObject_item_selector,
        			resizable : true,
        			layoutMode: options.layout
        		}).bind("resize.rainbows", function(){
  		            setColumnsNumber();
        		    resizeIsotopeObject();
                    isotopeObject.isotope('reLayout');
        		});
            },10);
        });
        
        filterButtons.on( 'click', function()
        {
            var _this = $(this);
            var category = _this.attr('data-filter');
            
            if(currentCategory != category){
                filterButtons.removeClass('current-category');
                _this.addClass('current-category');
                currentCategory = category;
                if(category != '*') category = '.'+category;
                isotopeObject.isotope({ filter: category});
            }
        });
        
        $(".isotopeview_wrapper .isotopeview-item .thumbnail").parent().each(function(){magnific_popup_init($(this))});        
        function magnific_popup_init(item) {
        	item.magnificPopup({
        		delegate: 'a[rel^="prettyPhoto"]',
        		type: 'image',
        		removalDelay: 500,
        		mainClass: 'mfp-zoom-in',
        		callbacks: {
        			beforeOpen: function() {
        				// just a hack that adds mfp-anim class to markup
        				this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
        			},
                    open: function() {
                      cherryIsotopeView_not_resizes = true;
                    },
                    close: function() {
                      cherryIsotopeView_not_resizes = false;
                    }
        		},
        		gallery: {enabled:true}
        	});
        }
    }
    
    function setColumnsNumber()
    {
        if(_window.innerWidth() < 450 ){
            isotopeObject_columns = Math.ceil(isotopeObject_columns_init/4);
        } else if (_window.innerWidth() < 767){
            isotopeObject_columns = Math.ceil(isotopeObject_columns_init/2);  
        } else if (_window.innerWidth() < 979 ) {
            isotopeObject_columns = Math.ceil(isotopeObject_columns_init/1.5);
        } else {
            isotopeObject_columns = isotopeObject_columns_init;  
        }
    }
    
    function resizeIsotopeObject()
    {
        item_width = parseInt(isotopeObject.width() / isotopeObject_columns);
        isotopeObject_item.each(function(){
            $(this).width(item_width);   
        })
        
        if(options.fullwidth && !cherryIsotopeView_not_resizes)
        {
            var _windowWidth = _window.width()+7,
                leftOffset = _this.parent().offset().left;
             
            _this.css({width:_windowWidth, left:-leftOffset});
        }
    }
    
    if(options.fullwidth)
    {    
        function stretch()
        {   
            if(!cherryIsotopeView_not_resizes)
            {
                var _windowWidth = _window.width()+7,
                    leftOffset = _this.parent().offset().left;
                 
                _this.css({width:_windowWidth, left:-leftOffset});
            }
        }
        
        _window.resize(stretch);
        stretch();
    }    
}