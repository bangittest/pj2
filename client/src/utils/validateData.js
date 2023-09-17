
/**
 * 
 * @param {*} money chuỗi tiền tệ cần format 
 * @returns chuỗi tiền tệ đã được format
 * Author:NLB(11/09/2023)
 */
export const formatMoney = (money) => {
    return (+money).toLocaleString("vi", { style: "currency", currency: "VND" });
};

/****
 * @param{*} date :chuoi thoi gian can dinh dang
 * @returns :dinh dang thoi gian ngay thang nam
 * Author:NLB(12/09/2023)
 */
export const formatDate = (date) => {
    //lay ra dinh dang thoi gian cua chuoi dua vao thoi gian thuc
    const today = new Date(date);
    //lay ra nam
    let year = today.getFullYear();
    //lay ra thang
    let month = today.getMonth() + 1;
    if (month > 0 && month < 10) {
        month = `0${month}`;
    }
    //lay ra ngay
    let day = today.getDate();
    //tra ra dinh dang
    return `${day}-${month}-${year}`;

};
