"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let useremailstatus = false;
let userpasswordstatus = false;
let usercnfirmpasswordstatus = false;
let userphonestatus = false;
let NewUserPhoneNumberStatus = false;
let usercurrentbalancestatus = false;
let CurrentUserId;
let currentusermail;
let CurrentUserMedicineName;
let medicineName;
let CurrentUserMedicineid;
let OrderStatus;
let MedicineIdAutoIncrement = 10;
let OrderIdAutoIncrement = 100;
let UserIdAutoIncrement = 1000;
let data = [];
const tableBody = document.querySelector("#dataTable tbody");
function adduser(contact) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5171/api/userinfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        });
        if (!response.ok) {
            throw new Error('Failed to add user');
        }
    });
}
function addOrder(contact) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5171/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        });
        if (!response.ok) {
            throw new Error('Failed to add order');
        }
    });
}
function addMedicine(contact) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5171/api/medicineinfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        });
        if (!response.ok) {
            throw new Error('Failed to add Medicine');
        }
    });
}
function updateOrder(id, contact) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5171/api/orders/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        });
        if (!response.ok) {
            throw new Error('Failed to update order');
        }
    });
}
function updateUser(id, contact) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5171/api/userInfo/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        });
        if (!response.ok) {
            throw new Error('Failed to update user');
        }
    });
}
function updateMedicine(id, contact) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5171/api/medicineinfo/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        });
        if (!response.ok) {
            throw new Error('Failed to update medicine');
        }
    });
}
function deleteMedicine(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5171/api/medicineinfo/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete order');
        }
    });
}
function deleteOrder(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5171/api/orders/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete order');
        }
    });
}
function fetchUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5171/api/userinfo';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch user');
        }
        return yield response.json();
    });
}
function fetchOrder() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5171/api/orders';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch order');
        }
        return yield response.json();
    });
}
function fetchMedicine() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5171/api/medicineinfo';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch medicine');
        }
        return yield response.json();
    });
}
function signup() {
    let signup = document.getElementById('signup');
    let signin = document.getElementById('signin');
    signup.style.display = "block";
    signin.style.display = "none";
}
function signin() {
    return __awaiter(this, void 0, void 0, function* () {
        let signup = document.getElementById('signup');
        let signin = document.getElementById('signin');
        signup.style.display = "none";
        signin.style.display = "block";
        const UserArrayList = yield fetchUser();
        let avalibleuser = document.getElementById('avalibleuser');
        avalibleuser.innerHTML = "<h2>Avalible User</h2>";
        for (let i = 0; i < UserArrayList.length; i++) {
            avalibleuser.innerHTML += `User Email : ${UserArrayList[i].email} <br>`;
        }
    });
}
function submit() {
    return __awaiter(this, void 0, void 0, function* () {
        let signup = document.getElementById('signup');
        signup.style.display = "none";
        const UserArrayList = yield fetchUser();
        if (useremailstatus == true &&
            userpasswordstatus == true &&
            usercnfirmpasswordstatus == true &&
            userphonestatus == true && usercurrentbalancestatus == true) {
            let useremail = document.getElementById('email').value;
            let userPassword = document.getElementById('password').value;
            let userconfirmpass = document.getElementById('confirmpass').value;
            let userphoneno = document.getElementById('phoneno').value;
            let usercurrentbalance = document.getElementById('currentbalance').value;
            let balance = parseFloat(usercurrentbalance);
            //UserArrayList.push(new User(email, password , confirmpass,+phoneno,+currentbalance));
            let user1 = {
                userID: undefined,
                email: useremail,
                password: userPassword,
                confirmPassword: userconfirmpass,
                phoneNumber: userphoneno,
                userBalance: balance
            };
            adduser(user1);
        }
        else {
            alert("Please fill out the form fully.");
        }
    });
}
function checkUserMail(paramemail) {
    let newUserName = document.getElementById(paramemail).value;
    let newUserMailMessage = document.getElementById(paramemail + "Message");
    let newUserNameRegex = /^([a-z 0-9]+)@([a-z]+)\.([a-z]{2,20})$/;
    if (newUserNameRegex.test(newUserName) == true) {
        useremailstatus = true;
        newUserMailMessage.style.visibility = "hidden";
    }
    else {
        useremailstatus = false;
        newUserMailMessage.innerHTML = "Please enter valid name";
        newUserMailMessage.style.visibility = "visible";
        newUserMailMessage.style.color = "tomato";
        newUserMailMessage.style.marginLeft = "10px";
    }
}
function checkUserpass(parampassword) {
    let newuserpass = document.getElementById(parampassword).value;
    let newuserpassmessage = document.getElementById(parampassword + "Message");
    let newuserpassregx = /^\w{5,7}$/;
    if (newuserpassregx.test(newuserpass)) {
        userpasswordstatus = true;
        newuserpassmessage.style.visibility = "hidden";
    }
    else {
        userpasswordstatus = false;
        newuserpassmessage.innerHTML = "please enter valid password.password should have atleast 5 letter atmost letter";
        newuserpassmessage.style.visibility = "visible";
        newuserpassmessage.style.color = "tomato";
        newuserpassmessage.style.marginLeft = "10px";
    }
}
function checkUserconfirmpass(paramconfirmpassword) {
    let newuserpass = document.getElementById(paramconfirmpassword).value;
    let newuserpassmessage = document.getElementById(paramconfirmpassword + "Message");
    let newuserpassregx = /^\w{5,7}$/;
    if (newuserpassregx.test(newuserpass)) {
        userpasswordstatus = true;
        newuserpassmessage.style.visibility = "hidden";
    }
    else {
        userpasswordstatus = false;
        newuserpassmessage.innerHTML = "please enter valid password.password should have atleast 5 letter atmost letter";
        newuserpassmessage.style.visibility = "visible";
        newuserpassmessage.style.color = "tomato";
        newuserpassmessage.style.marginLeft = "10px";
    }
}
function checkUserPhone(paramPhoneNo) {
    let newUserPhoneNumber = document.getElementById(paramPhoneNo).value;
    let newUserPhoneNumberMessage = document.getElementById(paramPhoneNo + "Message");
    let newUserPhoneNumberRegex = /^\d{10}$/;
    if (newUserPhoneNumberRegex.test(newUserPhoneNumber)) {
        NewUserPhoneNumberStatus = true;
        newUserPhoneNumberMessage.style.visibility = "hidden";
    }
    else {
        NewUserPhoneNumberStatus = false;
        newUserPhoneNumberMessage.innerHTML = "Please enter valid phone number";
        newUserPhoneNumberMessage.style.visibility = "visible";
        newUserPhoneNumberMessage.style.color = "tomato";
        newUserPhoneNumberMessage.style.marginLeft = "10px";
    }
}
function signinbtn() {
    return __awaiter(this, void 0, void 0, function* () {
        let home = document.getElementById('home');
        let signin = document.getElementById('signin');
        let menubar = document.getElementById('menubar');
        home.style.display = "none";
        signin.style.display = "none";
        menubar.style.display = "block";
        const UserArrayList = yield fetchUser();
        let noExistingUserIdChecker = false;
        let existingUseremail = document.getElementById('existinguserid').value;
        let existingMailIdRegex = document.getElementById('newuserid').value;
        for (let i = 0; i < UserArrayList.length; i++) {
            if (UserArrayList[i].email == existingUseremail) {
                currentusermail = UserArrayList[i].email;
                CurrentUserId = UserArrayList[i].userID;
                alert("Login Successfully");
                return;
            }
            else {
                noExistingUserIdChecker = true;
            }
        }
        if (noExistingUserIdChecker) {
            alert("Enter Valid Mail Id");
        }
    });
}
function medicinedata() {
    return __awaiter(this, void 0, void 0, function* () {
        let button1 = document.getElementById('button1');
        button1.style.display = "block";
        let purchase = document.getElementById('purchase');
        purchase.style.display = "none";
        let menubar = document.getElementById('menubar');
        menubar.style.display = "block";
        let history = document.getElementById('history');
        history.style.display = "none";
        let medicineInfo = document.getElementById('medicineInfo');
        medicineInfo.style.display = "block";
        const tableBody = document.querySelector("#dataTable tbody");
        tableBody.innerHTML = "";
        const MedicineList = yield fetchMedicine();
        MedicineList.forEach((item) => {
            CurrentUserMedicineid = item.medicineID;
            CurrentUserMedicineName = item.medicineName;
            const row = document.createElement("tr");
            row.innerHTML = `
        <td>${item.medicineName}</td>
        <td>${item.medicineCount}</td>
        <td>${item.medicinePrice}</td>
        <td>${item.expiryDate.toString().split('T')[0].split('-').reverse().join('/')}</td>
        <td>
          <button onclick="edit('${item.medicineID}')">Edit</button>
          <button onclick="deletefn('${item.medicineID}')">Delete</button>
        </td>
      `;
            tableBody.appendChild(row);
        });
    });
}
function add1() {
    let Addition = document.getElementById('Addition');
    Addition.style.display = "block";
    let medicineInfo = document.getElementById('medicineInfo');
    medicineInfo.style.display = "none";
}
function add2() {
    return __awaiter(this, void 0, void 0, function* () {
        let MedicineList = yield fetchMedicine();
        let medname = document.getElementById('medname').value;
        let medcount = document.getElementById('medcount').value;
        let medcount1 = parseInt(medcount);
        let medprice = document.getElementById('medprice').value;
        let medprice1 = parseInt(medprice);
        let expirydate1 = new Date(document.getElementById('expirydate').value);
        let medicine = {
            medicineID: undefined,
            medicineName: medname,
            medicineCount: medcount1,
            medicinePrice: medprice1,
            expiryDate: expirydate1.toISOString()
        };
        addMedicine(medicine);
        alert("Added Succesfully");
    });
}
let Selectedmedicineid;
function edit(item) {
    return __awaiter(this, void 0, void 0, function* () {
        let medname2 = document.getElementById('medname').value;
        let medcount = document.getElementById('medcount').value;
        Selectedmedicineid = item;
        let medprice = document.getElementById('medprice').value;
        let expirydate2 = (document.getElementById('expirydate').value);
        let medicineInfo = document.getElementById('medicineInfo');
        medicineInfo.style.display = "block";
        let Addition = document.getElementById('Edit');
        Addition.style.display = "block";
        const MedicineList = yield fetchMedicine();
        const element = MedicineList.find((element) => element.medicineID == item);
        if (element) {
            Selectedmedicineid = Number(element.medicineID);
            medname2 = element.medicineName,
                medcount = String(element.medicineCount),
                medprice = String(element.medicinePrice),
                expirydate2 = (element.expiryDate),
                updateMedicine(Selectedmedicineid, element);
        }
    });
}
function edit2() {
    return __awaiter(this, void 0, void 0, function* () {
        let medname = document.getElementById('medname1').value;
        let medcount = document.getElementById('medcount1').value;
        let medprice = document.getElementById('medprice1').value;
        let expirydate2 = (document.getElementById('expirydate1').value);
        let MedicineList = yield fetchMedicine();
        for (let i = 0; i < MedicineList.length; i++) {
            if (MedicineList[i].medicineID == Selectedmedicineid) {
                MedicineList[i].medicineName = medname,
                    MedicineList[i].medicineCount = Number(medcount),
                    MedicineList[i].medicinePrice = Number(medprice),
                    MedicineList[i].expiryDate = expirydate2,
                    updateMedicine(Selectedmedicineid, MedicineList[i]);
                alert("Edited Successfully");
            }
        }
    });
}
// function edit1()
// {
//     let medicineInfo = document.getElementById('medicineInfo') as HTMLLabelElement;
//     medicineInfo.style.display="none";
//     let medname2=(document.getElementById('medname1')as HTMLInputElement).value;
//     let medcount=(document.getElementById('medcount1')as HTMLInputElement).value;
//     let medcount2=parseInt(medcount);
//     let medprice=(document.getElementById('medprice1')as HTMLInputElement).value;
//     let medprice2=parseInt(medprice);
//     let expirydate2=new Date((document.getElementById('expirydate1')as HTMLInputElement).value);
// }
let MedicineIDedit;
function deletefn(item) {
    return __awaiter(this, void 0, void 0, function* () {
        let MedicineList = yield fetchMedicine();
        MedicineIDedit = item;
        for (let i = 0; i < MedicineList.length; i++) {
            if (MedicineList[i].medicineID == MedicineIDedit) {
                deleteMedicine(MedicineIDedit);
                alert("Deleted Succesfully");
            }
        }
    });
}
function purchase() {
    return __awaiter(this, void 0, void 0, function* () {
        let Addition = document.getElementById('Addition');
        Addition.style.display = "none";
        let medicineInfo = document.getElementById('medicineInfo');
        medicineInfo.style.display = "none";
        let purchase = document.getElementById('purchase');
        purchase.style.display = "block";
        const tableBody = document.querySelector("#dataTable1 tbody");
        tableBody.innerHTML = "";
        const MedicineList = yield fetchMedicine();
        MedicineList.forEach((item) => {
            CurrentUserMedicineid = item.medicineID;
            CurrentUserMedicineName = item.medicineName;
            const row = document.createElement("tr");
            row.innerHTML = `
        <td>${item.medicineName}</td>
        <td>${item.medicineCount}</td>
        <td>${item.medicinePrice}</td>
        <td>${item.expiryDate.toString().split('T')[0].split('-').reverse().join('/')}</td>
        <td>
          <button onclick="add('${item.medicineID}')">Buy</button>
        </td>
      `;
            tableBody.appendChild(row);
        });
    });
}
let selectedId;
function add(item) {
    let purchasedetails = document.getElementById("purchasedetails");
    purchasedetails.style.display = "block";
    selectedId = item;
}
;
function buy() {
    return __awaiter(this, void 0, void 0, function* () {
        let history = document.getElementById('history');
        history.style.display = "none";
        let proceed = true;
        let finalMedicineRequiredCount = 0;
        let requiredCount = document.getElementById('requiredcount').value;
        let medicineRequiredCountRegex = /^\d{1,3}$/;
        const MedicineList = yield fetchMedicine();
        const OrderList = yield fetchOrder();
        if (medicineRequiredCountRegex.test(requiredCount) && +requiredCount > 0) {
            for (let i = 0; i < MedicineList.length; i++) {
                if (MedicineList[i].medicineID == selectedId) {
                    if (MedicineList[i].medicineCount > 0) {
                        if ((MedicineList[i].medicineCount - +requiredCount) < 0) {
                            proceed = confirm(`We only have ${MedicineList[i].medicineCount} ${MedicineList[i].medicineName}. Do you want to buy ${MedicineList[i].medicineCount} ${MedicineList[i].medicineName}`);
                            if (proceed) {
                                finalMedicineRequiredCount = MedicineList[i].medicineCount;
                            }
                        }
                        else {
                            finalMedicineRequiredCount = +requiredCount;
                        }
                        if (proceed) {
                            MedicineList[i].medicineCount = MedicineList[i].medicineCount - finalMedicineRequiredCount;
                            // OrderList.push(new Order(MedicineList[i].medicineID, CurrentUserId, MedicineList[i].medicineName, finalMedicineRequiredCount,OrderStatus.Ordered));
                            let order1 = {
                                orderID: undefined,
                                medicineID: MedicineList[i].medicineID,
                                userID: CurrentUserId,
                                medicineName: MedicineList[i].medicineName,
                                medicineCount: finalMedicineRequiredCount,
                                orderStatus: "Ordered"
                            };
                            addOrder(order1);
                            alert("Purchase Success.");
                        }
                    }
                    else if (MedicineList[i].medicineCount <= 0) {
                        alert("Out of Stock, you can buy alternative medicine.");
                    }
                }
            }
        }
        else {
            alert("Please enter valid Required Count");
        }
    });
}
function topup() {
    return __awaiter(this, void 0, void 0, function* () {
        let purchasedetails = document.getElementById("purchasedetails");
        let currentbalance = document.getElementById("currentbalance");
        let showbalance = document.getElementById('showbalance');
        showbalance.style.display = "none";
        let history = document.getElementById('history');
        history.style.display = "none";
        let purchase = document.getElementById('purchase');
        purchase.style.display = "none";
        let cancel = document.getElementById('cancel');
        cancel.style.display = "none";
        purchasedetails.style.display = "none";
        let topup = document.getElementById('topup');
        topup.style.display = "block";
        const UserArrayList = yield fetchUser();
        for (let i = 0; i < UserArrayList.length; i++) {
            if (UserArrayList[i].userID == CurrentUserId) {
                currentbalance.innerHTML += `Your current balance is ${UserArrayList[i].userBalance.toString()}`;
            }
        }
    });
}
function recharge() {
    return __awaiter(this, void 0, void 0, function* () {
        let topup = document.getElementById("topup");
        let purchase = document.getElementById("purchase");
        purchase.style.display = "none";
        topup.style.display = "block";
        const tableBody2 = document.getElementById("orderhistory");
        tableBody2.style.display = "none";
        const UserArrayList = yield fetchUser();
        let recharge = document.getElementById('recharge');
        for (let i = 0; i < UserArrayList.length; i++) {
            if (UserArrayList[i].userID == CurrentUserId) {
                let ubalance = document.getElementById('rechargeamount');
                let recharge1 = Number(ubalance);
                UserArrayList[i].userBalance += parseInt(ubalance.value);
                recharge.innerHTML = UserArrayList[i].userBalance.toString();
                let user1 = {
                    userID: CurrentUserId,
                    email: UserArrayList[i].email,
                    password: UserArrayList[i].password,
                    confirmPassword: UserArrayList[i].confirmPassword,
                    phoneNumber: UserArrayList[i].phoneNumber,
                    userBalance: UserArrayList[i].userBalance
                };
                updateUser(CurrentUserId, user1);
            }
        }
        alert("Recharge Suceesfull");
    });
}
function showbalance() {
    return __awaiter(this, void 0, void 0, function* () {
        let topup = document.getElementById("topup");
        topup.style.display = "none";
        let showbalance = document.getElementById('showbalance');
        let balance = document.getElementById('balance');
        let purchase = document.getElementById("purchase");
        purchase.style.display = "none";
        showbalance.style.display = "block";
        let history = document.getElementById('history');
        history.style.display = "none";
        const UserArrayList = yield fetchUser();
        for (let i = 0; i < UserArrayList.length; i++) {
            if (UserArrayList[i].userID == CurrentUserId) {
                balance.innerHTML = ` Youe current balance ${UserArrayList[i].userBalance}`;
            }
        }
    });
}
function cancel() {
    return __awaiter(this, void 0, void 0, function* () {
        let showbalance = document.getElementById('showbalance');
        showbalance.style.display = "none";
        let history = document.getElementById('history');
        history.style.display = "block";
        let historydisplay = document.getElementById('historydisplay');
        historydisplay.style.display = "block";
        let recharge = document.getElementById('recharge');
        recharge.style.display = "none";
        let medicinedata = document.getElementById('medicineInfo');
        medicinedata.style.display = "none";
        let topup = document.getElementById("topup");
        topup.style.display = "none";
        let purchase = document.getElementById('purchase');
        purchase.style.display = "none";
        let orderCount = 0;
        const historytable = document.querySelector("#historydisplay tbody");
        historytable.innerHTML = "";
        const OrderList = yield fetchOrder();
        OrderList.forEach((item) => {
            if (item.userID == CurrentUserId && item.orderStatus == "Ordered") {
                const row = document.createElement("tr");
                row.innerHTML = `
        <td>${item.medicineID}</td>
        <td>${item.userID}</td>
        <td>${item.medicineName}</td>
        <td>${item.medicineCount}</td>
        <td>${item.orderStatus}</td>
        <td><button onclick="Remove('${item.orderID}')">Cancel</button>
        `;
                historytable.appendChild(row);
            }
        });
    });
}
let ORDERID;
function Remove(item) {
    return __awaiter(this, void 0, void 0, function* () {
        ORDERID = item;
        const OrderList = yield fetchOrder();
        const MedicineList = yield fetchMedicine();
        for (let i = 0; i < OrderList.length; i++) {
            {
                if (OrderList[i].orderID == ORDERID) {
                    OrderList[i].orderStatus = "Cancelled";
                    let order1 = {
                        orderID: ORDERID,
                        medicineID: 0,
                        userID: CurrentUserId,
                        medicineName: OrderList[i].medicineName,
                        medicineCount: OrderList[i].medicineCount,
                        orderStatus: "Cancelled"
                    };
                    updateOrder(ORDERID, order1);
                }
            }
        }
        alert("Order cancelled");
    });
}
function history1() {
    return __awaiter(this, void 0, void 0, function* () {
        let showbalance = document.getElementById('showbalance');
        showbalance.style.display = "none";
        let history = document.getElementById('history');
        history.style.display = "block";
        let historydisplay = document.getElementById('historydisplay');
        historydisplay.style.display = "block";
        let recharge = document.getElementById('recharge');
        recharge.style.display = "none";
        let medicinedata = document.getElementById('medicineInfo');
        medicinedata.style.display = "none";
        let topup = document.getElementById("topup");
        topup.style.display = "none";
        let purchase = document.getElementById('purchase');
        purchase.style.display = "none";
        let orderCount = 0;
        const historytable = document.querySelector("#historydisplay tbody");
        historytable.innerHTML = "";
        const OrderList = yield fetchOrder();
        OrderList.forEach((item) => {
            const row = document.createElement("tr");
            row.innerHTML = `
        <td>${item.medicineID}</td>
        <td>${item.userID}</td>
        <td>${item.medicineName}</td>
        <td>${item.medicineCount}</td>
        <td>${item.orderStatus}</td>
        `;
            historytable.appendChild(row);
        });
    });
}
