var arrSo = [7,8,9]
for (index = 0 ; index< arrSo.length;index++) {
    var so = arrSo[index];
    console.log(so);
}


var arrCart = [];
var arrDetail = [];
var relatedItems = []
window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('productid');
    console.log('params',myParam)

    //call api load lên giao diện
    function laySP() {
        var promise = axios({
            url: 'https://shop.cyberlearn.vn/api/Product/getbyid?id='+myParam,
            method: 'GET',
            ResponseType: JSON,
    
        })
    
        promise.then(function (res) {
            console.log(res.data.content);
            var detailItem = res.data.content;
            arrDetail.push(detailItem);
            renderDetail(arrDetail);
            
           
        })
        promise.catch(function (err) {
            console.log(err.data);
        })
    }
laySP();
}




//function lay danh sach san pham tuong tu

function layDanhSachSP() {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('productid');
    console.log('params',myParam)

    var promise = axios({
        url: 'https://shop.cyberlearn.vn/api/Product',
        method: 'GET',
        ResponseType: JSON,

    })

    promise.then(function (res) {
        console.log(res.data.content);
        var mangRelated = res.data.content
        var sneakerDetail = mangRelated[myParam-1]
        console.log(sneakerDetail);
        console.log(sneakerDetail.relatedProducts);
        var sneakerProductRelated = sneakerDetail.relatedProducts;
      var  arrSneakerRelated  = JSON.parse(sneakerProductRelated);
      var sneakerSize = sneakerDetail.size
      var arrSneakerSize = JSON.parse (sneakerSize)
      console.log(arrSneakerSize);
        for (var i = 0 ; i < arrSneakerRelated.length; i++ ){
            
            var id = arrSneakerRelated[i];

            
            console.log(id);
            for(var index = 0 ; index < mangRelated.length;index++) {
                var sneakerRelate = mangRelated[index];
                if(sneakerRelate.id === id) {
                    relatedItems.push(sneakerRelate);
                    relatedItems[i].quantity = 0 ;
                    
            
                    
                }
    
            }

        }
        // relatedItems.splice(myParam -1,1);
        console.log(relatedItems)
        renderRelatedItems(relatedItems);

        //push la detail item de xet mang add vao Cart
        
        
        relatedItems.push(sneakerDetail);
        
        
                
    
       
    })
    
    promise.catch(function (err) {
        console.log(err.data);
    })
}


layDanhSachSP()

function renderDetail (mangSP) {
    var htmlContent ='';
    
    
    

    for (var index= 0 ; index < mangSP.length;index++ ) {
        
        var sp = mangSP [index];
        
       
       
        htmlContent +=`
        <section class="section wrapper wrapper-section">
        <div class="container wrapper-column">
           <div class="wrapper-figure">
              <img src="${sp.image}" class="wrapper-image" loading="lazy" alt="Sneaker">
           </div>
           <div class="wrapper-content">
              <div class="wrapper-inform">
                
                 <h1 class="heading-sm font-bold">${sp.name}</h1>
                 <p class="text-md font-regular">
                   ${sp.description}
                 </p>
              </div>
              <div class="wrapper-detail">
                 <div class="price">
                    <span class="text-md font-semi">Price:</span>
                    <h3 class="text-xxl font-bold">$${sp.price}</h3>
                 </div>
                 <div class="sizes">
                    <span class="text-md font-semi">Sizes:</span>
                    <ul class="sizes-list">
                       <li class="sizes-item">36</li>
                       <li class="sizes-item is-select">37</li>
                       <li class="sizes-item">38</li>
                       <li class="sizes-item">39</li>
                       <li class="sizes-item">40</li>
                       <li class="sizes-item">41</li>
                       <li class="sizes-item">42</li>

                    </ul>
                 </div>
              </div>
              <div class="wrapper-action">
                 <button class="btn btn-darken"  onclick= "themCart(${sp.id});return false;">Add to Cart</button>
                 <button class="btn btn-neutral">
                    <i class="bx bx-heart"></i>
                 </button>
              </div>
           </div>
        </div>
     </section>
            
        `
    }


    
    document.querySelector('#detail-content').innerHTML = htmlContent;

    return htmlContent;
}



