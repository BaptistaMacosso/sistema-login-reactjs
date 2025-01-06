import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Dashboard from '../../components/Dashboard/dashboard';
import NavBar from '../../components/NavBar';
import { Badge, Button, Card, CardContent, Grid2, Paper, Stack, Typography } from '@mui/material';
import { AuthContext } from '../../contexts/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
//API
import { buscarUsuarioPorId } from '../../services/userService';


const DetalhePerfilUsuario = () => {
  //States
  const { token } = useContext(AuthContext) ||{ token: localStorage.getItem('token') };
  const { isAuthenticated, Logout } = useContext(AuthContext);
  const [usuario, setUsuario] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  //...................................API........................
  // Busca os detalhes do pedido ao carregar a página.
  const fetchPerfilUsuario = async () => {
    try {
      const response = await buscarUsuarioPorId(id, token);
      if(response){
        setUsuario(response.user);
      }else{
        toast.warn("Nenhum detalhe do usuário encontrada ou formato inesperado.");
        setUsuario([]);
      } 
    } catch (error) {
      setUsuario([]); // Previna erros futuros
      toast.error("Error: Não foi possível listar os detalhes do usuário. Verifique os detalhes no console.");
      console.log("Detalhes: "+error);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      Logout();
      navigate('/login');
    }else{
      fetchPerfilUsuario();
    }
  }, [isAuthenticated, Logout]);
  //..............................................................

  return (
  <>
    <NavBar />
    <Box height={60} />
    <Box sx={{ display: 'flex' }}  paddingLeft={1} paddingRight={1}>
      <Dashboard />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Stack spacing={2} direction="row" sx={{ width: '100%' }}>
          <Card sx={{ width: '100%', height: 85+"vh" }}>
            <CardContent>
                <Grid2 container spacing={2} direction={'row'}>
                    <Badge sx={{marginTop: 0.5, marginLeft: 0, color: 'text.secondary'}} />
                    <Typography sx={{ color: 'text.secondary', marginBottom: 2 }} gutterBottom variant="h6" component="div">Detalhe do Usuário</Typography>
                </Grid2>
                <Box p={3}>
                <Button variant="contained" onClick={() => navigate(-1)}>Voltar</Button>
                <Card sx={{ mt: 2 }}>
                    <CardContent>
                    <Paper sx={{ padding: 3 }}>
                    <Typography variant="h5" gutterBottom>Perfíl do Usuário #{usuario.userId}</Typography>
                    <Typography><strong>Nome de Usuário:</strong> {usuario.userNome}</Typography>
                    <Typography><strong>E-mail:</strong> {usuario.userEmail}</Typography>
                    <Typography><strong>Perfíl do Usuário:</strong> {usuario.tipoUser?.descricaoTipo}</Typography>
                    <Box mt={2} />
                    <Typography><strong>Página em Construção</strong></Typography>
                    </Paper>
                    </CardContent>
                </Card>
                </Box>
            </CardContent>
            </Card>
        </Stack>
      </Box>
    </Box>
  </>
  )
}

export default DetalhePerfilUsuario;