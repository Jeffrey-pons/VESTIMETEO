export const errorMiddleware = (error, req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
_next) => {
    console.error(error);
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Something went wrong';
    res.status(statusCode).json({ message });
};
