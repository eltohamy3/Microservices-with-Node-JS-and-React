

const lodCIvic ={
  name : 'civic' , 
  year : 2000 , 
  broken : true , 
  summary(){
    return `Name : ${this.name}. 
Year : ${this.year} .
Broken : ${this.broken}
    `
  }
}

interface Vehicle {
  name : string ; 
  year : number  ;
  broken : boolean ;
  summary():string
}
const printVehicle = (vehicle : Vehicle):void  =>{
  console.log(vehicle.name);  
  console.log(vehicle.year);
  console.log(vehicle.broken);
}