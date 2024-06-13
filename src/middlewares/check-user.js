export default function checkUser(req, res, next) {
    if (req.currentUser) {
        return next()
    }

    return res.status(401).json({
        ok: false,
        error: "No estás autorizado"
    })

}