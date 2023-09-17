export const formatMoney = (money) =>
    money.toLocaleString("it-IT", { style: "currency", currency: "VND" });