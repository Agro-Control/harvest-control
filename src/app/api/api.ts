const API_BASE_URL = 'http://localhost:5000';

// Defina o seu serviço para buscar dados da API
export const fetchDataFromAPI = async (endpoint: string) => {
  try {
 
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);

    if (response.type === 'opaque') {
      console.warn('Solicitação opaca - o conteúdo da resposta não está disponível devido às restrições de CORS.');
    }


    if (!response.ok) {
      throw new Error(`Erro ao buscar dados da API: ${response.statusText}`);
    }


    const data = await response.json();

   
    return data;
  } catch (error) {
   
    console.error('Erro ao buscar dados da API:', error);
   
    throw error;
  }
};