import Unit from "../domain/Unit";
import CreateUnit from "../domain/CreateUnit";
import axios from "axios";
const apiKey = `${process.env.API}/api/v2`

class UnitHttp {
    static listUnits = async (): Promise<Array<Unit> | null> => {
        try {
            const response = await axios.get(`${apiKey}/units`);
            const data: Array<Unit> = response.data;
            return data;
        } catch (error) {
            console.error("Error fetching Units:", error);
            return null;
        }
    };
  
    static addUnitToServer = async (newAparature: CreateUnit): Promise<Unit | null> => {
        try {
            const response = await axios.post(`${apiKey}/add-unit`, newAparature);
            const addedAparature: Unit = response.data;
            return addedAparature;
        } catch (error) {
            return null;
        }
    };
  
    static updateAparatureById = async (id: number, updatedData: Partial<Unit>): Promise<Unit | null> => {
        try {
            const response = await axios.patch(`${apiKey}/units/${id}`, updatedData);
            const updatedUnit: Unit = response.data;
          return updatedUnit;
        } catch (error) {
            console.error('Error updating Unit by ID:', error);
          return null;
        }
    };
  
    static getUnitById = async (id: number): Promise<Unit | null> => {
        try {
          const response = await axios.get(`${apiKey}/unit/${id}`);
          const data: Unit = response.data;
          return data;
        } catch (error) {
          console.error('Error fetching Unit by ID:', error);
          return null;
        }
    };
      
    static removeUnitById = async (id: number): Promise<boolean> => {
        try {
          await axios.delete(`${apiKey}/units/${id}`);
          return true; 
        } catch (error) {
          console.error('Error deleting Unit by ID:', error);
          return false;
        }
    };
}

export default UnitHttp