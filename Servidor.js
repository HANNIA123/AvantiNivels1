const express = require('express');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, getDoc, updateDoc,addDoc, getDocs,deleteDoc, where, query } = require('firebase/firestore');

const firebaseConfig = {
    // Tu configuración de Firebase aquí
    apiKey: "AIzaSyDSb9KMlW3DDNFtuIytiz3NEqVy8R7yBTE",
    authDomain: "avanti-c4ba7.firebaseapp.com",
    projectId: "avanti-c4ba7",
    storageBucket: "avanti-c4ba7.appspot.com",
    messagingSenderId: "361833868381",
    appId: "1:361833868381:web:7e6d65d13283ef957031b4",
    measurementId: "G-F9QSKG795F"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const server = express();
const port = 3000;

//Ruta para consultar una coleccion teniendo el id
server.get('/api/usuario/:id', async (req, res) => {
    // const usuarioId = "hplayasr1700@alumno.ipn.mx";
    const usuarioId = req.params.id;
    try {
        const usuarioRef = doc(db, 'usuario', usuarioId);
        const usuarioDoc = await getDoc(usuarioRef);
        if (usuarioDoc.exists()) {
            const usuarioData = usuarioDoc.data();
            // Enviar datos como respuesta en formato JSON
            res.json({
                usu_boleta: usuarioData.usu_boleta || '',
                usu_foto: usuarioData.usu_foto || '',
                usu_nombre: usuarioData.usu_nombre || '',
                usu_nombre_usuario: usuarioData.usu_nombre_usuario || '',
                usu_primer_apellido: usuarioData.usu_primer_apellido || '',
                usu_segundo_apellido: usuarioData.usu_segundo_apellido || '',
                usu_status: usuarioData.usu_status || '',
                usu_telefono: usuarioData.usu_telefono || '',
                usu_tipo: usuarioData.usu_tipo || '',
            });
        } else {
            res.status(404).json({ error: 'El usuario no existe' });
        }
    } catch (error) {
        console.error('Error al obtener documento desde Firestore:', error);
        res.status(500).json({ error: 'Error al obtener documento desde Firestore' });
    }
});

//Ruta para consultar una coleccion teniendo el id
server.get('/api/vehiculo/:id', async (req, res) => {

    const usuarioId = req.params.id;

    try {
        const usuarioRef = doc(db, 'vehículo', usuarioId);
        const usuarioDoc = await getDoc(usuarioRef);

        if (usuarioDoc.exists()) {
            const vehiculoData = usuarioDoc.data();

            // Enviar datos como respuesta en formato JSON
            res.json({
                vehi_color: vehiculoData.vehi_color || '',
                vehi_marca: vehiculoData.vehi_marca || '',
                vehi_modelo: vehiculoData.vehi_modelo || '',
                vehi_placas: vehiculoData.vehi_placas || '',
                vehi_poliza: vehiculoData.vehi_poliza || '',

            });
        } else {
            res.status(404).json({ error: 'El usuario no existe' });
        }
    } catch (error) {
        console.error('Error al obtener documento desde Firestore:', error);
        res.status(500).json({ error: 'Error al obtener documento desde Firestore' });
    }
});

//Agregado 22/11/2023 -Hannia
// Middleware para analizar el cuerpo de la solicitud como JSON
server.use(express.json());
// Ruta para registrar un viaje
server.post('/api/registrarviaje', async (req, res) => {
    try {
        const nuevoViaje = req.body; // Asumiendo que la solicitud POST contiene los datos del nuevo usuario

        // Agrega un viaje a la coleccion "viaje"
        const viajesCollection = collection(db, 'viaje');
        const docRef = await addDoc(viajesCollection, nuevoViaje);

        res.json({ message: 'Viaje agregado correctamente', userId: docRef.id});
        //res.json({ message: 'Usuario agregado correctamente', userId: docRef.id });
    } catch (error) {
        console.error('Error al agregar viaje a Firestore:', error);
        res.status(500).json({ success: false, message: 'Error al agregar viaje a Firestore' });
    }
});

//Para el pasajero 10/12/2023
server.use(express.json());
// Ruta para registrar un viaje
server.post('/api/registrarhorario', async (req, res) => {
    try {
        const nuevoViaje = req.body; // Asumiendo que la solicitud POST contiene los datos del nuevo usuario

        // Agrega un viaje a la coleccion "viaje"
        const viajesCollection = collection(db, 'horario');
        const docRef = await addDoc(viajesCollection, nuevoViaje);

        res.json({ message: 'viaje agregado correctamente', userId: docRef.id});
        //res.json({ message: 'Usuario agregado correctamente', userId: docRef.id });
    } catch (error) {
        console.error('Error al agregar viaje a Firestore:', error);
        res.status(500).json({ success: false, message: 'Error al agregar horario a Firestore' });
    }
});


//Agregado 22/11/2023 -Hannia
// Middleware para analizar el cuerpo de la solicitud como JSON
server.use(express.json());
// Ruta para registrar las paradas
server.post('/api/registrarparada', async (req, res) => {
    try {
        const nuevaParada = req.body; // Asumiendo que la solicitud POST contiene los datos del nuevo usuario

        // Agrega el nuevo usuario a la colección 'usuario' en Firestore
        const paradasCollection = collection(db, 'parada');
        const docRef = await addDoc(paradasCollection, nuevaParada);

        res.json({ message: 'Parada agregado correctamente', userId: docRef.id});
        //res.json({ message: 'Usuario agregado correctamente', userId: docRef.id });
    } catch (error) {
        console.error('Error al agregar viaje a Firestore:', error);
        res.status(500).json({ success: false, message: 'Error al agregar viaje a Firestore' });
    }
});

//Agregado 02/12/2023 -- modificado 10/12/2023

//Ruta para consultar una coleccion teniendo el id
server.get('/api/viaje/:id', async (req, res) => {
    // const usuarioId = "hplayasr1700@alumno.ipn.mx";
    const viajeId = req.params.id;

    try {
        const viajeRef = doc(db, 'viaje', viajeId);
        const viajeDoc = await getDoc(viajeRef);

        if (viajeDoc.exists()) {
            const viajeData = viajeDoc.data();

            // Enviar datos como respuesta en formato JSON
            res.json({
                viaje_id:viajeData.viaje_id || '',
                usu_id: viajeData.usu_id || '',
                viaje_destino: viajeData.viaje_destino || '',
                viaje_origen: viajeData.viaje_origen || '',
                viaje_hora_llegada: viajeData.viaje_hora_llegada || '',
                viaje_hora_partida: viajeData.viaje_hora_partida || '',
                viaje_dia: viajeData.viaje_dia || '',
                viaje_trayecto: viajeData.viaje_trayecto || '',
                viaje_status: viajeData.viaje_status || '',
                viaje_num_lugares: viajeData.viaje_num_lugares || '',

            });
        } else {
            res.status(404).json({ error: 'El id del viaje no existe' });
        }
    } catch (error) {
        console.error('Error al obtener documento desde Firestore:', error);
        res.status(500).json({ error: 'Error al obtener documento desde Firestore' });
    }
});





//02/12/2023
server.get('/api/paradas/:id', async (req, res) => {
    const viajeId = req.params.id;

    try {
        // Assuming 'viajes' is your collection name
        const paradasRef = collection(db, 'parada');
        const paradasQuery = query(paradasRef, where('viaje_id', '==', viajeId));
        const paradasSnapshot = await getDocs(paradasQuery);

        if (paradasSnapshot.docs.length > 0) {
            // Map the documents to an array of JSON objects
            const paradasData = paradasSnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    par_id: doc.id, // Agregar el I
                    viaje_id: data.viaje_id || '',
                    par_hora: data.par_hora || '',
                    par_nombre: data.par_nombre || '',
                    par_ubicacion: data.par_ubicacion || '',
                    user_id: data.user_id || ''

                };
            });

            // Send the array of JSON objects as a response
            res.json(paradasData);
        } else {
            res.status(404).json({ error: 'No se encontraron paradas para el viaje' });
        }
    } catch (error) {
        console.error('Error al obtener documentos desde Firestore:', error);
        res.status(500).json({ error: 'Error al obtener documentos desde Firestore' });
    }
});



