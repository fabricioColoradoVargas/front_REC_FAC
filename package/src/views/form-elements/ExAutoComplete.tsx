import { Grid, Box } from '@mui/material';
import { ComboBoxAutocomplete } from '../../components/forms/AutoComplete/ComboBoxAutocomplete';
import { MultipleValuesAutocomplete } from '../../components/forms/AutoComplete/MultipleValuesAutocomplete';
import { CheckboxesAutocomplete } from '../../components/forms/AutoComplete/CheckboxesAutocomplete';
import { SizesAutocomplete } from '../../components/forms/AutoComplete/SizesAutocomplete';

import '../../Modulos/registro.css';


const ExAutoComplete = () => {
  // 2

  return (
    <Box>
      <center>
          <div>

<form className="form_registro" action="">
    <p className="heading">Registro de Usuario</p>


<div className="inputregistro">

    <input placeholder="Nombres y Apellidos" id="username" className="inputField" type="text"/>
    <input placeholder="Numero de Whatsapp" id="tel" className="inputField" type="tel" />
</div>
    <input placeholder="Hora de Entrada" id="password" className="inputField" type="time"/>    
    <input placeholder="Hora de Salida" id="password" className="inputField" type="time"/>    
           
<button className="botonregistro" id="button">Capturar Imagen</button>

    <div className="signupContainer">
        <a href="#">Registrar</a>
    </div>

</form>
      
    </div>
    </center>
    </Box>
  );
};

export default ExAutoComplete;
