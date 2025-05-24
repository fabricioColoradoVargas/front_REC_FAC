import {
    Box,
    Typography,
    FormGroup,
    FormControlLabel,
    Button,
    Stack,
    Checkbox
} from '@mui/material';
import { Link } from 'react-router';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';

const AuthLogin = ({ title, subtitle, subtext }:{title?:string , subtitle:any , subtext:any}) => (
    <>
        {title ? (
            <Typography fontWeight="700" variant="h2" mb={1}>
                {title}
            </Typography>
        ) : null}

        {/* {subtext} */}

        <Stack>
            <Box>
                <Typography variant="subtitle1"
                    fontWeight={500} component="label" htmlFor='username' mb="5px">Usuario</Typography>
                <CustomTextField id="username" variant="outlined" fullWidth />
            </Box>
            <Box mt="25px">
                <Typography variant="subtitle1"
                    fontWeight={500} component="label" htmlFor='password' mb="5px" >Contraseña<area shape="" coords="" href="" alt="" /></Typography>
                <CustomTextField id="password" type="password" variant="outlined" fullWidth />
            </Box>
            <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Recordar en este dispositivo"
                    />
                </FormGroup>
                
            </Stack>
        </Stack>
        <Box>
            <Button
                color="primary"
                variant="contained"
                size="large"
                fullWidth
                component={Link}
                to="/"
                type="submit"
            >
                Ingresar
            </Button>
        </Box>

        {/* //texto de abajo */}
        {/* {subtitle} */}
    </>
);

export default AuthLogin;
