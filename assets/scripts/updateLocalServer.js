async function updateLocalServer(data) {
    await fetch('http://localhost:3000/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data.userData)
    });
  
    await fetch('http://localhost:3000/repositories', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data.reposData)
    });
  }
  