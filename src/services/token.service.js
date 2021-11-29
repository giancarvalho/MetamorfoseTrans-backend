import { validate as uuidValidate } from "uuid";

function validateAuthorization(authorization){
    if (
		!authorization ||
		authorization.trim() === "" ||
		!authorization.includes("Bearer ")
	)return 'invalid';
    const token = authorization.replace("Bearer ", "");

	if (token.trim() === "") return 'empty';
	if (!uuidValidate(token)) return 'invalid';
    return token;
}

export {validateAuthorization}