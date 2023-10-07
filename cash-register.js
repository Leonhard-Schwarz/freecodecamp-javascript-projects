function checkCashRegister(price, cash, cid) {
  // Convert amounts to cents to avoid floating-point rounding errors

  let exchangeTable = {
    "ONE HUNDRED": 10000,
    "TWENTY": 2000,
    "TEN": 1000,
    "FIVE": 500,
    "ONE": 100,
    "QUARTER": 25,
    "DIME": 10,
    "NICKEL": 5,
    "PENNY": 1,
  };

  // Calculate change to be given in cents
  let changeDue = (cash - price) * 100;
  let changeArr = [];
  let change = 0;
  let totalCid = 0;

  // Calculate total amount of cash in drawer in cents
  for (let i = 0; i < cid.length; i++) {
    totalCid += cid[i][1] * 100;
  }

  // Return "INSUFFICIENT_FUNDS" if there is not enough cash in the drawer
  if (totalCid < changeDue) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  // Return "CLOSED" when the change in the drawer is exactly the same as the change to be given
  if (totalCid === changeDue) {
    return { status: "CLOSED", change: cid };
  }

  // Reverse the cid array so that the cash given back is always in the largest possible units
  cid.reverse();

  // Iterate through each currency unit in the drawer
  for (let i = 0; i < cid.length; i++) {
    const currencyUnit = cid[i][0];
    const unitValue = exchangeTable[currencyUnit];
    let cidValue = cid[i][1] * 100;

    // While there is still change to be given and there is enough of this currency unit in the drawer
    while (changeDue >= unitValue && cidValue >= unitValue) {
      change += unitValue;
      changeDue -= unitValue;
      cidValue -= unitValue;
    }

    // Check if change is greater than zero and add it to the changeArr
    if (change > 0) {
      changeArr.push([currencyUnit, change / 100]);
    }

    // Reset the change variable for the next iteration of the loop
    change = 0;
  }

  // Check if there is still change due and return "INSUFFICIENT_FUNDS" if so
  if (changeDue > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }
  // Return "OPEN" status and the change array
  return { status: "OPEN", change: changeArr };
}

console.log(
  checkCashRegister(19.5, 20, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100],
  ])
);