//02/12/2023 Obtener todos los viajes de un condcutor
server.get('/api/itinerarioviajes/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        // Assuming 'viajes' is your collection name
        const viajesRef = collection(db, 'viaje');
        const viajesQuery = query(viajesRef, where('usu_id', '==', userId));
        const viajesSnapshot = await getDocs(viajesQuery);

        if (viajesSnapshot.docs.length > 0) {
            // Map the documents to an array of JSON objects
            const viajesData = viajesSnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    viaje_id: doc.id, // Agregar el I
                    viaje_destino: data.viaje_destino || '',
                    viaje_origen: data.viaje_origen || '',
                    viaje_hora_llegada: data.viaje_hora_llegada || '',
                    viaje_hora_partida: data.viaje_hora_partida || '',
                    viaje_dia: data.viaje_dia || '',
                    viaje_trayecto:data.viaje_trayecto || '',
                    viaje_status: data.viaje_status || '',
                    viaje_num_lugares: data.viaje_num_lugares || '',


                };
            });

            // Send the array of JSON objects as a response
            res.json(viajesData);
        } else {
            res.status(404).json({ error: 'No se encontraron paradas para el viaje' });
        }
    } catch (error) {
        console.error('Error al obtener documentos desde Firestore:', error);
        res.status(500).json({ error: 'Error al obtener documentos desde Firestore' });
    }
});


