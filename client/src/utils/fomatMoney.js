
// Định dạng số tiền sử dụng toLocaleString()
export const formattedAmount = (amount) => (Number(amount)).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
});