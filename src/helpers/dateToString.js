export default function dateToString(DatePattern, dataHora = null) {
    let dateTime, dateResult = '';
    let meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

    if (dataHora !== null) {
        if (typeof dataHora === "string") {
            dateTime = new Date(dataHora);
        } else{
            dateTime = dataHora;
        }
    } else {
        dateTime = new Date();
    }

    if(dateTime.toString() !== "Invalid Date"){
        for (var i = 0; i<=DatePattern.length; i++){
            if(DatePattern.charAt(i-1)!=='$' && DatePattern.charAt(i)!=='$'){
                if(DatePattern.charAt(i) === 'd') {
                    // DatePattern = DatePattern.replace(/d/g, Number(dateTime.getDate())<10?('0'+dateTime.getDate()):dateTime.getDate());
                    dateResult += ""+Number(dateTime.getDate())<10?('0'+dateTime.getDate()):dateTime.getDate();
                }
                else if(DatePattern.charAt(i) === 'M'){
                    //DatePattern = DatePattern.replace(/m/gi, Number(dateTime.getMonth()+1)<10?'0'+(dateTime.getMonth()+1):dateTime.getMonth()+1);
                    // DatePattern = DatePattern.replace(/M/gi, Number(dateTime.getMonth()+1)<10?'0'+(dateTime.getMonth()+1):dateTime.getMonth()+1);   
                    dateResult += ""+Number(dateTime.getMonth()+1)<10?'0'+(dateTime.getMonth()+1):dateTime.getMonth()+1;      
                }
                else if(DatePattern.charAt(i)==='Y'){
                    // DatePattern = DatePattern.replace(/Y/gi, dateTime.getFullYear());
                    dateResult += ""+dateTime.getFullYear();
                }
                else if(DatePattern.charAt(i)==='i'){
                    // DatePattern = DatePattern.replace(/i/gi, Number(dateTime.getMinutes())<10?'0'+(dateTime.getMinutes()):dateTime.getMinutes());
                    dateResult += ""+Number(dateTime.getMinutes())<10?'0'+(dateTime.getMinutes()):dateTime.getMinutes()
                }
                else if(DatePattern.charAt(i)==='h'){
                    // DatePattern = DatePattern.replace(/h/gi, Number(dateTime.getHours())<10?'0'+(dateTime.getHours()):dateTime.getHours());
                    dateResult += ""+Number(dateTime.getHours())<10?'0'+(dateTime.getHours()):dateTime.getHours()
                }
                else if(DatePattern.charAt(i)==='s' && DatePattern.charAt(i+1)==='e' ){
                  // DatePattern = DatePattern.replace(/se/gi, Number(dateTime.getSeconds())<10?'0'+(dateTime.getSeconds()):dateTime.getSeconds()); 
                  dateResult += ""+Number(dateTime.getSeconds())<10?'0'+(dateTime.getSeconds()):dateTime.getSeconds()
                } 
                else if(DatePattern.charAt(i)==='m'){
                    // DatePattern = DatePattern.replace(/m/g, meses[dateTime.getMonth()]);
                    dateResult =dateResult+""+ meses[dateTime.getMonth()];
                }else{
                    dateResult =String(dateResult)+String(DatePattern.charAt(i));
                }
            }else{
                dateResult =String(dateResult)+String(DatePattern.charAt(i))
            }

        }
    }else{
        return dataHora;
    }
        // console.dir(dateToString.caller);
        // console.dir(dateResult);
    
    return xReplace(dateResult, '$', '');
}


function xReplace(string, subs, replacer){
    let result='';
    let index=0;
    for(index=0; index<string.length; index++){
         if(string.charAt(index)===subs || string.charAt(index-1)===subs ){
            result +=replacer;
         }else{
            result += string.charAt(index);   
         }
         
    }
    return result;
}