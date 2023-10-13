import Person from "../../models/person.model.js";

// <----------------------------- CREATE PERSON ----------------------------->
export const createPerson = async (req, res) => {
  //  Extracting data from request body
  const {
    name,
    surname,
    rut,
    gender,
    birthdate,
    address,
    phone,
    email,
    password,
    role,
    bankAccount,
  } = req.body;

  // Create a new person object with the data from the request
  const newPerson = new Person({
    name,       //required
    surname,    //required
    rut,        //required and *unique*
    gender,     //required
    birthdate,  //required
    address,    //required
    phone,      //required
    email,      //required and *unique*
    password,   //required
    role,       //required
    bankAccount, // not required
  });

  // Rut validation (Pending)

  // Email validation (Pending)

  // Saving the new person in the database
    const personSaved = await newPerson.save();
  // code 201 is for created
    res.status(201).json(personSaved);
};
// <----------------------------- GET PEOPLE ----------------------------->
export const getPersons = async (req, res) => {
  // Getting all the persons from the database
  const persons = await Person.find();
  // code 200 is for ok
  res.status(200).json(persons);
};

// <----------------------------- GET PERSON BY ID ----------------------------->
export const getPersonById = async (req, res) => {
  //  Extracting data from request params
  const person = await Person.findById(req.params.personId);
  // code 200 is for ok
  res.status(200).json(person);
};

// <----------------------------- UPDATE PERSON BY ID ----------------------------->
export const updatePersonById = async (req, res) => {
  // Updating the person with the data from the request params(id) and body values
  const updatedPerson = await Person.findByIdAndUpdate(
    req.params.personId,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedPerson);
};

// <----------------------------- DELETE PERSON BY ID ----------------------------->
export const deletePersonById = async (req, res) => {
  // Deleting the person with the data from the request params(id)
  const { personId } = req.params;
  await Person.findByIdAndDelete(personId);
  // code 204 is for a successful delete and no content to return
  return res.status(204).json();
};
