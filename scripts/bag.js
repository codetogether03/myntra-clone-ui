const Convenience_Fee=99;
let bagitemobjects=[];
onLoad();

function onLoad()
{
  loadbagitemobjects();
  displaybagitems();
  displaybagsummary();
}

function displaybagsummary(){
  let bagsummaryelement=document.querySelector('.bag-summary');
  let totalitem=bagitemobjects.length;
  let totalmrp=0;
  let totaldicount=0;

  bagitemobjects.forEach(bagitem =>{
    totalmrp +=bagitem.original_price;
    totaldicount +=bagitem.original_price-bagitem.current_price;
  });
  let finalpayment=totalmrp-totaldicount+Convenience_Fee;
  bagsummaryelement.innerHTML=`<div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${totalitem} Items) </div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value">Rs${totalmrp}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount">-Rs${totaldicount}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">Rs 99</span>
            </div>
            <hr>
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value">Rs ${finalpayment}</span>
            </div>
          </div>
          <button class="btn-place-order">
            <div class="css-xjhrni">PLACE ORDER</div>
          </button>`
}

function  loadbagitemobjects()
{
    bagitemobjects=bagitems.map(itemid=>{
    for(let i=0;i<items.length;i++)
    {
        if(itemid==items[i].id){
            return items[i];
        }
    }
    });
    console.log(bagitemobjects);
}
function displaybagitems()
{
    let containerelement=document.querySelector('.bag-items-container');
   let innerHTML='';
   bagitemobjects.forEach(bagitem =>
   {
    innerHTML +=generateitemhtml(bagitem);
   });
   containerelement.innerHTML=innerHTML;
}
function removefrombag(itemid)
{
  bagitems=bagitems.filter(bagitemid=>bagitemid !=itemid);
  localStorage.setItem('bagitem',JSON.stringify(bagitems));
   loadbagitemobjects();
   displaybagicon();
   displaybagitems();
   displaybagsummary();
}
function generateitemhtml(item)
{
  return `
  <div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="${item.item_image}">
            </div>
            <div class="item-right-part">
              <div class="company">${item.company_name}</div>
              <div class="item-name">${item.item_name}</div>
              <div class="price-container">
                <span class="current-price">Rs${item.current_price}</span>
                <span class="original-price">Rs ${item.original_price}</span>
                <span class="discount-percentage">(${item.discount_percentage}%OFF)</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${item.return_period}</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${item.delivery_date}</span>
              </div>
            </div>

            <div class="remove-from-cart" onclick="removefrombag(${item.id})">X</div>
                      
        </div>`;
}