//Agregado 10/12/2023 -- obtener los viajes para el pasajero
server.get('/api/busquedaviajes/:id', async (req, res) => {
    const horarioId = req.params.id;
     console.log(horarioId)
    try {
        const horarioRef = doc(db, 'horario', horarioId);
        const horarioDoc = await getDoc(horarioRef);
        if (horarioDoc.exists()) {
            const horarioData = horarioDoc.data();
            // Guardar los datos en una variable
            const DatosHorario = {
                horario_trayecto: horarioData.horario_trayecto || '',
                horario_dia: horarioData.horario_dia || '',
                horario_hora: horarioData.horario_hora || '',
                horario_destino: horarioData.horario_destino || '',
                horario_origen: horarioData.horario_origen || '',
                usu_id: horarioData.usu_id || '',
                horario_solicitud:  horarioData.horario_solicitud || '',
            };
console.log(DatosHorario)
            try {
                // Assuming 'viajes' is your collection name
                let horarioComparar
                if (DatosHorario.horario_trayecto==='0'){
                    horarioComparar='viaje_hora_partida'
                }
                else{
                    horarioComparar='viaje_hora_llegada'

                }
                const viajesRef = collection(db, 'viaje');
                const viajesQuery = query(viajesRef, where('viaje_trayecto', '==',
                        DatosHorario.horario_trayecto),
                    //where(horarioComparar, '==', DatosHorario.horario_hora),
                    where('viaje_dia', '==', DatosHorario.horario_dia),
                    );
                const viajesSnapshot = await getDocs(viajesQuery);

                if (viajesSnapshot.docs.length > 0) {
                    // Map the documents to an array of JSON objects
                    const viajesData = viajesSnapshot.docs.map(doc => {
                        const data = doc.data();
                        return {
                            viaje_id: doc.id, // Agregar el Id
                            viaje_destino: data.viaje_destino || '',
                            viaje_origen: data.viaje_origen || '',
                            viaje_hora_llegada: data.viaje_hora_llegada || '',
                            viaje_hora_partida: data.viaje_hora_partida || '',
                            viaje_dia: data.viaje_dia || '',
                            viaje_trayecto: data.viaje_trayecto || '',
                            viaje_num_lugares: data.viaje_num_lugares || '',
                            viaje_status: data.viaje_status || '',
                            usu_id: data.usu_id || '',

                        };
                    });

                    // Send the array of JSON objects as a response
                    console.log("Prueba del viaje: ", viajesData)
                    res.json(viajesData);
                } else {

                    res.status(404).json({ error: 'No se encontraron paradas para el viaje' });
                }
            } catch (error) {
                console.error('Error al obtener documentos desde Firestore:', error);
                res.status(500).json({ error: 'Error al obtener documentos desde Firestore' });
            }


        } else {
            res.status(404).json({ error: 'El id del viaje no existe' });
        }
    } catch (error) {
        console.error('Error al obtener documento desde Firestore:', error);
        res.status(500).json({ error: 'Error al obtener documento desde Firestore' });
    }





});


