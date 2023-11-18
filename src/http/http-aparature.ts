import axios from "axios";
import CreateAparature from "../domain/CreateAparature";
import Aparature from "../domain/Aparature";

const apiKey = `${process.env.API}/api/v1`

class AparatureHttp {
  static listAparatures = async (): Promise<Array<Aparature> | null> => {
      try {
          const response = await axios.get(`${apiKey}/aparatures`);
          const data: Array<Aparature> = response.data;
          return data;
      } catch (error) {
          console.error("Error fetching Aparatures:", error);
          return null;
      }
  };

  static addAparatureToServer = async (newAparature: CreateAparature): Promise<Aparature | null> => {
      try {
          const response = await axios.post(`${apiKey}/add-aparature`, newAparature);
          const addedAparature: Aparature = response.data;
          return addedAparature;
      } catch (error) {
          return null;
      }
  };

  static updateAparatureById = async (id: number, updatedData: Partial<Aparature>): Promise<Aparature | null> => {
      try {
          const response = await axios.patch(`${apiKey}/aparatures/${id}`, updatedData);
          const updatedAparature: Aparature = response.data;
        return updatedAparature;
      } catch (error) {
          console.error('Error updating Aparature by ID:', error);
        return null;
      }
  };

  static getAparatureById = async (id: number): Promise<Aparature | null> => {
      try {
        const response = await axios.get(`${apiKey}/aparature/${id}`);
        const data: Aparature = response.data;
        return data;
      } catch (error) {
        console.error('Error fetching Aparature by ID:', error);
        return null;
      }
  };
    
  static removeAparatureById = async (id: number): Promise<boolean> => {
      try {
        await axios.delete(`${apiKey}/aparatures/${id}`);
        return true; 
      } catch (error) {
        console.error('Error deleting Aparature by ID:', error);
        return false;
      }
  };
}

export default AparatureHttp