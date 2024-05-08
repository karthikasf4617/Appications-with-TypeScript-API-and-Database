let useremailstatus=false;
let userpasswordstatus=false;
let usercnfirmpasswordstatus=false;
let userphonestatus=false;
let NewUserPhoneNumberStatus =false;
let usercurrentbalancestatus=false;
let CurrentUserId: number;
let currentusermail:string;
let CurrentUserMedicineName:string;
let medicineName:string;
let CurrentUserMedicineid:number;
let OrderStatus:string;

let MedicineIdAutoIncrement = 10;
let OrderIdAutoIncrement = 100;
let UserIdAutoIncrement = 1000;
let data: MedicineInfo[] = [];
const tableBody = document.querySelector("#dataTable tbody") as HTMLTableSectionElement;

interface UserInfo
{
    userID:any;
    email:string;
    password:string;
    confirmPassword:string;
    phoneNumber:string;
    userBalance:number;
}
interface MedicineInfo {
    medicineID: any;
    medicineName: string;
    medicinePrice: number;
    medicineCount: number;
    expiryDate:string;


}
//order

interface Orders {
    orderID: any;
    medicineID: any;
    userID: any;

    medicineName: string;
    medicineCount: number;
    orderStatus:string;

}
async function adduser(contact: UserInfo): Promise<void> {
    const response = await fetch('http://localhost:5171/api/userinfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contact)
    });
    if (!response.ok) {
      throw new Error('Failed to add user');
    }
  }
  async function addOrder(contact: Orders): Promise<void> {
    const response = await fetch('http://localhost:5171/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contact)
    });
    if (!response.ok) {
      throw new Error('Failed to add order');
    }
  }
  async function addMedicine(contact: MedicineInfo): Promise<void> {
    const response = await fetch('http://localhost:5171/api/medicineinfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contact)
    });
    if (!response.ok) {
      throw new Error('Failed to add Medicine');
    }
  }
  async function updateOrder(id: number, contact: Orders): Promise<void> {
    const response = await fetch(`http://localhost:5171/api/orders/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contact)
    });
    if (!response.ok) {
      throw new Error('Failed to update order');
    }
  }
  async function updateUser(id: number, contact: UserInfo): Promise<void> {
    const response = await fetch(`http://localhost:5171/api/userInfo/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contact)
    });
    if (!response.ok) {
      throw new Error('Failed to update user');
    }
  }
  async function updateMedicine(id: number, contact: MedicineInfo): Promise<void> {
    const response = await fetch(`http://localhost:5171/api/medicineinfo/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contact)
    });
    if (!response.ok) {
      throw new Error('Failed to update medicine');
    }
  }
  async function deleteMedicine(id:number): Promise<void> {
    const response = await fetch(`http://localhost:5171/api/medicineinfo/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete order');
    }
  }
  async function deleteOrder(id: string): Promise<void> {
    const response = await fetch(`http://localhost:5171/api/orders/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete order');
    }
  }
  async function fetchUser(): Promise<UserInfo[]> {
    const apiUrl = 'http://localhost:5171/api/userinfo';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    return await response.json();
  }
  async function fetchOrder(): Promise<Orders[]> {
    const apiUrl = 'http://localhost:5171/api/orders';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch order');
    }
    return await response.json();
  }
  async function fetchMedicine(): Promise<MedicineInfo[]> {
    const apiUrl = 'http://localhost:5171/api/medicineinfo';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch medicine');
    }
    return await response.json();
  }
function signup()
{
    let signup=document.getElementById('signup') as HTMLDivElement;
    let signin=document.getElementById('signin') as HTMLDivElement;
    signup.style.display="block";
    signin.style.display="none";
    
    
}
async function signin()
{
    let signup=document.getElementById('signup') as HTMLDivElement;
    let signin=document.getElementById('signin') as HTMLDivElement;
    signup.style.display="none";
    signin.style.display="block";
    const UserArrayList = await fetchUser();
    let avalibleuser=document.getElementById('avalibleuser')as HTMLLabelElement;
    avalibleuser.innerHTML="<h2>Avalible User</h2>"
    for(let i=0;i<UserArrayList.length;i++)
        {
            avalibleuser.innerHTML += `User Email : ${UserArrayList[i].email} <br>`;
        }
   

}
async function submit()
{
    let signup=document.getElementById('signup') as HTMLDivElement;
    signup.style.display="none";
    const UserArrayList = await fetchUser();
    if (useremailstatus == true &&
        userpasswordstatus == true &&
        usercnfirmpasswordstatus == true &&
        userphonestatus==true && usercurrentbalancestatus==true) {
        let useremail = (document.getElementById('email') as HTMLInputElement).value;
        let userPassword = (document.getElementById('password') as HTMLInputElement).value;
        let userconfirmpass = (document.getElementById('confirmpass') as HTMLInputElement).value;
        let userphoneno=(document.getElementById('phoneno')as HTMLInputElement).value;
        
        let usercurrentbalance=(document.getElementById('currentbalance') as HTMLInputElement).value;
        let balance=parseFloat(usercurrentbalance);

       //UserArrayList.push(new User(email, password , confirmpass,+phoneno,+currentbalance));
       let user1:UserInfo={
        userID:undefined,
        email:useremail,
        password:userPassword,
        confirmPassword:userconfirmpass,
        phoneNumber:userphoneno,
        userBalance:balance
       }

       adduser(user1);
        
    }
    else
    {
        alert("Please fill out the form fully.")
    }

}
function checkUserMail(paramemail: string) {
    let newUserName = (document.getElementById(paramemail) as HTMLInputElement).value;
    let newUserMailMessage = document.getElementById(paramemail + "Message") as HTMLLabelElement;
    let newUserNameRegex = /^([a-z 0-9]+)@([a-z]+)\.([a-z]{2,20})$/;

    if (newUserNameRegex.test(newUserName)==true) {

        useremailstatus  = true;
        newUserMailMessage.style.visibility = "hidden";
    }
    else {
        useremailstatus  = false;
        newUserMailMessage.innerHTML = "Please enter valid name";
        newUserMailMessage.style.visibility = "visible";
        newUserMailMessage.style.color = "tomato";
        newUserMailMessage.style.marginLeft = "10px";
    }

}
function checkUserpass(parampassword:string){
    let newuserpass=(document.getElementById(parampassword)as HTMLInputElement).value;
    let newuserpassmessage=(document.getElementById(parampassword+"Message") as HTMLDivElement);
    let newuserpassregx=/^\w{5,7}$/;
    if(newuserpassregx.test(newuserpass))
        {
            userpasswordstatus=true;
            newuserpassmessage.style.visibility="hidden";
        }
        else
        {
            userpasswordstatus=false;
            newuserpassmessage.innerHTML="please enter valid password.password should have atleast 5 letter atmost letter";
            newuserpassmessage.style.visibility="visible";
            newuserpassmessage.style.color="tomato";
            newuserpassmessage.style.marginLeft="10px";
        }
}
function checkUserconfirmpass(paramconfirmpassword:string){
    let newuserpass=(document.getElementById(paramconfirmpassword)as HTMLInputElement).value;


    let newuserpassmessage=(document.getElementById(paramconfirmpassword+"Message") as HTMLDivElement);
    let newuserpassregx=/^\w{5,7}$/;
    if(newuserpassregx.test(newuserpass))
        {
            userpasswordstatus=true;
            newuserpassmessage.style.visibility="hidden";
        }
        else
        {
            userpasswordstatus=false;
            newuserpassmessage.innerHTML="please enter valid password.password should have atleast 5 letter atmost letter";
            newuserpassmessage.style.visibility="visible";
            newuserpassmessage.style.color="tomato";
            newuserpassmessage.style.marginLeft="10px";
        }
}
function checkUserPhone(paramPhoneNo: string) {
    let newUserPhoneNumber = (document.getElementById(paramPhoneNo) as HTMLInputElement).value;
    let newUserPhoneNumberMessage = document.getElementById(paramPhoneNo + "Message") as HTMLLabelElement;
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
async function signinbtn()
{
    let home=document.getElementById('home') as HTMLDivElement;
    let signin=document.getElementById('signin') as HTMLDivElement;
    let menubar=document.getElementById('menubar') as HTMLDivElement;
    home.style.display="none";
    signin.style.display="none";
    menubar.style.display="block";
    const UserArrayList = await fetchUser();
        let noExistingUserIdChecker: boolean = false;
        let existingUseremail = (document.getElementById('existinguserid') as HTMLInputElement).value;
    
        let existingMailIdRegex = (document.getElementById('newuserid')as HTMLInputElement).value;
    
            for (let i = 0; i < UserArrayList.length; i++) {
                if (UserArrayList[i].email == existingUseremail) {
    
                    currentusermail=UserArrayList[i].email;
                    CurrentUserId=UserArrayList[i].userID;
                    alert("Login Successfully")
    
                    return;
                }
                else {
                    noExistingUserIdChecker = true;
                }
            }
    
            if (noExistingUserIdChecker) {
                alert("Enter Valid Mail Id");
            }
        }
    
    

async function medicinedata()
{
    let button1=document.getElementById('button1')as HTMLDivElement;
    button1.style.display="block";
    let purchase=document.getElementById('purchase') as HTMLDivElement;
    purchase.style.display="none";
    let menubar=document.getElementById('menubar') as HTMLDivElement;
    menubar.style.display="block";
    let history=document.getElementById('history') as HTMLDivElement;
    history.style.display="none";
    let medicineInfo = document.getElementById('medicineInfo') as HTMLLabelElement;
    medicineInfo.style.display="block";
    const tableBody = document.querySelector("#dataTable tbody") as HTMLTableSectionElement;
    tableBody.innerHTML="";
    const MedicineList = await fetchMedicine();
    MedicineList.forEach((item) =>{
        CurrentUserMedicineid=item.medicineID;
        CurrentUserMedicineName=item.medicineName;
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
}
function add1()
{
    let Addition=document.getElementById('Addition')as HTMLDivElement;
    Addition.style.display="block";
    let medicineInfo = document.getElementById('medicineInfo') as HTMLLabelElement;
    medicineInfo.style.display="none";
}
async function add2()
{
    let MedicineList=await fetchMedicine();
    let medname=(document.getElementById('medname')as HTMLInputElement).value;
    let medcount=(document.getElementById('medcount')as HTMLInputElement).value;
    let medcount1=parseInt(medcount);
    let medprice=(document.getElementById('medprice')as HTMLInputElement).value;
    let medprice1=parseInt(medprice);
    let expirydate1=new Date((document.getElementById('expirydate')as HTMLInputElement).value);
        let medicine:MedicineInfo={
          medicineID:undefined,
          medicineName:medname,
          medicineCount:medcount1,
          medicinePrice:medprice1,
          expiryDate:expirydate1.toISOString()
      }
      addMedicine(medicine);
      alert("Added Succesfully")
}
let Selectedmedicineid:number;
async function edit(item:number)
{
    let medname2=(document.getElementById('medname')as HTMLInputElement).value;
    let medcount=(document.getElementById('medcount')as HTMLInputElement).value;
    Selectedmedicineid=item;
    let medprice=(document.getElementById('medprice')as HTMLInputElement).value;
    let expirydate2=((document.getElementById('expirydate')as HTMLInputElement).value);
    let medicineInfo = document.getElementById('medicineInfo') as HTMLLabelElement;
    medicineInfo.style.display="block";
    let Addition=document.getElementById('Edit')as HTMLDivElement;
    Addition.style.display="block";
    const MedicineList=await fetchMedicine();
      const element = MedicineList.find((element) => element.medicineID == item);
      if (element) {
        Selectedmedicineid=Number(element.medicineID)
        medname2=element.medicineName,
        medcount=String(element.medicineCount),
        medprice=String(element.medicinePrice),
        expirydate2=(element.expiryDate),
        updateMedicine(Selectedmedicineid,element);
      }
     
}
async function edit2()
    {
      let medname=(document.getElementById('medname1')as HTMLInputElement).value;
      let medcount=(document.getElementById('medcount1')as HTMLInputElement).value;
    
      let medprice=(document.getElementById('medprice1')as HTMLInputElement).value;
      let expirydate2=((document.getElementById('expirydate1')as HTMLInputElement).value);
      let MedicineList=await fetchMedicine();
      for(let i=0;i<MedicineList.length;i++)
        {
          if(MedicineList[i].medicineID==Selectedmedicineid)
            {
              MedicineList[i].medicineName=medname,
              MedicineList[i].medicineCount=Number(medcount),
              MedicineList[i].medicinePrice=Number(medprice),
              MedicineList[i].expiryDate=expirydate2,
              updateMedicine(Selectedmedicineid,MedicineList[i]);
              alert("Edited Successfully")
            }
        }
    }
let MedicineIDedit:number;
async function deletefn(item:number)
{
    let MedicineList=await fetchMedicine();
    MedicineIDedit=item;
    for(let i=0;i<MedicineList.length;i++)
        {
            if(MedicineList[i].medicineID==MedicineIDedit)
                {
                    deleteMedicine(MedicineIDedit);
                    alert("Deleted Succesfully")
                }
        }
}
async function purchase()
{
    let Addition=document.getElementById('Addition')as HTMLDivElement;
    Addition.style.display="none";
    let medicineInfo = document.getElementById('medicineInfo') as HTMLLabelElement;
    medicineInfo.style.display="none";
    let purchase = document.getElementById('purchase') as HTMLLabelElement;
    purchase.style.display="block";
    const tableBody = document.querySelector("#dataTable1 tbody") as HTMLTableSectionElement;
    tableBody.innerHTML="";
    const MedicineList = await fetchMedicine();
    MedicineList.forEach((item) =>{
        CurrentUserMedicineid=item.medicineID;
        CurrentUserMedicineName=item.medicineName;
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
    
}
let selectedId:number;
function add(item:number)
{

    let purchasedetails=document.getElementById("purchasedetails") as HTMLDivElement;
    purchasedetails.style.display="block";
    selectedId=item;
};
async function buy()
{
    let history=document.getElementById('history') as HTMLDivElement;
    history.style.display="none";
    let proceed : boolean = true;
    let finalMedicineRequiredCount : number = 0;

    let requiredCount = (document.getElementById('requiredcount') as HTMLInputElement).value;

    let medicineRequiredCountRegex = /^\d{1,3}$/;
    const MedicineList = await fetchMedicine();
    const OrderList = await fetchOrder();
    if (medicineRequiredCountRegex.test(requiredCount) && +requiredCount > 0) {
        for (let i = 0; i < MedicineList.length; i++) {

            if (MedicineList[i].medicineID == selectedId) {

                
                if (MedicineList[i].medicineCount > 0) {


                    if((MedicineList[i].medicineCount - +requiredCount) < 0)
                    {
                        proceed = confirm(`We only have ${MedicineList[i].medicineCount} ${MedicineList[i].medicineName}. Do you want to buy ${MedicineList[i].medicineCount} ${MedicineList[i].medicineName}`)
                        
                        if(proceed)
                        {
                            finalMedicineRequiredCount = MedicineList[i].medicineCount;
                        }
                    }
                    else
                    {
                        finalMedicineRequiredCount = +requiredCount;
                    }

                    if(proceed)
                    {
                        MedicineList[i].medicineCount = MedicineList[i].medicineCount - finalMedicineRequiredCount;

                       // OrderList.push(new Order(MedicineList[i].medicineID, CurrentUserId, MedicineList[i].medicineName, finalMedicineRequiredCount,OrderStatus.Ordered));
                        let order1:Orders={
                            orderID:undefined,
                            medicineID:MedicineList[i].medicineID,
                            userID:CurrentUserId,
                            medicineName:MedicineList[i].medicineName,
                            medicineCount:finalMedicineRequiredCount,
                            orderStatus:"Ordered"
                        };
                        addOrder(order1);
                        alert("Purchase Success.");
                    }
                   
                }
                else if(MedicineList[i].medicineCount <= 0) {
                    alert("Out of Stock, you can buy alternative medicine.");
                }
            }

        }
    }
    else {
        alert("Please enter valid Required Count");
    }


}


async function topup()
{
    let purchasedetails=document.getElementById("purchasedetails") as HTMLDivElement;
    let currentbalance=document.getElementById("currentbalance") as HTMLDivElement;
    let showbalance=document.getElementById('showbalance')as HTMLDivElement;
    showbalance.style.display="none";
    let history=document.getElementById('history') as HTMLDivElement;
    history.style.display="none";
    let purchase=document.getElementById('purchase')as HTMLDivElement;
    purchase.style.display="none";
    let cancel=document.getElementById('cancel')as HTMLDivElement;
    cancel.style.display="none";
    purchasedetails.style.display="none";
    let topup=document.getElementById('topup') as HTMLDivElement;
    topup.style.display="block";
    const UserArrayList = await fetchUser();
    for (let i = 0; i < UserArrayList.length; i++) {
        if (UserArrayList[i].userID==CurrentUserId) {
            currentbalance.innerHTML+=`Your current balance is ${UserArrayList[i].userBalance.toString()}`
        }
    }
}
async function recharge()
{
    let topup=document.getElementById("topup") as HTMLDivElement;
    let purchase=document.getElementById("purchase") as HTMLDivElement;
    purchase.style.display="none";
    topup.style.display="block";
    const tableBody2=document.getElementById("orderhistory") as HTMLTableElement;
    tableBody2.style.display="none";
    const UserArrayList = await fetchUser();
    let recharge=(document.getElementById('recharge')as HTMLDivElement);
    
    for(let i=0;i<UserArrayList.length;i++)
        {
            if(UserArrayList[i].userID==CurrentUserId)
                {
                    let ubalance=document.getElementById('rechargeamount')as HTMLInputElement;
                    let recharge1=Number(ubalance);
                    UserArrayList[i].userBalance+=parseInt(ubalance.value);
                    recharge.innerHTML=UserArrayList[i].userBalance.toString();
                    let user1:UserInfo={
                        userID:CurrentUserId,
                        email:UserArrayList[i].email,
                        password:UserArrayList[i].password,
                        confirmPassword:UserArrayList[i].confirmPassword,
                        phoneNumber:UserArrayList[i].phoneNumber,
                        userBalance:UserArrayList[i].userBalance
                    }
                    updateUser(CurrentUserId,user1);
                }
        }
        alert("Recharge Suceesfull")
}
async function showbalance()
{
    let topup=document.getElementById("topup") as HTMLDivElement;
    topup.style.display="none";
    let showbalance=document.getElementById('showbalance')as HTMLDivElement;
    let balance=document.getElementById('balance')as HTMLLabelElement;
    let purchase=document.getElementById("purchase") as HTMLDivElement;
    purchase.style.display="none";
    showbalance.style.display="block";
    let history=document.getElementById('history')as HTMLDivElement;
    history.style.display="none";

    const UserArrayList = await fetchUser();
    for(let i=0;i<UserArrayList.length;i++)
        {
            if(UserArrayList[i].userID==CurrentUserId)
                {
                    balance.innerHTML=` Youe current balance ${UserArrayList[i].userBalance}`
                }
        }
}
async function cancel()
{
    let showbalance=document.getElementById('showbalance')as HTMLDivElement;
    showbalance.style.display="none";
    let history=document.getElementById('history')as HTMLDivElement;
    history.style.display="block";
    let historydisplay=document.getElementById('historydisplay') as HTMLTableElement;
    historydisplay.style.display="block";
    let recharge=document.getElementById('recharge')as HTMLDivElement;
    recharge.style.display="none";
    let medicinedata=document.getElementById('medicineInfo')as HTMLDivElement;
    medicinedata.style.display="none";
    let topup=document.getElementById("topup") as HTMLDivElement;
    topup.style.display="none";
    let purchase = document.getElementById('purchase') as HTMLLabelElement;
    purchase.style.display="none";
    let orderCount: number = 0;
    const historytable=document.querySelector("#historydisplay tbody")as HTMLTableElement;
    historytable.innerHTML = "";
    const OrderList = await fetchOrder();
    OrderList.forEach((item)=>{
      if(item.userID==CurrentUserId&& item.orderStatus=="Ordered")
        {
          const row=document.createElement("tr");
        row.innerHTML=`
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
    

}
let ORDERID:number;
async function Remove(item:number)
{
    ORDERID=item;
    const OrderList = await fetchOrder();
    const MedicineList=await fetchMedicine();
    for(let i=0;i<OrderList.length;i++)
        {
            {
              if(OrderList[i].orderID==ORDERID)
                {
                    OrderList[i].orderStatus="Cancelled";
                    let order1:Orders={
                        orderID:ORDERID,
                        medicineID:0,
                        userID:CurrentUserId,
                        medicineName:OrderList[i].medicineName,
                        medicineCount:OrderList[i].medicineCount,
                        orderStatus:"Cancelled"
                    };
                    updateOrder(ORDERID,order1);
                    
                }
            }
           
        }
    alert("Order cancelled")
}
async function history1()
{
    let showbalance=document.getElementById('showbalance')as HTMLDivElement;
    showbalance.style.display="none";
    let history=document.getElementById('history')as HTMLDivElement;
    history.style.display="block";
    let historydisplay=document.getElementById('historydisplay') as HTMLTableElement;
    historydisplay.style.display="block";
    let recharge=document.getElementById('recharge')as HTMLDivElement;
    recharge.style.display="none";
    let medicinedata=document.getElementById('medicineInfo')as HTMLDivElement;
    medicinedata.style.display="none";
    let topup=document.getElementById("topup") as HTMLDivElement;
    topup.style.display="none";
    let purchase = document.getElementById('purchase') as HTMLLabelElement;
    purchase.style.display="none";
    let orderCount: number = 0;
    const historytable=document.querySelector("#historydisplay tbody")as HTMLTableElement;
    historytable.innerHTML = "";
    const OrderList = await fetchOrder();
    OrderList.forEach((item)=>{
        const row=document.createElement("tr");
        row.innerHTML=`
        <td>${item.medicineID}</td>
        <td>${item.userID}</td>
        <td>${item.medicineName}</td>
        <td>${item.medicineCount}</td>
        <td>${item.orderStatus}</td>
        `;
        historytable.appendChild(row);
    });
}
