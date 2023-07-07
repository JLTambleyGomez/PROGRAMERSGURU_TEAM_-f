const { Category } = require('../../db')
//__________________________________________________

const getCategory = async (req, res) => {
    try {

        let categories = await Category.findAll()
        return res.json(categories);

    } catch (error) {
        return res.status(500).json({message: 'Algo salió mal'});
    }
}

module.exports = {getCategory}