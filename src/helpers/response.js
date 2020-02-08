module.exports = {
    success: (res, data, statusCode) => {
        res.status(statusCode).json({
            status: true,
            data: data,
        })
    },
    error: (res, err, statusCode) => {
        res.status(statusCode).json({
            status: false,
            errors: err,
        })
    }
}