function renderRelatedItems (mangRelated) {
    var htmlOut= '';


    for( var index = 0; index < mangRelated.length; index++ ) {
        var relatedItem = mangRelated[index];
        htmlOut += `

        
       
       
        <div class="col-md-4 col-sm-6"  onclick="window.location='./detail.html?productid=${relatedItem.id}';">
       
            <div class="product-grid2">
                <div class="product-image2">
                    <a href="#">
                        <img class="pic-1" src="${relatedItem.image}">
                        <img class="pic-2" src="${relatedItem.image}">
                    </a>
                    <ul class="social">
                        <li><a href="#" data-tip="Quick View"><i class="fa fa-eye"></i></a></li>
                        <li><a href="#" data-tip="Add to Wishlist"><i class="fa fa-shopping-bag"></i></a></li>
                        <li><a href="#" data-tip="Add to Cart"><i class="fa fa-shopping-cart"></i></a></li>
                    </ul>
                    <a class="add-to-cart" href="#" onclick="event.stopPropagation(); event.preventDefault(); themCart(${relatedItem.id});">Add to cart</a>
                </div>
                <div class="product-content">
                <i class="fa fa-star text-warning" style="text-align: center;"></i>
            <i class="fa fa-star text-warning" style="text-align: center;"></i>
            <i class="fa fa-star text-warning" style="text-align: center;"></i>
            <i class="fa fa-star text-warning" style="text-align: center;"></i>
            <i class="fa fa-star text-warning" style="text-align: center;"></i>
                    <h3 class="title"><a href="#">${relatedItem.name}</a></h3>
                    <span class="price">$${relatedItem.price}</span>
                </div>
            </div>
        </div>
        
       
        
       
    

  
        `

    }
    document.querySelector('#related-items').innerHTML = htmlOut;
    return htmlOut;
}

function themCart(masp) {
    
     
    console.log(masp);
    console.log(relatedItems)
    
    console.log(arrCart);

    var indexBag = -1;
    for (var index = 0; index < relatedItems.length; index++) {
        
        var sneakerCart =  relatedItems[index]
        
        if (masp === relatedItems[index].id) {  
            indexBag = index;
           
           
            addItem(sneakerCart);
            
            break;
        }
       
    }
    
    
    if (indexBag !==-1) {
       
       
        renderCart(arrCart);
        soLuongGioHang(arrCart);
         
      
       
           
         
    }
    
   
   
    return false;
}
console.log(arrCart);


//function additem

function addItem(item) {
  let existingItem = arrCart.find((i) => i.id === item.id);
  if (existingItem) {
    existingItem.quantity++;
    console.log(existingItem.quantity);
    
  } else {
    item.quantity = 1;
    arrCart.push(item);
    
  }
  saveStorage();
}

 //render gio hang
function renderCart (mangCart) {
   
    var htmlContent = '';
    var bill = 0;
    var tongTien = 0;
    for (index = 0 ; index < mangCart.length;index++) {
        var cartSneaker = mangCart[index];
       
       
       tongTien = cartSneaker.price * cartSneaker.quantity  ;
       
       bill += tongTien;
        htmlContent += `
        
        <tr>
                    <td class="">
                      <img src="${cartSneaker.image}" alt="Sheep" style="width:20px; height: 30px;" =>
                    </td>
                    <td>${cartSneaker.name}</td>
                    <td>${cartSneaker.price }</td>
                    
                    <td class="qty w-25">
                      <span style="white-space: nowrap;">
                     <button style="display: inline-block; width: 20px; padding: 0;" onclick="decrement(${cartSneaker.id})">-</button>
                     <input type="text" class="form-control" id="input${cartSneaker.id}" style="display: inline-block; width: 40px; text-align: center;" value="${cartSneaker.quantity}">
                      <button style="display: inline-block; width: 20px; padding: 0;" onclick="increment(${cartSneaker.id})">+</button>
  </span>
</td>

                    <td id="tong-tien${cartSneaker.id}" >${tongTien}</td>
                    <td>
                      <a href="#" class="btn btn-danger btn-sm" onclick="xoaCartItem(${cartSneaker.id})"  >
                        <i class="fa fa-times"></i>
                       </a>
                    </td>
        </tr>
        `
        
    }
    
    document.querySelector('#listCart').innerHTML= htmlContent;
    document.querySelector('#bill').innerHTML = bill;
    return htmlContent;
    
}



 //cong item
