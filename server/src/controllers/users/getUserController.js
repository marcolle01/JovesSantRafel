import selectUserByIdService from '../../services/users/selectUserByIdService.js';

const getUserController = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await selectUserByIdService(userId);

        res.send({
            status: 'ok',
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

export default getUserController;
