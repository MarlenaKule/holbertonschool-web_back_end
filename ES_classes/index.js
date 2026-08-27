class Car{
    

    #year = 2025;

    getCar(){
        return this.#year;
    }
}

const myCar = new Car();
//console.log(myCar.year);
console.log(myCar.getCar());

//********===>>> Krijo nje klas me A dhe B.
// A eshte prindi dhe te kete nje metode private qe printon nje mesazh. 
//B eshte klasa children, ben extends klasen A dhe printon metoden private.