import { DtoBaseResponse } from "./base-response.dto";

export const baseResponse: DtoBaseResponse = {
    message: '',
    statusCode: 200,
    success: true
}

export const baseBadResponse: DtoBaseResponse = {
    message: '',
    statusCode: 400,
    success: false
}