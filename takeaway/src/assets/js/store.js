/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2019-04-16 17:12:46
 * @version $Id$
 */

/**
 * 存储数据到localStorage中
 * @param id   用户店面id
 * @param key  健
 * @param value  值
 */
export function saveToLocal(id, key, value) {
    //id-商家的id，key-不同的属性名，value-属性名的值
    let seller = window.localStorage.__seller__; //专用字段__seller__
    if (!seller) {
      //刚开始的时候还没有seller
        seller = {};
        seller[id] = {};
    } else {
      //如果window.localStorage.__seller__已经有了
    //因为读取的值是字符串的json，所以需要解析成json形式
        seller = JSON.parse(seller);
        if (!seller[id]) {
          //需要判断seller中是否有属性id，没有的话需要给他进行定义
            seller[id] = {};
        }
    }
    seller[id][key] = value;  //设置不同id下的key的值
  //由于存储只能是字符串的值，需要将JSON转化成字符串的json形式
  //存储的localStorage的变量名是：_seller_
    window.localStorage.__seller__ = JSON.stringify(seller);
};

/**
 * 从localStorage中取值
 * @param id   用户店面id
 * @param key  健
 * @param def  默认值
 */
export function loadFromLocal(id, key, def) {
  //id-商家的id，key-不同的属性名,def-default默认值
    let seller = window.localStorage.__seller__;
    if (!seller) {
      //如果该变量还没有存储在localStorage中，那么需要返回一个默认值
        return def;
    }
    seller = JSON.parse(seller)[id];
    if (!seller) {
        return def;
    }
    let ret = seller[key];
    return ret || def;

}
