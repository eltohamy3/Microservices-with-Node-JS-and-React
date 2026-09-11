class Vehicle{
  // color : string; 
  constructor( public color : string , ){
    this.color = color; 

  }
 public drive():void{
    console.log("chugga chugga");
  }
 public honk():void{
    console.log("beep")
  }
}
class Car extends Vehicle{
  constructor(public wheel: number ,   color : string){
    super(color);
  }
  

}

const car = new Car(4 , "Orange");

car.drive()
car.honk()
