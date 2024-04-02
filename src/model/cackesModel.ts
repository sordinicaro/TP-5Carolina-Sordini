
import { any } from "zod";
import db from "../db/pasteleria.json";
import jsonfile from "jsonfile";




abstract class CackesModel {
    static getAllCackes = (query: any) => {

        const size = query.size;
        const cacke = query.cacke;

        if (size) {
            return db.cackes.filter((c) => c.size.toLowerCase() === size.toLowerCase()).map((size) => (
                {
                    cake: size.cacke,
                    ingredients: size.ingredients,
                    size: size.size
                }));
        } else if (cacke) {
            const cackeInfo = db.cackes.find((c) => c.cacke.toLowerCase() === cacke.toLowerCase());
            if (cackeInfo) {
                const { cacke, ingredients, size } = cackeInfo
                return { cacke, ingredients, size };
            }
        }

        return db.cackes.map(cacke => ({
            cacke: cacke.cacke,
            ingredients: cacke.ingredients,
            size: cacke.size
        }));

    }

    static createCackes = (objUser: any) => {
        const { id, cacke, ingredients, size } = objUser;
        const cackes = db.cackes.find((c: any) => c.cacke === cacke);
        if (cackes) {
            return { error: "Existing cacke" };
        }

        const newCacke = { id, cacke, ingredients, size }
        db.cackes.push(newCacke);

        jsonfile.writeFileSync("./src/db/pasteleria.json", db);

        return { message: "Cacke created successfully" };
    }


    static readUserById = (id: string) => {
        const cacke = db.cackes.find((c) => c.id === id)
        const cackeById = db.cackes.map(cacke => ({
            cacke: cacke.cacke,
            ingredients: cacke.ingredients,
            size: cacke.size
        }))
        if (!cacke) return 404;
        return cackeById;
    };

    static updateCacke = (objUser: any) => {
        try {
            const { id, cacke, ingredients, size } = objUser;

            const cackes = db.cackes.find((c) => c.id === id);

            if (!cackes) {
                return { error: "Cackes not found" };
            }

            if (id) cackes.id = id;
            if (cacke) cackes.cacke = cacke;
            if (ingredients) cackes.ingredients = ingredients;
            if (size) cackes.size = size;


            jsonfile.writeFileSync("./src/db/pasteleria.json", db);
        } catch (error) {
            return new Error();
        }
        return { message: "Successfully modified cacke" };
    };



    static deleteCacke = (id: string) => {
        const cacke = db.cackes.find((c) => c.id === id);
        if (!cacke) {
            return { error: "cacke not found" };
        }
        const cackes = db.cackes.filter((c) => c.id !== id);
        db.cackes = cackes;

        jsonfile.writeFileSync("./src/db/pasteleria.json", db);

        return { message: "Successfully delete cacke" };
    };



}





export { CackesModel };