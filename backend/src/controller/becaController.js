import Beca from "../../models/beca.js";

async function createBeca(req,res){
    const{
        nombre, requisitos,
        documentos, monto,
        estado
    } = req.dody
    const newBeca = new Beca ({
        nombre, requisitos,
        documentos, monto,
        estado
    })
    const becaSaved=await newBeca.save()
    res.status(201).send(becaSaved)
}

async function deleteBeca(req,res){
    const { becaDel }  = req.params;
    await Beca.findByIdAndDelete(becaDel);
    return res.status(200).send
}

async function updateBeca(req,res){
    const becaMod = await Users.findByIdAndUpdate(req.params.becaMod, req.body);
    res.status(200).send(becaMod)
}

async function getBeca(req,res){
    const becaGet = await Users.findById(req.params.becaGet)
    res.status(200).send(becaGet)
}

module.export = {
    createBeca,
    deleteBeca,
    updateBeca,
    getBeca,
};


//Actualizar pendiente