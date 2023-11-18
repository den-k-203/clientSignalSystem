import axios from "axios"
import UnitAparaturetAttr from "../domain/UnitAparatureAttr"
import CreateUnitAparatureAttr from "../domain/CreateAparatureUnit"
import UnitAparatureAll from "../domain/UnitAparatureAll"
const apiKey = `${process.env.API}/api/v3`

class ExistAparatureUnit{

    static addExistAparature = async (newAparatureUnit: CreateUnitAparatureAttr): Promise<UnitAparaturetAttr | null> => {
        try{    
            const response = await axios.post(`${apiKey}/add-unit-aparature`, newAparatureUnit)
            const data: UnitAparaturetAttr = response.data
            return data
        }catch(e){
            return null
        }
    }

    static getListAparatureUnitExistbyId = async (id: number): Promise<Array<UnitAparatureAll> | null> => {
        try {
          const response = await axios.get(`${apiKey}/unit-aparatures/${id}`);
          const data: Array<UnitAparatureAll> = response.data;
          return data;
        } catch (e) {
          return null;
        }
    };
}

export default ExistAparatureUnit