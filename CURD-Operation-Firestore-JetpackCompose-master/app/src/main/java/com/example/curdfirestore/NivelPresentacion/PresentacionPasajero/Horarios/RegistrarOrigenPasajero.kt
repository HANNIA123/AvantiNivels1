package com.example.curdfirestore.NivelPresentacion.PresentacionPasajero.Horarios

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.ExperimentalComposeUiApi
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import androidx.navigation.compose.rememberNavController
import com.example.curdfirestore.R
import com.example.curdfirestore.NivelAplicacion.SearchBar
import com.example.curdfirestore.NivelAplicacion.searchPlaces
import com.example.curdfirestore.NivelPresentacion.PresentacionConductor.maxh
import com.example.curdfirestore.NivelAplicacion.HorarioData
import com.example.curdfirestore.NivelAplicacion.Pasajeros.GuardarHorario
import com.example.curdfirestore.NivelAplicacion.convertirStringALatLng
import com.google.android.gms.maps.model.BitmapDescriptorFactory
import com.google.android.gms.maps.model.CameraPosition
import com.google.android.gms.maps.model.LatLng
import com.google.android.libraries.places.api.model.Place
import com.google.maps.android.compose.GoogleMap
import com.google.maps.android.compose.Marker
import com.google.maps.android.compose.MarkerState
import com.google.maps.android.compose.rememberCameraPositionState
import com.google.maps.android.compose.rememberMarkerState
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
@OptIn(ExperimentalComposeUiApi::class)
@Composable
fun RegistrarOrigenPasajero(
    navController: NavController,
    userid:String,
    dia:String,
    horao:String,

    ) {
    BoxWithConstraints {
        maxh = this.maxHeight
    }

    var latitud by remember {
        mutableStateOf("")
    }
    var longitud by remember {
        mutableStateOf("")
    }

    var pasarlatitud by remember {
        mutableStateOf("")
    }
    var pasarlongitud by remember {
        mutableStateOf("")
    }
    var inicial by remember {
        mutableStateOf("si")
    }
    var valorMapa: String by remember { mutableStateOf("barra") } //El que regresa

    var TipoBusqueda: String by remember { mutableStateOf("barra") } //El que paso

    var ubiMarker  by remember { mutableStateOf("") }
    var ejecutado by remember { mutableStateOf(false) }
    var boton by remember { mutableStateOf(false) }
    var primeraVez by remember {
        mutableStateOf(0)
    }



    Column(
        modifier = Modifier
            .fillMaxWidth()
            .height(maxh)
    ) {

        Column(
            modifier = Modifier
                .fillMaxWidth()
        ) {



            Box(
                modifier = Modifier
                    .fillMaxWidth()
                //.height(maxh - 30.dp),
            ) {
println("Tipo de buqueda= $TipoBusqueda")
                println("Valor mapa $valorMapa")

                if(valorMapa=="barra") {
                    println("Ejecuacion numero $primeraVez")

                    var searchResults = remember { mutableStateOf(emptyList<Place>()) }
                    val context = LocalContext.current
                    var searchQuery = remember { mutableStateOf("") }
                    var selectedPlace by remember { mutableStateOf<Place?>(null) }


                    LaunchedEffect(searchQuery.value) {
                        // Lanzar un bloque coroutine para ejecutar la búsqueda de lugares
                        try {
                            val results = withContext(Dispatchers.IO) {
                                searchPlaces(searchQuery.value, context)
                            }

                            searchResults.value = results

                        } catch (e: Exception) {
                            // Manejar cualquier error que pueda ocurrir durante la búsqueda
                            e.printStackTrace()
                        }
                    }
                    println("YA cambiando a barra")
                    if (primeraVez == 0){
                    var miUbic = LatLng(19.389816, -99.110234)
                    var markerState = rememberMarkerState(position = miUbic)
                    var cameraPositionState = rememberCameraPositionState {
                        position = CameraPosition.fromLatLngZoom(markerState.position, 17f)
                    }

                    latitud = markerState.position.latitude.toString()
                    longitud = markerState.position.longitude.toString()

                    selectedPlace?.let { place ->
                        markerState = rememberMarkerState(
                            position = LatLng(
                                place.latLng.latitude,
                                place.latLng.longitude
                            )
                        )
                        pasarlatitud = place.latLng.latitude.toString()
                        pasarlongitud = place.latLng.longitude.toString()


                        cameraPositionState.position = CameraPosition.fromLatLngZoom(
                            LatLng(
                                place.latLng.latitude,
                                place.latLng.longitude
                            ), 17f
                        )
                    }
                    GoogleMap(
                        modifier = Modifier
                            .fillMaxSize(),
                        cameraPositionState = cameraPositionState
                    ) {

                        Marker(
                            state = markerState,
                            title = "Origen",
                            snippet = "Direccion",
                            icon = BitmapDescriptorFactory.fromResource(R.drawable.marcador),
                        )

                    }

                    } else {

//Para convertir string a coordenadas
                        var markerLat by remember { mutableStateOf(0.0) }
                        var markerLon by remember { mutableStateOf(0.0) }
                        val markerCoordenadasLatLng = convertirStringALatLng(ubiMarker)


                        if (markerCoordenadasLatLng != null) {
                            markerLat = markerCoordenadasLatLng.latitude
                            markerLon = markerCoordenadasLatLng.longitude
                            // Hacer algo con las coordenadas LatLng
                            println("Latitud: ${markerCoordenadasLatLng.latitude}, Longitud: ${markerCoordenadasLatLng.longitude}")
                        } else {
                            // La conversión falló
                            println("Error al convertir la cadena a LatLng")
                        }


                        var miUbic = LatLng(markerLat, markerLon)
                        var markerState = rememberMarkerState(position = miUbic)
                        var cameraPositionState = rememberCameraPositionState {
                            position = CameraPosition.fromLatLngZoom(markerState.position, 17f)
                        }

                        latitud = markerState.position.latitude.toString()
                        longitud = markerState.position.longitude.toString()

                        GoogleMap(
                            modifier = Modifier
                                .fillMaxSize(),
                            cameraPositionState = cameraPositionState
                        ) {

                            Marker(
                                state = markerState,
                                title = "Origen",
                                snippet = "Direccion",
                                icon = BitmapDescriptorFactory.fromResource(R.drawable.marcador),
                            )

                        }



                    }


                    val TextoBarra = "¿De dónde sales?"
                    Column(
                        modifier = Modifier

                            .align(Alignment.TopStart)
                            .fillMaxWidth()
                            .padding(12.dp),
                    ) {


                        SearchBar(searchQuery, searchResults.value, { newQuery ->
                            searchQuery.value = newQuery
                        }, { place ->
                            selectedPlace = place
                        },
                            onMapButtonClick = { valorRetornadoDelMapa ->
                                valorMapa = valorRetornadoDelMapa
                            },
                            TipoBusqueda,
                            TextoBarra
                        )

                        //TipoBusqueda = valorMapa
                    }

                }else{
                    println("YA cambiando a marker $pasarlatitud, $pasarlongitud")
                   ubiMarker= mapaMarker(ubicacionMarker ="$pasarlatitud,$pasarlongitud" )



                    TipoBusqueda="marker"

                }


                if (valorMapa == "barra"){

            }
                else{
                    //Boton para regresar a la barra
                    Column(
                        modifier = Modifier
                            .align(Alignment.TopStart)
                            .fillMaxWidth()
                            .padding(12.dp),
                    ) {

                        Row(
                            verticalAlignment = Alignment.Top,
                            modifier = Modifier
                                .fillMaxWidth()
                                .background(Color.White)
                                .border(
                                    1.dp,
                                    Color.LightGray
                                )
                                .padding(8.dp)
                                .clickable
                                {
                                    valorMapa = "barra"
                                    primeraVez = primeraVez + 1
                                    //var ubicacionMarkerDrag = "$latitud,$longitud"

                                    //navController.navigate(route = "registrar_destino_pasajero_return/$userid/$dia/$horao/$origen/$ubicacionMarkerDrag")
                                }
                        ) {
                            Icon(
                                imageVector = Icons.Filled.Search,
                                contentDescription = null,
                                tint = Color(104, 104, 104),
                                modifier = Modifier.padding(5.dp)

                            )

                            Text(
                                text = "Buscar por dirección",
                                style = TextStyle(
                                    color = Color(104, 104, 104),
                                    fontSize = 14.sp
                                ),
                                modifier = Modifier
                                    .align(Alignment.CenterVertically)
                            )

                        }


                    }

                }

                //Botones
                Column(  modifier = Modifier
                    .fillMaxWidth()

                    .offset(y = maxh - 130.dp),
                    horizontalAlignment = Alignment.Start
                )
                {

                    Column(
                        modifier= Modifier
                            .fillMaxWidth()
                            .padding(25.dp, 15.dp)

                    ) {
                        IconButton(
                            onClick = { navController.popBackStack() },
                            modifier = Modifier
                                .align(Alignment.Start)
                                .size(25.dp) // Tamaño del botón
                                .background(
                                    Color(137, 13, 88),
                                    shape = CircleShape
                                )

                        ) {
                            Icon(
                                modifier = Modifier
                                    .size(23.dp),
                                imageVector = Icons.Filled.ArrowBack,
                                contentDescription = "Icono atras",
                                tint = Color.White

                            )


                        }
                    }


                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(20.dp)
                        //.offset( y = maxh -80.dp)
                        ,
                        horizontalAlignment = Alignment.Start,
                    ) {

                        Button(
                            modifier = Modifier.fillMaxWidth(),
                            colors = ButtonDefaults.buttonColors(
                                containerColor = Color(137, 13, 88),
                            ),
                            onClick = {
                                var ubicacionF = "$pasarlatitud,$pasarlongitud"
                                boton = true
                                // navController.navigate(route = "registrar_destino_pasajero/$userid/$dia/$horao/$ubicacionF")
                                //  navController.navigate(route = "registrar_viajed_conductor/$userid/$dia/$horao/$horad/$ubicacionF")
                            }) {
                            Text(text = "Siguiente")
                        }
                    }


                }






            }




        }

    }

    if (boton==true && ejecutado==false){
        var ubicacion=""
        if(valorMapa=="barra"){
            ubicacion="$pasarlatitud,$pasarlongitud"
        }
        else{
            ubicacion=ubiMarker
        }
        /*val viajeData = ViajeData(
           viaje_origen = "$latitud,$longitud"
         )*/
       // val ubicacion="$pasarlatitud,$pasarlongitud"
        val destino="19.5114059,-99.1265259" //Coordenadas de UPIITA
        val horarioData = HorarioData(
            usu_id = userid,
            horario_dia = dia,
            horario_hora=horao,
            horario_destino=destino,
            horario_origen=ubicacion,
            horario_trayecto = "1",
            horario_solicitud = "No"
        )

        GuardarHorario(navController, userid, horarioData)
        //GuardarCoordenadas(navController, userid,viajeData)
        ejecutado=true
    }

}


