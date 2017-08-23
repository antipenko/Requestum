var btnLoadProducts = document.getElementById('loadProducts');
var productList = document.getElementById('products');
var preload = document.getElementById('preloader');
var productPage = 2;

//Preloading products after loading the page
window.onload = function() {
    loadProducts(productPage);
};

btnLoadProducts.onclick = function () {
    showProducts();
    loadProducts(productPage);
};

btnLoadProducts.onclick = function () {
    showProducts();
    loadProducts(productPage);
};

// Sets the equal height asides
setEqualHeight($(".sidebar"));

function showProducts() {
    $('.hide').fadeIn(500);
    $('.hide').removeClass('hide');
}

// ajax function for load products
function loadProducts(page){
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'list.php?page='+ page +'&per_page=4', true);

    xhr.send();
    // Sets the display options of button and icon of preload
    preload.style.display = "block";
    btnLoadProducts.innerHTML = "loading...";
    btnLoadProducts.disabled = true;

    xhr.onreadystatechange = function () {
        if (xhr.status != 200) {
            // error handling
            console.log( xhr.status + ': ' + xhr.statusText );
        } else if (xhr.readyState == 4){
            var productInfo = xhr.responseText;
            var obj = JSON.parse(productInfo);
            if (obj.entities.length == 0){
                btnLoadProducts.className = "hide";
            }
            // show result
            setTimeout(function() {
                for (var i=0; i<5; i++){
                    var product = document.createElement('li');

                    product.classList.add('product-wrapper', 'hide');
                    markupProduct(product, obj.entities[i]);
                    productList.appendChild(product);
                }
                console.log(obj.total);
            }, 1000);
        }
        preload.style.display = "none";
        btnLoadProducts.innerHTML = "Load more";
        btnLoadProducts.disabled = false;
    };
    productPage++;
}

// function for set multiple attributes
function setAttributes(el, attrs) {
    for(var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

/*
    create markup of product.
    get elemnet li (product) and content from server (obj).
    obj = obj.entities[i]
*/
function markupProduct(product, obj) {
    var productDiv = document.createElement('div');
    setAttributes(productDiv, {"class": "product"});

    // product link start
    var productLink = document.createElement('a');
    setAttributes(productLink, {"href": "#", "class": "product_link"});

    var productImg = document.createElement('img');
    setAttributes(productImg, {"src": obj.img , "class": "product_img", "alt": obj.title});

    var productTitle = document.createElement("h1");
    setAttributes(productTitle, {"class": "product_title"});
    productTitle.innerHTML = obj.title;
    productLink.appendChild(productImg);
    productLink.appendChild(productTitle);
    // product link end

    var productDescription = document.createElement('p');
    setAttributes(productDescription, {"class":"product_description"});
    productDescription.innerHTML = obj.description;

    // product price start
    var productPrice = document.createElement('div');
    productPrice.classList.add('product-price');

    var productPriceMain = document.createElement('span');
    productPriceMain.classList.add('product-price__main');

    var productPriceOld = document.createElement('del');
    productPriceOld.classList.add('product-price__old');

    if(obj.discountCost !== null){
        productPriceMain.innerHTML = "$" + obj.discountCost;
        productPriceOld.innerHTML = "$" + obj.cost;
        productPrice.appendChild(productPriceMain);
        productPrice.appendChild(productPriceOld);
    } else{
        productPriceMain.innerHTML = "$" + obj.cost;
        productPrice.appendChild(productPriceMain);
    }
    // product price end

    // product label start
    var productLabelSale = document.createElement('span');
    productLabelSale.classList.add('product-label', 'product-label_sale');
    productLabelSale.innerHTML = "sale";

    var productLabelNew = document.createElement('span');
    productLabelNew.classList.add('product-label', 'product-label_new');
    productLabelNew.innerHTML = "new";

    // product label end

    // product button start
    var productButton = document.createElement('p');
    productButton.classList.add('product-buttons');

    var productButtonAdd = document.createElement('button');
    productButtonAdd.classList.add('button', 'button-add');
    productButtonAdd.innerHTML = "add";

    var productButtonView = document.createElement('button');
    productButtonView.classList.add('button', 'button-view');
    productButtonView.innerHTML = "view";

    productButton.appendChild(productButtonAdd);
    productButton.appendChild(productButtonView);
    // product button end

    productDiv.appendChild(productLink);
    productDiv.appendChild(productDescription);
    productDiv.appendChild(productPrice);
    productDiv.appendChild(productButton);
    if(obj.discountCost !== null){
        productDiv.appendChild(productLabelSale);
    }
    if(obj.new !== false){
        productDiv.appendChild(productLabelNew);
    }

    product.appendChild(productDiv);
}


//Equal Height for each other aside in footer
function setEqualHeight(columns)
{
    var tallestcolumn = 0;
    columns.each(
        function()
        {
            currentHeight = $(this).height();
            console.log(currentHeight);
            if(currentHeight > tallestcolumn)
            {
                tallestcolumn = currentHeight;
            }
        }
    );
    columns.height(tallestcolumn);
}


