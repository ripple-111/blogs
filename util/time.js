export function timeFormat(utc_datetime) {
    // 转为正常的时间格式 年-月-日 时:分:秒
    let new_datetime = utc_datetime.split("T")[0] + " " + utc_datetime.split("T")[1].split(".")[0];

    // 处理成为时间戳
    let timestamp = new Date(new_datetime.replace(/-/g, '/')).getTime();
    timestamp = timestamp / 1000;
    // 增加8个小时，北京时间比utc时间多八个时区
    timestamp = timestamp + 8 * 60 * 60;

    // 时间戳转为时间
    let date = new Date(parseInt(timestamp) * 1000);
    let YY = date.getFullYear() + '-';
    let MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    let hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    let mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    let ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return YY + MM + DD + " " + hh + mm + ss;
}
