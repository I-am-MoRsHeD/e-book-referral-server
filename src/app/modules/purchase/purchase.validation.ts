import z from "zod";


export const purchaseBookSchema = z.object({
    bookName: z.string({ error: 'Book name is required!' }),
    price: z.number({ error: 'Price is required!' })
});