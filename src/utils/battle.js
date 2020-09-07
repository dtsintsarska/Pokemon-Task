const battleFunc = (hp, attack, defence) => {

    //Getting random number from 0 to 200
    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    let randomNumber = randomIntFromInterval(0, 200)

    let damage = (attack / defence) * randomNumber

    let result = hp - damage

    return result
}

export default battleFunc