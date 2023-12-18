const moongoose = require('mongoose');

const personWithGrantsSchema = new moongoose.Schema(
    {
        person: {
            type: moongoose.Schema.Types.ObjectId,
            ref: 'Person',
            required: true,
        },
        grant: {
            type: moongoose.Schema.Types.ObjectId,
            ref: 'Grant',
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const PersonWithGrants = moongoose.model('PersonWithGrants', personWithGrantsSchema);

module.exports = PersonWithGrants;