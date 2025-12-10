
function returns(res, status, success, message, data=null, erreur=null){
    return res.status(status).json({
        success:  success,
        message: message,
        data: data,
        erreur:erreur
    });
}


export default returns;