@Composable
fun mapaMarker(ubicacionMarker:String):String{
    var latitud by remember {
        mutableStateOf("")
    }
    var longitud by remember {
        mutableStateOf("")
    }
    var markerLat by remember { mutableStateOf(0.0) }
    var markerLon by remember { mutableStateOf(0.0) }
    val markerCoordenadasLatLng = convertirStringALatLng(ubicacionMarker)
    if (markerCoordenadasLatLng != null) {
        markerLat = markerCoordenadasLatLng.latitude
        markerLon = markerCoordenadasLatLng.longitude
        // Hacer algo con las coordenadas LatLng
        println("Latitud: ${markerCoordenadasLatLng.latitude}, Longitud: ${markerCoordenadasLatLng.longitude}")
    } else {
        // La conversión falló
        println("Error al convertir la cadena a LatLng")
    }

    val miUbic = LatLng(markerLat, markerLon)
    var markerState = rememberMarkerState(position = miUbic)
    var cameraPositionState = rememberCameraPositionState {
        position = CameraPosition.fromLatLngZoom(markerState.position, 17f)
    }

    latitud = markerState.position.latitude.toString()
    longitud = markerState.position.longitude.toString()



    GoogleMap(
        modifier = Modifier
            .fillMaxSize(),
        cameraPositionState = cameraPositionState
    ) {
        Marker(
            title = "Origen",
            state = markerState,
            icon = BitmapDescriptorFactory.fromResource(R.drawable.marcador),
            snippet = "Punto de origen",
            draggable = true
        )
    }
return "$latitud,$longitud"
}
@OptIn(ExperimentalComposeUiApi::class)
@Preview(showBackground = true)
@Composable
fun RegistrarOrigenPasajeroPreview() {
    // Esta función se utiliza para la vista previa
    var correo="hplayasr1700@alumno.ipn.mx"
    val navController = rememberNavController()
    RegistrarOrigenPasajero(navController = navController, correo,
        dia="Lunes", horao="7:00")

}









