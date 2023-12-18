const { handleError } = require("../utils/errorHandler.js");
const PersonWithGrants = require("../models/personWithGrants.js");
const Person = require("../models/person.model.js");
const Grant = require("../models/grant.model.js");

async function getPersonGrants() {
  try {
    // Obtén todos los registros de PersonWithGrants
    const personGrants = await PersonWithGrants.find();

    // Mapea cada registro y obtén la información completa de Person y Grant
    const populatedPersonGrants = await Promise.all(
      personGrants.map(async (personGrant) => {
        const person = await Person.findById(personGrant.person);
        const grant = await Grant.findById(personGrant.grant);

        return {
          _id: personGrant._id,
          person: person,
          grant: grant,
        };
      })
    );

    return [populatedPersonGrants, null];
  } catch (error) {
    handleError(error, "personWithGrants.service -> getPersonGrants");
    return [null, error.message];
  }
}

module.exports = {
  getPersonGrants,
};
