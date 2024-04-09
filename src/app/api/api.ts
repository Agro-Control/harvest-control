const API_BASE_URL = 'http://localhost:5000';


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

export const sendDataToAPI = async (endpoint: string, requestData: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    if (response.type === 'opaque') {
      console.warn('Solicitação opaca - o conteúdo da resposta não está disponível devido às restrições de CORS.');
    }

    if (!response.ok) {
      throw new Error(`Erro ao enviar dados para a API: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Erro ao enviar dados para a API:', error);
    throw error;
  }
};


export const updateDataInAPI = async (endpoint: string, requestData: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    if (response.type === 'opaque') {
      console.warn('Solicitação opaca - o conteúdo da resposta não está disponível devido às restrições de CORS.');
    }

    if (!response.ok) {
      throw new Error(`Erro ao atualizar dados na API: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Erro ao atualizar dados na API:', error);
    throw error;
  }
};
