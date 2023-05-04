$(document).on("click", "button.collsubmit[type='autoship_submit']", function(event){
  event.preventDefault();
  console.log("clickd");
  // unchecking any currently selected value - Jack D
    $(this).closest("form").find("input[type='radio'][name='selling_plan']").prop("checked",false);
// selecting a specific value every time
  $(this).closest("form").find('input[type="radio"][name="selling_plan"][data-plan-name="Ship every 60 Days"]').prop("checked",true);
  $.ajax({
    type: 'POST',                             
    url: '/cart/add.js',
    dataType: 'json',                               
    data: $(this).closest('form').serialize(),            
    success: function(response){
     getCart();
    },                        
    error: function(data){
      alert('Something went wrong! Please refresh the page and try again');
    }                           
  });
});


$(document).on("click", "button.collsubmit[type='normal_addtocart']", function(event){
  event.preventDefault();
  $(this).closest("form").find("input[type='radio'][name='selling_plan']").prop("checked",false);
  $(this).closest("form").find('input[type="radio"][name="selling_plan"][data-plan-name="onetime"]').prop("checked",true);
  $.ajax({
    type: 'POST',                             
    url: '/cart/add.js',
    dataType: 'json',                               
    data: $(this).closest('form').serialize(),            
    success: function(response){
     getCart();       
    },                        
    error: function(data){
      alert('Something went wrong! Please refresh the page and try again');
    }                           
  });
});



// NEW COLLECTION CARD LOGIC FOR RC - JACK D

function isScrolledIntoView(el) {
  var rect = el.getBoundingClientRect();
  var elemTop = rect.top;
  var elemBottom = rect.bottom;

  // Only completely visible elements return true:
  var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
  // Partially visible elements return true:
  //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
  return isVisible;
}

$(document).on("click", "button[type='openSellingPlans']", function(event){

  event.preventDefault();

  if ($(this).closest("form").find('.selling_plan_selectContainer').hasClass('hide')) {

    let openAlready = false

    $('.selling_plan_selectContainer').each(function( index ) {
      $(this).addClass('hide')
    });
    $('.subSaveContainer').each(function( index ) {
      $(this).addClass('hide')
    });
    $("button[type='openSellingPlans']").each(function( index ) {
      if ($(this).hasClass('sellingPlan_clicked')) {
        openAlready = true
      }
      $(this).removeClass('sellingPlan_clicked')
    });

    if (openAlready && isScrolledIntoView(event.currentTarget)) {
    } else {
      var y = $(window).scrollTop();  // your current y position on the page
  $(window).scrollTop(y+150);     // increase scroll down

    }
     
  $(this).closest("form").find('.selling_plan_selectContainer').toggleClass('hide')
  $(this).closest("form").find('.subSaveContainer').toggleClass('hide')
  $(this).addClass('sellingPlan_clicked')

  } else {

    var y = $(window).scrollTop();  // your current y position on the page
    $(window).scrollTop(y-150);     // decrease scroll down

    $('.selling_plan_selectContainer').each(function( index ) {
      $(this).addClass('hide')
    });
    $('.subSaveContainer').each(function( index ) {
      $(this).addClass('hide')
    });
    $("button[type='openSellingPlans']").each(function( index ) {
      $(this).removeClass('sellingPlan_clicked')
    });
  }

})

   
$(document).ready(function(){
  // This button will increment the value
  $('.qtyplus').click(function(e){
      // Get the field name
      item_id = $(this).attr('id');

      var $el = $(this).prev()
      console.log($el)

      // Get its current value
      var currentVal = parseInt($el.val());
      // If is not undefined
      if (!isNaN(currentVal)) {
          // Increment
          $el.val(currentVal + 1)
      } else {
          // Otherwise put a 1 there
          $el.val(1);
      }
      console.log($el.val(currentVal + 1))

  });
  // This button will decrement the value till 1
  $(".qtyminus").click(function(e) {
    
    var $el = $(this).next()
    console.log($el)
      // Get its current value
      var currentVal = parseInt($el.val());
      // If it isn't undefined or its greater than 1
      if (!isNaN(currentVal) && currentVal > 1) {
          // Decrement one
          $el.val(currentVal - 1);
      } else {
          // Otherwise put a 1 there
          $el.val(1);
      }
  });
});




