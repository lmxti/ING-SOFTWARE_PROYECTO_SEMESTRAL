import Grant from "../../models/grant.model.js";

// CRUD BASICO PARA BECAS

export const createGrant = async (req, res) => {
    const { name, requirements, documents, amount } = req.body;
    const newGrant = new Grant({ name, requirements, documents, amount });
    const grantSaved = await newGrant.save();
    res.status(201).json(grantSaved);
};

export const getGrants = async (req, res) => {
    const grants = await Grant.find();
    res.status(201).json(grants);
};

export const getGrantById = async (req, res) => {
    const grant = await Grant.findById(req.params.grantId);
    res.status(200).json(grant);
};

export const updateGrantById = async (req, res) => {
    const updatedGrant = await Grant.findByIdAndUpdate(
        req.params.grantId,
        req.body,
        { new: true }
    );
    res.status(200).json(updatedGrant);
};

export const deleteGrantById = async (req, res) => {
    const { grantId } = req.params;
    await Grant.findByIdAndDelete(grantId);
    // code 200 is ok too
    res.status(204).json();
}