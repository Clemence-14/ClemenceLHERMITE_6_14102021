//jsonwebtoken permet l'échange sécurisé de jetons (tokens) entre plusieurs parties. Se traduit par la vérifictaion de l'intégrité et de l'authenticité des données
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        //On extraie le token du header authorization de la requête entrante, on utilise split pour tout récupérer après bearer dans le header
        const token = req.headers.authorization.split(' ')[1];
        console.log('token' + token)
        //Pour décoder le token avec verify
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        //On extraie l'id de l'utilisateur du token
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable !';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: new Error('Invalid request!') });
    }
};