import connection from "../connection.js";

export const get_user_byId = (userId) => {
    try {
        const query = 'SELECT * FROM users WHERE id = ?';
        const user = connection.query(query, [userId]);

        if (user.length > 0) {
            return user[0];
        } else {
            return null;
        }
    } catch (error) {
        console.log("Error al obtener usuario por ID", error);
        return null;
    }
};
