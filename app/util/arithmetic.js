    /**
     ** 减法函数，用来得到精确的减法结果
    ** 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
    ** 调用：accSub(arg1,arg2)
    ** 返回值：arg1加上arg2的精确结果
    **/
   export const accSub = (arg1, arg2) => {
        let r1, r2, m, n;
        try {
            r1 = arg1.toString().split(".")[1].length;
        }
        catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        }
        catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
        n = (r1 >= r2) ? r1 : r2;
        return ((arg1 * m - arg2 * m) / m).toFixed(n);
    }

    /** 
     ** 除法函数，用来得到精确的除法结果
    ** 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
    ** 调用：accDiv(arg1,arg2)
    ** 返回值：arg1除以arg2的精确结果
    **/
   export const accDiv = (arg1, arg2) => {
        let t1 = 0, t2 = 0, r1, r2;
        try {
            t1 = arg1.toString().split(".")[1].length;
        }
        catch (e) {
        }
        try {
            t2 = arg2.toString().split(".")[1].length;
        }
        catch (e) {
        }

        r1 = Number(arg1.toString().replace(".", ""));
        r2 = Number(arg2.toString().replace(".", ""));
        return ((r1 / r2) * Math.pow(10, t2 - t1)).toString();

    }