//Para buscar paradas que coincidan con un viaje del pasajero 10/12/2023
server.get('/api/busquedaparadas/:id', async (req, res) => {
    const listaViajeIds = req.params.id.split(',');

    try {
        // Assuming 'paradas' is your collection name
        const paradasRef = collection(db, 'parada');
        const paradasQuery = query(paradasRef, where('viaje_id', 'in', listaViajeIds));
        const paradasSnapshot = await getDocs(paradasQuery);

        if (paradasSnapshot.docs.length > 0) {
            // Map the documents to an array of JSON objects
            const paradasData = paradasSnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    par_id: doc.id, // Agregar el I
                    viaje_id: data.viaje_id || '',
                    par_hora: data.par_hora || '',
                    par_nombre: data.par_nombre || '',
                    par_ubicacion: data.par_ubicacion || '',
                    user_id: data.user_id || '',
                };
            });

            // Send the array of JSON objects as a response
            res.json(paradasData);
            console.log("Prueba de parasas: ", paradasData)
        } else {
            res.status(404).json({ error: 'No se encontraron paradas para los viajes proporcionados' });
        }
    } catch (error) {
        console.error('Error al obtener documentos desde Firestore:', error);
        res.status(500).json({ error: 'Error al obtener documentos desde Firestore' });
    }
});



//Obtener datos del horario del pasajero
//Ruta para consultar una coleccion teniendo el id
server.get('/api/horario/:id', async (req, res) => {
    // const usuarioId = "hplayasr1700@alumno.ipn.mx";
    const viajeId = req.params.id;

    try {
        const viajeRef = doc(db, 'horario', viajeId);
        const viajeDoc = await getDoc(viajeRef);

        if (viajeDoc.exists()) {
            const horarioData = viajeDoc.data();

            // Enviar datos como respuesta en formato JSON
            res.json({
                horario_trayecto: horarioData.horario_trayecto || '',
                horario_dia: horarioData.horario_dia || '',
                horario_hora: horarioData.horario_hora || '',
                horario_destino: horarioData.horario_destino || '',
                horario_origen: horarioData.horario_origen || '',
                usu_id: horarioData.usu_id || '',
                horario_solicitud: horarioData.horario_solicitud || '',

            });
            console.log("finalemente")
        } else {
            res.status(404).json({ error: 'El id del viaje no existe' });
        }
    } catch (error) {
        console.error('Error al obtener documento desde Firestore:', error);
        res.status(500).json({ error: 'Error al obtener documento desde Firestore' });
    }
});



// Middleware para analizar el cuerpo de la solicitud como JSON
server.use(express.json());
// Ruta para registrar un viaje
server.post('/api/registrarsolicitud', async (req, res) => {
    try {
        const nuevoViaje = req.body; // Asumiendo que la solicitud POST contiene los datos del nuevo usuario

        // Agrega un viaje a la coleccion "viaje"
        const viajesCollection = collection(db, 'solicitud');
        const docRef = await addDoc(viajesCollection, nuevoViaje);

        res.json({ message: 'Solicitud agregado correctamente', userId: docRef.id});
        //res.json({ message: 'Usuario agregado correctamente', userId: docRef.id });
    } catch (error) {
        console.error('Error al agregar solicitud a Firestore:', error);
        res.status(500).json({ success: false, message: 'Error al agregar solicitud a Firestore' });
    }
});


