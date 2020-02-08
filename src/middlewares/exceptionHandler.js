exports.serverError = (err, req, res) => {
    console.error(err);
    res.status(500).json({
        status: false,
        errors: err,
    })
}

exports.notFound = (req, res) => {
    res.status(404).json({
        status: false,
        errors: "Are you lost?",
    })
}