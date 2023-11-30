export const createError = (status, message) => {
    const err = new Error();
    err.stateError = status;
    err.message = message
    return err;
}