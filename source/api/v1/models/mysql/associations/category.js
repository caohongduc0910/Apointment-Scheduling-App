import Service from "../services.js"
import Category from "../categories.js"

Category.hasMany(Service, {
    foreignKey: {
        name: 'category_id',
    },
    as: 'service'
})