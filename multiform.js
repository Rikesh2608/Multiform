import { personal_details } from "./personal_details.js";

const page1=document.querySelector('.page1-container');
const nameInput=document.getElementById('name');
const emailInput=document.getElementById('email');
const phoneInput=document.getElementById('phone');
const pg1_nxt_btn=document.querySelector('.page1-btn');
const name_con=document.querySelector('.name-container .required-field');
const email_con=document.querySelector('.email-container .required-field');
const phone_con=document.querySelector('.phone-container .required-field');
const fieldrequired=document.querySelectorAll('.page1-form-container > div >.required-field');
const input=document.querySelectorAll('.page1-form-container>input');
const mail_field_required=document.querySelector('.email-requirement');
const step1=document.querySelector('.step1');
const step2=document.querySelector('.step2');
const step3=document.querySelector('.step3');
const step4=document.querySelector('.step4');

pg1_nxt_btn.addEventListener('click',()=>{
    pg1_check_values();
});

input.forEach((inputs)=>{
    inputs.addEventListener('keydown',(event)=>{
        if(event.key==`Enter`){
            pg1_check_values();
        }
    });
});
function pg1_check_values(){
    pg1_clear_values();
    let inputs_count=0;
    
    if(!emailInput.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}/))
    {
        email_con.style.display=`block`;
        emailInput.focus();
    }
    else if(phoneInput.value.length<=9){
        phone_con.style.display=`block`;
        phoneInput.focus();
    }
    else if(nameInput.value.length<3){
        name_con.style.display=`block`;
        nameInput.focus();
    }
    else{
        inputs_count++;
    }

    input.forEach((inputs,index)=>{
        index=input.length-1-index;
        console.log(inputs);
        if(input[index].value==``){
            pg1_required_fields(index);
        }
        else{
            inputs_count++;
        }
    });
    if(inputs_count==4){
        pg1_to_pg2();
    }
}

const steps=document.querySelectorAll('.steps');
function steps_colour(){
    steps.forEach((step)=>{
        step.style=`
        color: white;
        background-color: transparent;
        `;
    });
}

function pg1_to_pg2(){
    personal_details.name=nameInput.value;
    personal_details.email=emailInput.value;
    personal_details.phone=phoneInput.value;
    page1.style.display=`none`;
    page2.style.display=`block`;
    steps_colour();
    step2.style=`
    color: hsl(213, 96%, 18%);
    background-color: hsl(228, 100%, 84%);
    `;
}

function pg1_required_fields(i){
    fieldrequired.forEach((fields,index)=>{
        if(index==i){
            input[i].focus();
            fields.style.display=`block`;
        }
    });
}

function pg1_clear_values(){
    fieldrequired.forEach((fields)=>{
        fields.style.display=`none`;
    });
}


// page2 container

const page2=document.querySelector('.page2-container');
const goback=document.querySelector('.page2-goback');
const page2_btn=document.querySelector('.page2-btn');

goback.addEventListener('click',()=>{
    page1.style.display=`block`;
    page2.style.display=`none`;
    steps_colour();
    step1.style=`
    color: hsl(213, 96%, 18%);
    background-color: hsl(228, 100%, 84%);
    `;
});

page2_btn.addEventListener('click',()=>{
    pg2_to_pg3();
});

const add_on_price=[1,2,2];
const add_on_cost=document.querySelectorAll('.add-on-cost');

function pg2_to_pg3(){
    page3.style.display=`block`;
    page2.style.display=`none`;
    add_on_cost.forEach((add_on,index)=>{
        if(!converter){
            add_on.innerHTML=`+$${add_on_price[index]*10}/yr`;
        }
        else{
            add_on.innerHTML=`+$${add_on_price[index]}/mon`;
        }
    });
    steps_colour();
    step3.style=`
    color: hsl(213, 96%, 18%);
    background-color: hsl(228, 100%, 84%);
    `; 
}


const monthly_yearly_converter=document.querySelector('.monthly-yearly-side');
let monthly_yearly_cost=[9,12,15];
const cost=document.querySelectorAll('.cost');
const yearlyOffer=document.querySelectorAll('.two-mon-free');
let converter=1;

monthly_yearly_converter.addEventListener('click',()=>{

    cost.forEach((costs,index)=>{
        if(converter){
            costs.innerHTML=`$${monthly_yearly_cost[index]*10}/yr`;
        }
        else{
            costs.innerHTML=`$${monthly_yearly_cost[index]}/mo`;
        }
    });
    if(converter){
        converter=0;
        plan_invoice_moyr.innerHTML=`(Yearly)`;
        plan_invoice_pricehtml.innerHTML=`
        $${plan_price*10}/yr
        `;
    }else{
        converter=1;
        plan_invoice_moyr.innerHTML=`(Monthly)`;
        plan_invoice_pricehtml.innerHTML=`
        $${plan_price}/mo
        `;
    }
    yearlyOffer.forEach((yearly)=>{
        yearly.classList.toggle(`offers`);
    });
    monthly_yearly_converter.classList.toggle('yearly-side');
});

// plan selector

const arcade=document.querySelector('.arcade-container');
const advance=document.querySelector('.advance-container');
const pro=document.querySelector('.pro-container');
const plans=document.querySelectorAll('.plans');

