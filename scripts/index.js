let bagitems=[];
onLoad();

function onLoad()
{
    let bagitemstr=localStorage.getItem('bagitem');
    bagitems=bagitemstr?JSON.parse(bagitemstr):[];
    displayItemsOnHomePage();
    displaybagicon();
}

function addtoBag(itemid){
    bagitems.push(itemid);
    localStorage.setItem('bagitem',JSON.stringify(bagitems));
    displaybagicon();
}
function displaybagicon()
{
    let bagitemcountelement=document.querySelector('.bag-item-count');
    if(bagitems.length>0)
    {
        bagitemcountelement.style.visibility='visible';
        bagitemcountelement.innerHTML=bagitems.length;
    }else{
        bagitemcountelement.style.visibility='hidden';
    }
}
function displayItemsOnHomePage()
{
    let itemscontainerelement=document.querySelector('.items-container');
    if(!itemscontainerelement)
    {
        return;
    }
    let innerHTML=``;
    items.forEach(item=>{
    innerHTML+=`
    <div class="item-container">
    <img class="item-img" src="${item.item_image}" alt="item1 image">
    <div class="rating"> ${item.rating.stars}⭐|${item.rating.noofreviews} </div>
    <div class="company-name">${item.company_name}</div>
    <div class="item-name">${item.item_name}</div>
    <div class="price">
        <span class="current-price">Rs ${item.current_price}</span>
        <span class="original-price">Rs ${item.original_price}</span>
        <span  class="discount">(${item.discount_percentage}%OFF)</span>
    </div>
    <button class="btn-add-bag" onclick="addtoBag(${item.id})">Add to Bag</button>
    </div>`
});

itemscontainerelement.innerHTML=innerHTML;

}
