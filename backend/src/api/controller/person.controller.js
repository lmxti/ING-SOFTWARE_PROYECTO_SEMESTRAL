import Person from "../../models/person.model.js";

// CRUD BASICO PARA PERSONAS


// Crear una persona
export const createPerson = async (req, res) => { 
  // Extraccion de datos del body
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

  // Creacion de objeto persona
    const newPerson = new Person({
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
    });
    // Guardado de objeto persona en la base de datos
    const personSaved = await newPerson.save();
    res.status(201).json(personSaved);
};

export const getPersons = async (req, res) => {
    const persons = await Person.find();
    res.status(201).json(persons);
  };


// READ BY ID
export const getPersonById = async (req, res) => {
  const person = await Person.findById(req.params.personId);
  res.status(200).json(person);
};

// UPDATE
export const updatePersonById = async (req, res) => {
  const updatedPerson = await Person.findByIdAndUpdate(
    req.params.personId,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedPerson);
};

// DELETE
export const deletePersonById = async (req, res) => {
  const { personId } = req.params;
  await Person.findByIdAndDelete(personId);
  res.status(204).json(`Se ha eliminado a la persona con id: ${personId}`);
};