$(document).on("click", "button.btn__subSave[type='autoship_submit']", function(event){
  event.preventDefault();
  console.log("clickd");
  // unchecking any currently selected value - Jack D
    $(this).closest("form").find("input[type='radio'][name='selling_plan']").prop("checked",false);
// selecting a specific value every time
  $(this).closest("form").find('input[type="radio"][name="selling_plan"][data-plan-name="Ship every 60 Days"]').prop("checked",true);
  $.ajax({
    type: 'POST',                             
    url: '/cart/add.js',
    dataType: 'json',                               
    data: $(this).closest('form').serialize(),            
    success: function(response){
     getCart();
    },                        
    error: function(data){
      alert('Something went wrong! Please refresh the page and try again');
    }                           
  });
});


$(document).on("click", "button.btn__oneTime[type='normal_addtocart']", function(event){
  event.preventDefault();
// submit the next form which only holds the one time value product
  $.ajax({
    type: 'POST',                             
    url: '/cart/add.js',
    dataType: 'json',                               
    data: $(this).parent().next('form').serialize(),            
    success: function(response){
     getCart();   
    },                        
    error: function(data){
      alert('Something went wrong! Please refresh the page and try again');
    }                           
  });
});


// NEW COLLECTION CARD LOGIC END

  function getCart(){
	
    
                
  $.ajax({
        type: 'GET',
        url: '/cart.js',
        dataType: 'json',
        success: function(data){
          console.log(data);
          var total_count=data["item_count"];
          $(".ajax-cart__toggle span.site_header_cart-count").text(total_count);
        //  alert(total_count);
          if(total_count >=1){
          var total_price=data["total_price"];
          var arr_items=data["items"];
          var cart_drawer="";        
          console.log("arr_items.length "+arr_items.length);
          for (var i=0; i < arr_items.length; i++) {
            var i_count=parseFloat(i)+parseFloat(1);
            var key=arr_items[i]['key'];
            var url=arr_items[i]['url'];
            var item_id=arr_items[i]['id'];
            var title=arr_items[i]['title'];
            var quantity=arr_items[i]['quantity'];
            var image=arr_items[i]['image'];  
            var price=arr_items[i]['final_price'];
            price=price/100;


            var properties=arr_items[i]['properties'];  

            				 var selling_plan = arr_items[i]['selling_plan_allocation'];
                    if(selling_plan !=undefined){
                   var selling_plan_value = arr_items[i]['selling_plan_allocation']['selling_plan']['name'];
      var cart_drawer_properties='<ul class="cart-drawer__item-properties" data-cart-item-details-list=""><li class="cart-drawer__item-property" data-cart-item-selling-plan-name="">'+selling_plan_value+'</li></ul>'; 
            }
            else{
              var cart_drawer_properties='';
            }
            
            
            var final_title='<a href="'+url+'" class="h4 cart-drawer__item-title" data-cart-item-href="" data-cart-item-title="">'+title+'</a><p class="cart-drawer__item-subtitle" data-cart-item-variant-title=""></p>';
    
              //var cart_drawer_properties='';
 

            var final_price='<p class="cart-drawer__item-price-container" data-cart-item-price-container=""><span class="cart-item__original-price cart-item__price"><span class="money">$'+price+' CAD</span></span></p>';

            var remove_btn='<button class="cart-drawer__item-delete btn-link hide" type="button" data-cart-item-delete="">Remove</button>'; 


            var quantity_label='<label for="quantity_'+key+'" class="label--hidden" data-cart-item-label-quantity="">Item Quantity</label>';

            var quantity_input='<input id="quantity_'+key+'" class="cart-drawer__item-quantity" value="'+quantity+'" type="number" pattern="\d*" min="1" aria-label="Item Quantity" data-cart-item-input-quantity="">';

           // var final_quantity=quantity_label+'<span class="sub hide">-</span>'+quantity_input+'<span class="add hide">+</span>';
var ind = parseInt(i)+1;
            var final_quantity=quantity_label+'<div data-line="'+ind+'" class="cart-drawer__qty-drawer" item-variant-id="'+item_id+'"><span class="sub qty_drawer__item">-</span>'+quantity_input+'<span class="add qty_drawer__item">+</span></div>';
            
            var cart_drawer_content='<div class="cart-drawer__item-content">'+final_title+cart_drawer_properties+final_price+final_quantity+'</div><p class="cart-item__message text-center" aria-hidden="true" data-item-message=""></p>';  
            var final_image='<a href="'+url+'" class="cart-drawer__item-image" style="background-image: url('+image+');display:none;" data-cart-item-background-image="" data-cart-item-href=""></a>';  
            var cart_drawer_item='<div class="cart-drawer__item" data-cart-item="" data-cart-item-id="'+key+'" data-cart-item-line-number="'+i_count+'" aria-live="polite">'+final_image+cart_drawer_content+'</div>';


            cart_drawer=cart_drawer+cart_drawer_item;

          }
            
            

          total_price=total_price/100;
          $(".cart-drawer__subtotal .cart-drawer__subtotal-number").html(" ");
          $(".cart-drawer__subtotal .cart-drawer__subtotal-number").html("<span class='money'>"+total_price+"</span>");
          $(".drawer form.cart-drawer").removeClass("cart-drawer--empty");          
          $(".header-deskmenu a.ajax-cart__toggle span.site_header_cart-count").css("opacity","1");       
          $(".drawer button.cart-drawer__checkout").removeAttr("disabled");

          $("a.ajax-cart__toggle span.site_header_cart-count").show();
          $(".cart-drawer__content .cart-drawer__empty-text").hide();
          $(".cart-drawer__content .cart-drawer__item-list").show();
          $(".cart-drawer__content .cart-drawer__item-list").html(cart_drawer);
            
            $('.cart-drawer__item').each(function(){
              var url = $(this).find('.cart-drawer__item-image').attr('href');

            if(url.includes('lions-mane-mushroom')) { 
              $(this).find('.cart-drawer__item-image').attr('style','background-image: url(\'//cdn.shopify.com/s/files/1/0502/4782/7656/files/Dirtea18008_1-fin_sRGB_grande.png?v=1632518025\');') 
            }
            if(url.includes('products/reishi-mushroom')) { 
              $(this).find('.cart-drawer__item-image').attr('style','background-image: url(\'//cdn.shopify.com/s/files/1/0502/4782/7656/files/Dirtea18005_1-fin_sRGB_grande.png?v=1632518024\');') 
            }
            if(url.includes('products/cordyceps-mushroom')) { 
              $(this).find('.cart-drawer__item-image').attr('style','background-image: url(\'//cdn.shopify.com/s/files/1/0502/4782/7656/files/Dirtea18004_1-fin_sRGB_grande.png?v=1632518024\');') 
            }
            if(url.includes('products/chaga-mushroom')) { 
              $(this).find('.cart-drawer__item-image').attr('style','background-image: url(\'//cdn.shopify.com/s/files/1/0502/4782/7656/files/Dirtea18003_1-fin_sRGB_grande.png?v=1632518024\');') 
            }
              
          	
              

          });
            
           $('.cart-drawer__item-image').show();
            
          $(".ajax-cart__toggle").click();

        }
          else{
            $(".cart-drawer__empty-text").show();
          $("form.cart-drawer").addClass("cart-drawer--empty");
          }
          
          
        }
      });         
  
}
  























