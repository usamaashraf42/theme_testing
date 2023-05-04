var toggle = document.querySelectorAll('.toggle-on-off');
for(i = 0; i < toggle.length; i++) {
  toggle[i].addEventListener('click', function(){
    var form = this.parentNode.parentNode.parentNode;
    var cardContainer = this.parentNode.parentNode.parentNode.parentNode.parentNode;
    form.classList.toggle('one-time');
    cardContainer.classList.toggle('one-time');
  });
}


jQuery( document ).ready(function($) {
 
  //$('.beefup').beefup();
  //Modules amazin like homepage clicks
  $('.amazon_like .col-md-6 .big-module').click(function(e){
  	e.preventDefault();
    var link = $(this).find('a').attr('href');
    window.location.href = link;
  });
  
  $('.amazon_like .col-md-6 .small-module').click(function(e){
  	e.preventDefault();
    var link = $(this).find('a').attr('href');
    window.location.href = link;
  });
  
  /*CACAO PAGE*/
  if($('body').hasClass('cacao-super-blend')){
    $('.producl-list').remove();
    $('.sub-listing').remove();
    $('#shopify-section-work_sec').remove();
    
   	//$('#AddToCart .primary-text').html('PRE-ORDER');
    
    //$('.product__form-wrapper .sub-listing').after('<div id="note">You will receive the product by 21st October.</div>');
    //$('.shorttitle').html('60 SERVINGS');
  }
  
  /*COFFEE PAGE**/
  
  if($('body').hasClass('mushroom-coffee-super-blend')){
    $('.offsuscriptiontext text').html('20% off Super Blends');
    //$('#AddToCart .primary-text').html('PRE-ORDER');
    //$('.product__form-wrapper .sub-listing').after('<div id="note">You will receive the product by 21st October.</div>');
    
    
    
    $('.shorttitle').html('60 SERVINGS');
  }
  
  //Cordyceps preorder
  if($('body').hasClass('dirtea-cordyceps-mushroom-tea-powder-30-day-serving')){
    //$('#AddToCart .primary-text').html('PRE-ORDER');
  }
  
   $('.card-2').each(function(){
    	
      if ($(this).find('.title').html().includes('Cordyceps')){
      //$(this).find('.btn-collection-addtocart').html('PRE-ORDER');
      	
      }
     
     if ($(this).find('.title').html().includes('Cacao')){
       //$(this).find('.btn-collection-addtocart').html('PRE-ORDER');
     }

    });
  /*end Cordyceps PREORDER*/
  
  
  
  if($('body').hasClass('template-index')){
  	//$('.hero__inner .hero__overlay-title').html('<strong>Mushroom Coffee</strong> Super Blend');
    //$('body.template-index .hero__inner .rte-setting.mega-subtitle p em').html('<span>MORE ENERGY</span> <span>ZERO CRASHES</span>');
    
    
   		//Limited edition gifset homepage button
      $('.splide__list .card-2').each(function(){
        //console.log($(this).find('.product-chart h4').html());
          if( $(this).find('.product-chart h4').html().includes('LIMITED')){
   
            var money_text = $(this).find('.btn__oneTime span').html();
            
              //$(this).find('.btn__oneTime').html('PRE-ORDER ' + money_text); //change the ONE TIME PURCHASE to preorder
            $(this).find('.btn--secondary').hide(); //hide suscription button
            
          }
     	});
      

    
   var intervalId = window.setInterval(function(){
     if( !$('.site-header').hasClass('site-header--fixed') ){
       $('.png-icon').attr('src','https://cdn.shopify.com/s/files/1/0502/4782/7656/files/Mushroom_-_basket_NEW_2x_c3063310-9bc6-4d1b-8576-65b0bcec6c5c.png?v=1633622359'); 
     	$('.png-icon').show();
     
     }else{
      	$('.png-icon').attr('src','https://cdn.shopify.com/s/files/1/0502/4782/7656/files/Mushroom_-_basket_NEW_2x_230fe3ed-9e02-4dd9-aec0-3fc9b9e2164d.png?v=1633615965'); 
     
     }	
      
  }, 20);
    
  }else{
    $('.png-icon').show();
  }
    
    
  //Limited edition giftset preorder button
  var intervalId = window.setInterval(function(){
    $('.grow-aov-collection__grid-item').each(function(){
      console.log('enter');
        if( $(this).find('.grow-aov-collection__product-title').html().includes('Limited Edition')){
         	//$(this).find('.grow-aov-collection__product-add-button').html('PRE-ORDER'); 
        }
     });
    }, 20);
  
  if($('body').hasClass('template-product')){
  	if (!$('.video_url').is(':empty') && $('.video_url').html().includes('mp4')){
		console.log($('.video_url').html());
      $(".product_right_cont video").attr({
        "src": $('.video_url').html()   
      });
    }  
    
    //hide Limited Edition Giftset things single page
    if ($('.product__title ').html().includes('Limited Edition Giftset')){
      $('.sub-listing').hide();
      $('.scientificstudies').hide();
      $('.product__form-wrapper .sub-listing').after('<div id="note">You will receive the product by week of 29th November.</div>');
      //$('#AddToCart .primary-text').html('PRE-ORDER');  
    }
    
    
    
    
        
    //Display correct recommended product
    if ($('.product__title ').html().includes('Pouch') || $('.product__title ').html().includes('pouch')){
      
      $('.product-list-pouches li a').each(function(){
        if( $(this).attr('rel') ==  $('.product__title').html()){
         	$(this).find('img').attr('style','border-color: #012169;'); 
        }
      });
      
      $('.product-list-pouches').show();
    }else{
      $('.producl-list a').each(function(){
        if( $(this).attr('href').includes('pouch') ){
         	$(this).remove();
        }
      });
      
       $('.producl-list').show();
    }
    
    
    
    //scientific studies
    if( $('div.product__description').html().includes('studies') 
       || $('div.product__description').html().includes('Scientific studies') 
       || $('div.product__description').html().includes('scientific studies')
       || $('div.product__description').html().includes('scientific')){
      
      	var studies = $('.product__description').html().split('Scientific studies');
      	$('div.product__description').html(studies[0]);
      	$('.beefup__body').html(studies[1]);
      	$('.beefup').beefup();
    }
    
  }
  
  
  var intervalId = window.setInterval(function(){
    $('.cart-drawer__item').each(function(){
    	var url = $(this).find('.cart-drawer__item-image').attr('href');
      	
      if(url.includes('lions-mane-mushroom') && !url.includes('pouch')) { 
        $(this).find('.cart-drawer__item-image').attr('style','background-image: url(\'//cdn.shopify.com/s/files/1/0502/4782/7656/files/Dirtea18008_1-fin_sRGB_grande.png?v=1632518025\');') 
      }
      if(url.includes('products/reishi-mushroom') && !url.includes('pouch')) { 
        $(this).find('.cart-drawer__item-image').attr('style','background-image: url(\'//cdn.shopify.com/s/files/1/0502/4782/7656/files/Dirtea18005_1-fin_sRGB_grande.png?v=1632518024\');') 
      }
      if(url.includes('products/cordyceps-mushroom') && !url.includes('pouch')) { 
        $(this).find('.cart-drawer__item-image').attr('style','background-image: url(\'//cdn.shopify.com/s/files/1/0502/4782/7656/files/Dirtea18004_1-fin_sRGB_grande.png?v=1632518024\');') 
      }
      if(url.includes('products/chaga-mushroom') && !url.includes('pouch')) { 
        $(this).find('.cart-drawer__item-image').attr('style','background-image: url(\'//cdn.shopify.com/s/files/1/0502/4782/7656/files/Dirtea18003_1-fin_sRGB_grande.png?v=1632518024\');') 
      }
      
      
    });
  }, 1000);
  
});


