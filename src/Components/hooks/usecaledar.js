import { useState } from "react";
var  dayshortarray = [
    "Mon","Tue","Wed","Thu","Fri","Sat","Sun"
]
var   montharray = [
    "January","Feburuary","March","April","May","Auguest","September","October","November",
]
var  Usecaledar = (dayshort = dayshortarray,monthNames = montharray)=>{
var  today = new Date()
var  todayFormatted = `${today.getDate()}- ${today.getMonth() + 1}-${today.getFullYear()}`
var  dayinweek = [1,2,3,4,5,6,7,8,9,0,]
var  [selectdate,setselectdate] = useState(today)
var  selectlastmonth = new Date(selectdate.getFullYear(),selectdate.getMonth(), + 1,0);
var  prevmontlastdate = new Date(selectdate.getFullYear(),selectdate.getMonth(),0) 
var  daysInMonth = selectlastmonth.getDate();
var  firtdaysinmonth =  new Date(selectdate.getFullYear(),selectdate.getMonth(),1).getDay()
var  straigingpoint = dayinweek.indexOf(firtdaysinmonth) +  1
var  prevmontthstraigpoint = prevmontlastdate.getDate() - dayinweek.indexOf(firtdaysinmonth) +1 
var  currentmonthcounter = 1
var  nextmonthcounter = 1
var  rows  = 6 
var  cols = 7
var  calendarRows = {}
for(let i = 1;i < rows + 1;i++){
for(let j = 1;j < cols + 1;j++){
    if(!calendarRows[i]){
        calendarRows[i] = [];   
    }
    if(i === 1){
        if(j < straigingpoint){
            calendarRows[i] = [...calendarRows[i],{
                classes : 'in-preve-month',
                date : `${prevmontthstraigpoint} - ${selectdate.getMonth() === 0 ? 12  : selectdate.getMonth()}
                -${selectdate.getMonth()  === 0  ? selectdate.getFullYear() -1  : selectdate.getFullYear()} `,
                value : prevmontthstraigpoint
            }];
            prevmontthstraigpoint++; 
        }
        else{
             calendarRows[i] = [...calendarRows[i],{
                classes : '',
                date : `${currentmonthcounter}-${selectdate.getMonth() + 1}- ${selectdate.getFullYear()}`,
                value : currentmonthcounter
             }]
             currentmonthcounter++
        }
    
    } else if(i > 1 && currentmonthcounter < daysInMonth + 1  ){
        calendarRows[i]  = [...calendarRows[i],{
            classes : '',
            date : `${currentmonthcounter}-${selectdate.getMonth() + 1 }  - ${selectdate.getFullYear()}`,
            value : currentmonthcounter
        }]
        currentmonthcounter++
    }
    else{
        calendarRows[i] = [...calendarRows[i], {
            classes : "in-next-month",
            date : `${nextmonthcounter} - ${selectdate.getMonth() + 2 === 13  ? 1 : selectdate.getMonth() + 2} - 
            ${selectdate.getMonth() + 2 === 13 ? selectdate.getFullYear()  + 1: selectdate.getFullYear()}  `
        }]
        nextmonthcounter++
    }
}
}
var  getprevmonth = ()=>{
    setselectdate(prevalue => new Date(prevalue.getFullYear(),prevalue.getMonth() - 1,1) )
} 
var  getnextmonth = ()=>{
    setselectdate(prevalue => new Date(prevalue.getFullYear(),prevalue.getMonth() + 1,1) )   
}
return{
    dayshort,
    monthNames,
    todayFormatted,
    calendarRows,
    selectdate,
    getprevmonth,
    getnextmonth,
}
}
export default Usecaledar