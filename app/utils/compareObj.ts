export function objCompare(obj1: Record<string, any>, obj2: Record<string, any>){
	//Lấy toàn bộ key của obj1
    const Obj1_keys = Object.keys(obj1);

    //Lấy toàn bộ key của obj2
    const Obj2_keys = Object.keys(obj2);

    //Nếu số lượng thuộc tính giữa chúng khác nhau thì chúng khác nhau
    if (Obj1_keys.length !== Obj2_keys.length){
        return false;
    }

    /*So sánh từng thuộc tính giữa 2 object,
      và nếu có cặp thuộc tính nào khác nhau thì sẽ khác nhau*/
    for (let k of Obj1_keys){
        if(obj1[k] !== obj2[k]){
           return false;
        }
    }
    /*Trừ các trường hợp 2 object không giống nhau
      thì trả về true vì chúng giống nhau*/
    return true;
}
