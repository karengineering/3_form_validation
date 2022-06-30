
let nameField = document.querySelector('#name');

let otherTextField = document.querySelector('#other-job-role');
let jobTitle = document.querySelector('#title');

let color = document.querySelector('#color');
let design = document.querySelector('#design');

let activities = document.querySelector('#activities'); 
let totalCost = document.querySelector('#activities-cost');
let total = 0;

let payment = document.querySelector('#payment'); 
let creditCard = document.querySelector("#credit-card");
let paypal = document.querySelector("#paypal");
let bitcoin = document.querySelector("#bitcoin");

let form = document.querySelector('form');
let email = document.querySelector('#email');
let cc = document.querySelector('#cc-num');
let zip = document.querySelector('#zip');
let cvv = document.querySelector('#cvv');

let activitiesBox = document.querySelector('#activities-box');
let checkboxes = document.querySelectorAll('input[type=checkbox]');

/*
The "Name" field
*/
nameField.focus();

/*
"Job Role" section
*/
otherTextField.style.display = 'none';

jobTitle.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
        otherTextField.style.display = '';
    } else {
        otherTextField.style.display = 'none';
    }
});

/*
"T-shirt info" section
*/
color.disabled = true;

design.addEventListener('change', (e) => {
   color.disabled = false;

   for(let i=0; i<color.length; i++) {
        if(e.target.value === color.children[i].getAttribute('data-theme')) {
            color[i].hidden = false;
            color[i].selected = true;
        } else {
            color[i].hidden = true;
            color[i].selected = false;
        }
   }
});
   
/*
Register for Activities" section
*/
activities.addEventListener('change', (e) => {
    let cost = +e.target.getAttribute('data-cost');
    total = e.target.checked ? total += cost : total -= cost;

    totalCost.innerHTML = `Total: $${total}`;
});

/*
"Payment Info" section
*/
payment[1].selected = true;
paypal.hidden = true;
bitcoin.hidden = true;

payment.addEventListener('change', (e) => {
    // let pay = Array.from(payment);
    // for (let i=0; i<pay; i++) {
    //     console.log(pay[i]);
    // }
    // console.log(Array.from(payment));
    // Array.from(payment).forEach( type => {
    //     // if (e.target.value === type)
    //     console.log(type[0]);
    // });

    // for(let i=0; i<color.length; i++) {

    // if(e.target.value === color.children[i].getAttribute('data-theme')) {
    //     color[i].hidden = false;
    //     color[i].selected = true;
    // } else {
    //     color[i].hidden = true;
    //     color[i].selected = false;
    // }

    if (e.target.value === 'credit-card') {
        creditCard.hidden = false;
        paypal.hidden = true;
        bitcoin.hidden = true;  
    } else if (e.target.value === 'paypal') {
        creditCard.hidden = true;
        paypal.hidden = false;
        bitcoin.hidden = true; 
    } else {
        creditCard.hidden = true;
        paypal.hidden = true;
        bitcoin.hidden = false; 
    } 
});

/*
Form Validation
*/
const notValid = (ele) => {
    ele.parentNode.classList.add('not-valid');
    ele.parentNode.classList.remove('valid');
    ele.parentNode.lastElementChild.style.display = 'block';
};

const isValid = (ele) => {
    ele.parentNode.classList.add('valid');
    ele.parentNode.classList.remove('not-valid');
    ele.parentNode.lastElementChild.style.display = 'none';
}

const isName = () => {
    let hasName = nameField.value.replaceAll(' ', '') !== '';
    hasName ? isValid(nameField) : notValid(nameField);
    return hasName;
};

const isEmail = () => {
    let hasEmail = /^[^@]+@[^@.]+\.[a-z]+$/i.test(email.value);
    hasEmail ? isValid(email) : notValid(email);
    return hasEmail;
};

const isRegistered = () => {
    let hasTotal = total > 0;
    hasTotal ? isValid(activitiesBox) : notValid(activitiesBox);
    return hasTotal; 
};

const isCard = () => { 
    let isCC = /^\d{13,16}$/.test(cc.value);
    let isZip = /^\d{5}$/.test(zip.value);
    let isCvv = /^\d{3}$/.test(cvv.value);

    isCC ? isValid(cc) : notValid(cc);
    isZip ? isValid(zip) : notValid(zip);
    isCvv ? isValid(cvv) : notValid(cvv);

    return isCC && isZip && isCvv;
};

// const isForm = () => {
// //refactor somehow
//     nameValid = !isName();
//     emailValid = !isEmail();
//     registerValid = !isRegistered();

//     if (cc.hidden && nameValid && emailValid && registerValid) {
//         return false;
//     } else if (!cc.hidden && nameValid && emailValid && registerValid) {
//         return false;
//     } else { 
//         return true;
//     }
    // if (cc.hidden && (!isName() || !isEmail() || !isRegistered())) {
    //     return false;
    // } else if (!cc.hidden && (!isName() || !isEmail() || !isRegistered())) {
    //     return false;
    // } else { 
    //     return true;
    // }
// };

form.addEventListener('submit', e => {     
    // isForm() ? alert('Submitted!') : e.preventDefault();
    if(!isName()){
        e.preventDefault();     
    }
    if(!isEmail()){
        e.preventDefault();
    }
    if(!isRegistered()){
        e.preventDefault();
    }
    // if(!cc.hidden){
    if(payment.value === 'credit-card'){
        if(!isCard()){
            e.preventDefault();
        }  
    }
}); 

/*
Accessibility
*/
Array.from(checkboxes).forEach(cb => {
    cb.addEventListener('focus', e => {
        cb.parentNode.classList.add('focus');
    })
    cb.addEventListener('blur', e => {
        cb.parentNode.classList.remove('focus');
    })
});

/*
Simple Test Values
*/
//1234567891012
//a@a.com