// function increment(spId) {
//   console.log(spId);
//   let tien1Mon = 0;
//   let tongTien  =0;
  
//      for(let i  = 0 ; i< arrCart.length; i++) {
//     let sp = arrCart[i];
    
//     if (sp.id == spId) {
//         console.log(sp);
//         sp.quantity++;
        
        

//         document.querySelector(`#input${spId}`).value = sp.quantity;
        
//         tien1Mon = sp.price * sp.quantity;
       
        
         
//         document.querySelector(`#tong-tien${spId}`).innerHTML = tien1Mon;
        
     
//        }
//       tongTien += tien1Mon;
// }
// document.querySelector('#bill').innerHTML = tongTien;
// }
function increment(spId) {
   
    
    console.log(spId);
    let tien1Mon = 0;
    let tongTien = 0;
    
    for (let i = 0; i < arrCart.length; i++) {
      let sp = arrCart[i];
      
      if (sp.id == spId) {
        console.log(sp);
        sp.quantity++;
        
        document.querySelector(`#input${spId}`).value = sp.quantity;
        
        tien1Mon = sp.price * sp.quantity;
        
        document.querySelector(`#tong-tien${spId}`).innerHTML = tien1Mon;
      }
      
      tongTien += sp.price * sp.quantity;
    }
    
    soLuongGioHang(arrCart)
    document.querySelector('#bill').innerHTML = tongTien;
    saveStorage();
  }



//tru item
function decrement(spId) {
   
    console.log(spId);
    let tien1Mon = 0;
    let tongTien = 0;
  
    for (let i = 0; i < arrCart.length; i++) {
      let sp = arrCart[i];
  
      if (sp.id == spId) {
        console.log(sp);
  
        // prevent quantity from becoming negative
        if (sp.quantity > 0) {
          sp.quantity--;
          document.querySelector(`#input${spId}`).value = sp.quantity;
          tien1Mon = sp.price * sp.quantity;
          document.querySelector(`#tong-tien${spId}`).innerHTML = tien1Mon;
        }
      }
  
      tongTien += sp.price * sp.quantity;
    }

    
  
    soLuongGioHang(arrCart);
    document.querySelector('#bill').innerHTML = tongTien;
    saveStorage()
  }
  


//gia tri gio hang
function soLuongGioHang(mangGioHang) {
    
    
    
let tongSl = mangGioHang.reduce((tsl,prod) => {

    tsl = tsl + prod.quantity;
    return tsl; 
}, 0);
document.querySelector('#soLuongSP').innerHTML = tongSl;

}


//xoa san pham trong gio hang

function xoaCartItem(spId) {
    console.log(spId);
    let indexDel = arrCart.findIndex(prod => prod.id === spId );
    if(indexDel!== -1) {
        arrCart.splice(indexDel,1);
        renderCart(arrCart);
        soLuongGioHang(arrCart)
    }
    saveStorage();
}

//checkout 
document.querySelector('#checkout').onclick = function (){
    arrCart = [];
    soLuongGioHang(arrCart);
    renderCart(arrCart);
    Swal.fire(
        
        'Successful payment',
        
      )
   document.querySelector('#btnClose').click();   
   saveStorage();
  

}



//save storage 
function saveStorage () {
    
    let data = JSON.stringify(arrCart);
    localStorage.setItem('mangCart',data);
}


//get storage 
function getStorage() {
    
    
    if(localStorage.getItem('mangCart')) {
        let data = localStorage.getItem('mangCart');
        arrCart = JSON.parse(data);
        renderCart(arrCart);
        soLuongGioHang(arrCart);

    }
}

getStorage();









//cart-bag
// $(document).ready(function() {  
//     $('#cartModal').modal('show');
//   });
//slideshow


// $(document).ready(function() {  
  
