import React, { useRef, useState, useEffect } from 'react';
import { Button, Stack, Typography, Paper, Box } from '@mui/material';

const mockUser = {
    nombre: 'Juan Pérez',
    puesto: 'Docente',
    horario: '08:00 - 14:00',
};

const Asistencias = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [showCamera, setShowCamera] = useState(false);
    const [method, setMethod] = useState<'rostro' | 'qr' | null>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);

    // Formatea la hora a 12 horas con AM/PM
    const getHora12 = () => {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // el 0 debe ser 12
        const minStr = minutes < 10 ? `0${minutes}` : minutes;
        return `${hours}:${minStr} ${ampm}`;
    };

    const getFecha = () => {
        const now = new Date();
        return now.toLocaleDateString();
    };

    // Activa la cámara cuando showCamera es true y la apaga automáticamente después de 10 segundos
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        if (showCamera && videoRef.current && !stream) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(mediaStream => {
                    setStream(mediaStream);
                    if (videoRef.current) {
                        videoRef.current.srcObject = mediaStream;
                        videoRef.current.play();
                    }
                    // Apaga la cámara automáticamente después de 10 segundos
                    timeoutId = setTimeout(() => {
                        setShowCamera(false);
                        setMethod(null);
                    }, 10000);
                })
                .catch(() => {
                    alert('No se pudo acceder a la cámara');
                    setShowCamera(false);
                    setMethod(null);
                });
        }
        // Limpiar la cámara al desmontar o cerrar
        return () => {
            if (timeoutId) clearTimeout(timeoutId);
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
                if (videoRef.current) videoRef.current.srcObject = null;
                setStream(null);
            }
        };
        // eslint-disable-next-line
    }, [showCamera]);

    const handleOpenCamera = (tipo: 'rostro' | 'qr') => {
        setMethod(tipo);
        setShowCamera(true);
    };

    const handleCloseCamera = () => {
        setShowCamera(false);
        setMethod(null);
    };

    return (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 400, margin: '40px auto' }}>
            <Typography variant="h4" gutterBottom>
                Asistencia
            </Typography>
            {/* Mostrar datos del usuario siempre */}
            <Box mb={3}>
                <Typography variant="subtitle1"><b>Nombre:</b> {mockUser.nombre}</Typography>
                <Typography variant="subtitle1"><b>Puesto:</b> {mockUser.puesto}</Typography>
                <Typography variant="subtitle1"><b>Horario:</b> {mockUser.horario}</Typography>
            </Box>
            {!showCamera ? (
                <>
                    <Typography variant="subtitle1" gutterBottom>
                        Selecciona el método de registro:
                    </Typography>
                    <Stack spacing={2} direction="column" alignItems="center">
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={() => handleOpenCamera('rostro')}
                        >
                            Registro de Rostro
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            onClick={() => handleOpenCamera('qr')}
                        >
                            Registro mediante QR
                        </Button>
                    </Stack>
                </>
            ) : (
                <Box>
                    <video ref={videoRef} width="100%" autoPlay style={{ borderRadius: 8 }} />
                    <Box mt={2}>
                        <Typography variant="subtitle1"><b>Fecha:</b> {getFecha()}</Typography>
                        <Typography variant="subtitle1"><b>Hora:</b> {getHora12()}</Typography>
                        <Typography variant="subtitle2" color="text.secondary" mt={2}>
                            {method === 'rostro'
                                ? 'Modo: Registro de Rostro'
                                : 'Modo: Registro mediante QR'}
                        </Typography>
                        <Typography variant="caption" color="error" display="block" mt={1}>
                            La cámara se apagará automáticamente en 10 segundos.
                        </Typography>
                        <Button
                            variant="contained"
                            color="error"
                            fullWidth
                            sx={{ mt: 2 }}
                            onClick={handleCloseCamera}
                        >
                            Cerrar cámara
                        </Button>
                    </Box>
                </Box>
            )}
        </Paper>
    );
};

export default Asistencias;