//Buscar solicitudes que coincida con un pasajero, de acuerdo a su id del viaje y que sea "Aceptada"
//17/12/2023

server.get('/api/consultasolicitudes/:iduser/:idhorario/:status', async (req, res) => {
    const horarioId = req.params.idhorario;
    const status = req.params.status;
    const userId = req.params.iduser;

console.log("Que llega", horarioId, status, userId)
    try {
        // Assuming 'viajes' is your collection name
        const viajesRef = collection(db, 'solicitud');
        const viajesQuery = query(viajesRef, where('pasajero_id', '==', userId),
            where('horario_id', '==', horarioId),  where('solicitud_status', '==', status)
            );
        const viajesSnapshot = await getDocs(viajesQuery);


        if (viajesSnapshot.docs.length > 0) {
            // Map the documents to an array of JSON objects
            const viajesData = viajesSnapshot.docs.map(doc => {
                const data = doc.data();
                return {

                    solicitud_id:     doc.id, // Agregar el Id
                    conductor_id: data.conductor_id || '',
                    horario_id: data.horario_id || '',
                    horario_trayecto: data.horario_trayecto || '',
                    parada_id: data.parada_id || '',
                    pasajero_id:data.pasajero_id || '',
                    solicitud_date:data.solicitud_date || '',
                    solicitud_status:data.solicitud_status || '',
                    viaje_id:data.viaje_id || '',

                };
            });

            // Send the array of JSON objects as a response
            res.json(viajesData);
        } else {
            res.status(404).json({ error: 'No se encontraron paradas para el viaje' });
        }
    } catch (error) {
        console.error('Error al obtener documentos desde Firestore:', error);
        res.status(500).json({ error: 'Error al obtener documentos desde Firestore' });
    }
});

/*Consultar un viaje, teniendo el id  19/12/2023 ------------------------------------------------------------*/


/*-------------------------------------------------------------------*/








// Middleware para analizar el cuerpo de la solicitud como JSON
server.use(express.json());
// Ruta para agregar un nuevo usuario
server.post('/api/usuario', async (req, res) => {
    try {
        const nuevoUsuario = req.body; // Asumiendo que la solicitud POST contiene los datos del nuevo usuario

        // Agrega el nuevo usuario a la colección 'usuario' en Firestore
        const usuariosCollection = collection(db, 'viaje');
        const docRef = await addDoc(usuariosCollection, nuevoUsuario);

        res.json({ mensaje: 'Usuario agregado correctamente'});
        //res.json({ message: 'Usuario agregado correctamente', userId: docRef.id });
    } catch (error) {
        console.error('Error al agregar usuario a Firestore:', error);
        res.status(500).json({ success: false, message: 'Error al agregar usuario a Firestore' });
    }
});


//Ruta para obtener el itinerario del pasajero
server.get('/api/itinerarioviajespasajero/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        // Assuming 'viajes' is your collection name
        const viajesRef = collection(db, 'horario');
        const viajesQuery = query(viajesRef, where('usu_id', '==', userId));
        const viajesSnapshot = await getDocs(viajesQuery);

        if (viajesSnapshot.docs.length > 0) {
            // Map the documents to an array of JSON objects
            const viajesData = viajesSnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    horario_id: doc.id, // Agregar el I
                    horario_destino: data.horario_destino || '',
                    horario_origen: data.horario_origen || '',
                    horario_hora: data.horario_hora || '',
                    horario_dia: data.horario_dia || '',
                    horario_trayecto:data.horario_trayecto || '',
                    horario_solicitud:data.horario_solicitud || '',

                };
            });

            // Send the array of JSON objects as a response
            res.json(viajesData);
        } else {
            res.status(404).json({ error: 'No se encontraron paradas para el viaje' });
        }
    } catch (error) {
        console.error('Error al obtener documentos desde Firestore:', error);
        res.status(500).json({ error: 'Error al obtener documentos desde Firestore' });
    }
});





