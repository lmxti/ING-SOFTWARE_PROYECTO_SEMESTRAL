import Grant from "../../models/grant.model.js";


// <----------------------------- CREATE GRANT ----------------------------->
export const createGrant = async (req, res) => {
    // Extracting data from request body values
    const { name, requirements, documents, amount } = req.body;
    // Create a new grant object with the data from the request
    const newGrant = new Grant({ name, requirements, documents, amount, state: true });
    // Saving the new grant in the database
    const grantSaved = await newGrant.save();
    // code 201 is for created
    res.status(201).json(grantSaved);
};

// <----------------------------- GET GRANTS ----------------------------->
export const getGrants = async (req, res) => {
    // Getting all the grants from the database
    const grants = await Grant.find();
    // code 200 is for ok
    res.status(201).json(grants);
};

// <----------------------------- GET GRANT BY ID ----------------------------->
export const getGrantById = async (req, res) => {
    // Extracting data from request params (id)
    const grant = await Grant.findById(req.params.grantId);
    // code 200 is for ok
    res.status(200).json(grant);
};

// <----------------------------- UPDATE GRANT BY ID ----------------------------->
export const updateGrantById = async (req, res) => {
    // Updating the grant with the data from the request params(id) and body values
    const updatedGrant = await Grant.findByIdAndUpdate(
        req.params.grantId,
        req.body,
        { new: true }
    );
    // code 200 is for ok
    res.status(200).json(updatedGrant);
};

// <----------------------------- DELETE GRANT BY ID ----------------------------->
export const deleteGrantById = async (req, res) => {
    // Deleting the grant with the data from the request params(id)
    const { grantId } = req.params;
    await Grant.findByIdAndDelete(grantId);
    // code 200 is ok too
    res.status(204).json();
}