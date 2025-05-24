import React, { useRef, useState, useEffect } from 'react';
import { Button, Stack, Typography, Paper, Box } from '@mui/material';
import './Asistencias.css';

const mockUser = {
    horario: '08:00 AM - 02:00 PM',
};

const Asistencias = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [showCamera, setShowCamera] = useState(false);
    const [method, setMethod] = useState<'rostro' | 'qr' | null>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const streamRef = useRef<MediaStream | null>(null); // Referencia para el stream
    const [secondsLeft, setSecondsLeft] = useState(10);

    // Mantén streamRef actualizado
    useEffect(() => {
        streamRef.current = stream;
    }, [stream]);

    // Función para apagar la cámara inmediatamente
    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            if (videoRef.current) videoRef.current.srcObject = null;
            setStream(null);
            streamRef.current = null;
        }
    };

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

    // Maneja el temporizador de apagado automático y la cuenta regresiva
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        let intervalId: NodeJS.Timeout;

        if (showCamera && videoRef.current && !stream) {
            setSecondsLeft(10);
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(mediaStream => {
                    setStream(mediaStream);
                    if (videoRef.current) {
                        videoRef.current.srcObject = mediaStream;
                        videoRef.current.play();
                    }
                    // Apaga la cámara automáticamente después de 10 segundos
                    timeoutId = setTimeout(() => {
                        stopCamera();
                        setShowCamera(false);
                        setMethod(null);
                    }, 10000);

                    // Cuenta regresiva animada
                    intervalId = setInterval(() => {
                        setSecondsLeft(prev => prev > 0 ? prev - 1 : 0);
                    }, 1000);
                })
                .catch(() => {
                    alert('No se pudo acceder a la cámara');
                    setShowCamera(false);
                    setMethod(null);
                });
        }

        // Limpiar la cámara y temporizadores al desmontar o cerrar
        return () => {
            if (timeoutId) clearTimeout(timeoutId);
            if (intervalId) clearInterval(intervalId);
            stopCamera();
        };
        // eslint-disable-next-line
    }, [showCamera]);

    const handleOpenCamera = (tipo: 'rostro' | 'qr') => {
        setMethod(tipo);
        setShowCamera(true);
    };

    const handleCloseCamera = () => {
        stopCamera();
        setShowCamera(false);
        setMethod(null);
    };

    return (
        <Paper
            elevation={3}
            className="asistencias-paper"
            sx={{
                p: 8,
                maxWidth: 900,
                minHeight: 600,
                margin: '10px auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start'
            }}
        >
            <Typography
                variant="h4"
                gutterBottom
                className="asistencias-titulo"
            >
                Selecciona el método de asistencia
            </Typography>
            {/* Mostrar solo el horario */}
            <Box mb={3}>
                <Typography variant="subtitle1" className="asistencias-horario">
                    <b>Horario:</b> {mockUser.horario}
                </Typography>
            </Box>
            {!showCamera ? (
                <>
                    <Stack spacing={2} direction="column" alignItems="center">
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            className="asistencias-boton primary"
                            onClick={() => handleOpenCamera('rostro')}
                        >
                            Asistencia mediante rostro
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            className="asistencias-boton secondary"
                            onClick={() => handleOpenCamera('qr')}
                        >
                            Asistencia mediante QR
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
                                ? 'Modo: Asistencia de rostro'
                                : 'Modo: Asistencia mediante QR'}
                        </Typography>
                        <Typography
                            variant="caption"
                            color="error"
                            display="block"
                            mt={1}
                            sx={{ fontWeight: 'bold', fontSize: '1.2rem', textAlign: 'center' }}
                        >
                            La cámara se apagará automáticamente en&nbsp;
                            <span style={{ color: '#1976d2', fontWeight: 'bold', fontSize: '1.4rem', transition: 'color 0.2s' }}>
                                {secondsLeft}
                            </span>
                            &nbsp;segundo{secondsLeft === 1 ? '' : 's'}.
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