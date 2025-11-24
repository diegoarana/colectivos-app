export default async function handler(req, res) {
  // Habilitar CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { idParada, codLinea } = req.query;
    
    //`https://cobro.free.beeceptor.com/api/arribos`,
    const response = await fetch(
      `https://cuandollega.smartmovepro.net/unionplatense/arribos/?codLinea=${codLinea || 0}&idParada=${idParada}`,
      {
        method: 'POST',
        headers: {
          'Cookie': 'X-CSRF-TOKEN-CL=CfDJ8MADeALVvYxFoMvdbNFBXv8heNDf_vHmTrPWeeagELq7X7rdSH_E9NIMwA6BtSTqoM0jRLLcuhVJJF-4OGZeu7YbBc2_fY-j4-JGnbpN_j9ZsXEp-_A7NHw5Y9Z_of_zs5Pog3bHanBzHzlqUh_t5OY',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'RequestVerificationToken': 'CfDJ8MADeALVvYxFoMvdbNFBXv8YCgk3F6vtGKXatcpuMKJpwNRu6HzPWjoZQPY-FQje7NaQnekR5N8Le-Qvnon-3dQJMddDavV5vQKRdpUsEBmnxx4JqVwvAEFo8jwHIyP1J94L__BH4KsgYJrKcCL_mzU'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al obtener datos', message: error.message });
  }
}