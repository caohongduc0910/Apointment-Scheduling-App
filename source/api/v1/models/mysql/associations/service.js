import Service from "../services.js"
import Category from "../categories.js"

Service.belongsTo(Category, {
    foreignKey: {
        name: 'category_id',
    },
    as: 'category'
})