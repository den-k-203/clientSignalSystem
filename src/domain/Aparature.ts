import AparatureType from "./AparatureType";

export default interface Aparature{
    id: number,
    name: string,
    model: string,
    type_signal: string,
    description: string,
    image: string
}