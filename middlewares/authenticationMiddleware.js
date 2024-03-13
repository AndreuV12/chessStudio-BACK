import jwt from "jsonwebtoken"
const secretKey = "password"

function authMiddleware(req, res, next) {
  // Obtener el token JWT del encabezado de autorización
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;

  // Verificar si hay un token presente
  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  // Verificar si el token es válido
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    } else {
      // El token es válido, añadir la información decodificada a la solicitud
      req.user = decoded;
      next(); // Continuar con la ejecución del siguiente middleware o controlador de ruta
    }
  });
}

export default authMiddleware;
  