document.addEventListener('DOMContentLoaded', async function() {
    const data = await fetchGitHubData();
    await updateLocalServer(data);
  
    const userInfo = document.getElementById('user-info');
    userInfo.innerHTML = `<p><strong>Name:</strong> ${data.userData.name}</p>
                          <p><strong>Bio:</strong> ${data.userData.bio}</p>
                          <p><strong>Location:</strong> ${data.userData.location}</p>`;
  
    const repoList = document.getElementById('repo-list');
    data.reposData.forEach(repo => {
      const listItem = document.createElement('li');
      listItem.textContent = repo.name;
      repoList.appendChild(listItem);
    });
  });
  