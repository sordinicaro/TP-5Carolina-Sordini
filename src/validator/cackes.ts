import zod from "zod";

const cacke = zod.object({
    id: zod.string(),
    cacke: zod.string(),
    ingredients: zod.array(zod.string()),
    size: zod.string(),




});

const validatePartialCacke = (obj: any) => cacke.partial().safeParse(obj);




export { validatePartialCacke };