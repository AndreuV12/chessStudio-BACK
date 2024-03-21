import mongoose from 'mongoose'

const openingSchema = new mongoose.Schema({
    name: String,
    shown_pos: Object,
    data: Object,
    email: String
}, {
    versionKey: false // Esto evita que se guarde el campo __v en los documentos
});

openingSchema.statics.getUserOpenings = function (email) {
    return this.find({ email });
};

openingSchema.statics.getOpeningById = function (openingId) {
    return this.findById(openingId);
};

openingSchema.statics.editOpeningById = function (openingId, updatedOpening) { 
    const editableFields = ['data', 'shown_pos', 'name']
    const updateFields = {}
    editableFields.forEach((field)=>{
        if (field in updatedOpening)  updateFields[field] = updatedOpening[field]
    })
    return this.findByIdAndUpdate(
        openingId,
        { $set: updateFields },
        { new: true }
    )    
};

openingSchema.statics.deleteOpeningById = function(openingId) {
    return this.findByIdAndDelete(openingId);
};

const Opening = mongoose.model('openings', openingSchema)

export default Opening