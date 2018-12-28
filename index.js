const users = {};

/*We’ll store users and their dished in this kind of data structure:
  [guest]:[
    {[dish]:price}
  ]})
*/

const addUser = () => {
  const userField = document.getElementById("userName");
  const visitorDrop = document.getElementById("visitorDrop");
  const option = document.createElement("option");
  
  if (userField.value) {
    const options = visitorDrop.options;
  // checking for duplicate users 
    for (let i = 0, j = options.length ; i < j; i++) {
      if (options[i].value === userField.value) {
        userField.value = "";
        return;
      }
    }
    users[userField.value] = [];
    option.text = userField.value;
    visitorDrop.add(option);
    refreshTable();
    visitorDrop.value = userField.value;
    userField.value = "";
    //shows the next container with dish and price input 
    document.getElementById("container2").style.display = ""; 
    }


};

const addDish = () => {
  const dishField = document.getElementById("dishName");
  const price = document.getElementById("price");
  const visitorDrop = document.getElementById("visitorDrop");

  if (dishField.value) {
  users[visitorDrop.value].push({[dishField.value] : price.value });
  refreshTable();
   //shows cointainers with table and total price
  document.getElementById("container3").style.display = "";
  document.getElementById("container4").style.display = "";
  dishField.value = "";
  price.value = "";
  }
}

//filling the table
const addRowToTable = (user, price, food) => {
  const table = document.getElementById("table");
  const footer = document.getElementById("footer");
  const curreny = document.getElementById("currency");
  const row = table.insertRow(1);
  const cellUser = row.insertCell(0);
  const cellPrice = row.insertCell(1);
  const cellFood = row.insertCell(2);
  let totalSum = 0;

  cellUser.innerHTML = user;
  cellPrice.innerHTML = price;
  cellFood.innerHTML = food;
//calculate total price
  for (let i = 1, j = table.rows.length; i < j; i++) {
    totalSum += parseFloat(table.rows[i].cells[1].innerHTML);
  }
  footer.innerHTML = `Сумма чека: ${totalSum} ${curreny.value}`;
};
//delete all data from the table
const clearTable = () => {
  const table = document.getElementById("table");
  const rows = table.rows.length;

  if (rows > 1) {
    for (let i = 0; i < rows - 1; i++) {
      table.deleteRow(1);
    }
  }
};

const refreshTable= () => {
  clearTable();
  // take all data from the users object
  const user = Object.keys(users);
  const price = Object.keys(users)
    .map( user => users[user]
      .map( item => Object.values(item)[0] )
        .reduce( (a,b) => (+a + +b) , 0) );
  const food = Object.keys(users)
    .map( user => users[user]
      .map( item => Object.keys(item)[0] )
        .join(", ") );
        

    for (let i = 0, j = user.length; i < j ;i++) {
      addRowToTable(user[i], price[i], food[i])
    }
  
}