// $(document).on("click", ".collsubmit", function(event){
//   event.preventDefault();
//   if($(this).attr("type") == "autoship_submit"){
//     $(this).closest("form").find('input[type="radio"][name="selling_plan"][data-plan-name="Ship every 30 Days"]').click(); 
//   }
//   else {
//     //$(this).closest("form").find('input[type="radio"][name="selling_plan"][data-plan-name="NA"]').click();
//   }
//   $.ajax({
//     type: 'POST',                             
//     url: '/cart/add.js',
//     dataType: 'json',                               
//     data: $(this).closest('form').serialize(),            
//     success: function(response){
//       $.ajax({
//         type: 'GET',
//         url: '/cart.js',
//         dataType: 'json',
//         success: function(data){
//           console.log(data);
//           var total_count=data["item_count"];
//           $(".ajax-cart__toggle span.site_header_cart-count").text(total_count);

//           var total_price=data["total_price"];
//           var arr_items=data["items"];
//           var cart_drawer="";        
//           console.log("arr_items.length "+arr_items.length);
//           for (var i=0; i < arr_items.length; i++) {
//             var i_count=parseFloat(i)+parseFloat(1);
//             var key=arr_items[i]['key'];
//             var url=arr_items[i]['url'];
//             var item_id=arr_items[i]['id'];
//             var title=arr_items[i]['title'];
//             var quantity=arr_items[i]['quantity'];
//             var image=arr_items[i]['image'];  
//             var price=arr_items[i]['final_price'];
//             price=price/100;


