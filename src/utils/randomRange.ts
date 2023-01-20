export const randomRange = (min:number, max:number):number => { // min and max included
    return Math.random() * (max - min) + min
}
