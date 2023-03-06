export function interval(time){
    const now = new Date();
    // 将字符串格式的时间转换为时间对象
    const timeStr = time;
    const timeObj = new Date(timeStr);
    const chineseNums = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    // 计算时间差，并将其转换为天数
    const timeDiff = now.getTime() - timeObj.getTime();
    const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    if(dayDiff<=0)
    return '今天'
    else if(dayDiff<7)
    return chineseNums[dayDiff]+'天前'
    else if(dayDiff>=7&&dayDiff<30)
    return chineseNums[Math.floor(dayDiff/7)]+'周前'
    else if(dayDiff>=30&&dayDiff<=90)
    return chineseNums[Math.floor(dayDiff/30)]+'个月前'
    else
    return '很久之前'
}