//     //options( 1 - ON , 0 - OFF)  
//     var auto_slide = 1;  
//     var hover_pause = 1;  
//     var key_slide = 1;  

//     //speed of auto slide(  
//     var auto_slide_seconds = 0;  
//     /* IMPORTANT: i know the variable is called ...seconds but it's 
//     in milliseconds ( multiplied with 1000) '*/  

//     /*move the last list item before the first item. The purpose of this is 
//     if the user clicks to slide left he will be able to see the last item.*/  
//     $('#carousel_ul li:first').before($('#carousel_ul li:last'));  

//     //check if auto sliding is enabled  
//     if(auto_slide == 1){  
//         /*set the interval (loop) to call function slide with option 'right' 
//         and set the interval time to the variable we declared previously */  
//         var timer = setInterval('slide("right")', auto_slide_seconds);  

//         /*and change the value of our hidden field that hold info about 
//         the interval, setting it to the number of milliseconds we declared previously*/  
//         $('#hidden_auto_slide_seconds').val(auto_slide_seconds);  
//     }  

//     //check if hover pause is enabled  
//     if(hover_pause == 1){  
//         //when hovered over the list  
//         $('#carousel_ul').hover(function(){  
//             //stop the interval  
//             clearInterval(timer)  
//         },function(){  
//             //and when mouseout start it again  
//             timer = setInterval('slide("right")', auto_slide_seconds);  
//         });  

//     }  

//     //check if key sliding is enabled  
//     if(key_slide == 1){  

//         //binding keypress function  
//         $(document).bind('keypress', function(e) {  
//             //keyCode for left arrow is 37 and for right it's 39 '  
//             if(e.keyCode==37){  
//                     //initialize the slide to left function  
//                     slide('left');  
//             }else if(e.keyCode==39){  
//                     //initialize the slide to right function  
//                     slide('right');  
//             }  
//         });  

//     }  

// });  

// //FUNCTIONS BELLOW  

// //slide function  
// function slide(where){  

//         //get the item width  
//         var item_width = $('#carousel_ul li').outerWidth() + 10;  

//         /* using a if statement and the where variable check 
//         we will check where the user wants to slide (left or right)*/  
//         if(where == 'left'){  
//             //...calculating the new left indent of the unordered list (ul) for left sliding  
//             var left_indent = parseInt($('#carousel_ul').css('left')) + item_width;  
//         }else{  
//             //...calculating the new left indent of the unordered list (ul) for right sliding  
//             var left_indent = parseInt($('#carousel_ul').css('left')) - item_width;  

//         }  

//         //make the sliding effect using jQuery's animate function... '  
//         $('#carousel_ul:not(:animated)').animate({'left' : left_indent},3000,function(){  

//             /* when the animation finishes use the if statement again, and make an ilussion 
//             of infinity by changing place of last or first item*/  
//             if(where == 'left'){  
//                 //...and if it slided to left we put the last item before the first item  
//                 $('#carousel_ul li:first').before($('#carousel_ul li:last'));  
//             }else{  
//                 //...and if it slided to right we put the first item after the last item  
//                 $('#carousel_ul li:last').after($('#carousel_ul li:first'));  
//             }  

//             //...and then just get back the default left indent  
//             $('#carousel_ul').css({'left' : '-210px'});  
//         });  

// }  



//detail item
const navbarMenu = document.getElementById("menu");
const burgerMenu = document.getElementById("burger");
const headerMenu = document.getElementById("header");

// Toggle Navbar Menu on Burger Click
if (burgerMenu && navbarMenu) {
   burgerMenu.addEventListener("click", () => {
      burgerMenu.classList.toggle("is-active");
      navbarMenu.classList.toggle("is-active");
   });
}

// Closed Navbar Menu on Links Click
document.querySelectorAll(".menu-link").forEach((link) => {
   link.addEventListener("click", () => {
      burgerMenu.classList.remove("is-active");
      navbarMenu.classList.remove("is-active");
   });
});

// Fixed Navbar Menu on Window Resize
window.addEventListener("resize", () => {
   if (window.innerWidth >= 769) {
      if (navbarMenu.classList.contains("is-active")) {
         navbarMenu.classList.remove("is-active");
      }
   }
});