//Buscar el id en solicitudes 15/12/2023
server.get('/api/solicitudesconductor/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        // Assuming 'viajes' is your collection name
        const viajesRef = collection(db, 'solicitud');
        const viajesQuery = query(viajesRef, where('conductor_id', '==', userId));
        const viajesSnapshot = await getDocs(viajesQuery);

        if (viajesSnapshot.docs.length > 0) {
            // Map the documents to an array of JSON objects
            const viajesData = viajesSnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    solicitud_id:     doc.id, // Agregar el Id
                  conductor_id: data.conductor_id || '',
                    horario_id: data.horario_id || '',
                    horario_trayecto: data.horario_trayecto || '',
                    parada_id: data.parada_id || '',
                    pasajero_id:data.pasajero_id || '',
                    solicitud_date:data.solicitud_date || '',
                    solicitud_status:data.solicitud_status || '',
                    viaje_id:data.viaje_id || '',
                };
            });

            // Send the array of JSON objects as a response
            res.json(viajesData);
        } else {
            res.status(404).json({ error: 'No se encontraron paradas para el viaje' });
        }
    } catch (error) {
        console.error('Error al obtener documentos desde Firestore:', error);
        res.status(500).json({ error: 'Error al obtener documentos desde Firestore' });
    }
});


//Ruta para consultar la parada, de acuerdo a su id
server.get('/api/obtenerparada/:id', async (req, res) => {
    // const usuarioId = "hplayasr1700@alumno.ipn.mx";
    const paradaId = req.params.id;
    try {
        const paradaRef = doc(db, 'parada', paradaId);
        const paradaDoc = await getDoc(paradaRef);
        if (paradaDoc.exists()) {
            const data = paradaDoc.data();
            // Enviar datos como respuesta en formato JSON
            res.json({
                par_id: doc.id, // Agregar el I
                viaje_id: data.viaje_id || '',
                par_hora: data.par_hora || '',
                par_nombre: data.par_nombre || '',
                par_ubicacion: data.par_ubicacion || '',
                user_id: data.user_id || '',

            });
        } else {
            res.status(404).json({ error: 'La parada no existe' });
        }
    } catch (error) {
        console.error('Error al obtener documento desde Firestore:', error);
        res.status(500).json({ error: 'Error al obtener documento desde Firestore' });
    }
});

//Aceptar
// Ruta para modificar el status de una parada
server.put('/api/modificarstatussolicitud/:id/:status', async (req, res) => {
    const paradaId = req.params.id;
    const nuevoStatus = req.params.status;

    try {
        const paradaRef = doc(db, 'solicitud', paradaId);
        const paradaDoc = await getDoc(paradaRef);

        if (paradaDoc.exists()) {
            // Modificar solo el campo status de la parada
            await updateDoc(paradaRef, { solicitud_status: nuevoStatus });
 console.log("Solicitud modificada ")
            res.json({ message: 'Estado de la parada modificado correctamente' });
        } else {
            res.status(404).json({ error: 'La parada no existe' });
        }
    } catch (error) {
        console.error('Error al modificar el estado de la parada en Firestore:', error);
        res.status(500).json({ error: 'Error al modificar el estado de la parada en Firestore' });
    }
});




//---------modificar solicitud en el horario del pasajero------
server.put('/api/modificarsolicitudhorario/:id/:status', async (req, res) => {
    const horarioId = req.params.id;
    const nuevoStatus = req.params.status;

    try {
        const paradaRef = doc(db, 'horario', horarioId);
        const paradaDoc = await getDoc(paradaRef);

        if (paradaDoc.exists()) {
            // Modificar solo el campo status de la parada
            await updateDoc(paradaRef, { horario_solicitud: nuevoStatus });
            console.log("Solicitud en horario modificada ")
            res.json({ message: 'Estado de la solicitud modificado correctamente' });
        } else {
            res.status(404).json({ error: 'La parada no existe' });
        }
    } catch (error) {
        console.error('Error al modificar el estado de la solicitud en Firestore:', error);
        res.status(500).json({ error: 'Error al modificar el estado de la solicitud en Firestore' });
    }
});