//             var properties=arr_items[i]['properties'];  

//             var final_title='<a href="'+url+'" class="h4 cart-drawer__item-title" data-cart-item-href="" data-cart-item-title="">'+title+'</a><p class="cart-drawer__item-subtitle" data-cart-item-variant-title=""></p>';
//             if(properties==null){
//               var cart_drawer_properties='';
//             } else {
//               var cart_drawer_properties='<ul class="cart-drawer__item-properties" data-cart-item-details-list=""><li class="cart-drawer__item-property" data-cart-item-selling-plan-name="">Ship every 30 Days</li></ul>';
//             }  


//             var final_price='<p class="cart-drawer__item-price-container" data-cart-item-price-container=""><span class="cart-item__original-price cart-item__price"><span class="money">$'+price+' CAD</span></span></p>';

//             var remove_btn='<button class="cart-drawer__item-delete btn-link hide" type="button" data-cart-item-delete="">Remove</button>'; 


//             var quantity_label='<label for="quantity_'+key+'" class="label--hidden" data-cart-item-label-quantity="">Item Quantity</label>';

//             var quantity_input='<input id="quantity_'+key+'" class="cart-drawer__item-quantity" value="'+quantity+'" type="number" pattern="\d*" min="1" aria-label="Item Quantity" data-cart-item-input-quantity="">';

//            // var final_quantity=quantity_label+'<span class="sub hide">-</span>'+quantity_input+'<span class="add hide">+</span>';

//             var final_quantity=quantity_label+'<div class="cart-drawer__qty-drawer" item-variant-id="'+item_id+'"><span class="sub qty_drawer__item">-</span>'+quantity_input+'<span class="add qty_drawer__item">+</span></div>';
            
//             var cart_drawer_content='<div class="cart-drawer__item-content">'+final_title+cart_drawer_properties+final_price+final_quantity+'</div><p class="cart-item__message text-center" aria-hidden="true" data-item-message=""></p>';  
//             var final_image='<a href="'+url+'" class="cart-drawer__item-image" style="background-image: url('+image+');" data-cart-item-background-image="" data-cart-item-href=""></a>';  
//             var cart_drawer_item='<div class="cart-drawer__item" data-cart-item="" data-cart-item-id="'+key+'" data-cart-item-line-number="'+i_count+'" aria-live="polite">'+final_image+cart_drawer_content+'</div>';


//             cart_drawer=cart_drawer+cart_drawer_item;

//           }

//           total_price=total_price/100;
//           $(".cart-drawer__subtotal .cart-drawer__subtotal-number").html(" ");
//           $(".cart-drawer__subtotal .cart-drawer__subtotal-number").html("<span class='money'>"+total_price+"</span>");
//           $(".drawer form.cart-drawer").removeClass("cart-drawer--empty");          
//           $(".header-deskmenu a.ajax-cart__toggle span.site_header_cart-count").css("opacity","1");       
//           $(".drawer button.cart-drawer__checkout").removeAttr("disabled");

//           $("a.ajax-cart__toggle span.site_header_cart-count").show();
//           $(".cart-drawer__content .cart-drawer__empty-text").hide();
//           $(".cart-drawer__content .cart-drawer__item-list").show();
//           $(".cart-drawer__content .cart-drawer__item-list").html(cart_drawer);
//           $(".ajax-cart__toggle").click();

//         }
//       });         
//     },                        
//     error: function(data){
//       alert('Something went wrong! Please refresh the page and try again');
//     }                           
//   });
// });












