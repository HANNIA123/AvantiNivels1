package com.example.curdfirestore
/*
import android.app.Activity
import android.content.Context
import android.content.pm.PackageManager

import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material.Button
import androidx.compose.material.MaterialTheme
import androidx.compose.material.SnackbarHostState
import androidx.compose.material.Surface
import androidx.compose.material.Text
import androidx.compose.material.TopAppBar
import androidx.compose.material.rememberScaffoldState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberUpdatedState
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.viewinterop.AndroidView
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.example.curdfirestore.Manifest
import com.google.accompanist.permissions.ExperimentalPermissionsApi
import com.google.accompanist.permissions.PermissionState
import com.google.accompanist.permissions.rememberPermissionState
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationServices
import com.google.android.gms.maps.MapView
import android.Manifest.permission.ACCESS_FINE_LOCATION
import android.annotation.SuppressLint
import android.os.Looper
import androidx.compose.material.Scaffold

import com.google.android.gms.location.LocationRequest
import android.location.Location
import com.google.android.gms.location.LocationCallback
import com.google.android.gms.location.LocationResult


@OptIn(ExperimentalPermissionsApi::class)
@Composable
fun ObtenerUbicacion() {
    var ubicacion by remember { mutableStateOf("Ubicación no disponible") }
    var permiso by remember { mutableStateOf(true) }

    val context = LocalContext.current
    val fusedLocationClient = remember { LocationServices.getFusedLocationProviderClient(context) }

    val permissionState = rememberPermissionState(Manifest.permission.ACCESS_FINE_LOCATION)
    val scaffoldState = rememberScaffoldState()

    DisposableEffect(context) {
        if (permissionState.hasPermission) {
            obtenerUbicacionActual(fusedLocationClient) { location ->
                ubicacion = "Latitud: ${location.latitude}, Longitud: ${location.longitude}"
            }
        } else if (permissionState.shouldShowRationale) {
            permiso=false

        }
        onDispose { }

    }

    Column {
        Text(text = "Ubicación actual:")
        Text(text = ubicacion, style = MaterialTheme.typography.body1)
    }
    if(permiso==false){
        LaunchedEffect(scaffoldState) {
            scaffoldState.snackbarHostState.showSnackbar("La ubicación es necesaria para la aplicación.")
        }
    }

}

@OptIn(ExperimentalPermissionsApi::class)
@Composable
fun LocationPermissionRequester(
    onPermissionDenied: () -> Unit,
    onPermissionGranted: () -> Unit
) {
    val context = LocalContext.current
    val permissionState = rememberPermissionState(
        ACCESS_FINE_LOCATION
    )

    DisposableEffect(context) {
        if (permissionState.hasPermission) {
            onPermissionGranted()
        } else if (permissionState.shouldShowRationale) {
            onPermissionDenied()
        }
        onDispose { }
    }
}

@SuppressLint("UnusedMaterialScaffoldPaddingParameter")
@Composable
fun LocationPermissionDemoScreen() {
    val scaffoldState = rememberScaffoldState()
    var permiso by remember { mutableStateOf(true) }

    Scaffold(
        scaffoldState = scaffoldState
    ) {
        LocationPermissionRequester(
            onPermissionDenied = {
                permiso=false

            },
            onPermissionGranted = {
                permiso=true
            }
        )
    }
    if(permiso==false){
        LaunchedEffect(scaffoldState) {
            scaffoldState.snackbarHostState.showSnackbar("La ubicación es necesaria para la aplicación.")
        }
    }
    else{
        ObtenerUbicacion()
    }
}

@SuppressLint("MissingPermission")
fun obtenerUbicacionActual(
    fusedLocationClient: FusedLocationProviderClient,
    onLocationResult: (Location) -> Unit
) {
    val locationRequest = LocationRequest.create()
        .setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY)
        .setInterval(1000)
        .setFastestInterval(500)

    val locationCallback = object : LocationCallback() {
        override fun onLocationResult(locationResult: LocationResult?) {
            locationResult?.lastLocation?.let { location ->
                onLocationResult(location)
                fusedLocationClient.removeLocationUpdates(this)
            }
        }
    }

    fusedLocationClient.requestLocationUpdates(
        locationRequest,
        locationCallback,
        Looper.getMainLooper()
    )
}

 */