//---------------Agregados despues de subir al git Hannia-----------------------
//Obtener los datos de la solicitu de acuerdo con un id de parada
server.get('/api/solicitudesparada/:id', async (req, res) => {
    const paradaId = req.params.id;

    try {
        // Assuming 'viajes' is your collection name
        const viajesRef = collection(db, 'solicitud');
        const viajesQuery = query(viajesRef, where('parada_id', '==', paradaId));
        const viajesSnapshot = await getDocs(viajesQuery);

        if (viajesSnapshot.docs.length > 0) {
            // Map the documents to an array of JSON objects
            const viajesData = viajesSnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    solicitud_id:     doc.id, // Agregar el Id
                    conductor_id: data.conductor_id || '',
                    horario_id: data.horario_id || '',
                    horario_trayecto: data.horario_trayecto || '',
                    parada_id: data.parada_id || '',
                    pasajero_id:data.pasajero_id || '',
                    solicitud_date:data.solicitud_date || '',
                    solicitud_status:data.solicitud_status || '',
                    viaje_id:data.viaje_id || '',
                };
            });

            // Send the array of JSON objects as a response
            res.json(viajesData);
        } else {
            res.status(404).json({ error: 'No se encontraron paradas para el viaje' });
        }
    } catch (error) {
        console.error('Error al obtener documentos desde Firestore:', error);
        res.status(500).json({ error: 'Error al obtener documentos desde Firestore' });
    }
});














//////////////////
//Modificar datos
// Ruta para modificar un usuario
server.put('/api/usuario/:id', async (req, res) => {
    try {
        const usuarioId = req.params.id;
        const datosModificados = req.body;

        // Obtén una referencia al documento del usuario en Firestore
        const usuarioRef = doc(db, 'viaje', usuarioId);

        // Verifica si el usuario existe
        const usuarioDoc = await getDoc(usuarioRef);
        if (!usuarioDoc.exists()) {
            return res.status(404).json({ error: 'El id del viaje no existe' });
        }

        // Modifica los datos del usuario en Firestore
        await updateDoc(usuarioRef, datosModificados);

        res.json({ success: true, message: 'Usuario modificado correctamente', userId: usuarioId });
    } catch (error) {
        console.error('Error al modificar usuario en Firestore:', error);

        res.status(500).json({ success: false, message: 'Error al modificar usuario en Firestore' });
    }
});


//--------------------------------------
//REGISTRAR REPORTES
server.use(express.json());
server.post('/api/registrarreporte', async (req, res) => {
    try {
        const reporte = req.body; // Asumiendo que la solicitud POST contiene los datos del nuevo usuario

        // Agrega un viaje a la coleccion "viaje"
        const reporteCollection = collection(db, 'reporte');
        const docRef = await addDoc(reporteCollection, reporte);

        res.json({ message: 'Reporte agregado correctamente', userId: docRef.id});

    } catch (error) {
        console.error('Error al agregar reporte a Firestore:', error);
        res.status(500).json({ success: false, message: 'Error al agregar reporte a Firestore' });
    }
});


//REGISTRAR IMPREVISTO
server.use(express.json());
server.post('/api/registrarimprevisto', async (req, res) => {
    try {
        const imprevisto = req.body; // Asumiendo que la solicitud POST contiene los datos del nuevo usuario

        // Agrega un viaje a la coleccion "viaje"
        const imprevistoCollection = collection(db, 'imprevisto');
        const docRef = await addDoc(imprevistoCollection, imprevisto);

        res.json({ message: 'Imprevisto agregado correctamente', userId: docRef.id});

    } catch (error) {
        console.error('Error al agregar el imprevisto a Firestore:', error);
        res.status(500).json({ success: false, message: 'Error al agregar el imprevisto a Firestore' });
    }
});







server.listen(port, () => {
    console.log(`Servidor Node.js escuchando en http://localhost:${port}`);
});
