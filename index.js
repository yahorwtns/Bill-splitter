const users = {};

/*create the users object of the following kind:
  [guest]:[
    {[dish]:price}
  ]})
*/

const addUser = () => {
    const userField = document.getElementById("userName");
    const visitorDrop = document.getElementById("visitorDrop");
    const option = document.createElement("option");

    if (userField.value) {
    users[userField.value] = [];
    option.text = userField.value;
    visitorDrop.add(option);

    refreshTable();
    userField.value ="";
    }
};

const addDish = () => {
  const dishField = document.getElementById("dishName");
  const price = document.getElementById("price");
  const visitorDrop = document.getElementById("visitorDrop");

  users[visitorDrop.value].push({[dishField.value]:price.value});
    refreshTable();
  }

//filling the table
const addRowToTable = (user, price,food) => {
  const table = document.getElementById("table");
  const footer = document.getElementById("footer");
  const row = table.insertRow(1);
  const cell1 = row.insertCell(0);
  const cell2 = row.insertCell(1);
  const cell3 = row.insertCell(2);
  let totalSum = 0;
  cell1.innerHTML = user;
  cell2.innerHTML = price;
  cell3.innerHTML = food;
  //calculate total price
  for(let i = 1 ;i<table.rows.length;i++){
      totalSum = totalSum + parseInt(table.rows[i].cells[1].innerHTML)
  }
  footer.innerHTML=`Сумма чека: ${totalSum}`;
};
//delete all data from the table
const clearTable = () => {
  const table = document.getElementById("table");
  let rows = table.rows.length;
  if(rows>1) {
  for(let i=0;i<rows-1;i++){
    table.deleteRow(1);
  }
}
};

const refreshTable= () => {
  clearTable();
  // take all data from the users object
  let user = Object.keys(users);
  let price = Object.keys(users)
  .map(user=>users[user]
  .map(item=>Object.values(item)[0])
  .reduce((a,b)=>(+a+ +b),0));
  let food = Object.keys(users)
    .map(user=>users[user]
      .map(item=>Object.keys(item)[0])
        .reduce((a,b)=>(a +","+ b),""));

    for(let i =0;i<user.length;i++){
        addRowToTable(user[i],price[i],food[i].substr(1))}
  
}