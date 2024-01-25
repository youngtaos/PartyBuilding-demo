export const getModeTime = () => {
    // 添加零以保持两位数的格式
    function addZero(number) {
        return number < 10 ? '0' + number : number;
    }

    // 创建一个Date对象，它将包含当前的日期和时间
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = addZero(currentDate.getMonth() + 1); // 月份是从0开始计数的，所以要加1
    const day = addZero(currentDate.getDate());
    const hours = addZero(currentDate.getHours());
    const minutes = addZero(currentDate.getMinutes());
    const seconds = addZero(currentDate.getSeconds());


    // 打印当前时间
    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
}
