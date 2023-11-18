import axios from "axios"
import UnitAparaturetAttr from "../domain/UnitAparatureAttr"
import CreateUnitAparatureAttr from "../domain/CreateAparatureUnit"
const apiKey = `${process.env.API}/api/v4`

class NeedAparatureUnit{
    static addNeedAparature = async (newAparatureUnit: CreateUnitAparatureAttr): Promise<UnitAparaturetAttr | null> => {
        try{    
            const response = await axios.post(`${apiKey}/add-unit-aparature`, newAparatureUnit)
            const data: UnitAparaturetAttr = response.data
            return data
        }catch(e){
            return null
        }
    }

    static removeAparatureUnitNeed =  async (id: number): Promise<string | null> => {
        try{
            const response = await axios.delete(`${apiKey}/unit-aparature/${id}`)
            const data = response.data
            return data
        }catch(e){
            return null
        }
    }

    static editAparatureUnitNeed = async (id: number, editAparatureUnit: CreateUnitAparatureAttr): Promise<UnitAparaturetAttr | null> => {
        try{
            const response = await axios.patch(`${apiKey}/unit-aparatures/${id}`, editAparatureUnit)
            const data = response.data
            return data
        }catch(e){
            return null
        }
    }

    static getAparatureUnitNeedbyId = async (id: number):Promise<string | null> => {
        try{
            const response = await axios.get(`${apiKey}/unit-aparatures/${id}`)
            const data = response.data
            return data
        }catch(e){
            return null
        }
    }
}

export default NeedAparatureUnit