document.addEventListener( 'DOMContentLoaded', function() {

var splide1 = new Splide( '.splide_1', {
type   : 'loop',
pagination:false,
perPage: 4,
perMove:1,
width:'95%',
arrowPath:'M0.310263 7.19621L6.60211 0.750895C6.76597 0.583035 7.03141 0.583035 7.19524 0.750895C7.3591 0.918755 7.3591 1.19067 7.19524 1.35849L1.6194 7.07032H19.9018C20.1337 7.07032 20.3213 7.26252 20.3213 7.50003C20.3213 7.73754 20.1337 7.92973 19.9018 7.92973H1.6194L7.19524 13.6415C7.3591 13.8094 7.3591 14.0813 7.19524 14.2491C7.11332 14.333 7.00597 14.375 6.89865 14.375C6.79134 14.375 6.68402 14.333 6.60207 14.2491L0.310225 7.8038C0.146401 7.63598 0.146399 7.36407 0.310263 7.19621Z',
breakpoints: {
1400: {
perPage: 3,
},
900: {
perPage: 2,
},
740: {
perPage: 1,
},
}
} );
splide1.mount();

var splide2 = new Splide( '.splide_2', {
  type   : 'loop',
  pagination:false,
  perPage: 3,
  perMove:1,
  width:'95%',
  arrowPath:'M0.310263 7.19621L6.60211 0.750895C6.76597 0.583035 7.03141 0.583035 7.19524 0.750895C7.3591 0.918755 7.3591 1.19067 7.19524 1.35849L1.6194 7.07032H19.9018C20.1337 7.07032 20.3213 7.26252 20.3213 7.50003C20.3213 7.73754 20.1337 7.92973 19.9018 7.92973H1.6194L7.19524 13.6415C7.3591 13.8094 7.3591 14.0813 7.19524 14.2491C7.11332 14.333 7.00597 14.375 6.89865 14.375C6.79134 14.375 6.68402 14.333 6.60207 14.2491L0.310225 7.8038C0.146401 7.63598 0.146399 7.36407 0.310263 7.19621Z',
  breakpoints: {
  1400: {
  perPage: 3,
  },
  900: {
  perPage: 2,
  },
  740: {
  perPage: 1,
  },
  }
  } );
  splide2.mount();

var api = new Yotpo.API(yotpo);
api.refreshWidgets();
} );
