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
          'Cookie': 'X-CSRF-TOKEN-CL=CfDJ8JNi9pSN7ulLrO8clLGE1XDfG7lfgzkMFKznWKpcEmI6Ap3Icb_IEC5Tz_YtZqP21BBXt7bmDx3QqGmSbH41xUDpdy-MjYO6NdE2U3egMnmwdmYjtWHlzpI4_PAkVxbo0vrTJ-RdEKWMl02tuVckUtU',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'RequestVerificationToken': 'CfDJ8JNi9pSN7ulLrO8clLGE1XCmkIN91rtUIzDLc1gZz7B9OzG846vHV-24LFsofCQ3JMT3IzpWTdZDUd8W-hLp6P7GUZydYKRqWH5dnWLA5ffFuL0O4RHenF4nElAyh1Rgn0-qsvxWHpSbTkkFw-Pn0WM'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const colectivosFormateados = data.arribos.map((item, index) => ({
      id: index + 1,
      linea: item.descripcionLinea.split(" ")[1],
      descripcionLinea: item.descripcionLinea,
      tiempo: item.tiempoRestanteArribo,
      destino: item.descripcionBandera
    }));

    res.status(200).json(colectivosFormateados);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al obtener datos', message: error.message });
  }
}