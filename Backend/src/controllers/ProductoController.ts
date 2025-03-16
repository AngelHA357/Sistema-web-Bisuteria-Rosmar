

async function getAll() {
    console.log("Obteniendo todos los productos");
    return "Obteniendo todos los productos";
};

async function getById(id: number) {
  console.log("Obteniendo producto por id");
};

export  {
    getAll,
    getById

};