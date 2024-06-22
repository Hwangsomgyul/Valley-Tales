const { educationModel } = require('../db/models');

const deleteEducation = async (req, res, next) => {
    const { educationId } = req.params;
    const foundEducation = await educationModel.findOne({ educationId });
    // 없으면 삭제 안되게 ㄱㄱ
    if (!foundEducation) {
        const err = new Error('없는 데이터');
        err.statusCode = 404;
        next(err);
        return;
    }
    if (!!foundEducataion.deleteAt) {
        const err = new Error('이미 삭제된 데이터');
        err.statusCode = 409;
        next(err);
        return;
    }
    const deletedEducation = await educationModel.findOneAndUpdate({ educationId }, { deletedAt: Date.now() }, { new: true });
    if (!deletedEducation.deletedAt) {
        const err = new Error('삭제가 잘 안되네요...');
        next(err);
        return;
    }
    return res.status(204).json("삭제 성공");
}

module.exports = deleteEducation;