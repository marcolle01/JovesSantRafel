import selectUserByIdService from '../../services/users/selectUserByIdService.js';
const getOwnUserProfileController = async (req, res, next) => {
    try {
        const data = await selectUserByIdService(req.userLogged.id);
        res.send({
            status: 'ok',
            data: data,
        });
    } catch (error) {
        next(error);
    }
};

export default getOwnUserProfileController;
