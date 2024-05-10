import { Request, Response } from "express"

const auth = async (req: Request, res: Response) => {  
try {
    return {success: true, message: '완려'}
} catch(err) {
    throw err
}
}

export {auth}