plans.forEach((plan,index)=>{
    plan.addEventListener('click',()=>{
        plans.forEach((plan)=>{
            plan.style=`background-color:white`;
        });
        monthly_yearly_cost.forEach((cost,id)=>{
            if(index==id){
                if(!converter){
                    plans_invoice.innerHTML=`
                    <div>
                        <h4>${plan.id}<span class="plan-invoice-moyr">(Yearly)</span></h4>
                        <div class="change-plans">change</div>
                    </div>
                    <div>
                        <h4 class="plan-invoice-price">$${cost*10}/yr</h4>
                    </div>
                    `;
                }
                else {
                    plans_invoice.innerHTML=`
                    <div>
                        <h4>${plan.id}<span class="plan-invoice-moyr">(Monthly)</span></h4>
                        <div class="change-plans">change</div>
                    </div>
                    <div>
                        <h4 class="plan-invoice-price">$${cost}/mo</h4>
                    </div>
                    `;
                }
                plan_price=Number(cost);
            }
        });
        plan.style=`background-color:hsl(217, 100%, 97%)`;
    });
});



// page 3 conatiner

const page3=document.querySelector('.page3-container');
const page3_goback=document.querySelector('.page3-goback');
const page3_btn=document.querySelector('.page3-btn');

page3_goback.addEventListener('click',()=>{
    page2.style.display=`block`;
    page3.style.display=`none`;
    steps_colour();
    step2.style=`
    color: hsl(213, 96%, 18%);
    background-color: hsl(228, 100%, 84%);
    `;
});

page3_btn.addEventListener('click',()=>{
    pg3_to_pg4();
});

const online_service=document.getElementById('online-service');
const larger_storage=document.getElementById('larger-storage');
const customazible_profile=document.getElementById('customazible_profile');
const add_on=document.querySelectorAll('.page3-middle-section>div');
const checkbox=document.querySelectorAll('.add-on-left>input');
const changeplans=document.querySelector('.change-plans');
const plan_invoice_moyr=document.querySelector('.plan-invoice-moyr');

changeplans.addEventListener('click',()=>{
    steps_colour();
    addon_total_price=0;
    step2.style=`
    color: hsl(213, 96%, 18%);
    background-color: hsl(228, 100%, 84%);
    `;
    page2.style.display=`block`;
    page4.style.display=`none`;
});

add_on.forEach((addOn,index)=>{
    addOn.addEventListener('click',()=>{
        if(checkbox[index].checked==true){
            addOn.style=`background-color:white`;
            checkbox[index].checked=false;
        }
        else{
            addOn.style=`background-color:hsl(217, 100%, 97%)`;
            checkbox[index].checked=true;
        }
    });
});

// page 4 container

const page4=document.querySelector('.page4-container');
const page4_goback=document.querySelector('.page4-goback');
const page4_btn=document.querySelector('.page4-btn');
const page5=document.querySelector('.page5-container');
const total_pricehtml=document.querySelector('.total-price-container');
const plan_invoice_pricehtml=document.querySelector('.plan-invoice-price');
let totalprice=Number(0);
let plan_price=Number(9);
let addon_total_price=Number(0);
const addon_invoice=document.querySelector('.addon-invoice-container');
const plans_invoice=document.querySelector('.plans-invoice');

function pg3_to_pg4(){
    let addon_invoiceHtml=``;
    add_on_cost.forEach((add_on,index)=>{
        if(checkbox[index].checked==true){
            if(converter){
                addon_total_price+=add_on_price[index];
                addon_invoiceHtml+=`
                <div class="addon-invoice">
                    <div class="addon-names">
                        ${checkbox[index].value}
                    </div>
                    <div class="addon-price">
                        +$${add_on_price[index]}/mo
                    </div>
                </div>
                `;
            }
            else{
                addon_total_price+=(add_on_price[index]*10);
                addon_invoiceHtml+=`
                <div class="addon-invoice">
                    <div class="addon-names">
                        ${checkbox[index].value}
                    </div>
                    <div class="addon-price">
                        +$${add_on_price[index]*10}/yr
                    </div>
                </div>
                `;
            }
        }
    });
    addon_invoice.innerHTML=addon_invoiceHtml;
    if(!converter){
        totalprice=Number((plan_price *10)+ addon_total_price);
        total_pricehtml.innerHTML=`
        <div>
        Total(per<span>Year</span>)
        </div>
        <h2>$${totalprice}/yr</h2>
        `;
    }
    else{
    totalprice=Number(plan_price+ addon_total_price);
    total_pricehtml.innerHTML=`
    <div>
        Total(per<span>Month</span>)
    </div>
    <h2>$${totalprice}/mo</h2>
    `;
    }
    steps_colour();
    step4.style=`
    color: hsl(213, 96%, 18%);
    background-color: hsl(228, 100%, 84%);
    `;
    page4.style.display=`block`;
    page3.style.display=`none`;
}

page4_goback.addEventListener('click',()=>{
    steps_colour();
    addon_total_price=0;
    step3.style=`
    color: hsl(213, 96%, 18%);
    background-color: hsl(228, 100%, 84%);
    `;
    page3.style.display=`block`;
    page4.style.display=`none`;
});

page4_btn.addEventListener('click',()=>{
    steps_colour();
    page4.style.display=`none`;
    page5.style.display=`block`;
});
